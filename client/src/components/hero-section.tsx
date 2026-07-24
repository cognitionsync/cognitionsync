import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EASE, staggerContainer } from "@/lib/motion";

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* subtle, barely-there dot grid that fades out */}
      <div
        aria-hidden="true"
        className="bg-dots pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
      />

      <div className="container-page pt-36 pb-20 md:pt-44 md:pb-28">
        <motion.div
          variants={staggerContainer(0.09)}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span variants={item} className="eyebrow">
            Applied AI Studio
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-5 text-display font-semibold text-foreground"
          >
            Applied AI, built for production.
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            We design, build, and deploy AI systems that create durable value — from strategy and
            LLMs to computer vision, agents, and the infrastructure that runs them.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <button
              onClick={() => scrollTo("contact")}
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-brand-hover"
            >
              Start a conversation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => scrollTo("work")}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-secondary"
            >
              See our work
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
