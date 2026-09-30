import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { site } from '@/data/site'
import { paths } from '@/routes/paths'
import { lineRise, sealEase, stagger } from '@/animations/variants'
import { BackgroundPaths } from '@/widgets/BackgroundPaths'
import { BookCallButton, LinkButton } from '@/widgets/Button'
import { Container } from '@/widgets/Container'
import { Seal } from '@/widgets/Seal'

const headline = ['Make the promise', 'deliverable.']

export function HomeHero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden pt-24 pb-10 lg:pt-40 lg:pb-14">
      <BackgroundPaths className="pointer-events-none absolute inset-0 -z-10 opacity-80 dark:opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 12% 0%, var(--glow), transparent 58%), radial-gradient(40% 36% at 90% 18%, rgba(240,180,60,0.14), transparent 62%)',
        }}
      />

      <Container size="wide">
        <motion.div
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
          variants={stagger}
          className="grid items-center gap-8 lg:grid-cols-12 lg:gap-6"
        >
          <div className="lg:col-span-7">
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: sealEase } },
              }}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.7rem] tracking-[0.18em] text-muted uppercase"
            >
              <span aria-hidden className="h-px w-8 bg-amber" />
              {site.discipline}
            </motion.p>

            <h1 className="mt-6 max-w-5xl text-[clamp(2.5rem,6.4vw,5rem)] leading-[0.96]">
              {headline.map((line, index) => (
                <span key={line} className="block overflow-hidden pb-1">
                  <motion.span variants={reduceMotion ? undefined : lineRise} className="block">
                    {index === 1 ? <span className="text-gradient-seal">{line}</span> : line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: sealEase } },
              }}
              className="mt-6 max-w-xl text-[1.05rem] text-muted sm:text-lg"
            >
              The programme that must recover. The GCC or service model that must scale. The AI
              investment that must prove its worth. The Promise Office brings the independent
              judgment, operating design and hands-on leadership to turn those commitments into
              measurable performance.
            </motion.p>
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.96 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: sealEase } },
            }}
            className="mx-auto w-[min(72%,18rem)] lg:col-span-5 lg:row-span-2 lg:mx-0 lg:w-full lg:max-w-[26rem] lg:justify-self-end"
          >
            <div className="relative mx-auto aspect-square w-full">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_42%,rgba(240,180,60,0.32),rgba(240,180,60,0.08)_42%,transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_42%,rgba(240,180,60,0.22),rgba(240,180,60,0.05)_48%,transparent_72%)]"
              />
              <div aria-hidden className="absolute inset-[9%] rounded-full border border-line" />
              <div aria-hidden className="absolute inset-[19%] rounded-full border border-line/60" />
              <div className="absolute inset-0 grid place-items-center">
                <Seal animate delay={0.5} className="h-[30%] w-[30%] text-ink" />
              </div>
            </div>
            <p className="mt-6 text-center font-mono text-[0.7rem] tracking-[0.2em] text-muted uppercase">
              Advisory · GCC · AI
            </p>
          </motion.div>

          <div className="lg:col-span-7">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: sealEase } },
              }}
              className="flex flex-wrap items-center gap-3"
            >
              <BookCallButton size="lg">Request a 30-minute call</BookCallButton>
              <LinkButton to={paths.healthCheck} variant="outline" size="lg" arrow={false}>
                <span className="inline-flex items-center gap-2">
                  Start with a delivery health check
                  <ArrowDown size={15} aria-hidden />
                </span>
              </LinkButton>
            </motion.div>

            <motion.p
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.7, delay: 0.15 } },
              }}
              className="mt-10 font-mono text-[0.68rem] tracking-[0.16em] text-muted uppercase"
            >
              Independent advisory · {site.base} · working across India and international delivery
              environments
            </motion.p>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
