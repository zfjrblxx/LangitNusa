
import { timeWIB, weatherIcon, activityScore } from '../utils/format'

export default function Weather({ data, location, loading, error, readiness }) {
  const items = data?.items || []
  const first = items[0]
  const score = readiness || activityScore(items.slice(0, 8))
  return <>
    <section className="section" id="weather">
      <SectionHead title="Kondisi saat ini" note={loading ? 'Memuat data Open-Meteo…' : `${location.name} · ${timeWIB(first?.local_datetime)}`} />
      <div className="current">
        <div className="current-main">
          {error ? <div className="error">Data cuaca sementara tidak tersedia. Coba perbarui data.</div> : <>
            <div className="place">{location.province || location.city} · {location.name}</div>
            <div className="temp">{first?.t ?? '—'}°</div>
            <div className="weather-name">{first?.weather_desc || (loading ? 'Memuat cuaca…' : 'Data belum tersedia')}</div>
            <div className="current-stats">
              <div><span>Kelembapan</span><b>{first?.hu != null ? `${first.hu}%` : '—'}</b></div>
              <div><span>Angin</span><b>{first?.ws != null ? `${first.ws} km/j` : '—'}</b></div>
              <div><span>Tekanan</span><b>{first?.pressure != null ? `${Math.round(first.pressure)} hPa` : '—'}</b></div>
            </div>
          </>}
        </div>
        <div className="current-side"><div className="kicker">Kesiapan aktivitas</div><div className={`status-big ${score?.tone || 'neutral'}`}>{score?.label || '—'}</div><p>{score?.detail || 'Menunggu data cuaca dan kualitas udara.'}</p></div>
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

function SectionHead({ title, note }) { return <div className="section-head"><h2>{title}</h2><span>{note}</span></div> }
export { SectionHead }
