import type { Transition, Variants } from 'framer-motion'

export const sealEase = [0.22, 1, 0.36, 1] as const

export const durations = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
  draw: 1.6,
} as const

export const spring: Transition = { type: 'spring', stiffness: 140, damping: 20, mass: 0.8 }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: durations.base, ease: sealEase } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: durations.base, ease: sealEase } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: durations.base, ease: sealEase } },
}

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
}

/* Words rise from a clipped line, used for display headlines. */
export const lineRise: Variants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.85, ease: sealEase } },
}

/* The amber arc closing the seal: the core brand gesture. */
export const arcDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: durations.draw, ease: sealEase },
  },
}

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.5, ease: sealEase } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
}

export const viewportOnce = { once: true, amount: 0.25 } as const
