# Sumber Data LangitNusa

> **Sumber Data Resmi: BMKG (Badan Meteorologi, Klimatologi, dan Geofisika) & Open-Meteo; khusus aktivitas gunung api menggunakan PVMBG · MAGMA ESDM.**

LangitNusa membatasi sumber data informasional pada dua penyedia tersebut. Tidak ada data cuaca, kualitas udara, gempa, atau peringatan yang diambil dari layanan pihak ketiga lain.

## Open-Meteo Weather

- API: https://open-meteo.com/en/docs
- Digunakan untuk kondisi saat ini dan prakiraan berbasis koordinat.
- Parameter yang digunakan mencakup suhu, kelembapan, kode cuaca, angin, awan, visibilitas, dan presipitasi.

## Open-Meteo Geocoding

- API: https://open-meteo.com/en/docs/geocoding-api
- Digunakan untuk pencarian kota/kabupaten/kecamatan/wilayah dan koordinat lokasi.

## Open-Meteo Air Quality

- API: https://open-meteo.com/en/docs/air-quality-api
- Digunakan untuk US AQI dan parameter PM2.5, PM10, NO₂, SO₂, O₃, dan CO.
- AQI yang ditampilkan mengikuti nilai US AQI dari Open-Meteo, bukan skor buatan LangitNusa.

## BMKG Earthquake

- https://data.bmkg.go.id/gempabumi/
- Digunakan untuk gempa terbaru dan daftar gempa M5+.
- BMKG wajib dicantumkan sebagai sumber data pada aplikasi.

## BMKG Early Warning

- https://data.bmkg.go.id/peringatan-dini-cuaca/
- Digunakan untuk peringatan dini cuaca/nowcast.

## Prinsip data

1. Sumber data hanya BMKG dan Open-Meteo.
2. Jika data tidak tersedia, LangitNusa menampilkan status tidak tersedia dan tidak membuat angka pengganti.
3. Interpretasi kesiapan aktivitas dibuat oleh aplikasi berdasarkan data dari dua sumber tersebut dan bukan indeks resmi.
4. Peta dasar adalah elemen visual pemetaan, bukan sumber data cuaca atau kualitas udara.
