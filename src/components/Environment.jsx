import { ExternalLink, Wind, ShieldCheck } from 'lucide-react'
import { SectionHead } from './Weather'

export default function Environment({ activity }) {
  return <section className="section" id="air">
    <SectionHead title="Kondisi lingkungan" note="Pemantauan & interpretasi aplikasi" />
    <div className="environment">
      <div className="env"><div className="env-title">Kualitas udara · PM2.5</div><div className="env-value">Pantau resmi</div><div className="env-meta">BMKG menyediakan pemantauan PM2.5. LangitNusa tidak mengarang angka ketika endpoint lokasi publik yang stabil belum tersedia.</div><a href="https://www.bmkg.go.id/kualitas-udara/pm25" target="_blank" rel="noreferrer">Buka pemantauan PM2.5 <ExternalLink size={13} /></a></div>
      <div className="env"><div className="env-title">Kesiapan aktivitas</div><div className={`env-value ${activity.tone}`}>{activity.label}</div><div className={`env-meta ${activity.tone}`}>{activity.detail}</div><div className="env-foot"><ShieldCheck size={15} /> Interpretasi aplikasi, bukan indeks resmi BMKG.</div></div>
    </div>
  </section>
}
