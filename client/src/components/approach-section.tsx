import { motion } from "framer-motion";
import SectionHeading from "@/components/primitives/section-heading";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

const steps = [
  { n: "01", title: "Scope", desc: "One call to diagnose the real problem — not just the stated one." },
  { n: "02", title: "Design", desc: "A concrete plan: models, architecture, integration points, and success criteria." },
  { n: "03", title: "Build", desc: "We ship a working system in tight iterations — not a slide deck." },
  { n: "04", title: "Enable", desc: "Handoff with documentation and a runbook, so your team fully owns it." },
];

export default function ApproachSection() {
  return (
    <section id="approach" className="section-py border-t border-border bg-secondary/30">
      <div className="container-page">
        <SectionHeading
          eyebrow="How we work"
          title="A clear path from problem to production"
          subtitle="Senior-led, transparent, and built so you're never locked in. A working system is the only real deliverable."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((s) => (
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
