import type { ReactNode } from 'react'
import { Eyebrow } from '@/widgets/Eyebrow'
import { Reveal } from '@/widgets/Reveal'
import { cn } from '@/lib/cn'

type SectionHeaderProps = {
  eyebrow: string
  title: ReactNode
  copy?: ReactNode
  as?: 'h1' | 'h2'
  align?: 'left' | 'center'
  className?: string
  children?: ReactNode
}

export function SectionHeader({
  eyebrow,
  title,
  copy,
  as: Heading = 'h2',
  align = 'left',
  className,
  children,
}: SectionHeaderProps) {
  const centered = align === 'center'

  return (
    <Reveal className={cn(centered && 'flex flex-col items-center text-center', className)}>
      <Eyebrow rule={!centered}>{eyebrow}</Eyebrow>
      <Heading
        className={cn(
          'mt-5 text-3xl sm:text-4xl lg:text-[3.1rem]',
          centered ? 'max-w-3xl' : 'max-w-4xl',
        )}
      >
        {title}
      </Heading>
      {copy ? (
        <p className={cn('mt-5 max-w-2xl text-base text-muted sm:text-[1.0625rem]')}>{copy}</p>
      ) : null}
      {children}
    </Reveal>
  )
}
