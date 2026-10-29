async function previewFetch(url){
 const path=String(url);let data;
 if(path.startsWith('/data/'))data=window.SCOUT_PREVIEW_SNAPSHOT[path.split('/').pop()];
 else if(path==='/api/live')data={available:true,items:[],count:0};
 else if(path==='/api/models')data={models:[{id:'openrouter/free',name:'Auto'}]};
 else if(path==='/api/chat')data={reply:'포트폴리오 재생 화면입니다. 실제 AI 요청은 전송하지 않습니다.'};
 else data={};
 return new Response(JSON.stringify(data||{}),{status:200,headers:{'Content-Type':'application/json'}});
}
const $=s=>document.querySelector(s);
// The non-interactive portfolio replay only needs rows covering its fixed viewport.
// Standalone browsing, filtering and sorting keep the complete candidate list.
const replayPreview=new URLSearchParams(location.search).get('replay')==='1';
const state={region:'core',query:'',status:'all',sort:'recommendation_desc',minFollowers:0,chatBusy:false,chatHistory:[],chatModel:'openrouter/free',chatModels:[{id:'openrouter/free',name:'Auto'}],selected:new Map(),visibleRows:new Map(),
  base:{core:[],fixup:[]},extra:{core:new Map(),fixup:new Map()},
  seen:new Set(),fresh:new Map(),excludedHandles:{core:new Set(),fixup:new Set()},feedReady:false,feedOK:false,feedChecking:false,feedCheckedAt:null,liveCount:0,savedActivity:[]};
