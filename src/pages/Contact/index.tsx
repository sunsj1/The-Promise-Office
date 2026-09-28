import Cal from '@calcom/embed-react'
import { ArrowUpRight, Check, Clock, Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { disclaimers, site } from '@/data/site'
import { embedBookingConfig } from '@/lib/cal'
import { useTheme } from '@/lib/theme'
import { paths } from '@/routes/paths'
import { Container } from '@/widgets/Container'
import { Eyebrow } from '@/widgets/Eyebrow'
import { PageHeader } from '@/widgets/PageHeader'
import { Reveal } from '@/widgets/Reveal'
import { Seo } from '@/widgets/Seo'

const expectations = [
  'A 30-minute call to understand the decision you face.',
  'A calendar invite as soon as you book.',
  'An honest answer on whether I can help, and what a useful first step is.',
]

export function ContactPage() {
  const { theme } = useTheme()

  return (
    <>
      <Seo
        title="Contact"
        description="Book a 30-minute call with Hrishikesh (Rishi) Salunkhe to discuss a delivery, transformation or managed services mandate."
        path={paths.contact}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact — The Promise Office',
          mainEntity: {
            '@type': 'Person',
            name: site.person,
            email: site.email,
            url: site.cal.url,
            address: { '@type': 'PostalAddress', addressLocality: 'Pune', addressCountry: 'IN' },
          },
        }}
      />

      <PageHeader
        breadcrumb="Contact"
        eyebrow="Start a conversation"
        title="Book a 30-minute call."
        copy="Pick a time that works. We will use it to understand the decision in front of you, whether I can help, and what a useful first step looks like."
      />

      <section className="py-16 lg:py-24">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="min-h-[45rem] overflow-hidden rounded-2xl border border-line bg-surface">
                  <Cal
                    namespace="contact"
                    calLink={site.cal.link}
                    config={embedBookingConfig(theme)}
                    style={{ width: '100%', height: '45rem', overflow: 'auto' }}
                  />
                </div>
                <p className="mt-4 font-mono text-[0.68rem] leading-relaxed text-muted">
                  Booking is handled by Cal.com. If the calendar does not load,{' '}
                  <a href={site.cal.url} target="_blank" rel="noreferrer" className="text-amber hover:underline">
                    open it in a new tab
                  </a>
                  .
                </p>
              </Reveal>
            </div>

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

              <p className="font-mono text-[0.68rem] leading-relaxed text-muted">
                {disclaimers.practice}
              </p>
            </aside>
          </div>
        </Container>
      </section>
    </>
  )
}
