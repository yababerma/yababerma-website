'use client';

import { useQuery } from '@tanstack/react-query';
import { SITE_SETTINGS_DEFAULTS } from '@/lib/site-data';

// Identitas & kontak (alamat, telepon, email, WhatsApp narahubung, media sosial) diatur dari Panel Admin.
// Satu request dipakai bersama oleh semua komponen; nilai bawaan tampil sampai data dari server tiba.
export function useSiteSettings() {
  const { data } = useQuery({
    queryKey: ['site-settings'],
    queryFn: () => fetch('/api/site-settings').then((r) => (r.ok ? r.json() : {})),
  });
  return { ...SITE_SETTINGS_DEFAULTS, ...data };
}
