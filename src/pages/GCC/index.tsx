import { Check } from 'lucide-react'
import { adjacentMandates } from '@/data/engagements'
import { caseStudies } from '@/data/evidence'
import { disclaimers } from '@/data/site'
import { paths } from '@/routes/paths'
import { Container } from '@/widgets/Container'
import { CtaBand } from '@/widgets/CtaBand'
import { Eyebrow } from '@/widgets/Eyebrow'
import { PageHeader } from '@/widgets/PageHeader'
import { Reveal, RevealGroup } from '@/widgets/Reveal'
import { SectionHeader } from '@/widgets/SectionHeader'
import { Seo } from '@/widgets/Seo'
import { SpotlightCard } from '@/widgets/SpotlightCard'

const lifecycle = [
  {
    index: '01',
    title: 'Define',
    copy: 'Define mandate, scope, ownership and success measures before anyone is hired or transitioned.',
  },
  {
    index: '02',
    title: 'Transition',
    copy: 'Move knowledge, services and accountability from vendor or headquarters without losing control.',
  },
  {
    index: '03',
    title: 'Stabilise',
    copy: 'Build the operating rhythm, service measures and governance the centre will run on day to day.',
  },
  {
    index: '04',
    title: 'Scale',
    copy: 'Develop capability, leadership and repeatability so growth does not depend on individual heroics.',
  },
  {
    index: '05',
    title: 'Transform',
    copy: 'Move from capacity to enterprise value — digital ownership and AI-enabled operations.',
  },
] as const

const capabilityAreas = [
  'Operating model & mandate',
  'Governance & decision rights',
  'Vendor-to-GCC transition',
  'Service management & performance',
  'Capability ramp-up',
  'GCC transformation',
  'AI-enabled GCC',
] as const

const whoThisIsFor = [
  'Enterprises establishing a new India capability centre.',
  'Existing GCCs scaling beyond their original mandate.',
  'CIO/COO organisations insourcing work from vendors.',
  'Capability centres moving from task execution toward end-to-end ownership.',
] as const

const gccEvidence = caseStudies.filter((c) => c.tags.includes('gcc'))
const gccMandates = adjacentMandates.filter((m) =>
  ['GCC Delivery Launch', 'Vendor & CoE Transition Office'].includes(m.title),
)

