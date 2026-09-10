import {X} from 'lucide-react'
const items=[['overview','Ringkasan'],['weather','Cuaca'],['earthquake','Gempa bumi'],['air','Kualitas udara'],['volcano','Aktivitas gunung'],['map','Peta sebaran'],['warning','Peringatan dini']]
export default function Sidebar({open,onClose,active,onNavigate}){return <>
 <aside className={`sidebar ${open?'open':''}`}>
  <div className="mobile-close"><button className="icon-btn" onClick={onClose}><X size={20}/></button></div>
  <div className="logo">Langit<span>Nusa</span></div>
  <nav>{items.map(([id,label])=><button key={id} className={active===id?'active':''} onClick={()=>{onNavigate(id);onClose()}}>{label}</button>)}</nav>
  <div className="sidebar-bottom">Data terbuka BMKG<br/>Default lokasi · DKI Jakarta</div>
 </aside>
 <div className={`backdrop ${open?'show':''}`} onClick={onClose}/>
 </>}
