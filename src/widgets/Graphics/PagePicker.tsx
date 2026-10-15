import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { PickerConfig } from '@/data/pagePickers'
import { cn } from '@/lib/cn'

const W = 640
const H = 132

function nodePoint(i: number, n: number) {
  const t = n === 1 ? 0.5 : i / (n - 1)
  return { x: 44 + t * (W - 88), y: 58 - Math.sin(t * Math.PI) * 24 }
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
 * The masthead "stage": pick a situation on the left; on the right a lifecycle
 * trace lights up where the help applies, with the response beneath it.
 * Auto-advances until the visitor takes over. Always dark, like a console.
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
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 } }

  return (
    <div
      className={cn(
        'relative isolate overflow-hidden rounded-3xl border border-cream/10 bg-night text-cream shadow-[0_30px_80px_-40px_rgba(22,19,43,0.8)]',
        className,
      )}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(50% 70% at 100% 0%, rgba(240,180,60,0.16), transparent 60%), radial-gradient(45% 60% at 0% 100%, rgba(75,46,131,0.45), transparent 65%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(243,241,234,1) 1px, transparent 1px), linear-gradient(90deg, rgba(243,241,234,1) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(70% 90% at 70% 40%, black, transparent)',
        }}
      />

      <div className="grid gap-0 lg:grid-cols-12">
        {/* Picker */}
        <div className="border-b border-cream/10 p-5 sm:p-7 lg:col-span-5 lg:border-r lg:border-b-0">
          <p className="font-mono text-[0.64rem] tracking-[0.2em] text-[#a39e93] uppercase">
            {config.prompt}
          </p>
          <ul className="mt-4 space-y-1">
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
                      'group relative flex w-full items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-left text-[0.95rem] leading-snug transition-all duration-300',
                      on
                        ? 'bg-cream/[0.08] text-cream'
                        : 'text-cream/60 hover:bg-cream/[0.04] hover:text-cream',
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'absolute top-2 bottom-2 left-0 w-0.5 rounded-full bg-amber transition-opacity duration-300',
                        on ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    <span
                      className={cn(
                        'font-mono text-[0.62rem] tracking-[0.1em] transition-colors',
                        on ? 'text-amber' : 'text-cream/35',
                      )}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {o.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Response */}
        <div className="flex min-h-[19rem] flex-col p-5 sm:p-7 lg:col-span-7">
          {track ? (
            <div>
              {config.trackLabel ? (
                <p className="font-mono text-[0.64rem] tracking-[0.2em] text-[#a39e93] uppercase">
                  {config.trackLabel}
                </p>
              ) : null}
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="mt-2 h-auto w-full"
                role="img"
                aria-label={track.join(', ')}
              >
                <path
                  d={pathThrough(
                    track.map((_, i) => i),
                    track.length,
                  )}
                  fill="none"
                  stroke="rgba(243,241,234,0.16)"
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
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                ) : null}
                {track.map((label, i) => {
                  const { x, y } = nodePoint(i, track.length)
                  const lit = focus.includes(i)
                  const inSpan = span.includes(i)
                  return (
                    <g key={label}>
                      {lit && !reduceMotion ? (
                        <motion.circle
                          key={`${option.id}-halo`}
                          cx={x}
                          cy={y}
                          fill="none"
                          stroke="#f0b43c"
                          initial={{ r: 8, opacity: 0.7 }}
                          animate={{ r: 22, opacity: 0 }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                        />
                      ) : null}
                      <circle
                        cx={x}
                        cy={y}
                        r={lit ? 8 : 5}
                        fill={lit ? '#f0b43c' : inSpan ? 'rgba(240,180,60,0.5)' : '#16132b'}
                        stroke={lit ? '#f0b43c' : 'rgba(243,241,234,0.4)'}
                        strokeWidth={1.5}
                        style={{ transition: 'all 0.4s' }}
                      />
                      <text
                        x={x}
                        y={y + 30}
                        textAnchor="middle"
                        fontSize={11}
                        letterSpacing={1.6}
                        className="font-mono"
                        fill={lit ? '#f3f1ea' : 'rgba(243,241,234,0.5)'}
                      >
                        {label.toUpperCase()}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>
          ) : (
            <span
              aria-hidden
              className="pointer-events-none absolute -top-4 right-6 font-display text-[9rem] leading-none text-amber/[0.07] select-none"
            >
              {String(active + 1).padStart(2, '0')}
            </span>
          )}

          <div aria-live="polite" className="mt-auto pt-5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={option.id} {...fade} transition={{ duration: 0.3 }}>
                <p className="font-mono text-[0.64rem] tracking-[0.2em] text-amber uppercase">
                  {config.resultLabel}
                </p>
                <p className="mt-2 max-w-xl font-display text-[1.2rem] leading-snug">
                  {option.summary}
                </p>
                {option.how?.length ? (
                  <ul
                    className={cn('mt-4 grid gap-2.5', option.how.length > 1 && 'sm:grid-cols-3')}
                  >
                    {option.how.map((h, i) => (
                      <li
                        key={h}
                        className="rounded-xl border border-cream/10 bg-cream/[0.04] px-3.5 py-3 text-[0.85rem] leading-snug text-cream/80"
                      >
                        <span className="mb-1.5 block font-mono text-[0.6rem] text-amber">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {option.link ? (
                  option.link.hash ? (
                    <a
                      href={option.link.to}
                      className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.68rem] tracking-[0.12em] text-amber uppercase hover:underline"
                    >
                      {option.link.label}
                      <ArrowRight size={12} aria-hidden />
                    </a>
                  ) : (
                    <Link
                      to={option.link.to}
                      className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.68rem] tracking-[0.12em] text-amber uppercase hover:underline"
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
      </div>
    </div>
  )
}
