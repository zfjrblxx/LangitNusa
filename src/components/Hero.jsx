import {Search, LocateFixed} from 'lucide-react'
export default function Hero({location,query,setQuery,onSearch,onPick}){return <section className="hero" id="overview">
 <div className="bmkg-mark" aria-hidden="true">{Array.from({length:8}).map((_,i)=><i key={i} style={{transform:`rotate(${i*22.5}deg)`}}/>)}</div>
 <h1>Melihat Indonesia dari langit dan bumi.</h1>
 <p>Cuaca, kualitas udara, gempa, dan peringatan alam dalam satu ruang yang tenang untuk dibaca.</p>
 <div className="prompt">
  <div className="prompt-label">Pilih wilayah</div>
  <div className="prompt-row"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&onSearch()} placeholder="Cari kecamatan atau kelurahan..."/><button onClick={onSearch}>Cari lokasi</button></div>
  <div className="quick"><button onClick={()=>onPick('Gambir')}>Gambir</button><button onClick={()=>onPick('Kemayoran')}>Kemayoran</button><button onClick={()=>onPick('Cilandak')}>Cilandak</button><button onClick={()=>onPick('Kebayoran Baru')}>Kebayoran Baru</button><button className="locate" onClick={()=>onPick('Gambir')}><LocateFixed size={13}/> DKI Jakarta</button></div>
 </div>
 </section>}
