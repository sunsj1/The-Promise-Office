import { site } from '@/data/site'
import { paths } from '@/routes/paths'
import { LinkButton } from '@/widgets/Button'
import { Container } from '@/widgets/Container'
import { Eyebrow } from '@/widgets/Eyebrow'
import { Reveal } from '@/widgets/Reveal'
import { TestimonialColumns } from '@/widgets/TestimonialColumns'

export function HomeProof() {
  return (
    <section className="border-t border-line bg-sunk py-20 lg:py-28">
      <Container size="wide">
        <Reveal className="max-w-2xl">
          <Eyebrow>Grounded in practice</Eyebrow>
          <h2 className="mt-5 text-3xl sm:text-4xl">
            We have seen these situations before.
          </h2>
          <p className="mt-5 text-[1.0625rem] text-muted">
            Evidence sets out the recurring executive situations behind that judgement — what
            usually sits underneath them, and what changes when they're handled well.
          </p>
          <div className="mt-7">
            <LinkButton to={paths.evidence} variant="outline">
              Read the Evidence
            </LinkButton>
          </div>
        </Reveal>

        {/* Recommendations, looped vertically like the 21st.dev column pattern. */}
        <div className="mt-20">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">In their words</Eyebrow>
            <h2 className="mt-5 text-3xl sm:text-4xl">
              How The Promise Office shows up when delivery gets difficult.
            </h2>
            <p className="mt-5 text-[1.0625rem] text-muted">
              Excerpts from public LinkedIn recommendations written by people who worked with
              Rishi in prior roles.
            </p>
            <div className="mt-8">
              <LinkButton to={site.linkedin} external variant="outline">
                View the LinkedIn profile
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
