import { paths } from '@/routes/paths'
import { LinkButton } from '@/widgets/Button'
import { Container } from '@/widgets/Container'
import { Eyebrow } from '@/widgets/Eyebrow'
import { Reveal } from '@/widgets/Reveal'

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
      </Container>
    </section>
  )
}
