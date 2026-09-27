import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/**
 * Counts from 0 to `target` once the element scrolls into view.
 * Returns a ref to attach and the current display value.
 */
export function useCountUp(target: number, duration = 1400) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduceMotion = useReducedMotion()
  // Default to the real value so the stat never reads "0" before the
  // count-up kicks in (or if it never fires) — the animation resets to 0
  // and counts back up once the element is in view.
  const [value, setValue] = useState(target)

  useEffect(() => {
    if (!inView || reduceMotion) return

    setValue(0)
    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // easeOutCubic keeps the last digits from crawling.
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, target, duration, reduceMotion])

  return { ref, value }
}
