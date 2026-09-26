import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { paths } from '@/routes/paths'
import { Container } from '@/widgets/Container'
import { Eyebrow } from '@/widgets/Eyebrow'
import { Reveal } from '@/widgets/Reveal'

/** Shared inner-page masthead with breadcrumb and optional trailing slot. */
export function PageHeader({
  eyebrow,
  title,
  copy,
  breadcrumb,
  children,
}: {
  eyebrow: string
  title: string
  copy?: string
  breadcrumb: string
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden border-b border-line pt-32 pb-16 lg:pt-40 lg:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(60% 50% at 12% 0%, var(--glow), transparent 62%)',
        }}
      />
      <Container size="wide">
        <Reveal>
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
              <li>
                <Link to={paths.home} className="transition-colors hover:text-amber">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-ink">{breadcrumb}</li>
            </ol>
          </nav>

          <Eyebrow className="mt-8">{eyebrow}</Eyebrow>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[1.03]">
            {title}
          </h1>
          {copy ? <p className="mt-6 max-w-2xl text-[1.0625rem] text-muted">{copy}</p> : null}
          {children}
        </Reveal>
      </Container>
    </section>
  )
}
