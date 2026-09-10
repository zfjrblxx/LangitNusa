const directWeather = (adm4) => `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${encodeURIComponent(adm4)}`
const endpoints = {
  weather: (adm4) => `/api/weather?adm4=${encodeURIComponent(adm4)}`,
  earthquake: '/api/earthquake',
  earthquakes: '/api/earthquakes',
  warnings: '/api/warnings',
  locations: (q) => `/api/locations?q=${encodeURIComponent(q)}`
}

async function request(url, parse = (r) => r.json()) {
  const r = await fetch(url, { cache: 'no-store' })
  if (!r.ok) throw new Error(String(r.status))
  return parse(r)
}

async function tryUrls(urls, parse) {
  let last
  for (const url of urls) {
    try { return await request(url, parse) } catch (e) { last = e }
  }
  throw last || new Error('Request failed')
}

export function getWeather(adm4) {
  return tryUrls([endpoints.weather(adm4), directWeather(adm4)])
}

export function getLatestEarthquake() {
  return tryUrls([endpoints.earthquake, 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json'])
}

export function getEarthquakes() {
  return tryUrls([endpoints.earthquakes, 'https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json'])
}

export function getWarnings() {
  return tryUrls([endpoints.warnings, 'https://www.bmkg.go.id/alerts/nowcast/id'], (r) => r.text())
}

export function searchLocations(query) {
  return request(endpoints.locations(query))
}
