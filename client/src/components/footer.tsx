import { Linkedin, Github } from "lucide-react";
import Logo from "@/components/logo";

const columns = [
  {
    title: "Services",
    links: [
      { label: "AI Strategy & Advisory", id: "services" },
      { label: "Generative AI & LLMs", id: "services" },
      { label: "ML Engineering", id: "services" },
      { label: "Data & MLOps", id: "services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", id: "about" },
      { label: "Approach", id: "approach" },
      { label: "Work", id: "work" },
      { label: "Contact", id: "contact" },
    ],
  },
];

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr] md:gap-8">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              An applied-AI studio. We design, build, and deploy AI systems that work in production.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href="#"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
              >
                <Linkedin className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
              >
                <Github className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => go(l.id)}
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
          <p>© {new Date().getFullYear()} CognitionSync. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
            <span>NDA on request</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
