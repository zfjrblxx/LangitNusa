const STATIONS = [
  ['Kemayoran', -6.155, 106.845],
  ['Semarang', -6.966, 110.416],
  ['Malang', -7.983, 112.621],
  ['Sleman', -7.716, 110.355],
  ['Banjarbaru', -3.442, 114.841],
  ['Palangkaraya', -2.210, 113.921],
  ['Kota Jambi', -1.610, 103.613],
  ['Muaro Jambi', -1.620, 103.580],
  ['Pekanbaru', 0.507, 101.447],
  ['Batam', 1.130, 104.053],
  ['Medan', 3.595, 98.672],
  ['Samarinda', -0.502, 117.153],
  ['Bengkulu', -3.800, 102.266],
  ['Lore Lindu', -1.340, 120.020],
  ['Pangkalanbun', -2.710, 111.700],
  ['Sorong', -0.876, 131.255],
  ['Kototabang', -0.200, 100.320],
  ['Tanjung Harapan', -1.150, 104.080],
  ['Maros', -5.000, 119.570],
  ['Indrapuri', 5.410, 95.450],
  ['Kotabaru', -3.290, 116.160],
  ['Mempawah', 0.350, 109.170],
  ['Sintang', 0.060, 111.500],
  ['Pesawaran', -5.430, 105.240],
  ['Talang Betutu Palembang', -2.890, 104.750],
  ['Musi 2 Palembang', -2.960, 104.720]
].map(([name, lat, lon]) => ({ name, lat, lon }))

function distanceKm(aLat, aLon, bLat, bLon) {
  const r = 6371
  const toRad = (n) => n * Math.PI / 180
  const dLat = toRad(bLat - aLat)
  const dLon = toRad(bLon - aLon)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLon / 2) ** 2
  return 2 * r * Math.asin(Math.sqrt(a))
}

function category(pm25) {
  if (pm25 <= 15.5) return 'Baik'
  if (pm25 <= 55.4) return 'Sedang'
  if (pm25 <= 150.4) return 'Tidak Sehat'
  if (pm25 <= 250.4) return 'Sangat Tidak Sehat'
  return 'Berbahaya'
}

function cleanText(value) {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

// BMKG's PM2.5 index currently renders each station as a rich anchor whose
// visible text contains the station name plus time/value/category. Match the
// known station name inside that text rather than requiring exact text.
function parseStationLinks(html) {
  const links = new Map()
  const re = /<a\b[^>]*href=["']([^"']*\/kualitas-udara\/pm25\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi
  let match

  while ((match = re.exec(html))) {
    const href = new URL(match[1], 'https://www.bmkg.go.id').toString()
    const text = cleanText(match[2]).toLowerCase()
    if (!text) continue

    for (const station of STATIONS) {
      const key = station.name.toLowerCase()
      if (text.includes(key) && !links.has(key)) {
        links.set(key, href)
      }
    }
  }

  return links
}

function parseDetail(html, fallbackName) {
  const compact = html.replace(/\s+/g, ' ')

  // Current BMKG detail pages expose the reading as e.g. "36.8 µg/m^{3}".
  // We only need the numeric reading before the unit, so the parser remains
  // tolerant of superscript/HTML formatting changes.
  const valueMatch = compact.match(/([0-9]+(?:[.,][0-9]+)?)\s*µg\/m/i)
  const categoryMatch = compact.match(/Kategori:\s*(?:<[^>]+>\s*)*([^<]{2,40})/i)
  const timeMatch = compact.match(/(\d{1,2} \w+ 202\d, \d{1,2}\.\d{2} WIB)/i)
  const pm25 = valueMatch ? Number(valueMatch[1].replace(',', '.')) : NaN

  if (!Number.isFinite(pm25)) return null

  return {
    pm25,
    category: categoryMatch?.[1]?.trim() || category(pm25),
    station: fallbackName,
    updatedAt: timeMatch?.[1] || null
  }
}

export default async function handler(req, res) {
  const lat = Number(req.query?.lat)
  const lon = Number(req.query?.lon)

  if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 11 || Math.abs(lon) > 141) {
    return res.status(400).json({ error: 'Valid latitude and longitude are required' })
  }

  try {
    const indexRes = await fetch('https://www.bmkg.go.id/kualitas-udara/pm25', {
      headers: { 'Accept': 'text/html' }
    })

    if (!indexRes.ok) throw new Error(`BMKG PM2.5 index ${indexRes.status}`)

    const html = await indexRes.text()
    const links = parseStationLinks(html)

    const ranked = STATIONS.map((station) => ({
      ...station,
      distanceKm: distanceKm(lat, lon, station.lat, station.lon)
    })).sort((a, b) => a.distanceKm - b.distanceKm)

    for (const station of ranked) {
      const url = links.get(station.name.toLowerCase())
      if (!url) continue

      const detailRes = await fetch(url, { headers: { 'Accept': 'text/html' } })
      if (!detailRes.ok) continue

      const detailHtml = await detailRes.text()
      const parsed = parseDetail(detailHtml, station.name)
      if (!parsed) continue

      return res.status(200)
        .setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=900')
        .json({
          ...parsed,
          distanceKm: Math.round(station.distanceKm * 10) / 10,
          source: 'BMKG PM2.5'
        })
    }

    return res.status(404).json({ error: 'No nearby BMKG PM2.5 station data available' })
  } catch (error) {
    return res.status(502).json({ error: 'Failed to reach BMKG PM2.5 service' })
  }
}
