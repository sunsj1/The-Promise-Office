import { Container } from '@/widgets/Container'
import { Eyebrow } from '@/widgets/Eyebrow'
import { Reveal } from '@/widgets/Reveal'
import { Seal } from '@/widgets/Seal'

/*
  The dark inversion band. One idea only: the practice thesis, with the quote
  from the source content as the emphasis.
*/
export function HomeThesis() {
  return (
    <section className="relative isolate overflow-hidden bg-night py-16 text-cream lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 80% 10%, rgba(240,180,60,0.16), transparent 62%), radial-gradient(55% 48% at 10% 90%, rgba(75,46,131,0.38), transparent 62%)',
        }}
      />
      <Seal
        aria-hidden
        className="pointer-events-none absolute -right-20 -bottom-28 -z-10 h-[26rem] w-[26rem] text-cream opacity-[0.07]"
      />

      <Container size="wide">
        <Reveal className="max-w-4xl">
          <Eyebrow className="text-[#a39e93]">Why this practice exists</Eyebrow>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-[3.2rem]">
            The gap between a sound idea and a working operation is a leadership problem.
          </h2>
          <div className="mt-8 grid gap-7 text-[1.0625rem] leading-relaxed text-[#a39e93] lg:grid-cols-2">
            <p>
              Delivery promises rarely break in one place. A commercial commitment outruns the
              operating model built to support it; a process handoff nobody owns quietly drops
              information; a technology rollout ships before the operations that depend on it are
              ready. Each looks like a local problem until the pattern repeats across a portfolio.
            </p>
            <p>
              The Promise Office works across those seams — commercial, process, technology and
              operations — drawing on 21+ years of delivery, transformation and commercial
              leadership. The approach starts with evidence: what is actually true, not what the
              status report says. It ends with clear ownership and an operating rhythm the client's
              own team can sustain.
            </p>
          </div>

          <blockquote className="mt-12 max-w-3xl border-l-2 border-amber pl-6">
            <p className="font-display text-2xl leading-snug sm:text-3xl">
              “If the plan, the service promise and the commercial model disagree, the status report
              will eventually tell you.”
            </p>
          </blockquote>
        </Reveal>
      </Container>
    </section>
  )
}
