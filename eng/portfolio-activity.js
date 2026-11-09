/*
 * Portfolio activity beacon.
 * Sends anonymous page visits and project opens to the private activity console
 * (law-lake-theta.vercel.app) so the Portfolio tab can show where visitors came from.
 * No cookies, no fingerprint, no identifiers: only the page path and the project name.
 */
(function () {
  if (window.__portfolioActivityLoaded) return;
  window.__portfolioActivityLoaded = true;
  window.__portfolioActivityRequested = true;
  var PRODUCTION = 'https://law-lake-theta.vercel.app/api/portfolio-activity';
  var LOCAL = 'http://127.0.0.1:3700/api/portfolio-activity';
  var endpoint = PRODUCTION;
  try {
    var host = location.hostname;
    if (location.protocol === 'file:' || host === 'localhost' || host === '127.0.0.1' || host === '[::1]' || host === '::1') endpoint = LOCAL;
  } catch (_) {}

  function send(action, detail) {
    var body;
    try { body = JSON.stringify({ action: action, detail: (detail || '').slice(0, 200) }); } catch (_) { return; }
    // text/plain keeps the write a "simple" CORS request, so no preflight is needed.
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(endpoint, new Blob([body], { type: 'text/plain;charset=UTF-8' }))) return;
    } catch (_) {}
    try {
      fetch(endpoint, {
        method: 'POST',
        mode: 'cors',
        keepalive: true,
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: body
      }).catch(function () {});
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
