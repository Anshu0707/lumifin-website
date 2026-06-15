/**
 * Smoke test for the /link deep-link bridge (public/link.html).
 *
 * Covers the locally-testable rows of the design doc's §10 checklist:
 *   - garbage / missing intent → 'home', raw param never reflected (XSS)
 *   - valid intent (+ id passthrough) → manual button href = lumifin://link?...
 *   - iOS UA → JS attempts the custom-scheme navigation
 *   - desktop UA → NO redirect, "open on your phone" message
 *   - no-JS fetch (scanner) → plain 200 HTML, no meta-refresh, no redirect
 *
 * Run after a build (needs dist/link.html):
 *   npm run build:no-prerender && node scripts/verify-link-bridge.mjs
 */
import express from 'express';
import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const PORT = 4179;

const IOS_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
const DESKTOP_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';

let failures = 0;
function check(name, ok, detail = '') {
  console.log(`${ok ? '  ✅' : '  ❌'} ${name}${ok || !detail ? '' : ` — ${detail}`}`);
  if (!ok) failures++;
}

const app = express();
app.use(express.static(distDir));
const server = app.listen(PORT);
const base = `http://localhost:${PORT}/link.html`;

const browser = await puppeteer.launch({ headless: 'new' });

async function loadPage(url, ua) {
  const page = await browser.newPage();
  await page.setUserAgent(ua);
  const attempted = [];
  page.on('requestfailed', (r) => attempted.push(r.url()));
  page.on('request', (r) => {
    if (!r.url().startsWith('http')) attempted.push(r.url());
  });
  await page.goto(url, { waitUntil: 'networkidle0' });
  return { page, attempted };
}

console.log('— scanner (no JS): static fetch of /link —');
{
  const res = await fetch(`${base}?intent=add-funds`, { redirect: 'manual' });
  const body = await res.text();
  check('returns 200', res.status === 200, `got ${res.status}`);
  check('no Location header', !res.headers.get('location'));
  check('no meta-refresh in HTML', !/http-equiv=["']?refresh/i.test(body));
}

console.log('— desktop UA, garbage intent —');
{
  const evil = '"><img src=x onerror=alert(1)>';
  const { page } = await loadPage(`${base}?intent=${encodeURIComponent(evil)}`, DESKTOP_UA);
  await new Promise((r) => setTimeout(r, 1600)); // outlive the 1200ms timer
  check('still on the bridge page (no redirect)', page.url().startsWith(base));
  const href = await page.$eval('#open-btn', (a) => a.getAttribute('href'));
  check("garbage intent falls back to 'home'", href === 'lumifin://link?intent=home', href);
  const reflected = await page.content().then((html) => html.includes('onerror=alert'));
  check('raw intent param is NOT reflected into the DOM', !reflected);
  const title = await page.$eval('#title', (el) => el.textContent);
  check('desktop shows "open on your phone"', /phone|téléphone/i.test(title), title);
  await page.close();
}

console.log('— iOS UA, valid intent + id —');
{
  const { page, attempted } = await loadPage(`${base}?intent=add-funds&id=abc-123`, IOS_UA);
  await new Promise((r) => setTimeout(r, 300));
  const expected = 'lumifin://link?intent=add-funds&id=abc-123';
  const href = await page.$eval('#open-btn', (a) => a.getAttribute('href'));
  check('manual button carries intent + id', href === expected, href);
  check(
    'JS attempted the custom-scheme navigation',
    attempted.some((u) => u.startsWith(expected)),
    `attempted: ${attempted.join(', ') || '(none)'}`
  );
  await page.close();
}

console.log('— iOS UA, malformed id is dropped —');
{
  const { page } = await loadPage(`${base}?intent=kyc&id=${encodeURIComponent('1;DROP TABLE')}`, IOS_UA);
  const href = await page.$eval('#open-btn', (a) => a.getAttribute('href'));
  check('bad id stripped from deep link', href === 'lumifin://link?intent=kyc', href);
  await page.close();
}

console.log('— .well-known files present in dist —');
{
  for (const f of ['.well-known/apple-app-site-association', '.well-known/assetlinks.json']) {
    const raw = await fs.readFile(path.join(distDir, f), 'utf8').catch(() => null);
    let parsed = null;
    try { parsed = raw && JSON.parse(raw); } catch { /* invalid */ }
    check(`${f} exists + valid JSON`, !!parsed);
  }
}

await browser.close();
server.close();
console.log(failures ? `\n${failures} check(s) FAILED` : '\nAll checks passed');
process.exit(failures ? 1 : 0);
