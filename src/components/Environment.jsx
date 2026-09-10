import { ExternalLink, Wind, Footprints, Bike, Users, Sun, ShieldCheck } from 'lucide-react'
import { SectionHead } from './Weather'
import { pm25Info } from '../utils/environment'

export default function Environment({ environment, airQuality, loading, weather }) {
  const pm = pm25Info(airQuality?.pm25)
  const activities = environment?.activities || {}
  const rows = [
    { icon: Footprints, name: 'Jogging', status: activities.jogging || '—' },
    { icon: Bike, name: 'Bersepeda', status: activities.cycling || '—' },
    { icon: Users, name: 'Anak & lansia', status: activities.kids || '—' },
    { icon: Wind, name: 'Ventilasi', status: activities.ventilation || '—' },
  ]

  return <section className="section environment-section" id="air">
    <SectionHead title="Kondisi lingkungan" note="Kualitas udara & kesiapan aktivitas" />

    <div className="environment-score">
      <div className={`environment-score-number ${environment?.tone || 'neutral'}`}>
        {loading ? '—' : environment?.score ?? '—'}
        <small>/100</small>
      </div>
      <div className="environment-score-copy">
        <div className={`env-eyebrow ${environment?.tone || ''}`}><ShieldCheck size={15} /> Kondisi lingkungan</div>
        <h3>{loading ? 'Memuat data…' : environment?.label || 'Data terbatas'}</h3>
        <p>Skor LangitNusa berdasarkan PM2.5 BMKG dan kondisi cuaca di lokasi terpilih.</p>
      </div>
    </div>

    <div className="environment-metrics">
      <div className="environment-metric">
        <span>PM2.5</span>
        <strong>{loading ? '—' : Number.isFinite(Number(airQuality?.pm25)) ? `${airQuality.pm25.toFixed(1)} µg/m³` : '—'}</strong>
        <small className={pm.tone}>{pm.label}{airQuality?.station ? ` · ${airQuality.station}` : ''}</small>
      </div>
      <div className="environment-metric">
        <span>Suhu</span>
        <strong>{weather?.t != null ? `${weather.t}°` : '—'}</strong>
        <small>{weather?.hu != null ? `Kelembapan ${weather.hu}%` : 'Data cuaca BMKG'}</small>
      </div>
      <div className="environment-metric">
        <span>Angin</span>
        <strong>{weather?.ws != null ? `${weather.ws} km/j` : '—'}</strong>
        <small>{weather?.wd || 'Data cuaca BMKG'}</small>
      </div>
      <div className="environment-metric">
        <span>Pembaruan</span>
        <strong>{airQuality?.updatedAt || '—'}</strong>
        <small>{airQuality?.distanceKm != null ? `Stasiun ±${airQuality.distanceKm} km` : 'BMKG'}</small>
      </div>
    </div>

    <div className="environment-air-source">
      <div>
        <div className="env-eyebrow"><Wind size={15} /> Kualitas udara</div>
        <p>PM2.5 diambil dari pemantauan BMKG pada stasiun terdekat yang tersedia. Nilai dan kategori mengikuti data BMKG.</p>
      </div>
      <a className="env-source" href="https://www.bmkg.go.id/kualitas-udara/pm25" target="_blank" rel="noreferrer">
        Lihat pemantauan BMKG <ExternalLink size={13} />
      </a>
    </div>

    <div className="activity-block">
      <div className="activity-heading">
        <div>
          <div className="env-eyebrow">Kesiapan aktivitas</div>
          <p>Berdasarkan kualitas udara dan kondisi cuaca saat ini.</p>
        </div>
      </div>
      <div className="activity-list">
        {rows.map(({ icon: Icon, name, status }) => <div className="activity-row" key={name}>
          <div className="activity-icon"><Icon size={18} /></div>
          <div className="activity-copy"><strong>{name}</strong><b className={statusClass(status)}>{status}</b></div>
        </div>)}
      </div>
    </div>
  </section>
}

function statusClass(status) {
  if (/baik|aman/i.test(status)) return 'good'
  if (/hindari|dalam ruangan|tutup/i.test(status)) return 'bad'
  return 'warn'
}
