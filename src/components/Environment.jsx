import { ExternalLink, Wind, Footprints, Bike, Users, Sun, ShieldCheck, Gauge, Droplets } from 'lucide-react'
import { SectionHead } from './Weather'
import { airQualityScore, pm25Info } from '../utils/environment'

export default function Environment({ environment, airQuality, loading, weather }) {
  const pm = pm25Info(airQuality?.pm25)
  const airScore = airQualityScore(airQuality?.pm25)
  const activities = environment?.activities || {}
  const score = loading ? null : airScore
  const marker = Number.isFinite(Number(airQuality?.pm25))
    ? Math.min(100, Math.max(0, (Number(airQuality.pm25) / 250.4) * 100))
    : 0

  const rows = [
    { icon: Footprints, name: 'Jogging', status: activities.jogging || '—', detail: 'Aktivitas luar ruang' },
    { icon: Bike, name: 'Bersepeda', status: activities.cycling || '—', detail: 'Aktivitas luar ruang' },
    { icon: Users, name: 'Anak & lansia', status: activities.kids || '—', detail: 'Kelompok sensitif' },
    { icon: Wind, name: 'Ventilasi', status: activities.ventilation || '—', detail: 'Sirkulasi udara ruangan' },
  ]

  return <section className="section environment-section" id="air">
    <SectionHead title="Kondisi lingkungan" note="Kualitas udara & kesiapan aktivitas" />

    <div className="air-quality-card">
      <div className="air-quality-head">
        <div className="air-quality-title">
          <div className={`air-quality-icon ${pm.tone}`}><Wind size={23} /></div>
          <h3>Kualitas Udara</h3>
        </div>
        <span className={`air-quality-badge ${pm.tone}`}>{loading ? 'Memuat…' : pm.label}</span>
      </div>

      <div className="air-quality-main">
        <div className={`air-score ${pm.tone}`}>{score ?? '—'}</div>
        <div className="air-score-copy">
          <strong>{loading ? 'Memuat data…' : pm.label}</strong>
          <span>Skor kualitas udara LangitNusa</span>
        </div>
      </div>

      <div className="air-scale-wrap" aria-label="Skala konsentrasi PM2.5">
        <div className="air-scale">
          <i className="air-zone good" /><i className="air-zone warn" /><i className="air-zone bad" /><i className="air-zone very-bad" />
          {Number.isFinite(Number(airQuality?.pm25)) && <b className="air-marker" style={{ left: `${marker}%` }} />}
        </div>
        <div className="air-scale-labels">
          <span>0 Baik</span><span>15.5 Sedang</span><span>55.4 Tidak sehat</span><span>150.4 Sangat tidak sehat</span><span>250+ Berbahaya</span>
        </div>
      </div>

      <p className="air-quality-desc">
        {loading ? 'Data PM2.5 BMKG sedang dimuat.' : airQuality?.pm25 != null
          ? airDescription(pm.tone, airQuality.pm25)
          : 'Data PM2.5 belum tersedia untuk lokasi ini.'}
      </p>

      <div className="air-metrics">
        <Metric icon={<Wind />} label="PM2.5" value={airQuality?.pm25 != null ? `${Number(airQuality.pm25).toFixed(1)}` : '—'} unit="µg/m³" />
        <Metric icon={<Sun />} label="Suhu" value={weather?.t != null ? `${weather.t}` : '—'} unit="°C" />
        <Metric icon={<Droplets />} label="Kelembapan" value={weather?.hu != null ? `${weather.hu}` : '—'} unit="%" />
        <Metric icon={<Gauge />} label="Angin" value={weather?.ws != null ? `${weather.ws}` : '—'} unit="km/j" />
      </div>

      <div className="air-quality-footer">
        <span>{airQuality?.station ? `Stasiun ${airQuality.station}` : 'Pemantauan PM2.5 BMKG'}{airQuality?.distanceKm != null ? ` · ±${airQuality.distanceKm} km` : ''}</span>
        <span>{airQuality?.updatedAt || 'Pembaruan mengikuti data BMKG'}</span>
        <a href="https://www.bmkg.go.id/kualitas-udara/pm25" target="_blank" rel="noreferrer">Pemantauan BMKG <ExternalLink size={12} /></a>
      </div>
    </div>

    <div className="activity-block">
      <div className="activity-heading">
        <div>
          <div className="env-eyebrow"><ShieldCheck size={15} /> Kesiapan aktivitas</div>
          <h3>Aktivitas hari ini</h3>
          <p>Interpretasi LangitNusa dari PM2.5 dan kondisi cuaca saat ini.</p>
        </div>
        <span>{environment?.label || 'Data terbatas'}</span>
      </div>
      <div className="activity-list">
        {rows.map(({ icon: Icon, name, status, detail }) => <div className="activity-row" key={name}>
          <div className="activity-icon"><Icon size={18} /></div>
          <div className="activity-copy"><strong>{name}</strong><small>{detail}</small></div>
          <b className={statusClass(status)}>{status}</b>
        </div>)}
      </div>
    </div>
  </section>
}

function Metric({ icon, label, value, unit }) {
  return <div className="air-metric"><span className="air-metric-icon">{icon}</span><span className="air-metric-label">{label}</span><strong>{value}</strong><small>{unit}</small></div>
}

function airDescription(tone, value) {
  if (tone === 'good') return 'Kualitas udara tergolong baik. Kondisi umumnya nyaman untuk aktivitas luar ruang.'
  if (tone === 'warn') return `PM2.5 berada di ${Number(value).toFixed(1)} µg/m³. Kualitas udara masih dapat diterima, tetapi kelompok sensitif perlu lebih berhati-hati.`
  if (tone === 'bad') return `PM2.5 berada di ${Number(value).toFixed(1)} µg/m³. Pertimbangkan mengurangi aktivitas luar ruang dan ikuti informasi resmi BMKG.`
  return 'Kondisi udara memerlukan perhatian lebih. Ikuti informasi resmi BMKG untuk keputusan keselamatan.'
}

function statusClass(status) {
  if (/baik|aman|buka/i.test(status)) return 'good'
  if (/hindari|dalam ruangan|tutup/i.test(status)) return 'bad'
  return 'warn'
}
