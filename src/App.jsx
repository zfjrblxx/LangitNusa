import { useEffect, useMemo, useState } from 'react'
import { Menu, SunMoon, Activity, ExternalLink, Search, RefreshCw } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import Weather from './components/Weather'
import Environment from './components/Environment'
import Earthquake from './components/Earthquake'
import Volcano from './components/Volcano'
import MapPanel from './components/MapPanel'
import Warning from './components/Warning'
import AboutData from './components/AboutData'
import { DEFAULT_LOCATION, findLocation } from './utils/locations'
import { getWeather, getLatestEarthquake, getEarthquakes, getWarnings, searchLocations, getAirQuality } from './services/bmkg'
import { activityScore } from './utils/format'
import { environmentScore, scoreInfo, activityFromEnvironment } from './utils/environment'

export default function App() {
  const [location, setLocation] = useState(DEFAULT_LOCATION)
  const [query, setQuery] = useState(DEFAULT_LOCATION.name)
  const [suggestions, setSuggestions] = useState([])
  const [searching, setSearching] = useState(false)
  const [weather, setWeather] = useState(null)
  const [airQuality, setAirQuality] = useState(null)
  const [loadingAir, setLoadingAir] = useState(true)
  const [quake, setQuake] = useState(null)
  const [earthquakes, setEarthquakes] = useState([])
  const [warnings, setWarnings] = useState('')
  const [loadingWeather, setLoadingWeather] = useState(true)
  const [loadingQuake, setLoadingQuake] = useState(true)
  const [loadingWarnings, setLoadingWarnings] = useState(true)
  const [weatherError, setWeatherError] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('overview')
  const [refreshing, setRefreshing] = useState(false)
  const [dark, setDark] = useState(() => localStorage.getItem('langitnusa-theme') === 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : ''
    localStorage.setItem('langitnusa-theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    const q = query.trim()
    if (q.length < 2 || findLocation(q)) {
      setSuggestions([])
      return undefined
    }
    const timer = setTimeout(async () => {
      setSearching(true)
      try {
        const result = await searchLocations(q)
        setSuggestions(result?.data || [])
      } catch {
        setSuggestions([])
      } finally {
        setSearching(false)
      }
    }, 280)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    let live = true
    setLoadingWeather(true)
    setLoadingAir(true)
    setWeatherError(false)
    setAirQuality(null)
    Promise.allSettled([
      getWeather(location.code),
      getAirQuality(location.lat, location.lon)
    ]).then(([weatherResult, airResult]) => {
      if (!live) return
      if (weatherResult.status === 'fulfilled') setWeather(normalizeWeather(weatherResult.value))
      else setWeatherError(true)
      if (airResult.status === 'fulfilled') setAirQuality(airResult.value)
    }).finally(() => {
      if (!live) return
      setLoadingWeather(false)
      setLoadingAir(false)
    })
    return () => { live = false }
  }, [location])

  const loadHazards = async () => {
    setLoadingQuake(true)
    setLoadingWarnings(true)
    const results = await Promise.allSettled([getLatestEarthquake(), getEarthquakes(), getWarnings()])
    const [latest, list, warning] = results
    if (latest.status === 'fulfilled') setQuake(latest.value)
    if (list.status === 'fulfilled') setEarthquakes(normalizeEarthquakes(list.value))
    if (warning.status === 'fulfilled') setWarnings(warning.value)
    setLoadingQuake(false)
    setLoadingWarnings(false)
  }

  useEffect(() => { loadHazards() }, [])

  const activity = useMemo(() => activityScore(weather?.items?.slice(0, 8) || []), [weather])
  const firstWeather = weather?.items?.[0]
  const environment = useMemo(() => {
    const score = environmentScore({ pm25: airQuality?.pm25, temp: firstWeather?.t, humidity: firstWeather?.hu })
    const info = scoreInfo(score)
    const activities = activityFromEnvironment({
      pm25: airQuality?.pm25,
      temp: firstWeather?.t,
      humidity: firstWeather?.hu,
      weather: firstWeather?.weather_desc
    })
    return { score, ...info, activities }
  }, [airQuality, firstWeather])

  const choose = (item) => {
    const hit = typeof item === 'string' ? findLocation(item) : item
    if (!hit) return
    const normalized = {
      ...hit,
      name: hit.name || hit.village,
      city: hit.city || hit.cityLabel || hit.kotkab || hit.city,
      province: hit.province,
      district: hit.district || hit.kecamatan,
      code: hit.code,
      lat: Number(hit.lat ?? hit.latitude),
      lon: Number(hit.lon ?? hit.longitude)
    }
    setLocation(normalized)
    setQuery(normalized.name)
    setSuggestions([])
    setActive('weather')
    document.getElementById('weather')?.scrollIntoView({ behavior: 'smooth' })
  }

  const search = () => {
    const hit = findLocation(query)
    if (hit) return choose(hit)
    if (suggestions[0]) return choose(suggestions[0])
    setSuggestions([])
  }

  const nav = (id) => {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const refresh = async () => {
    setRefreshing(true)
    try {
      await Promise.all([
        getWeather(location.code).then((d) => setWeather(normalizeWeather(d))).catch(() => setWeatherError(true)),
        getAirQuality(location.lat, location.lon).then(setAirQuality).catch(() => setAirQuality(null)),
        loadHazards()
      ])
    } finally {
      setRefreshing(false)
    }
  }

  return <>
    <Sidebar open={open} onClose={() => setOpen(false)} active={active} onNavigate={nav} />
    <main className="main">
      <header className="top">
        <button className="icon-btn top-menu" onClick={() => setOpen(true)} aria-label="Buka menu"><Menu size={21} /></button>
        <div className="top-location">{location.province || location.city} · {location.name}</div>
        <div className="top-actions">
          <button className="icon-btn" onClick={refresh} disabled={refreshing} aria-label="Perbarui data" title="Perbarui data"><RefreshCw className={refreshing ? 'spin' : ''} size={18} /></button>
          <button className="icon-btn" onClick={() => setDark((x) => !x)} aria-label="Ganti tema"><SunMoon size={19} /></button>
        </div>
      </header>
      <div className="content">
        <Hero location={location} query={query} setQuery={setQuery} onSearch={search} onPick={choose} suggestions={suggestions} searching={searching} />
        <Weather data={weather} location={location} loading={loadingWeather} error={weatherError} />
        <Environment activity={activity} environment={environment} airQuality={airQuality} loading={loadingAir} weather={firstWeather} />
        <Earthquake quake={quake} loading={loadingQuake} />
        <Volcano location={location} />
        <MapPanel location={location} quake={quake} earthquakes={earthquakes} weather={weather} />
        <Warning xml={warnings} loading={loadingWarnings} location={location} />
        <Latest quake={quake} location={location} activity={activity} />
        <AboutData />
        <footer>
          <strong>BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)</strong><br />
          LangitNusa adalah proyek independen yang memanfaatkan Data Terbuka BMKG. Untuk informasi keselamatan dan keputusan penting, selalu prioritaskan kanal resmi BMKG.
          <a href="https://data.bmkg.go.id/" target="_blank" rel="noreferrer">Data Terbuka BMKG <ExternalLink size={12} /></a>
        </footer>
      </div>
    </main>
  </>
}

