import { ExternalLink, Database, RefreshCw, ShieldCheck, Mountain, CloudSun } from 'lucide-react'

const sources = [
  ['Prakiraan cuaca', 'BMKG Open Data', 'Data prakiraan cuaca berbasis kode wilayah, termasuk suhu, kelembapan, cuaca, angin, tutupan awan, visibilitas, dan waktu prakiraan.', 'https://data.bmkg.go.id/prakiraan-cuaca/'],
  ['Gempa bumi', 'BMKG Open Data', 'Informasi gempa terbaru dan daftar gempa dengan magnitudo M5+ yang tersedia dari layanan informasi gempa BMKG.', 'https://data.bmkg.go.id/gempabumi/'],
  ['Peringatan dini', 'BMKG', 'Peringatan dini cuaca yang dipublikasikan BMKG melalui layanan nowcast untuk wilayah Indonesia.', 'https://data.bmkg.go.id/peringatan-dini-cuaca/'],
  ['Kualitas udara', 'BMKG', 'Pemantauan PM2.5 resmi BMKG. LangitNusa menampilkan tautan sumber ketika nilai lokal tidak tersedia melalui endpoint publik yang stabil.', 'https://www.bmkg.go.id/kualitas-udara/pm25'],
  ['Aktivitas gunung api', 'PVMBG / MAGMA Indonesia', 'Informasi gunung api digunakan sebagai konteks lokasi. Status aktivitas vulkanik tidak diklaim sebagai data live BMKG.', 'https://magma.esdm.go.id/'],
]

export default function AboutData() {
  return <section className="section about-data" id="about-data">
    <div className="section-head"><h2>Tentang data</h2><span>Sumber & cara LangitNusa bekerja</span></div>
    <div className="about-hero">
      <div className="about-mark"><Database size={21} /></div>
      <div><h3>Data resmi, disajikan lebih sederhana.</h3><p>LangitNusa adalah proyek independen yang mengolah dan menyajikan informasi cuaca, gempa, peringatan, dan lingkungan agar lebih mudah dibaca. Sumber utama informasi cuaca, gempa, dan peringatan berasal dari BMKG.</p></div>
    </div>

    <div className="data-principles">
      <div><RefreshCw size={17} /><strong>Mengikuti sumber</strong><span>Data diambil dari layanan yang tersedia dan dapat diperbarui saat pengguna memuat ulang.</span></div>
      <div><ShieldCheck size={17} /><strong>Tidak mengarang nilai</strong><span>Jika data resmi untuk suatu metrik tidak tersedia, LangitNusa tidak membuat angka pengganti.</span></div>
      <div><CloudSun size={17} /><strong>Interpretasi diberi konteks</strong><span>Rekomendasi aktivitas adalah interpretasi aplikasi dari kondisi cuaca, bukan indeks resmi BMKG.</span></div>
    </div>

    <div className="source-list">
      <h3>Sumber informasi</h3>
      {sources.map(([title, source, desc, href]) => <div className="source-row" key={title}>
        <div className="source-icon">{title === 'Aktivitas gunung api' ? <Mountain size={16} /> : <Database size={16} />}</div>
        <div className="source-copy"><strong>{title}</strong><span>{source}</span><p>{desc}</p></div>
        <a href={href} target="_blank" rel="noreferrer" aria-label={`Buka sumber ${title}`}><ExternalLink size={15} /></a>
      </div>)}
    </div>

    <div className="about-attribution">
      <strong>Attribution</strong>
      <p>LangitNusa menggunakan Data Terbuka BMKG dan tetap mencantumkan BMKG sebagai sumber data. Untuk informasi keselamatan, peringatan, dan keputusan penting, selalu prioritaskan informasi terbaru dari kanal resmi.</p>
      <a href="https://data.bmkg.go.id/tentang/" target="_blank" rel="noreferrer">Tentang Data Terbuka BMKG <ExternalLink size={13} /></a>
    </div>
  </section>
}
