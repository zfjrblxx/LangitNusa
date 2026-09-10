import { ExternalLink, Mountain, MapPin, Ruler, ArrowUp, ShieldAlert } from 'lucide-react'
import { SectionHead } from './Weather'

const VOLCANOES = [
  ['Gunung Gede', 'Jawa Barat', 2958, -6.78, 106.98, 'Stratovolcano', 'Cianjur · Sukabumi · Bogor'],
  ['Gunung Salak', 'Jawa Barat', 2211, -6.72, 106.73, 'Stratovolcano', 'Bogor · Sukabumi'],
  ['Gunung Tangkuban Parahu', 'Jawa Barat', 2084, -6.77, 107.60, 'Stratovolcano', 'Bandung Barat · Subang'],
  ['Gunung Papandayan', 'Jawa Barat', 2665, -7.32, 107.73, 'Stratovolcano', 'Garut'],
  ['Gunung Ciremai', 'Jawa Barat', 3078, -6.89, 108.41, 'Stratovolcano', 'Kuningan · Majalengka · Cirebon'],
  ['Gunung Merapi', 'Jawa Tengah · DI Yogyakarta', 2968, -7.54, 110.45, 'Stratovolcano', 'Sleman · Magelang · Boyolali · Klaten'],
  ['Gunung Slamet', 'Jawa Tengah', 3428, -7.24, 109.21, 'Stratovolcano', 'Banyumas · Brebes · Purbalingga'],
  ['Gunung Sumbing', 'Jawa Tengah', 3371, -7.38, 110.07, 'Stratovolcano', 'Magelang · Temanggung · Wonosobo'],
  ['Gunung Sindoro', 'Jawa Tengah', 3136, -7.30, 109.99, 'Stratovolcano', 'Temanggung · Wonosobo'],
  ['Gunung Lawu', 'Jawa Tengah · Jawa Timur', 3265, -7.63, 111.19, 'Stratovolcano', 'Karanganyar · Magetan · Ngawi'],
  ['Gunung Kelud', 'Jawa Timur', 1731, -7.93, 112.31, 'Stratovolcano', 'Kediri · Blitar · Malang'],
  ['Gunung Bromo', 'Jawa Timur', 2329, -7.94, 112.95, 'Stratovolcano', 'Probolinggo · Pasuruan · Malang · Lumajang'],
  ['Gunung Semeru', 'Jawa Timur', 3676, -8.11, 112.92, 'Stratovolcano', 'Lumajang · Malang'],
  ['Gunung Raung', 'Jawa Timur', 3332, -8.13, 114.04, 'Stratovolcano', 'Banyuwangi · Bondowoso · Jember'],
  ['Gunung Ijen', 'Jawa Timur', 2769, -8.06, 114.24, 'Kompleks kaldera', 'Banyuwangi · Bondowoso'],
  ['Gunung Agung', 'Bali', 3031, -8.34, 115.51, 'Stratovolcano', 'Karangasem · Bali Timur'],
  ['Gunung Batur', 'Bali', 1717, -8.24, 115.38, 'Stratovolcano', 'Bangli · Kintamani'],
  ['Gunung Rinjani', 'Nusa Tenggara Barat', 3726, -8.41, 116.46, 'Stratovolcano', 'Lombok Utara · Lombok Timur · Lombok Tengah'],
  ['Gunung Tambora', 'Nusa Tenggara Barat', 2850, -8.25, 118.00, 'Stratovolcano', 'Dompu · Bima'],
  ['Gunung Sangeang Api', 'Nusa Tenggara Barat', 1949, -8.20, 118.99, 'Stratovolcano', 'Bima'],
  ['Gunung Inerie', 'Nusa Tenggara Timur', 2245, -8.83, 120.98, 'Stratovolcano', 'Ngada'],
  ['Gunung Egon', 'Nusa Tenggara Timur', 1703, -8.67, 122.46, 'Stratovolcano', 'Sikka'],
  ['Gunung Lewotobi Laki-laki', 'Nusa Tenggara Timur', 1584, -8.56, 122.78, 'Stratovolcano', 'Flores Timur'],
  ['Gunung Lewotolok', 'Nusa Tenggara Timur', 1423, -8.27, 123.51, 'Stratovolcano', 'Lembata'],
  ['Gunung Rokatenda', 'Nusa Tenggara Timur', 875, -8.32, 121.71, 'Stratovolcano', 'Sikka · Ende'],
  ['Gunung Kerinci', 'Jambi · Sumatera Barat', 3805, -1.70, 101.26, 'Stratovolcano', 'Kerinci · Solok Selatan'],
  ['Gunung Marapi', 'Sumatera Barat', 2891, -0.38, 100.47, 'Stratovolcano', 'Agam · Tanah Datar'],
  ['Gunung Talang', 'Sumatera Barat', 2597, -0.98, 100.68, 'Stratovolcano', 'Solok'],
  ['Gunung Dempo', 'Sumatera Selatan', 3173, -4.03, 103.12, 'Stratovolcano', 'Pagar Alam · Lahat'],
  ['Gunung Anak Krakatau', 'Banten · Lampung', 157, -6.10, 105.42, 'Gunung api pulau', 'Selat Sunda'],
  ['Gunung Soputan', 'Sulawesi Utara', 1784, 1.11, 124.73, 'Stratovolcano', 'Minahasa Selatan · Minahasa Tenggara'],
  ['Gunung Lokon', 'Sulawesi Utara', 1580, 1.36, 124.79, 'Stratovolcano', 'Tomohon · Minahasa'],
  ['Gunung Gamalama', 'Maluku Utara', 1715, 0.80, 127.33, 'Stratovolcano', 'Ternate'],
  ['Gunung Ibu', 'Maluku Utara', 1325, 1.49, 127.63, 'Stratovolcano', 'Halmahera Barat'],
  ['Gunung Dukono', 'Maluku Utara', 1229, 1.69, 127.89, 'Stratovolcano', 'Halmahera Utara']
]

