import { Link } from 'react-router-dom'
import type { ElementType, ReactNode } from 'react'
import { paths } from '@/routes/paths'
import { Container } from '@/widgets/Container'
import { Eyebrow } from '@/widgets/Eyebrow'
import { Reveal } from '@/widgets/Reveal'
import { AutoConstellation } from '@/widgets/Graphics/PromiseConstellation'
import { cn } from '@/lib/cn'

/** Shared inner-page masthead with breadcrumb and optional trailing slot. */
export function PageHeader({
  eyebrow,
  title,
  copy,
  breadcrumb,
  aside,
  graphic,
  points,
  children,
  leading = true,
  headingLevel = 'h1',
}: {
  eyebrow: string
  title: string
  copy?: string
  breadcrumb: string
  /** Optional right-hand visual. */
  aside?: ReactNode
  /** Page-specific interactive graphic. Omit for the default; pass null for none. */
  graphic?: ReactNode | null
  /** Short chips under the intro that summarise it at a glance. */
  points?: readonly string[]
  children?: ReactNode
  /** False when another section already precedes this one on the page — drops the top padding reserved for clearing the fixed navbar. */
  leading?: boolean
  /** Use 'h2' when the page's single <h1> lives in an earlier section. */
  headingLevel?: 'h1' | 'h2'
}) {
  const Heading: ElementType = headingLevel
  const split = copy?.match(/^(.+?[.?!])\s+([\s\S]+)$/)
  const lead = split ? split[1] : copy
  const rest = split ? split[2] : undefined
  return (
    <section
      className={cn(
        'relative overflow-hidden border-b border-line pb-12 lg:pb-14',
        leading ? 'pt-24 lg:pt-32' : 'pt-14 lg:pt-16',
      )}
    >
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

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
            <div className={graphic === null && !aside ? 'lg:col-span-12' : 'lg:col-span-7'}>
              <Eyebrow>{eyebrow}</Eyebrow>
              <Heading className="mt-5 max-w-4xl text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[1.03]">
                {title}
              </Heading>
              {lead ? (
                <p
                  className={
                    rest
                      ? 'mt-6 max-w-2xl text-[1.2rem] leading-snug text-ink'
                      : 'mt-6 max-w-2xl text-[1.0625rem] text-muted'
                  }
                >
                  {lead}
                </p>
              ) : null}
              {rest ? <p className="mt-3 max-w-2xl text-[1rem] text-muted">{rest}</p> : null}
              {points?.length ? (
                <ul className="mt-6 flex max-w-2xl flex-wrap gap-2">
                  {points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[0.64rem] tracking-[0.1em] text-muted uppercase"
                    >
                      <span aria-hidden className="h-1 w-1 rounded-full bg-amber" />
                      {point}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            {aside ? (
              <div className="mx-auto w-[min(70%,16.5rem)] lg:col-span-5 lg:mx-0 lg:w-full lg:max-w-[20rem] lg:justify-self-end">
                {aside}
              </div>
            ) : graphic ? (
              <div className="w-full lg:col-span-5 lg:justify-self-end">{graphic}</div>
            ) : graphic === null ? null : (
              <div className="hidden lg:col-span-5 lg:block lg:justify-self-end">
                <AutoConstellation className="w-full max-w-[22rem]" />
              </div>
            )}
          </div>
          {children}
        </Reveal>
      </Container>
    </section>
  )
}
