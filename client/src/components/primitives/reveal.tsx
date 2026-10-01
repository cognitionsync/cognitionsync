import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, viewportOnce } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/** Subtle fade + rise on scroll. The site's single reveal primitive. */
export default function Reveal({ children, delay = 0, y = 16, className }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
