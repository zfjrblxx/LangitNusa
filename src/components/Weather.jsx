import { Cloud, Wind, Droplets, Eye, Umbrella, Gauge } from 'lucide-react'
import { timeWIB, weatherIcon, activityScore } from '../utils/format'

export default function Weather({ data, location, loading, error }) {
  const items = data?.items || []
  const first = items[0]
  const score = activityScore(items.slice(0, 8))
  return <>
    <section className="section" id="weather">
      <SectionHead title="Kondisi saat ini" note={loading ? 'Memuat data Open-Meteo…' : `${location.name} · ${timeWIB(first?.local_datetime)}`} />
      <div className="current">
        <div className="current-main">
          {error ? <div className="error">Data cuaca sementara tidak tersedia. Coba perbarui data.</div> : <>
            <div className="place">{location.province || location.city} · {location.name}</div>
            <div className="temp">{first?.t ?? '—'}°</div>
            <div className="weather-name">{first?.weather_desc || (loading ? 'Memuat cuaca…' : 'Data belum tersedia')}</div>
            <div className="stats">
              <Stat icon={<Droplets />} value={first?.hu != null ? `${first.hu}%` : '—'} label="Kelembapan" />
              <Stat icon={<Wind />} value={first?.ws != null ? `${first.ws} km/j` : '—'} label="Angin" />
              <Stat icon={<Eye />} value={first?.vs_text || '—'} label="Visibilitas" />
              <Stat icon={<Cloud />} value={first?.tcc != null ? `${first.tcc}%` : '—'} label="Awan" />
              <Stat icon={<Umbrella />} value={first?.tp != null ? `${first.tp} mm` : '—'} label="Hujan" />
              <Stat icon={<Gauge />} value={first?.wd || '—'} label="Arah angin" />
            </div>
          </>}
        </div>
        <div className="current-side"><div className="kicker">Kesiapan aktivitas</div><div className={`status-big ${score.tone}`}>{score.label}</div><p>{score.detail}</p></div>
      </div>
    </section>
    <section className="section" id="forecast">
      <SectionHead title="Prakiraan cuaca" note="Per 3 jam · Open-Meteo" />
      <div className="forecast">{items.slice(0, 8).map((x, i) => <div className="forecast-item" key={`${x.local_datetime}-${i}`}>
        <span>{timeWIB(x.local_datetime)}</span><strong>{weatherIcon(x.weather_desc)}</strong><b>{x.t ?? '—'}°</b><small>{x.weather_desc || '—'}</small>
        <em>{x.tp != null ? `${x.tp} mm` : '—'}</em>
      </div>)}</div>
      {!loading && !items.length && <div className="empty-line">Belum ada prakiraan yang dapat ditampilkan.</div>}
    </section>
  </>
}

function Stat({ icon, value, label }) { return <div className="stat"><span>{icon}</span><b>{value}</b><small>{label}</small></div> }
function SectionHead({ title, note }) { return <div className="section-head"><h2>{title}</h2><span>{note}</span></div> }
export { SectionHead }
