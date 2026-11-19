# Website Yayasan Banua Berkah Mandiri (yababerma.org)

Next.js 15 (App Router, JavaScript) + MongoDB Atlas, di-deploy ke Vercel. Setiap push ke `main` di
[github.com/yababerma/yababerma-website](https://github.com/yababerma/yababerma-website) otomatis
tayang di www.yababerma.org.

## Menjalankan di komputer baru (Windows / Mac)

### 1. Pasang sekali saja
- **Git**: https://git-scm.com/download/win (pilihan bawaan saat instalasi sudah cukup).
- **Node.js 24 LTS**: https://nodejs.org (sudah termasuk `npm`).
- **Editor**: VS Code, atau aplikasi Claude desktop / Claude Code untuk bekerja dengan Claude.

Cek di PowerShell:

```powershell
git --version
node -v
```

### 2. Identitas Git dan clone
Pakai nama dan email yang sama dengan di komputer lama (cek di sana dengan `git config user.email`)
agar riwayat commit tetap rapi:

```powershell
git config --global user.name "Nama Anda"
git config --global user.email "email-anda@contoh.com"
git clone https://github.com/yababerma/yababerma-website.git
cd yababerma-website
npm install
```

Saat push pertama, Git akan membuka jendela login GitHub. Masuk dengan akun yang punya akses tulis
ke repo ini.

### 3. Isi `.env` (jangan pernah di-commit)
Salin template lalu isi nilainya:

```powershell
Copy-Item .env.example .env
```

Ambil nilainya dari Vercel → project **yababerma-website** → Settings → Environment Variables.
Bisa juga otomatis:

```powershell
npx vercel login
npx vercel link
npx vercel env pull .env
```

Catatan:
- **`MONGO_URL` mengarah ke database live.** Data yang diubah di panel admin lokal ikut berubah di
  website. Kosongkan `MONGO_URL` kalau hanya ingin melihat tampilan (mode demo, tidak bisa menyimpan).
- Kalau koneksi MongoDB ditolak, tambahkan IP laptop di MongoDB Atlas → Network Access.
- `.env`, file `client_secret_*.json`, dan folder `docs/` tidak ada di GitHub. Pindahkan lewat password
  manager atau Google Drive pribadi, jangan lewat repo atau chat.

### 4. Perintah sehari-hari

```powershell
npm run dev      # http://localhost:3000 (panel admin: /admin)
npm test         # tes API & CMS (tanpa database sungguhan)
npm run build    # cek build produksi sebelum push
npm audit        # harus "found 0 vulnerabilities" sebelum push
```

## Aturan sebelum push ke `main`
Repo ini **publik**, dan setiap push langsung tayang. Jadi:
1. `npm audit` harus 0 celah. Perbarui versi patch/minor; versi mayor perlu diuji dulu.
2. Pastikan tidak ada rahasia (kunci, password, token) di file yang di-commit.
3. `npm test` dan `npm run build` harus lulus.
