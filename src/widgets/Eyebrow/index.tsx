import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Mono label with a short amber rule, used to open every section. */
export function Eyebrow({
  children,
  className,
  rule = true,
}: {
  children: ReactNode
  className?: string
  rule?: boolean
}) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.2em] text-muted uppercase',
        className,
      )}
    >
      {rule ? <span aria-hidden className="h-px w-6 bg-amber" /> : null}
      {children}
    </p>
  )
}
