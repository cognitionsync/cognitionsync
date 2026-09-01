import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { siteConfig } from "./site.config";

// Deployed as a GitHub Pages *project* site at
// https://cognitionsync.github.io/cognitionsync/ , so production assets must be
// served from the "/cognitionsync/" base. Local dev stays at "/".
const REPO_BASE = "/cognitionsync/";

/**
 * Builds the page's structured data as a single @graph.
 *
 * One graph rather than a lone Organization node, because the nodes carry @id
 * and reference each other: the FAQ belongs to the page, the page to the site,
 * the site to the organisation. A parser reading four unconnected objects has
 * to guess that they describe one entity. Everything is derived from
 * site.config.ts, so the schema cannot contradict the visible copy.
 */
function buildJsonLd(): unknown {
  const s = siteConfig.seo;
  const origin = s.siteUrl.replace(/\/$/, "");
  const orgId = `${origin}/#organization`;
  const siteId = `${origin}/#website`;
  const pageId = `${origin}/#webpage`;

  const socials = Object.values(siteConfig.contactInfo.socials).filter(
    (u): u is string => typeof u === "string" && u.startsWith("http"),
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: siteConfig.brand.name,
        url: `${origin}/`,
        logo: { "@type": "ImageObject", url: `${origin}/favicon.svg` },
        image: origin + s.ogImage,
        description: s.description,
        email: siteConfig.contactInfo.email,
        sameAs: socials,
        knowsAbout: siteConfig.services.items.map((i) => i.name),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: siteConfig.services.title,
          itemListElement: siteConfig.services.items.map((i) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: i.name, description: i.desc },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: `${origin}/`,
        name: siteConfig.brand.name,
        description: s.description,
        publisher: { "@id": orgId },
        inLanguage: "en",
      },
      {
        "@type": "WebPage",
        "@id": pageId,
        url: `${origin}/`,
        name: s.title,
        description: s.description,
        isPartOf: { "@id": siteId },
        about: { "@id": orgId },
        primaryImageOfPage: { "@type": "ImageObject", url: origin + s.ogImage },
        inLanguage: "en",
      },
      {
        "@type": "FAQPage",
        "@id": `${origin}/#faq`,
        isPartOf: { "@id": pageId },
        mainEntity: siteConfig.faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

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
    SITE_JSONLD: JSON.stringify(buildJsonLd(), null, 2),
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