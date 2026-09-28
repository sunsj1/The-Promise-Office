import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { capabilities } from '@/data/engagements'
import { paths } from '@/routes/paths'
import { fadeUp } from '@/animations/variants'
import { Container } from '@/widgets/Container'
import { RevealGroup } from '@/widgets/Reveal'
import { SectionHeader } from '@/widgets/SectionHeader'

export function HomeCapabilities() {
  return (
    <section className="border-y border-line bg-sunk py-14 lg:py-20">
      <Container size="wide">
        <SectionHeader
          eyebrow="Capabilities behind the outcome"
          title="More than advice. Capability that stays."
          copy="Six capabilities cut across all four practices — Advisory (which covers Delivery Recovery and Managed Services), GCC and AI. Each is covered in full — problem, what we do, what you receive and the experience behind it — on the Advisory page."
        />
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability) => (
            <motion.div key={capability.key} variants={fadeUp}>
              <Link
                to={`${paths.advisory}#${capability.key}`}
                className="group/cap block h-full rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-amber"
              >
                <p className="font-mono text-[0.66rem] tracking-[0.14em] text-muted">
                  {capability.index}
                </p>
                <h3 className="mt-3 font-display text-lg leading-snug">{capability.title}</h3>
                <p className="mt-2 font-display text-base text-amber">{capability.philosophy}</p>
              </Link>
            </motion.div>
          ))}
        </RevealGroup>
        <p className="mt-10 max-w-2xl font-display text-lg text-muted">
          The common thread: make the operating reality match the promise.
        </p>
      </Container>
    </section>
  )
}
