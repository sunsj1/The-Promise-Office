import { ArrowRight, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { guide, insights } from '@/data/perspective'
import { paths } from '@/routes/paths'
import { Container } from '@/widgets/Container'
import { CtaBand } from '@/widgets/CtaBand'
import { Eyebrow } from '@/widgets/Eyebrow'
import { PageHeader } from '@/widgets/PageHeader'
import { Reveal } from '@/widgets/Reveal'
import { Seal } from '@/widgets/Seal'
import { Seo } from '@/widgets/Seo'

export function InsightsPage() {
  return (
    <>
      <Seo
        title="Insights"
        description="Short, practical notes on delivery leadership and AI delivery — written for sponsors and delivery leaders who have to make the next decision."
        path={paths.insights}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Insights — The Promise Office',
          blogPost: insights.map((article) => ({
            '@type': 'BlogPosting',
            headline: article.title,
            abstract: article.standfirst,
            author: { '@type': 'Person', name: 'Hrishikesh Salunkhe' },
          })),
        }}
      />

      <PageHeader
        breadcrumb="Insights"
        eyebrow="Notes on delivery"
        title="Short pieces on the decisions that actually move programs."
        copy="No thought-leadership theatre. These are the arguments I make in steering committees, written down so you can decide whether my thinking is useful to you before we ever speak."
      />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="space-y-20 lg:space-y-28">
            {insights.map((article) => (
              <Reveal key={article.slug}>
                <article className="border-t border-line pt-10">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <p className="font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                      {article.index}
                    </p>
                    <p className="rounded-full bg-amber/12 px-2.5 py-0.5 font-mono text-[0.62rem] tracking-[0.1em] text-amber uppercase">
                      {article.category}
                    </p>
                  </div>

                  <h2 className="mt-5 max-w-3xl text-3xl sm:text-[2.5rem] sm:leading-[1.12]">
                    {article.title}
                  </h2>
                  <p className="mt-5 max-w-2xl font-display text-xl leading-relaxed text-muted italic">
                    {article.standfirst}
                  </p>

                  <div className="mt-10 max-w-[65ch] space-y-6 text-[1.0625rem] leading-[1.75]">
                    {article.body.map((paragraph, index) => (
                      <p
                        key={paragraph.slice(0, 24)}
                        className={
                          index === 0
                            ? 'first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[3.4rem] first-letter:leading-[0.82] first-letter:text-amber'
                            : undefined
                        }
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <Link
                    to={article.cta.to}
                    className="mt-10 inline-flex items-center gap-2 border-b border-amber/40 pb-1 font-mono text-[0.72rem] tracking-[0.12em] text-amber uppercase transition-colors hover:border-amber"
                  >
                    {article.cta.label}
                    <ArrowRight size={14} aria-hidden />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* The guide */}
      <section className="border-t border-line bg-sunk py-20 lg:py-24">
        <Container size="wide">
          <Reveal>
            <div className="relative grid items-center gap-10 overflow-hidden rounded-3xl border border-line bg-surface p-8 lg:grid-cols-12 lg:gap-14 lg:p-12">
              <Seal
                className="pointer-events-none absolute -right-16 -bottom-20 h-64 w-64 opacity-[0.06]"
                aria-hidden
              />
              <div className="relative lg:col-span-7">
                <p className="inline-flex items-center gap-2.5 font-mono text-[0.68rem] tracking-[0.16em] text-amber uppercase">
                  <BookOpen size={15} aria-hidden />
                  {guide.kicker}
                </p>
                <h2 className="mt-5 text-3xl sm:text-4xl">{guide.title}</h2>
                <p className="mt-5 max-w-xl text-[1.0625rem] text-muted">{guide.copy}</p>
              </div>
              <div className="relative lg:col-span-5">
                <div className="rounded-2xl border border-line bg-sunk p-7">
                  <Eyebrow>The promise</Eyebrow>
                  <p className="mt-4 font-display text-2xl leading-snug">{guide.strap}</p>
                  <p className="mt-6 font-mono text-[0.68rem] leading-relaxed text-muted">
                    Written for people starting their careers and professionals who want to
                    understand AI, LLMs and agents without writing code.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        eyebrow="Discuss the thinking"
        title="Disagree with something here?"
        copy="That is usually the most productive way to start. Tell me about your program and I will tell you what I would test first."
        secondaryLabel="Run the health check"
        secondaryTo={paths.healthCheck}
      />
    </>
  )
}
