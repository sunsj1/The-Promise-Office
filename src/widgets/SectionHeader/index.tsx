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
      <div
        className={cn(
          !centered && copy && 'lg:mt-5 lg:grid lg:grid-cols-12 lg:items-end lg:gap-12',
        )}
      >
        <Heading
          className={cn(
            'mt-5 text-3xl sm:text-4xl lg:text-[3.1rem]',
            centered ? 'max-w-3xl' : copy ? 'max-w-4xl lg:col-span-7 lg:mt-0' : 'max-w-4xl',
          )}
        >
          {title}
        </Heading>
        {copy ? (
          <p
            className={cn(
              'mt-5 max-w-2xl text-base text-muted sm:text-[1.0625rem]',
              !centered && 'lg:col-span-5 lg:mt-0 lg:border-l lg:border-line lg:pl-8',
            )}
          >
            {copy}
          </p>
        ) : null}
      </div>
      {children}
    </Reveal>
  )
}
