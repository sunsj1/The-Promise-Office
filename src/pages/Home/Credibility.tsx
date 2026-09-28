import { careerStats } from '@/data/evidence'
import { Container } from '@/widgets/Container'
import { Eyebrow } from '@/widgets/Eyebrow'
import { RevealGroup } from '@/widgets/Reveal'
import { StatCounter } from '@/widgets/StatCounter'
import { fadeUp } from '@/animations/variants'
import { motion } from 'framer-motion'

export function HomeCredibility() {
  return (
    <section className="border-y border-line bg-sunk py-16 lg:py-20">
      <Container size="wide">
        <Eyebrow className="justify-center sm:justify-start">Experience at a glance</Eyebrow>
        <RevealGroup className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
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
    </section>
  )
}
