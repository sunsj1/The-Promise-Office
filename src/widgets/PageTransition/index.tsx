import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { pageTransition } from '@/animations/variants'

export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return <>{children}</>

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageTransition}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
