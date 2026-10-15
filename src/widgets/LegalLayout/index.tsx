import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { paths } from '@/routes/paths'
import { Container } from '@/widgets/Container'
import { Reveal } from '@/widgets/Reveal'

export type LegalSection = { id: string; title: string; body: ReactNode }

/** Two-column legal layout: sticky section index beside the text. */
export function LegalLayout({
  sections,
  other,
}: {
  sections: LegalSection[]
  other: 'privacy' | 'terms'
}) {
  return (
    <section className="py-12 lg:py-16">
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-4">
            <nav aria-label="On this page" className="lg:sticky lg:top-28">
              <p className="font-mono text-[0.66rem] tracking-[0.18em] text-muted uppercase">
                On this page
              </p>
              <ol className="mt-4 divide-y divide-line border-y border-line">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="flex gap-3 py-2.5 text-[0.93rem] text-muted transition-colors hover:text-amber"
                    >
                      <span className="font-mono text-[0.66rem] leading-[1.7]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-[0.88rem] text-muted">
                Also see our{' '}
                <Link
                  to={other === 'privacy' ? paths.privacy : paths.terms}
                  className="text-amber hover:underline"
                >
                  {other === 'privacy' ? 'privacy notice' : 'website terms'}
                </Link>
                .
              </p>
            </nav>
          </aside>
          <Reveal className="space-y-10 text-[1.0125rem] leading-relaxed lg:col-span-8">
            {sections.map((s, i) => (
              <div
                key={s.id}
                id={s.id}
                className="scroll-mt-28 border-t border-line pt-6 first:border-t-0 first:pt-0"
              >
                <h2 className="flex items-baseline gap-3 font-display text-2xl">
                  <span className="font-mono text-[0.7rem] text-amber">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {s.title}
                </h2>
                <p className="mt-3 text-muted">{s.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
