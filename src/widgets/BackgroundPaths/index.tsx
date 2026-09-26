import { motion, useReducedMotion } from 'framer-motion'

/*
  Quiet 21st.dev-style background paths. Decorative only — never sits above
  text, never captures pointer events.
*/
function PathSet({ invert = false }: { invert?: boolean }) {
  const paths = Array.from({ length: 12 }, (_, index) => {
    const offset = index * 28
    return `M-40 ${80 + offset} C 180 ${20 + offset}, 420 ${180 + offset}, 760 ${60 + offset} S 1180 ${200 + offset}, 1480 ${90 + offset}`
  })

  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 520"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {paths.map((d, index) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke={invert ? 'rgba(243,241,234,0.12)' : 'color-mix(in srgb, var(--ink) 12%, transparent)'}
          strokeWidth={1.1}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </svg>
  )
}

export function BackgroundPaths({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <div aria-hidden className={className}>
      {reduceMotion ? (
        <svg viewBox="0 0 1440 520" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
          <path
            d="M-40 160 C 280 40, 520 240, 900 120 S 1300 260, 1480 140"
            fill="none"
            stroke="color-mix(in srgb, var(--ink) 12%, transparent)"
            strokeWidth={1.1}
          />
        </svg>
      ) : (
        <PathSet />
      )}
    </div>
  )
}
