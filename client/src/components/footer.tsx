import { Linkedin, Github, Youtube } from "lucide-react";
import Logo from "@/components/logo";
import { siteConfig } from "@config";

const { brand, contactInfo, footer } = siteConfig;

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr] md:gap-8">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {brand.blurb}
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[
                { href: contactInfo.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
                { href: contactInfo.socials.github, label: "GitHub", Icon: Github },
                { href: contactInfo.socials.youtube, label: "YouTube", Icon: Youtube },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => go(l.targetId)}
                      className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {brand.name}. {footer.legal.copyrightSuffix}</p>
          <div className="flex items-center gap-6">
            {footer.legal.links.map((l) => (
              <a key={l.label} href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </a>
            ))}
            <span>{footer.legal.note}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
