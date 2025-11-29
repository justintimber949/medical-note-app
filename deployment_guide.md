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

## Langkah 2: Konfigurasi GitHub Pages

1.  **Buka Repository di GitHub**:
    Masuk ke halaman repository `medical-note-app` Anda.

2.  **Masuk ke Settings**:
    Klik tab **Settings** > Pilih menu **Pages** di sidebar kiri.

3.  **Pilih Source**:
    *   Pada bagian **Build and deployment**, ubah **Source** menjadi **GitHub Actions**.
    *   GitHub akan otomatis mendeteksi workflow Next.js yang sudah saya buatkan (`.github/workflows/nextjs.yml`).

4.  **Tunggu Proses Build**:
    *   Klik tab **Actions** untuk melihat proses deployment yang berjalan.
    *   Jika sukses, link website Anda akan muncul di sana (biasanya `https://USERNAME.github.io/medical-note-app/`).

## Langkah 3: Hubungkan ke Cloudflare Pages (Opsional)

## Selesai!
Setelah sukses, Cloudflare akan memberikan URL unik (misal: `medical-note-app.pages.dev`). Website Anda sekarang sudah online!

---

### Catatan Penting
*   **API Key**: Karena aplikasi ini bersifat *client-side* (disimpan di browser), Anda tidak perlu mengatur Environment Variables untuk API Key di Cloudflare. User (Anda) akan memasukkan API Key langsung di website saat pertama kali buka.
*   **Update Website**: Setiap kali Anda melakukan perubahan kode dan melakukan `git push` ke GitHub, Cloudflare akan otomatis mendeteksi dan meng-update website Anda.
