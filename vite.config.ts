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
    BRAND_NAME: siteConfig.brand.name,
  };
  return {
    name: "html-inject-site-config",
    transformIndexHtml(html) {
      return html.replace(/%([A-Z_]+)%/g, (m, key: string) =>
        Object.prototype.hasOwnProperty.call(tokens, key) ? tokens[key] : m,
      );
    },
  };
}

export default defineConfig(({ command }) => ({
  root: path.resolve(__dirname, "client"), // tells Vite where source lives
  base: command === "build" ? REPO_BASE : "/",
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