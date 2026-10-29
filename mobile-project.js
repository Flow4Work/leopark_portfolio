(() => {
 const root=document.documentElement,button=document.getElementById('theme-switch'),label=document.getElementById('theme-label');
 function syncTheme(){
  const light=root.dataset.theme==='light';label.textContent=light?'DARK':'LIGHT';
  button.setAttribute('aria-label',light?'블랙 모드로 전환':'화이트 모드로 전환');button.setAttribute('aria-pressed',String(light));
  document.querySelector('meta[name="theme-color"]').content=light?'#fafafa':'#090909';
 }
 syncTheme();button.addEventListener('click',()=>{
  root.dataset.theme=root.dataset.theme==='light'?'dark':'light';
  try{localStorage.setItem('portfolio-theme',root.dataset.theme)}catch(_){}syncTheme();
 });
 const nav=document.querySelector('.sticky-site-nav');
 const syncScroll=()=>nav.classList.toggle('is-scrolled',window.scrollY>8);
 addEventListener('scroll',syncScroll,{passive:true});syncScroll();
})();
