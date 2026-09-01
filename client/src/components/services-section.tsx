import { motion } from "framer-motion";
import { Compass, Sparkles, LineChart, ScanEye, Bot, Database } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "@/components/primitives/section-heading";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import { siteConfig, type ServiceIconName } from "@config";

// Map icon-name strings from site.config.ts to Lucide components. To make a
// new icon available in the config, import it here and add an entry.
const iconMap: Record<ServiceIconName, LucideIcon> = {
  Compass,
  Sparkles,
  LineChart,
  ScanEye,
  Bot,
  Database,
};

const { services } = siteConfig;

export default function ServicesSection() {
  return (
    <section id="services" className="section-py">
      <div className="container-page">
        <SectionHeading
          eyebrow={services.eyebrow}
          title={services.title}
          subtitle={services.subtitle}
        />

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.items.map((s) => {
            const Icon = iconMap[s.icon];
            return (
              <motion.div
                key={s.name}
                variants={fadeUp}
                className="group bg-card p-7 transition-colors duration-150 hover:bg-secondary/50"
              >
                <Icon strokeWidth={1.5} className="h-6 w-6 text-foreground" />
                <h3 className="mt-5 text-base font-semibold text-foreground">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
