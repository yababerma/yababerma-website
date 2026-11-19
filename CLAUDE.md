# CLAUDE.md — yababerma.org

Panduan setup manusia ada di `README.md`. File ini untuk Claude, di komputer mana pun.

## Proyek
- Next.js 15 App Router, JavaScript biasa (tanpa TypeScript), Tailwind + shadcn/ui, MongoDB (driver resmi).
- Seluruh API ada di satu file: `app/api/[[...path]]/route.js`. Logika CMS dan validasi zod 4 ada di `lib/cms.js`.
- Konstanta situs dan nilai bawaan (kontak, rekening, WA) ada di `lib/site-data.js`. Kontak yang tampil
  publik bisa diubah admin lewat tab **Identitas & Kontak** (`settings/{id:'site_settings'}`).
- Tes: `npm test` (node:test + MongoDB tiruan di memori, `tests/cms-api.test.mjs`). Tambahkan tes di sana
  untuk setiap perilaku API baru.
- Teks yang tampil ke pengguna dan pesan error memakai Bahasa Indonesia.

## Deploy
- Repo **publik** `yababerma/yababerma-website`, branch `main`. Vercel (paket Hobby) auto-deploy setiap push.
- Jangan jadikan repo private tanpa upgrade Vercel Pro: di paket Hobby, deploy dari commit yang author-nya
  bukan pemilik akun Vercel akan diblokir.
- Pembayaran Midtrans sudah ada di kode, tapi tidak aktif sampai `MIDTRANS_SERVER_KEY` dan
  `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY` diisi. Ini ditunda sampai dokumen yayasan siap.

## Wajib sebelum setiap push
1. `npm audit` → 0 celah. Perbarui versi patch/minor; versi mayor perlu diuji dulu.
2. Review perubahan: data pribadi donatur tidak boleh bocor lewat endpoint publik, dan input publik
   tidak boleh masuk ke query/HTML mentah.
3. Tidak ada rahasia di file yang di-commit (`.env*`, `client_secret_*.json`, kunci, password).
   Repo ini publik.
4. `npm test` dan `npm run build` lulus.
5. Kalau pemilik sedang menahan pekerjaan, tanya dulu sebelum push.
