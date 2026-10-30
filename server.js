const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const port = 3200;
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
};

http.createServer((req, res) => {
  let urlPath;
  try { urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch (_) { res.writeHead(400); res.end('Bad Request'); return; }

  if (urlPath === '/') urlPath = '/index.html';
  if (urlPath === '/instagram-card-agent') urlPath = '/instagram-card-agent.html';
  if (urlPath === '/kol-scout') urlPath = '/kol-scout.html';
  if (urlPath === '/perspective' || urlPath === '/profile') urlPath = '/perspective.html';
  if (urlPath === '/planning-agent' || urlPath === '/planning-agent.html') {
    res.writeHead(308, { Location: '/law-project', 'Cache-Control': 'no-store' });
    res.end();
    return;
  }
  if (urlPath === '/law-project') urlPath = '/law-project.html';
  if (/^\/(kokochizu|tonament|chiklink|ownerbe)$/.test(urlPath)) urlPath += '.html';
  const allowed = /^\/assets\/scout-real\/(?:index\.html|styles\.css|app\.js|snapshot\.js|replay\.js)$/.test(urlPath) || urlPath === '/assets/scout-legacy.html' || urlPath === '/assets/scout-demo.html' || urlPath === '/assets/law-desktop-demo.html' || urlPath === '/assets/law-desktop-ui.css' || urlPath === '/index.html' || urlPath === '/instagram-card-agent.html' || urlPath === '/kol-scout.html' || urlPath === '/perspective.html' || urlPath === '/portfolio-activity.js' || urlPath === '/portfolio-data.js' || urlPath === '/portfolio-fonts.css' || urlPath === '/law-project.css' || urlPath === '/law-intake-demo.css' || urlPath === '/law-intake-demo.js' ||
    /^\/assets\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.(?:png|jpe?g|webp|gif|svg|avif)$/i.test(urlPath);
  const mobilePage = /^\/(?:law-project|kokochizu|tonament|chiklink|ownerbe)\.html$/.test(urlPath) || /^\/mobile-project\.(?:css|js)$/.test(urlPath);
  if (!allowed && !mobilePage) { res.writeHead(404); res.end('Not Found'); return; }

  const file = path.join(root, urlPath.slice(1));
  fs.readFile(file, (err, content) => {
    if (err) { res.writeHead(404); res.end('Not Found'); return; }
    res.writeHead(200, {
      'Content-Type': mimeTypes[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    res.end(content);
  });
}).listen(port, '127.0.0.1', () => {
  console.log('Portfolio ready: http://127.0.0.1:' + port);
});

