import { useEffect, useMemo, useState } from 'react'
import { SunMoon, Activity, ExternalLink, Search, RefreshCw } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import Weather from './components/Weather'
import Environment from './components/Environment'
import Earthquake from './components/Earthquake'
import MapPanel from './components/MapPanel'
import Warning from './components/Warning'
import AboutData from './components/AboutData'
import Volcano from './components/Volcano'
import { DEFAULT_LOCATION, findLocation } from './utils/locations'
import { getWeather, getLatestEarthquake, getEarthquakes, getWarnings, searchLocations, getAirQuality } from './services/bmkg'
import { activityScore } from './utils/format'
import { aqiInfo, activityFromEnvironment, readinessInfo } from './utils/environment'

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
  const [active, setActive] = useState('overview')
  const [refreshing, setRefreshing] = useState(false)
  const [dark, setDark] = useState(() => localStorage.getItem('langitnusa-theme') === 'dark')
  const [showAboutData, setShowAboutData] = useState(false)

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
      getWeather(location.lat, location.lon),
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
    const info = aqiInfo(airQuality?.aqi)
    const activities = activityFromEnvironment({
      aqi: airQuality?.aqi,
      temp: firstWeather?.t,
      humidity: firstWeather?.hu,
      weather: firstWeather?.weather_desc
    })
    const readiness = readinessInfo({ aqi: airQuality?.aqi, temp: firstWeather?.t, humidity: firstWeather?.hu, weather: firstWeather?.weather_desc })
    return { aqi: airQuality?.aqi, ...info, activities, readiness }
  }, [airQuality, firstWeather])

  const choose = (item) => {
    const hit = typeof item === 'string' ? findLocation(item) : item
    if (!hit) return
    const normalized = {
      ...hit,
      name: hit.name || hit.village,
      city: hit.city || hit.cityLabel || hit.city,
      province: hit.province,
      district: hit.district || hit.kecamatan,
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
    if (id === 'about-data') {
      setActive(id)
      setShowAboutData(true)
      return
    }
    setActive(id)
    const el = document.getElementById(id)
    if (!el) return

    if (window.matchMedia('(max-width: 850px)').matches) {
      // Mobile: place the selected section heading at a fixed visual anchor
      // just below the sticky location header + horizontal navigation.
      // The browser UI is outside the page viewport, so the page target is
      // deliberately based on the in-page header/nav height.
      const anchorTop = 156
      const scrollToSection = () => {
        const rect = el.getBoundingClientRect()
        const target = Math.max(0, window.scrollY + rect.top - anchorTop)
        window.scrollTo({ top: target, behavior: 'smooth' })
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(scrollToSection)
      })
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const refresh = async () => {
    setRefreshing(true)
    try {
      await Promise.all([
        getWeather(location.lat, location.lon).then((d) => setWeather(normalizeWeather(d))).catch(() => setWeatherError(true)),
        getAirQuality(location.lat, location.lon).then(setAirQuality).catch(() => setAirQuality(null)),
        loadHazards()
      ])
    } finally {
      setRefreshing(false)
    }
  }

  return <>
    <Sidebar active={active} onNavigate={nav} />
    <main className="main">
      <header className="top">
        
        <div className="top-location">{location.province || location.city} · {location.name}</div>
        <div className="top-actions">
          <button className="icon-btn" onClick={refresh} disabled={refreshing} aria-label="Perbarui data" title="Perbarui data"><RefreshCw className={refreshing ? 'spin' : ''} size={18} /></button>
          <button className="icon-btn" onClick={() => setDark((x) => !x)} aria-label="Ganti tema"><SunMoon size={19} /></button>
        </div>
      </header>
      <div className="content">
        <Hero location={location} query={query} setQuery={setQuery} onSearch={search} onPick={choose} suggestions={suggestions} searching={searching} />
        <Weather data={weather} location={location} loading={loadingWeather} error={weatherError} readiness={environment.readiness} />
        <Environment activity={activity} environment={environment} airQuality={airQuality} loading={loadingAir} weather={firstWeather} />
        <Volcano location={location} />
        <Earthquake quake={quake} loading={loadingQuake} />
        <MapPanel location={location} quake={quake} earthquakes={earthquakes} weather={weather} />
        <Warning xml={warnings} loading={loadingWarnings} location={location} />
        <Latest quake={quake} location={location} activity={activity} />
        <footer>
          <strong>BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)</strong><br />
          LangitNusa adalah proyek independen. Sumber data aplikasi menggunakan BMKG (Badan Meteorologi, Klimatologi, dan Geofisika) & Open-Meteo. Data aktivitas gunung api menggunakan PVMBG · MAGMA ESDM sesuai sumber resmi yang ditampilkan pada bagian gunung api.
          <span className="footer-sources"><a href="https://data.bmkg.go.id/" target="_blank" rel="noreferrer">BMKG <ExternalLink size={12} /></a> · <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo <ExternalLink size={12} /></a> · <a href="https://magma.esdm.go.id/" target="_blank" rel="noreferrer">PVMBG · MAGMA <ExternalLink size={12} /></a></span>
        </footer>
      </div>
    </main>
    <AboutData open={showAboutData} onClose={() => { setShowAboutData(false); setActive('overview') }} />
  </>
}

function normalizeWeather(d) {
  return { location: d?.location, items: Array.isArray(d?.items) ? d.items : [] }
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
