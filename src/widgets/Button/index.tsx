import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { trackEvent } from '@/lib/analytics'
import { bookCallAttrs } from '@/lib/cal'
import { useTheme } from '@/lib/theme'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'outline' | 'ghost' | 'amber'

type BaseProps = {
  children: ReactNode
  variant?: Variant
  className?: string
  /** Renders the arrow that slides on hover. */
  arrow?: boolean
  size?: 'md' | 'lg'
}

const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-full font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary:
    'btn-shine bg-[#1a1915] text-[#f6f4ef] hover:bg-[#2c2a24] hover:shadow-[0_10px_30px_-12px_rgba(26,25,21,0.45)] dark:bg-[#f3f1ea] dark:text-[#1a1915] dark:hover:bg-white',
  amber: 'bg-amber text-[#1a1915] hover:bg-[#e0a52c] hover:shadow-[0_10px_30px_-12px_rgba(240,180,60,0.65)]',
  outline: 'border border-line bg-surface text-ink hover:border-amber hover:text-amber',
  ghost: 'text-ink hover:text-amber',
}

const sizes = {
  md: 'px-5 py-2.5 text-[0.9rem]',
  lg: 'px-7 py-3.5 text-[0.95rem]',
}

function Inner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      <span>{children}</span>
      {arrow ? (
        <ArrowRight
          size={16}
          strokeWidth={2}
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      ) : null}
    </>
  )
}

type LinkButtonProps = BaseProps & { to: string; external?: boolean }

export function LinkButton({
  to,
  children,
  variant = 'primary',
  className,
  arrow = true,
  size = 'md',
  external = false,
}: LinkButtonProps) {
  const classes = cn(base, variants[variant], variant !== 'ghost' && sizes[size], className)

  if (external) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={classes}>
        <Inner arrow={arrow}>{children}</Inner>
      </a>
    )
  }

  return (
    <Link to={to} className={classes}>
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  )
}

type ActionButtonProps = BaseProps & {
  onClick?: () => void
  type?: 'button' | 'submit'
}

export function ActionButton({
  children,
  onClick,
  variant = 'primary',
  className,
  arrow = false,
  size = 'md',
  type = 'button',
}: ActionButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(base, variants[variant], variant !== 'ghost' && sizes[size], className)}
    >
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  )
}

/** Opens the Cal.com 30-minute booker in a modal. Falls back to cal.com if the embed is blocked. */
export function BookCallButton({
  children = 'Request a 30-minute call',
  variant = 'primary',
  className,
  arrow = true,
  size = 'md',
}: BaseProps) {
  const { theme } = useTheme()

  return (
    <a
      {...bookCallAttrs(theme)}
      onClick={() => trackEvent('request_call_click')}
      className={cn(base, variants[variant], variant !== 'ghost' && sizes[size], className)}
    >
      <Inner arrow={arrow}>{children}</Inner>
    </a>
  )
}
