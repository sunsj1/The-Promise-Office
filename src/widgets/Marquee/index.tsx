import { cn } from '@/lib/cn'

/** Edge-faded horizontal marquee for the organisation list. */
export function Marquee({
  items,
  duration = 46,
  className,
}: {
  items: readonly string[]
  duration?: number
  className?: string
}) {
  const loop = [...items, ...items]

  return (
    <div
      className={cn(
        'relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        className,
      )}
    >
      <div
        className="marquee-track flex w-max items-center gap-10"
        style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
      >
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="flex shrink-0 items-center gap-10">
            <span className="font-display text-lg whitespace-nowrap text-muted sm:text-xl">
              {item}
            </span>
            <span aria-hidden className="text-amber/60">
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
