import { site } from '@/data/site'
import { paths } from '@/routes/paths'
import { Container } from '@/widgets/Container'
import { PageHeader } from '@/widgets/PageHeader'
import { Reveal } from '@/widgets/Reveal'
import { Seo } from '@/widgets/Seo'

export function PrivacyPage() {
  return (
    <>
      <Seo
        title="Privacy"
        description="What The Promise Office collects when you book a call or browse this site, and how it is handled."
        path={paths.privacy}
        breadcrumb="Privacy"
      />

      <PageHeader
        breadcrumb="Privacy"
        eyebrow="Legal"
        title="Privacy notice."
        copy="Kept short and specific to what is actually collected."
      />

      <section className="py-16 lg:py-20">
        <Container size="prose">
          <Reveal className="space-y-8 text-[1.0125rem] leading-relaxed">
            <div>
              <h2 className="font-display text-xl">Booking a call</h2>
              <p className="mt-3 text-muted">
                Booking a call uses Cal.com, a third-party scheduling service. When you book, Cal.com
                collects your name, email address and any notes you add, and shares booking details
                (time, name, email) with {site.person} to prepare for and hold the call. Cal.com’s own
                privacy policy governs how it handles that data.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl">Contact and email</h2>
              <p className="mt-3 text-muted">
                Where this site prepares an email for you to send, nothing is stored or submitted by
                the site itself — your email client sends it directly to {site.email}.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl">Analytics</h2>
              <p className="mt-3 text-muted">
                This site can use privacy-respecting, aggregate analytics (page views and a small set
                of named events, such as a booking being completed) to understand which pages are
                useful. No sensitive form content is tracked. Analytics stays off entirely unless a
                measurement ID has been configured; no non-essential cookies are set otherwise, which
                is why this site does not show a cookie banner.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl">The Delivery Health Check tool</h2>
              <p className="mt-3 text-muted">
                Your answers to the interactive health check are processed in your browser only. They
                are not stored or submitted anywhere by this site.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl">Contact point</h2>
              <p className="mt-3 text-muted">
                Questions about this notice can be sent to {site.email}.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
