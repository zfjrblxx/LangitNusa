import { useEffect, useState } from 'react'
import { ExternalLink, Mountain, MapPin, ShieldCheck, ShieldAlert, ChevronRight } from 'lucide-react'
import { SectionHead } from './Weather'

function formatDistance(value) {
  if (!Number.isFinite(value)) return '—'
  return value < 10 ? `${value.toFixed(1)} km` : `${Math.round(value)} km`
}

function statusClass(level) {
  if (level === 4) return 'danger'
  if (level === 3) return 'danger'
  if (level === 2) return 'warn'
  if (level === 1) return 'normal'
  return 'neutral'
}

export default function Volcano({ location }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let live = true
    setLoading(true)
    fetch(`/api/volcanoes?lat=${encodeURIComponent(location?.lat)}&lon=${encodeURIComponent(location?.lon)}&_=${Date.now()}`, { cache: 'no-store' })
      .then((r) => { if (!r.ok) throw new Error('MAGMA unavailable'); return r.json() })
      .then((d) => { if (live) setData(d) })
      .catch(() => { if (live) setData(null) })
      .finally(() => { if (live) setLoading(false) })
    return () => { live = false }
  }, [location?.lat, location?.lon])

  const volcano = data?.items?.[0]
  const status = volcano?.status
  const statusText = status?.label || 'Belum terbaca'
  const statusTone = statusClass(status?.level)

  return <section className="section" id="volcano">
    <SectionHead title="Aktivitas gunung terdekat" note={[location?.city, location?.province].filter(Boolean).join(' · ') || 'Wilayah terpilih'} />
    <div className="volcano-panel">
      <div className="volcano-panel-head">
        <div className="volcano-brand">
          <span className="volcano-mark"><Mountain size={20} /></span>
          <div><strong>Aktivitas Gunung Api</strong><small>Data resmi PVMBG · MAGMA ESDM</small></div>
        </div>
        <span className={`volcano-level ${statusTone}`}>{loading ? 'Memuat…' : status?.level ? `LEVEL ${status.level} · ${statusText}` : statusText}</span>
      </div>

      {loading ? <div className="volcano-loading">Mengambil status aktivitas dari MAGMA Indonesia…</div> : volcano ? <>
        <div className="volcano-feature">
          <div className="volcano-feature-main">
            <div className="volcano-name-row"><h3>Gunung {volcano.name}</h3><span>{volcano.elevation.toLocaleString('id-ID')} mdpl</span></div>
            <p>{volcano.region} · {volcano.type}</p>
            <div className="volcano-distance-line"><MapPin size={15} /> <strong>{formatDistance(volcano.distance)}</strong> dari lokasi terpilih</div>
          </div>
          <div className="volcano-recommendation">
            <span>STATUS & INFORMASI</span>
            <strong>{statusText === 'Normal' ? 'Aktivitas berada pada Level I (Normal).' : `Status saat ini: Level ${status?.level || '—'} · ${statusText}.`}</strong>
            <small>Gunakan informasi dan rekomendasi resmi PVMBG sebagai acuan keselamatan.</small>
          </div>
        </div>

        <div className="volcano-bottom">
          <div className="volcano-safe"><ShieldCheck size={16} /> <span>{Number.isFinite(volcano.distance) ? `Lokasi Anda sekitar ${formatDistance(volcano.distance)} dari ${volcano.name}.` : 'Jarak lokasi belum tersedia.'}</span></div>
          <a className="volcano-all" href="https://magma.esdm.go.id/" target="_blank" rel="noreferrer">Buka MAGMA Indonesia <ChevronRight size={16} /></a>
        </div>
      </> : <div className="volcano-empty"><ShieldAlert size={18} /> Data aktivitas gunung belum tersedia. <a href="https://magma.esdm.go.id/" target="_blank" rel="noreferrer">Cek MAGMA <ExternalLink size={13} /></a></div>}
    </div>
  </section>
}
