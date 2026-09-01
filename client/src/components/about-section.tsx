import Reveal from "@/components/primitives/reveal";
import { siteConfig } from "@config";

const { about } = siteConfig;

export default function AboutSection() {
  return (
    <section id="about" className="section-py">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <span className="eyebrow">{about.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              {about.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {about.body}
            </p>
          </Reveal>
        </div>

        <div>
          <ul className="divide-y divide-border border-y border-border">
            {about.principles.map((p, i) => (
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
