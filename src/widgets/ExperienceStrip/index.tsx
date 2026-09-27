import type { Organisation } from '@/data/site'

/** Restrained, static "Experience includes" row — no continuous motion. */
export function ExperienceStrip({ items }: { items: readonly Organisation[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-8 gap-y-5">
      {items.map((item) =>
        item.src ? (
          <li key={item.name} className="grid h-10 place-items-center">
            <img
              src={item.src}
              alt={item.name}
              height={28}
              className="h-7 w-auto max-w-[8rem] object-contain opacity-80 grayscale transition-opacity hover:opacity-100"
            />
          </li>
        ) : (
          <li
            key={item.name}
            className="font-display text-base text-muted transition-colors hover:text-ink"
          >
            {item.name}
          </li>
        ),
      )}
    </ul>
  )
}
