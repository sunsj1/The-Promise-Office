import { healthCheckOffer } from '@/data/engagements'
import { paths } from '@/routes/paths'
import { HealthCheckTool } from '@/features/healthCheck/HealthCheckTool'
import { Container } from '@/widgets/Container'
import { CtaBand } from '@/widgets/CtaBand'
import { ErrorBoundary } from '@/widgets/ErrorBoundary'
import { PageHeader } from '@/widgets/PageHeader'
import { Reveal } from '@/widgets/Reveal'
import { Seo } from '@/widgets/Seo'

export function HealthCheckPage() {
  return (
    <>
      <Seo
        title="Delivery Health Check"
        description="An eight-question interactive assessment of your program’s health, with a Red/Amber/Green reading and a recommended next step."
        path={paths.healthCheck}
        breadcrumb="Health check"
      />

      <PageHeader
        breadcrumb="Health check"
        eyebrow="Two minutes, eight questions"
        title="Is the plan still credible?"
        copy="Answer eight questions and you will get a Red/Amber/Green reading of your program, the two signals that stand out, and the engagement that fits where it stands today. Nothing is stored or submitted by this site."
      />

      <section className="py-14 lg:py-20">
        <Container size="wide">
          <Reveal>
            <ErrorBoundary titleAs="h2">
              <HealthCheckTool />
            </ErrorBoundary>
          </Reveal>

          <Reveal className="mt-12 rounded-2xl border border-line bg-sunk p-7 lg:p-9">
            <p className="font-mono text-[0.68rem] tracking-[0.16em] text-amber uppercase">
              The full engagement
            </p>
            <h2 className="mt-4 font-display text-2xl">{healthCheckOffer.title}</h2>
            <p className="mt-3 max-w-2xl text-[0.97rem] text-muted">{healthCheckOffer.lead}</p>
            <dl className="mt-7 grid gap-5 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-4">
              {healthCheckOffer.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="font-mono text-[0.66rem] tracking-[0.14em] text-muted uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-[0.92rem]">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        eyebrow="Your situation"
        title="Prefer to talk it through?"
        copy="In about 30 minutes we can discuss the decision you face, timing, the people involved and what evidence exists. I will say whether I can help and what a useful first step would look like."
        secondaryLabel="See the engagements"
        secondaryTo={paths.engagements}
      />
    </>
  )
}
