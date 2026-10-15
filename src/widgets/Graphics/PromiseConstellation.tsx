import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { lensStages } from '@/data/lens'
import { cn } from '@/lib/cn'

const SIZE = 360
const C = SIZE / 2
const R = 128

function point(index: number, radius = R) {
  const angle = (index / lensStages.length) * Math.PI * 2 - Math.PI / 2
  return { x: C + Math.cos(angle) * radius, y: C + Math.sin(angle) * radius }
}

/** Cycles the active index until the visitor takes over. */
export function useLensState() {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduceMotion || paused) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % lensStages.length), 2800)
    return () => window.clearInterval(id)
  }, [reduceMotion, paused])

  return {
    active,
    select: (i: number) => {
      setActive(i)
      setPaused(true)
    },
    resume: () => setPaused(false),
  }
}

type Props = {
  active: number
  onSelect: (index: number) => void
  onLeave?: () => void
  className?: string
}

/**
 * Six stages of the Promise Lens on a ring. The selected stage lights its
 * spoke and the centre states the question it asks.
 */
export function PromiseConstellation({ active, onSelect, onLeave, className }: Props) {
  const stage = lensStages[active]
  return (
    <figure className={cn('relative', className)} onMouseLeave={onLeave}>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="group"
        aria-label="The Promise Lens: Value, Economics, Context, Change, Delivery, Evidence"
        className="h-auto w-full"
      >
        <circle cx={C} cy={C} r={R} fill="none" stroke="var(--line)" strokeDasharray="2 6" />
        <circle cx={C} cy={C} r={R * 0.62} fill="none" stroke="var(--line)" opacity={0.6} />
        {lensStages.map((_, i) => {
          const p = point(i)
          const next = point((i + 1) % lensStages.length)
          return (
            <g key={i}>
              <line
                x1={C}
                y1={C}
                x2={p.x}
                y2={p.y}
                stroke={i === active ? 'var(--color-amber)' : 'var(--line)'}
                strokeWidth={i === active ? 1.5 : 1}
                style={{ transition: 'stroke 0.4s' }}
              />
              <line x1={p.x} y1={p.y} x2={next.x} y2={next.y} stroke="var(--line)" opacity={0.7} />
            </g>
          )
        })}
        {lensStages.map((s, i) => {
          const p = point(i)
          const label = point(i, R + 30)
          const on = i === active
          return (
            <g
              key={s.name}
              tabIndex={0}
              role="button"
              aria-label={`${s.name}: ${s.question}`}
              aria-pressed={on}
              className="cursor-pointer outline-none"
              onMouseEnter={() => onSelect(i)}
              onFocus={() => onSelect(i)}
              onClick={() => onSelect(i)}
            >
              <circle cx={p.x} cy={p.y} r={22} fill="transparent" />
              {on ? (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={13}
                  fill="none"
                  stroke="var(--color-amber)"
                  opacity={0.35}
                />
              ) : null}
              <circle
                cx={p.x}
                cy={p.y}
                r={on ? 7 : 5}
                fill={on ? 'var(--color-amber)' : 'var(--surface)'}
                stroke={on ? 'var(--color-amber)' : 'var(--muted)'}
                strokeWidth={1.5}
                style={{ transition: 'all 0.3s' }}
              />
              <text
                x={label.x}
                y={label.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-mono"
                fontSize={10}
                letterSpacing={1.4}
                fill={on ? 'var(--ink)' : 'var(--muted)'}
              >
                {s.name.toUpperCase()}
              </text>
            </g>
          )
        })}
        <circle cx={C} cy={C} r={7} fill="var(--color-amber)" />
        <circle cx={C} cy={C} r={13} fill="none" stroke="var(--color-amber)" opacity={0.4} />
      </svg>
      <figcaption
        aria-live="polite"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span className="mt-[5.5rem] block max-w-[9rem] text-center font-display text-[0.9rem] leading-snug text-ink sm:mt-24">
          {stage.question}
        </span>
      </figcaption>
    </figure>
  )
}

/** Self-contained version used as the default masthead graphic. */
export function AutoConstellation({ className }: { className?: string }) {
  const { active, select, resume } = useLensState()
  return (
    <PromiseConstellation
      active={active}
      onSelect={select}
      onLeave={resume}
      className={className}
    />
  )
}
