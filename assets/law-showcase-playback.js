/* Four-scene camera direction for the local Law Map portfolio.
   All camera coordinates are based on the real 1666x900 application viewport.
   This file controls presentation only; it never modifies the legal service. */
(() => {
  'use strict';
  const shells=[...document.querySelectorAll('[data-law-playback]')];
  if(!shells.length || !['127.0.0.1','localhost'].includes(location.hostname))return;
  const scenes={
    step1:{
      starts:0,ends:3,
      shots:{
        0:{x:840,y:440,z:1,title:'대화 시작',desc:'새 대화에서 실제 사건 예시를 확인합니다.'},
        1:{x:650,y:326,z:2.10,title:'사건 예시 선택',desc:'‘퇴사했는데 아직 월급을 못 받았어요’ 카드를 선택합니다.'},
        2:{x:862,y:795,z:2.10,title:'입력 및 전송',desc:'선택한 문장이 입력되고 전송 버튼이 활성화됩니다.'},
        3:{x:282,y:320,z:2.05,title:'상황 확인 시작',desc:'전송 후 필요한 정보를 확인하는 단계로 넘어갑니다.'}
      }
    },
    step2:{
      starts:4,ends:11,
      shots:{
        4:{x:292,y:244,z:2.15,title:'첫 번째 질문',desc:'지금까지 어떤 절차를 진행했는지 확인합니다.'},
        5:{x:288,y:454,z:2.38,title:'진행 단계 선택',desc:'회사에 지급을 요청한 상태라는 답변을 선택합니다.'},
        6:{x:290,y:565,z:2.20,title:'다음 질문 준비',desc:'선택한 답변을 바탕으로 3초간 다음 질문을 준비합니다.'},
        7:{x:290,y:255,z:2.15,title:'두 번째 질문',desc:'미지급 임금의 규모를 확인합니다.'},
        8:{x:290,y:468,z:2.38,title:'미지급 금액 선택',desc:'해당 금액 구간을 선택해 상황을 구체화합니다.'},
        9:{x:290,y:555,z:2.20,title:'추가 질문 준비',desc:'답변을 반영해 3초간 마지막 질문을 준비합니다.'},
        10:{x:292,y:496,z:2.30,title:'상황 직접 입력',desc:'퇴사 시기와 회사의 답변을 주관식으로 입력합니다.'},
        11:{x:295,y:460,z:2.10,title:'로드맵 구성',desc:'확인한 세 가지 답변으로 절차 지도를 생성합니다.'}
      }
    },
    step3:{
      starts:12,ends:15,
      shots:{
        12:{x:666,y:455,z:1.16,title:'전체 흐름 확인',desc:'Depth 1의 현재 상황과 Depth 2의 선택지를 먼저 보여줍니다.'},
        13:{x:672,y:215,z:1.91,title:'첫 번째 대응 방법',desc:'회사에 정식으로 지급을 요청하는 경로를 살펴봅니다.'},
        14:{x:1430,y:255,z:1.78,title:'선택한 방법의 상세 정보',desc:'노동청 진정의 예상 기간, 절차, 결과를 오른쪽에서 확인합니다.'},
        15:{x:1450,y:730,z:2.10,title:'다음 절차 펼치기',desc:'‘이 방법으로 진행’ 버튼을 누르면 하위 단계가 열립니다.'}
      }
    },
    step4:{
      starts:15,ends:21,
      shots:{
        15:{x:1450,y:730,z:2.10,title:'다음 단계 실행',desc:'오른쪽 상세 패널에서 다음 절차를 펼칩니다.'},
        16:{x:690,y:470,z:1.45,title:'Depth 3 · 진정 접수',desc:'접수부터 이어지는 실제 절차 카드를 확인합니다.'},
        17:{x:700,y:470,z:1.53,title:'Depth 3 · 사실관계 조사',desc:'다음 카드로 이동해 조사 단계를 따라갑니다.'},
        18:{x:704,y:470,z:1.53,title:'Depth 3 · 지급 및 후속 대응',desc:'실제 지급 여부를 확인하는 단계까지 이동합니다.'},
        19:{x:694,y:472,z:1.48,title:'결과 ① · 미지급 지속',desc:'지급되지 않는 경우 이어지는 다른 법적 경로를 확인합니다.'},
        20:{x:690,y:468,z:1.48,title:'결과 ② · 임금 지급',desc:'지급된 경우의 결과와 종료 조건을 확인합니다.'},
        21:{x:1438,y:275,z:1.78,title:'종료 조건 확인',desc:'마지막으로 오른쪽에서 종료 기준과 결과를 읽습니다.'}
      }
    }
  };
  const visible=new Set();
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const frameSize={width:1666,height:900};
  function prepare(shell,scene){
    const guide=document.createElement('div');
    guide.className='law-scene-guide';
    guide.setAttribute('aria-live','off');
    const progress=document.createElement('div');
    progress.className='law-scene-guide-progress';
    progress.innerHTML='<span></span>';
    guide.innerHTML='<div class="law-scene-guide-text"><span class="law-scene-guide-counter"></span><strong></strong><p></p></div>';
    guide.append(progress);
    shell.insertBefore(guide,shell.querySelector('.law-showcase-viewport'));
    shell.dataset.stage=String(scene.starts);
    updateGuide(shell,scene);
  }
  function updateGuide(shell,scene){
    const stage=Number(shell.dataset.stage||scene.starts);
    const shot=scene.shots[stage]||scene.shots[scene.starts];
    const ordinal=stage-scene.starts+1;
    shell.querySelector('.law-scene-guide-counter').textContent=String(ordinal).padStart(2,'0')+' / '+String(scene.ends-scene.starts+1).padStart(2,'0');
    shell.querySelector('.law-scene-guide-text strong').textContent=shot.title;
    shell.querySelector('.law-scene-guide-text p').textContent=shot.desc;
    shell.querySelector('.law-scene-guide-progress span').style.width=(ordinal/(scene.ends-scene.starts+1)*100)+'%';
    shell.querySelector('.law-showcase-viewport')?.classList.toggle('use-final-still',shell.dataset.lawPlayback==='step4'&&stage>=20);
  }
  function camera(shell){
    const scene=scenes[shell.dataset.lawPlayback];
    const viewport=shell.querySelector('.law-showcase-viewport');
    const frame=viewport.querySelector('iframe');
    if(!frame||!viewport.clientWidth||!viewport.clientHeight)return;
    const stage=Number(shell.dataset.stage||scene.starts);
    const shot=scene.shots[stage]||scene.shots[scene.starts];
    const scale=Math.min(viewport.clientWidth/frameSize.width,viewport.clientHeight/frameSize.height)*shot.z;
    frame.style.transform='translate('+(viewport.clientWidth/2-shot.x*scale)+'px,'+(viewport.clientHeight/2-shot.y*scale)+'px) scale('+scale+')';
    const still=viewport.querySelector('img');
    if(still)still.style.transform=frame.style.transform;
  }
  function playback(shell){
    const frame=shell.querySelector('iframe');
    if(!frame?.contentWindow)return;
    const active=visible.has(shell)&&!document.hidden&&!reduced.matches;
    frame.contentWindow.postMessage(active?'law-showcase:play':'law-showcase:pause','*');
  }
  shells.forEach(shell=>{
    const scene=scenes[shell.dataset.lawPlayback];
    if(!scene)return;
    prepare(shell,scene);
    const frame=document.createElement('iframe');
    frame.className='law-scene-frame';
    frame.title='Law Map '+shell.dataset.lawPlayback+' 실제 인터페이스 시연';
    const testSpeed=new URLSearchParams(location.search).get('showcaseTestSpeed');
    const probe=Number(new URLSearchParams(location.search).get('showcaseShot'));
    const fixedStage=Number.isInteger(probe)&&new URLSearchParams(location.search).has('showcaseShot')&&probe>=scene.starts&&probe<=scene.ends?'&showcaseStatic='+probe:'';
    frame.src='http://127.0.0.1:3700/?showcase=1&showcaseScene='+shell.dataset.lawPlayback+(testSpeed==='10'?'&showcaseTestSpeed=10':'')+fixedStage;
    frame.setAttribute('aria-hidden','true');
    frame.tabIndex=-1;
    frame.inert=true; // Passive portfolio replay must never steal focus or scroll its host page.
    frame.loading='lazy';
    shell.querySelector('.law-showcase-viewport').append(frame);
    frame.addEventListener('load',()=>{camera(shell);playback(shell)});
    shell.querySelector('.law-scene-replay').addEventListener('click',()=>{
      shell.dataset.stage=String(scene.starts);
      updateGuide(shell,scene);
      camera(shell);
      frame.contentWindow?.postMessage('law-showcase:replay','*');
    });
    new ResizeObserver(()=>camera(shell)).observe(shell.querySelector('.law-showcase-viewport'));
    camera(shell);
  });
  addEventListener('message',event=>{
    const shell=shells.find(s=>s.querySelector('iframe')?.contentWindow===event.source);
    if(!shell)return;
    const scene=scenes[shell.dataset.lawPlayback];
    if(event.data?.type==='law-showcase:phase'&&Number.isInteger(event.data.stage)&&event.data.stage>=scene.starts&&event.data.stage<=scene.ends){
      shell.dataset.stage=String(event.data.stage);
      updateGuide(shell,scene);
      camera(shell);
      shell.querySelector('.law-showcase-viewport').classList.add('is-live');
    }
    if(event.data?.type==='law-showcase:ready'){
      shell.querySelector('.law-showcase-viewport').classList.add('is-live');
      playback(shell);
    }
  });
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting)visible.add(entry.target);else visible.delete(entry.target);
    playback(entry.target);
  }),{threshold:.16});
  shells.forEach(shell=>observer.observe(shell));
  document.addEventListener('visibilitychange',()=>shells.forEach(playback));
  reduced.addEventListener('change',()=>shells.forEach(playback));
  addEventListener('resize',()=>shells.forEach(camera));
})();
