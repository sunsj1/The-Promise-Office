import { motion, useReducedMotion } from 'framer-motion'
import { arcDraw, sealEase } from '@/animations/variants'
import { cn } from '@/lib/cn'

/*
  The Threshold Seal, rebuilt from the brand kit geometry.
  The plum arc carries 300 degrees (the promise); the amber arc closes the
  remaining 60 (the delivery). `animate` draws the amber arc last so the mark
  performs the brand line rather than just sitting there.
*/

type SealProps = {
  className?: string
  animate?: boolean
  /** Pauses the amber arc until the parent finishes its own entrance. */
  delay?: number
}

const PLUM_ARC = 'M51.69 50.23 A26.5 26.5 0 1 1 57.2 24.31'
const AMBER_ARC = 'M57.2 24.31 A26.5 26.5 0 0 1 51.69 50.23'
const P_STEM =
  'M24.1 19.5 H26.3 A2.6 2.6 0 0 1 28.9 22.1 V43.9 A2.6 2.6 0 0 1 26.3 46.5 H24.1 A2.6 2.6 0 0 1 21.5 43.9 V22.1 A2.6 2.6 0 0 1 24.1 19.5 Z'
const P_BOWL =
  'M28.75 14.22 A12.4 12.4 0 1 1 28.54 38.97 L29.01 32.19 A5.6 5.6 0 1 0 29.11 21.01 Z'

export function Seal({ className, animate = false, delay = 0 }: SealProps) {
  const reduceMotion = useReducedMotion()
  const shouldAnimate = animate && !reduceMotion

  return (
    <svg viewBox="0 0 64 64" className={cn('h-8 w-8', className)} role="img" aria-label="The Promise Office">
      <motion.path
        d={PLUM_ARC}
        fill="none"
        strokeWidth={5.6}
        strokeLinecap="round"
        className="stroke-plum dark:stroke-lavender"
        variants={shouldAnimate ? arcDraw : undefined}
        initial={shouldAnimate ? 'hidden' : false}
        animate={shouldAnimate ? 'visible' : false}
        transition={shouldAnimate ? { duration: 1.5, ease: sealEase, delay } : undefined}
      />
      <motion.path
        d={AMBER_ARC}
        fill="none"
        strokeWidth={5.6}
        strokeLinecap="round"
        className="stroke-amber"
        variants={shouldAnimate ? arcDraw : undefined}
        initial={shouldAnimate ? 'hidden' : false}
        animate={shouldAnimate ? 'visible' : false}
        transition={shouldAnimate ? { duration: 0.7, ease: sealEase, delay: delay + 1.1 } : undefined}
      />
      <motion.g
        className="fill-ink"
        initial={shouldAnimate ? { opacity: 0, scale: 0.9 } : false}
        animate={shouldAnimate ? { opacity: 1, scale: 1 } : false}
        transition={shouldAnimate ? { duration: 0.6, ease: sealEase, delay: delay + 0.45 } : undefined}
        style={{ transformOrigin: '32px 32px' }}
      >
        <path d={P_STEM} />
        <path d={P_BOWL} />
      </motion.g>
    </svg>
  )
}
