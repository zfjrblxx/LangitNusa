import { ExternalLink, Database, RefreshCw, ShieldCheck, CloudSun, X, Mountain } from 'lucide-react'

const sources = [
  ['Prakiraan & kondisi cuaca', 'Open-Meteo', 'Data cuaca berbasis koordinat lokasi, termasuk suhu, kelembapan, kondisi cuaca, angin, awan, visibilitas, dan presipitasi.', 'https://open-meteo.com/en/docs'],
  ['Gempa bumi', 'BMKG', 'Informasi gempa terbaru dan daftar kejadian M5+ dari layanan resmi BMKG.', 'https://data.bmkg.go.id/gempabumi/'],
  ['Peringatan dini', 'BMKG', 'Peringatan dini cuaca yang dipublikasikan BMKG melalui layanan nowcast.', 'https://data.bmkg.go.id/peringatan-dini-cuaca/'],
  ['Kualitas udara', 'Open-Meteo', 'US AQI serta PM2.5, PM10, NO₂, SO₂, O₃, dan CO dari Open-Meteo Air Quality API.', 'https://open-meteo.com/en/docs/air-quality-api'],
  ['Aktivitas gunung api', 'PVMBG · MAGMA ESDM', 'Level aktivitas gunung api dan informasi terkait yang ditampilkan pada bagian gunung api.', 'https://magma.esdm.go.id/']
]

export default function AboutData({ open, onClose }) {
  if (!open) return null

  return <div className="about-modal" role="dialog" aria-modal="true" aria-labelledby="about-data-title">
    <div className="about-modal-backdrop" onClick={onClose} />
    <div className="about-modal-card">
      <div className="about-modal-head">
        <div>
          <span className="kicker">Sumber & metodologi</span>
          <h2 id="about-data-title">Tentang data</h2>
          <p>Bagaimana LangitNusa memperoleh dan mengolah informasi yang tampil di aplikasi.</p>
        </div>
        <button className="icon-btn" onClick={onClose} aria-label="Tutup Tentang data"><X size={20} /></button>
      </div>

      <div className="about-hero">
        <div className="about-mark"><Database size={21} /></div>
        <div><h3>Sumber Data Resmi</h3><p><strong>BMKG (Badan Meteorologi, Klimatologi, dan Geofisika) & Open-Meteo.</strong> Data utama LangitNusa untuk cuaca, kualitas udara, gempa, peringatan dini, dan lokasi menggunakan layanan dari kedua sumber tersebut. Data aktivitas gunung api menggunakan sumber resmi <strong>PVMBG · MAGMA ESDM</strong>.</p></div>
      </div>

      <div className="data-principles">
        <div><RefreshCw size={17} /><strong>Data mengikuti sumber</strong><span>LangitNusa mengambil data saat aplikasi memuat atau diperbarui kembali.</span></div>
        <div><ShieldCheck size={17} /><strong>Tidak mengarang angka</strong><span>Jika data sumber tidak tersedia, aplikasi menampilkan status belum tersedia.</span></div>
        <div><CloudSun size={17} /><strong>Olahan diberi label</strong><span>Kesiapan aktivitas dan ringkasan kondisi merupakan interpretasi LangitNusa, bukan indeks resmi.</span></div>
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
        <strong>Ringkasnya</strong>
        <p>BMKG & Open-Meteo adalah sumber utama data LangitNusa. PVMBG · MAGMA ESDM digunakan khusus untuk informasi aktivitas gunung api.</p>
        <div className="about-links">
          <a href="https://data.bmkg.go.id/" target="_blank" rel="noreferrer">BMKG Data Terbuka <ExternalLink size={13} /></a>
          <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo <ExternalLink size={13} /></a>
          <a href="https://magma.esdm.go.id/" target="_blank" rel="noreferrer">MAGMA ESDM <ExternalLink size={13} /></a>
        </div>
      </div>
    </div>
  </div>
}
