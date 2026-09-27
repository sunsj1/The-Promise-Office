import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CalBoot } from '@/lib/cal'
import { Footer } from '@/widgets/Footer'
import { Navbar } from '@/widgets/Navbar'
import { PageTransition } from '@/widgets/PageTransition'
import { ScrollProgressSeal } from '@/widgets/ScrollProgressSeal'

export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

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
