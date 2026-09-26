import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { problems } from '@/data/problems'
import { SpotlightCard } from '@/widgets/SpotlightCard'

export function ProblemChooser() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {problems.map((problem, index) => (
        <li key={problem.id}>
          <SpotlightCard as="article" className="h-full">
            <Link to={problem.href} className="flex h-full flex-col p-6">
              <span className="font-mono text-[0.68rem] tracking-[0.16em] text-muted">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-display text-xl leading-snug sm:text-[1.35rem]">
                {problem.label}
              </h3>
              <p className="mt-2 flex-1 text-[0.95rem] text-muted">{problem.hint}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[0.68rem] tracking-[0.14em] text-amber uppercase">
                Start here
                <ArrowUpRight
                  size={13}
                  aria-hidden
                  className="transition-transform duration-300 group-hover/spot:translate-x-0.5 group-hover/spot:-translate-y-0.5"
                />
              </span>
            </Link>
          </SpotlightCard>
        </li>
      ))}
    </ul>
  )
}
