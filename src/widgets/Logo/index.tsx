import { site } from '@/data/site'
import { Seal } from '@/widgets/Seal'
import { cn } from '@/lib/cn'

type LogoProps = {
  className?: string
  /** Hides the wordmark, leaving the seal only (used on narrow viewports). */
  markOnly?: boolean
}

export function Logo({ className, markOnly = false }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <Seal className="h-9 w-9 shrink-0" />
      {markOnly ? null : (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.05rem] font-semibold tracking-tight">
            The Promise Office
          </span>
          <span className="mt-0.5 font-mono text-[0.58rem] tracking-[0.18em] text-muted uppercase">
            {site.tagline}
          </span>
        </span>
      )}
    </span>
  )
}
