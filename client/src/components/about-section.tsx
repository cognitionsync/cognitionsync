import Reveal from "@/components/primitives/reveal";

const principles = [
  "We ship production systems, not proofs-of-concept.",
  "Senior engineers on every engagement — the people you meet are the people who build.",
  "Model-, cloud-, and vendor-agnostic. We build what's right for you.",
  "You own everything: code, models, and IP.",
  "Honest about what AI can — and can't — do.",
];

export default function AboutSection() {
  return (
    <section id="about" className="section-py">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <span className="eyebrow">About</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              Substance over spectacle.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              CognitionSync exists for the gap between AI potential and AI delivery. We pair
              strategic judgment with senior engineering to build systems that work in production —
              reliably, at scale, and owned entirely by you.
            </p>
          </Reveal>
        </div>

        <div>
          <ul className="divide-y divide-border border-y border-border">
            {principles.map((p, i) => (
              <Reveal key={p} delay={i * 0.05}>
                <li className="flex items-baseline gap-4 py-5">
                  <span className="font-mono text-xs text-brand">0{i + 1}</span>
                  <span className="text-base leading-relaxed text-foreground">{p}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
