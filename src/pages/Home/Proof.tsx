import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { primarySituations } from '@/data/situations'
import { paths } from '@/routes/paths'
import { LinkButton } from '@/widgets/Button'
import { Container } from '@/widgets/Container'
import { Eyebrow } from '@/widgets/Eyebrow'
import { Reveal } from '@/widgets/Reveal'

export function HomeProof() {
  return (
    <section className="border-t border-line bg-sunk py-14 lg:py-20">
      <Container size="wide">
        <Reveal className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Eyebrow>Grounded in practice</Eyebrow>
            <h2 className="mt-5 text-3xl sm:text-4xl">We have seen these situations before.</h2>
            <p className="mt-5 text-[1.0625rem] text-muted">
              Evidence sets out the recurring executive situations behind that judgement — what
              usually sits underneath them, and what changes when they're handled well.
            </p>
            <div className="mt-7">
              <LinkButton to={paths.evidence} variant="outline">
                Read the Evidence
              </LinkButton>
            </div>
          </div>
          <ul className="divide-y divide-line border-y border-line lg:col-span-7">
            {primarySituations.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`${paths.evidence}#${s.slug}`}
                  className="group flex items-center gap-4 py-4 transition-colors"
                >
                  <span className="font-mono text-[0.68rem] tracking-[0.14em] text-muted">
                    {s.index}
                  </span>
                  <span className="flex-1 font-display text-lg leading-snug transition-colors group-hover:text-amber">
                    {s.title}
                  </span>
                  <ArrowUpRight
                    size={16}
                    aria-hidden
                    className="text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
