import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { paths } from '@/routes/paths'
import { Container } from '@/widgets/Container'
import { Eyebrow } from '@/widgets/Eyebrow'
import { Reveal } from '@/widgets/Reveal'

export function HomeGccAiSpotlight() {
  return (
    <section className="relative isolate overflow-hidden bg-night py-20 text-cream lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(55% 45% at 85% 15%, rgba(240,180,60,0.16), transparent 62%), radial-gradient(50% 45% at 5% 95%, rgba(75,46,131,0.4), transparent 60%)',
        }}
      />
      <Container size="wide">
        <Reveal className="max-w-2xl">
          <Eyebrow className="text-lilac">The AI-enabled GCC</Eyebrow>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-[3rem]">
            GCCs should not simply consume AI tools. They can become the enterprise engine that
            industrialises AI.
          </h2>
          <p className="mt-6 text-[1.0625rem] text-cream/80">
            The Promise Office works at the operating layer: use-case portfolio, workflow redesign,
            AI operating model, governance, enablement and adoption, human/AI decision rights and
            benefits measurement.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <Link
              to={paths.gcc}
              className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] tracking-[0.14em] text-amber uppercase hover:underline"
            >
              Explore the GCC practice
              <ArrowRight size={13} aria-hidden />
            </Link>
            <Link
              to={paths.ai}
              className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] tracking-[0.14em] text-cream uppercase hover:underline"
            >
              Explore the AI practice
              <ArrowRight size={13} aria-hidden />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
