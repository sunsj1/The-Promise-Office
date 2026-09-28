import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { practices } from '@/data/engagements'
import { fadeUp } from '@/animations/variants'
import { Container } from '@/widgets/Container'
import { RevealGroup } from '@/widgets/Reveal'
import { SectionHeader } from '@/widgets/SectionHeader'
import { SpotlightCard } from '@/widgets/SpotlightCard'

export function HomePractices() {
  return (
    <section className="py-20 lg:py-28">
      <Container size="wide">
        <SectionHeader
          eyebrow="Four problems we're brought in to solve"
          title="Where the promise usually breaks."
          copy="The Promise Office helps organisations build the capability required to keep an important commitment. These are the four situations that bring clients to us — connected by one idea, worked through the Advisory, GCC and AI practices."
        />
        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {practices.map((practice) => (
            <motion.div key={practice.key} variants={fadeUp}>
              <SpotlightCard as="article" className="h-full">
                <Link to={practice.to} className="flex h-full flex-col p-6 lg:p-7">
                  <span className="font-mono text-[0.68rem] tracking-[0.16em] text-muted">
                    {practice.index}
                  </span>
                  <h3 className="mt-4 font-display text-xl leading-snug">{practice.title}</h3>
                  <p className="mt-3 flex-1 text-[0.93rem] text-muted">{practice.outcome}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[0.68rem] tracking-[0.14em] text-amber uppercase">
                    {practice.cta}
                    <ArrowRight
                      size={13}
                      aria-hidden
                      className="transition-transform duration-300 group-hover/spot:translate-x-0.5"
                    />
                  </span>
                </Link>
              </SpotlightCard>
            </motion.div>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}
