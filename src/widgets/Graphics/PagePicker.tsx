import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { PickerConfig } from '@/data/pagePickers'
import { cn } from '@/lib/cn'

/**
 * "Pick your situation, see how we help" explorer used as each page's masthead
 * graphic. Auto-advances until the visitor takes over.
 */
export function PagePicker({ config, className }: { config: PickerConfig; className?: string }) {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const { options, track, variant = 'rail' } = config
  const option = options[active] ?? options[0]

  useEffect(() => {
    if (reduceMotion || paused || options.length < 2) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % options.length), 4200)
    return () => window.clearInterval(id)
  }, [reduceMotion, paused, options.length])

  if (!option) return null
  const pick = (i: number) => {
    setActive(i)
    setPaused(true)
  }
  const focus = option.focus ?? []

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-line bg-surface p-5 shadow-[0_20px_50px_-30px_rgba(22,19,43,0.35)] sm:p-6',
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full"
        style={{ background: 'radial-gradient(closest-side, var(--glow), transparent)' }}
      />
      <p className="relative font-mono text-[0.64rem] tracking-[0.18em] text-muted uppercase">
        {config.prompt}
      </p>

      <ul className="relative mt-3 space-y-1.5">
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
                  'flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-[0.9rem] leading-snug transition-all duration-300',
                  on
                    ? 'border-amber/70 bg-amber/10 text-ink'
                    : 'border-transparent text-muted hover:border-line hover:text-ink',
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'h-1.5 w-1.5 shrink-0 rounded-full transition-colors',
                    on ? 'bg-amber' : 'bg-line',
                  )}
                />
                {o.label}
              </button>
            </li>
          )
        })}
      </ul>

      {track ? (
        <div className="relative mt-5">
          {config.trackLabel ? (
            <p className="font-mono text-[0.6rem] tracking-[0.16em] text-muted uppercase">
              {config.trackLabel}
            </p>
          ) : null}
          <ol
            className={cn(
              'mt-3 flex items-center',
              variant === 'flow' ? 'gap-1' : 'justify-between',
            )}
          >
            {track.map((t, i) => {
              const lit = focus.includes(i)
              return (
                <li
                  key={t}
                  className={cn(
                    'flex items-center',
                    variant === 'flow' ? 'min-w-0 flex-1' : 'flex-1 flex-col gap-2 text-center',
                  )}
                >
                  {variant === 'flow' ? (
                    <>
                      <span
                        className={cn(
                          'flex-1 truncate rounded-md border px-1.5 py-1.5 text-center font-mono text-[0.56rem] tracking-[0.06em] uppercase transition-all duration-300',
                          lit ? 'border-amber bg-amber/15 text-ink' : 'border-line text-muted',
                        )}
                      >
                        {t}
                      </span>
                      {i < track.length - 1 ? (
                        <ArrowRight
                          size={10}
                          aria-hidden
                          className={cn('shrink-0', lit ? 'text-amber' : 'text-line')}
                        />
                      ) : null}
                    </>
                  ) : (
                    <>
                      <span className="relative flex w-full items-center justify-center">
                        {i > 0 ? (
                          <span
                            aria-hidden
                            className="absolute right-1/2 left-[-50%] h-px bg-line"
                          />
                        ) : null}
                        <span
                          className={cn(
                            'relative h-2.5 w-2.5 rounded-full border transition-all duration-300',
                            lit
                              ? 'scale-125 border-amber bg-amber shadow-[0_0_0_4px_rgba(240,180,60,0.2)]'
                              : 'border-muted bg-surface',
                          )}
                        />
                      </span>
                      <span
                        className={cn(
                          'font-mono text-[0.56rem] tracking-[0.06em] uppercase transition-colors',
                          lit ? 'text-ink' : 'text-muted',
                        )}
                      >
                        {t}
                      </span>
                    </>
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      ) : null}

      <div aria-live="polite" className="relative mt-5 border-t border-line pt-4">
        <p className="font-mono text-[0.6rem] tracking-[0.16em] text-amber uppercase">
          {config.resultLabel}
        </p>
        <p className="mt-2 line-clamp-4 text-[0.9rem] text-ink">{option.summary}</p>
        {option.how?.length ? (
          <ul className="mt-2.5 space-y-1.5">
            {option.how.map((h) => (
              <li key={h} className="flex gap-2.5 text-[0.84rem] text-muted">
                <span aria-hidden className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-amber" />
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
      </div>
    </div>
  )
}
