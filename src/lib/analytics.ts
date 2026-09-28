/**
 * Minimal GA4 wrapper. No-ops entirely until VITE_GA_MEASUREMENT_ID is set
 * (e.g. in Vercel project env vars), so nothing loads or tracks by default.
 */
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined

let scriptLoaded = false

function ensureLoaded() {
  if (scriptLoaded || !GA_ID || typeof window === 'undefined') return
  scriptLoaded = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID, { send_page_view: false })
}

/** Call on every route change. */
export function trackPageview(path: string) {
  if (!GA_ID) return
  ensureLoaded()
  window.gtag?.('event', 'page_view', { page_path: path })
}

/** Call for key conversion actions (book a call, start the health check, etc). */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (!GA_ID) return
  ensureLoaded()
  window.gtag?.('event', name, params)
}
