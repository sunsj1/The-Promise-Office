import type { Organisation } from '@/data/site'
import { cn } from '@/lib/cn'

/** Edge-faded horizontal marquee for the organisation marks. */
export function Marquee({
  items,
  duration = 46,
  className,
}: {
  items: readonly Organisation[]
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
        className="marquee-track flex w-max items-center gap-5"
        style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
      >
        {loop.map((item, index) => (
          <span key={`${item.name}-${index}`} className="flex shrink-0 items-center gap-5">
            {item.src ? (
              <span className="grid h-14 place-items-center rounded-xl bg-white px-5 py-2.5 shadow-[0_1px_0_rgba(26,25,21,0.06)]">
                <img
                  src={item.src}
                  alt={item.name}
                  height={32}
                  className="h-8 w-auto max-w-[9.5rem] object-contain"
                />
              </span>
            ) : (
              <span className="grid h-14 place-items-center rounded-xl bg-white px-5 py-2.5 shadow-[0_1px_0_rgba(26,25,21,0.06)]">
                <span className="font-display text-sm whitespace-nowrap text-night sm:text-base">
                  {item.name}
                </span>
              </span>
            )}
            <span aria-hidden className="text-amber/60">
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
