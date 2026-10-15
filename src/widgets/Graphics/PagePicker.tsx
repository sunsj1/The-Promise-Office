import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { PickerConfig } from '@/data/pagePickers'
import { cn } from '@/lib/cn'

const W = 460
const H = 96

function nodePoint(i: number, n: number) {
  const t = n === 1 ? 0.5 : i / (n - 1)
  return { x: 36 + t * (W - 72), y: 34 - Math.sin(t * Math.PI) * 16 }
}

/** Smooth S-curve path through the given node indices. */
function pathThrough(indices: number[], n: number) {
  const pts = indices.map((i) => nodePoint(i, n))
  return pts.reduce((d, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`
    const prev = pts[i - 1]
    const mx = (prev.x + p.x) / 2
    return `${d} C ${mx} ${prev.y}, ${mx} ${p.y}, ${p.x} ${p.y}`
  }, '')
}

/**
 * Compact interactive panel for the page masthead: pick a situation, see where
 * in the lifecycle the help applies and what we do. Auto-advances until the
 * visitor takes over. Always dark, like a console.
 */
export function PagePicker({ config, className }: { config: PickerConfig; className?: string }) {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const { options, track } = config
  const option = options[active] ?? options[0]

  useEffect(() => {
    if (reduceMotion || paused || options.length < 2) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % options.length), 5200)
    return () => window.clearInterval(id)
  }, [reduceMotion, paused, options.length])

  if (!option) return null
  const pick = (i: number) => {
    setActive(i)
    setPaused(true)
  }
  const focus = [...(option.focus ?? [])].sort((a, b) => a - b)
  const span =
    focus.length > 1
      ? Array.from({ length: focus[focus.length - 1] - focus[0] + 1 }, (_, k) => focus[0] + k)
      : []
  const fade = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -4 } }

  return (
    <div
      className={cn(
        'relative isolate overflow-hidden rounded-3xl border border-cream/10 bg-night p-5 text-cream shadow-[0_30px_80px_-40px_rgba(22,19,43,0.8)] sm:p-6',
        className,
      )}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 60% at 100% 0%, rgba(240,180,60,0.16), transparent 60%), radial-gradient(55% 55% at 0% 100%, rgba(75,46,131,0.45), transparent 65%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(243,241,234,1) 1px, transparent 1px), linear-gradient(90deg, rgba(243,241,234,1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(80% 80% at 70% 30%, black, transparent)',
        }}
      />

      <p className="font-mono text-[0.62rem] tracking-[0.2em] text-[#a39e93] uppercase">
        {config.prompt}
      </p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {options.map((o, i) => {
          const on = i === active
          return (
            <li key={o.id}>
              <button
                type="button"
                onMouseEnter={() => pick(i)}
                onFocus={() => pick(i)}
                onClick={() => pick(i)}
                aria-pressed={on}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-left text-[0.8rem] leading-tight transition-all duration-300',
                  on
                    ? 'border-amber bg-amber text-[#1a1915]'
                    : 'border-cream/15 text-cream/70 hover:border-cream/40 hover:text-cream',
                )}
              >
                {o.label}
              </button>
            </li>
          )
        })}
      </ul>

      {track ? (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="mt-3 h-auto w-full"
          role="img"
          aria-label={track.join(', ')}
        >
          <path
            d={pathThrough(
              track.map((_, i) => i),
              track.length,
            )}
            fill="none"
            stroke="rgba(243,241,234,0.18)"
            strokeWidth={1.5}
            strokeDasharray="2 6"
            strokeLinecap="round"
          />
          {span.length > 1 ? (
            <motion.path
              key={option.id}
              d={pathThrough(span, track.length)}
              fill="none"
              stroke="#f0b43c"
              strokeWidth={2.5}
              strokeLinecap="round"
              initial={reduceMotion ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : null}
          {track.map((label, i) => {
            const { x, y } = nodePoint(i, track.length)
            const lit = focus.includes(i)
            return (
              <g key={label}>
                {lit && !reduceMotion ? (
                  <motion.circle
                    key={`${option.id}-halo`}
                    cx={x}
                    cy={y}
                    fill="none"
                    stroke="#f0b43c"
                    initial={{ r: 7, opacity: 0.7 }}
                    animate={{ r: 18, opacity: 0 }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                  />
                ) : null}
                <circle
                  cx={x}
                  cy={y}
                  r={lit ? 7 : 4.5}
                  fill={lit ? '#f0b43c' : '#16132b'}
                  stroke={lit ? '#f0b43c' : 'rgba(243,241,234,0.4)'}
                  strokeWidth={1.5}
                  style={{ transition: 'all 0.4s' }}
                />
                <text
                  x={x}
                  y={y + 26}
                  textAnchor="middle"
                  fontSize={9.5}
                  letterSpacing={1.4}
                  className="font-mono"
                  fill={lit ? '#f3f1ea' : 'rgba(243,241,234,0.5)'}
                >
                  {label.toUpperCase()}
                </text>
              </g>
            )
          })}
        </svg>
      ) : null}

      <div aria-live="polite" className="mt-4 min-h-[9.5rem] border-t border-cream/10 pt-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={option.id} {...fade} transition={{ duration: 0.28 }}>
            <p className="font-mono text-[0.62rem] tracking-[0.2em] text-amber uppercase">
              {config.resultLabel}
            </p>
            <p className="mt-2 font-display text-[1.02rem] leading-snug">{option.summary}</p>
            {option.how?.length ? (
              <ul className="mt-2.5 space-y-1.5">
                {option.how.map((h) => (
                  <li key={h} className="flex gap-2.5 text-[0.82rem] leading-snug text-cream/75">
                    <span
                      aria-hidden
                      className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-amber"
                    />
                    {h}
                  </li>
                ))}
              </ul>
            ) : null}
            {option.link ? (
              option.link.hash ? (
                <a
                  href={option.link.to}
                  className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.64rem] tracking-[0.12em] text-amber uppercase hover:underline"
                >
                  {option.link.label}
                  <ArrowRight size={12} aria-hidden />
                </a>
              ) : (
                <Link
                  to={option.link.to}
                  className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.64rem] tracking-[0.12em] text-amber uppercase hover:underline"
                >
                  {option.link.label}
                  <ArrowRight size={12} aria-hidden />
                </Link>
              )
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
