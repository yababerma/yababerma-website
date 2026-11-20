import './globals.css'
import { Providers } from './providers'
import Navbar from '@/components/site/navbar'
import Footer from '@/components/site/footer'
import FloatingWa from '@/components/site/floating-wa'
import { Toaster } from '@/components/ui/sonner'
import JsonLd from '@/components/site/json-ld'
import { ORG, LOCATIONS, SOCIALS, WHATSAPP_ADMIN } from '@/lib/site-data'

const DESCRIPTION = 'Panti Asuhan Banua Berkah di Banjarmasin, dikelola Yayasan Banua Berkah Mandiri (YABABERMA). Mengasuh anak yatim dan dhuafa, menerima zakat, wakaf, sedekah, dan kurban secara amanah.'

export const metadata = {
  metadataBase: new URL(ORG.url),
  title: {
    default: 'Panti Asuhan Banua Berkah Banjarmasin | Yayasan Banua Berkah Mandiri',
    template: '%s | YABABERMA',
  },
  description: DESCRIPTION,
  // "./" resolves against each page's own path, so every page gets its own canonical URL.
  alternates: { canonical: './' },
  openGraph: { type: 'website', siteName: ORG.name, locale: 'id_ID', images: ['/logo.png'] },
  twitter: { card: 'summary' },
  icons: {
    icon: '/logo.png',
  },
}

const place = (l) => ({
  '@type': 'Place', name: l.name, hasMap: l.maps,
  address: { '@type': 'PostalAddress', streetAddress: l.address, addressLocality: 'Banjarmasin', addressRegion: 'Kalimantan Selatan', addressCountry: 'ID' },
})
const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  '@id': ORG.url + '/#organisasi',
  name: ORG.name,
  alternateName: [ORG.short, 'Panti Asuhan Banua Berkah'],
  url: ORG.url,
  logo: ORG.url + ORG.logo,
  description: DESCRIPTION,
  foundingDate: String(ORG.founded),
  email: ORG.email,
  telephone: '+' + WHATSAPP_ADMIN,
  address: place(LOCATIONS[0]).address,
  location: LOCATIONS.map(place),
  areaServed: 'Banjarmasin, Kalimantan Selatan',
  sameAs: Object.values(SOCIALS),
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body>
        <JsonLd data={ORG_JSONLD} />
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <FloatingWa />
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  )
}
