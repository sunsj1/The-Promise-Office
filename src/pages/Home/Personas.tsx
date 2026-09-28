import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { personas } from '@/data/personas'
import { paths } from '@/routes/paths'
import { fadeUp } from '@/animations/variants'
import { Container } from '@/widgets/Container'
import { RevealGroup } from '@/widgets/Reveal'
import { SectionHeader } from '@/widgets/SectionHeader'
import { SpotlightCard } from '@/widgets/SpotlightCard'

/*
  Self-qualification, placed high on the page: a visitor in trouble should be
  able to pick their own situation and jump straight to the relevant mandate.
*/
export function HomePersonas() {
  return (
    <section className="py-20 lg:py-28">
      <Container size="wide">
        <SectionHeader
          eyebrow="Who I work with"
          title="Built for leaders who carry the delivery promise."
          copy="Most difficult delivery problems sit between functions: sales promised one thing, the plan says another, and operations inherits both. That gap is where I work."
        />

        <RevealGroup className="mt-14 grid gap-5 lg:grid-cols-3">
          {personas.map((persona) => (
            <motion.div key={persona.id} variants={fadeUp}>
              <SpotlightCard as="article" className="h-full">
                <Link
                  to={paths.engagementDetail(persona.entry)}
                  className="flex h-full flex-col p-7 lg:p-8"
                >
                  <p className="font-mono text-[0.68rem] tracking-[0.16em] text-amber uppercase">
                    {persona.who}
                  </p>
                  <h3 className="mt-3 font-display text-2xl">{persona.audience}</h3>
                  <p className="mt-4 flex-1 text-[0.97rem] text-muted">{persona.pain}</p>
                  <span className="mt-7 inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-[0.12em] uppercase transition-colors group-hover/spot:text-amber">
                    This sounds like us
                    <ArrowUpRight
                      size={13}
                      aria-hidden
                      className="transition-transform duration-300 group-hover/spot:translate-x-0.5 group-hover/spot:-translate-y-0.5"
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
