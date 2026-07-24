import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/primitives/section-heading";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

const tiers = [
  {
    name: "Advisory",
    what: "Ongoing access to senior AI thinking — strategy, architecture reviews, and roadmap input.",
    who: "Best when you have engineers but lack AI depth.",
  },
  {
    name: "Sprint",
    what: "Defined scope, defined timeline, a working system at the end. Typically 4–10 weeks.",
    who: "Best for proving value fast.",
  },
  {
    name: "Embedded",
    what: "Our team inside yours — we ship alongside you and transfer knowledge as we go.",
    who: "Best for sustained, hands-on build.",
  },
];

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function EngagementSection() {
  return (
    <section className="section-py border-t border-border bg-secondary/30">
      <div className="container-page">
        <SectionHeading
          eyebrow="Engagement"
          title="Ways to work with us"
          subtitle="Three simple models. No rigid price grids — we scope to the problem."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {tiers.map((t) => (
            <motion.div key={t.name} variants={fadeUp} className="card-surface flex h-full flex-col p-7">
              <h3 className="text-lg font-semibold text-foreground">{t.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.what}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{t.who}</p>
              <button
                onClick={() => scrollTo("contact")}
                className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand"
              >
                Talk to us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Not sure which fits? We'll tell you in 15 minutes.
        </p>
      </div>
    </section>
  );
}
