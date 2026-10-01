import type { Variants } from "framer-motion";

/** Calm ease-out used across the site (Stripe/Linear-style). */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export const staggerContainer = (stagger = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Standard scroll-reveal viewport config. */
export const viewportOnce = { once: true, margin: "-80px" } as const;
