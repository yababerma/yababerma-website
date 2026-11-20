import Link from 'next/link'
import { MapPin, ShieldCheck, HeartHandshake, FileBarChart, MessageCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import JsonLd from '@/components/site/json-ld'
import { apiGet } from '@/lib/server-api'
import { ORG, LOCATIONS, SITE_SETTINGS_DEFAULTS, waLink } from '@/lib/site-data'

export const metadata = {
  title: 'Panti Asuhan di Banjarmasin — Panti Asuhan Banua Berkah',
  description: 'Panti Asuhan Banua Berkah di Banjarmasin Tengah: panti asuhan anak yatim dan dhuafa putra, putri, dan balita. Lihat alamat, legalitas, dan cara berdonasi atau berkunjung.',
}

const FAQ = [
  {
    q: 'Di mana alamat Panti Asuhan Banua Berkah di Banjarmasin?',
    a: `Panti Asuhan Banua Berkah memiliki ${LOCATIONS.length} lokasi di Kota Banjarmasin. Panti putra sekaligus sekretariat yayasan berada di ${LOCATIONS[0].address}. Panti putri berada di ${LOCATIONS[1].address}.`,
  },
  {
    q: 'Siapa yang mengelola Panti Asuhan Banua Berkah?',
    a: `Panti ini dikelola oleh ${ORG.name} (${ORG.short}), yayasan berbadan hukum yang berdiri sejak ${ORG.founded} dengan pengesahan Kemenkumham nomor ${ORG.ahu}.`,
  },
  {
    q: 'Bagaimana cara berdonasi ke panti asuhan ini?',
    a: `Donasi dapat disalurkan secara online lewat halaman Donasi di situs ini, atau transfer ke rekening atas nama ${ORG.name.toUpperCase()}. Setelah transfer, kirim konfirmasi lewat halaman Pusat Layanan atau WhatsApp admin.`,
  },
  {
    q: 'Apakah saya bisa berkunjung atau mengantar donasi barang langsung ke panti?',
    a: 'Bisa. Mohon hubungi admin lewat WhatsApp terlebih dahulu agar waktu kunjungan dapat disesuaikan dengan jadwal belajar dan kegiatan anak-anak.',
  },
  {
    q: 'Apakah penggunaan donasi dilaporkan?',
    a: 'Ya. Penghimpunan dan penyaluran dana ditampilkan terbuka di halaman Laporan Publik.',
  },
]

export default async function PantiAsuhanBanjarmasinPage() {
  // Contact comes from the admin panel (Identitas & Kontak); the defaults cover a missing database.
  const s = (await apiGet('/site-settings')) || SITE_SETTINGS_DEFAULTS
  const wa = waLink(s.whatsapp, 'Assalamu’alaikum, saya ingin bertanya tentang kunjungan/donasi ke Panti Asuhan Banua Berkah.')

  return (
    <div className="bg-brand-slatebg/40">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      }} />

      <section className="bg-white border-b border-border">
        <div className="container py-12 md:py-16">
          <p className="text-sm font-semibold text-brand-green uppercase tracking-wider">Panti Asuhan Banua Berkah</p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-brand-ink max-w-3xl leading-tight mt-2">Panti Asuhan di Banjarmasin untuk Anak Yatim &amp; Dhuafa</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            Panti Asuhan Banua Berkah adalah panti asuhan anak di Kota Banjarmasin, Kalimantan Selatan, yang dikelola {ORG.name} sejak {ORG.founded}.
            Kami mengasuh anak yatim dan dhuafa di {LOCATIONS.length} lokasi: panti putra, panti putri, dan panti putri &amp; balita.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/donasi/operasional-panti-asuhan-banua-berkah"><Button className="rounded-xl bg-brand-green hover:bg-brand-green/90 h-11 px-6"><HeartHandshake className="w-4 h-4 mr-2" />Donasi untuk Anak Panti</Button></Link>
            <a href={wa} target="_blank" rel="noopener noreferrer"><Button variant="outline" className="rounded-xl h-11 px-6"><MessageCircle className="w-4 h-4 mr-2" />Hubungi via WhatsApp</Button></a>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-brand-ink">Lokasi Panti Asuhan Terdekat di Banjarmasin</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl">Ketiga panti berada di Kota Banjarmasin. Buka petanya untuk melihat rute dari lokasi Anda.</p>
        <div className="grid md:grid-cols-3 gap-5 mt-6">
          {LOCATIONS.map((l) => (
            <Card key={l.name} className="p-6 rounded-2xl border-0 shadow-sm bg-white flex flex-col">
              <h3 className="font-bold text-brand-ink">{l.name}</h3>
              <p className="text-xs text-brand-green font-semibold mt-1">{l.role}</p>
              <p className="text-sm text-muted-foreground mt-3 flex gap-2 flex-1"><MapPin className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />{l.address}</p>
              <a href={l.maps} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand-green hover:underline mt-4">Buka di Google Maps</a>
            </Card>
          ))}
        </div>
      </section>

      <section className="container pb-12">
        <div className="grid md:grid-cols-2 gap-5">
          <Card className="p-6 rounded-2xl border-0 shadow-sm bg-white">
            <ShieldCheck className="w-8 h-8 text-brand-blue" />
            <h2 className="text-xl font-bold text-brand-ink mt-3">Panti Asuhan Resmi &amp; Terpercaya</h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {ORG.name} berbadan hukum dengan pengesahan Kemenkumham nomor <span className="font-semibold text-brand-ink">{s.ahu}</span>.
              Rekening donasi atas nama yayasan, bukan perorangan.
            </p>
            <Link href="/tentang-kami" className="text-sm font-semibold text-brand-green hover:underline mt-3 inline-block">Profil &amp; pengurus yayasan</Link>
          </Card>
          <Card className="p-6 rounded-2xl border-0 shadow-sm bg-white">
            <FileBarChart className="w-8 h-8 text-brand-green" />
            <h2 className="text-xl font-bold text-brand-ink mt-3">Laporan Terbuka</h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Penghimpunan dan penyaluran dana dapat dilihat siapa saja, dan kegiatan anak asuh didokumentasikan secara rutin.</p>
            <div className="flex gap-4 mt-3">
              <Link href="/laporan" className="text-sm font-semibold text-brand-green hover:underline">Laporan publik</Link>
              <Link href="/kegiatan" className="text-sm font-semibold text-brand-green hover:underline">Dokumentasi kegiatan</Link>
            </div>
          </Card>
        </div>
      </section>

      <section className="container pb-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-brand-ink">Pertanyaan tentang Panti Asuhan Banua Berkah</h2>
        <div className="mt-6 space-y-4 max-w-3xl">
          {FAQ.map((f) => (
            <Card key={f.q} className="p-6 rounded-2xl border-0 shadow-sm bg-white">
              <h3 className="font-bold text-brand-ink">{f.q}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.a}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
