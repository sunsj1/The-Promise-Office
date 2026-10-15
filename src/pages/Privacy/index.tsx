import { site } from '@/data/site'
import { paths } from '@/routes/paths'
import { LegalLayout } from '@/widgets/LegalLayout'
import { PageHeader } from '@/widgets/PageHeader'
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
        graphic={null}
        breadcrumb="Privacy"
        eyebrow="Legal"
        title="Privacy notice."
        copy="Kept short and specific to what is actually collected."
      />

      <LegalLayout
        other="terms"
        sections={[
          {
            id: 'booking-a-call',
            title: 'Booking a call',
            body: (
              <>
                Booking a call uses Cal.com, a third-party scheduling service. When you book,
                Cal.com collects your name, email address and any notes you add, and shares booking
                details (time, name, email) with {site.brand} (founded by {site.person}) to prepare
                for and hold the call. Cal.com’s own privacy policy governs how it handles that
                data.
              </>
            ),
          },
          {
            id: 'contact-and-email',
            title: 'Contact and email',
            body: (
              <>
                Where this site prepares an email for you to send, nothing is stored or submitted by
                the site itself — your email client sends it directly to {site.email}.
              </>
            ),
          },
          {
            id: 'analytics',
            title: 'Analytics',
            body: (
              <>
                This site can use privacy-respecting, aggregate analytics (page views and a small
                set of named events, such as a booking being completed) to understand which pages
                are useful. No sensitive form content is tracked. Analytics stays off entirely
                unless a measurement ID has been configured; no non-essential cookies are set
                otherwise, which is why this site does not show a cookie banner.
              </>
            ),
          },
          {
            id: 'the-delivery-health-check-tool',
            title: 'The Delivery Health Check tool',
            body: (
              <>
                Your answers to the interactive health check are processed in your browser only.
                They are not stored or submitted anywhere by this site.
              </>
            ),
          },
          {
            id: 'contact-point',
            title: 'Contact point',
            body: <>Questions about this notice can be sent to {site.email}.</>,
          },
        ]}
      />
    </>
  )
}
