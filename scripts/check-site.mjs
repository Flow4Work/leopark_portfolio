import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();
const origin = 'https://portfolio.invalid';
const failures = [];
let checked = 0;
function walk(dir) {
  return fs.readdirSync(dir, {withFileTypes: true}).flatMap(entry => {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') return [];
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}
function existsRoute(url) {
  let name = decodeURIComponent(url.pathname);
  if (name === '/profile') name = '/perspective';
  if (name === '/planning-agent') name = '/law-project';
  return [name, name + '.html', name.replace(/\/$/, '') + '/index.html']
    .some(candidate => fs.existsSync(path.join(root, candidate)) && fs.statSync(path.join(root, candidate)).isFile());
}
function checkReference(raw, base, file) {
  if (!raw || raw.startsWith('#') || /^(data:|mailto:|tel:|javascript:)/i.test(raw)) return;
  const url = new URL(raw.replaceAll('&amp;', '&'), base);
  if (url.origin !== origin) return;
  // This embedded demo uses client-side page switches, not real portfolio routes.
  if (file === 'assets/chiklink-demo.html' && ['/my-qr', '/frens', '/frens-2', '/tasks'].includes(url.pathname)) return;
  checked++;
  if (!existsRoute(url)) failures.push(`${file}: ${raw} resolves to missing ${url.pathname}`);
}
for (const absolute of walk(root).filter(file => /\.(html|css|js)$/.test(file))) {
  const file = path.relative(root, absolute).replaceAll('\\', '/');
  const source = fs.readFileSync(absolute, 'utf8');
  if (file.endsWith('.js')) {
    try { new vm.Script(source, {filename: file}); } catch (error) { failures.push(error.message); }
  }
  if (file.endsWith('.html')) {
    const canonical = '/' + file.replace(/index\.html$/, '').replace(/\.html$/, '').replace(/\/$/, '');
    const base = new URL(canonical || '/', origin);
    const markup = source.replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, template => template.replace(/(<a\b[^>]*?)\s+href\s*=\s*["'][^"']*["']/gi, '$1')).replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (whole, attrs, code) => {
      if (!/\bsrc\s*=/.test(attrs) && !/type\s*=\s*["'](?:module|application\/json)/.test(attrs)) {
        try { new vm.Script(code, {filename: file}); } catch (error) { failures.push(`${file}: ${error.message}`); }
      }
      return `<script ${attrs}></script>`;
    });
    for (const match of markup.matchAll(/\b(?:src|href|poster)\s*=\s*["']([^"']+)["']/gi)) checkReference(match[1], base, file);
  }
  if (file.endsWith('.css')) {
    for (const match of source.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/gi)) checkReference(match[1], new URL('/' + file, origin), file);
  }
}
// Keep the approved content and profile layout from being lost in a stale-source deployment.
const profile = fs.readFileSync(path.join(root, 'perspective.html'), 'utf8');
const lawPage = fs.readFileSync(path.join(root, 'law-project.html'), 'utf8');
const projectData = fs.readFileSync(path.join(root, 'portfolio-data.js'), 'utf8');
if (!profile.includes('베이스트레이드') || profile.includes('테스시스템')) {
  failures.push('Profile company regression: the 2019–2020 company must be 베이스트레이드.');
}
if (!profile.includes('class="profile-hero"') || !profile.includes('class="career-entry"')) {
  failures.push('Profile layout regression: preserve the approved profile and simple career list.');
}
if (!lawPage.includes('<h1>Law Map</h1>') || /law\s+project/i.test(lawPage) || /law\s+project/i.test(projectData)) {
  failures.push('Project naming regression: use Law Map in the detail page and project listing.');
}
// Prevent future deployment regressions in the English-only route.
const englishHome = fs.readFileSync(path.join(root, 'eng', 'index.html'), 'utf8');
const config = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
const englishRoutes = ['law-project', 'kol-scout', 'instagram-card-agent', 'kokochizu', 'tonament', 'chiklink', 'ownerbe'];
if (!englishHome.includes('<html lang="en"') || !englishHome.includes("const language = 'en';")) {
  failures.push('English home must have a fixed English locale.');
}
if (/languageButton|language-switch|portfolio-language/.test(englishHome)) {
  failures.push('English home must not contain the legacy language switch.');
}
if (!englishHome.includes('/eng/portfolio-data.js') || !englishHome.includes("'/eng' + service.href")) {
  failures.push('English home must keep its own project data and English detail routes.');
}
for (const name of englishRoutes) {
  const detail = fs.readFileSync(path.join(root, 'eng', name + '.html'), 'utf8');
  if (!detail.includes('<html lang="en"') || !detail.includes('href="/eng"')) {
    failures.push('English detail must be localized and navigate home under /eng: ' + name);
  }
  if (!config.rewrites.some(route => route.source === '/eng/' + name)) {
    failures.push('Missing English route rewrite: ' + name);
  }
}
if (!config.rewrites.some(route => route.source === '/eng')) failures.push('Missing /eng home rewrite.');

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else console.log(`PASS: ${checked} local references resolve after clean URL redirects; inline and asset JavaScript parses.`);