const escapeHtml=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const number=v=>v===null||v===undefined||v===''?'—':Number(v).toLocaleString('ko-KR');
// Presentation only: the mascot never inserts candidates or changes source counts.
const scout=(()=>{
 const count=$('#japan-agent-count'),metric=count.closest('.agent-metric');
 const preview=$('#scout-preview');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let actual=null,displayed=0,busy=false,isPreview=false,runId=0,raf=0;
 let animations=[],timers=[],layer=null;
 const later=(fn,ms)=>{const id=setTimeout(fn,ms);timers.push(id);return id};
 const animate=(node,frames,options)=>{
  const animation=node.animate(frames,{fill:'both',...options});animations.push(animation);return animation;
 };
 function clear(){
  runId++;timers.forEach(clearTimeout);timers=[];cancelAnimationFrame(raf);
  animations.forEach(a=>a.cancel());animations=[];layer?.remove();layer=null;
  busy=false;isPreview=false;preview.disabled=false;
  metric.classList.remove('scout-hit');count.removeAttribute('aria-label');
  if(actual!==null){displayed=actual;count.textContent=number(actual);}
 }
 function setCount(value){displayed=value;count.textContent=number(value)}
 function play(from,to,{demo=false,intro=false}={}){
  clear();busy=true;isPreview=demo;preview.disabled=true;
  setCount(from);
  const token=runId;
  const delta=to-from;
  count.setAttribute('aria-label','일본 후보 '+number(from)+'명');
  layer=document.createElement('div');layer.className='scout-fx';layer.setAttribute('aria-hidden','true');
  layer.innerHTML='<div class="scout-flight"><div class="scout-speed"><i></i><i></i><i></i></div><img class="scout-flying-bird" src="/assets/scout-real/scout-eagle.png" alt=""></div>'
   +'<div class="scout-target"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="31"/><circle cx="50" cy="50" r="19"/><path d="M50 7v19m0 48v19M7 50h19m48 0h19"/><path class="scout-target-corners" d="M18 31V18h13m38 0h13v13m0 38v13H69m-38 0H18V69"/><circle class="scout-target-dot" cx="50" cy="50" r="3"/></svg></div>'
   +'<div class="scout-impact"><i class="scout-flash"></i><i class="scout-ring"></i><i class="scout-ring second"></i><b class="scout-impact-star">✦</b></div>'
   +'<div class="scout-delta"></div>';
  document.body.append(layer);
  const flight=layer.querySelector('.scout-flight'),target=layer.querySelector('.scout-target');
  const impact=layer.querySelector('.scout-impact'),badge=layer.querySelector('.scout-delta');
  const position=()=>{
   const rect=count.getBoundingClientRect();
   return {x:rect.left+rect.width/2,y:rect.top+rect.height/2};
  };
  const p=position(),w=innerWidth;
  for(const node of [target,impact,badge]){node.style.left=p.x+'px';node.style.top=p.y+'px'}
  badge.textContent=delta>0?'+'+number(delta):'';
  const hitAt=reduced.matches?0:1540;
  if(reduced.matches){flight.hidden=true;target.hidden=true;impact.hidden=true;}
  else{
   const size=w<650?88:126;
   flight.style.width=size+'px';flight.style.height=size+'px';
   const pose=(x,y,s,r)=>'translate3d('+(x-size/2)+'px,'+(y-size/2)+'px,0) rotate('+r+'deg) scale('+s+')';
   animate(flight,[
    {offset:0,transform:pose(w+130,75,1.15,15),opacity:0},
    {offset:.12,transform:pose(w*.85,92,1.1,-8),opacity:1},
    {offset:.46,transform:pose(Math.max(p.x+150,w*.42),115,1.05,-7),opacity:1},
    {offset:.69,transform:pose(p.x+115,Math.max(70,p.y-65),.9,-23),opacity:1},
    {offset:.92,transform:pose(p.x+17,p.y-5,.54,-28),opacity:1},
    {offset:1,transform:pose(p.x,p.y,.12,-36),opacity:0}
   ],{duration:hitAt,easing:'cubic-bezier(.23,.65,.45,1)'});
   animate(layer.querySelector('.scout-flying-bird'),[
    {transform:'scaleY(1) rotate(0deg)'},{transform:'scaleY(.84) rotate(-3deg)'},{transform:'scaleY(1) rotate(0deg)'}
   ],{duration:190,iterations:8,easing:'ease-in-out'});
   animate(target,[{opacity:0,transform:'translate(-50%,-50%) scale(1.8) rotate(-75deg)'},
    {offset:.25,opacity:1,transform:'translate(-50%,-50%) scale(.95) rotate(0deg)'},
    {offset:.55,opacity:.55,transform:'translate(-50%,-50%) scale(1.09) rotate(0deg)'},
    {offset:.83,opacity:1,transform:'translate(-50%,-50%) scale(.93) rotate(0deg)'},
    {opacity:0,transform:'translate(-50%,-50%) scale(.65) rotate(30deg)'}
   ],{delay:480,duration:hitAt-480+90,easing:'ease-out'});
  }
  later(()=>{
   if(token!==runId)return;
   metric.classList.add('scout-hit');
   count.setAttribute('aria-label','일본 후보 '+number(to)+'명'+(delta>0?', '+number(delta)+'명 증가':''));
   if(!reduced.matches){
    animate(impact.querySelector('.scout-flash'),[{opacity:1,transform:'scale(.1)'},{opacity:.8,offset:.2,transform:'scale(1)'},{opacity:0,transform:'scale(1.8)'}],{duration:380});
    for(const [i,ring] of [...impact.querySelectorAll('.scout-ring')].entries())animate(ring,[{opacity:1,transform:'scale(.15)'},{opacity:0,transform:'scale('+(i?1.8:1.3)+')'}],{duration:650,delay:i*80,easing:'ease-out'});
    animate(impact.querySelector('.scout-impact-star'),[{opacity:1,transform:'scale(.1) rotate(-35deg)'},{offset:.3,opacity:1,transform:'scale(1.2) rotate(15deg)'},{opacity:0,transform:'scale(.7) rotate(45deg)'}],{duration:400});
    for(let i=0;i<12;i++){
     const spark=document.createElement('i');spark.className='scout-spark';impact.append(spark);
     const angle=i*Math.PI/6,radius=35+(i%3)*16;
     animate(spark,[{opacity:1,transform:'translate(-50%,-50%) scale(1)'},
      {opacity:0,transform:'translate(calc(-50% + '+Math.cos(angle)*radius+'px),calc(-50% + '+Math.sin(angle)*radius+'px)) scale(.1)'}],{duration:500+(i%3)*85,easing:'cubic-bezier(.12,.7,.35,1)'});
    }
    animate(count,[{opacity:1},{offset:.2,opacity:.18},{offset:.4,opacity:1},{offset:.6,opacity:.18},{offset:.8,opacity:1},{opacity:1}],{duration:640});
   }
   if(delta>0){
    animate(badge,reduced.matches?[{opacity:1},{offset:.85,opacity:1},{opacity:0}]:[
     {opacity:0,transform:'translate(-50%,-12px) scale(.6)'},
     {offset:.15,opacity:1,transform:'translate(-50%,-36px) scale(1.12)'},
     {offset:.3,opacity:1,transform:'translate(-50%,-33px) scale(1)'},
     {offset:.8,opacity:1,transform:'translate(-50%,-38px) scale(1)'},
     {opacity:0,transform:'translate(-50%,-47px) scale(.95)'}
    ],{duration:2100,easing:'ease-out'});
    if(reduced.matches)setCount(to);
    else{
     const started=performance.now();
     const tick=now=>{
      if(token!==runId)return;
      const t=Math.min(1,(now-started)/620);setCount(Math.round(from+delta*(1-Math.pow(1-t,3))));
      if(t<1)raf=requestAnimationFrame(tick);
     };
     raf=requestAnimationFrame(tick);
    }
   }else setCount(to);
  },hitAt);
  later(clear,hitAt+(intro?1100:2500));
 }
 return {
  update(value){
   const previous=actual;actual=value;
   if(previous===null){setCount(value);return;}
   if(value===previous){if(!busy)setCount(value);return;}
   const from=isPreview?previous:displayed;
   if(value>previous)play(from,value);else clear();
  },
  intro(){if(actual!==null&&!busy)play(actual,actual,{intro:true})},
  preview(){if(actual!==null&&!busy)play(actual,actual+10,{demo:true})},
  cancel:clear
 };
})();
$('#scout-preview').addEventListener('click',()=>scout.preview());
addEventListener('resize',()=>scout.cancel());
addEventListener('scroll',()=>scout.cancel(),{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden)scout.cancel()});
function compact(v){
 if(v===null||v===undefined||v==='')return '—';
 const n=Number(v);if(!Number.isFinite(n))return '—';
 if(Math.abs(n)>=1e6)return Number((n/1e6).toFixed(1))+'M';
 if(Math.abs(n)>=1e3)return Number((n/1e3).toFixed(1))+'K';
 return number(n);
}
function igUrl(v){try{const url=new URL(v);return url.protocol==='https:'&&/^(www\.)?instagram\.com$/.test(url.hostname)?url.href:'#'}catch{return '#'}}
const categories={beauty:'뷰티',food:'맛집',lifestyle:'라이프스타일',fashion:'패션',travel:'여행'};
const validDecisions=new Set(['PASS','REVIEW','REJECT','UNKNOWN']);
function decision(x){const key=String(x.reviewDecision||'UNKNOWN').toUpperCase();return validDecisions.has(key)?key:'UNKNOWN'}
function recommendation(x){
 // Display-only recommendation categories. Preserve the source reviewDecision as-is.
 // Requested mapping: old "연락 후보" -> "강력 추천", old "제외" -> "추천".
 return decision(x)==='REJECT'
  ?{label:'추천',tier:'recommended'}
  :{label:'강력 추천',tier:'strong'};
}
function status(x){const {label,tier}=recommendation(x);return '<span class="status '+tier+'">'+label+'</span>'}
function contactEmails(x){
 const values=Array.isArray(x.emails)?x.emails:[x.email];
 return [...new Set(values.filter(value=>typeof value==='string'&&/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?\.[a-z]{2,}$/i.test(value)))];
}
function emailCell(x){
 const emails=contactEmails(x);
 if(!emails.length)return '<span class="email-missing" title="원본 자료에 확인된 이메일이 없습니다">—</span>';
 return '<div class="email-addresses">'+emails.map(address=>'<a class="email-link" href="mailto:'+encodeURIComponent(address).replace(/%40/g,'@')+'" title="'+escapeHtml(address)+'">'+escapeHtml(address)+'</a>').join('')+'</div>';
}
function buying(x,region=state.region){
 if(region==='fixup')return x.koreaEvidenceSummary||'방한 근거 미확인';
 if(x.evidenceSummary)return x.evidenceSummary;
 if(x.lastGroupbuy)return '공구 기록 '+String(x.lastGroupbuy).slice(0,10).replaceAll('-','.');
 if(Number(x.groupbuyCount)>0)return '공구 '+number(x.groupbuyCount)+'건';
 return null;
}
function merged(key){
 const map=new Map();
 for(const x of state.base[key])map.set(x.handle,x);
 for(const x of state.extra[key].values())map.set(x.handle,x);
 return [...map.values()];
}
function refreshNumbers(){
 const taiwan=merged('core'),japan=merged('fixup');
 $('#core-total').textContent=number(taiwan.length);
 $('#fixup-total').textContent=number(japan.length);
 $('#taiwan-total').textContent=number(taiwan.length);
 scout.update(japan.length);
 refreshFeedStatus();renderSavedTimeline();
}
function refreshFeedStatus(){
 const text=state.feedChecking?'일본 후보 확인 중':state.feedOK?'일본 후보 자동 갱신':state.feedReady?'저장 데이터 표시':'데이터 연결 확인 중';
 $('#feed-text').textContent=text;
 $('#agent-connection').textContent=text;
 for(const selector of ['.header-status','.agent-sync']){
  const indicator=$(selector);indicator.classList.toggle('connected',state.feedOK);indicator.classList.toggle('checking',state.feedChecking);indicator.setAttribute('aria-busy',String(state.feedChecking));
 }
 const last=state.feedCheckedAt?new Intl.DateTimeFormat('ko-KR',{timeZone:'Asia/Seoul',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(state.feedCheckedAt):'';
 $('#agent-last-check').textContent=state.feedChecking?'신규 후보를 조회하고 있어요':state.feedOK?'최근 확인 '+last+' · 60초 간격':state.feedReady?'연결 확인 필요 · 저장된 후보 표시':'신규 후보 연결 확인 중';
}
const timelineClock=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
const timelineDay=new Intl.DateTimeFormat('ko-KR',{timeZone:'Asia/Seoul',month:'long',day:'numeric',weekday:'short'});
function renderSavedTimeline(){
 const records=state.savedActivity.flatMap(event=>(event.handles||[]).map(handle=>({handle,savedAt:event.savedAt,source:event.discoveryLabel||'저장된 후보',provided:true})));
 const supplied=new Set(records.map(item=>item.handle));
 for(const row of state.extra.fixup.values())if(row.createdAt&&!supplied.has(row.handle))records.push({handle:row.handle,savedAt:row.createdAt,source:'신규 후보 발견',provided:false});
 const groups=new Map(),seen=new Set();let total=0,hasLive=false;
 for(const record of records.sort((a,b)=>Date.parse(b.savedAt)-Date.parse(a.savedAt))){
  if(!/^[a-zA-Z0-9._]{2,30}$/.test(record.handle)||!Number.isFinite(Date.parse(record.savedAt)))continue;
  const unique=record.handle+':'+record.savedAt;if(seen.has(unique))continue;seen.add(unique);
  const parts=Object.fromEntries(timelineClock.formatToParts(new Date(record.savedAt)).map(part=>[part.type,part.value]));
  const day=parts.year+'-'+parts.month+'-'+parts.day,clock=parts.hour+':'+parts.minute,key=day+'|'+clock+'|'+record.source;
  if(!groups.has(day))groups.set(day,new Map());
  const events=groups.get(day);if(!events.has(key))events.set(key,{clock,savedAt:record.savedAt,source:record.source,handles:[]});
  events.get(key).handles.push(record.handle);total++;if(!record.provided)hasLive=true;
 }
 $('#saved-activity-count').textContent=number(total)+'명';
 $('#saved-activity-source').textContent=hasLive?'전달받은 내역 + 실시간 · 한국 시간':'전달받은 내역 · 한국 시간';
 $('#saved-timeline').innerHTML=groups.size?[...groups].map(([day,events])=>'<section class="timeline-day"><h4>'+escapeHtml(timelineDay.format(new Date(day+'T12:00:00+09:00')))+'</h4><ol>'+[...events.values()].map(event=>'<li class="timeline-entry"><div class="timeline-entry-heading"><time datetime="'+escapeHtml(event.savedAt)+'">'+escapeHtml(event.clock)+'</time><span class="timeline-saved"><strong>'+number(event.handles.length)+'</strong>명 저장</span></div><p class="timeline-source">'+escapeHtml(event.source)+'</p><div class="timeline-handles">'+event.handles.map(handle=>'<a href="https://www.instagram.com/'+encodeURIComponent(handle)+'/" target="_blank" rel="noopener noreferrer" title="Instagram: @'+escapeHtml(handle)+'">@'+escapeHtml(handle)+'</a>').join('')+'</div></li>').join('')+'</ol></section>').join(''):'<p class="timeline-empty">새로 저장된 후보가 여기에 표시됩니다.</p>';
}
function showDetail(x){
 const stats=[['팔로워',compact(x.followers)],['Reels 평균',compact(x.reels)],['추천도',recommendation(x).label],[state.region==='fixup'?'방한 근거':'공동구매 이력',buying(x)||'근거 미확인']];
 const fields=[['최근 판매 카테고리',(x.categories||[]).map(c=>categories[c]||c).join(', ')||'미수집']];
 $('#detail-content').innerHTML='<div class="drawer-profile"><div><h3>'+escapeHtml(x.name||x.handle)+'</h3><a href="'+escapeHtml(igUrl(x.profileUrl))+'" target="_blank" rel="noopener noreferrer">@'+escapeHtml(x.handle)+'</a></div></div>'
  +'<div class="drawer-metrics">'+stats.map(([label,value])=>'<div class="drawer-metric"><span>'+escapeHtml(label)+'</span><strong>'+escapeHtml(value)+'</strong></div>').join('')+'</div>'
  +'<section class="drawer-field"><h4>이메일</h4>'+emailCell(x)+'</section>'
  +fields.map(([label,value])=>'<section class="drawer-field"><h4>'+escapeHtml(label)+'</h4><p>'+escapeHtml(value)+'</p></section>').join('');
 $('#detail').showModal();
}
function metricValue(row,key){
 const raw=row[key];
 if(raw===null||raw===undefined||raw==='')return null;
 const value=Number(raw);
 return Number.isFinite(value)?value:null;
}
function compareMetric(a,b,key,direction){
 const left=metricValue(a,key),right=metricValue(b,key);
 if(left===null)return right===null?0:1;
 if(right===null)return -1;
 return (left-right)*direction;
}
function compareCandidates(a,b){
 const sort=state.sort;
 let result=0;
 if(sort==='recommendation_desc'||sort==='recommendation_asc'){
  const score={strong:2,recommended:1};
  const direction=sort.endsWith('_desc')?-1:1;
  result=((score[recommendation(a).tier]||0)-(score[recommendation(b).tier]||0))*direction;
  if(!result)result=compareMetric(a,b,'followers',-1);
 }else if(sort==='followers_desc'||sort==='followers_asc'){
  result=compareMetric(a,b,'followers',sort.endsWith('_desc')?-1:1);
  if(!result)result=((recommendation(b).tier==='strong')?1:0)-((recommendation(a).tier==='strong')?1:0);
 }else if(sort==='name'){
  result=String(a.name||a.handle).localeCompare(String(b.name||b.handle),'ko');
 }else if(sort==='new'){
  result=String(b.createdAt||b.updatedAt||'').localeCompare(String(a.createdAt||a.updatedAt||''));
  if(!result)result=compareMetric(a,b,'followers',-1);
 }else if(sort==='reels'){
  result=compareMetric(a,b,'reels',-1);
  if(!result)result=compareMetric(a,b,'followers',-1);
 }
 return result||String(a.handle||'').localeCompare(String(b.handle||''),'en');
}
function updateSortHeaders(){
 for(const column of ['followers','recommendation']){
  const th=document.querySelector('th[data-sort-col="'+column+'"]');
  const button=th.querySelector('.sort-trigger');
  const active=state.sort===column+'_asc'||state.sort===column+'_desc';
  const dir=active?(state.sort.endsWith('_desc')?'descending':'ascending'):'none';
  th.setAttribute('aria-sort',dir);
  button.classList.toggle('active',active);
  button.querySelector('.sort-indicator').textContent=active?(dir==='descending'?'↓':'↑'):'↕';
  button.title=column==='followers'?'팔로워 '+(dir==='descending'?'적은순으로 전환':dir==='ascending'?'많은순으로 전환':'많은순으로 정렬'):
   '추천도 '+(dir==='descending'?'낮은순으로 전환':dir==='ascending'?'높은순으로 전환':'높은순으로 정렬');
 }
}
function setSort(value){
 state.sort=value;
 draw();
}
document.querySelectorAll('.sort-trigger').forEach(button=>button.addEventListener('click',()=>{
 const col=button.dataset.sortCol;
 const next=state.sort===col+'_desc'?col+'_asc':col+'_desc';
 setSort(next);
}));
function draw(){
 let results=merged(state.region).filter(x=>Number(x.followers||0)>=state.minFollowers&&(!state.query||[x.name,x.handle,...contactEmails(x),(x.categories||[]).join(' ')].join(' ').toLowerCase().includes(state.query)));
 results.sort(compareCandidates);
 updateSortHeaders();
 $('#result-title').textContent=state.region==='core'?'대만 후보':'일본 후보';
 $('#evidence-heading').textContent=state.region==='core'?'공동구매 이력':'방한 근거';
 $('#result-count').textContent=number(results.length);
 $('#table-count').textContent='표시 '+number(results.length)+'명';
 $('#table-footnote').textContent=state.region==='fixup'&&state.feedOK?'저장된 후보 + 신규 추가분':'기준 데이터 2026.10.23';
 if(replayPreview)results=results.slice(0,20);
 state.visibleRows=new Map(results.map(x=>[state.region+':'+x.handle,x]));
 const now=Date.now(),tbody=$('#rows');
 tbody.innerHTML=results.map((x,i)=>{
  const buy=buying(x,state.region);
  const verifiedEvidence=!(state.region==='fixup'&&(!x.koreaEvidenceKind||x.koreaEvidenceKind==='unverified'));
  const cat=(x.categories||[]).length?x.categories.slice(0,3).map(c=>'<span class="chip">'+escapeHtml(categories[c]||c)+'</span>').join(''):'<span class="weak">—</span>';
  const fresh=(state.fresh.get(x.handle)||0)>now;
  const tag=x.origin==='live'&&fresh?'<span class="new-tag">NEW</span>':'';
  const key=state.region+':'+x.handle;
  const checked=state.selected.has(key);
  return '<tr class="'+(fresh?'fresh ':'')+(checked?'is-selected':'')+'" data-key="'+escapeHtml(key)+'" aria-selected="'+checked+'" tabindex="0"><td class="check-column"><input class="row-check" type="checkbox" aria-label="@'+escapeHtml(x.handle)+' 선택" data-key="'+escapeHtml(key)+'" '+(checked?'checked':'')+'></td><td><div class="identity"><div class="profile-names"><div class="identity-primary"><a class="handle" href="'+escapeHtml(igUrl(x.profileUrl))+'" target="_blank" rel="noopener noreferrer">@'+escapeHtml(x.handle)+'</a>'+tag+'</div><button type="button" class="name" data-index="'+i+'" title="'+escapeHtml(x.name||x.handle)+'">'+escapeHtml(x.name||x.handle)+'</button></div></div></td>'
    +'<td class="numeric" title="'+escapeHtml(number(x.followers))+'">'+compact(x.followers)+'</td>'
    +'<td>'+status(x)+'</td>'
    +'<td>'+(buy&&verifiedEvidence?'<span class="evidence" title="'+escapeHtml(buy)+'">'+escapeHtml(buy)+'</span>':'<span class="weak">'+(state.region==='fixup'?'방한 근거 미확인':'근거 미확인')+'</span>')+'</td>'
    +'<td>'+cat+'</td><td class="email-cell">'+emailCell(x)+'</td></tr>';
 }).join('');
 tbody.querySelectorAll('[data-index]').forEach(button=>button.addEventListener('click',()=>showDetail(results[Number(button.dataset.index)])));
 refreshSelectionUI();
 $('#empty').hidden=results.length>0;
}

function updateSelectionStyles(){
 const tbody=$('#rows');
 tbody.querySelectorAll('tr[data-key]').forEach(tr=>{
  const selected=state.selected.has(tr.dataset.key);
  tr.classList.toggle('is-selected',selected);
  tr.setAttribute('aria-selected',String(selected));
  const checkbox=tr.querySelector('.row-check');if(checkbox)checkbox.checked=selected;
 });
}
function refreshSelectionUI(){
 const size=state.selected.size;
 const box=$('#selection-actions');
 box.hidden=size===0;
 if(size){
  $('#selected-count').textContent=size+'명 선택';
  const all=[...state.selected.values()];
  $('#selected-summary').textContent=all.length===1?'@'+all[0].candidate.handle:
   '@'+all[0].candidate.handle+' 외 '+(size-1)+'명';
  $('#selected-custom-dm').hidden=size!==1;
  $('#selected-distribute').hidden=size<2;
 }
 const header=$('#select-visible');
 const keys=[...state.visibleRows.keys()];
 const count=keys.filter(k=>state.selected.has(k)).length;
 header.disabled=keys.length===0;
 header.checked=keys.length>0&&count===keys.length;
 header.indeterminate=count>0&&count<keys.length;
}
function toggleCandidateSelection(key,forcedValue){
 const wanted=forcedValue===undefined?!state.selected.has(key):forcedValue;
 if(wanted){
  const candidate=state.visibleRows.get(key)||state.selected.get(key)?.candidate;
  if(!candidate)return;
  const region=key.startsWith('fixup:')?'fixup':'core';
  state.selected.set(key,{region,candidate});
 }else state.selected.delete(key);
 updateSelectionStyles();
 refreshSelectionUI();
}
$('#rows').addEventListener('click',event=>{
 if(event.target.closest('a.email-link'))return;
 if(event.target.closest('input.row-check'))return;
 const row=event.target.closest('tr[data-key]');
 if(row)toggleCandidateSelection(row.dataset.key);
});
$('#rows').addEventListener('change',event=>{
 if(event.target.matches('input.row-check'))toggleCandidateSelection(event.target.dataset.key,event.target.checked);
});
$('#rows').addEventListener('keydown',event=>{
 if(event.target.matches('tr[data-key]')&&(event.key==='Enter'||event.key===' ')){
  event.preventDefault();toggleCandidateSelection(event.target.dataset.key);
 }
});
$('#select-visible').addEventListener('change',event=>{
 for(const [key,candidate] of state.visibleRows){
  if(event.target.checked)state.selected.set(key,{region:state.region,candidate});
  else state.selected.delete(key);
 }
 updateSelectionStyles();refreshSelectionUI();
});
$('#selection-clear').addEventListener('click',()=>{
 state.selected.clear();updateSelectionStyles();refreshSelectionUI();
});
function selectedContext(){
 const all=[...state.selected.values()];
 return all.slice(0,20).map(({region,candidate})=>({region,name:candidate.name,
  handle:candidate.handle,followers:candidate.followers,
  categories:candidate.categories,evidence:buying(candidate,region),reviewDecision:decision(candidate)}));
}
$('#selected-custom-dm').addEventListener('click',()=>{
 const selected=[...state.selected.values()];if(selected.length!==1)return;
 const {region,candidate}=selected[0];
 const local=region==='fixup'?'일본':'대만';
 const prompt=local+' 인스타그램 @'+candidate.handle+'에게 보낼 개인화된 첫 협업 DM을 작성해줘. 확인된 정보만 활용하고, 실제 발송은 하지 마. '+(local==='대만'?'대만식 번체 중국어 원문과 한국어 번역을 병기해줘.':'일본어 원문과 한국어 번역을 병기해줘.');
 sendChat(prompt,selectedContext());
});
$('#selected-distribute').addEventListener('click',()=>{
 const selected=[...state.selected.values()];if(selected.length<2)return;
 const prepared=selectedContext();
 const limit=selected.length>20?' 우선 선택한 20명만 다뤄줘. 나머지 '+(selected.length-20)+'명은 이번 요청에 포함되지 않는다고 명시해줘.':'';
 const regions=new Set(selected.map(v=>v.region));
 const language=regions.size===1?
  (selected[0].region==='fixup'?'일본어 원문과 한국어 번역':'대만식 번체 중국어 원문과 한국어 번역'):
  '대만 대상은 번체 중국어, 일본 대상은 일본어로 작성하고 각각 한국어 번역';
 const prompt='선택한 '+selected.length+'명에게 보낼 맞춤 협업 DM 초안과 발신 계정별 분배를 위한 대상 목록을 준비해줘. '+language+'을 포함해줘. 현재 연결된 Instagram 발신 계정이 없어 실제 발송이나 계정 배정은 불가능하므로 발송 완료로 표시하지 말고, 발신 계정은 미지정으로 표시해줘. 후보별 사실은 제공된 계정 데이터에 한정해줘.'+limit;
 sendChat(prompt,prepared);
});

function changeRegion(region){
 state.region=region;state.query='';state.minFollowers=0;$('#search').value='';
 document.querySelectorAll('[data-region]').forEach(button=>{
  const selected=button.dataset.region===region;button.classList.toggle('active',selected);button.setAttribute('aria-pressed',String(selected));
 });
 draw();
}
function announceNew(count){
 const bar=$('#live-notice');bar.textContent='일본 후보 '+count+'명이 새로 추가되었습니다.';bar.hidden=false;
 setTimeout(()=>{bar.hidden=true;draw()},6300);
}
async function checkFeed(){
 if(document.visibilityState==='hidden'||state.feedChecking)return;
 state.feedChecking=true;refreshFeedStatus();
 try{
  const res=await previewFetch('/api/live',{cache:'no-store'});
  if(!res.ok)throw Error('feed_error');
  const payload=await res.json();
  if(!payload.available||!Array.isArray(payload.items))throw Error('feed_unavailable');
  const initial=new Set(state.base.fixup.map(x=>x.handle));
  let added=0;
  for(const row of payload.items){
   if(!row.handle||initial.has(row.handle)||state.excludedHandles.fixup.has(String(row.handle).toLowerCase()))continue;
   const first=!state.seen.has(row.handle);
   state.extra.fixup.set(row.handle,row);state.seen.add(row.handle);
   if(first&&state.feedReady){state.fresh.set(row.handle,Date.now()+5800);added++;}
  }
  state.liveCount=Number.isFinite(payload.count)?payload.count:state.extra.fixup.size;
  state.feedReady=true;state.feedOK=true;state.feedCheckedAt=new Date();refreshNumbers();draw();
  if(added)announceNew(added);
 }catch(e){state.feedReady=true;state.feedOK=false;refreshNumbers();draw();}
 finally{state.feedChecking=false;refreshFeedStatus();}
}
document.querySelectorAll('[data-region]').forEach(button=>button.addEventListener('click',()=>changeRegion(button.dataset.region)));
$('#search').addEventListener('input',event=>{state.query=event.target.value.trim().toLowerCase();draw()});
$('#close-detail').addEventListener('click',()=>$('#detail').close());
$('#detail').addEventListener('click',event=>{if(event.target===$('#detail'))$('#detail').close()});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')checkFeed()});
(async()=>{
 try{
  const [tw,jp,excluded]=await Promise.all(['/data/kol-scout-taiwan.json','/data/fixup.json','/data/excluded-handles.json'].map(url=>previewFetch(url).then(r=>{if(!r.ok)throw Error(url);return r.json()})));
  state.excludedHandles.core=new Set((excluded.core||[]).map(v=>String(v).toLowerCase()));
  state.excludedHandles.fixup=new Set((excluded.fixup||[]).map(v=>String(v).toLowerCase()));
  state.base.core=(tw.items||[]).filter(x=>!state.excludedHandles.core.has(String(x.handle).toLowerCase()));
  state.base.fixup=(jp.items||[]).filter(x=>!state.excludedHandles.fixup.has(String(x.handle).toLowerCase()));
  refreshNumbers();draw();window.scoutPreviewReady=true;window.dispatchEvent(new Event('scout:ready'));
 }catch(e){console.error('Snapshot load error',e);$('#empty').hidden=false;$('#empty').textContent='후보 데이터를 불러올 수 없습니다.'}
})();

previewFetch('/data/saved-activity.json',{cache:'no-store'}).then(response=>{if(!response.ok)throw Error('saved_activity_unavailable');return response.json()})
 .then(data=>{state.savedActivity=Array.isArray(data.events)?data.events:[];renderSavedTimeline()})
 .catch(()=>{$('#saved-activity-source').textContent='저장 내역을 불러오지 못했습니다';});

function addMessage(role,text){
 const node=document.createElement('div');node.className='message '+(role==='user'?'user-message':'assistant-message');
 const label=document.createElement('div');label.className='message-label';
 if(role==='user')label.textContent='나';
 else{
  const portrait=document.createElement('span');portrait.className='scout-chat-avatar';
  const image=document.createElement('img');image.src='/assets/scout-real/scout-standing.png?v=20261023-profile';image.alt='Scout';image.width=42;image.height=42;
  portrait.append(image);label.append(portrait);
 }
 const body=document.createElement('div');body.className='message-body';body.textContent=text;
 node.append(label,body);$('#chat-messages').append(node);
 $('#chat-messages').scrollTop=$('#chat-messages').scrollHeight;
 return node;
}
addMessage('assistant','안녕하세요, Scout예요.\n찾고 싶은 후보나 작성할 메시지를 알려주세요.');
function localFilterRequest(message){
 const text=message.toLowerCase();
 if(!/(찾아|보여|필터|선별|걸러)/.test(text)||/(dm|메시지|문구|작성|보내)/.test(text))return null;
 const region=/일본|japan|日本/.test(text)?'fixup':/대만|taiwan|台灣/.test(text)?'core':null;
 if(!region)return null;
 const match=text.match(/(\d+(?:\.\d+)?)\s*(k|만|천)\s*(?:명|이상)?/i);
 if(!match)return null;
 const amount=Math.round(Number(match[1])*(match[2]==='k'?1000:match[2]==='만'?10000:1000));
 return amount>=1000&&amount<=1e8?{region,amount}:null;
}
async function sendChat(prompt,overrideCandidates=null){
 const text=String(prompt||'').trim().slice(0,1000);
 if(!text||state.chatBusy)return;
 addMessage('user',text);
 const filter=localFilterRequest(text);
 if(filter){
  changeRegion(filter.region);state.minFollowers=filter.amount;state.sort='followers_desc';draw();
  const count=merged(filter.region).filter(x=>Number(x.followers||0)>=filter.amount).length;
  addMessage('assistant',(filter.region==='fixup'?'일본':'대만')+' 후보 중 팔로워 '+compact(filter.amount)+' 이상 '+number(count)+'명을 목록에 표시했습니다.');
  previewFetch('/api/activity',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({request:text,region:filter.region,amount:filter.amount})})
   .then(response=>{if(!response.ok)showActivityWarning()}).catch(showActivityWarning);
  return;
 }
 state.chatBusy=true;$('#chat-send').disabled=true;
 const pending=addMessage('assistant','답변을 작성하고 있습니다…');
 pending.classList.add('is-thinking');
 const messages=[...state.chatHistory,{role:'user',content:text}].slice(-8);
 const candidates=overrideCandidates||merged(state.region).filter(x=>decision(x)!=='REJECT').sort((a,b)=>Number(b.followers||0)-Number(a.followers||0)).slice(0,20).map(x=>({
  region:state.region,name:x.name,handle:x.handle,followers:x.followers,categories:x.categories,reviewDecision:decision(x)
 }));
 try{
  const response=await previewFetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages,candidates,model:state.chatModel})});
  const payload=await response.json();
  if(response.headers.get('X-Scout-Activity')==='unavailable')showActivityWarning();
  if(!response.ok){
   const errors={rate_limited:'현재 대화 요청 한도에 도달했습니다. 잠시 후 다시 시도해 주세요.',chat_not_configured:'대화 연결 설정을 확인할 수 없습니다.',unsupported_model:'선택한 모델을 사용할 수 없습니다. 모델을 다시 선택해 주세요.'};
   pending.querySelector('.message-body').textContent=errors[payload.error]||'답변을 받아오지 못했습니다. 다시 요청해 주세요.';
  }else{
   pending.querySelector('.message-body').textContent=payload.reply;
   state.chatHistory=[...messages,{role:'assistant',content:payload.reply}].slice(-8);
  }
 }catch(e){pending.querySelector('.message-body').textContent='연결 오류가 발생했습니다. 다시 요청해 주세요.';}
 finally{pending.classList.remove('is-thinking');state.chatBusy=false;$('#chat-send').disabled=false;$('#chat-messages').scrollTop=$('#chat-messages').scrollHeight;}
}
$('#chat-form').addEventListener('submit',event=>{
 event.preventDefault();
 const box=$('#chat-input'),text=box.value;box.value='';sendChat(text);
});
function showActivityWarning(){const notice=$('#activity-warning');if(notice)notice.hidden=false}
const modelPicker=$('#model-picker');
const modelTrigger=$('#chat-model-trigger');
const modelMenu=$('#chat-model-menu');
function closeModelMenu(focusTrigger=false){
 if(modelMenu.hidden)return;
 modelMenu.hidden=true;
 modelTrigger.setAttribute('aria-expanded','false');
 modelPicker.classList.remove('is-open');
 if(focusTrigger)modelTrigger.focus();
}
function focusModelOption(index){
 const options=[...modelMenu.querySelectorAll('.model-picker-option')];
 if(!options.length)return;
 options[(index+options.length)%options.length].focus();
}
function openModelMenu(focusMode='selected'){
 modelMenu.hidden=false;
 modelPicker.classList.add('is-open');
 modelTrigger.setAttribute('aria-expanded','true');
 if(focusMode==='none')return;
 const options=[...modelMenu.querySelectorAll('.model-picker-option')];
 const selectedIndex=options.findIndex(option=>option.dataset.modelId===state.chatModel);
 focusModelOption(focusMode==='last'?options.length-1:focusMode==='first'?0:Math.max(0,selectedIndex));
}
function chooseModel(id){
 const found=state.chatModels.find(model=>model.id===id);
 if(!found)return;
 state.chatModel=id;
 $('#chat-model-label').textContent=found.name;
 renderModelMenu();
 closeModelMenu(true);
}
function renderModelMenu(){
 modelMenu.replaceChildren();
 for(const model of state.chatModels){
  const option=document.createElement('button');
  option.type='button';
  option.className='model-picker-option';
  option.setAttribute('role','option');
  option.dataset.modelId=model.id;
  const selected=model.id===state.chatModel;
  option.setAttribute('aria-selected',String(selected));
  if(selected)option.classList.add('selected');
  const label=document.createElement('span');
  label.className='model-option-label';
  label.textContent=model.name;
  const mark=document.createElement('span');
  mark.className='model-option-check';
  mark.setAttribute('aria-hidden','true');
  mark.textContent=selected?'✓':'';
  option.append(label,mark);
  option.addEventListener('click',()=>chooseModel(model.id));
  modelMenu.append(option);
 }
}
modelTrigger.addEventListener('click',()=>{
 if(modelMenu.hidden)openModelMenu('none');else closeModelMenu();
});
modelTrigger.addEventListener('keydown',event=>{
 if(event.key==='ArrowDown'||event.key==='ArrowUp'){
  event.preventDefault();
  if(modelMenu.hidden)openModelMenu(event.key==='ArrowUp'?'last':'first');
  else focusModelOption(event.key==='ArrowUp'?-1:0);
 }else if(event.key==='Escape'){closeModelMenu();}
});
modelMenu.addEventListener('keydown',event=>{
 const options=[...modelMenu.querySelectorAll('.model-picker-option')];
 const index=options.indexOf(document.activeElement);
 if(event.key==='ArrowDown'||event.key==='ArrowUp'){
  event.preventDefault();focusModelOption(index+(event.key==='ArrowDown'?1:-1));
 }else if(event.key==='Home'||event.key==='End'){
  event.preventDefault();focusModelOption(event.key==='Home'?0:options.length-1);
 }else if(event.key==='Escape'||event.key==='Tab'){
  if(event.key==='Escape')event.preventDefault();
  closeModelMenu(event.key==='Escape');
 }
});
document.addEventListener('pointerdown',event=>{
 if(!modelPicker.contains(event.target))closeModelMenu();
});
renderModelMenu();
async function loadChatModels(){
 try{
  const response=await previewFetch('/api/models',{cache:'no-store'});
  if(!response.ok)throw new Error('model_list_unavailable');
  const payload=await response.json();
  if(!Array.isArray(payload.models))throw new Error('invalid_models');
  const ids=new Set();
  const models=payload.models.filter(model=>{
   if(typeof model.id!=='string'||typeof model.name!=='string'||ids.has(model.id))return false;
   ids.add(model.id);return true;
  });
  if(models.length){
   state.chatModels=models;
   if(!models.some(model=>model.id===state.chatModel))state.chatModel=models[0].id;
   $('#chat-model-label').textContent=models.find(model=>model.id===state.chatModel).name;
   renderModelMenu();
  }
 }catch(e){modelTrigger.title='현재 기본 자동 모델을 사용합니다';}
}
loadChatModels();
document.querySelectorAll('[data-example]').forEach(button=>button.addEventListener('click',()=>sendChat(button.dataset.example)));
