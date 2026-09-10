export default async function handler(req,res){
  try{
    const r=await fetch('https://www.bmkg.go.id/alerts/nowcast/id');
    const text=await r.text(); res.status(r.status).setHeader('Content-Type','application/xml').send(text)
  }catch(e){res.status(502).json({error:'Failed to reach BMKG warning feed'})}
}