const toVolcano = ([name, region, elevation, lat, lon, type, area]) => ({ name, region, elevation, lat, lon, type, area })
const DATA = VOLCANOES.map(toVolcano)

function distanceKm(lat1, lon1, lat2, lon2) {
  const toRad = (n) => n * Math.PI / 180
  const a = Math.sin(toRad(lat2 - lat1) / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(toRad(lon2 - lon1) / 2) ** 2
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function nearestVolcanoes(location) {
  const lat = Number(location?.lat)
  const lon = Number(location?.lon)
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return DATA.slice(0, 2).map((v) => ({ ...v, distance: null }))
  return DATA
    .map((v) => ({ ...v, distance: distanceKm(lat, lon, v.lat, v.lon) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 2)
}

function formatDistance(value) {
  if (!Number.isFinite(value)) return '—'
  if (value < 10) return `${value.toFixed(1)} km`
  return `${Math.round(value)} km`
}

export default function Volcano({ location }) {
  const items = nearestVolcanoes(location)
  const place = [location?.name, location?.city, location?.province].filter(Boolean).join(' · ')

  return <section className="section" id="volcano">
    <SectionHead title="Aktivitas gunung terdekat" note={place || 'Wilayah terpilih'} />
    <p className="volcano-intro">Gunung api terdekat dihitung dari koordinat lokasi yang dipilih. Jarak adalah perkiraan garis lurus, bukan jarak perjalanan.</p>

    <div className="volcano-list">
      {items.map((v) => <article className="volcano-card" key={v.name}>
        <div className="volcano-head">
          <div className="volcano-icon"><Mountain size={21} /></div>
          <div>
            <h3>{v.name}</h3>
            <p>{v.region}</p>
          </div>
          <div className="volcano-distance"><Ruler size={14} /> {formatDistance(v.distance)}</div>
        </div>

        <div className="volcano-stats">
          <div><span><ArrowUp size={13} /> Ketinggian</span><strong>{v.elevation.toLocaleString('id-ID')} mdpl</strong></div>
          <div><span><Mountain size={13} /> Tipe</span><strong>{v.type}</strong></div>
          <div><span><MapPin size={13} /> Kawasan</span><strong>{v.area}</strong></div>
        </div>

        <div className="volcano-status">
          <ShieldAlert size={16} />
          <div><span>Status aktivitas</span><strong>Perlu verifikasi resmi</strong><small>LangitNusa tidak menampilkan level aktivitas tanpa sumber status vulkanik resmi yang terverifikasi.</small></div>
        </div>

        <a className="volcano-link" href="https://magma.esdm.go.id/" target="_blank" rel="noreferrer">Lihat aktivitas resmi <ExternalLink size={13} /></a>
      </article>)}
    </div>

    <div className="source-note volcano-source">Informasi gunung di bagian ini merupakan konteks geografis untuk lokasi terpilih, bukan data aktivitas live BMKG. Status, rekomendasi keselamatan, dan level aktivitas harus diverifikasi melalui PVMBG/MAGMA Indonesia.<a href="https://magma.esdm.go.id/" target="_blank" rel="noreferrer">Buka MAGMA Indonesia <ExternalLink size={13} /></a></div>
  </section>
}
