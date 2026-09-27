import { site } from '@/data/site'
import portrait from '@/assets/Firefly_RemoveBackground.png'
import { cn } from '@/lib/cn'

type PortraitProps = {
  className?: string
  /** `hero` is the large home treatment; `page` is the tighter About crop. */
  size?: 'hero' | 'page'
}

export function Portrait({ className, size = 'hero' }: PortraitProps) {
  return (
    <figure className={cn('relative mx-auto w-full', className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-4%] left-1/2 aspect-square w-[88%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_42%,rgba(240,180,60,0.32),rgba(240,180,60,0.08)_42%,transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_42%,rgba(240,180,60,0.22),rgba(240,180,60,0.05)_48%,transparent_72%)]"
      />

      <div className={cn('relative z-10 mx-auto w-[86%]', size === 'page' && 'w-[84%]')}>
        <img
          src={portrait}
          alt={site.person}
          width={912}
          height={860}
          className="h-auto w-full"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[44%] bg-gradient-to-t from-white from-[8%] via-white/75 to-transparent dark:from-[#12110e] dark:from-[8%] dark:via-[#12110e]/80 dark:to-transparent"
        />
      </div>
      <figcaption className="sr-only">
        {site.person}, {site.role}
      </figcaption>
    </figure>
  )
}
