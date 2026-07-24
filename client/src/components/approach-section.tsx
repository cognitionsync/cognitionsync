import { motion } from "framer-motion";
import SectionHeading from "@/components/primitives/section-heading";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import { siteConfig } from "@config";

const { approach } = siteConfig;

export default function ApproachSection() {
  return (
    <section id="approach" className="section-py border-t border-border bg-secondary/30">
      <div className="container-page">
        <SectionHeading
          eyebrow={approach.eyebrow}
          title={approach.title}
          subtitle={approach.subtitle}
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {approach.steps.map((s) => (
            <motion.div key={s.n} variants={fadeUp} className="border-t border-foreground/15 pt-5">
              <span className="font-mono text-sm text-muted-foreground">{s.n}</span>
              <h3 className="mt-3 text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
