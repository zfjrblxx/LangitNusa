import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, LayersControl, LayerGroup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Map as MapIcon, LocateFixed } from 'lucide-react'
import { SectionHead } from './Weather'

const quakeIcon = L.divIcon({ className: 'quake-marker', html: '<span></span>', iconSize: [16, 16], iconAnchor: [8, 8] })

export default function MapPanel({ location, quake, earthquakes = [], weather }) {
  const latest = quake?.Infogempa?.gempa
  const latestCoords = parseCoords(latest)
  return <section className="section" id="map">
    <SectionHead title="Peta sebaran" note="Lokasi · gempa · prakiraan" />
    <div className="map-wrap">
      <MapContainer center={[location.lat, location.lon]} zoom={6} scrollWheelZoom={false} className="map">
        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapViewport location={location} />
        <LayersControl position="topright">
          <LayersControl.Overlay checked name="Lokasi terpilih">
            <LayerGroup><CircleMarker center={[location.lat, location.lon]} radius={8} pathOptions={{ color: '#418db8', fillColor: '#79bfe1', fillOpacity: .95 }}>
              <Popup><strong>{location.name}</strong><br />{location.district || ''} · {location.city || location.province}</Popup>
            </CircleMarker></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Gempa terbaru">
            <LayerGroup>
              {earthquakes.slice(0, 15).map((g, i) => Number.isFinite(g.lat) && Number.isFinite(g.lon) && <Marker key={`${g.DateTime || g.Tanggal}-${i}`} position={[g.lat, g.lon]} icon={quakeIcon}>
                <Popup><strong>Gempa · M {g.Magnitude}</strong><br />{g.Wilayah}<br />{g.Tanggal} · {g.Jam}</Popup>
              </Marker>)}
              {!earthquakes.length && latestCoords && <Marker position={[latestCoords.lat, latestCoords.lon]} icon={quakeIcon}><Popup><strong>Gempa terbaru · M {latest?.Magnitude}</strong><br />{latest?.Wilayah}</Popup></Marker>}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Prakiraan lokasi">
            <LayerGroup>{weather?.items?.[0] && <CircleMarker center={[location.lat, location.lon]} radius={13} pathOptions={{ color: '#79bfe1', fillColor: '#79bfe1', fillOpacity: .28 }}>
              <Popup><strong>{weather.items[0].weather_desc}</strong><br />{weather.items[0].local_datetime?.replace('T', ' ')}<br />{weather.items[0].t}° · {weather.items[0].tp ?? 0} mm</Popup>
            </CircleMarker>}</LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
      <div className="map-overlay"><MapIcon size={14} /> Pilih layer di kanan atas</div>
      <button className="map-locate" onClick={() => window.dispatchEvent(new CustomEvent('langitnusa:map-home'))}><LocateFixed size={14} /> Lokasi</button>
    </div>
    <div className="map-note">Peta gempa memakai daftar 15 kejadian M5.0+ terbaru BMKG. Titik prakiraan hanya memvisualisasikan urutan waktu untuk lokasi terpilih, bukan sebaran spasial cuaca.</div>
  </section>
}

function MapViewport({ location }) {
  const map = useMap()
  useEffect(() => {
    const handler = () => map.setView([location.lat, location.lon], 8, { animate: true })
    window.addEventListener('langitnusa:map-home', handler)
    return () => window.removeEventListener('langitnusa:map-home', handler)
  }, [map, location.lat, location.lon])
  return null
}

function parseCoords(g) {
  if (!g?.Lintang || !g?.Bujur) return null
  const latRaw = String(g.Lintang).toUpperCase(); const lonRaw = String(g.Bujur).toUpperCase()
  const lat = parseFloat(latRaw); const lon = parseFloat(lonRaw)
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null
  return { lat: latRaw.includes('LS') ? -Math.abs(lat) : Math.abs(lat), lon: lonRaw.includes('BB') ? -Math.abs(lon) : Math.abs(lon) }
}
