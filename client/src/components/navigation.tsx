import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/logo";
import { cn } from "@/lib/utils";

const links = [
  { label: "Services", id: "services" },
  { label: "Approach", id: "approach" },
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <button onClick={() => go("home")} aria-label="CognitionSync home">
          <Logo />
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => go("contact")}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-brand-hover"
          >
            Let's talk
          </button>
        </div>

        <button
          className="-mr-2 p-2 text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-page flex flex-col py-3">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="py-2.5 text-left text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => go("contact")}
              className="mt-2 rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground"
            >
              Let's talk
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
