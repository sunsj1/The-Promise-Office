import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { caseStudies, evidenceFilters } from '@/data/evidence'
import { disclaimers } from '@/data/site'
import { paths } from '@/routes/paths'
import { fadeUp, sealEase } from '@/animations/variants'
import { Container } from '@/widgets/Container'
import { CtaBand } from '@/widgets/CtaBand'
import { PageHeader } from '@/widgets/PageHeader'
import { RevealGroup } from '@/widgets/Reveal'
import { Seo } from '@/widgets/Seo'
import { SpotlightCard } from '@/widgets/SpotlightCard'
import { cn } from '@/lib/cn'

export function EvidencePage() {
  const [filter, setFilter] = useState<string>('all')

  const visible =
    filter === 'all' ? caseStudies : caseStudies.filter((item) => item.filter === filter)

  return (
    <>
      <Seo
        title="Evidence"
        description="Selected work from prior roles: program recovery, managed services practice build, PGO governance, AI delivery, process automation and field operations."
        path={paths.evidence}
      />

      <PageHeader
        breadcrumb="Evidence"
        eyebrow="Evidence from prior roles"
        title="What the work looked like when it mattered."
        copy="Complexity varies. The common thread is making the problem visible, aligning decision makers and staying accountable through execution. These examples describe work led as an employee or delivery partner, not contracts won by this new practice."
      />

      <section className="py-16 lg:py-20">
        <Container size="wide">
          {/* Filters */}
          <div
            role="tablist"
            aria-label="Filter selected work"
            className="flex flex-wrap gap-2 border-b border-line pb-7"
          >
            {evidenceFilters.map((option) => {
              const isActive = filter === option.id
              return (
                <button
                  key={option.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(option.id)}
                  className={cn(
                    'relative rounded-full border px-4 py-2 font-mono text-[0.68rem] tracking-[0.12em] uppercase transition-colors',
                    isActive
                      ? 'border-amber text-ink'
                      : 'border-line text-muted hover:border-amber hover:text-ink',
                  )}
                >
                  {option.label}
                  {isActive ? (
                    <motion.span
                      layoutId="evidence-filter"
                      className="absolute inset-0 -z-10 rounded-full bg-amber/10"
                      transition={{ duration: 0.3, ease: sealEase }}
                    />
                  ) : null}
                </button>
              )
            })}
          </div>

          <RevealGroup className="mt-10 grid gap-5 lg:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {visible.map((study) => (
                <motion.div
                  key={study.slug}
                  layout
                  variants={fadeUp}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.38, ease: sealEase }}
                >
                  <SpotlightCard as="article" className="h-full p-7 lg:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                        {study.index} / {study.discipline}
                      </p>
                      {study.metric ? (
                        <p className="rounded-full bg-amber/12 px-2.5 py-0.5 font-mono text-[0.62rem] tracking-[0.1em] text-amber">
                          {study.metric}
                        </p>
                      ) : null}
                    </div>

                    <p className="mt-4 font-mono text-[0.7rem] tracking-[0.1em] text-amber">
                      {study.context}
                    </p>
                    <h2 className="mt-2 font-display text-2xl">{study.title}</h2>
                    <p className="mt-4 text-[0.97rem] text-muted">{study.lead}</p>

                    <dl className="mt-6 space-y-4 border-t border-line pt-6">
                      {study.facts.map((fact) => (
                        <div key={fact.label}>
                          <dt className="font-mono text-[0.64rem] tracking-[0.14em] text-muted uppercase">
                            {fact.label}
                          </dt>
                          <dd className="mt-1 text-[0.93rem]">{fact.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </SpotlightCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </RevealGroup>

          <p className="mt-12 max-w-3xl font-mono text-[0.68rem] leading-relaxed text-muted">
            {disclaimers.figures}
          </p>
        </Container>
      </section>

      <CtaBand
        eyebrow="Your situation"
        title="What would useful progress look like?"
        copy="Tell me where the program or service stands today. We can identify the evidence and decisions needed for the next step."
        secondaryLabel="See the engagements"
        secondaryTo={paths.engagements}
      />
    </>
  )
}
