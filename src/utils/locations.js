export const DEFAULT_LOCATION={name:'Gambir',city:'DKI Jakarta',code:'31.71.01.1001',lat:-6.1763842693,lon:106.8267073562}
export const LOCATIONS=[
 {name:'Gambir',city:'DKI Jakarta',code:'31.71.01.1001',lat:-6.1763842693,lon:106.8267073562},
 {name:'Kemayoran',city:'DKI Jakarta',code:'31.71.03.1001',lat:-6.1613,lon:106.8535},
 {name:'Cilandak',city:'DKI Jakarta',code:'31.74.06.1002',lat:-6.289,lon:106.794},
 {name:'Kebayoran Baru',city:'DKI Jakarta',code:'31.74.05.1001',lat:-6.244,lon:106.799},
 {name:'Menteng',city:'DKI Jakarta',code:'31.71.05.1001',lat:-6.194,lon:106.832},
 {name:'Tebet',city:'DKI Jakarta',code:'31.74.04.1001',lat:-6.23,lon:106.85}
]
export function findLocation(query){const q=query.trim().toLowerCase();return LOCATIONS.find(x=>x.name.toLowerCase()===q)||LOCATIONS.find(x=>x.name.toLowerCase().includes(q))}
