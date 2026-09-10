export default async function handler(req, res) {
  try {
    const r = await fetch('https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json')
    const text = await r.text()
    res.status(r.status).setHeader('Content-Type', 'application/json').setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate=600').send(text)
  } catch (e) { res.status(502).json({ error: 'Failed to reach BMKG earthquake list' }) }
}
