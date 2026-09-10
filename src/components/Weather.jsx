import {Cloud, Wind, Droplets, Eye, CloudSun} from 'lucide-react'
import {timeWIB,weatherIcon,activityScore} from '../utils/format'
export default function Weather({data,location,loading,error}){
 const items=data?.items||[];const first=items[0];const score=activityScore(items.slice(0,6));
 return <>
 <section className="section" id="weather"><SectionHead title="Kondisi saat ini" note={loading?'Memuat data BMKG…':`Prakiraan ${location.name} · ${timeWIB(first?.local_datetime)}`}/>
  <div className="current">
   <div className="current-main">{error?<div className="error">Data cuaca sementara tidak tersedia.</div>:<><div className="place">{location.city} · {location.name}</div><div className="temp">{first?.t??'—'}°</div><div className="weather-name">{first?.weather_desc||'Memuat cuaca…'}</div><div className="stats"><Stat icon={<Droplets/>} value={first?.hu!=null?`${first.hu}%`:'—'} label="Kelembapan"/><Stat icon={<Wind/>} value={first?.ws!=null?`${first.ws} km/j`:'—'} label="Angin"/><Stat icon={<Eye/>} value={first?.vs_text||'—'} label="Visibilitas"/><Stat icon={<Cloud/>} value={first?.tcc!=null?`${first.tcc}%`:'—'} label="Awan"/></div></>}</div>
   <div className="current-side"><div className="kicker">Kesiapan aktivitas</div><div className={`status-big ${score.tone}`}>{score.label}</div><p>{score.detail}</p></div>
  </div>
 </section>
 <section className="section"><SectionHead title="Prakiraan cuaca" note="Beberapa jam ke depan · BMKG"/><div className="forecast">{items.slice(0,6).map((x,i)=><div className="forecast-item" key={`${x.local_datetime}-${i}`}><span>{timeWIB(x.local_datetime)}</span><strong>{weatherIcon(x.weather_desc)}</strong><b>{x.t??'—'}°</b><small>{x.weather_desc||'—'}</small></div>)}</div></section>
 </>}
function Stat({icon,value,label}){return <div className="stat"><span>{icon}</span><b>{value}</b><small>{label}</small></div>}
function SectionHead({title,note}){return <div className="section-head"><h2>{title}</h2><span>{note}</span></div>}
export {SectionHead}
