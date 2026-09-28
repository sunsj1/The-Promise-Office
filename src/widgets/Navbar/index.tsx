import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navLinks, paths } from '@/routes/paths'
import { sealEase } from '@/animations/variants'
import { bookCallAttrs, useBookCallClick } from '@/lib/cal'
import { useTheme } from '@/lib/theme'
import { Logo } from '@/widgets/Logo'
import { ThemeToggle } from '@/widgets/ThemeToggle'
import { cn } from '@/lib/cn'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { theme } = useTheme()
  const bookCall = bookCallAttrs(theme)
  const handleBookCallClick = useBookCallClick(theme)

  useEffect(() => setOpen(false), [location.pathname])

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-amber focus:px-4 focus:py-2 focus:text-sm focus:text-[#1a1915]"
      >
        Skip to content
      </a>

      <div
        className={cn(
          'border-b transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
          scrolled || open
            ? 'border-line bg-paper/85 backdrop-blur-xl'
            : 'border-transparent bg-transparent',
        )}
      >
        <nav className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-7 lg:px-10">
          <Link to={paths.home} aria-label="The Promise Office, home">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    cn(
                      'relative rounded-full px-3.5 py-2 text-[0.9rem] transition-colors hover:text-amber',
                      isActive ? 'text-ink' : 'text-muted',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive ? (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-x-3 -bottom-0.5 h-px bg-amber"
                          transition={{ duration: 0.35, ease: sealEase }}
                        />
                      ) : null}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <Link
              to={paths.healthCheck}
              className="hidden rounded-full border border-line bg-surface px-4 py-2 text-[0.85rem] transition-colors hover:border-amber hover:text-amber md:inline-flex"
            >
              Health check
            </Link>
            <a
              {...bookCall}
              onClick={handleBookCallClick}
              className="group hidden items-center gap-1.5 rounded-full bg-[#1a1915] px-4 py-2 text-[0.85rem] text-[#f6f4ef] transition-colors hover:bg-[#2c2a24] sm:inline-flex dark:bg-[#f3f1ea] dark:text-[#1a1915] dark:hover:bg-white"
            >
              Request a call
              <ArrowUpRight
                size={14}
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface lg:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: sealEase }}
            className="h-[calc(100svh-4.5rem)] overflow-y-auto border-b border-line bg-paper lg:hidden"
          >
            <ul className="flex flex-col px-5 py-6 sm:px-7">
              {navLinks.map((link) => (
                <li key={link.href} className="border-b border-line">
                  <NavLink to={link.href} className="block py-4 font-display text-3xl">
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li className="border-b border-line">
                <NavLink to={paths.healthCheck} className="block py-4 font-display text-3xl text-amber">
                  Health check
                </NavLink>
              </li>
            </ul>
            <div className="px-5 pb-10 sm:px-7">
              <a
                {...bookCall}
                onClick={handleBookCallClick}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1a1915] px-6 py-3.5 text-[#f6f4ef] dark:bg-[#f3f1ea] dark:text-[#1a1915]"
              >
                Request a 30-minute call
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
