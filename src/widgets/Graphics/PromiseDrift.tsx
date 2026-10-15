import { useId, useState } from 'react'
import { cn } from '@/lib/cn'

const lines = [
  { label: 'Plan', offset: -1, color: 'var(--color-lilac)' },
  { label: 'Service promise', offset: 0, color: 'var(--color-amber)' },
  { label: 'Commercial model', offset: 1, color: '#f3f1ea' },
] as const

function message(drift: number) {
  if (drift < 25) return 'Aligned — what is reported and what is true agree.'
  if (drift < 60) return 'Drifting — small gaps start to hide in handoffs and assumptions.'
  return 'Diverged — the status report will eventually tell you.'
}

/**
 * Three lines that should travel together. Drag the slider to let them drift
 * apart. A dark-band graphic, so it uses fixed light colours.
 */
export function PromiseDrift({ className }: { className?: string }) {
  const id = useId()
  const [drift, setDrift] = useState(35)
  const spread = (drift / 100) * 62

  return (
    <div
      className={cn(
        'rounded-2xl border border-cream/15 bg-cream/[0.04] p-5 backdrop-blur-sm sm:p-6',
        className,
      )}
    >
      <p className="font-mono text-[0.66rem] tracking-[0.18em] text-[#a39e93] uppercase">
        Try it · let the promise drift
      </p>
      <svg
        viewBox="0 0 320 170"
        className="mt-4 h-auto w-full"
        role="img"
        aria-label={message(drift)}
      >
        {[40, 85, 130].map((y) => (
          <line key={y} x1={0} x2={320} y1={y} y2={y} stroke="rgba(243,241,234,0.07)" />
        ))}
        {lines.map((l) => {
          const end = 85 + l.offset * spread
          const mid = 85 + l.offset * spread * 0.35
          return (
            <g key={l.label}>
              <path
                d={`M 10 85 C 110 85, 150 ${mid}, 310 ${end}`}
                fill="none"
                stroke={l.color}
                strokeWidth={2}
                strokeLinecap="round"
              />
              <circle
                cx={310}
                cy={end}
                r={4}
                fill={l.color}
               
              />
            </g>
          )
        })}
        <circle cx={10} cy={85} r={4} fill="#f3f1ea" />
      </svg>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[0.64rem] tracking-[0.1em] text-[#a39e93] uppercase">
        {lines.map((l) => (
          <li key={l.label} className="flex items-center gap-2">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: l.color }}
            />
            {l.label}
          </li>
        ))}
      </ul>
      <label
        htmlFor={id}
        className="mt-5 block font-mono text-[0.64rem] tracking-[0.14em] text-[#a39e93] uppercase"
      >
        Drift
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={drift}
        onChange={(e) => setDrift(Number(e.target.value))}
        className="mt-2 w-full accent-[#f0b43c]"
      />
      <p aria-live="polite" className="mt-3 min-h-[2.6rem] text-[0.93rem] text-cream/85">
        {message(drift)}
      </p>
    </div>
  )
}
