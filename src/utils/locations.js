export const DEFAULT_LOCATION = {
  name: 'Bandung', city: 'Kota Bandung', province: 'Jawa Barat',
  lat: -6.917464, lon: 107.619123, district: '', country: 'Indonesia'
}

export const LOCATIONS = [
  DEFAULT_LOCATION,
  { name:'Kemayoran', city:'Jakarta Pusat', province:'DKI Jakarta', lat:-6.1613, lon:106.8535, district:'Kemayoran', country:'Indonesia' },
  { name:'Cilandak', city:'Jakarta Selatan', province:'DKI Jakarta', lat:-6.289, lon:106.794, district:'Cilandak', country:'Indonesia' },
  { name:'Kebayoran Baru', city:'Jakarta Selatan', province:'DKI Jakarta', lat:-6.244, lon:106.799, district:'Kebayoran Baru', country:'Indonesia' },
  { name:'Menteng', city:'Jakarta Pusat', province:'DKI Jakarta', lat:-6.194, lon:106.832, district:'Menteng', country:'Indonesia' },
  { name:'Tebet', city:'Jakarta Selatan', province:'DKI Jakarta', lat:-6.23, lon:106.85, district:'Tebet', country:'Indonesia' }
]

export function findLocation(query) {
  const q = String(query || '').trim().toLowerCase()
  if (!q) return null
  return LOCATIONS.find((x) => x.name.toLowerCase() === q) ||
    LOCATIONS.find((x) => `${x.name} ${x.city} ${x.province}`.toLowerCase().includes(q))
}
