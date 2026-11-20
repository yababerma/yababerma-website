import { ORG } from '@/lib/site-data'
import { apiGet } from '@/lib/server-api'

const STATIC = ['', '/panti-asuhan-banjarmasin', '/program', '/donasi', '/kurban', '/news', '/kegiatan', '/komunitas', '/pusat-layanan', '/tentang-kami', '/laporan', '/faq']

export default async function sitemap() {
  const [news, campaigns] = await Promise.all([apiGet('/news'), apiGet('/campaigns')])
  const entry = (path, date) => ({ url: ORG.url + path, ...(date ? { lastModified: new Date(date) } : {}) })
  const authors = new Set((news || []).map((n) => n.author_profile?.slug).filter(Boolean))
  return [
    ...STATIC.map((p) => entry(p)),
    ...(campaigns || []).map((c) => entry(`/donasi/${c.slug}`, c.updatedAt || c.publishedAt)),
    ...(news || []).map((n) => entry(`/news/${n.slug}`, n.updatedAt || n.publishedAt)),
    ...[...authors].map((s) => entry(`/penulis/${s}`)),
  ]
}
