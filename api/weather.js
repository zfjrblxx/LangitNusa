export default async function handler(req,res){
  const adm4=req.query?.adm4
  if(!adm4)return res.status(400).json({error:'adm4 is required'})
  try{
    const r=await fetch(`https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${encodeURIComponent(adm4)}`)
    const text=await r.text(); res.status(r.status).setHeader('Content-Type',r.headers.get('content-type')||'application/json').send(text)
  }catch(e){res.status(502).json({error:'Failed to reach BMKG weather API'})}
}
