import { CalendarCheck, Clock, Mail, Video } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { site } from '@/data/site'
import { paths } from '@/routes/paths'
import { LinkButton } from '@/widgets/Button'
import { Container } from '@/widgets/Container'
import { Eyebrow } from '@/widgets/Eyebrow'
import { Seal } from '@/widgets/Seal'
import { Seo } from '@/widgets/Seo'

function firstParam(params: URLSearchParams, keys: string[]) {
  for (const key of keys) {
    const value = params.get(key)
    if (value) return value
  }
  return null
}

function formatWhen(iso: string | null) {
  if (!iso) return null
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date)
}

export function BookedPage() {
  const [params] = useSearchParams()
  const title = firstParam(params, ['title']) ?? '30-minute call'
  const when = formatWhen(firstParam(params, ['attendeeStartTime', 'startTime', 'hostStartTime']))
  const name = firstParam(params, ['attendeeName'])
  const email = firstParam(params, ['email'])
  const location = firstParam(params, ['location'])
  const host = firstParam(params, ['hostName']) ?? site.person

  return (
    <>
      <Seo
        title="Call booked"
        description="Your 30-minute call with Hrishikesh (Rishi) Salunkhe is confirmed."
        path={paths.booked}
        noindex
      />

      <section className="grid min-h-[80vh] place-items-center py-32">
        <Container>
          <div className="max-w-2xl">
            <Seal className="h-16 w-16" animate />
            <Eyebrow className="mt-9">Confirmed</Eyebrow>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[3.6rem] leading-[1.05]">
              The call is in the diary.
            </h1>
            <p className="mt-6 text-[1.0625rem] text-muted">
              You should receive a calendar invitation shortly. We will use the 30 minutes to
              understand the decision in front of you and whether I can help.
            </p>

            <dl className="mt-10 space-y-4 rounded-2xl border border-line bg-surface p-6 sm:p-7">
              <div className="flex gap-3">
                <CalendarCheck size={16} className="mt-1 shrink-0 text-amber" aria-hidden />
                <div>
                  <dt className="font-mono text-[0.66rem] tracking-[0.14em] text-muted uppercase">
                    Conversation
                  </dt>
                  <dd className="mt-1 text-[0.97rem]">{title}</dd>
                </div>
              </div>
              {when ? (
                <div className="flex gap-3">
                  <Clock size={16} className="mt-1 shrink-0 text-amber" aria-hidden />
                  <div>
                    <dt className="font-mono text-[0.66rem] tracking-[0.14em] text-muted uppercase">
                      When
                    </dt>
                    <dd className="mt-1 text-[0.97rem]">{when}</dd>
                  </div>
                </div>
              ) : null}
              <div className="flex gap-3">
                <Mail size={16} className="mt-1 shrink-0 text-amber" aria-hidden />
                <div>
                  <dt className="font-mono text-[0.66rem] tracking-[0.14em] text-muted uppercase">
                    With
                  </dt>
                  <dd className="mt-1 text-[0.97rem]">
                    {host}
                    {name ? ` · booked for ${name}` : null}
                    {email ? (
                      <span className="mt-0.5 block text-muted">{email}</span>
                    ) : null}
                  </dd>
                </div>
              </div>
              {location ? (
                <div className="flex gap-3">
                  <Video size={16} className="mt-1 shrink-0 text-amber" aria-hidden />
                  <div>
                    <dt className="font-mono text-[0.66rem] tracking-[0.14em] text-muted uppercase">
                      Join
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={location}
                        target="_blank"
                        rel="noreferrer"
                        className="break-all text-[0.97rem] text-amber hover:underline"
                      >
                        {location}
                      </a>
                    </dd>
                  </div>
                </div>
              ) : null}
            </dl>

            <div className="mt-9 flex flex-wrap gap-3">
              <LinkButton to={paths.home} size="lg">
                Back to the site
              </LinkButton>
              <LinkButton to={paths.healthCheck} variant="outline" size="lg">
                Run the health check
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
