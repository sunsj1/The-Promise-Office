import { ArrowUpRight, Check, Clock, Mail, MapPin } from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { needOptions, timingOptions } from '@/data/contact'
import { disclaimers, site } from '@/data/site'
import { paths } from '@/routes/paths'
import { ActionButton } from '@/widgets/Button'
import { Container } from '@/widgets/Container'
import { Eyebrow } from '@/widgets/Eyebrow'
import { PageHeader } from '@/widgets/PageHeader'
import { Reveal } from '@/widgets/Reveal'
import { Seo } from '@/widgets/Seo'
import { cn } from '@/lib/cn'

const fieldClass =
  'w-full rounded-xl border border-line bg-surface px-4 py-3 text-[0.97rem] text-ink transition-colors placeholder:text-muted/70 focus:border-amber focus:outline-none'

const labelClass = 'font-mono text-[0.66rem] tracking-[0.14em] text-muted uppercase'

const expectations = [
  'A reply within two business days.',
  'A 30-minute call to understand the decision you face.',
  'An honest answer on whether I can help, and what a useful first step is.',
]

export function ContactPage() {
  const [name, setName] = useState('')
  const [organisation, setOrganisation] = useState('')
  const [email, setEmail] = useState('')
  const [need, setNeed] = useState<string>(needOptions[0])
  const [timing, setTiming] = useState<string>(timingOptions[0])
  const [context, setContext] = useState('')
  const [sent, setSent] = useState(false)

  const mailto = useMemo(() => {
    const subject = `Enquiry — ${need}`
    const body = [
      `Name: ${name || '—'}`,
      `Organisation: ${organisation || '—'}`,
      `Email: ${email || '—'}`,
      `What I need: ${need}`,
      `Timing: ${timing}`,
      '',
      'Context:',
      context || '—',
    ].join('\n')
    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }, [context, email, name, need, organisation, timing])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    window.location.href = mailto
    setSent(true)
  }

  return (
    <>
      <Seo
        title="Contact"
        description="Request a 30-minute call with Hrishikesh (Rishi) Salunkhe to discuss a delivery, transformation or managed services mandate."
        path={paths.contact}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact — The Promise Office',
          mainEntity: {
            '@type': 'Person',
            name: site.person,
            email: site.email,
            address: { '@type': 'PostalAddress', addressLocality: 'Pune', addressCountry: 'IN' },
          },
        }}
      />

      <PageHeader
        breadcrumb="Contact"
        eyebrow="Start a conversation"
        title="Tell me about the promise you need to keep."
        copy="Describe the situation in a few lines: where it sits in the organisation, the decision in front of you and how urgent it is. That is enough for a first useful conversation."
      />

      <section className="py-16 lg:py-24">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <Reveal>
                <form onSubmit={handleSubmit} className="space-y-7">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelClass} htmlFor="name">
                        Your name
                      </label>
                      <input
                        id="name"
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Full name"
                        className={cn(fieldClass, 'mt-2.5')}
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="organisation">
                        Organisation
                      </label>
                      <input
                        id="organisation"
                        value={organisation}
                        onChange={(event) => setOrganisation(event.target.value)}
                        placeholder="Company or team"
                        className={cn(fieldClass, 'mt-2.5')}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="email">
                      Work email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@company.com"
                      className={cn(fieldClass, 'mt-2.5')}
                    />
                  </div>

                  <fieldset>
                    <legend className={labelClass}>What do you need?</legend>
                    <div className="mt-3.5 flex flex-wrap gap-2">
                      {needOptions.map((option) => {
                        const isActive = need === option
                        return (
                          <button
                            key={option}
                            type="button"
                            aria-pressed={isActive}
                            onClick={() => setNeed(option)}
                            className={cn(
                              'rounded-full border px-3.5 py-2 text-[0.82rem] transition-colors',
                              isActive
                                ? 'border-amber bg-amber/12 text-ink'
                                : 'border-line text-muted hover:border-plum hover:text-ink dark:hover:border-amber',
                            )}
                          >
                            {option}
                          </button>
                        )
                      })}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className={labelClass}>Timing</legend>
                    <div className="mt-3.5 grid gap-2 sm:grid-cols-2">
                      {timingOptions.map((option) => {
                        const isActive = timing === option
                        return (
                          <button
                            key={option}
                            type="button"
                            aria-pressed={isActive}
                            onClick={() => setTiming(option)}
                            className={cn(
                              'flex items-center gap-2.5 rounded-xl border px-4 py-3 text-left text-[0.88rem] transition-colors',
                              isActive
                                ? 'border-amber bg-amber/8 text-ink'
                                : 'border-line text-muted hover:border-plum hover:text-ink dark:hover:border-amber',
                            )}
                          >
                            <span
                              aria-hidden
                              className={cn(
                                'grid h-4 w-4 shrink-0 place-items-center rounded-full border',
                                isActive ? 'border-amber' : 'border-line',
                              )}
                            >
                              {isActive ? (
                                <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                              ) : null}
                            </span>
                            {option}
                          </button>
                        )
                      })}
                    </div>
                  </fieldset>

                  <div>
                    <label className={labelClass} htmlFor="context">
                      A few lines of context
                    </label>
                    <textarea
                      id="context"
                      rows={5}
                      value={context}
                      onChange={(event) => setContext(event.target.value)}
                      placeholder="What is happening, who is involved and what decision you need to make."
                      className={cn(fieldClass, 'mt-2.5 resize-y')}
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-4 border-t border-line pt-7">
                    <ActionButton type="submit" size="lg">
                      Prepare my email
                    </ActionButton>
                    {sent ? (
                      <p className="inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.1em] text-rag-green uppercase">
                        <Check size={14} aria-hidden />
                        Your email client should now be open
                      </p>
                    ) : null}
                  </div>

                  <p className="font-mono text-[0.68rem] leading-relaxed text-muted">
                    {disclaimers.form}
                  </p>
                </form>
              </Reveal>
            </div>

            {/* Aside */}
            <aside className="space-y-8 lg:col-span-5">
              <Reveal className="rounded-2xl border border-line bg-sunk p-7" delay={0.06}>
                <Eyebrow>What happens next</Eyebrow>
                <ul className="mt-5 space-y-3.5">
                  {expectations.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.95rem]">
                      <Check size={15} className="mt-1 shrink-0 text-amber" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="rounded-2xl border border-line bg-surface p-7" delay={0.12}>
                <Eyebrow>Direct</Eyebrow>
                <dl className="mt-5 space-y-4">
                  <div className="flex gap-3">
                    <Mail size={15} className="mt-1 shrink-0 text-amber" aria-hidden />
                    <div>
                      <dt className="sr-only">Email</dt>
                      <dd>
                        <a
                          href={`mailto:${site.email}`}
                          className="text-[0.95rem] break-all hover:text-amber"
                        >
                          {site.email}
                        </a>
                      </dd>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <ArrowUpRight size={15} className="mt-1 shrink-0 text-amber" aria-hidden />
                    <div>
                      <dt className="sr-only">LinkedIn</dt>
                      <dd>
                        <a
                          href={site.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[0.95rem] hover:text-amber"
                        >
                          LinkedIn profile
                        </a>
                      </dd>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <MapPin size={15} className="mt-1 shrink-0 text-amber" aria-hidden />
                    <div>
                      <dt className="sr-only">Based in</dt>
                      <dd className="text-[0.95rem]">{site.base}</dd>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock size={15} className="mt-1 shrink-0 text-amber" aria-hidden />
                    <div>
                      <dt className="sr-only">Reach</dt>
                      <dd className="text-[0.95rem] text-muted">{site.reach}</dd>
                    </div>
                  </div>
                </dl>
              </Reveal>

              <Reveal className="rounded-2xl border border-amber/30 bg-amber/8 p-7" delay={0.18}>
                <Eyebrow>Not ready to talk?</Eyebrow>
                <p className="mt-4 text-[0.95rem]">
                  Run the two-minute Delivery Health Check first. You will arrive at a call with a
                  Red/Amber/Green reading and the two signals worth discussing.
                </p>
                <Link
                  to={paths.healthCheck}
                  className="mt-5 inline-block font-mono text-[0.7rem] tracking-[0.12em] text-amber uppercase hover:underline"
                >
                  Start the health check →
                </Link>
              </Reveal>
            </aside>
          </div>
        </Container>
      </section>
    </>
  )
}
