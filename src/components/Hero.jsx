import { Search, LocateFixed, MapPin, LoaderCircle } from 'lucide-react'

const levelLabel = {
  city: 'Kota/Kabupaten',
  district: 'Kecamatan',
  village: 'Kelurahan/Desa'
}

export default function Hero({ location, query, setQuery, onSearch, onPick, suggestions, searching }) {
  return <section className="hero" id="overview">
    <div className="bmkg-mark" aria-hidden="true">{Array.from({ length: 8 }).map((_, i) => <i key={i} style={{ transform: `rotate(${i * 22.5}deg)` }} />)}</div>
    <h1>Melihat Indonesia dari langit dan bumi.</h1>
    <p>Cuaca, gempa, kualitas lingkungan, dan peringatan alam dalam satu ruang yang tenang untuk dibaca.</p>
    <div className="prompt">
      <div className="prompt-label">Cari kota atau kabupaten di Indonesia</div>
      <div className="prompt-row">
        <Search size={18} />
        <input aria-label="Cari wilayah Indonesia" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onSearch()} placeholder="Cari kota atau kabupaten..." autoComplete="off" />
        <button onClick={onSearch}>Cari lokasi</button>
      </div>
      {(searching || suggestions.length > 0) && <div className="suggestions" role="listbox">
        {searching && <div className="suggestion muted"><LoaderCircle className="spin" size={15} /> Mencari wilayah…</div>}
        {!searching && suggestions.map((item) => <button className="suggestion" key={`${item.level}-${item.code}`} onClick={() => onPick(item)} role="option">
          <MapPin size={15} />
          <span>
            <b>{item.name}</b>
            <small>{levelLabel[item.level] || 'Wilayah'} · {item.cityLabel || item.city} · {item.province}</small>
          </span>
        </button>)}
        {!searching && !suggestions.length && query.trim().length >= 2 && <div className="suggestion muted">Wilayah tidak ditemukan.</div>}
      </div>}
      <div className="quick">
        <button onClick={() => onPick('Bandung')}>Bandung</button>
        <button onClick={() => onPick('Kemayoran')}>Kemayoran</button>
        <button onClick={() => onPick('Cilandak')}>Cilandak</button>
        <button onClick={() => onPick('Kebayoran Baru')}>Kebayoran Baru</button>
        <button className="locate" onClick={() => onPick(location)}><LocateFixed size={13} /> {location.name}</button>
      </div>
    </div>
  </section>
}
