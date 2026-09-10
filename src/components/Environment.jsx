import { ExternalLink, Wind, Footprints, Bike, Users, Sun } from 'lucide-react'
import { SectionHead } from './Weather'

function activityRows(activity) {
  const base = activity?.tone === 'warn'
    ? 'Kurang ideal'
    : activity?.tone === 'good'
      ? 'Cukup baik'
      : 'Perhatikan kondisi'
  const detail = activity?.detail || 'Berdasarkan kondisi prakiraan cuaca saat ini.'
  return [
    { icon: Footprints, name: 'Jalan santai', status: base, detail },
    { icon: Bike, name: 'Bersepeda', status: base, detail },
    { icon: Users, name: 'Anak & lansia', status: activity?.tone === 'warn' ? 'Perhatikan kondisi' : 'Cukup baik', detail: 'Pertimbangkan suhu, hujan, dan kondisi udara.' },
    { icon: Sun, name: 'Aktivitas luar ruang', status: base, detail },
  ]
}

export default function Environment({ activity }) {
  const rows = activityRows(activity)
  return <section className="section" id="air">
    <SectionHead title="Kondisi lingkungan" note="Udara & kesiapan aktivitas" />
    <p className="environment-intro">Gambaran kondisi yang dapat memengaruhi aktivitas di luar ruangan.</p>

    <div className="environment-air">
      <div>
        <div className="env-eyebrow"><Wind size={15} /> Kualitas udara</div>
        <h3>PM2.5</h3>
        <p>Data pemantauan resmi BMKG tersedia melalui halaman kualitas udara. Nilai lokal tidak ditampilkan jika endpoint publik yang stabil belum tersedia.</p>
      </div>
      <a className="env-source" href="https://www.bmkg.go.id/kualitas-udara/pm25" target="_blank" rel="noreferrer">
        Lihat pemantauan PM2.5 <ExternalLink size={13} />
      </a>
    </div>

    <div className="activity-block">
      <div className="activity-heading">
        <div>
          <div className="env-eyebrow">Kesiapan aktivitas</div>
          <p>Berdasarkan kondisi cuaca saat ini di lokasi yang dipilih.</p>
        </div>
        <span>{activity?.label || 'Memuat'}</span>
      </div>
      <div className="activity-list">
        {rows.map(({ icon: Icon, name, status, detail }) => <div className="activity-row" key={name}>
          <div className="activity-icon"><Icon size={18} /></div>
          <div className="activity-copy"><strong>{name}</strong><b className={activity?.tone || ''}>{status}</b><small>{detail}</small></div>
        </div>)}
      </div>
    </div>
  </section>
}
