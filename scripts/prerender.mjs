import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Injects a static render of the page into the built index.html, and writes
 * llms.txt beside it.
 *
 * Why the prerender exists: the site is a client-rendered SPA, so the document
 * it served was a 3 KB shell with an empty <div id="root">. Google runs the
 * script and sees the real page, but the crawlers behind the generative
 * engines largely do not, so to every one of them the site was its meta
 * description and nothing else. This puts the actual copy in the HTML.
 *
 * Runs after both Vite builds: the browser build writes index.html, the SSR
 * build writes the module imported below.
 */
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = resolve(root, "client/dist");
const htmlPath = resolve(distDir, "index.html");
const marker = '<div id="root"></div>';

const { render, llmsTxt } = await import(resolve(root, "dist-ssr/entry-server.js"));

/**
 * Reveal animates in from opacity:0, so a straight render ships every section
 * invisible to anything that applies CSS without running the script that
 * reveals it. This markup exists to be read, not played back, so the initial
 * hidden state is dropped. The elements carrying it hold no other styling.
 */
const body = render().replace(/\sstyle="[^"]*opacity:\s*0[^"]*"/g, "");

const html = readFileSync(htmlPath, "utf8");
if (!html.includes(marker)) {
  throw new Error(
    `prerender: '${marker}' not found in ${htmlPath}. The browser build's ` +
      `index.html changed shape, so the static markup has nowhere to go.`,
  );
}

writeFileSync(htmlPath, html.replace(marker, `<div id="root">${body}</div>`), "utf8");
writeFileSync(resolve(distDir, "llms.txt"), llmsTxt(), "utf8");

console.log(`prerender: injected ${body.length.toLocaleString()} bytes of static markup`);
console.log("prerender: wrote llms.txt");
