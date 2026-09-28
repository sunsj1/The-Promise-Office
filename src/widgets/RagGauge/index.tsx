import { motion } from 'framer-motion'
import { sealEase } from '@/animations/variants'
import type { Verdict } from '@/data/healthCheck'
import { cn } from '@/lib/cn'

const colors: Record<Verdict, string> = {
  green: 'var(--color-rag-green)',
  amber: 'var(--color-rag-amber)',
  red: 'var(--color-rag-red)',
}

/*
  Semicircular RAG gauge built on the same arc geometry as the seal, so the
  assessment result and the brand mark share one visual language.
*/
export function RagGauge({
  ratio,
  verdict,
  label,
  className,
}: {
  /** 0 to 1, where 1 is the highest risk score. */
  ratio: number
  verdict: Verdict | null
  label: string
  className?: string
}) {
  const stroke = verdict ? colors[verdict] : 'var(--line)'

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <svg viewBox="0 0 200 112" className="w-full max-w-[260px]">
        <path
          d="M14 100 A86 86 0 0 1 186 100"
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          className="stroke-line"
        />
        <motion.path
          d="M14 100 A86 86 0 0 1 186 100"
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          stroke={stroke}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: Math.min(Math.max(ratio, 0), 1) }}
          transition={{ duration: 0.7, ease: sealEase }}
        />
      </svg>
      <div className="-mt-4 flex w-full max-w-[260px] justify-between font-mono text-[0.75rem] tracking-[0.12em] text-muted uppercase">
        <span>Steady</span>
        <span>At risk</span>
      </div>
      <p className="mt-3 text-center font-mono text-[0.75rem] tracking-[0.08em] text-muted">
        {label}
      </p>
    </div>
  )
}
