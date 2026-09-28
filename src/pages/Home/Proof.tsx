import { motion } from 'framer-motion'
import { disclaimers, site } from '@/data/site'
import { proofPoints } from '@/data/evidence'
import { paths } from '@/routes/paths'
import { fadeUp } from '@/animations/variants'
import { LinkButton } from '@/widgets/Button'
import { Container } from '@/widgets/Container'
import { Eyebrow } from '@/widgets/Eyebrow'
import { Reveal, RevealGroup } from '@/widgets/Reveal'
import { SectionHeader } from '@/widgets/SectionHeader'
import { TestimonialColumns } from '@/widgets/TestimonialColumns'

export function HomeProof() {
  return (
    <section className="border-t border-line bg-sunk py-20 lg:py-28">
      <Container size="wide">
        <SectionHeader
          eyebrow="A few proof points"
          title="Experience that crossed from the boardroom to the working team."
        />

        <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {proofPoints.map((point) => (
            <motion.article key={point.discipline} variants={fadeUp} className="bg-surface p-7">
              <p className="font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                {point.discipline}
              </p>
              <p className="mt-4 font-display text-2xl text-amber">{point.metric}</p>
              <p className="mt-3 text-[0.95rem] text-muted">{point.copy}</p>
            </motion.article>
          ))}
        </RevealGroup>

        <Reveal className="mt-7">
          <p className="max-w-3xl font-mono text-[0.68rem] leading-relaxed text-muted">
            {disclaimers.evidence}
          </p>
          <div className="mt-7">
            <LinkButton to={paths.evidence} variant="outline">
              Read the selected work and Rishi’s role
            </LinkButton>
          </div>
        </Reveal>

        {/* Recommendations, looped vertically like the 21st.dev column pattern. */}
        <div className="mt-20">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">In their words</Eyebrow>
            <h2 className="mt-5 text-3xl sm:text-4xl">
              How I show up when delivery gets difficult.
            </h2>
            <p className="mt-5 text-[1.0625rem] text-muted">
              Excerpts from public LinkedIn recommendations written by people who worked with me in
              prior roles.
            </p>
            <div className="mt-8">
              <LinkButton to={site.linkedin} external variant="outline">
                View Rishi’s LinkedIn profile
              </LinkButton>
            </div>
          </Reveal>
          <div className="mt-12">
            <TestimonialColumns />
          </div>
        </div>
      </Container>
    </section>
  )
}
