import Link from 'next/link';
import { apiGet } from '@/lib/server-api';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import CampaignDetailView from '@/components/site/campaign-detail';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = await apiGet(`/campaigns/${slug}`);
  if (!c) return { title: 'Program Tidak Ditemukan', robots: { index: false } };
  return {
    title: c.title,
    description: c.short_desc,
    openGraph: { title: c.title, description: c.short_desc, images: c.image ? [c.image] : undefined },
    twitter: { card: 'summary_large_image' },
  };
}

// Fetched on the server so the program's story is in the HTML for search engines.
export default async function CampaignDetailPage({ params }) {
  const { slug } = await params;
  const c = await apiGet(`/campaigns/${slug}`);

  if (!c) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-2xl font-bold text-brand-ink">Program tidak ditemukan</h1>
        <Link href="/donasi"><Button className="mt-6 rounded-xl">Kembali ke Katalog Donasi</Button></Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-slatebg/40">
      <div className="container py-8 md:py-12">
        <Link href="/donasi" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-green mb-6">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog
        </Link>
        <CampaignDetailView c={c} />
      </div>
    </div>
  );
}
