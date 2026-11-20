import { apiGet } from '@/lib/server-api'
import { ORG } from '@/lib/site-data'
import JsonLd from '@/components/site/json-ld'
import ArticleView from './article-view'

const abs = (u) => (u && u.startsWith('/') ? ORG.url + u : u)

export async function generateMetadata({ params }) {
  const { slug } = await params
  const item = await apiGet(`/news/${slug}`)
  if (!item) return { title: 'Artikel Tidak Ditemukan', robots: { index: false } }
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: { type: 'article', title: item.title, description: item.excerpt, images: item.image ? [item.image] : undefined, publishedTime: item.publishedAt },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function NewsDetailPage({ params }) {
  const { slug } = await params
  const item = await apiGet(`/news/${slug}`)
  return (
    <>
      {item && (
        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: item.title,
          description: item.excerpt,
          image: item.image ? [abs(item.image)] : undefined,
          datePublished: item.publishedAt,
          author: { '@type': 'Person', name: item.author || ORG.name, ...(item.author_profile ? { url: `${ORG.url}/penulis/${item.author_profile.slug}` } : {}) },
          publisher: { '@id': ORG.url + '/#organisasi' },
          mainEntityOfPage: `${ORG.url}/news/${slug}`,
        }} />
      )}
      <ArticleView item={item} />
    </>
  )
}
