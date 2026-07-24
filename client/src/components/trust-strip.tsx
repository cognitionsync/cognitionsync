import { siteConfig } from "@config";

const { trustStrip } = siteConfig;

export default function TrustStrip() {
  return (
    <section aria-label="Industries we work across" className="border-y border-border bg-secondary/40">
      <div className="container-page py-8">
        <p className="text-center font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {trustStrip.label}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {trustStrip.items.map((label) => (
            <span key={label} className="text-sm font-medium text-foreground/70">
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
