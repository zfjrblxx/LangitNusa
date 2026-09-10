const MAGMA_URL = 'https://magma.esdm.go.id/v1/gunung-api/tingkat-aktivitas'

const VOLCANOES = [
  ['Gede', 'Jawa Barat', 2958, -6.78, 106.98, 'Stratovolcano', 'Cianjur · Sukabumi · Bogor'],
  ['Salak', 'Jawa Barat', 2211, -6.72, 106.73, 'Stratovolcano', 'Bogor · Sukabumi'],
  ['Tangkuban Parahu', 'Jawa Barat', 2084, -6.77, 107.60, 'Stratovolcano', 'Bandung Barat · Subang'],
  ['Papandayan', 'Jawa Barat', 2665, -7.32, 107.73, 'Stratovolcano', 'Garut'],
  ['Ciremai', 'Jawa Barat', 3078, -6.89, 108.41, 'Stratovolcano', 'Kuningan · Majalengka · Cirebon'],
  ['Merapi', 'Jawa Tengah · DI Yogyakarta', 2968, -7.54, 110.45, 'Stratovolcano', 'Sleman · Magelang · Boyolali · Klaten'],
  ['Slamet', 'Jawa Tengah', 3428, -7.24, 109.21, 'Stratovolcano', 'Banyumas · Brebes · Purbalingga'],
  ['Sumbing', 'Jawa Tengah', 3371, -7.38, 110.07, 'Stratovolcano', 'Magelang · Temanggung · Wonosobo'],
  ['Sindoro', 'Jawa Tengah', 3136, -7.30, 109.99, 'Stratovolcano', 'Temanggung · Wonosobo'],
  ['Lawu', 'Jawa Tengah · Jawa Timur', 3265, -7.63, 111.19, 'Stratovolcano', 'Karanganyar · Magetan · Ngawi'],
  ['Kelud', 'Jawa Timur', 1731, -7.93, 112.31, 'Stratovolcano', 'Kediri · Blitar · Malang'],
  ['Bromo', 'Jawa Timur', 2329, -7.94, 112.95, 'Stratovolcano', 'Probolinggo · Pasuruan · Malang · Lumajang'],
  ['Semeru', 'Jawa Timur', 3676, -8.11, 112.92, 'Stratovolcano', 'Lumajang · Malang'],
  ['Raung', 'Jawa Timur', 3332, -8.13, 114.04, 'Stratovolcano', 'Banyuwangi · Bondowoso · Jember'],
  ['Ijen', 'Jawa Timur', 2769, -8.06, 114.24, 'Kompleks kaldera', 'Banyuwangi · Bondowoso'],
  ['Agung', 'Bali', 3031, -8.34, 115.51, 'Stratovolcano', 'Karangasem · Bali Timur'],
  ['Batur', 'Bali', 1717, -8.24, 115.38, 'Stratovolcano', 'Bangli · Kintamani'],
  ['Rinjani', 'Nusa Tenggara Barat', 3726, -8.41, 116.46, 'Stratovolcano', 'Lombok Utara · Lombok Timur · Lombok Tengah'],
  ['Tambora', 'Nusa Tenggara Barat', 2850, -8.25, 118.00, 'Stratovolcano', 'Dompu · Bima'],
  ['Sangeangapi', 'Nusa Tenggara Barat', 1949, -8.20, 118.99, 'Stratovolcano', 'Bima'],
  ['Inerie', 'Nusa Tenggara Timur', 2245, -8.83, 120.98, 'Stratovolcano', 'Ngada'],
  ['Egon', 'Nusa Tenggara Timur', 1703, -8.67, 122.46, 'Stratovolcano', 'Sikka'],
  ['Lewotobi Laki-laki', 'Nusa Tenggara Timur', 1584, -8.56, 122.78, 'Stratovolcano', 'Flores Timur'],
  ['Ili Lewotolok', 'Nusa Tenggara Timur', 1423, -8.27, 123.51, 'Stratovolcano', 'Lembata'],
  ['Rokatenda', 'Nusa Tenggara Timur', 875, -8.32, 121.71, 'Stratovolcano', 'Sikka · Ende'],
  ['Kerinci', 'Jambi · Sumatera Barat', 3805, -1.70, 101.26, 'Stratovolcano', 'Kerinci · Solok Selatan'],
  ['Marapi', 'Sumatera Barat', 2891, -0.38, 100.47, 'Stratovolcano', 'Agam · Tanah Datar'],
  ['Talang', 'Sumatera Barat', 2597, -0.98, 100.68, 'Stratovolcano', 'Solok'],
  ['Dempo', 'Sumatera Selatan', 3173, -4.03, 103.12, 'Stratovolcano', 'Pagar Alam · Lahat'],
  ['Anak Krakatau', 'Banten · Lampung', 157, -6.10, 105.42, 'Gunung api pulau', 'Selat Sunda'],
  ['Soputan', 'Sulawesi Utara', 1784, 1.11, 124.73, 'Stratovolcano', 'Minahasa Selatan · Minahasa Tenggara'],
  ['Lokon', 'Sulawesi Utara', 1580, 1.36, 124.79, 'Stratovolcano', 'Tomohon · Minahasa'],
  ['Gamalama', 'Maluku Utara', 1715, 0.80, 127.33, 'Stratovolcano', 'Ternate'],
  ['Ibu', 'Maluku Utara', 1325, 1.49, 127.63, 'Stratovolcano', 'Halmahera Barat'],
  ['Dukono', 'Maluku Utara', 1229, 1.69, 127.89, 'Stratovolcano', 'Halmahera Utara'],
  ['Sinabung', 'Sumatera Utara', 2460, 3.17, 98.39, 'Stratovolcano', 'Karo']
]

