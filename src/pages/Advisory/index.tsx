import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  adjacentMandates,
  aiFormats,
  capabilities,
  engagementAreas,
  engagements,
  faqs,
  healthCheckOffer,
  practices,
} from '@/data/engagements'
import { engagementShapes } from '@/data/personas'
import { paths } from '@/routes/paths'
import { fadeUp } from '@/animations/variants'
import { Accordion } from '@/widgets/Accordion'
import { LinkButton } from '@/widgets/Button'
import { Container } from '@/widgets/Container'
import { CtaBand } from '@/widgets/CtaBand'
import { Eyebrow } from '@/widgets/Eyebrow'
import { PageHeader } from '@/widgets/PageHeader'
import { Reveal, RevealGroup } from '@/widgets/Reveal'
import { SectionHeader } from '@/widgets/SectionHeader'
import { Seo, serviceJsonLd } from '@/widgets/Seo'
import { SpotlightCard } from '@/widgets/SpotlightCard'

export function AdvisoryPage() {
  return (
    <>
      <Seo
        title="Advisory"
        description="The advisory practice: delivery recovery, PMO/PGO, managed services, ITSM, process transformation, commercial and pursuit assurance, and AI delivery mandates. GCC and AI have their own dedicated pages."
        path={paths.advisory}
        jsonLd={serviceJsonLd}
        breadcrumb="Advisory"
      />

      <PageHeader
        breadcrumb="Advisory"
        eyebrow="The advisory practice"
        title="Bring the difficult brief."
        copy="Some mandates need a sharp independent diagnosis. Others need a capability built, a transition led or a delivery leader in the room. Four practices, and the capabilities that cut across them, connect strategy, operating design, commercials and execution around the outcome at stake."
      />

      {/* Four problems we're brought in to solve */}
      <section className="py-20 lg:py-24">
        <Container size="wide">
          <Eyebrow>The four problems we're brought in to solve</Eyebrow>
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {practices.map((practice) => (
              <motion.div key={practice.key} variants={fadeUp}>
                <SpotlightCard className="h-full p-6 lg:p-7">
                  <p className="font-mono text-[0.66rem] tracking-[0.14em] text-muted uppercase">
                    {practice.index}
                  </p>
                  <h2 className="mt-3 font-display text-xl leading-snug">{practice.title}</h2>
                  <p className="mt-3 text-[0.9rem] text-muted">{practice.outcome}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {practice.phrases.slice(0, 3).map((phrase) => (
                      <li
                        key={phrase}
                        className="rounded-full border border-line px-2 py-0.5 font-mono text-[0.6rem] tracking-[0.08em] text-muted uppercase"
                      >
                        {phrase}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={practice.to}
                    className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.68rem] tracking-[0.12em] text-amber uppercase transition-colors hover:text-ink"
                  >
                    {practice.cta}
                    <ArrowRight size={12} aria-hidden />
                  </Link>
                </SpotlightCard>
              </motion.div>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Health Check offer */}
      <section className="border-y border-line bg-sunk py-20 lg:py-24">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <Eyebrow>Where most clients start</Eyebrow>
              <h2 className="mt-5 text-3xl sm:text-4xl">{healthCheckOffer.title}</h2>
              <p className="mt-5 text-[1.0625rem] text-muted">{healthCheckOffer.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton to={paths.contact} size="lg">
                  Request a Health Check
                </LinkButton>
                <LinkButton to={paths.healthCheck} variant="outline" size="lg">
                  Start the Health Check
                </LinkButton>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-7" delay={0.1}>
              <div className="rounded-2xl border border-line bg-surface p-7 lg:p-9">
                <p className="font-mono text-[0.68rem] tracking-[0.16em] text-amber uppercase">
                  You receive
                </p>
                <ul className="mt-5 space-y-3">
                  {healthCheckOffer.receive.map((item) => (
                    <li key={item} className="flex gap-3 text-[1.0625rem]">
                      <Check size={16} className="mt-1.5 shrink-0 text-amber" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <dl className="mt-8 grid gap-5 border-t border-line pt-7 sm:grid-cols-2">
                  {healthCheckOffer.facts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="font-mono text-[0.66rem] tracking-[0.14em] text-muted uppercase">
                        {fact.label}
                      </dt>
                      <dd className="mt-1.5 text-[0.93rem]">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Six core mandates, tagged by practice */}
      <section id="core-mandates" className="py-20 lg:py-28">
        <Container size="wide">
          <SectionHeader
            eyebrow="Core mandates"
            title="Six engagements built from lived delivery experience."
            copy="Each can be scoped as a diagnostic, design-and-build assignment or hands-on leadership mandate. Every mandate sits under one of the four practices above, so it is clear what problem it belongs to."
          />

          {engagementAreas.map((area) => (
            <div key={area.area} id={area.area} className="mt-14 scroll-mt-28">
              <Eyebrow>{area.label}</Eyebrow>
              <div className="mt-6 space-y-4">
                {engagements
                  .filter((engagement) => engagement.area === area.area)
                  .map((engagement) => {
                    const practice = practices.find((p) => p.key === engagement.practice)
                    return (
                      <Reveal key={engagement.slug}>
                        <SpotlightCard as="article">
                          <Link
                            to={paths.advisoryDetail(engagement.slug)}
                            className="grid gap-6 p-7 lg:grid-cols-12 lg:gap-8 lg:p-9"
                          >
                            <div className="lg:col-span-4">
                              <div className="flex flex-wrap items-center gap-3">
                                <span className="font-mono text-[0.7rem] tracking-[0.14em] text-muted">
                                  {engagement.index} / Core mandate
                                </span>
                                {engagement.featured ? (
                                  <span className="rounded-full border border-amber/40 px-2 py-0.5 font-mono text-[0.58rem] tracking-[0.14em] text-amber uppercase">
                                    Featured
                                  </span>
                                ) : null}
                              </div>
                              <h3 className="mt-4 font-display text-2xl lg:text-[1.75rem]">
                                {engagement.title}
                              </h3>
                              {practice ? (
                                <p className="mt-2 font-mono text-[0.62rem] tracking-[0.1em] text-muted uppercase">
                                  Practice: {practice.title}
                                </p>
                              ) : null}
                              <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-[0.12em] uppercase transition-colors group-hover/spot:text-amber">
                                Read the mandate
                                <ArrowRight
                                  size={13}
                                  aria-hidden
                                  className="transition-transform duration-300 group-hover/spot:translate-x-1"
                                />
                              </span>
                            </div>
                            <div className="lg:col-span-8">
                              <p className="text-[1.0625rem]">{engagement.lead}</p>
                              <div className="mt-6 border-t border-line pt-5">
                                <p className="font-mono text-[0.66rem] tracking-[0.14em] text-muted uppercase">
                                  When to call
                                </p>
                                <p className="mt-2 text-[0.95rem] text-muted">
                                  {engagement.whenToCall}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </SpotlightCard>
                      </Reveal>
                    )
                  })}
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* Capabilities behind the outcome */}
      <section className="border-t border-line bg-sunk py-20 lg:py-28">
        <Container size="wide">
          <SectionHeader
            eyebrow="Capabilities behind the outcome"
            title="More than advice. Capability that stays."
            copy="These six capabilities cut across all four practices. They do not each need a separate mandate — most engagements draw on two or three of them at once."
          />

          <div className="mt-14 space-y-14">
            {capabilities.map((capability) => (
              <Reveal key={capability.key} id={capability.key} className="scroll-mt-28 border-t border-line pt-10 first:border-t-0 first:pt-0">
                <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-4">
                    <p className="font-mono text-[0.66rem] tracking-[0.14em] text-muted uppercase">
                      {capability.index}
                    </p>
                    <h3 className="mt-3 font-display text-2xl leading-snug">{capability.title}</h3>
                    <p className="mt-3 font-display text-lg text-amber">{capability.philosophy}</p>
                    {capability.relatedSlug ? (
                      <Link
                        to={paths.advisoryDetail(capability.relatedSlug)}
                        className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.68rem] tracking-[0.12em] uppercase transition-colors hover:text-amber"
                      >
                        See the related mandate
                        <ArrowUpRight size={12} aria-hidden />
                      </Link>
                    ) : null}
                  </div>
                  <div className="lg:col-span-8">
                    <p className="text-[0.97rem] text-muted">
                      <strong className="font-normal text-ink">The problem: </strong>
                      {capability.problem}
                    </p>
                    <div className="mt-6">
                      <p className="font-mono text-[0.64rem] tracking-[0.14em] text-muted uppercase">
                        What we do
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {capability.whatWeDo.map((item) => (
                          <li key={item} className="flex gap-2.5 text-[0.95rem]">
                            <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6 border-t border-line pt-5">
                      <p className="font-mono text-[0.64rem] tracking-[0.14em] text-muted uppercase">
                        What you receive
                      </p>
                      <p className="mt-2 text-[0.95rem]">{capability.whatYouReceive}</p>
                    </div>
                    <div className="mt-5">
                      <p className="font-mono text-[0.64rem] tracking-[0.14em] text-muted uppercase">
                        Experience behind the capability
                      </p>
                      <p className="mt-2 text-[0.9rem] text-muted">{capability.experience}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* AI enablement formats */}
      <section className="border-b border-line py-20 lg:py-24">
        <Container size="wide">
          <SectionHeader
            eyebrow="AI enablement formats"
            title="Useful work, taught through real work."
            copy="These are tailored formats for teams that need to move beyond tool demonstrations. We agree the use cases, data boundaries and success measures before the session or sprint."
          />
          <RevealGroup className="mt-12 grid gap-5 lg:grid-cols-3">
            {aiFormats.map((format) => (
              <motion.article
                key={format.title}
                variants={fadeUp}
                className="rounded-2xl border border-line bg-surface p-7"
              >
                <h3 className="font-display text-xl">{format.title}</h3>
                <p className="mt-3 text-[0.95rem] text-muted">{format.copy}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {format.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.62rem] tracking-[0.12em] text-muted uppercase"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </RevealGroup>
          <Reveal className="mt-10">
            <LinkButton to={paths.contact} variant="outline">
              Discuss an AI enablement brief
            </LinkButton>
          </Reveal>
        </Container>
      </section>

      {/* Adjacent mandates */}
      <section className="py-20 lg:py-28">
        <Container size="wide">
          <SectionHeader
            eyebrow="Adjacent mandates"
            title="More ways to put this foundation to work."
            copy="These applications extend proven delivery, transition, governance and commercial experience into new client situations. Each mandate is scoped around the people and specialist skills it needs."
          />
          <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {adjacentMandates.map((mandate) => (
              <motion.article key={mandate.title} variants={fadeUp} className="bg-surface p-7">
                <p className="font-mono text-[0.66rem] tracking-[0.14em] text-amber uppercase">
                  {mandate.kicker}
                </p>
                <h3 className="mt-3 font-display text-xl">{mandate.title}</h3>
                <p className="mt-3 text-[0.93rem] text-muted">{mandate.copy}</p>
                <p className="mt-4 border-t border-line pt-4 font-mono text-[0.68rem] leading-relaxed text-muted">
                  {mandate.basis}
                </p>
              </motion.article>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Ways to engage + FAQ */}
      <section className="border-t border-line bg-sunk py-20 lg:py-28">
        <Container size="wide">
          <SectionHeader
            eyebrow="Ways to engage"
            title="Three ways to work together."
            copy="Scope, outputs and fees are agreed in writing before work begins. The form of engagement follows the decision and the level of ownership needed."
          />
          <RevealGroup className="mt-12 grid gap-5 lg:grid-cols-3">
            {engagementShapes.map((shape) => (
              <motion.div
                key={shape.index}
                variants={fadeUp}
                className="rounded-2xl border border-line bg-surface p-7"
              >
                <p className="font-mono text-[0.7rem] tracking-[0.14em] text-muted">
                  {shape.index}
                </p>
                <h3 className="mt-4 font-display text-xl">{shape.title}</h3>
                <p className="mt-1.5 font-mono text-[0.66rem] tracking-[0.1em] text-amber uppercase">
                  {shape.meta}
                </p>
                <ul className="mt-5 space-y-2">
                  {shape.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[0.93rem] text-muted">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </RevealGroup>

          <div className="mt-20">
            <SectionHeader eyebrow="Working together" title="Practical answers before we begin." />
            <Reveal className="mt-10">
              <Accordion items={faqs} />
              <p className="mt-8 max-w-2xl text-[0.95rem] text-muted">
                <strong className="font-normal text-ink">One accountable advisory lead.</strong> I
                lead diagnosis, operating design and delivery governance; the responsibilities of
                client teams and any specialist contributors are agreed in the mandate.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow="A useful first step"
        title="Start with the problem, not a package."
        copy="Tell me what is happening, what decision is stuck and what is at stake. We can define the smallest useful intervention."
        secondaryLabel="Run the health check"
        secondaryTo={paths.healthCheck}
      />
    </>
  )
}
