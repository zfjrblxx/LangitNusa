# Data Sources

## BMKG Weather

Endpoint:

```text
https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4={kode_wilayah_tingkat_iv}
```

BMKG menyediakan prakiraan seluruh kelurahan/desa di Indonesia untuk 3 hari dengan interval 3 jam. Data yang digunakan LangitNusa mencakup suhu, kelembapan, kondisi cuaca, angin, tutupan awan, visibilitas, dan curah hujan.

## BMKG Earthquake

Latest event:

```text
https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json
```

List M5.0+:

```text
https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json
```

LangitNusa menampilkan gempa terbaru dan daftar hingga 15 gempa M5.0+ pada peta.

## BMKG Early Warning

```text
https://www.bmkg.go.id/alerts/nowcast/id
```

Feed ini merupakan nowcast/peringatan dini cuaca BMKG dan dapat berubah sewaktu-waktu.

## BMKG PM2.5

```text
https://www.bmkg.go.id/kualitas-udara/pm25
```

LangitNusa mengambil nilai PM2.5 dari halaman pemantauan resmi BMKG melalui proxy server. Aplikasi mencocokkan lokasi pengguna dengan stasiun BMKG terdekat yang tersedia, lalu menampilkan nilai, kategori, waktu pembaruan, dan perkiraan jarak stasiun. Jika tidak tersedia, aplikasi tidak membuat angka pengganti.

## Volcano

```text
https://magma.esdm.go.id/
```

Aktivitas gunung api dirujuk ke PVMBG/MAGMA. Section gunung api pada LangitNusa bukan klaim bahwa status tersebut berasal dari BMKG.

## Location Directory

Search wilayah menggunakan package open-source `geografis` sebagai direktori kode wilayah, nama, dan koordinat. Direktori tersebut hanya membantu menemukan `adm4`; data cuaca tetap diminta dari BMKG.

## Attribution

BMKG mewajibkan pengguna Data Terbuka BMKG mencantumkan BMKG sebagai sumber data. LangitNusa menampilkan attribution BMKG pada halaman utama.


## Skor Kondisi Lingkungan

Skor 0–100 adalah interpretasi LangitNusa. PM2.5 BMKG berbobot 70% dan komponen kenyamanan termal berbasis suhu/kelembapan BMKG berbobot 30%. Skor ini bukan indeks resmi BMKG dan tidak menggantikan informasi kesehatan atau keselamatan resmi.
