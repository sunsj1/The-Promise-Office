import { careerStats } from '@/data/evidence'
import { Container } from '@/widgets/Container'
import { RevealGroup } from '@/widgets/Reveal'
import { SectionHeader } from '@/widgets/SectionHeader'
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
    <section className="border-y border-line bg-sunk py-14 lg:py-16">
      <Container size="wide">
        <SectionHeader
          eyebrow="Experience at a glance"
          title="Built on experience. Designed to scale."
          copy="The Promise Office draws on its founder's experience across complex delivery, transformation and commercial leadership. We bring the right expertise to each engagement and build practical approaches that clients can sustain."
        />
        <RevealGroup className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-12">
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
        <p className="mt-10 max-w-3xl font-mono text-[0.68rem] leading-relaxed text-muted">
          These are selected experiences from the founder's prior leadership roles — not contracts or
          outcomes delivered by The Promise Office. The ~US$20M figure is programme value brought back
          under controlled delivery, not money recovered. The ~150/day figure describes the volume an
          automated intake workflow handles, not a productivity or cost-saving claim.
        </p>
      </Container>
    </section>
  )
}
