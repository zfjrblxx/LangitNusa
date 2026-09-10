import { AlertTriangle, ExternalLink } from 'lucide-react'
import { SectionHead } from './Weather'

export default function Warning({ xml, loading, location }) {
  const parsed = parseWarnings(xml)
  const match = parsed.find((item) => item.text.toLowerCase().includes((location?.province || '').toLowerCase())) || parsed[0]
  return <section className="section" id="warning">
    <SectionHead title="Peringatan dini" note="Nowcast BMKG · aktif" />
    <div className={`alert ${!match && !loading ? 'alert-empty' : ''}`}>
      <AlertTriangle size={19} />
      <div className="alert-body">
        {loading ? <><div className="alert-title">Memeriksa peringatan aktif…</div><p>Memuat feed nowcast BMKG.</p></> : match ? <>
          <div className="alert-title">{match.title}</div>
          <p>{match.description || 'Lihat detail resmi BMKG untuk wilayah terdampak.'}</p>
          <small>{match.pubDate || 'Feed BMKG'}</small>
        </> : <>
          <div className="alert-title">Belum ada peringatan yang terbaca</div>
          <p>Ketiadaan item di feed ini bukan jaminan kondisi aman. Periksa kanal resmi BMKG saat cuaca berisiko.</p>
        </>}
        <a className="inline-source" href="https://www.bmkg.go.id/peringatan-dini-cuaca" target="_blank" rel="noreferrer">Buka peringatan resmi BMKG <ExternalLink size={12} /></a>
      </div>
    </div>
  </section>
}

function parseWarnings(xml) {
  if (!xml) return []
  try {
    const doc = new DOMParser().parseFromString(xml, 'application/xml')
    return [...doc.querySelectorAll('item')].map((item) => ({
      title: clean(item.querySelector('title')?.textContent),
      description: clean(item.querySelector('description')?.textContent),
      pubDate: clean(item.querySelector('pubDate')?.textContent),
      text: clean(item.textContent)
    })).filter((item) => item.title)
  } catch { return [] }
}

function clean(value = '') { return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() }
