import { disclaimers, organisations } from '@/data/site'
import { careerStats } from '@/data/evidence'
import { Container } from '@/widgets/Container'
import { Eyebrow } from '@/widgets/Eyebrow'
import { Marquee } from '@/widgets/Marquee'
import { Reveal, RevealGroup } from '@/widgets/Reveal'
import { StatCounter } from '@/widgets/StatCounter'
import { fadeUp } from '@/animations/variants'
import { motion } from 'framer-motion'

export function HomeCredibility() {
  return (
    <section className="border-y border-line bg-sunk py-16 lg:py-20">
      <Container size="wide">
        <RevealGroup className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {careerStats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <StatCounter
                value={stat.value}
                prefix={'prefix' in stat ? stat.prefix : undefined}
                suffix={'suffix' in stat ? stat.suffix : undefined}
                label={stat.label}
              />
            </motion.div>
          ))}
        </RevealGroup>
      </Container>

      <Reveal className="mt-16">
        <Container size="wide">
          <Eyebrow>Experience behind the practice</Eyebrow>
          <p className="mt-4 max-w-2xl text-[0.97rem] text-muted">
            Organisations I have worked within or delivered for during prior roles, across telecom,
            technology and enterprise operations.
          </p>
        </Container>
        <Marquee items={organisations} className="mt-8" />
        <Container size="wide">
          <p className="mt-7 max-w-3xl font-mono text-[0.68rem] leading-relaxed text-muted">
            {disclaimers.marks}
          </p>
        </Container>
      </Reveal>
    </section>
  )
}
