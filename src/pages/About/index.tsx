import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  aboutCta,
  aboutHighlights,
  aboutIntro,
  aboutLeadership,
  aboutPrinciples,
  aboutWho,
} from '@/data/about'
import { practices } from '@/data/engagements'
import { engagementShapes } from '@/data/personas'
import { disclaimers, organisations, site } from '@/data/site'
import { paths } from '@/routes/paths'
import { fadeUp } from '@/animations/variants'
import { BookCallButton, LinkButton } from '@/widgets/Button'
import { Container } from '@/widgets/Container'
import { CtaBand } from '@/widgets/CtaBand'
import { Eyebrow } from '@/widgets/Eyebrow'
import { ExperienceStrip } from '@/widgets/ExperienceStrip'
import { PageHeader } from '@/widgets/PageHeader'
import { Reveal, RevealGroup } from '@/widgets/Reveal'
import { SectionHeader } from '@/widgets/SectionHeader'
import { Seo, serviceJsonLd } from '@/widgets/Seo'
import { SpotlightCard } from '@/widgets/SpotlightCard'

export function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        description="The Promise Office is a delivery, GCC and AI advisory practice. We help IT services firms, GCCs and enterprise leaders recover critical programs, build delivery capability and move AI into governed operations."
        path={paths.about}
        jsonLd={serviceJsonLd}
        breadcrumb="About"
      />

      {/* Introduction */}
      <PageHeader
        breadcrumb="About"
        eyebrow={aboutIntro.eyebrow}
        title={aboutIntro.title}
        copy={aboutIntro.copy}
      >
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <BookCallButton size="lg">Request a 30-minute call</BookCallButton>
          <LinkButton to={paths.advisory} variant="outline" size="lg">
            Explore our advisory
          </LinkButton>
        </div>
        <div className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {aboutHighlights.map((item) => (
            <div key={item.label}>
              <p className="font-display text-xl text-amber">{item.value}</p>
              <p className="mt-1.5 font-mono text-[0.66rem] tracking-[0.12em] text-muted uppercase">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </PageHeader>

      {/* Who we are */}
      <section className="py-14 lg:py-16">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <Eyebrow>{aboutWho.eyebrow}</Eyebrow>
              <h2 className="mt-5 text-3xl sm:text-4xl">{aboutWho.title}</h2>
            </Reveal>
            <Reveal className="space-y-6 text-[1.0625rem] leading-relaxed lg:col-span-7" delay={0.08}>
              {aboutWho.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p>
                <Link to={paths.evidence} className="text-amber hover:underline">
                  Evidence
                </Link>{' '}
                sets out what that experience has taught, organised around the situations it recurs
                in — not as a project list.
              </p>
              <p className="font-mono text-[0.72rem] leading-relaxed text-muted">
                {disclaimers.practice}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Practices */}
      <section className="border-y border-line bg-sunk py-14 lg:py-16">
        <Container size="wide">
          <SectionHeader
            eyebrow="What we do"
            title="Four practices, one idea: make the promise deliverable."
            copy="Each practice is worked through the Advisory, GCC and AI pages, and each draws on the same delivery, service and commercial discipline."
          />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* How we work */}
      <section className="py-14 lg:py-20">
        <Container size="wide">
          <SectionHeader eyebrow="How we work" title="What you can expect from us." />
          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {aboutPrinciples.map((principle) => (
              <motion.article key={principle.index} variants={fadeUp} className="bg-surface p-7">
                <p className="font-mono text-[0.68rem] tracking-[0.14em] text-muted">
                  {principle.index} / {principle.title}
                </p>
                <h3 className="mt-4 font-display text-xl">{principle.heading}</h3>
                <p className="mt-3 text-[0.95rem] text-muted">{principle.copy}</p>
              </motion.article>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Ways to engage */}
      <section className="border-y border-line bg-sunk py-14 lg:py-16">
        <Container size="wide">
          <SectionHeader
            eyebrow="Ways to engage"
            title="Support shaped to the mandate."
            copy="Scope, outputs and availability are agreed before work begins. These are examples of formats, not fixed packages or guaranteed timelines."
          />
          <RevealGroup className="mt-12 grid gap-5 lg:grid-cols-3">
            {engagementShapes.map((shape) => (
              <motion.div
                key={shape.index}
                variants={fadeUp}
                className="rounded-2xl border border-line bg-surface p-7"
              >
                <p className="font-mono text-[0.7rem] tracking-[0.14em] text-muted">{shape.index}</p>
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
        </Container>
      </section>

      {/* Experience behind the practice */}
      <section className="border-t border-line py-14 lg:py-16">
        <Container size="wide">
          <Eyebrow>Experience behind the practice</Eyebrow>
          <p className="mt-4 max-w-2xl text-[0.97rem] text-muted">
            The Promise Office is informed by work across telecommunications, technology services,
            enterprise operations and transformation environments in prior roles.
          </p>
          <div className="mt-8">
            <ExperienceStrip items={organisations} />
          </div>
          <p className="mt-7 max-w-3xl font-mono text-[0.68rem] leading-relaxed text-muted">
            Prior employers and client environments shown for experience context only; no
            endorsement of this independent practice is implied.
          </p>
        </Container>
      </section>

      {/* Leadership */}
      <section className="border-t border-line py-14 lg:py-16">
        <Container size="wide">
          <Reveal className="max-w-3xl">
            <Eyebrow>{aboutLeadership.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-3xl sm:text-4xl">{aboutLeadership.title}</h2>
            <p className="mt-5 text-[1.0625rem] text-muted">{aboutLeadership.copy}</p>
            <div className="mt-8">
              <LinkButton to={site.linkedin} external variant="outline">
                View the LinkedIn profile
              </LinkButton>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        eyebrow={aboutCta.eyebrow}
        title={aboutCta.title}
        copy={aboutCta.copy}
        secondaryLabel="See the evidence"
        secondaryTo={paths.evidence}
      />
    </>
  )
}
