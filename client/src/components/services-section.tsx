import { motion } from "framer-motion";
import { Compass, Sparkles, LineChart, ScanEye, Bot, Database } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "@/components/primitives/section-heading";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

type Service = { icon: LucideIcon; name: string; desc: string };

const services: Service[] = [
  {
    icon: Compass,
    name: "AI Strategy & Advisory",
    desc: "Define where AI fits, where it doesn't, and what to build first.",
  },
  {
    icon: Sparkles,
    name: "Generative AI & LLMs",
    desc: "Custom LLM applications, RAG pipelines, and fine-tuned models for your domain.",
  },
  {
    icon: LineChart,
    name: "ML Engineering",
    desc: "End-to-end machine learning — features, training, evaluation, and deployment.",
  },
  {
    icon: ScanEye,
    name: "Computer Vision",
    desc: "Detection, tracking, and inspection — on-device or in the cloud.",
  },
  {
    icon: Bot,
    name: "AI Agents & Automation",
    desc: "Autonomous workflows and multi-agent systems that take action, not just advise.",
  },
  {
    icon: Database,
    name: "Data & MLOps Platforms",
    desc: "The infrastructure AI runs on: pipelines, monitoring, orchestration, and governance.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-py">
      <div className="container-page">
        <SectionHeading
          eyebrow="Services"
          title="What we build"
          subtitle="Six focused capabilities across the AI lifecycle. We work on the whole path — or the part you need most."
        />

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => (
            <motion.div
              key={s.name}
              variants={fadeUp}
              className="group bg-card p-7 transition-colors duration-150 hover:bg-secondary/50"
            >
              <s.icon strokeWidth={1.5} className="h-6 w-6 text-foreground" />
              <h3 className="mt-5 text-base font-semibold text-foreground">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
