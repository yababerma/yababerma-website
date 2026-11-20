import { apiGet } from '@/lib/server-api'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const a = await apiGet(`/authors/${slug}`)
  if (!a) return { title: 'Penulis' }
  return { title: `${a.name} — Penulis`, description: a.bio || `Profil dan tulisan ${a.name} di Yayasan Banua Berkah Mandiri.` }
}

export default function Layout({ children }) { return children }