function normalize(s) {
  return String(s || '').toLowerCase().replace(/gunung/g, '').replace(/[^a-z0-9]+/g, ' ').trim()
}

function distanceKm(lat1, lon1, lat2, lon2) {
  const r = Math.PI / 180
  const a = Math.sin((lat2 - lat1) * r / 2) ** 2 + Math.cos(lat1 * r) * Math.cos(lat2 * r) * Math.sin((lon2 - lon1) * r / 2) ** 2
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function stripHtml(html) {
  return String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, '\n')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/&#x27;/gi, "'")
    .replace(/\r/g, '')
}

function parseStatuses(html) {
  const text = stripHtml(html)
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n[ \t]+/g, '\n')

  // Use MAGMA's dedicated Tingkat Aktivitas page. It has four explicit
  // sections, so status is assigned only from the section that contains
  // the volcano name. No default-to-Normal fallback is allowed.
  const sections = [
    { level: 4, label: 'Awas', start: /Level\s*IV\s*\(\s*Awas\s*\)/i, end: /Level\s*III\s*\(\s*Siaga\s*\)/i },
    { level: 3, label: 'Siaga', start: /Level\s*III\s*\(\s*Siaga\s*\)/i, end: /Level\s*II\s*\(\s*Waspada\s*\)/i },
    { level: 2, label: 'Waspada', start: /Level\s*II\s*\(\s*Waspada\s*\)/i, end: /Level\s*I\s*\(\s*Normal\s*\)/i },
    { level: 1, label: 'Normal', start: /Level\s*I\s*\(\s*Normal\s*\)/i, end: null }
  ]

  const statusMap = {}
  for (const section of sections) {
    const startMatch = section.start.exec(text)
    if (!startMatch) continue
    const endMatch = section.end ? section.end.exec(text.slice(startMatch.index + startMatch[0].length)) : null
    const endIndex = endMatch
      ? startMatch.index + startMatch[0].length + endMatch.index
      : text.length
    const block = text.slice(startMatch.index, endIndex)
    const normalizedBlock = normalize(block)

    for (const volcano of VOLCANOES) {
      const normalizedName = normalize(volcano[0])
      if (normalizedName && normalizedBlock.includes(normalizedName)) {
        statusMap[normalizedName] = { level: section.level, label: section.label }
      }
    }
  }

  return statusMap
}
export default async function handler(req, res) {
  try {
    const response = await fetch(MAGMA_URL, { headers: { 'User-Agent': 'LangitNusa/1.0' } })
    if (!response.ok) throw new Error(`MAGMA ${response.status}`)
    const html = await response.text()
    const statusMap = parseStatuses(html)
    const lat = Number(req.query?.lat)
    const lon = Number(req.query?.lon)
    const sorted = VOLCANOES.map(([name, region, elevation, vlat, vlon, type, area]) => ({
      name, region, elevation, lat: vlat, lon: vlon, type, area,
      status: statusMap[normalize(name)] || { level: null, label: 'Belum terbaca' },
      distance: Number.isFinite(lat) && Number.isFinite(lon) ? distanceKm(lat, lon, vlat, vlon) : null
    })).sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity))
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
    res.status(200).json({ source: 'PVMBG · MAGMA ESDM', sourceUrl: MAGMA_URL, updatedAt: new Date().toISOString(), items: sorted.slice(0, 3) })
  } catch (error) {
    res.status(502).json({ error: 'Data aktivitas gunung dari MAGMA belum dapat diambil.', source: 'PVMBG · MAGMA ESDM' })
  }
}
