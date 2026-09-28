import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { engagements } from '@/data/engagements'
import { paths } from '@/routes/paths'
import { fadeUp } from '@/animations/variants'
import { LinkButton } from '@/widgets/Button'
import { Container } from '@/widgets/Container'
import { RevealGroup } from '@/widgets/Reveal'
import { SectionHeader } from '@/widgets/SectionHeader'
import { SpotlightCard } from '@/widgets/SpotlightCard'
import { cn } from '@/lib/cn'

/*
  Bento layout adapted from the 21st.dev grid feature cards: the three featured
  mandates take wider cells so the eye lands on them first.
*/
export function HomeEngagements() {
  return (
    <section className="relative border-t border-line py-20 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dotgrid opacity-40" />
      <Container size="wide" className="relative">
        <SectionHeader
          eyebrow="Signature engagements"
          title="What leaders call me in to solve."
          copy="Each offer has a defined entry problem and a concrete output. The mandate can be diagnostic, build-and-embed, or hands-on leadership."
        />

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {engagements.map((engagement) => (
            <motion.div
              key={engagement.slug}
              variants={fadeUp}
              className={cn(engagement.featured ? 'lg:col-span-3' : 'lg:col-span-2')}
            >
              <SpotlightCard as="article" className="h-full">
                <Link
                  to={paths.engagementDetail(engagement.slug)}
                  className="flex h-full flex-col p-7"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-mono text-[0.7rem] tracking-[0.14em] text-muted">
                      {engagement.index} /
                    </span>
                    {engagement.featured ? (
                      <span className="rounded-full border border-amber/40 px-2.5 py-0.5 font-mono text-[0.6rem] tracking-[0.14em] text-amber uppercase">
                        Featured
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-4 font-display text-xl sm:text-2xl">{engagement.title}</h3>
                  <p className="mt-3 flex-1 text-[0.95rem] text-muted">{engagement.entryProblem}</p>

                  <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-[0.12em] uppercase transition-colors group-hover/spot:text-amber">
                    {engagement.verb}
                    <ArrowRight
                      size={13}
                      aria-hidden
                      className="transition-transform duration-300 group-hover/spot:translate-x-1"
                    />
                  </span>
                </Link>
              </SpotlightCard>
            </motion.div>
          ))}
        </RevealGroup>

        <div className="mt-10">
          <LinkButton to={paths.engagements} variant="outline" size="lg">
            Explore the full consulting portfolio
          </LinkButton>
        </div>
      </Container>
    </section>
  )
}
