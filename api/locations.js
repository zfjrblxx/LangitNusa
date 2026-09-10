import * as geografisPkg from 'geografis'

const geografis = geografisPkg?.default || geografisPkg

export default async function handler(req, res) {
  const q = String(req.query?.q || '').trim()
  if (q.length < 2) return res.status(400).json({ error: 'q must contain at least 2 characters' })

  try {
    const result = geografis.search(q, 8, 0)
    const data = (result?.data || []).map((item) => ({
      name: item.village,
      district: item.district,
      city: item.city,
      province: item.province,
      code: item.code,
      lat: Number(item.latitude),
      lon: Number(item.longitude)
    })).filter((item) => item.name && item.code && Number.isFinite(item.lat) && Number.isFinite(item.lon))

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800')
    return res.status(200).json({ data })
  } catch (error) {
    return res.status(500).json({ error: 'Location directory is temporarily unavailable' })
  }
}
