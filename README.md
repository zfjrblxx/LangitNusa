# LangitNusa

**Melihat Indonesia dari langit dan bumi.**

LangitNusa adalah web interface editorial untuk mengeksplorasi cuaca, prakiraan, gempa bumi, kualitas udara, peringatan dini, dan konteks aktivitas alam Indonesia dengan **Data Terbuka BMKG sebagai sumber utama**.

> LangitNusa adalah proyek independen. BMKG merupakan sumber data dan attribution, bukan pemilik atau operator LangitNusa.

## ✨ Features

- 🌤️ Kondisi cuaca berdasarkan kode wilayah BMKG
- 🕒 Prakiraan cuaca per 3 jam hingga 3 hari
- 🌡️ Suhu, kelembapan, angin, visibilitas, awan, dan curah hujan
- 🔎 Search wilayah Indonesia berbasis direktori kode wilayah
- 🌎 Peta interaktif dengan layer lokasi, gempa, dan prakiraan lokasi
- 🌏 Daftar 15 gempa M5.0+ terbaru BMKG pada peta
- ⚠️ Feed peringatan dini cuaca BMKG
- 🌫️ Informasi pemantauan PM2.5 resmi BMKG
- 🌋 Konteks gunung api dengan rujukan PVMBG/MAGMA
- 🧭 Kesiapan aktivitas sebagai interpretasi sederhana dari prakiraan cuaca
- 🌙 Light & dark mode
- 📱 Responsive desktop dan mobile
- ♿ Focus pada struktur navigasi dan kontrol yang mudah disentuh

## 🎨 Design

LangitNusa memakai pendekatan editorial yang tenang:

- Serif display untuk headline dan informasi utama
- Sans-serif modern untuk navigasi, input, dan kontrol
- Off-white dengan aksen light blue
- Dark mode
- Whitespace yang luas
- Card digunakan seperlunya, bukan dashboard yang padat

Desain mengambil inspirasi dari prinsip editorial modern, tetapi tidak menyalin interface atau branding produk lain.

## 📡 Data Sources

Sumber utama:

- [BMKG Open Data](https://data.bmkg.go.id/)
- [Prakiraan Cuaca BMKG](https://data.bmkg.go.id/prakiraan-cuaca/)
- [Data Gempabumi BMKG](https://data.bmkg.go.id/gempabumi/)
- [Peringatan Dini Cuaca BMKG](https://data.bmkg.go.id/peringatan-dini-cuaca/)
- [PM2.5 BMKG](https://www.bmkg.go.id/kualitas-udara/pm25)
- [MAGMA Indonesia / PVMBG](https://magma.esdm.go.id/) untuk rujukan aktivitas vulkanik

BMKG menyatakan bahwa pemanfaat Data Terbuka BMKG wajib mencantumkan BMKG sebagai sumber data. LangitNusa menampilkan attribution tersebut di interface.

## 🧭 Search Wilayah

Endpoint cuaca publik BMKG menggunakan kode wilayah administrasi tingkat IV (`adm4`). Karena itu LangitNusa memakai direktori wilayah lokal di server untuk mengubah pencarian nama menjadi kode wilayah sebelum meminta prakiraan BMKG.

Direktori pencarian menggunakan package open-source `geografis` sebagai indeks wilayah. Data tersebut bukan dataset cuaca BMKG; kode wilayah hanya digunakan sebagai jembatan menuju endpoint cuaca BMKG.

## 🗺️ Peta

Peta menggunakan Leaflet + OpenStreetMap. Layer yang tersedia:

1. **Lokasi terpilih** — wilayah yang sedang dilihat.
2. **Gempa terbaru** — hingga 15 kejadian M5.0+ dari feed BMKG.
3. **Prakiraan lokasi** — kondisi prakiraan pada lokasi terpilih.

Titik prakiraan tidak dimaksudkan sebagai sebaran spasial cuaca; data cuaca BMKG memang dikirim berdasarkan lokasi administrasi yang dipilih.

## ⚠️ Data Integrity

LangitNusa tidak mengarang nilai ketika sumber publik yang sesuai belum tersedia.

- Cuaca dan gempa: data live dari endpoint BMKG melalui proxy Vercel.
- Peringatan dini: feed nowcast BMKG.
- PM2.5: ditautkan ke pemantauan resmi BMKG karena endpoint lokasi publik yang stabil belum dipastikan untuk semua wilayah.
- Gunung api: bukan dataset cuaca BMKG pada aplikasi ini; status harus diverifikasi melalui PVMBG/MAGMA.
- **Kesiapan aktivitas**: interpretasi aplikasi berdasarkan hujan, petir, dan angin; bukan indeks resmi BMKG.

Untuk keputusan keselamatan, selalu prioritaskan informasi resmi dari BMKG/PVMBG dan otoritas terkait.

## 🏗️ Project Structure

```text
langitnusa/
├── api/
│   ├── earthquake.js
│   ├── earthquakes.js
│   ├── locations.js
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

- Node.js 24+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## 📍 Default Location

**DKI Jakarta — Gambir** (`31.71.01.1001`).

## ☁️ Vercel

Project ini tidak lagi menetapkan `runtime` Function secara manual di `vercel.json`. Node.js diarahkan ke `24.x` melalui `package.json`, sementara Vercel menangani `/api/*.js` sebagai Functions.

## 📜 Attribution

**BMKG — Badan Meteorologi, Klimatologi, dan Geofisika**

LangitNusa merupakan proyek independen dan tidak berafiliasi dengan BMKG.

## 📄 License

Lihat [LICENSE](LICENSE).
