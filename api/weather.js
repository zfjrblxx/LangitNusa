const API = 'https://api.open-meteo.com/v1/forecast'

function weatherDescription(code) {
  const map = {
    0: 'Cerah', 1: 'Cerah berawan', 2: 'Cerah berawan', 3: 'Berawan',
    45: 'Kabut', 48: 'Kabut', 51: 'Gerimis ringan', 53: 'Gerimis', 55: 'Gerimis lebat',
    56: 'Gerimis beku', 57: 'Gerimis beku lebat', 61: 'Hujan ringan', 63: 'Hujan', 65: 'Hujan lebat',
    66: 'Hujan beku', 67: 'Hujan beku lebat', 71: 'Salju ringan', 73: 'Salju', 75: 'Salju lebat',
    77: 'Butiran salju', 80: 'Hujan lokal', 81: 'Hujan lokal', 82: 'Hujan lokal lebat',
    85: 'Salju lokal', 86: 'Salju lokal lebat', 95: 'Petir', 96: 'Petir dan hujan es', 99: 'Petir dan hujan es lebat'
  }
  return map[Number(code)] || 'Berawan'
}

function formatVisibility(meters) {
  if (!Number.isFinite(Number(meters))) return null
  const km = Number(meters) / 1000
  return km >= 10 ? `${Math.round(km)} km` : `${km.toFixed(1)} km`
}

function buildItems(hourly) {
  const times = hourly?.time || []
  const nowLocal = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Jakarta', hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit' }).format(new Date()).replace(' ', 'T')
  let start = times.findIndex((time) => time >= nowLocal)
  if (start < 0) start = 0
  const pick = []
  for (let i = start; i < times.length && pick.length < 24; i += 3) {
    pick.push({
      local_datetime: times[i],
      t: hourly.temperature_2m?.[i],
      hu: hourly.relative_humidity_2m?.[i],
      weather_desc: weatherDescription(hourly.weather_code?.[i]),
      ws: hourly.wind_speed_10m?.[i],
      wd: Number.isFinite(Number(hourly.wind_direction_10m?.[i])) ? `${Math.round(hourly.wind_direction_10m[i])}°` : null,
      vs_text: formatVisibility(hourly.visibility?.[i]),
      tcc: hourly.cloud_cover?.[i],
      tp: hourly.precipitation?.[i]
    })
  }
  return pick
}

export default async function handler(req, res) {
  const lat = Number(req.query?.lat)
  const lon = Number(req.query?.lon)
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return res.status(400).json({ error: 'lat and lon are required' })

  try {
    const params = new URLSearchParams({
      latitude: String(lat), longitude: String(lon),
      hourly: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,cloud_cover,precipitation,visibility',
      forecast_days: '3', timezone: 'Asia/Jakarta'
    })
    const response = await fetch(`${API}?${params}`, { headers: { accept: 'application/json' } })
    if (!response.ok) throw new Error(`Open-Meteo weather ${response.status}`)
    const json = await response.json()
    return res.status(200).json({
      source: 'Open-Meteo',
      location: { latitude: json.latitude, longitude: json.longitude, timezone: json.timezone },
      items: buildItems(json.hourly)
    })
  } catch (error) {
    return res.status(502).json({ error: 'Failed to reach Open-Meteo weather service' })
  }
}
