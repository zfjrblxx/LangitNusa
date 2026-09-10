import {useEffect,useMemo,useState} from 'react'
import {Menu,SunMoon,Activity,ExternalLink} from 'lucide-react'
import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import Weather from './components/Weather'
import Environment from './components/Environment'
import Earthquake from './components/Earthquake'
import Volcano from './components/Volcano'
import MapPanel from './components/MapPanel'
import Warning from './components/Warning'
import {DEFAULT_LOCATION,findLocation} from './utils/locations'
import {getWeather,getLatestEarthquake,getWarnings} from './services/bmkg'
import {activityScore} from './utils/format'

export default function App(){
 const [location,setLocation]=useState(DEFAULT_LOCATION);const [query,setQuery]=useState(DEFAULT_LOCATION.name);const [weather,setWeather]=useState(null);const [quake,setQuake]=useState(null);const [warnings,setWarnings]=useState('');const [loadingWeather,setLoadingWeather]=useState(true);const [loadingQuake,setLoadingQuake]=useState(true);const [loadingWarnings,setLoadingWarnings]=useState(true);const [weatherError,setWeatherError]=useState(false);const [open,setOpen]=useState(false);const [active,setActive]=useState('overview');const [dark,setDark]=useState(()=>localStorage.getItem('bmkg-theme')==='dark');
 useEffect(()=>{document.documentElement.dataset.theme=dark?'dark':'';localStorage.setItem('bmkg-theme',dark?'dark':'light')},[dark])
 useEffect(()=>{const fn=()=>setOpen(x=>!x);document.addEventListener('bmkg:menu',fn);return()=>document.removeEventListener('bmkg:menu',fn)},[])
 useEffect(()=>{let live=true;setLoadingWeather(true);setWeatherError(false);getWeather(location.code).then(d=>{if(live)setWeather(normalizeWeather(d))}).catch(()=>live&&setWeatherError(true)).finally(()=>live&&setLoadingWeather(false));return()=>{live=false}},[location])
 useEffect(()=>{let live=true;getLatestEarthquake().then(d=>live&&setQuake(d)).catch(()=>{}).finally(()=>live&&setLoadingQuake(false));getWarnings().then(x=>live&&setWarnings(x)).catch(()=>{}).finally(()=>live&&setLoadingWarnings(false));return()=>{live=false}},[])
 const activity=useMemo(()=>activityScore(weather?.items?.slice(0,6)||[]),[weather])
 const choose=(name)=>{const hit=findLocation(name);if(hit){setLocation(hit);setQuery(hit.name);setActive('weather');document.getElementById('weather')?.scrollIntoView({behavior:'smooth'})}}
 const search=()=>{const hit=findLocation(query);if(hit)choose(hit.name);else alert('Coba: Gambir, Kemayoran, Cilandak, Kebayoran Baru, Menteng, atau Tebet.')}
 const nav=(id)=>{setActive(id);document.getElementById(id)?.scrollIntoView({behavior:'smooth'})}
 return <><Sidebar open={open} onClose={()=>setOpen(false)} active={active} onNavigate={nav} dark={dark} onTheme={()=>setDark(x=>!x)}/>
 <main className="main"><header className="top"><button className="icon-btn top-menu" onClick={()=>setOpen(true)}><Menu size={21}/></button><div className="top-location">{location.city} · {location.name}</div><button className="icon-btn" onClick={()=>setDark(x=>!x)}><SunMoon size={19}/></button></header>
 <div className="content"><Hero location={location} query={query} setQuery={setQuery} onSearch={search} onPick={choose}/><Weather data={weather} location={location} loading={loadingWeather} error={weatherError}/><Environment activity={activity}/><Earthquake quake={quake} loading={loadingQuake}/><Volcano/><MapPanel location={location} quake={quake}/><Warning xml={warnings} loading={loadingWarnings}/><Latest quake={quake} location={location}/><footer><strong>BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)</strong><br/>Aplikasi ini adalah proyek independen yang memanfaatkan Data Terbuka BMKG. Gunakan kanal resmi BMKG untuk informasi keselamatan dan keputusan penting. <a href="https://data.bmkg.go.id/" target="_blank" rel="noreferrer">Data Terbuka BMKG <ExternalLink size={12}/></a></footer></div></main></>
}
function normalizeWeather(d){const groups=d?.data?.[0]?.cuaca||[];return {location:d?.lokasi||d?.data?.[0]?.lokasi,items:groups.flat()}}
function Latest({quake,location}){const g=quake?.Infogempa?.gempa;return <section className="section"><div className="section-head"><h2>Aktivitas terbaru</h2><span>Ringkasan</span></div><div className="latest"><div className="latest-row"><span className="latest-title"><Activity size={16}/> Gempa bumi · {g?`M ${g.Magnitude}`:'—'}</span><small>{g?.Wilayah||'Belum tersedia'} · {g?.Tanggal||''} {g?.Jam||''}</small></div><div className="latest-row"><span className="latest-title"><Activity size={16}/> Kondisi cuaca</span><small>{location.city} · {location.name}</small></div><div className="latest-row"><span className="latest-title"><Activity size={16}/> Pemantauan lingkungan</span><small>PM2.5 · BMKG</small></div></div></section>}
