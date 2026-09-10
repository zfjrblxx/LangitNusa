const API = 'https://air-quality-api.open-meteo.com/v1/air-quality'

export default async function handler(req, res) {
  const lat = Number(req.query?.lat)
  const lon = Number(req.query?.lon)
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return res.status(400).json({ error: 'lat and lon are required' })

  try {
    const params = new URLSearchParams({
      latitude: String(lat), longitude: String(lon),
      hourly: 'us_aqi,us_aqi_pm2_5,us_aqi_pm10,us_aqi_nitrogen_dioxide,us_aqi_ozone,us_aqi_sulphur_dioxide,pm2_5,pm10,nitrogen_dioxide,sulphur_dioxide,ozone,carbon_monoxide',
      forecast_days: '2', timezone: 'Asia/Jakarta'
    })
    const response = await fetch(`${API}?${params}`, { headers: { accept: 'application/json' } })
    if (!response.ok) throw new Error(`Open-Meteo air quality ${response.status}`)
    const json = await response.json()
    const times = json?.hourly?.time || []
    const nowLocal = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Jakarta', hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit' }).format(new Date()).replace(' ', 'T')
    let index = times.findIndex((value) => value >= nowLocal)
    if (index < 0) index = 0

    const at = (key) => json?.hourly?.[key]?.[index]
    const updatedAt = times[index] ? new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' }).format(new Date(times[index])) + ' WIB' : null

    return res.status(200).json({
      source: 'Open-Meteo',
      pm25: at('pm2_5'), pm10: at('pm10'), no2: at('nitrogen_dioxide'), so2: at('sulphur_dioxide'), ozone: at('ozone'), co: at('carbon_monoxide'),
      aqi: at('us_aqi'), aqiPm25: at('us_aqi_pm2_5'), aqiPm10: at('us_aqi_pm10'), aqiNo2: at('us_aqi_nitrogen_dioxide'), aqiO3: at('us_aqi_ozone'), aqiSo2: at('us_aqi_sulphur_dioxide'),
      updatedAt
    })
  } catch (error) {
    return res.status(502).json({ error: 'Failed to reach Open-Meteo air quality service' })
  }
}
