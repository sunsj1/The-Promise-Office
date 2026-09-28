import { motion } from 'framer-motion'
import { GraduationCap, Layers } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  career,
  credentials,
  perspectiveHighlights,
  principles,
  testimonials,
} from '@/data/perspective'
import { engagementShapes } from '@/data/personas'
import { disclaimers, organisations, site } from '@/data/site'
import { paths } from '@/routes/paths'
import { fadeUp } from '@/animations/variants'
import { LinkButton } from '@/widgets/Button'
import { Container } from '@/widgets/Container'
import { CtaBand } from '@/widgets/CtaBand'
import { Eyebrow } from '@/widgets/Eyebrow'
import { ExperienceStrip } from '@/widgets/ExperienceStrip'
import { PageHeader } from '@/widgets/PageHeader'
import { Reveal, RevealGroup } from '@/widgets/Reveal'
import { SectionHeader } from '@/widgets/SectionHeader'
import { Portrait } from '@/widgets/Portrait'
import { Seo, personJsonLd } from '@/widgets/Seo'
import { TestimonialColumn } from '@/widgets/TestimonialColumns'

export function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        description="Hrishikesh (Rishi) Salunkhe: 21+ years across process consulting, PMO/PGO leadership, service management, managed services, transformation and commercial roles."
        path={paths.about}
        jsonLd={personJsonLd}
        breadcrumb="About"
      />

      <PageHeader
        breadcrumb="About"
        eyebrow={site.person}
        title="Senior judgment. Practical ownership."
        copy="I work at the intersection of business process, technology delivery, service operations and commercial accountability. My approach is to make ambiguity discussable, decisions explicit and execution visible."
        aside={<Portrait size="page" />}
      >
        <p className="mt-8 font-mono text-[0.7rem] tracking-[0.1em] text-muted uppercase">
          {site.founderDescriptor}
        </p>
        <div className="mt-6 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {perspectiveHighlights.map((item) => (
            <div key={item.label}>
              <p className="font-display text-xl text-amber">{item.value}</p>
              <p className="mt-1.5 font-mono text-[0.66rem] tracking-[0.12em] text-muted uppercase">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </PageHeader>

      {/* The perspective */}
      <section className="py-20 lg:py-24">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <Eyebrow>The perspective</Eyebrow>
              <h2 className="mt-5 text-3xl sm:text-4xl">
                Experience across the full promise-to-delivery chain.
              </h2>
            </Reveal>
            <Reveal className="space-y-6 text-[1.0625rem] leading-relaxed lg:col-span-7" delay={0.08}>
              <p>
                Over 21 years, I have worked in process consulting, PMO and PGO leadership, service
                management, managed services, large transformations, customer delivery and commercial
                roles. That combination matters because the root cause of a delivery problem is often
                outside the project plan: a process handoff, a service promise, a resource assumption
                or a decision nobody owns.
              </p>
              <p>
                My career has included Infosys, Tech Mahindra and Cleverex Technology, with long-term
                assignments in Australia, New Zealand and the Philippines, as well as UK exposure. I
                have worked with operational teams and senior customer leaders across telecom, energy
                and sustainability, technology services and enterprise platforms.
              </p>
              <p>
                The career arc moved from close to operations — service data, SLA and performance
                reporting — into business analysis and process redesign, then into transition and
                account governance across a large managed-services environment, then into program
                leadership, commercial ownership and recovery, and most recently into practice
                building and AI delivery. Each stage added a layer rather than replacing the one
                before it, which is why a delivery problem rarely turns out to have just one cause.
              </p>
              <p>
                <Link to={paths.evidence} className="text-amber hover:underline">
                  Evidence
                </Link>{' '}
                sets out what that experience has taught, organised around the situations it
                recurs in — not as a project list.
              </p>
              <p className="font-mono text-[0.72rem] leading-relaxed text-muted">
                {disclaimers.practice}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Career timeline */}
      <section className="border-y border-line bg-sunk py-20 lg:py-24">
        <Container size="wide">
          <SectionHeader
            eyebrow="Career"
            title="21 years, three firms, one thread."
            copy="Each role added a layer: service data, then process and governance, then programs and P&L, then AI delivery and practice building."
          />

          <RevealGroup className="mt-14">
            <ol className="relative border-l border-line pl-8 sm:pl-10">
              {career.map((role) => (
                <motion.li key={role.company} variants={fadeUp} className="relative pb-12 last:pb-0">
                  <span
                    aria-hidden
                    className="absolute top-2 -left-[2.3rem] grid h-4 w-4 place-items-center rounded-full border-2 border-amber bg-paper sm:-left-[2.8rem]"
                  />
                  <p className="font-mono text-[0.7rem] tracking-[0.14em] text-amber uppercase">
                    {role.period}
                  </p>
                  <h3 className="mt-3 font-display text-2xl">{role.company}</h3>
                  <p className="mt-1 text-[0.95rem] text-muted italic">{role.role}</p>
                  <p className="mt-4 max-w-2xl text-[1.0rem]">{role.copy}</p>
                </motion.li>
              ))}
            </ol>
          </RevealGroup>
        </Container>
      </section>

      {/* How I work */}
      <section className="py-20 lg:py-28">
        <Container size="wide">
          <SectionHeader eyebrow="How I work" title="What you can expect from me." />
          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle) => (
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
      <section className="border-y border-line bg-sunk py-20 lg:py-24">
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

      {/* Credentials */}
      <section className="py-20 lg:py-24">
        <Container size="wide">
          <SectionHeader
            eyebrow="Qualifications and domains"
            title="A broad foundation, applied with care."
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <Reveal className="rounded-2xl border border-line bg-surface p-7 lg:p-8">
              <p className="inline-flex items-center gap-2.5 font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                <GraduationCap size={15} className="text-amber" aria-hidden />
                Education and certifications
              </p>
              <ul className="mt-5 space-y-2.5">
                {credentials.education.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.97rem]">
                    <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-amber" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="rounded-2xl border border-line bg-surface p-7 lg:p-8" delay={0.08}>
              <p className="inline-flex items-center gap-2.5 font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                <Layers size={15} className="text-amber" aria-hidden />
                Domain and technology exposure
              </p>
              <ul className="mt-5 space-y-2.5">
                {credentials.domains.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.97rem]">
                    <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-amber" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal className="mt-10">
            <p className="font-mono text-[0.72rem] text-muted">
              Available for selected mandates, with scope, timing and delivery model agreed for each
              enquiry.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Experience behind the practice */}
      <section className="border-t border-line py-20 lg:py-24">
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

      {/* Recommendations */}
      <section className="border-t border-line bg-sunk py-20 lg:py-24">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <Eyebrow>In their words</Eyebrow>
              <h2 className="mt-5 text-3xl sm:text-4xl">
                How Rishi shows up when delivery gets difficult.
              </h2>
              <p className="mt-5 text-[1.0625rem] text-muted">
                Excerpts from public LinkedIn recommendations written by people who worked with him
                in prior roles.
              </p>
              <div className="mt-8">
                <LinkButton to={site.linkedin} external variant="outline">
                  View the LinkedIn profile
                </LinkButton>
              </div>
            </Reveal>
            <div className="lg:col-span-7">
              <TestimonialColumn
                testimonials={testimonials}
                className="max-h-[26rem] [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]"
              />
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow="Work together"
        title="Bring the difficult brief."
        copy="Tell me the challenge, where it sits in the organisation and what decision you need to make. I’ll respond with a practical next step."
        secondaryLabel="See the evidence"
        secondaryTo={paths.evidence}
      />
    </>
  )
}
