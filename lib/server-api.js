// Server-side read of this site's own public API, so pages can put real content in their HTML
// (search engines and AI crawlers do not run the client-side fetches).
import { cache } from 'react'
import { headers } from 'next/headers'

// cache(): generateMetadata and the page share one request per path.
export const apiGet = cache(async (path) => {
  try {
    const h = await headers()
    const origin = `${h.get('x-forwarded-proto') || 'http'}://${h.get('host')}`
    const res = await fetch(`${origin}/api${path}`, { cache: 'no-store' })
    return res.ok ? await res.json() : null
  } catch {
    return null
  }
})