export function GCCPage() {
  return (
    <>
      <Seo
        title="GCC Advisory"
        description="Build a GCC that owns outcomes, not just tasks: operating model, governance, vendor-to-GCC transition, capability ramp-up and AI-enabled operations."
        path={paths.gcc}
        breadcrumb="GCC"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'GCC & Capability Centre Advisory',
          description:
            'Advisory on the operating, delivery, governance and capability layer of Global Capability Centre creation and transformation.',
          provider: { '@type': 'Person', name: 'Hrishikesh Salunkhe' },
        }}
      />

      <PageHeader
        breadcrumb="GCC"
        eyebrow="GCC & Capability Centre Advisory"
        title="Build a GCC that owns outcomes, not just tasks."
        copy="A high-performing capability centre is more than a lower-cost location. It needs a clear mandate, decision rights, governance, service discipline, leadership capability and a path from execution to enterprise ownership."
      />

      {/* Scope discipline */}
      <section className="border-b border-line bg-sunk py-10">
        <Container size="wide">
          <Reveal>
            <p className="max-w-3xl font-mono text-[0.72rem] leading-relaxed text-muted">
              The Promise Office focuses on the operating and delivery layer of GCC creation and
              transformation. Legal, tax, entity, payroll and real-estate matters remain with the
              client’s specialist advisers.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Who this is for */}
      <section className="py-16 lg:py-20">
        <Container size="wide">
          <Eyebrow>Who this is for</Eyebrow>
          <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2">
            {whoThisIsFor.map((item) => (
              <div key={item} className="flex gap-3 rounded-xl border border-line bg-surface p-5">
                <Check size={16} className="mt-0.5 shrink-0 text-amber" aria-hidden />
                <p className="text-[0.97rem]">{item}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Lifecycle */}
      <section className="border-y border-line bg-sunk py-20 lg:py-24">
        <Container size="wide">
          <SectionHeader
            eyebrow="The GCC lifecycle"
            title="The opportunity is not simply to move work to India."
            copy="It is to build a centre with clear ownership, governance, capability, service economics and measurable enterprise contribution."
          />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {lifecycle.map((stage) => (
              <div key={stage.index} className="rounded-2xl border border-line bg-surface p-6">
                <p className="font-mono text-[0.66rem] tracking-[0.14em] text-muted">{stage.index}</p>
                <h3 className="mt-3 font-display text-lg text-amber uppercase tracking-wide">
                  {stage.title}
                </h3>
                <p className="mt-3 text-[0.9rem] text-muted">{stage.copy}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Capability areas */}
      <section className="py-20 lg:py-24">
        <Container size="wide">
          <SectionHeader eyebrow="Capability areas" title="Where the work concentrates." />
          <RevealGroup className="mt-10 flex flex-wrap gap-3">
            {capabilityAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-line bg-surface px-4 py-2 text-[0.9rem]"
              >
                {area}
              </span>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Evidence behind the proposition */}
      <section className="border-y border-line bg-sunk py-20 lg:py-24">
        <Container size="wide">
          <SectionHeader
            eyebrow="Experience behind the proposition"
            title="Adjacent, relevant experience — described honestly."
            copy="These are not described as formal GCC consulting engagements. They are the large-scale governance, transition and capability-building experience this proposition is built on."
          />
          <RevealGroup className="mt-10 grid gap-5 lg:grid-cols-2">
            {gccEvidence.map((study) => (
              <SpotlightCard key={study.slug} as="article" className="p-7">
                <p className="font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                  {study.context}
                </p>
                <h3 className="mt-2 font-display text-xl">{study.title}</h3>
                <p className="mt-3 text-[0.93rem] text-muted">{study.lead}</p>
              </SpotlightCard>
            ))}
            {gccMandates.map((mandate) => (
              <SpotlightCard key={mandate.title} as="article" className="p-7">
                <p className="font-mono text-[0.66rem] tracking-[0.14em] text-amber uppercase">
                  {mandate.kicker}
                </p>
                <h3 className="mt-2 font-display text-xl">{mandate.title}</h3>
                <p className="mt-3 text-[0.93rem] text-muted">{mandate.copy}</p>
                <p className="mt-4 border-t border-line pt-4 font-mono text-[0.68rem] leading-relaxed text-muted">
                  {mandate.basis}
                </p>
              </SpotlightCard>
            ))}
          </RevealGroup>
          <p className="mt-10 max-w-3xl font-mono text-[0.68rem] leading-relaxed text-muted">
            {disclaimers.figures}
          </p>
        </Container>
      </section>

      {/* AI-enabled GCC */}
      <section className="relative isolate overflow-hidden bg-night py-20 text-cream lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(55% 45% at 90% 10%, rgba(240,180,60,0.14), transparent 62%), radial-gradient(50% 45% at 5% 95%, rgba(75,46,131,0.4), transparent 60%)',
          }}
        />
        <Container size="wide">
          <Eyebrow className="text-lilac">The AI-enabled GCC</Eyebrow>
          <h2 className="mt-5 max-w-2xl text-3xl sm:text-4xl">
            GCCs should not simply consume AI tools. They can industrialise it.
          </h2>
          <p className="mt-6 max-w-2xl text-[1.0625rem] text-cream/80">
            The Promise Office works at the operating layer: use-case portfolio, workflow redesign,
            AI operating model, governance, enablement and adoption, human/AI decision rights and
            benefits measurement — not a claim to run a full AI engineering factory.
          </p>
        </Container>
      </section>

      <CtaBand
        eyebrow="A GCC mandate"
        title="Talk to us about your GCC mandate."
        copy="Tell me where the centre stands today — task execution, mid-transition, or ready to move toward outcome ownership. We can identify a useful first step."
        secondaryLabel="See the advisory practice"
        secondaryTo={paths.advisory}
      />
    </>
  )
}
