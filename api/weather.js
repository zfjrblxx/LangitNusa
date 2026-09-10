export default async function handler(req, res) {
  const adm4 = String(req.query?.adm4 || '').trim()
  if (!/^\d{2}(?:\.\d{2}){3}$/.test(adm4)) return res.status(400).json({ error: 'A valid adm4 code is required' })
  try {
    const r = await fetch(`https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${encodeURIComponent(adm4)}`)
    const text = await r.text()
    res.status(r.status).setHeader('Content-Type', r.headers.get('content-type') || 'application/json')
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=900')
    return res.send(text)
  } catch (e) { return res.status(502).json({ error: 'Failed to reach BMKG weather API' }) }
}
