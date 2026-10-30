const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),crypto=require('node:crypto'),{Readable}=require('node:stream');
const key='isolated-portfolio-relay-test-key-at-least-32-characters';
async function check(){
 const source=fs.readFileSync('portfolio-activity.js','utf8'),sent=[],clicks=[];
 const storage=new Map(),window={};
 const context={window,crypto,Uint8Array,Array,console,location:{hostname:'leopark-portfolio.vercel.app',protocol:'https:',pathname:'/law-project'},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},document:{addEventListener:(name,fn)=>clicks.push(fn)},navigator:{sendBeacon:()=>{throw Error('Must not use an unacknowledged beacon')}},fetch:async(url,options)=>{sent.push({url,options});return {ok:true}}};
 vm.runInNewContext(source,context);vm.runInNewContext(source,context);assert.equal(sent.length,1);assert.equal(clicks.length,1);
 const first=JSON.parse(sent[0].options.body);assert.equal(sent[0].url,'/api/portfolio-events');assert.equal(first.page,'/law-project');assert.equal(first.action,'visit');assert.equal(first.visitorId,storage.get('portfolio-visitor-v1'));
 clicks[0]({target:{closest:selector=>selector==='a.work-card-link'?{querySelector:()=>({textContent:'Law Map'})}:null}});
 assert.equal(sent.length,2);const second=JSON.parse(sent[1].options.body);assert.equal(second.action,'view_step');assert.notEqual(first.id,second.id);assert.equal(first.visitorId,second.visitorId);
 const beforeFetch=global.fetch,beforeKey=process.env.LEGAL_PORTFOLIO_RELAY_SECRET;
 process.env.LEGAL_PORTFOLIO_RELAY_SECRET=key;const handler=require('../api/portfolio-events.js');let forwarded=0;
 global.fetch=async(url,options)=>{forwarded++;assert.equal(url,'https://law-lake-theta.vercel.app/api/portfolio-activity');const at=options.headers['x-law-relay-time'];assert.equal(options.headers['x-law-relay-signature'],crypto.createHmac('sha256',key).update(at+'\n'+options.body).digest('hex'));const data=JSON.parse(options.body);assert.equal(data.visitor['x-vercel-forwarded-for'],'203.0.113.8');assert.equal(data.visitor['x-visitor-ip'],undefined);return {status:204}};
 const send=async({origin='https://leopark-portfolio.vercel.app',body=JSON.stringify(first),parsed=false,method='POST'}={})=>{
  const request=Readable.from([body]);request.method=method;request.headers={origin,host:'leopark-portfolio.vercel.app','x-vercel-forwarded-for':'203.0.113.8','x-vercel-ip-country':'KR','x-visitor-ip':'forged'};if(parsed)request.body=body;
  const response={headers:{},setHeader(k,v){this.headers[k]=v},end(){}};await handler(request,response);return response;
 };
 try{
  assert.equal((await send()).statusCode,204);assert.equal((await send({parsed:true})).statusCode,204);assert.equal(forwarded,2);
  assert.equal((await send({origin:'https://bad.example'})).statusCode,403);assert.equal((await send({method:'GET'})).statusCode,405);
  assert.equal((await send({body:'{bad'})).statusCode,400);assert.equal((await send({body:'x'.repeat(2001)})).statusCode,413);assert.equal(forwarded,2);
 }finally{global.fetch=beforeFetch;if(beforeKey===undefined)delete process.env.LEGAL_PORTFOLIO_RELAY_SECRET;else process.env.LEGAL_PORTFOLIO_RELAY_SECRET=beforeKey}
 console.log('PASS: first-party visitor/click requests, duplicate script guard, event IDs, signed IP relay, streamed/parsed bodies and request rejection');
}
check().catch(error=>{console.error(error);process.exitCode=1});
