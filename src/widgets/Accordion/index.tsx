import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { sealEase } from '@/animations/variants'
import { cn } from '@/lib/cn'

type Item = { readonly q: string; readonly a: string }

export function Accordion({ items, className }: { items: readonly Item[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <ul className={cn('divide-y divide-line border-y border-line', className)}>
      {items.map((item, index) => {
        const isOpen = open === index
        return (
          <li key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-amber"
            >
              <span className="font-display text-lg sm:text-xl">{item.q}</span>
              <Plus
                size={18}
                aria-hidden
                className={cn(
                  'mt-1 shrink-0 text-muted transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  isOpen && 'rotate-45 text-amber',
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.34, ease: sealEase }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pr-10 pb-6 text-[0.97rem] text-muted">{item.a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}
