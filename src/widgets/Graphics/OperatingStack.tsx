import { useState } from 'react'
import { cn } from '@/lib/cn'

const layers = [
  {
    name: 'Use-case portfolio',
    note: 'Which AI use cases earn a place, and in what order.',
  },
  {
    name: 'Workflow redesign',
    note: 'Work rebuilt around the capability, not bolted onto it.',
  },
  {
    name: 'AI operating model',
    note: 'Who runs, funds and improves AI-enabled services.',
  },
  {
    name: 'Governance',
    note: 'Controls that change decisions rather than add paperwork.',
  },
  {
    name: 'Enablement and adoption',
    note: 'People equipped to use it in real work.',
  },
  {
    name: 'Human/AI decision rights',
    note: 'What the system recommends and what a person decides.',
  },
  {
    name: 'Benefits measurement',
    note: 'Proof the promised outcome materialised.',
  },
] as const

/** The operating layer an AI-enabled GCC needs, as an explorable stack. */
export function OperatingStack({ className }: { className?: string }) {
  const [active, setActive] = useState(0)
  return (
    <div className={cn('rounded-2xl border border-cream/15 bg-cream/[0.04] p-5 sm:p-6', className)}>
      <p className="font-mono text-[0.66rem] tracking-[0.18em] text-[#a39e93] uppercase">
        The operating layer
      </p>
      <ol className="mt-4 space-y-1.5">
        {layers.map((layer, i) => {
          const on = i === active
          return (
            <li key={layer.name}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={on}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg border px-3.5 py-2.5 text-left text-[0.93rem] transition-all duration-300',
                  on
                    ? 'translate-x-1.5 border-amber/60 bg-amber/10 text-cream'
                    : 'border-cream/10 text-cream/70 hover:border-cream/25',
                )}
              >
                <span
                  className={cn('font-mono text-[0.66rem]', on ? 'text-amber' : 'text-[#a39e93]')}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                {layer.name}
              </button>
            </li>
          )
        })}
      </ol>
      <p aria-live="polite" className="mt-4 min-h-[2.6rem] text-[0.9rem] text-cream/80">
        {layers[active].note}
      </p>
    </div>
  )
}
