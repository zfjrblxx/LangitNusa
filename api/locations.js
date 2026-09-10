import * as geografisPkg from 'geografis'

const geografis = geografisPkg?.default || geografisPkg

function cleanCity(value = '') {
  return String(value)
    .replace(/^Kota Adm\.\s*/i, '')
    .replace(/^Kabupaten\s+/i, 'Kab. ')
    .replace(/^Kab\.\s*/i, 'Kab. ')
    .trim()
}

function normalize(item, level, name) {
  return {
    name,
    level,
    village: item.village,
    district: item.district,
    city: item.city,
    cityLabel: cleanCity(item.city),
    province: item.province,
    code: item.code,
    lat: Number(item.latitude),
    lon: Number(item.longitude)
  }
}

export default async function handler(req, res) {
  const q = String(req.query?.q || '').trim()
  if (q.length < 2) return res.status(400).json({ error: 'q must contain at least 2 characters' })

  try {
    // Search the village directory, then collapse matching records into
    // city/district/village choices so searches behave like a location picker
    // rather than returning many nearly identical villages.
    const result = geografis.search(q, 40, 0)
    const rows = (result?.data || []).filter((item) => item?.code && Number.isFinite(Number(item.latitude)) && Number.isFinite(Number(item.longitude)))
    const query = q.toLowerCase()
    const output = []
    const seen = new Set()

    const add = (key, value) => {
      if (!value || seen.has(key)) return
      seen.add(key)
      output.push(value)
    }

    // Prefer an exact/strong city match first.
    rows.forEach((item) => {
      const city = String(item.city || '')
      if (city.toLowerCase().includes(query)) {
        const cityLabel = cleanCity(city)
        add(`city:${city.toLowerCase()}`, normalize(item, 'city', cityLabel))
      }
    })

    // Then districts, useful for searches such as Gambir, Menteng, Cilandak.
    rows.forEach((item) => {
      const district = String(item.district || '')
      if (district.toLowerCase().includes(query)) {
        add(`district:${district.toLowerCase()}:${item.city}`, normalize(item, 'district', district))
      }
    })

    // Finally keep direct village/kelurahan matches.
    rows.forEach((item) => {
      const village = String(item.village || '')
      if (village.toLowerCase().includes(query)) {
        add(`village:${village.toLowerCase()}:${item.district}:${item.city}`, normalize(item, 'village', village))
      }
    })

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800')
    return res.status(200).json({ data: output.slice(0, 8) })
  } catch (error) {
    return res.status(500).json({ error: 'Location directory is temporarily unavailable' })
  }
}
