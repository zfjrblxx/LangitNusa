export function pm25Info(pm25) {
  const value = Number(pm25)
  if (!Number.isFinite(value)) return { label: 'Belum tersedia', tone: 'neutral' }
  if (value <= 15.5) return { label: 'Baik', tone: 'good' }
  if (value <= 55.4) return { label: 'Sedang', tone: 'warn' }
  if (value <= 150.4) return { label: 'Tidak sehat', tone: 'bad' }
  if (value <= 250.4) return { label: 'Sangat tidak sehat', tone: 'bad' }
  return { label: 'Berbahaya', tone: 'bad' }
}

export function airQualityScore(pm25) {
  const value = Number(pm25)
  if (!Number.isFinite(value)) return null
  if (value <= 15.5) return Math.round(100 - (value / 15.5) * 10)
  if (value <= 55.4) return Math.round(90 - ((value - 15.5) / 39.9) * 30)
  if (value <= 150.4) return Math.round(60 - ((value - 55.4) / 95) * 30)
  if (value <= 250.4) return Math.round(30 - ((value - 150.4) / 100) * 20)
  return Math.max(0, Math.round(10 - ((value - 250.4) / 250) * 10))
}

function pmScore(pm25) {
  const value = Number(pm25)
  if (!Number.isFinite(value)) return null
  if (value <= 15.5) return 100 - (value / 15.5) * 10
  if (value <= 55.4) return 90 - ((value - 15.5) / 39.9) * 30
  if (value <= 150.4) return 60 - ((value - 55.4) / 95) * 30
  if (value <= 250.4) return 30 - ((value - 150.4) / 100) * 20
  return Math.max(0, 10 - ((value - 250.4) / 250) * 10)
}

function thermalScore(temp, humidity) {
  const t = Number(temp)
  const h = Number(humidity)
  if (!Number.isFinite(t)) return null
  let score = 100 - Math.abs(t - 26) * 6
  if (Number.isFinite(h) && (h > 80 || h < 40)) score -= 15
  return Math.max(10, Math.min(100, score))
}

export function environmentScore({ pm25, temp, humidity }) {
  const p = pmScore(pm25)
  const t = thermalScore(temp, humidity)
  if (p == null) return null
  const score = Math.round(p * 0.7 + (t ?? 70) * 0.3)
  return Math.max(0, Math.min(100, score))
}

export function scoreInfo(score) {
  if (score == null) return { label: 'Data terbatas', tone: 'neutral' }
  if (score >= 80) return { label: 'Baik', tone: 'good' }
  if (score >= 60) return { label: 'Cukup baik', tone: 'good' }
  if (score >= 40) return { label: 'Kurang sehat / berisiko', tone: 'warn' }
  return { label: 'Berbahaya bagi kesehatan', tone: 'bad' }
}

export function activityFromEnvironment({ pm25, temp, humidity, weather }) {
  const p = Number(pm25)
  const t = Number(temp)
  const h = Number(humidity)
  const rain = /hujan|petir/i.test(weather || '')
  const severeAir = Number.isFinite(p) && p > 150.4
  const unhealthyAir = Number.isFinite(p) && p > 55.4
  const hot = Number.isFinite(t) && t >= 33
  const humid = Number.isFinite(h) && h >= 85
  const badOutdoor = severeAir || rain || hot
  const caution = unhealthyAir || humid || (Number.isFinite(p) && p > 15.5)

  return {
    jogging: badOutdoor ? 'Hindari' : caution ? 'Waspada' : 'Cukup baik',
    cycling: badOutdoor ? 'Hindari' : caution ? 'Waspada' : 'Cukup baik',
    kids: severeAir ? 'Di dalam ruangan' : unhealthyAir ? 'Batasi' : 'Cukup baik',
    ventilation: Number.isFinite(p) && p > 55.4 ? 'Tutup jendela' : 'Buka jendela'
  }
}
