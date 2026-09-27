import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { bookCallAttrs } from '@/lib/cal'
import { useTheme } from '@/lib/theme'
import { disclaimers, site } from '@/data/site'
import { navLinks, paths } from '@/routes/paths'
import { Container } from '@/widgets/Container'
import { Logo } from '@/widgets/Logo'

export function Footer() {
  const { theme } = useTheme()

  return (
    <footer className="border-t border-line bg-sunk">
      <Container size="wide" className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm text-[0.97rem] text-muted">
              {site.person} · {site.role}. Independent practice working with IT services firms, GCCs
              and enterprise leaders.
            </p>
            <a
              {...bookCallAttrs(theme)}
              className="group mt-7 inline-flex items-center gap-2 font-display text-xl text-ink transition-colors hover:text-amber"
            >
              Request a 30-minute call
              <ArrowUpRight
                size={18}
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          <nav className="lg:col-span-3" aria-label="Footer">
            <p className="font-mono text-[0.68rem] tracking-[0.16em] text-muted uppercase">Site</p>
            <ul className="mt-4 space-y-2.5 text-[0.95rem]">
              <li>
                <Link to={paths.home} className="text-muted transition-colors hover:text-amber">
                  Home
                </Link>
              </li>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-muted transition-colors hover:text-amber">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={paths.healthCheck}
                  className="text-muted transition-colors hover:text-amber"
                >
                  Delivery Health Check
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="font-mono text-[0.68rem] tracking-[0.16em] text-muted uppercase">
              Direct
            </p>
            <ul className="mt-4 space-y-3 text-[0.95rem]">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-amber"
                >
                  <Mail size={15} className="shrink-0 text-amber" aria-hidden />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-amber"
                >
                  <ArrowUpRight size={15} className="shrink-0 text-amber" aria-hidden />
                  LinkedIn profile
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-muted">
                <MapPin size={15} className="mt-1 shrink-0 text-amber" aria-hidden />
                <span>
                  {site.base}
                  <br />
                  <span className="text-[0.88rem]">{site.reach}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-7">
          <p className="max-w-4xl font-mono text-[0.68rem] leading-relaxed text-muted">
            {disclaimers.practice}
          </p>
          <p className="mt-4 font-mono text-[0.68rem] tracking-[0.1em] text-muted uppercase">
            © {new Date().getFullYear()} {site.brand} · {site.tagline}
          </p>
        </div>
      </Container>
    </footer>
  )
}
