# LangitNusa

**Melihat Indonesia dari langit dan bumi.**

LangitNusa adalah web interface editorial untuk mengeksplorasi cuaca, prakiraan, gempa bumi, kualitas udara, peringatan dini, dan konteks aktivitas alam Indonesia dengan **BMKG & Open-Meteo sebagai satu-satunya sumber data**.

> LangitNusa adalah proyek independen. BMKG merupakan sumber data dan attribution, bukan pemilik atau operator LangitNusa.

## ✨ Features

- 🌤️ Kondisi cuaca berbasis koordinat dari Open-Meteo
- 🕒 Prakiraan cuaca per 3 jam hingga 3 hari
- 🌡️ Suhu, kelembapan, angin, visibilitas, awan, dan curah hujan
- 🔎 Search wilayah Indonesia berbasis Open-Meteo Geocoding
- 🌎 Peta interaktif dengan layer lokasi, gempa, dan prakiraan lokasi
- 🌏 Daftar 15 gempa M5.0+ terbaru BMKG pada peta
- ⚠️ Feed peringatan dini cuaca BMKG
- 🌫️ US AQI dan parameter polutan dari Open-Meteo Air Quality

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

> **Sumber Data Resmi: BMKG (Badan Meteorologi, Klimatologi, dan Geofisika) & Open-Meteo; khusus aktivitas gunung api menggunakan PVMBG · MAGMA ESDM.**


Sumber utama:

- [BMKG Open Data](https://data.bmkg.go.id/)
- [Open-Meteo Weather API](https://open-meteo.com/en/docs)
- [Data Gempabumi BMKG](https://data.bmkg.go.id/gempabumi/)
- [Peringatan Dini Cuaca BMKG](https://data.bmkg.go.id/peringatan-dini-cuaca/)
- [Open-Meteo Air Quality API](https://open-meteo.com/en/docs/air-quality-api)

BMKG menyatakan bahwa pemanfaat Data Terbuka BMKG wajib mencantumkan BMKG sebagai sumber data. LangitNusa menampilkan attribution tersebut di interface.

## 🧭 Search Wilayah

Pencarian lokasi menggunakan Open-Meteo Geocoding API. Koordinat hasil pencarian langsung dipakai untuk meminta data cuaca dan kualitas udara Open-Meteo.

## 🗺️ Peta

Peta menggunakan Leaflet + OpenStreetMap. Layer yang tersedia:

1. **Lokasi terpilih** — wilayah yang sedang dilihat.
2. **Gempa terbaru** — hingga 15 kejadian M5.0+ dari feed BMKG.
3. **Prakiraan lokasi** — kondisi prakiraan pada lokasi terpilih.

Titik prakiraan hanya memvisualisasikan kondisi pada koordinat lokasi terpilih, bukan sebaran spasial cuaca.

## ⚠️ Data Integrity

LangitNusa tidak mengarang nilai ketika sumber publik yang sesuai belum tersedia.

- Cuaca dan kualitas udara: data live dari Open-Meteo melalui proxy Vercel.
- Gempa dan peringatan dini: data resmi BMKG melalui proxy Vercel.
- Pencarian lokasi: Open-Meteo Geocoding API.
- **Kesiapan aktivitas**: interpretasi aplikasi berdasarkan data BMKG/Open-Meteo; bukan indeks resmi.

Untuk keputusan keselamatan, selalu prioritaskan informasi terbaru dari kanal resmi BMKG dan sumber resmi Open-Meteo yang digunakan aplikasi.

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

**DKI Jakarta — Gambir**.

## ☁️ Vercel

Project ini tidak lagi menetapkan `runtime` Function secara manual di `vercel.json`. Node.js diarahkan ke `24.x` melalui `package.json`, sementara Vercel menangani `/api/*.js` sebagai Functions.

## 📜 Attribution

**Sumber Data Resmi: BMKG (Badan Meteorologi, Klimatologi, dan Geofisika) & Open-Meteo; khusus aktivitas gunung api menggunakan PVMBG · MAGMA ESDM.**

LangitNusa merupakan proyek independen dan tidak berafiliasi dengan BMKG atau Open-Meteo.

## 📄 License

Lihat [LICENSE](LICENSE).


## Skor kondisi lingkungan

LangitNusa menampilkan **US AQI dari Open-Meteo** beserta PM2.5, PM10, NO₂, SO₂, O₃, dan CO. Kesiapan aktivitas merupakan interpretasi aplikasi dari data cuaca dan kualitas udara, bukan indeks resmi BMKG/Open-Meteo.
