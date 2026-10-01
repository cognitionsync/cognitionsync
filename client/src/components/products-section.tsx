import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/primitives/section-heading";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import { siteConfig } from "@config";

const { products } = siteConfig;

/**
 * The studio's live products. Each card is a real <a href>, not a scroll
 * button, so crawlers can follow it from the apex to the product's subdomain.
 */
export default function ProductsSection() {
  return (
    <section id="products" className="section-py">
      <div className="container-page">
        <SectionHeading
          eyebrow={products.eyebrow}
          title={products.title}
          subtitle={products.subtitle}
        />

        <motion.ul
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 sm:grid-cols-2"
        >
          {products.items.map((p) => (
            <motion.li key={p.href} variants={fadeUp}>
              <a
                href={p.href}
                className="card-surface group flex h-full flex-col p-7 hover:border-foreground/20"
              >
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {p.category}
                </span>
                <h3 className="mt-4 flex items-center gap-2 text-2xl font-semibold leading-snug text-foreground">
                  {p.name}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                    strokeWidth={1.5}
                  />
                </h3>
                <p className="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <span className="mt-6 font-mono text-xs text-foreground/50">{new URL(p.href).host}</span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
