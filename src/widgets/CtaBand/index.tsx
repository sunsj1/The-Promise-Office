import { Container } from '@/widgets/Container'
import { Eyebrow } from '@/widgets/Eyebrow'
import { BookCallButton, LinkButton } from '@/widgets/Button'
import { Reveal } from '@/widgets/Reveal'
import { Seal } from '@/widgets/Seal'

const nextSteps = [
  {
    title: 'Tell us the challenge',
    copy: 'A short call or note on where it sits and what needs deciding.',
  },
  {
    title: 'We suggest a next step',
    copy: 'A practical, proportionate step — sometimes just a conversation.',
  },
  {
    title: 'Scope before work',
    copy: 'Outputs and decision rights agreed before anything begins.',
  },
] as const

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
    <section className="relative overflow-hidden border-t border-line bg-sunk py-14 lg:py-20">
      <Seal
        aria-hidden
        className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 opacity-[0.045]"
      />
      <Container className="relative">
        <Reveal className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[3.1rem]">{title}</h2>
            <p className="mt-5 max-w-xl text-base text-muted sm:text-[1.0625rem]">{copy}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <BookCallButton size="lg">{primaryLabel}</BookCallButton>
              {secondaryLabel && secondaryTo ? (
                <LinkButton to={secondaryTo} variant="outline" size="lg">
                  {secondaryLabel}
                </LinkButton>
              ) : null}
            </div>
          </div>
          <ol className="grid gap-3 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
            {nextSteps.map((step, i) => (
              <li
                key={step.title}
                className="group flex gap-4 rounded-xl border border-line bg-surface p-4 transition-colors duration-300 hover:border-amber/50"
              >
                <span className="font-display text-2xl leading-none text-amber">{i + 1}</span>
                <span>
                  <span className="block font-display text-base">{step.title}</span>
                  <span className="mt-1 block text-[0.88rem] text-muted">{step.copy}</span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  )
}
