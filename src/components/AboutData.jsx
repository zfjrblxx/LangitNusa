import { ExternalLink, Database, RefreshCw, ShieldCheck, CloudSun } from 'lucide-react'

const sources = [
  ['Prakiraan & kondisi cuaca', 'Open-Meteo', 'Data cuaca berbasis koordinat lokasi, termasuk suhu, kelembapan, kondisi cuaca, angin, awan, visibilitas, dan presipitasi.', 'https://open-meteo.com/en/docs'],
  ['Gempa bumi', 'BMKG', 'Informasi gempa terbaru dan daftar kejadian M5+ dari layanan resmi BMKG.', 'https://data.bmkg.go.id/gempabumi/'],
  ['Peringatan dini', 'BMKG', 'Peringatan dini cuaca yang dipublikasikan BMKG melalui layanan nowcast.', 'https://data.bmkg.go.id/peringatan-dini-cuaca/'],
  ['Kualitas udara', 'Open-Meteo', 'US AQI serta PM2.5, PM10, NO₂, SO₂, O₃, dan CO dari Open-Meteo Air Quality API.', 'https://open-meteo.com/en/docs/air-quality-api']
]

export default function AboutData() {
  return <section className="section about-data" id="about-data">
    <div className="section-head"><h2>Tentang data</h2><span>Sumber resmi LangitNusa</span></div>
    <div className="about-hero">
      <div className="about-mark"><Database size={21} /></div>
      <div><h3>Semua data berasal dari dua sumber.</h3><p><strong>Sumber Data Resmi: BMKG (Badan Meteorologi, Klimatologi, dan Geofisika) & Open-Meteo.</strong> LangitNusa tidak mengambil data informasi dari layanan cuaca, kualitas udara, gempa, atau sumber lingkungan lain di luar dua sumber tersebut.</p></div>
    </div>

    <div className="data-principles">
      <div><RefreshCw size={17} /><strong>Mengikuti sumber</strong><span>Data diperbarui dari layanan BMKG atau Open-Meteo saat aplikasi memuat ulang.</span></div>
      <div><ShieldCheck size={17} /><strong>Tidak mengarang nilai</strong><span>Jika data resmi dari dua sumber tersebut tidak tersedia, LangitNusa tidak membuat angka pengganti.</span></div>
      <div><CloudSun size={17} /><strong>Interpretasi diberi konteks</strong><span>Ringkasan kesiapan aktivitas adalah olahan LangitNusa menggunakan data dari BMKG/Open-Meteo, bukan indeks resmi.</span></div>
    </div>

    <div className="source-list">
      <h3>Sumber informasi</h3>
      {sources.map(([title, source, desc, href]) => <div className="source-row" key={title}>
        <div className="source-icon"><Database size={16} /></div>
        <div className="source-copy"><strong>{title}</strong><span>{source}</span><p>{desc}</p></div>
        <a href={href} target="_blank" rel="noreferrer" aria-label={`Buka sumber ${title}`}><ExternalLink size={15} /></a>
      </div>)}
    </div>

    <div className="about-attribution">
      <strong>Sumber Data Resmi</strong>
      <p>BMKG (Badan Meteorologi, Klimatologi, dan Geofisika) & Open-Meteo.</p>
      <a href="https://data.bmkg.go.id/" target="_blank" rel="noreferrer">BMKG Data Terbuka <ExternalLink size={13} /></a>
      <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo <ExternalLink size={13} /></a>
    </div>
  </section>
}