function normalizeWeather(d) {
  const groups = d?.data?.[0]?.cuaca || []
  const items = groups.flat()
  return { location: d?.lokasi || d?.data?.[0]?.lokasi, items }
}

function normalizeEarthquakes(d) {
  const raw = d?.Infogempa?.gempa || []
  return (Array.isArray(raw) ? raw : [raw]).map((g) => ({
    ...g,
    lat: parseCoord(g?.Lintang, true),
    lon: parseCoord(g?.Bujur, false)
  })).filter((g) => Number.isFinite(g.lat) && Number.isFinite(g.lon))
}

function parseCoord(value, latitude) {
  if (value == null) return NaN
  const text = String(value).toUpperCase()
  const n = parseFloat(text)
  if (!Number.isFinite(n)) return NaN
  if (latitude) return text.includes('LS') ? -Math.abs(n) : Math.abs(n)
  return text.includes('BB') ? -Math.abs(n) : Math.abs(n)
}

function Latest({ quake, location, activity }) {
  const g = quake?.Infogempa?.gempa
  return <section className="section" id="latest">
    <div className="section-head"><h2>Aktivitas terbaru</h2><span>Ringkasan LangitNusa</span></div>
    <div className="latest">
      <div className="latest-row"><span className="latest-title"><Activity size={16} /> Gempa bumi · {g ? `M ${g.Magnitude}` : '—'}</span><small>{g?.Wilayah || 'Belum tersedia'} · {g?.Tanggal || ''} {g?.Jam || ''}</small></div>
      <div className="latest-row"><span className="latest-title"><Search size={16} /> Lokasi aktif</span><small>{location.province || location.city} · {location.name}</small></div>
      <div className="latest-row"><span className="latest-title"><Activity size={16} /> Kesiapan aktivitas</span><small>{activity.label} · interpretasi berdasarkan prakiraan cuaca</small></div>
    </div>
  </section>
}
