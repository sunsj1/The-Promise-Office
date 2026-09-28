import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'
import { useRef } from 'react'
import { healthCheckOffer } from '@/data/engagements'
import { paths } from '@/routes/paths'
import { LinkButton } from '@/widgets/Button'
import { Container } from '@/widgets/Container'
import { Eyebrow } from '@/widgets/Eyebrow'
import { Reveal } from '@/widgets/Reveal'

/*
  Container-scroll treatment from 21st.dev: the card tilts upright as it enters,
  which reads as a document being laid on the desk.
*/
export function HomeHealthCheckTeaser() {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [14, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1])

  return (
    <section className="border-t border-line py-14 lg:py-20">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Where most clients start</Eyebrow>
            <h2 className="mt-5 text-3xl sm:text-4xl">{healthCheckOffer.title}</h2>
            <p className="mt-5 text-[1.0625rem] text-muted">{healthCheckOffer.lead}</p>

            <dl className="mt-8 space-y-4 border-t border-line pt-7">
              {healthCheckOffer.facts.map((fact) => (
                <div key={fact.label} className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4">
                  <dt className="font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                    {fact.label}
                  </dt>
                  <dd className="text-[0.95rem]">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-wrap gap-3">
              <LinkButton to={paths.healthCheck} size="lg">
                Start the Health Check
              </LinkButton>
              <LinkButton to={paths.contact} variant="outline" size="lg">
                Request a Health Check
              </LinkButton>
            </div>
          </Reveal>

          <div ref={ref} className="lg:col-span-7" style={{ perspective: 1200 }}>
            <motion.div
              style={reduceMotion ? undefined : { rotateX, scale }}
              className="rounded-3xl border border-line bg-surface p-8 shadow-[0_40px_90px_-50px_rgba(22,19,43,0.5)] lg:p-10"
            >
              <p className="font-mono text-[0.68rem] tracking-[0.16em] text-amber uppercase">
                You receive
              </p>
              <ul className="mt-6 space-y-5">
                {healthCheckOffer.receive.map((item, index) => (
                  <li key={item} className="flex gap-4 border-b border-line pb-5 last:border-0 last:pb-0">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line font-mono text-[0.65rem] text-amber">
                      0{index + 1}
                    </span>
                    <span className="text-[1.0625rem]">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-center gap-2.5 rounded-xl bg-sunk px-5 py-4">
                <Check size={16} className="shrink-0 text-amber" aria-hidden />
                <p className="text-[0.92rem] text-muted">
                  Fixed scope, fixed fee, one executive readout. No open-ended discovery.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
