
// Replay only: same renderer, CSS, mascot keyframes and real saved candidates.
(()=>{
 const full=structuredClone(window.SCOUT_PREVIEW_SNAPSHOT['fixup.json'].items);
 const held=full.slice(0,10),baseline=full.slice(10);let timers=new Set(),paused=parent!==window,ready=false,run=0,started=false;
 const later=(fn,ms)=>{const id=setTimeout(()=>{timers.delete(id);fn()},ms);timers.add(id);return id};
 function clear(){timers.forEach(clearTimeout);timers.clear();scout.cancel();run++}
 const pauseStyle=document.createElement('style');
 pauseStyle.textContent='html[data-playback="paused"] *,html[data-playback="paused"] *::before,html[data-playback="paused"] *::after{animation-play-state:paused!important}';
 document.head.append(pauseStyle);
 document.documentElement.dataset.playback='paused';
 function syncPlayback(){
  const stopped=paused||document.hidden||matchMedia('(prefers-reduced-motion:reduce)').matches;
  document.documentElement.dataset.playback=stopped?'paused':'playing';
  if(stopped)clear();else start();
  parent.postMessage({type:'scout:playback',state:stopped?'paused':'playing'},location.origin);
 }
 function parentEvent(event,extra={}){parent.postMessage({type:'scout:phase',phase:event,...extra},location.origin)}
 function type(node,text,done){let n=0;const token=run;function step(){if(token!==run)return;node.textContent=text.slice(0,++n);if(node===document.querySelector('#chat-input'))node.value=text.slice(0,n);if(n<text.length)later(step,42);else done?.()}step()}
 function reset(){
  state.base.fixup=structuredClone(baseline);state.extra.fixup.clear();state.fresh.clear();state.selected.clear();state.chatHistory=[];state.chatBusy=false;
  state.feedReady=true;state.feedOK=true;state.feedCheckedAt=new Date('2026-10-23T11:47:00Z');
  state.savedActivity=structuredClone(window.SCOUT_PREVIEW_SNAPSHOT['saved-activity.json'].events||[]);
  document.querySelector('#chat-messages').replaceChildren();addMessage('assistant','안녕하세요, Scout예요.\n찾고 싶은 후보나 작성할 메시지를 알려주세요.');
  document.querySelector('#chat-input').value='';document.querySelector('#chat-send').disabled=false;
  changeRegion('core');refreshNumbers();document.querySelector('#table-container').scrollTop=0;
 }
 function start(){
  if(!ready||paused||document.hidden)return;clear();reset();parentEvent('overview');
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  later(()=>{
   for(const row of held)state.extra.fixup.set(row.handle,{...row,origin:'live'});
   // Native update computes the actual number's bounding rect and triggers +10 at impact.
   refreshNumbers();
   later(()=>{for(const row of held)state.fresh.set(row.handle,Date.now()+6500);changeRegion('fixup');state.sort='followers_desc';draw();document.querySelector('#table-container').scrollTop=0;parentEvent('added',{count:held.length,total:full.length})},1560);
  },350);
  later(()=>{
   parentEvent('chat');const input=document.querySelector('#chat-input');
   type(input,'새 일본 후보의 협업 제안 DM 초안을 써줘.',()=>{
    later(()=>{
     const prompt=input.value;input.value='';addMessage('user',prompt);const response=addMessage('assistant','답변을 작성하고 있습니다…');response.classList.add('is-thinking');
     later(()=>{response.classList.remove('is-thinking');const body=response.querySelector('.message-body');type(body,'일본 후보에게 보낼 제안 초안입니다.\n\nこんにちは。韓国でのコラボについて、ご相談したくご連絡しました。\n\n[업체명]과 [협업 내용]을 넣고, 후보의 콘텐츠에 맞게 제안 이유를 다듬어 주세요.\n\n※ 재생용 예시 답변입니다. 실제 AI 호출이나 DM 발송은 하지 않습니다.',()=>{document.querySelector('#chat-messages').scrollTop=document.querySelector('#chat-messages').scrollHeight;parentEvent('answered')})},900)
    },450)
   });
  },6500);
  later(()=>parentEvent('overview'),21000);later(start,25000);
 }
 function onReady(){if(ready)return;ready=true;if(!started){reset();started=true;}syncPlayback()}addEventListener('scout:ready',onReady);if(window.scoutPreviewReady)onReady();
 addEventListener('message',event=>{
  if(event.origin!==location.origin||event.source!==parent)return;
  if(event.data==='scout:pause'){paused=true;syncPlayback()}
  if(event.data==='scout:play'||event.data==='scout:replay'){paused=false;syncPlayback()}
 });
 document.addEventListener('visibilitychange',syncPlayback);
 matchMedia('(prefers-reduced-motion:reduce)').addEventListener('change',syncPlayback);
})();
