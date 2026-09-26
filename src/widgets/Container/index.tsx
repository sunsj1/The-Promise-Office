import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ContainerProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  /** `wide` relaxes the measure for full-bleed grids. */
  size?: 'default' | 'wide' | 'prose'
}

const sizes = {
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
  prose: 'max-w-3xl',
}

export function Container({ children, className, as: Tag = 'div', size = 'default' }: ContainerProps) {
  return <Tag className={cn('mx-auto w-full px-5 sm:px-7 lg:px-10', sizes[size], className)}>{children}</Tag>
}
