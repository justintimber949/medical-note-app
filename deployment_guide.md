# Panduan Deployment ke GitHub & Cloudflare Pages

Panduan ini akan membantu Anda meng-online-kan website Medical Note Generator secara gratis menggunakan GitHub dan Cloudflare Pages.

## Prasyarat
1.  Akun [GitHub](https://github.com/).
2.  Akun [Cloudflare](https://dash.cloudflare.com/sign-up).
3.  Git terinstall di komputer Anda.

## Langkah 1: Push Kode ke GitHub

1.  **Buat Repository Baru di GitHub**:
    *   Buka GitHub dan klik tombol **New** (atau tanda + di pojok kanan atas).
    *   Beri nama repository, misal: `medical-note-app`.
    *   Pilih **Public** atau **Private** (terserah Anda).
    *   Klik **Create repository**.

2.  **Upload Kode dari Komputer**:
    Buka terminal di folder proyek Anda (`c:\Users\Ahmad taufiq\Project Antigravity\MedicalNote`) dan jalankan perintah berikut satu per satu:

    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/USERNAME_ANDA/medical-note-app.git
    git push -u origin main
    ```
    *(Ganti `USERNAME_ANDA` dengan username GitHub Anda dan `medical-note-app` sesuai nama repo Anda)*

## Langkah 2: Hubungkan ke Cloudflare Pages

1.  **Masuk ke Dashboard Cloudflare**:
    *   Login ke akun Cloudflare Anda.
    *   Di menu sebelah kiri, pilih **Workers & Pages**.
    *   Klik tombol **Create application** > Pilih tab **Pages** > Klik **Connect to Git**.

2.  **Pilih Repository**:
    *   Jika belum terhubung, Anda akan diminta login ke GitHub.
    *   Pilih repository `medical-note-app` yang baru saja Anda buat.
    *   Klik **Begin setup**.

3.  **Konfigurasi Build**:
    Cloudflare biasanya otomatis mendeteksi pengaturan Next.js, tapi pastikan pengaturannya seperti ini:
    *   **Project name**: (Biarkan default atau ubah sesuka hati)
    *   **Production branch**: `main`
    *   **Framework preset**: `Next.js (Static HTML Export)`
    *   **Build command**: `npx @cloudflare/next-on-pages@1` (atau `npm run build` jika sudah dikonfigurasi static export)
        *   *Rekomendasi*: Gunakan `npm run build` karena kita sudah set `output: 'export'` di Next.js.
    *   **Build output directory**: `out`

4.  **Deploy**:
    *   Klik **Save and Deploy**.
    *   Tunggu proses build selesai (biasanya 1-2 menit).

## Selesai!
Setelah sukses, Cloudflare akan memberikan URL unik (misal: `medical-note-app.pages.dev`). Website Anda sekarang sudah online!

---

### Catatan Penting
*   **API Key**: Karena aplikasi ini bersifat *client-side* (disimpan di browser), Anda tidak perlu mengatur Environment Variables untuk API Key di Cloudflare. User (Anda) akan memasukkan API Key langsung di website saat pertama kali buka.
*   **Update Website**: Setiap kali Anda melakukan perubahan kode dan melakukan `git push` ke GitHub, Cloudflare akan otomatis mendeteksi dan meng-update website Anda.
