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
    if (location.protocol === 'file:' || host === 'localhost' || host === '127.0.0.1' || host === '[::1]' || host === '::1') endpoint = LOCAL;
  } catch (_) {}

  function uuid() {
    if (crypto.randomUUID) return crypto.randomUUID();
    var bytes = crypto.getRandomValues(new Uint8Array(16)); bytes[6] = (bytes[6] & 15) | 64; bytes[8] = (bytes[8] & 63) | 128;
    var hex = Array.from(bytes, function (b) { return b.toString(16).padStart(2, '0'); }).join('');
    return hex.slice(0,8)+'-'+hex.slice(8,12)+'-'+hex.slice(12,16)+'-'+hex.slice(16,20)+'-'+hex.slice(20);
  }
  var visitorId = uuid();
  try { visitorId = localStorage.getItem('portfolio-visitor-v1') || visitorId; localStorage.setItem('portfolio-visitor-v1', visitorId); } catch (_) {}
  function send(action, detail) {
    var body;
    try { body = JSON.stringify({id:uuid(), visitorId:visitorId, page:location.pathname, action:action, detail:(detail || '').slice(0,200)}); } catch (_) { return; }
    // Acknowledge an ordinary first-party request. sendBeacon's true return only
    // means queued; some browsers discard that queued request without an error.
    try {
      fetch(endpoint, {method:'POST', credentials:'omit', keepalive:true, headers:{'Content-Type':'text/plain;charset=UTF-8'}, body:body})
        .then(function (response) { if (!response.ok) console.warn('[portfolio] 방문 기록 전송 실패: '+response.status); })
        .catch(function () { console.warn('[portfolio] 방문 기록 전송 실패'); });
    } catch (_) {}
  }

  function labelOf(link) {
    var name = link.querySelector('.service-name');
    var text = (name && name.textContent ? name.textContent : link.getAttribute('aria-label') || '').trim();
    return text.replace(/\s+/g, ' ').slice(0, 120);
  }

  send('visit', location.pathname);

  document.addEventListener('click', function (event) {
    var target = event.target;
    if (!target || !target.closest) return;
    var link = target.closest('a.work-card-link');
    if (link) {
      var label = labelOf(link);
      send('view_step', label ? '프로젝트: ' + label : '프로젝트 열기');
      return;
    }
    var nav = target.closest('a.header-link, nav[data-project-navigation] a');
    if (nav) {
      var navLabel = (nav.textContent || '').replace(/[↗\s]+/g, ' ').trim();
      if (navLabel) send('view_step', '이동: ' + navLabel);
    }
  }, true);
})();
