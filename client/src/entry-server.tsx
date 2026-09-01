import { renderToStaticMarkup } from "react-dom/server";
import App from "./App";
import { siteConfig } from "@config";

/**
 * Renders the site to static HTML for the build-time prerender.
 *
 * renderToStaticMarkup rather than renderToString: the browser entry mounts
 * with createRoot, which discards whatever is already in the container and
 * renders from scratch, so React's hydration markers would be bytes every
 * visitor downloads and nothing ever reads.
 *
 * ssrPath is required. wouter resolves its location from window by default,
 * which does not exist here.
 */
export function render(): string {
  return renderToStaticMarkup(<App ssrPath="/" />);
}

/**
 * Builds llms.txt from the same config the page copy comes from.
 *
 * Generated rather than committed so it cannot drift from what the site
 * actually says. A hand-maintained copy describing services that have been
 * renamed is worse than none, because an assistant quotes it as current.
 *
 * Format follows llmstxt.org: an H1, a blockquote summary, then link sections.
 */
export function llmsTxt(): string {
  const { brand, seo, services, faq, contactInfo } = siteConfig;
  const origin = seo.siteUrl.replace(/\/$/, "");

  const socials = Object.values(contactInfo.socials).filter(
    (url): url is string => typeof url === "string" && url.startsWith("http"),
  );

  return `# ${brand.name}

> ${seo.description}

${brand.blurb}

Contact: ${contactInfo.email}
${socials.length ? `Profiles: ${socials.join(", ")}\n` : ""}
## Services

${services.items.map((item) => `- **${item.name}**: ${item.desc}`).join("\n")}

## Frequently asked

${faq.items.map((item) => `### ${item.q}\n${item.a}`).join("\n\n")}

## Optional

- [Site](${origin}/): the full page, covering approach, work and engagement models.
`;
}
