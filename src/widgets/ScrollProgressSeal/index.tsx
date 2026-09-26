import { motion, useScroll, useSpring } from 'framer-motion'

/*
  Page progress drawn as the seal closing: the amber arc completes as the
  visitor reaches the end of the page. Same gesture as the hero mark.
*/
export function ScrollProgressSeal() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-6 left-6 z-40 hidden h-11 w-11 lg:block"
    >
      <svg viewBox="0 0 40 40" className="h-full w-full -rotate-90">
        <circle
          cx="20"
          cy="20"
          r="17"
          fill="none"
          strokeWidth="2.5"
          className="stroke-line"
        />
        <motion.circle
          cx="20"
          cy="20"
          r="17"
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="stroke-amber"
          style={{ pathLength: progress }}
        />
      </svg>
    </div>
  )
}
