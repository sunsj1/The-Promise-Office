import { careerStats } from '@/data/evidence'
import { Container } from '@/widgets/Container'
import { Eyebrow } from '@/widgets/Eyebrow'
import { RevealGroup } from '@/widgets/Reveal'
import { fadeUp } from '@/animations/variants'
import { motion } from 'framer-motion'

/** Renders a leading "~" in muted tone, keeping the rest of the figure at full weight. */
function Figure({ text }: { text: string }) {
  if (text.startsWith('~')) {
    return (
      <>
        <span className="text-muted">~</span>
        {text.slice(1)}
      </>
    )
  }
  return <>{text}</>
}

/** A metric like "~350 → ~75" gets its arrow picked out in amber; everything else renders as-is. */
function MetricValue({ metric }: { metric: string }) {
  if (metric.includes('→')) {
    const [left, right] = metric.split('→').map((part) => part.trim())
    return (
      <>
        <Figure text={left} />
        <span className="mx-1.5 text-amber">→</span>
        <Figure text={right} />
      </>
    )
  }
  return <Figure text={metric} />
}

export function ExperienceGlance() {
  return (
    <section className="border-y border-line bg-sunk py-12 lg:py-14">
      <Container size="wide">
        <Eyebrow className="justify-center sm:justify-start">Experience at a glance</Eyebrow>
        <RevealGroup className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-12">
          {careerStats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <p className="font-display text-[clamp(1.35rem,3.4vw,2.1rem)] leading-none tracking-tight tabular-nums">
                <MetricValue metric={stat.metric} />
              </p>
              <p className="mt-3 max-w-[16rem] font-mono text-[0.7rem] tracking-[0.14em] text-muted uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}
