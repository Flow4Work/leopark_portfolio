/*
 * Portfolio activity beacon.
 * Sends anonymous page visits and project opens to the private activity console
 * (law-lake-theta.vercel.app) so the Portfolio tab can show where visitors came from.
 * Opaque visitor/event UUIDs support accurate counts and deduplication. No cookies
 * or fingerprinting. The server signs visitor headers before forwarding to LAW.
 */
(function () {
  if (window.__portfolioActivityLoaded) return;
  window.__portfolioActivityLoaded = true;
  window.__portfolioActivityRequested = true;
  var PRODUCTION = '/api/portfolio-events';
  var LOCAL = 'http://127.0.0.1:3700/api/portfolio-activity';
  var endpoint = PRODUCTION;
  try {
    var host = location.hostname;
    // Preview screenshots and QA must not inflate the production visitor counts.
    if (host.endsWith('.vercel.app') && host !== 'leopark-portfolio.vercel.app') return;
    if (location.protocol === 'file:' || host === 'localhost' || host === '127.0.0.1' || host === '[::1]' || host === '::1') endpoint = LOCAL;
  } catch (_) {}

  function uuid() {
    if (crypto.randomUUID) return crypto.randomUUID();
    var bytes = crypto.getRandomValues(new Uint8Array(16)); bytes[6] = (bytes[6] & 15) | 64; bytes[8] = (bytes[8] & 63) | 128;
    var hex = Array.from(bytes, function (b) { return b.toString(16).padStart(2, '0'); }).join('');
    return hex.slice(0,8)+'-'+hex.slice(8,12)+'-'+hex.slice(12,16)+'-'+hex.slice(16,20)+'-'+hex.slice(20);
  }
  var visitorId = uuid();
  try { var saved = localStorage.getItem('portfolio-visitor-v1'); if (saved && /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(saved)) visitorId = saved; localStorage.setItem('portfolio-visitor-v1', visitorId); } catch (_) {}
  function send(action, detail) {
    var body;
    try { body = JSON.stringify({id:uuid(), visitorId:visitorId, page:location.pathname, action:action, detail:(detail || '').slice(0,200)}); } catch (_) { return; }
    // Acknowledge an ordinary first-party request. sendBeacon's true return only
    // means queued; some browsers discard that queued request without an error.
    function attempt(number) {
      var controller = new AbortController(), timeout = setTimeout(function () { controller.abort(); }, 15000);
      function failed() {
        clearTimeout(timeout);
        if (number < 2) setTimeout(function () { attempt(number + 1); }, 1000 * (number + 1));
        else console.warn('[portfolio] 방문 기록 전송 실패');
      }
      try {
        fetch(endpoint, {method:'POST', credentials:'omit', keepalive:true, signal:controller.signal, headers:{'Content-Type':'text/plain;charset=UTF-8'}, body:body})
          .then(function (response) {
            clearTimeout(timeout);
            if (response.ok) return;
            if ([408,500,502,503,504].indexOf(response.status) !== -1) failed();
            else console.warn('[portfolio] 방문 기록 전송 실패: '+response.status);
          }).catch(failed);
      } catch (_) { failed(); }
    }
    // Reuse this body and UUID on retries; the collector deduplicates uncertain responses.
    attempt(0);
  }

  function labelOf(link) {
    var name = link.querySelector('.service-name');
    var text = (name && name.textContent ? name.textContent : link.getAttribute('aria-label') || '').trim();
    return text.replace(/\s+/g, ' ').slice(0, 120);
  }

  send('visit', location.pathname);

  function clicked(event) {
    if (event.type === 'auxclick' && event.button !== 1) return;
    var target = event.target;
    if (!target || !target.closest) return;
    var service = target.closest('a[data-activity-service]');
    if (service) { send('view_step', '서비스 열기: ' + service.getAttribute('data-activity-service')); return; }
    var link = target.closest('a.work-card-link');
    if (link) {
      var label = labelOf(link);
      send('view_step', label ? '프로젝트 소개: ' + label : '프로젝트 소개 열기');
      return;
    }
    var nav = target.closest('a.header-link, nav[data-project-navigation] a');
    if (nav) {
      var navLabel = (nav.textContent || '').replace(/[↗\s]+/g, ' ').trim();
      if (navLabel) send('view_step', '이동: ' + navLabel);
    }
  }
  document.addEventListener('click', clicked, true);
  document.addEventListener('auxclick', clicked, true);
})();
