/* Standalone portfolio reproduction of the 3700 intake conversation and analysis progress.
   No requests, imports, or writes to the production 3700 application. */
(function(){
  'use strict';
  var root=document.querySelector('[data-law-intake-demo]');
  if(!root)return;
  var questions=[
    {title:'퇴사한 뒤 밀린 월급을 받기 위해 어떤 절차를 진행하셨나요?',options:['회사에 지급을 요청했다','노동청 진정을 제기하거나 법률구조를 신청했다','소송·지급명령을 진행했거나 판결을 받았다'],answer:0},
    {title:'회사에서 아직 지급하지 않은 월급은 어느 정도인가요?',hint:'금액과 미지급 항목을 확인하면 필요한 증빙과 가능한 절차를 구체화할 수 있어요.',options:['100만 원 미만','100만 원~500만 원','500만 원 이상'],answer:1},
    {title:'퇴사한 시기와 회사에 지급을 요청한 상황을 알려주세요.',hint:'날짜와 회사의 답변을 알면 다음 절차를 더 정확하게 정리할 수 있어요.',options:[]}
  ];
  var sampleDetail='2026년 8월에 퇴사했고, 밀린 월급은 약 320만 원입니다. 회사에 지급을 요청했지만 아직 구체적인 날짜를 안내받지 못했습니다.';
  var activity={
    intake:['사건의 현재 단계와 필요한 정보를 구분하고 있어요.','다음 절차를 판단할 핵심 조건을 살펴보고 있어요.','빠진 정보가 없는지 확인 질문을 정리하고 있어요.'],
    analyzing:['이미 진행한 절차와 앞으로의 절차를 구분하고 있어요.','선택할 수 있는 대응 방법을 비교하고 있어요.','결과에 따라 달라지는 경로를 살펴보고 있어요.','지도에 표시할 진행 순서를 정리하고 있어요.']
  };
  var stage=0,intro=true,choice='',detail='',openText=false,answers=[],paused=false,visible=false,loading=false;
  var timers=[],typingTimer=null,progressTimer=null,loadingStarted=0;
  var reduces=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function esc(value){return String(value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function stop(){
    timers.forEach(clearTimeout);timers=[];
    if(typingTimer!==null){clearInterval(typingTimer);typingTimer=null;}
    if(progressTimer!==null){clearInterval(progressTimer);progressTimer=null;}
  }
  function after(ms,fn){timers.push(setTimeout(fn,ms));}
  function questionHTML(){
    var q=questions[stage];
    var options=q.options.map(function(value,i){
      return '<button type="button" data-law-choice="'+i+'" aria-pressed="'+(choice===value)+'"><i class="law-intake-radio" aria-hidden="true"></i><span>'+esc(value)+'</span></button>';
    }).join('');
    var body=stage<2?
      '<div class="law-intake-options" role="group" aria-label="답변 선택">'+options+'</div>'+
      '<button type="button" class="law-intake-open-text" data-law-more aria-expanded="'+openText+'">직접 답변하거나 내용 추가 <span aria-hidden="true">'+(openText?'⌃':'⌄')+'</span></button>'+
      (openText?'<label class="law-intake-textlabel" for="law-demo-detail">답변에 덧붙일 내용</label><textarea class="law-intake-textarea" id="law-demo-detail" placeholder="추가 내용을 적어주세요.">'+esc(detail)+'</textarea>':''):
      '<label class="law-intake-textlabel" for="law-demo-detail">구체적인 내용을 적어주세요</label><textarea class="law-intake-textarea" id="law-demo-detail" placeholder="퇴사 시기, 미지급액과 지급 요청 내용을 적어주세요.">'+esc(detail)+'</textarea>';
    return '<div class="law-intake-card"><div class="law-intake-progress"><span>현재 상황 확인</span><b>질문 '+(stage+1)+' / 3</b></div><div class="law-intake-track"><span style="width:'+((stage+1)*100/3)+'%"></span></div><h4>'+esc(q.title)+'</h4>'+(q.hint?'<p class="law-intake-hint">'+esc(q.hint)+'</p>':'')+body+'<div class="law-intake-actions"><button type="button" data-law-unknown>정확히 모르겠어요</button><button type="button" class="law-intake-next" data-law-next '+(!(choice||detail.trim())?'disabled':'')+'>이 답변으로 계속 <span aria-hidden="true">→</span></button></div></div>';
  }
  function loadingHTML(){
    var final=stage===3;
    var title=final?'가능한 경로를 정리하고 있어요':'확인할 질문을 준비하고 있어요';
    var message=final?'입력한 내용을 바탕으로 진행 경로와 다음 절차를 정리하고 있어요.':'지금까지 답변한 내용을 검토해 다음 질문을 준비하고 있어요.';
    var steps=final?['경로 정리','자료 확인','내용 점검']:['상황 확인','조건 검토','질문 준비'];
    var icon='<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="5" r="2"/><circle cx="18" cy="5" r="2"/><circle cx="12" cy="19" r="2"/><path d="M6 7v5h12V7M12 12v5"/></svg>';
    return '<div class="law-demo-processing" role="status" aria-label="'+esc(title)+'">'+
       '<span class="law-demo-processing-icon" aria-hidden="true">'+icon+'</span>'+
       '<div class="law-demo-progress-card"><div class="law-demo-progress-title"><span class="law-demo-spinner-frame"><span class="law-intake-spinner"></span></span><strong>'+title+'</strong></div>'+
       '<p class="law-demo-progress-message">'+message+'</p>'+
       '<div class="law-demo-progress-activity"><span class="law-demo-wave" aria-hidden="true"><i></i><i></i><i></i></span><span data-law-activity>'+activity[final?'analyzing':'intake'][0]+'</span></div>'+
       '<ol class="law-demo-progress-steps">'+steps.map(function(step,i){return '<li data-law-progress-step="'+i+'" class="'+(i===0?'active':'')+'"><span class="law-demo-progress-number">'+(i+1)+'</span><span>'+step+'</span></li>';}).join('')+'</ol>'+
       '<div class="law-demo-progress-meta"><span class="law-demo-progress-elapsed"><span aria-hidden="true">◷</span> <span data-law-clock>0초 경과</span></span><button type="button" data-law-stop>중지</button></div></div></div>';
  }
  function historyHTML(){
    if(stage===0)return '';
    var html=[];
    // Focus on the current question: keep only the latest completed answer.
    for(var i=Math.max(0,stage-1);i<Math.min(stage,3);i++){
      var response=answers[i]||(i<2?questions[i].options[questions[i].answer]:sampleDetail);
      html.push('<div class="law-intake-history-question">'+esc(questions[i].title)+'</div><div class="law-intake-history-answer">'+esc(response)+'</div>');
    }
    return '<div class="law-intake-history">'+html.join('')+'</div>';
  }
  function homeHTML(){
    var arrow='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>';
    return '<div class="law-intake-home">'+
      '<div class="law-intake-home-header"><h4>어떤 일이 있었나요?</h4><span class="law-intake-home-fold" aria-label="대화 접기">▣ &nbsp;대화 접기</span></div>'+
      '<p class="law-intake-home-subtitle">편하게 이야기하면, 가능한 방법을 정리해요.</p>'+
      '<h5 class="law-intake-home-title">이런 고민부터 이야기할 수 있어요</h5>'+
      '<div class="law-intake-examples">'+
       '<button type="button" class="law-intake-example" data-law-example aria-label="퇴사했는데 아직 월급을 못 받았어요 예시로 시작하기"><span><small>회사에서</small>퇴사했는데 아직 월급을 못 받았어요.</span>'+arrow+'</button>'+
       '<div class="law-intake-example"><span><small>집 계약에서</small>계약이 끝났는데 보증금을 안 돌려줘요.</span>'+arrow+'</div>'+
       '<div class="law-intake-example"><span><small>경찰 연락을 받고</small>경찰서에 오라는 연락을 받았어요.</span>'+arrow+'</div>'+
      '</div></div>';
  }
  function render(){
    var composer='<div class="law-intake-composer"><div class="law-intake-composebox"><span>'+
      (intro?'어떤 일이 있었나요? 편하게 적어주세요.':'위 질문에 답하거나 내용을 추가할 수 있어요.')+
      '</span><div class="law-intake-composebar"><div><span class="law-intake-model">GPT</span><span class="law-intake-settings" aria-label="설정" role="img">☷</span></div><span class="law-intake-send" aria-hidden="true">↑</span></div></div></div>';
    var windowHTML=intro?
      '<div class="law-intake-window law-intake-window--home">'+homeHTML()+composer+'</div>':
      '<div class="law-intake-window"><div class="law-intake-top">대화</div>'+
      '<div class="law-intake-thread" data-law-thread><div class="law-intake-user">퇴사했는데 아직 월급을 못 받았어요.</div>'+
      historyHTML()+(loading?loadingHTML():questionHTML())+'</div>'+composer+'</div>';
    root.innerHTML=windowHTML;
    if(intro){
      root.querySelector('[data-law-example]').addEventListener('click',function(){
        stop();intro=false;paused=false;render();schedule();
      });
      return;
    }
    var cancel=root.querySelector('[data-law-stop]');
    if(cancel)cancel.addEventListener('click',function(){
      stop();loading=false;paused=true;stage=Math.max(0,stage-1);answers.length=stage;choice='';detail='';openText=false;render();
    });
    if(loading)return;
    root.querySelectorAll('[data-law-choice]').forEach(function(button){
      button.addEventListener('click',function(){paused=true;stop();choice=questions[stage].options[Number(button.dataset.lawChoice)];render();});
    });
    var more=root.querySelector('[data-law-more]');
    if(more)more.addEventListener('click',function(){paused=true;stop();openText=!openText;render();});
    var next=root.querySelector('[data-law-next]');
    if(next)next.addEventListener('click',function(){if(!(choice||detail.trim()))return;paused=true;advance();});
    var unknown=root.querySelector('[data-law-unknown]');
    if(unknown)unknown.addEventListener('click',function(){paused=true;choice='정확히 모르겠어요';detail='';advance();});
    var area=root.querySelector('.law-intake-textarea');
    if(area)area.addEventListener('input',function(){
      paused=true;stop();detail=area.value;var button=root.querySelector('[data-law-next]');
      if(button)button.disabled=!(choice||detail.trim());
    });
  }
  function updateLoading(){
    if(!loading)return;
    var final=stage===3;
    var elapsed=Math.max(0,Date.now()-loadingStarted);
    var total=final?5400:1900;
    var index=Math.min(2,Math.floor(elapsed/(total/3)));
    var clock=root.querySelector('[data-law-clock]');
    if(clock)clock.textContent=Math.floor(elapsed/1000)+'초 경과';
    root.querySelectorAll('[data-law-progress-step]').forEach(function(node,i){
      node.className=i<index?'finished':i===index?'active':'';
      var number=node.querySelector('.law-demo-progress-number');
      if(number)number.textContent=i<index?'✓':String(i+1);
    });
    var phrases=activity[final?'analyzing':'intake'];
    var activityEl=root.querySelector('[data-law-activity]');
    if(activityEl)activityEl.textContent=phrases[Math.min(phrases.length-1,Math.floor(elapsed/(total/phrases.length)))];
  }
  function startLoading(){
    stop();
    if(!visible)return;
    loadingStarted=Date.now();updateLoading();
    if(!reduces)progressTimer=setInterval(updateLoading,200);
    var last=stage===3;
    after(last?5400:1900,function(){
      stop();
      if(last){
        if(!paused)reset();
        else {loadingStarted=Date.now()-5400;updateLoading();}
      }else{
        loading=false;render();
        if(!paused)schedule();
      }
    });
  }
  function advance(){
    stop();
    if(stage<3)answers[stage]=(choice||detail.trim()||'정확히 모르겠어요')+(choice&&detail.trim()?' · '+detail.trim():'');
    stage=Math.min(3,stage+1);
    choice='';detail='';openText=false;loading=true;
    render();startLoading();
  }
  function schedule(){
    stop();
    if(!visible||paused||reduces||loading)return;
    if(intro){
      after(3000,function(){intro=false;render();schedule();});
      return;
    }
    if(stage<2){
      after(1300,function(){choice=questions[stage].options[questions[stage].answer];render();});
      after(4200,advance);
    }else if(stage===2){
      after(650,function(){
        var i=0;
        typingTimer=setInterval(function(){
          if(stage!==2||loading){clearInterval(typingTimer);typingTimer=null;return;}
          i=Math.min(sampleDetail.length,i+4);
          detail=sampleDetail.slice(0,i);
          var area=root.querySelector('.law-intake-textarea');
          if(area){area.value=detail;var next=root.querySelector('[data-law-next]');if(next)next.disabled=false;}
          if(i===sampleDetail.length){clearInterval(typingTimer);typingTimer=null;}
        },65);
      });
      after(5200,advance);
    }
  }
  function reset(){
    stop();stage=0;intro=true;choice='';detail='';openText=false;answers=[];loading=false;paused=false;
    render();schedule();
  }
  render();
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      var next=entries[0].isIntersecting;
      if(next===visible)return;
      visible=next;
      if(next){if(loading)startLoading();else schedule();}
      else stop();
    },{threshold:.22});
    io.observe(root);
  }else{visible=true;schedule();}
})();
