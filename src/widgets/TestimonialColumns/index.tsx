import { Quote } from 'lucide-react'
import { testimonials } from '@/data/perspective'
import { cn } from '@/lib/cn'

type Item = (typeof testimonials)[number]

function Column({
  items,
  duration,
  className,
}: {
  items: readonly Item[]
  duration: number
  className?: string
}) {
  const loop = [...items, ...items]

  return (
    <div className={cn('overflow-hidden', className)}>
      <div
        className="column-track flex flex-col gap-5"
        style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
      >
        {loop.map((item, index) => (
          <figure
            key={`${item.name}-${index}`}
            className="rounded-2xl border border-line bg-surface p-6"
          >
            <Quote size={18} className="text-amber" strokeWidth={2} aria-hidden />
            <blockquote className="mt-4 text-[1.02rem] leading-relaxed">“{item.text}”</blockquote>
            <figcaption className="mt-5 border-t border-line pt-4">
              <p className="font-display text-base font-semibold">{item.name}</p>
              <p className="mt-1 font-mono text-[0.75rem] tracking-[0.12em] text-muted uppercase">
                {item.relation} · {item.year}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

export function TestimonialColumns() {
  const first = [testimonials[0], testimonials[1]]
  const second = [testimonials[1], testimonials[2]]
  const third = [testimonials[2], testimonials[0]]

  return (
    <div className="flex justify-center gap-5 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] max-h-[34rem] overflow-hidden">
      <Column items={first} duration={22} />
      <Column items={second} duration={28} className="hidden md:block" />
      <Column items={third} duration={24} className="hidden lg:block" />
    </div>
  )
}

export function TestimonialColumn({
  testimonials: items,
  duration = 26,
  className,
}: {
  testimonials: readonly Item[]
  duration?: number
  className?: string
}) {
  return <Column items={items} duration={duration} className={className} />
}
