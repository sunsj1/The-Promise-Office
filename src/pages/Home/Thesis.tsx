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
    <section className="relative isolate overflow-hidden bg-night py-24 text-cream lg:py-32">
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
              Companies do not experience process, technology, service, finance and people as
              separate workstreams. A customer experiences the whole system. I bring 21+ years across
              those seams — from process redesign and commercial shaping to program recovery, managed
              services, AI delivery and executive governance.
            </p>
            <p>
              I can enter for a specific problem, build a missing capability or take accountability
              through a critical period. The work begins with evidence and ends with an operating
              rhythm your team can sustain.
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
