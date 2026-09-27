import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCalApi, type EmbedEvent } from '@calcom/embed-react'
import { site } from '@/data/site'
import { useTheme, type Theme } from '@/lib/theme'
import { paths } from '@/routes/paths'

const brandColor = '#f0b43c'

/** Theme and layout only — never send name, email, notes, or guests. */
export function embedBookingConfig(theme: Theme) {
  return {
    layout: 'month_view' as const,
    theme,
    name: '',
    email: '',
    notes: '',
    firstName: '',
    lastName: '',
  }
}

export function bookCallAttrs(theme: Theme) {
  return {
    href: site.cal.url,
    target: '_blank' as const,
    rel: 'noreferrer',
    'data-cal-namespace': site.cal.namespace,
    'data-cal-link': site.cal.link,
    'data-cal-config': JSON.stringify(embedBookingConfig(theme)),
  }
}

export function bookedSearch(data: {
  uid?: string
  title?: string
  startTime?: string
  endTime?: string
  videoCallUrl?: string
}) {
  const params = new URLSearchParams()
  if (data.uid) params.set('uid', data.uid)
  if (data.title) params.set('title', data.title)
  if (data.startTime) params.set('startTime', data.startTime)
  if (data.endTime) params.set('endTime', data.endTime)
  if (data.videoCallUrl) params.set('location', data.videoCallUrl)
  return params.toString()
}

/** Loads the Cal.com embed, keeps theme in sync, and returns booked visitors to the site. */
export function CalBoot() {
  const { theme } = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false

    void (async () => {
      const globalCal = window.Cal as { config?: { forwardQueryParams?: boolean } } | undefined
      if (globalCal) {
        globalCal.config = { ...globalCal.config, forwardQueryParams: false }
      }

      for (const namespace of [site.cal.namespace, 'contact']) {
        const cal = await getCalApi({ namespace })
        if (cancelled) return
        cal('ui', {
          theme,
          hideEventTypeDetails: true,
          layout: 'month_view',
          styles: { branding: { brandColor } },
        })
      }
    })()

    return () => {
      cancelled = true
    }
  }, [theme])

  useEffect(() => {
    let cancelled = false
    const cleanups: Array<() => void> = []

    void (async () => {
      for (const namespace of [site.cal.namespace, 'contact']) {
        const cal = await getCalApi({ namespace })
        if (cancelled) return

        const callback = (event: EmbedEvent<'bookingSuccessfulV2'>) => {
          const search = bookedSearch(event.detail.data)
          navigate({ pathname: paths.booked, search: search ? `?${search}` : '' })
        }

        cal('on', { action: 'bookingSuccessfulV2', callback })
        cleanups.push(() => {
          cal('off', { action: 'bookingSuccessfulV2', callback })
        })
      }
    })()

    return () => {
      cancelled = true
      cleanups.forEach((fn) => fn())
    }
  }, [navigate])

  return null
}
