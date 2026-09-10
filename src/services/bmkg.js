const directWeather=(adm4)=>`https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${encodeURIComponent(adm4)}`
const endpoints={weather:(adm4)=>`/api/weather?adm4=${encodeURIComponent(adm4)}`,earthquake:'/api/earthquake',warnings:'/api/warnings'}
async function request(url,fallback){
  try{const r=await fetch(url,{cache:'no-store'});if(!r.ok)throw new Error(String(r.status));return await fallback(r)}catch(error){throw error}
}
export async function getWeather(adm4){
  const urls=[endpoints.weather(adm4),directWeather(adm4)]
  let last
  for(const url of urls){try{return await request(url,r=>r.json())}catch(e){last=e}}
  throw last
}
export async function getLatestEarthquake(){
  const urls=[endpoints.earthquake,'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json']
  let last
  for(const url of urls){try{return await request(url,r=>r.json())}catch(e){last=e}}
  throw last
}
export async function getWarnings(){
  const urls=[endpoints.warnings,'https://www.bmkg.go.id/alerts/nowcast/id']
  let last
  for(const url of urls){try{return await request(url,r=>r.text())}catch(e){last=e}}
  throw last
}
