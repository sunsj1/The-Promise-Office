import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ElementType, ReactNode } from 'react'
import { fadeUp, stagger, viewportOnce } from '@/animations/variants'
import { cn } from '@/lib/cn'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  variants?: Variants
  as?: ElementType
}

export function Reveal({ children, className, delay = 0, variants = fadeUp, as }: RevealProps) {
  const reduceMotion = useReducedMotion()
  const Component = as ? motion(as) : motion.div

  return (
    <Component
      className={cn(className)}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </Component>
  )
}

/** Wraps a list so children with `variants` animate in sequence. */
export function RevealGroup({
  children,
  className,
  as,
}: {
  children: ReactNode
  className?: string
  as?: ElementType
}) {
  const reduceMotion = useReducedMotion()
  const Component = as ? motion(as) : motion.div

  return (
    <Component
      className={cn(className)}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger}
    >
      {children}
    </Component>
  )
}
