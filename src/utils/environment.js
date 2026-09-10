export function aqiInfo(aqi) {
  const value = Number(aqi)
  if (!Number.isFinite(value)) return { label: 'Belum tersedia', tone: 'neutral' }
  if (value <= 50) return { label: 'Baik', tone: 'good' }
  if (value <= 100) return { label: 'Sedang', tone: 'warn' }
  if (value <= 150) return { label: 'Tidak sehat bagi kelompok sensitif', tone: 'bad' }
  if (value <= 200) return { label: 'Tidak sehat', tone: 'bad' }
  if (value <= 300) return { label: 'Sangat tidak sehat', tone: 'bad' }
  return { label: 'Berbahaya', tone: 'bad' }
}

export function activityFromEnvironment({ aqi, temp, humidity, weather }) {
  const a = Number(aqi)
  const t = Number(temp)
  const h = Number(humidity)
  const rain = /hujan|petir/i.test(weather || '')
  const severeAir = Number.isFinite(a) && a > 200
  const unhealthyAir = Number.isFinite(a) && a > 100
  const hot = Number.isFinite(t) && t >= 33
  const humid = Number.isFinite(h) && h >= 85
  const badOutdoor = severeAir || rain || hot
  const caution = unhealthyAir || humid || (Number.isFinite(a) && a > 50)

  return {
    jogging: badOutdoor ? 'Hindari' : caution ? 'Waspada' : 'Cukup baik',
    cycling: badOutdoor ? 'Hindari' : caution ? 'Waspada' : 'Cukup baik',
    kids: severeAir ? 'Di dalam ruangan' : unhealthyAir ? 'Batasi' : 'Cukup baik',
    ventilation: Number.isFinite(a) && a > 100 ? 'Tutup jendela' : 'Buka jendela'
  }
}
