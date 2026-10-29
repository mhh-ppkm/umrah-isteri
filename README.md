# Diari Umrah Isteriku

Panduan umrah untuk isteri (Umrah4Ladies, 4–15 Nov 2026): kiraan detik, jadual, ringkasan umrah, lokasi auto, bajet, gambar ke Google Drive, waktu berkat, zikir & selawat, doa dan checklist.

## Fail mana pergi ke mana

| Fail | Letak di mana |
|---|---|
| `index.html` | **GitHub** (wajib) |
| `sw.js` | **GitHub** (wajib untuk aplikasi & offline) |
| `manifest.webmanifest` | **GitHub** (wajib untuk aplikasi) |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`, `favicon-32.png` | **GitHub** (ikon aplikasi) |
| `README.md` | **GitHub** (pilihan — panduan ini) |
| `firestore.rules` | **Firebase console** → Firestore → Rules (bukan GitHub) |
| `Code.gs` | **script.google.com** (bukan GitHub) |

## Langkah 1 — Firebase (lokasi auto & status)

1. Buka https://console.firebase.google.com → **Add project** → beri nama `umrah-isteri` → matikan Google Analytics → **Create**.
2. Menu kiri **Build → Firestore Database → Create database** → lokasi `asia-southeast1` → **Start in production mode**.
3. Tab **Rules** → padam semua → tampal isi `firestore.rules` → **Publish**.
4. Ikon gear → **Project settings** → bawah *Your apps* tekan **</>** (Web) → nama `umrah` → **Register app**.
5. Salin 6 nilai dalam `firebaseConfig` (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId).

## Langkah 2 — Google Apps Script (gambar ke Drive)

1. Log masuk Gmail peribadi → buka https://script.google.com → **New project**.
2. Padam kod contoh → tampal isi `Code.gs`.
3. Tukar `GANTI_DENGAN_KOD_RAHSIA_ANDA` kepada kod rahsia sendiri (sekurang-kurangnya 8 aksara) → **Save**.
4. **Deploy → New deployment** → ikon gear → **Web app** → *Execute as: Me* → *Who has access: Anyone* → **Deploy** → **Authorize access** → pilih akaun → *Advanced* → *Go to project* → **Allow**.
5. Salin **Web app URL** (berakhir `/exec`). Simpan bersama kod rahsia.

## Langkah 3 — GitHub (muat naik & isi konfigurasi)

1. Daftar/log masuk https://github.com → **+** (atas kanan) → **New repository** → nama `umrah-isteri` → **Public** → **Create repository**.
2. Tekan **uploading an existing file** → seret **semua fail dalam folder `github/`** dari zip (index.html, sw.js, manifest.webmanifest, 5 ikon, README.md) → **Commit changes**.
3. `FIREBASE_CONFIG` sudah diisi dalam `index.html` — tiada suntingan diperlukan.
4. **Settings → Pages** → *Source: Deploy from a branch* → *Branch: main* → */(root)* → **Save**.
5. Tunggu 1–2 minit, muat semula halaman Settings → Pages. Pautan muncul: `https://NAMA-PENGGUNA.github.io/umrah-isteri/`

## Langkah 4 — Sediakan di telefon

1. **Telefon isteri** (Safari/Chrome): buka pautan → tab **Lokasi** → **Cipta pautan keluarga** → pilih **Isteri** → **Salin pautan** → hantar kepada suami melalui WhatsApp.
2. **Telefon suami**: buka pautan keluarga → pilih **Suami**.
3. Mana-mana telefon: tab **Gambar** → isi *URL Web App* dan *kod rahsia* dari Langkah 2 → **Simpan tetapan**.
4. iPhone: butang **Share** → **Add to Home Screen** (Android: menu ⋮ → **Add to Home screen**).

## Langkah 5 — Uji sebelum 4 November

- Isteri tekan **Mula kongsi lokasi auto** → suami nampak lokasi di tab Lokasi.
- Isteri hantar satu **status ibadah** → suami nampak.
- Isteri muat naik satu **gambar** → muncul dalam galeri dan folder Drive *Umrah Isteri 2026*.
- Tab **Ringkasan** → **Jana ringkasan**.

## Kemas kini kemudian

Muat naik `index.html` baharu ke repo yang sama (**Add file → Upload files** → ganti fail lama → **Commit**), kemudian isi semula `FIREBASE_CONFIG` seperti Langkah 3.3. Pautan dan data tidak berubah.

## Nota

- Pautan keluarga ialah kunci akses — jangan kongsi dengan orang lain.
- Jangan muat naik gambar pasport atau dokumen sulit (galeri dikongsi melalui pautan).
- Rekod checklist, zikir dan bajet disimpan dalam telefon masing-masing.

## Aplikasi (PWA) & simpanan IndexedDB

- Selepas dibuka sekali dengan internet, aplikasi boleh dibuka **tanpa internet** (jadual, doa, zikir, checklist, bajet).
- Rekod disimpan dalam **IndexedDB** telefon; lokasi yang dihantar ketika tiada talian akan dihantar sendiri bila talian pulih; gambar yang gagal dimuat naik disimpan dan dihantar semula secara automatik.
- **iPhone:** aplikasi di skrin utama menyimpan rekod berasingan daripada Safari. Pasang dahulu, kemudian buka aplikasi → tab Lokasi → **Sudah ada pautan keluarga?** → tampal pautan keluarga → **Sambung**. Guna aplikasi itu sahaja selepas ini.
- Tab **Ringkasan → Sandaran data** untuk muat turun / pulihkan rekod (contoh: tukar telefon).
