import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CalBoot } from '@/lib/cal'
import { Footer } from '@/widgets/Footer'
import { Navbar } from '@/widgets/Navbar'
import { PageTransition } from '@/widgets/PageTransition'
import { ScrollProgressSeal } from '@/widgets/ScrollProgressSeal'

export function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    // The target route is very often a lazy-loaded chunk that hasn't mounted
    // yet on the first frame — a fixed-timeout retry can give up before it
    // ever appears. A MutationObserver has no such deadline: it just waits
    // for the element to exist, with a generous fallback only as a backstop.
    const id = hash.slice(1)
    let done = false
    let fallbackTimer: number

    const scrollToTarget = (target: Element) => {
      if (done) return
      done = true
      // Double rAF: let layout settle past any page-transition animation
      // frame before measuring the final position.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const top = target.getBoundingClientRect().top + window.scrollY
          window.scrollTo({ top, left: 0, behavior: 'auto' })
        })
      })
    }

    const existing = document.getElementById(id)
    if (existing) {
      scrollToTarget(existing)
      return
    }

    const observer = new MutationObserver(() => {
      const target = document.getElementById(id)
      if (target) {
        observer.disconnect()
        window.clearTimeout(fallbackTimer)
        scrollToTarget(target)
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })

    // Backstop: if the anchor genuinely never appears (bad link), don't hang
    // at whatever scroll position the browser happened to land on.
    fallbackTimer = window.setTimeout(() => {
      if (!done) {
        done = true
        observer.disconnect()
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }
    }, 4000)

    return () => {
      observer.disconnect()
      window.clearTimeout(fallbackTimer)
    }
  }, [pathname, hash])

  return (
    <div className="flex min-h-svh flex-col bg-paper">
      <CalBoot />
      <Navbar />
      <ScrollProgressSeal />
      <main id="main" className="flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}
