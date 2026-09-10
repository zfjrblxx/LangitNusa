import { ExternalLink, Wind, Footprints, Bike, Users, Sun, ShieldCheck, Gauge, Droplets } from 'lucide-react'
import { SectionHead } from './Weather'
import { aqiInfo } from '../utils/environment'

export default function Environment({ environment, airQuality, loading, weather }) {
  const info = aqiInfo(airQuality?.aqi)
  const activities = environment?.activities || {}
  const aqi = Number(airQuality?.aqi)
  const marker = Number.isFinite(aqi) ? Math.min(100, Math.max(0, (aqi / 500) * 100)) : 0

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
          <div className={`air-quality-icon ${info.tone}`}><Wind size={23} /></div>
          <h3>Kualitas Udara</h3>
        </div>
        <span className={`air-quality-badge ${info.tone}`}>{loading ? 'Memuat…' : info.label}</span>
      </div>

      <div className="air-quality-main">
        <div className={`air-score ${info.tone}`}>{loading ? '—' : Number.isFinite(aqi) ? Math.round(aqi) : '—'}</div>
        <div className="air-score-copy">
          <strong>{loading ? 'Memuat data…' : info.label}</strong>
          <span>US AQI dari Open-Meteo</span>
        </div>
      </div>

      <div className="air-scale-wrap" aria-label="Skala US AQI">
        <div className="air-scale">
          <i className="air-zone good" /><i className="air-zone warn" /><i className="air-zone bad" /><i className="air-zone very-bad" />
          {Number.isFinite(aqi) && <b className="air-marker" style={{ left: `${marker}%` }} />}
        </div>
        <div className="air-scale-labels">
          <span>0 Baik</span><span>50 Sedang</span><span>100 Sensitif</span><span>150 Tidak sehat</span><span>300+ Berbahaya</span>
        </div>
      </div>

      <p className="air-quality-desc">
        {loading ? 'Data kualitas udara Open-Meteo sedang dimuat.' : Number.isFinite(aqi)
          ? airDescription(info.tone, aqi)
          : 'Data kualitas udara belum tersedia untuk lokasi ini.'}
      </p>

      <div className="air-metrics air-metrics-pollutants">
        <Metric icon={<Wind />} label="PM2.5" value={value(airQuality?.pm25)} unit="µg/m³" />
        <Metric icon={<Gauge />} label="PM10" value={value(airQuality?.pm10)} unit="µg/m³" />
        <Metric icon={<Sun />} label="NO₂" value={value(airQuality?.no2)} unit="µg/m³" />
        <Metric icon={<Droplets />} label="SO₂" value={value(airQuality?.so2)} unit="µg/m³" />
      </div>

      <div className="air-quality-footer">
        <span>Open-Meteo Air Quality</span>
        <span>{airQuality?.updatedAt || 'Pembaruan mengikuti data Open-Meteo'}</span>
        <a href="https://open-meteo.com/en/docs/air-quality-api" target="_blank" rel="noreferrer">Sumber Open-Meteo <ExternalLink size={12} /></a>
      </div>
    </div>

    <div className="activity-block">
      <div className="activity-heading">
        <div>
          <div className="env-eyebrow"><ShieldCheck size={15} /> Kesiapan aktivitas</div>
          <h3>Aktivitas hari ini</h3>
          <p>Interpretasi LangitNusa dari data Open-Meteo kualitas udara dan cuaca.</p>
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

function Metric({ icon, label, value: val, unit }) { return <div className="air-metric"><span className="air-metric-icon">{icon}</span><span className="air-metric-label">{label}</span><strong>{val}</strong><small>{unit}</small></div> }
function value(v) { return v == null || !Number.isFinite(Number(v)) ? '—' : Number(v).toFixed(1) }
function airDescription(tone, value) {
  if (tone === 'good') return `US AQI berada di ${Math.round(value)}. Kualitas udara tergolong baik untuk aktivitas umum.`
  if (tone === 'warn') return `US AQI berada di ${Math.round(value)}. Kualitas udara masih dapat diterima, tetapi kelompok sensitif perlu lebih berhati-hati.`
  if (tone === 'bad') return `US AQI berada di ${Math.round(value)}. Pertimbangkan mengurangi aktivitas luar ruang sesuai kondisi dan informasi resmi.`
  return 'Kondisi udara memerlukan perhatian lebih.'
}
function statusClass(status) { if (/baik|aman|buka/i.test(status)) return 'good'; if (/hindari|dalam ruangan|tutup/i.test(status)) return 'bad'; return 'warn' }
