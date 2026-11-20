import { ORG } from '@/lib/site-data'

export default function robots() {
  return {
    // /api/media/ holds the uploaded photos, which should stay indexable.
    rules: [{ userAgent: '*', allow: ['/', '/api/media/'], disallow: ['/admin', '/dashboard', '/api/'] }],
    sitemap: ORG.url + '/sitemap.xml',
  }
}
