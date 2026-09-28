import { Container } from '@/widgets/Container'
import { Eyebrow } from '@/widgets/Eyebrow'
import { Reveal } from '@/widgets/Reveal'

const steps = ['Value', 'Economics', 'Context', 'Change', 'Delivery', 'Evidence'] as const

const questions = [
  'What should we do?',
  'Does it make economic sense?',
  'Can we actually deliver it?',
  'Did the promised outcome materialise?',
] as const

/**
 * The Promise Lens, introduced once, briefly — a way of examining a problem,
 * not a framework page. Referenced by the Health Check and Evidence, but
 * deliberately not given its own route.
 */
export function HomePromiseLens() {
  return (
    <section className="py-12 lg:py-14">
      <Container size="wide">
        <Reveal className="max-w-3xl">
          <Eyebrow>How we think</Eyebrow>
          <h2 className="mt-5 text-2xl sm:text-3xl">The Promise Lens.</h2>
          <p className="mt-4 text-[1.0125rem] text-muted">
            A structured way of understanding where value is created, lost, diluted or trapped — before
            deciding what to change. It shapes the thinking behind Evidence and the Health Check rather
            than sitting on the site as a framework in its own right.
          </p>

          <ol className="mt-8 flex flex-wrap items-center gap-2 font-mono text-[0.72rem] tracking-[0.1em] text-muted uppercase">
            {steps.map((step, index) => (
              <li key={step} className="flex items-center gap-2">
                <span className={index === steps.length - 1 ? 'text-amber' : undefined}>{step}</span>
                {index < steps.length - 1 ? <span aria-hidden>→</span> : null}
              </li>
            ))}
          </ol>

          <ul className="mt-7 space-y-2 text-[0.97rem]">
            {questions.map((q) => (
              <li key={q} className="flex gap-3">
                <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber" />
                {q}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
