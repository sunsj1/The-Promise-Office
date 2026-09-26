import { paths } from '@/routes/paths'
import { Container } from '@/widgets/Container'
import { Eyebrow } from '@/widgets/Eyebrow'
import { LinkButton } from '@/widgets/Button'
import { Reveal } from '@/widgets/Reveal'
import { Seal } from '@/widgets/Seal'

type CtaBandProps = {
  eyebrow: string
  title: string
  copy: string
  primaryLabel?: string
  secondaryLabel?: string
  secondaryTo?: string
}

export function CtaBand({
  eyebrow,
  title,
  copy,
  primaryLabel = 'Request a 30-minute call',
  secondaryLabel,
  secondaryTo,
}: CtaBandProps) {
  return (
    <section className="relative overflow-hidden border-t border-line bg-sunk py-20 lg:py-28">
      <Seal
        aria-hidden
        className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 opacity-[0.045]"
      />
      <Container className="relative">
        <Reveal className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[3.1rem]">{title}</h2>
          <p className="mt-5 max-w-xl text-base text-muted sm:text-[1.0625rem]">{copy}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <LinkButton to={paths.contact} size="lg">
              {primaryLabel}
            </LinkButton>
            {secondaryLabel && secondaryTo ? (
              <LinkButton to={secondaryTo} variant="outline" size="lg">
                {secondaryLabel}
              </LinkButton>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
