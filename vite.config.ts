import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { siteConfig } from "./site.config";

// Deployed as a GitHub Pages *project* site at
// https://cognitionsync.github.io/cognitionsync/ , so production assets must be
// served from the "/cognitionsync/" base. Local dev stays at "/".
const REPO_BASE = "/cognitionsync/";

// Injects values from site.config.ts into %TOKEN% placeholders in index.html
// so that SEO/meta tags stay in a single source of truth alongside body copy.
function htmlSiteConfigPlugin(): Plugin {
  const s = siteConfig.seo;
  const tokens: Record<string, string> = {
    SITE_TITLE: s.title,
    SITE_DESCRIPTION: s.description,
    SITE_KEYWORDS: s.keywords,
    SITE_OG_TITLE: s.ogTitle,
    SITE_OG_DESCRIPTION: s.ogDescription,
    SITE_THEME_COLOR: s.themeColor,
    SITE_URL: s.siteUrl.replace(/\/$/, ""),
    // og:image must be absolute -- relative URLs are ignored by crawlers
    SITE_OG_IMAGE: s.siteUrl.replace(/\/$/, "") + s.ogImage,
    BRAND_NAME: siteConfig.brand.name,
    SITE_EMAIL: siteConfig.contactInfo.email,
    // JSON-LD sameAs array. Placeholder "#" socials are dropped so we never
    // publish a broken profile link to search engines.
    SITE_SAMEAS: JSON.stringify(
      Object.values(siteConfig.contactInfo.socials).filter(
        (u): u is string => typeof u === "string" && u.startsWith("http"),
      ),
    ),
  };
  return {
    name: "html-inject-site-config",
    // order: "pre" matters. Vite parses href/src attributes as URLs, and a raw
    // %TOKEN% inside href trips decodeURI ("URI malformed") because %SI is not a
    // valid percent-escape. Substituting first keeps <link rel="canonical"> working.
    transformIndexHtml: {
      order: "pre" as const,
      handler(html: string) {
        return html.replace(/%([A-Z_]+)%/g, (m, key: string) =>
          Object.prototype.hasOwnProperty.call(tokens, key) ? tokens[key] : m,
        );
      },
    },
  };
}

export default defineConfig(({ command }) => ({
  root: path.resolve(__dirname, "client"), // tells Vite where source lives
  // VITE_BASE lets a non-Pages target (e.g. the VPS at the domain root)
  // override the project-site base. Unset => GitHub Pages behaviour, unchanged.
  base: process.env.VITE_BASE ?? (command === "build" ? REPO_BASE : "/"),
  plugins: [react(), htmlSiteConfigPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@config": path.resolve(__dirname, "site.config.ts"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "client/dist"), // ✅ stays inside client
    emptyOutDir: true,
  },
}));