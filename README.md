# LangitNusa

**Melihat Indonesia dari langit dan bumi.**

LangitNusa adalah web interface untuk mengeksplorasi kondisi cuaca, prakiraan, gempa bumi, kualitas udara, peringatan dini, dan informasi aktivitas alam Indonesia dengan memanfaatkan data terbuka BMKG.

> LangitNusa adalah proyek independen. BMKG merupakan sumber data dan attribution, bukan pemilik atau operator LangitNusa.

## ✨ Features

- 🌤️ Kondisi cuaca berdasarkan wilayah
- 🕒 Prakiraan cuaca per 3 jam
- 🌡️ Suhu, kelembapan, angin, visibilitas, dan tutupan awan
- 🌎 Peta sebaran untuk eksplorasi data
- 🌋 Section aktivitas gunung terdekat
- 🌫️ Informasi kualitas udara / PM2.5
- 🌏 Gempa bumi terbaru
- ⚠️ Peringatan dini
- 🧭 Penilaian sederhana kesiapan aktivitas berdasarkan kondisi cuaca
- 🔎 Pencarian wilayah
- 🌙 Light & dark mode
- 📱 Responsive untuk desktop dan mobile

## 🎨 Design

LangitNusa menggunakan pendekatan editorial yang tenang:

- Serif display untuk headline dan konten utama
- Sans-serif modern untuk navigasi, kontrol, dan input
- Palet off-white dengan aksen light blue
- Dark mode
- Whitespace yang luas
- Card digunakan seperlunya, bukan sebagai dashboard yang padat

Desain ini terinspirasi dari prinsip editorial modern, tetapi **tidak menyalin interface atau branding produk lain**.

## 📡 Data Sources

Sumber utama data:

- [BMKG Open Data](https://data.bmkg.go.id/)
- Prakiraan cuaca BMKG
- Data gempa bumi BMKG
- Peringatan dini BMKG
- Informasi kualitas udara BMKG

Untuk keputusan keselamatan, selalu prioritaskan informasi dan kanal resmi BMKG.

## 🏗️ Project Structure

```text
langitnusa/
├── api/
│   ├── earthquake.js
│   ├── warnings.js
│   └── weather.js
├── docs/
│   └── DATA-SOURCES.md
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   ├── services/
│   │   └── bmkg.js
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
├── LICENSE
├── package.json
├── vercel.json
└── vite.config.js
```

## 🚀 Getting Started

### Requirements

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Kemudian buka alamat localhost yang ditampilkan Vite.

### Production Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## 📍 Default Location

Lokasi awal LangitNusa:

**DKI Jakarta — Gambir**

Pengguna dapat memilih wilayah lain dari pencarian atau pilihan lokasi yang tersedia pada interface.

## ⚠️ Data Integrity

Tidak semua informasi pada interface merupakan dataset BMKG langsung.

Data yang berasal dari BMKG ditampilkan sebagai data sumber. Fitur seperti **Kesiapan Aktivitas** merupakan interpretasi aplikasi berdasarkan kondisi cuaca dan bukan indeks resmi BMKG.

Jika suatu dataset belum tersedia melalui endpoint publik yang sesuai, LangitNusa tidak mengarang nilai datanya.

## ♿ Accessibility & Responsive Design

Interface dirancang untuk:

- layar desktop dan mobile
- navigasi yang sederhana
- kontras yang nyaman
- kontrol yang mudah disentuh pada mobile
- dark mode

## 🔐 Environment

Salin `.env.example` menjadi `.env` jika konfigurasi environment diperlukan.

Jangan commit secret atau credential ke repository.

## 📜 Attribution

Data BMKG digunakan sesuai ketentuan Data Terbuka BMKG.

**BMKG — Badan Meteorologi, Klimatologi, dan Geofisika**

LangitNusa merupakan proyek independen dan tidak berafiliasi dengan BMKG.

## 📄 License

Lihat [LICENSE](LICENSE).
