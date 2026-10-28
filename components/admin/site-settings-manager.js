'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save, Building2, Share2 } from 'lucide-react';
import { SITE_SETTINGS_DEFAULTS } from '@/lib/site-data';
import { DbBanner, adminFetch } from '@/components/admin/cms-common';

const CONTACT_FIELDS = [
  ['address', 'Alamat Kantor', 'Tampil di footer, Pusat Layanan & kuitansi', 'textarea'],
  ['phone', 'Nomor Telepon (yang ditampilkan)', 'mis. 0858-2811-2032'],
  ['email', 'Email', 'mis. info@yababerma.org'],
  ['whatsapp', 'Nomor WhatsApp Narahubung', 'Dipakai semua tombol WhatsApp di website, mis. 085828112032'],
  ['wa_message', 'Pesan Awal Tombol WhatsApp', 'Teks otomatis saat pengunjung menekan tombol WA melayang & footer', 'textarea'],
  ['about', 'Deskripsi Singkat di Footer', 'Kalimat di bawah logo pada footer', 'textarea'],
  ['ahu', 'Nomor Akta Kemenkumham (AHU)', 'Tampil di footer, Tentang Kami & Laporan'],
];
const SOCIAL_FIELDS = [
  ['instagram', 'Instagram YABABERMA'],
  ['instagram_panti', 'Instagram Panti Asuhan'],
  ['tiktok', 'TikTok'],
  ['youtube', 'YouTube'],
  ['facebook', 'Facebook'],
];

export default function SiteSettingsManager({ adminKey }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(SITE_SETTINGS_DEFAULTS);
  const [db, setDb] = useState(null); // false => demo mode (read-only)
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState([]);
  const readOnly = db === false;

  const load = useCallback(async () => {
    try {
      const r = await adminFetch('/api/admin/site-settings', adminKey);
      if (!r.ok) toast.error(r.data.error || 'Gagal memuat pengaturan');
      const { db: hasDb, ...values } = r.data || {};
      setForm({ ...SITE_SETTINGS_DEFAULTS, ...values });
      setDb(hasDb !== false);
    } finally { setLoading(false); }
  }, [adminKey]);

  useEffect(() => { load(); }, [load]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    setSaving(true);
    const r = await adminFetch('/api/admin/site-settings', adminKey, { method: 'POST', body: form });
    setSaving(false);
    setErrors(r.data?.fields || []);
    if (!r.ok) { toast.error(r.data?.error || 'Gagal menyimpan'); return; }
    queryClient.invalidateQueries({ queryKey: ['site-settings'] });
    toast.success('Identitas & kontak tersimpan. Website publik sudah diperbarui.');
  };

  if (loading) return <Card className="rounded-2xl p-10 border-border bg-white flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-brand-green" /></Card>;

  const field = ([k, label, hint, type]) => (
    <div key={k}>
      <Label className="text-sm font-semibold">{label}</Label>
      {type === 'textarea'
        ? <Textarea value={form[k]} onChange={(e) => set(k, e.target.value)} rows={2} disabled={readOnly} className={`rounded-xl mt-1 text-sm ${errors.includes(k) ? 'border-red-500' : ''}`} />
        : <Input value={form[k]} onChange={(e) => set(k, e.target.value)} disabled={readOnly} className={`rounded-xl mt-1 ${errors.includes(k) ? 'border-red-500' : ''}`} />}
      {hint && <p className="text-[11px] text-muted-foreground mt-1">{hint}</p>}
    </div>
  );

  return (
    <div className="space-y-4">
      <DbBanner db={db} />
      <Card className="rounded-2xl border-border bg-white p-6 space-y-5">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-brand-greenlight text-brand-green flex items-center justify-center shrink-0"><Building2 className="w-6 h-6" /></div>
          <div>
            <h3 className="font-heading font-bold text-lg text-brand-ink">Identitas &amp; Kontak</h3>
            <p className="text-sm text-muted-foreground">Alamat, telepon, email dan WhatsApp yang tampil di footer dan seluruh halaman website.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">{CONTACT_FIELDS.map(field)}</div>
      </Card>

      <Card className="rounded-2xl border-border bg-white p-6 space-y-5">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-brand-bluelight text-brand-blue flex items-center justify-center shrink-0"><Share2 className="w-6 h-6" /></div>
          <div>
            <h3 className="font-heading font-bold text-lg text-brand-ink">Media Sosial</h3>
            <p className="text-sm text-muted-foreground">Link ikon di footer. Kosongkan untuk menyembunyikan ikonnya.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">{SOCIAL_FIELDS.map(([k, label]) => field([k, label, 'Diawali https://']))}</div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={save} disabled={saving || readOnly} className="rounded-xl">{saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}Simpan Perubahan</Button>
      </div>
    </div>
  );
}
