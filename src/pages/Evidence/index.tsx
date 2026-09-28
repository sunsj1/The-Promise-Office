import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { disclaimers } from '@/data/site'
import { getSituation, primarySituations, supportingSituations } from '@/data/situations'
import { paths } from '@/routes/paths'
import { Container } from '@/widgets/Container'
import { CtaBand } from '@/widgets/CtaBand'
import { Eyebrow } from '@/widgets/Eyebrow'
import { PageHeader } from '@/widgets/PageHeader'
import { Reveal } from '@/widgets/Reveal'
import { Seo } from '@/widgets/Seo'
import { cn } from '@/lib/cn'

export function EvidencePage() {
  const [openNote, setOpenNote] = useState<string | null>(null)

  return (
    <>
      <Seo
        title="Evidence"
        description="Recurring executive situations The Promise Office has learned to recognise, diagnose and navigate — with restrained, verified evidence underneath each one."
        path={paths.evidence}
        breadcrumb="Evidence"
      />

      <PageHeader
        breadcrumb="Evidence"
        eyebrow="What experience has taught us"
        title="Situations we recognise, not projects we finished."
        copy="The client problem is the protagonist here, not a list of past work. Each of these is a pattern that recurs across organisations — what it usually looks like, what tends to sit underneath it, how we examine it, and the restrained evidence that grounds the view in practice rather than theory."
      />

      {/* Primary situations — full editorial treatment */}
      <section className="py-16 lg:py-20">
        <Container size="prose">
          <div className="space-y-20 lg:space-y-24">
            {primarySituations.map((s) => (
              <Reveal key={s.slug} id={s.slug} className="scroll-mt-28 border-t border-line pt-12 first:border-t-0 first:pt-0">
                <p className="font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">{s.index}</p>
                <h2 className="mt-3 font-display text-3xl leading-snug sm:text-[2.1rem]">{s.title}</h2>

                <p className="mt-6 text-[1.0625rem] leading-relaxed">{s.situation}</p>

                <div className="mt-6">
                  <p className="font-mono text-[0.66rem] tracking-[0.14em] text-amber uppercase">
                    What often sits underneath
                  </p>
                  <p className="mt-2.5 text-[1.0125rem] leading-relaxed text-muted">{s.underneath}</p>
                </div>

                <div className="mt-6">
                  <p className="font-mono text-[0.66rem] tracking-[0.14em] text-amber uppercase">
                    The Promise Office view
                  </p>
                  <p className="mt-2.5 text-[1.0125rem] leading-relaxed">{s.view}</p>
                </div>

                <div className="mt-8 rounded-2xl border border-line bg-sunk p-6 lg:p-7">
                  <p className="font-mono text-[0.64rem] tracking-[0.14em] text-muted uppercase">
                    {s.evidence.context}
                  </p>
                  <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="font-mono text-[0.62rem] tracking-[0.12em] text-muted uppercase">Environment</dt>
                      <dd className="mt-1 text-[0.93rem]">{s.evidence.environment}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.62rem] tracking-[0.12em] text-muted uppercase">Intervention</dt>
                      <dd className="mt-1 text-[0.93rem]">{s.evidence.intervention}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="font-mono text-[0.62rem] tracking-[0.12em] text-muted uppercase">Observed outcome</dt>
                      <dd className="mt-1 text-[0.93rem]">{s.evidence.outcome}</dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                  {s.relatedSlug ? (
                    <Link
                      to={paths.advisoryDetail(s.relatedSlug)}
                      className="font-mono text-[0.68rem] tracking-[0.12em] text-amber uppercase hover:underline"
                    >
                      See the related mandate →
                    </Link>
                  ) : null}
                  {s.crossLinks.map((slug) => {
                    const linked = getSituation(slug)
                    if (!linked) return null
                    return (
                      <a
                        key={slug}
                        href={`#${slug}`}
                        className="font-mono text-[0.66rem] tracking-[0.1em] text-muted uppercase transition-colors hover:text-amber"
                      >
                        See also: {linked.title}
                      </a>
                    )
                  })}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Supporting situations — lighter field notes */}
      <section className="border-t border-line bg-sunk py-16 lg:py-20">
        <Container size="prose">
          <Eyebrow>Field notes</Eyebrow>
          <p className="mt-4 max-w-2xl text-[0.97rem] text-muted">
            Related patterns that inform the primary situations above, told more briefly. Expand any of them
            for the full view.
          </p>

          <div className="mt-10 divide-y divide-line rounded-2xl border border-line bg-surface">
            {supportingSituations.map((s) => {
              const isOpen = openNote === s.slug
              return (
                <div key={s.slug} id={s.slug} className="scroll-mt-28 p-6 lg:p-7">
                  <button
                    type="button"
                    onClick={() => setOpenNote(isOpen ? null : s.slug)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span>
                      <span className="font-mono text-[0.66rem] tracking-[0.14em] text-muted uppercase">
                        {s.index}
                      </span>
                      <span className="mt-1 block font-display text-xl">{s.title}</span>
                    </span>
                    <ChevronDown
                      size={16}
                      aria-hidden
                      className={cn('shrink-0 text-muted transition-transform duration-300', isOpen && 'rotate-180 text-amber')}
                    />
                  </button>

                  {!isOpen ? <p className="mt-3 max-w-2xl text-[0.93rem] text-muted">{s.situation}</p> : null}

                  {isOpen ? (
                    <div className="mt-5 max-w-2xl space-y-5">
                      <p className="text-[0.97rem]">{s.situation}</p>
                      <div>
                        <p className="font-mono text-[0.62rem] tracking-[0.14em] text-amber uppercase">
                          What often sits underneath
                        </p>
                        <p className="mt-2 text-[0.93rem] text-muted">{s.underneath}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[0.62rem] tracking-[0.14em] text-amber uppercase">
                          The Promise Office view
                        </p>
                        <p className="mt-2 text-[0.93rem]">{s.view}</p>
                      </div>
                      <div className="rounded-xl border border-line bg-sunk p-5">
                        <p className="font-mono text-[0.6rem] tracking-[0.14em] text-muted uppercase">
                          {s.evidence.context}
                        </p>
                        <p className="mt-2 text-[0.88rem] text-muted">
                          {s.evidence.environment} · {s.evidence.intervention} · {s.evidence.outcome}
                        </p>
                      </div>
                      {s.relatedSlug ? (
                        <Link
                          to={paths.advisoryDetail(s.relatedSlug)}
                          className="inline-block font-mono text-[0.66rem] tracking-[0.1em] text-amber uppercase hover:underline"
                        >
                          See the related mandate →
                        </Link>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>

          <p className="mt-10 max-w-3xl font-mono text-[0.68rem] leading-relaxed text-muted">
            {disclaimers.figures}
          </p>
        </Container>
      </section>

      <CtaBand
        eyebrow="Your situation"
        title="Which of these sounds like where you are?"
        copy="Tell me where the program or service stands today. We can identify the evidence and decisions needed for the next step."
        secondaryLabel="See the advisory practice"
        secondaryTo={paths.advisory}
      />
    </>
  )
}
