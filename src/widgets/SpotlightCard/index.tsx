import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/*
  Cursor-tracking spotlight, adapted from the 21st.dev Spotlight Card pattern.
  Position is written to CSS custom properties so the glow follows the pointer
  without re-rendering React on every mousemove.
*/
export function SpotlightCard({
  children,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'article' | 'li'
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    node.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
    node.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
  }

  return (
    <Tag
      ref={ref as never}
      onMouseMove={onMouseMove}
      className={cn(
        'group/spot relative isolate overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-plum/40 dark:hover:border-amber/30',
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), var(--glow), transparent 65%)',
        }}
      />
      <div className="relative">{children}</div>
    </Tag>
  )
}
