import { ExternalLink, Mountain } from 'lucide-react'
import { SectionHead } from './Weather'

const NEARBY = {
  'DKI Jakarta': [
    ['Gunung Gede', 'Jawa Barat', 'Sekitar kawasan Jabodetabek'],
    ['Gunung Salak', 'Jawa Barat', 'Sekitar kawasan Jabodetabek']
  ]
}

export default function Volcano({ location }) {
  const items = NEARBY[location?.province] || [['Gunung api terdekat', 'Indonesia', 'Lokasi bergantung wilayah terpilih'], ['Gunung api regional', 'Indonesia', 'Status perlu diverifikasi']]
  return <section className="section" id="volcano">
    <SectionHead title="Aktivitas gunung terdekat" note={location?.province || 'Wilayah terpilih'} />
    <div className="grid2">{items.map(([name, region, note]) => <div className="simple" key={name}>
      <Mountain size={18} className="simple-icon" /><h3>{name}</h3><small>{region} · {note}</small><span className="badge">Cek status resmi</span>
    </div>)}</div>
    <div className="source-note">Status gunung api ditampilkan sebagai konteks lokasi, bukan data live BMKG. Verifikasi aktivitas vulkanik melalui PVMBG/MAGMA sebelum mengambil keputusan.<a href="https://magma.esdm.go.id/" target="_blank" rel="noreferrer">Buka MAGMA Indonesia <ExternalLink size={13} /></a></div>
  </section>
}
