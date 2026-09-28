import { getEngagement } from '@/data/engagements'
import { caseStudies } from '@/data/evidence'
import { paths } from '@/routes/paths'
import { Container } from '@/widgets/Container'
import { CtaBand } from '@/widgets/CtaBand'
import { Eyebrow } from '@/widgets/Eyebrow'
import { LinkButton } from '@/widgets/Button'
import { PageHeader } from '@/widgets/PageHeader'
import { Reveal, RevealGroup } from '@/widgets/Reveal'
import { SectionHeader } from '@/widgets/SectionHeader'
import { Seo } from '@/widgets/Seo'
import { SpotlightCard } from '@/widgets/SpotlightCard'

const capabilities = [
  {
    index: '01',
    title: 'AI Opportunity & Value Discovery',
    copy: 'Find use cases based on business value, workflow friction, data readiness, risk and measurability — not on what is fashionable.',
  },
  {
    index: '02',
    title: 'AI-to-Operations',
    copy: 'Map the current process, the future workflow, the human decisions, the AI contribution, system integration, ownership and controls.',
  },
  {
    index: '03',
    title: 'Pilot-to-Production',
    copy: 'Success measures, UAT, accuracy, evaluation, failure modes, grounding, monitoring, fallback and an operational owner after launch.',
  },
  {
    index: '04',
    title: 'AI Operating Model & Governance',
    copy: 'Decision rights, use-case approval, risk ownership, human oversight, policies, value tracking and continuous improvement.',
  },
  {
    index: '05',
    title: 'Knowledge & Workflow Intelligence',
    copy: 'Knowledge assistants, retrieval-grounded answers, workflow automation, intake, classification and decision support.',
  },
  {
    index: '06',
    title: 'AI Adoption & Workforce Enablement',
    copy: 'Role-based workflows, leadership literacy, prompt and workflow playbooks, training and adoption measures.',
  },
  {
    index: '07',
    title: 'Agentic AI Readiness',
    copy: 'Where should an agent act? What can it decide? When must a human intervene? What evidence is retained? Posture and controls, not implementation hype.',
  },
] as const

export function AIPage() {
  const aiThatWorks = getEngagement('ai-that-works')
  const knowledgeAssistant = caseStudies.find((c) => c.slug === 'knowledge-assistant')

  return (
    <>
      <Seo
        title="AI Advisory"
        description="Move AI from pilot to operating reality: opportunity discovery, AI-to-operations, pilot-to-production, governance, adoption and agentic AI readiness."
        path={paths.ai}
        breadcrumb="AI"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'AI & Intelligent Operations',
          description:
            'Advisory on moving AI from pilot to governed, measurable business operations — operating model, governance and adoption, not model engineering.',
          provider: { '@type': 'Person', name: 'Hrishikesh Salunkhe' },
        }}
      />

      <PageHeader
        breadcrumb="AI"
        eyebrow="AI & Intelligent Operations"
        title="Move AI from pilot to operating reality."
        copy="The difficult question is no longer whether AI can produce an impressive demo. It is whether the organisation can trust it, integrate it, operate it and measure what changed. AI creates value when the workflow, governance, people and economics change with the technology."
      />

      {/* Capabilities */}
      <section className="py-20 lg:py-24">
        <Container size="wide">
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => (
              <div key={cap.index} className="rounded-2xl border border-line bg-surface p-6">
                <p className="font-mono text-[0.66rem] tracking-[0.14em] text-muted">{cap.index}</p>
                <h3 className="mt-3 font-display text-lg leading-snug">{cap.title}</h3>
                <p className="mt-3 text-[0.9rem] text-muted">{cap.copy}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Signature offer */}
      {aiThatWorks ? (
        <section className="border-y border-line bg-sunk py-20 lg:py-24">
          <Container size="wide">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
              <Reveal className="lg:col-span-5">
                <Eyebrow>Signature offer</Eyebrow>
                <h2 className="mt-5 text-3xl sm:text-4xl">{aiThatWorks.title}</h2>
                <p className="mt-5 text-[1.0625rem] text-muted">{aiThatWorks.lead}</p>
                <p className="mt-4 font-mono text-[0.68rem] tracking-[0.1em] text-amber uppercase">
                  Signs you need it
                </p>
                <p className="mt-2 text-[0.95rem] text-muted">{aiThatWorks.whenToCall}</p>
                <div className="mt-8">
                  <LinkButton to={paths.advisoryDetail('ai-that-works')} variant="outline">
                    See the full mandate
                  </LinkButton>
                </div>
              </Reveal>
              <Reveal className="lg:col-span-7" delay={0.08}>
                <div className="rounded-2xl border border-line bg-surface p-7 lg:p-9">
                  <p className="font-mono text-[0.68rem] tracking-[0.16em] text-amber uppercase">
                    What we do
                  </p>
                  <ol className="mt-5 space-y-3">
                    {aiThatWorks.whatIDo.map((step, index) => (
                      <li key={step} className="flex gap-4 text-[0.97rem]">
                        <span className="font-mono text-[0.68rem] text-amber">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                  <div className="mt-7 border-t border-line pt-6">
                    <p className="font-mono text-[0.66rem] tracking-[0.14em] text-muted uppercase">
                      What you keep
                    </p>
                    <p className="mt-2 text-[0.95rem]">{aiThatWorks.whatYouReceive}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Evidence */}
      {knowledgeAssistant ? (
        <section className="py-20 lg:py-24">
          <Container size="wide">
            <SectionHeader
              eyebrow="Experience behind it"
              title="From document overload to a usable knowledge assistant."
            />
            <Reveal className="mt-10">
              <SpotlightCard as="article" className="p-7 lg:p-8">
                <p className="font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                  {knowledgeAssistant.context}
                </p>
                <p className="mt-4 text-[0.97rem] text-muted">{knowledgeAssistant.lead}</p>
                <dl className="mt-6 grid gap-5 border-t border-line pt-6 sm:grid-cols-3">
                  {knowledgeAssistant.facts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="font-mono text-[0.64rem] tracking-[0.14em] text-muted uppercase">
                        {fact.label}
                      </dt>
                      <dd className="mt-1 text-[0.93rem]">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </SpotlightCard>
            </Reveal>
          </Container>
        </section>
      ) : null}

      <CtaBand
        eyebrow="From demo to operation"
        title="Move your AI initiative from demo to operation."
        copy="Tell me what the pilot is meant to change, who relies on it and what evidence would make you trust it. We can define a useful next step."
        secondaryLabel="See the advisory practice"
        secondaryTo={paths.advisory}
      />
    </>
  )
}
