import { lensStages } from '@/data/lens'
import { cn } from '@/lib/cn'
import { Container } from '@/widgets/Container'
import { Eyebrow } from '@/widgets/Eyebrow'
import { PromiseConstellation, useLensState } from '@/widgets/Graphics/PromiseConstellation'
import { Reveal } from '@/widgets/Reveal'

/**
 * The Promise Lens, introduced once — a way of examining a problem, not a
 * framework page. Referenced by the Health Check and Evidence, but
 * deliberately not given its own route.
 */
export function HomePromiseLens() {
  const { active, select, resume } = useLensState()

  return (
    <section className="py-14 lg:py-20">
      <Container size="wide">
        <Reveal className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Eyebrow>How we think</Eyebrow>
            <h2 className="mt-5 text-3xl sm:text-4xl">The Promise Lens.</h2>
            <p className="mt-4 max-w-xl text-[1.0125rem] text-muted">
              A structured way of understanding where value is created, lost, diluted or trapped —
              before deciding what to change. It shapes the thinking behind Evidence and the Health
              Check rather than sitting on the site as a framework in its own right.
            </p>
            <ol className="mt-8 divide-y divide-line border-y border-line" onMouseLeave={resume}>
              {lensStages.map((stage, i) => (
                <li key={stage.name}>
                  <button
                    type="button"
                    onMouseEnter={() => select(i)}
                    onFocus={() => select(i)}
                    onClick={() => select(i)}
                    aria-pressed={i === active}
                    className="group flex w-full items-baseline gap-4 py-3 text-left"
                  >
                    <span
                      className={cn(
                        'w-24 font-mono text-[0.72rem] tracking-[0.12em] uppercase transition-colors',
                        i === active ? 'text-amber' : 'text-muted',
                      )}
                    >
                      {stage.name}
                    </span>
                    <span
                      className={cn(
                        'text-[0.97rem] transition-colors',
                        i === active ? 'text-ink' : 'text-muted',
                      )}
                    >
                      {stage.question}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-6">
            <PromiseConstellation
              active={active}
              onSelect={select}
              onLeave={resume}
              className="mx-auto w-full max-w-[26rem]"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
