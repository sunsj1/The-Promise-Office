import { ArrowUpRight, Mail, MapPin, SquarePlay } from 'lucide-react'
import { Link } from 'react-router-dom'
import { bookCallAttrs } from '@/lib/cal'
import { useTheme } from '@/lib/theme'
import { site } from '@/data/site'
import { navLinks, paths } from '@/routes/paths'
import { Container } from '@/widgets/Container'
import { Logo } from '@/widgets/Logo'

const linkClass = 'transition-colors hover:text-amber'

export function Footer() {
  const { theme } = useTheme()

  return (
    <footer className="border-t border-line bg-sunk">
      <Container size="wide" className="py-9 lg:py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-3 text-[0.9rem] text-muted">
              Independent advisory for IT services firms, GCCs and enterprise leaders.
            </p>
          </div>
          <a
            {...bookCallAttrs(theme)}
            className="group inline-flex items-center gap-2 self-start font-display text-xl text-ink transition-colors hover:text-amber lg:self-auto"
          >
            Request a 30-minute call
            <ArrowUpRight
              size={18}
              aria-hidden
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-line pt-6 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[0.9rem]">
              <li>
                <Link to={paths.home} className={linkClass}>
                  Home
                </Link>
              </li>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to={paths.healthCheck} className={linkClass}>
                  Delivery Health Check
                </Link>
              </li>
              <li>
                <Link to={paths.contact} className={linkClass}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.88rem] text-muted">
            <li>
              <a
                href={`mailto:${site.email}`}
                className={`inline-flex items-center gap-1.5 ${linkClass}`}
              >
                <Mail size={14} aria-hidden />
                Email
              </a>
            </li>
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 ${linkClass}`}
              >
                <ArrowUpRight size={14} aria-hidden />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={site.youtube}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 ${linkClass}`}
              >
                <SquarePlay size={14} aria-hidden />
                YouTube
              </a>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <MapPin size={14} aria-hidden />
              {site.base}
            </li>
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-line pt-5 text-center font-mono text-[0.68rem] tracking-[0.12em] text-muted uppercase">
          <span>
            © {new Date().getFullYear()} {site.brand} · Founded by Hrishikesh Salunkhe · {site.base}
          </span>
          <span className="flex gap-4">
            <Link to={paths.privacy} className={linkClass}>
              Privacy
            </Link>
            <Link to={paths.terms} className={linkClass}>
              Terms
            </Link>
          </span>
        </div>
      </Container>
    </footer>
  )
}
