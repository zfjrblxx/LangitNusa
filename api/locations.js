const API = 'https://geocoding-api.open-meteo.com/v1/search'

function levelOf(item) {
  const code = String(item?.feature_code || '').toUpperCase()
  if (/PPLC|PPLA|PPLA2|PPLA3|PPLA4|PPL/.test(code)) return 'city'
  if (item?.admin3) return 'district'
  if (item?.admin4) return 'village'
  return 'city'
}

function cityLabel(item) {
  return item?.admin2 || item?.admin1 || item?.country || ''
}

export default async function handler(req, res) {
  const q = String(req.query?.q || '').trim()
  if (q.length < 2) return res.status(400).json({ error: 'q must contain at least 2 characters' })

  try {
    const url = `${API}?name=${encodeURIComponent(q)}&count=10&language=id&format=json&countryCode=ID`
    const response = await fetch(url, { headers: { accept: 'application/json' } })
    if (!response.ok) throw new Error(`Open-Meteo geocoding ${response.status}`)
    const json = await response.json()
    const rows = Array.isArray(json?.results) ? json.results : []

    const data = rows.map((item) => ({
      name: item.name,
      level: levelOf(item),
      city: item.admin2 || item.admin1 || item.name,
      cityLabel: cityLabel(item),
      province: item.admin1 || '',
      district: item.admin3 || '',
      village: item.admin4 || '',
      code: String(item.id || `${item.latitude},${item.longitude}`),
      lat: Number(item.latitude),
      lon: Number(item.longitude),
      country: item.country || 'Indonesia'
    })).filter((item) => Number.isFinite(item.lat) && Number.isFinite(item.lon))

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800')
    return res.status(200).json({ data })
  } catch (error) {
    return res.status(502).json({ error: 'Open-Meteo location search is temporarily unavailable' })
  }
}
