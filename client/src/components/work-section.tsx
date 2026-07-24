import { motion } from "framer-motion";
import SectionHeading from "@/components/primitives/section-heading";
import Reveal from "@/components/primitives/reveal";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import { siteConfig } from "@config";

const { work } = siteConfig;

export default function WorkSection() {
  return (
    <section id="work" className="section-py">
      <div className="container-page">
        <SectionHeading
          eyebrow={work.eyebrow}
          title={work.title}
          subtitle={work.subtitle}
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {work.cases.map((c) => (
            <motion.article
              key={c.industry}
              variants={fadeUp}
              className="card-surface flex h-full flex-col p-7 hover:border-foreground/20"
            >
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {c.industry}
              </span>
              <h3 className="mt-4 text-2xl font-semibold leading-snug text-foreground">{c.metric}</h3>
              <p className="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              <span className="mt-6 text-xs italic text-foreground/40">{work.caseNote}</span>
            </motion.article>
          ))}
        </motion.div>

        <Reveal className="mt-16">
          <figure className="mx-auto max-w-3xl border-t border-border pt-12 text-center">
            <blockquote className="text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
              “{work.quote.text}”
            </blockquote>
            <figcaption className="mt-5 text-sm text-muted-foreground">
              {work.quote.author} · {work.quote.company}{" "}
              <span className="text-foreground/40">({work.quote.note})</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
