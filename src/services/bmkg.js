const endpoints = {
  weather: (lat, lon) => `/api/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`,
  earthquake: '/api/earthquake',
  earthquakes: '/api/earthquakes',
  warnings: '/api/warnings',
  locations: (q) => `/api/locations?q=${encodeURIComponent(q)}`,
  airQuality: (lat, lon) => `/api/air-quality?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`
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

export function getWeather(lat, lon) {
  return request(endpoints.weather(lat, lon))
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

export function getAirQuality(lat, lon) {
  return request(endpoints.airQuality(lat, lon))
}
