import { motion } from "framer-motion";
import SectionHeading from "@/components/primitives/section-heading";
import Reveal from "@/components/primitives/reveal";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

// NOTE: Illustrative, NDA-safe placeholders — swap for real case studies when cleared.
const cases = [
  {
    industry: "Financial Services",
    metric: "40% fewer manual review hours",
    desc: "An LLM copilot that triages and drafts responses inside existing review workflows.",
  },
  {
    industry: "Healthcare",
    metric: "In production in 6 weeks",
    desc: "A HIPAA-conscious document-understanding pipeline, taken from prototype to deployment.",
  },
  {
    industry: "Retail",
    metric: "Forecasts: 3 weeks → 4 days",
    desc: "A demand-forecasting system integrated cleanly with existing data infrastructure.",
  },
];

export default function WorkSection() {
  return (
    <section id="work" className="section-py">
      <div className="container-page">
        <SectionHeading
          eyebrow="Selected work"
          title="Outcomes, not deliverables"
          subtitle="A snapshot of the kind of work we take on. Every engagement is measured by what shipped and what it moved."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {cases.map((c) => (
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
              <span className="mt-6 text-xs italic text-foreground/40">Client shared under NDA</span>
            </motion.article>
          ))}
        </motion.div>

        <Reveal className="mt-16">
          <figure className="mx-auto max-w-3xl border-t border-border pt-12 text-center">
            <blockquote className="text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
              “They operated like our own senior team — clear about what AI could and couldn't do,
              and relentless about getting it into production.”
            </blockquote>
            <figcaption className="mt-5 text-sm text-muted-foreground">
              VP of Data · Fortune 500 retailer <span className="text-foreground/40">(engagement under NDA)</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
