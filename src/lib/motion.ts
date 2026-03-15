import type { Transition, Variants } from "framer-motion";

export const springSoft: Transition = {
  type: "spring",
  stiffness: 140,
  damping: 22,
  mass: 0.85,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 24,
  mass: 0.7,
};

export const easeOut: Transition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
};

const fadeBase = (duration = 0.45): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { ...easeOut, duration },
  },
});

export const fadeUp = (reduced = false): Variants => ({
  hidden: {
    opacity: 0,
    y: reduced ? 0 : 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: springSoft,
  },
});

export const fadeIn = (_reduced = false): Variants => fadeBase();

export const scaleIn = (reduced = false): Variants => ({
  hidden: {
    opacity: 0,
    scale: reduced ? 1 : 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springSoft,
  },
});

export const slideIn = (reduced = false): Variants => ({
  hidden: {
    opacity: 0,
    x: reduced ? 0 : 28,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: springSoft,
  },
});

export const staggerContainer = (
  reduced = false,
  stagger = 0.08,
  delayChildren = 0
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      ...easeOut,
      staggerChildren: reduced ? 0 : stagger,
      delayChildren,
    },
  },
});

export const staggerItem = (reduced = false): Variants => ({
  hidden: {
    opacity: 0,
    y: reduced ? 0 : 16,
    scale: reduced ? 1 : 0.99,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springSoft,
  },
});

export const variantMap = {
  fadeUp,
  fadeIn,
  scaleIn,
  slideIn,
  staggerContainer,
  staggerItem,
};

export type RevealVariantName = "fadeUp" | "fadeIn" | "scaleIn" | "slideIn";

export const getRevealVariant = (variant: RevealVariantName, reduced = false): Variants =>
  variantMap[variant](reduced);
