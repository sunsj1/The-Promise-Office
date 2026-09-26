import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Compass, DraftingCompass, GraduationCap, Navigation } from 'lucide-react'
import { useEffect, useState } from 'react'
import { modes } from '@/data/personas'
import { sealEase } from '@/animations/variants'
import { cn } from '@/lib/cn'

const icons = [Compass, DraftingCompass, Navigation, GraduationCap]
const RADIUS = 176

export function OrbitalModes() {
  const reduceMotion = useReducedMotion()
  const [angle, setAngle] = useState(-90)
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (reduceMotion || activeId) return
    const timer = window.setInterval(() => setAngle((prev) => (prev + 0.18) % 360), 40)
    return () => window.clearInterval(timer)
  }, [reduceMotion, activeId])

  const active = modes.find((mode) => mode.id === activeId) ?? modes[0]

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:hidden">
        {modes.map((mode, index) => {
          const Icon = icons[index]
          return (
            <li key={mode.id} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-cream">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15">
                <Icon size={17} strokeWidth={1.6} aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-xl">{mode.title}</h3>
              <p className="mt-2 text-[0.95rem] text-[#a39e93]">{mode.copy}</p>
            </li>
          )
        })}
      </ul>

      <div
        className="relative hidden min-h-[560px] w-full select-none items-center justify-center lg:flex"
        onClick={() => setActiveId(null)}
      >
        <div
          aria-hidden
          className="absolute rounded-full border border-white/10"
          style={{ width: RADIUS * 2, height: RADIUS * 2 }}
        />
        <div
          aria-hidden
          className="absolute rounded-full border border-white/5"
          style={{ width: RADIUS * 1.15, height: RADIUS * 1.15 }}
        />

        <div className="absolute grid place-items-center">
          <span
            aria-hidden
            className="absolute h-36 w-36 rounded-full blur-2xl"
            style={{ background: 'radial-gradient(circle, rgba(240,180,60,0.42), rgba(26,25,21,0.2) 55%, transparent 72%)' }}
          />
          <div className="relative z-10 grid h-[4.6rem] w-[4.6rem] place-items-center rounded-full bg-gradient-to-br from-[#2c2a24] via-[#1a1915] to-[#f0b43c] shadow-[0_0_40px_rgba(240,180,60,0.35)]">
            <span className="h-7 w-7 rounded-full bg-white/90" />
          </div>
        </div>

        {modes.map((mode, index) => {
          const nodeAngle = ((index / modes.length) * 360 + angle) % 360
          const radian = (nodeAngle * Math.PI) / 180
          const x = RADIUS * Math.cos(radian)
          const y = RADIUS * Math.sin(radian)
          const isActive = activeId === mode.id || (!activeId && mode.id === active.id)
          const Icon = icons[index]

          return (
            <button
              key={mode.id}
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                setActiveId(isActive && activeId ? null : mode.id)
              }}
              aria-pressed={Boolean(activeId === mode.id)}
              className="absolute grid place-items-center"
              style={{
                transform: `translate(${x}px, ${y}px)`,
                zIndex: isActive ? 30 : 10,
              }}
            >
              <span
                className={cn(
                  'grid h-12 w-12 place-items-center rounded-full border transition-all duration-300',
                  isActive
                    ? 'border-white bg-white text-[#1a1915] shadow-[0_0_24px_rgba(255,255,255,0.25)]'
                    : 'border-white/20 bg-night text-white/80 hover:border-white/50',
                )}
              >
                <Icon size={17} strokeWidth={1.7} aria-hidden />
              </span>
              <span
                className={cn(
                  'mt-2.5 font-mono text-[0.66rem] tracking-[0.16em] uppercase',
                  isActive ? 'text-white' : 'text-white/50',
                )}
              >
                {mode.title}
              </span>
            </button>
          )
        })}

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: sealEase }}
            className="absolute bottom-0 z-40 w-full max-w-lg text-center"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="font-mono text-[0.68rem] tracking-[0.16em] text-amber uppercase">
              {active.title}
            </p>
            <p className="mt-3 text-[1.02rem] leading-relaxed text-[#a39e93]">{active.copy}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}
