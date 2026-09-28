import { useCountUp } from '@/lib/useCountUp'
import { cn } from '@/lib/cn'

type StatCounterProps = {
  value: number
  prefix?: string
  suffix?: string
  label: string
  className?: string
}

export function StatCounter({ value, prefix = '', suffix = '', label, className }: StatCounterProps) {
  const { ref, value: display } = useCountUp(value)

  return (
    <div className={cn(className)}>
      <p className="font-display text-4xl leading-none tracking-tight sm:text-5xl">
        <span className="text-muted">{prefix}</span>
        <span ref={ref} className="tabular-nums">
          {display}
        </span>
        <span className="text-amber">{suffix}</span>
      </p>
      <p className="mt-3 max-w-[16rem] font-mono text-[0.75rem] tracking-[0.14em] text-muted uppercase">
        {label}
      </p>
    </div>
  )
}
