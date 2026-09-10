export const DEFAULT_LOCATION = {
  name: 'Gambir', city: 'Kota Adm. Jakarta Pusat', province: 'DKI Jakarta',
  code: '31.71.01.1001', lat: -6.1763842693, lon: 106.8267073562,
  district: 'Gambir'
}

export const LOCATIONS = [
  DEFAULT_LOCATION,
  { name:'Kemayoran', city:'Kota Adm. Jakarta Pusat', province:'DKI Jakarta', code:'31.71.03.1001', lat:-6.1613, lon:106.8535, district:'Kemayoran' },
  { name:'Cilandak', city:'Kota Adm. Jakarta Selatan', province:'DKI Jakarta', code:'31.74.06.1002', lat:-6.289, lon:106.794, district:'Cilandak' },
  { name:'Kebayoran Baru', city:'Kota Adm. Jakarta Selatan', province:'DKI Jakarta', code:'31.74.05.1001', lat:-6.244, lon:106.799, district:'Kebayoran Baru' },
  { name:'Menteng', city:'Kota Adm. Jakarta Pusat', province:'DKI Jakarta', code:'31.71.05.1001', lat:-6.194, lon:106.832, district:'Menteng' },
  { name:'Tebet', city:'Kota Adm. Jakarta Selatan', province:'DKI Jakarta', code:'31.74.04.1001', lat:-6.23, lon:106.85, district:'Tebet' }
]

export function findLocation(query) {
  const q = String(query || '').trim().toLowerCase()
  if (!q) return null
  return LOCATIONS.find((x) => x.name.toLowerCase() === q || x.code === q) ||
    LOCATIONS.find((x) => `${x.name} ${x.city} ${x.province}`.toLowerCase().includes(q))
}
