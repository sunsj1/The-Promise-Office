import { useEffect, useRef } from 'react'
import atlasCss from './atlas.css?inline'
import atlasData from './atlas.data'
import { atlasHtml } from './atlas.html'

/**
 * Mounts the interactive Atlas inside a shadow root, so its own styles stay
 * contained and never touch the rest of the site. The engine is loaded on
 * demand, so it only costs bytes on this page.
 */
export function AtlasEmbed() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    let destroy: (() => void) | undefined
    let cancelled = false

    const root = host.shadowRoot ?? host.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${atlasCss}</style>${atlasHtml}`

    void import('./atlas.engine').then(({ mountAtlas }) => {
      if (!cancelled) destroy = mountAtlas(host, atlasData)
    })

    return () => {
      cancelled = true
      destroy?.()
      root.innerHTML = ''
    }
  }, [])

  return <div ref={hostRef} className="block rounded-[1.4rem]" aria-label="Interactive map of 328 IT technologies" />
}
