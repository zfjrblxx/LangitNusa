import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

const items = [
  ['overview', 'Ringkasan'], ['weather', 'Cuaca'], ['forecast', 'Prakiraan'], ['air', 'Kualitas udara'], ['volcano', 'Gunung api'], ['earthquake', 'Gempa bumi'],
  ['map', 'Peta sebaran'], ['warning', 'Peringatan dini'], ['latest', 'Aktivitas terbaru'], ['about-data', 'Tentang data']
]

export default function Sidebar({ open, onClose, active, onNavigate }) {
  const mobileActiveRef = useRef(null)

  useEffect(() => {
    mobileActiveRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [active])

  return <>
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="mobile-close"><button className="icon-btn" onClick={onClose} aria-label="Tutup menu"><X size={20} /></button></div>
      <div className="logo">Langit<span>Nusa</span></div>
      <nav aria-label="Navigasi utama">{items.map(([id, label]) => <button key={id} className={active === id ? 'active' : ''} onClick={() => { onNavigate(id); onClose() }}>{label}</button>)}</nav>
      <div className="sidebar-bottom">Sumber: BMKG & Open-Meteo<br />Default · Jawa Barat — Kota Bandung</div>
    </aside>
    <div className={`backdrop ${open ? 'show' : ''}`} onClick={onClose} />
    <nav className="mobile-nav" aria-label="Navigasi utama mobile">
      {items.map(([id, label]) => (
        <button
          key={id}
          ref={active === id ? mobileActiveRef : null}
          className={active === id ? 'active' : ''}
          onClick={() => onNavigate(id)}
        >
          {label}
        </button>
      ))}
    </nav>
  </>
}
