const {createHmac}=require('node:crypto');
const GEO_HEADERS=['x-vercel-forwarded-for','x-vercel-ip-country','x-vercel-ip-country-region','x-vercel-ip-city','x-vercel-ip-postal-code','x-vercel-ip-latitude','x-vercel-ip-longitude'];
const recent=new Map();
module.exports=async function handler(req,res){
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
 if(req.method!=='POST'){res.setHeader('Allow','POST');res.statusCode=405;return res.end()}
 try{
  const origin=new URL(req.headers.origin||'');
  if(origin.protocol!=='https:'||origin.host!==req.headers.host||!/^leopark-portfolio(?:-[a-z0-9-]+)?\.vercel\.app$/.test(origin.hostname)||req.headers['sec-fetch-site']==='cross-site'){res.statusCode=403;return res.end()}
 }catch{res.statusCode=403;return res.end()}
 const secret=process.env.LEGAL_PORTFOLIO_RELAY_SECRET;
 if(!secret||secret.length<32){res.statusCode=503;return res.end()}
 let raw='';
 if(Number(req.headers['content-length'])>2000){res.statusCode=413;return res.end()}
 try{
  if(req.body!==undefined)raw=typeof req.body==='string'?req.body:JSON.stringify(req.body);
  else for await(const chunk of req){raw+=chunk.toString('utf8');if(Buffer.byteLength(raw)>2000){res.statusCode=413;return res.end()}}
  if(Buffer.byteLength(raw)>2000){res.statusCode=413;return res.end()}
 }catch{res.statusCode=400;return res.end()}
 let event;
 try{
  event=JSON.parse(raw);const uuid=/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i;
  if(!['visit','view_step'].includes(event.action)||!uuid.test(event.id)||!uuid.test(event.visitorId)||typeof event.page!=='string'||!event.page.startsWith('/')||typeof event.detail!=='string')throw Error();
 }catch{res.statusCode=400;return res.end()}
 const ip=req.headers['x-vercel-forwarded-for'];
 if(typeof ip!=='string'||ip.length>100){res.statusCode=503;return res.end()}
 const now=Date.now(),entry=recent.get(ip);
 if(entry&&now-entry.at<60000){if(++entry.count>60){res.statusCode=429;return res.end()}}else recent.set(ip,{at:now,count:1});
 while(recent.size>1000)recent.delete(recent.keys().next().value);
 // Only Vercel's authoritative headers are signed. Browser-supplied visitor headers
 // are never forwarded; the receiving LAW project verifies this signature first.
 const visitor={};for(const key of GEO_HEADERS){const value=req.headers[key];if(typeof value==='string'&&value.length<=200)visitor[key]=value}
 const body=JSON.stringify({event,visitor}),timestamp=String(now);
 const signature=createHmac('sha256',secret).update(timestamp+'\n'+body).digest('hex');
 try{
  const upstream=await fetch('https://law-lake-theta.vercel.app/api/portfolio-activity',{
   method:'POST',headers:{'content-type':'application/json',origin:'https://leopark-portfolio.vercel.app','x-law-relay-time':timestamp,'x-law-relay-signature':signature},body,signal:AbortSignal.timeout(12000),redirect:'error'
  });
  res.statusCode=upstream.status;if(upstream.status===429)res.setHeader('Retry-After','60');return res.end();
 }catch{res.statusCode=503;return res.end()}
};
