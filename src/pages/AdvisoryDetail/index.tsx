import { ArrowRight, Check } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { engagements, getEngagement } from '@/data/engagements'
import { paths } from '@/routes/paths'
import { Container } from '@/widgets/Container'
import { CtaBand } from '@/widgets/CtaBand'
import { Eyebrow } from '@/widgets/Eyebrow'
import { PageHeader } from '@/widgets/PageHeader'
import { Reveal } from '@/widgets/Reveal'
import { Seo } from '@/widgets/Seo'

export function AdvisoryDetailPage() {
  const { slug } = useParams()
  const engagement = slug ? getEngagement(slug) : undefined

  if (!engagement) return <Navigate to={paths.advisory} replace />

  const position = engagements.findIndex((item) => item.slug === engagement.slug)
  const next = engagements[(position + 1) % engagements.length]

  return (
    <>
      <Seo
        title={engagement.title}
        description={engagement.entryProblem}
        path={paths.advisoryDetail(engagement.slug)}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: engagement.title,
          description: engagement.lead,
          provider: { '@type': 'Person', name: 'Hrishikesh Salunkhe' },
        }}
        breadcrumb={engagement.title}
      />

      <PageHeader
        breadcrumb={engagement.title}
        eyebrow={`${engagement.index} / Core mandate`}
        title={engagement.title}
        copy={engagement.lead}
      />

      <section className="py-14 lg:py-16">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow>When to call</Eyebrow>
                <p className="mt-5 text-[1.125rem] leading-relaxed">{engagement.whenToCall}</p>
              </Reveal>

              <Reveal className="mt-14" delay={0.05}>
                <Eyebrow>What I do</Eyebrow>
                <ol className="mt-6 space-y-px overflow-hidden rounded-2xl border border-line bg-line">
                  {engagement.whatIDo.map((step, index) => (
                    <li key={step} className="flex gap-5 bg-surface px-6 py-5">
                      <span className="font-mono text-[0.7rem] text-amber">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[1.0rem]">{step}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>

            <aside className="lg:col-span-5">
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-line bg-sunk p-7 lg:p-8">
                  <Eyebrow>What you receive</Eyebrow>
                  <p className="mt-5 text-[1.0625rem] leading-relaxed">
                    {engagement.whatYouReceive}
                  </p>
                  <div className="mt-7 flex items-start gap-3 border-t border-line pt-6">
                    <Check size={16} className="mt-1 shrink-0 text-amber" aria-hidden />
                    <p className="font-mono text-[0.72rem] leading-relaxed text-muted">
                      <span className="text-ink">Basis:</span> {engagement.basis}
                    </p>
                  </div>
                  <Link
                    to={paths.evidence}
                    className="mt-6 inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-[0.12em] text-amber uppercase hover:underline"
                  >
                    Relevant career example
                    <ArrowRight size={13} aria-hidden />
                  </Link>
                </div>
              </Reveal>
            </aside>
          </div>

          <Reveal className="mt-20 flex flex-col justify-between gap-6 border-t border-line pt-9 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                Next mandate
              </p>
              <Link
                to={paths.advisoryDetail(next.slug)}
                className="mt-2 block font-display text-2xl transition-colors hover:text-amber sm:text-3xl"
              >
                {next.title}
              </Link>
            </div>
            <Link
              to={paths.advisory}
              className="font-mono text-[0.7rem] tracking-[0.12em] text-muted uppercase transition-colors hover:text-amber"
            >
              ← All advisory mandates
            </Link>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        eyebrow="A useful first step"
        title="Tell me where this sits in your organisation."
        copy="We can scope this as a diagnostic, a build-and-embed assignment or hands-on leadership — whichever fits the decision in front of you."
        secondaryLabel="Run the health check"
        secondaryTo={paths.healthCheck}
      />
    </>
  )
}
