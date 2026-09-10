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


export function readinessInfo({ aqi, temp, humidity, weather }) {
  const a = Number(aqi), t = Number(temp), h = Number(humidity)
  const text = String(weather || '').toLowerCase()
  if ((Number.isFinite(a) && a > 200) || /petir|hujan lebat|hujan beku lebat/.test(text) || (Number.isFinite(t) && t >= 35)) {
    return { label: 'Hindari', tone: 'bad', detail: 'Kondisi saat ini kurang aman untuk aktivitas luar ruang.' }
  }
  if ((Number.isFinite(a) && a > 100) || /hujan|petir/.test(text) || (Number.isFinite(t) && t >= 33) || (Number.isFinite(h) && h >= 85)) {
    return { label: 'Waspada', tone: 'warn', detail: 'Perhatikan kualitas udara dan kondisi cuaca sebelum beraktivitas di luar.' }
  }
  return { label: 'Baik', tone: 'good', detail: 'Kondisi saat ini relatif mendukung aktivitas luar ruang.' }
}
