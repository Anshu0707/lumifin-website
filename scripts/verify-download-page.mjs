/**
 * Smoke test for the /download referral store router (public/download.html).
 *
 * Mirrors scripts/verify-link-bridge.mjs. Covers:
 *   - no-JS fetch (crawler / scanner) → plain 200, no Location header, no
 *     meta-refresh, both store links and the OpenGraph card already in the
 *     raw HTML
 *   - store URLs are the BARE forms: no /us/ storefront prefix, no ?hl= on Play
 *   - iOS UA → redirect to the App Store
 *   - Android UA → redirect to the Play Store
 *   - iPadOS (Mac UA + maxTouchPoints > 1) → redirect to the App Store
 *   - real Mac (Mac UA + maxTouchPoints 0) → NO redirect
 *   - desktop UA → NO redirect, both buttons present
 *   - crawler UA → NO redirect (so the preview card is built from this page)
 *   - /download is absent from apple-app-site-association's paths
 *   - the og:image actually exists in dist
 *
 * Run after a build (needs dist/download.html):
 *   npm run build:no-prerender && node scripts/verify-download-page.mjs
 */
import express from 'express';
import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const PORT = 4180;

const APP_STORE = 'https://apps.apple.com/app/id6771697087';
const PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.lumifin.app';

const IOS_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
const ANDROID_UA =
  'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36';
const MAC_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15';
const DESKTOP_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const WHATSAPP_UA = 'WhatsApp/2.23.20.0 A';
// Claims Android AND executes JS — the case the crawler guard exists for.
const GOOGLEBOT_MOBILE_UA =
  'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
// A real Android phone whose model name ends in "bot" — must NOT be treated
// as a crawler by an over-broad /bot/i test.
const CUBOT_UA =
  'Mozilla/5.0 (Linux; Android 13; CUBOT KING KONG 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36';

let failures = 0;
function check(name, ok, detail = '') {
  console.log(`${ok ? '  PASS' : '  FAIL'} ${name}${ok || !detail ? '' : ` — ${detail}`}`);
  if (!ok) failures++;
}

const app = express();
app.use(express.static(distDir, { extensions: ['html'] }));
const server = app.listen(PORT);
const base = `http://localhost:${PORT}/download`;

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

/**
 * Load the page under a given UA, aborting every off-origin request so the
 * store navigation is recorded instead of actually followed.
 */
async function loadPage(ua, { maxTouchPoints, query = '', acceptLanguage } = {}) {
  const page = await browser.newPage();
  await page.setUserAgent(ua);
  if (acceptLanguage) {
    await page.setExtraHTTPHeaders({ 'Accept-Language': acceptLanguage });
    await page.evaluateOnNewDocument((lang) => {
      Object.defineProperty(navigator, 'language', { get: () => lang });
    }, acceptLanguage.split(',')[0]);
  }
  if (maxTouchPoints !== undefined) {
    await page.evaluateOnNewDocument((n) => {
      Object.defineProperty(navigator, 'maxTouchPoints', { get: () => n });
    }, maxTouchPoints);
  }
  const navigations = [];
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const url = req.url();
    if (url.startsWith(`http://localhost:${PORT}`) || url.startsWith('data:')) {
      req.continue();
    } else {
      if (req.isNavigationRequest()) navigations.push(url);
      req.abort().catch(() => {});
    }
  });
  await page.goto(base + query, { waitUntil: 'domcontentloaded' });
  // Outlive the page's 600ms REDIRECT_CAP_MS.
  await new Promise((r) => setTimeout(r, 1100));
  return { page, navigations };
}

console.log('— crawler / scanner (no JS): static fetch of /download —');
{
  const res = await fetch(base, { redirect: 'manual' });
  const body = await res.text();
  check('returns 200', res.status === 200, `got ${res.status}`);
  check('no Location header (no server-side redirect)', !res.headers.get('location'));
  check('no meta-refresh in HTML', !/http-equiv=["']?refresh/i.test(body.replace(/<!--[\s\S]*?-->/g, '')));

  check('App Store link present in raw markup', body.includes(`href="${APP_STORE}"`));
  check('Play Store link present in raw markup', body.includes(`href="${PLAY_STORE}"`));
  check('no /us/ storefront prefix anywhere', !/apps\.apple\.com\/[a-z]{2}\//i.test(body));
  check('no hl= param on the Play URL', !/play\.google\.com[^"'\s]*[?&]hl=/i.test(body));

  for (const tag of ['og:title', 'og:description', 'og:image', 'og:url', 'og:type']) {
    check(`${tag} present`, new RegExp(`property="${tag}"[^>]*content="[^"]+"`).test(body));
  }
  check(
    'twitter:card is summary_large_image',
    /name="twitter:card"[^>]*content="summary_large_image"/.test(body)
  );
  const ogImage = body.match(/property="og:image"[^>]*content="([^"]+)"/)?.[1];
  check('og:image is an absolute URL', !!ogImage && ogImage.startsWith('https://'), ogImage);
  if (ogImage) {
    const rel = ogImage.replace('https://lumifin.io/', '');
    const stat = await fs.stat(path.join(distDir, rel)).catch(() => null);
    check(`og:image exists in dist (${rel})`, !!stat && stat.size > 0);
  }
}

console.log('— iOS UA —');
{
  const { page, navigations } = await loadPage(IOS_UA);
  check('redirected to the App Store', navigations.includes(APP_STORE), navigations.join(', ') || '(none)');
  await page.close();
}

console.log('— Android UA —');
{
  const { page, navigations } = await loadPage(ANDROID_UA);
  check('redirected to the Play Store', navigations.includes(PLAY_STORE), navigations.join(', ') || '(none)');
  await page.close();
}

console.log('— iPadOS (Mac UA, maxTouchPoints 5) —');
{
  const { page, navigations } = await loadPage(MAC_UA, { maxTouchPoints: 5 });
  check('redirected to the App Store', navigations.includes(APP_STORE), navigations.join(', ') || '(none)');
  await page.close();
}

console.log('— real Mac (Mac UA, maxTouchPoints 0) —');
{
  const { page, navigations } = await loadPage(MAC_UA, { maxTouchPoints: 0 });
  check('no redirect', navigations.length === 0, navigations.join(', '));
  await page.close();
}

console.log('— desktop UA —');
{
  const { page, navigations } = await loadPage(DESKTOP_UA);
  check('no redirect', navigations.length === 0, navigations.join(', '));
  const visible = await page.$$eval('.store', (els) =>
    els.map((el) => ({ href: el.getAttribute('href'), shown: el.offsetParent !== null }))
  );
  check('both store buttons rendered', visible.length === 2, `found ${visible.length}`);
  check('both store buttons visible', visible.every((b) => b.shown));
  const title = await page.$eval('#title', (el) => el.textContent);
  check('copy tells the visitor to use a phone', /phone|téléphone/i.test(title), title);
  await page.close();
}

console.log('— localisation —');
{
  // ?lang=fr wins outright, as on /link.
  const { page } = await loadPage(DESKTOP_UA, { query: '?lang=fr' });
  const out = await page.evaluate(() => ({
    lang: document.documentElement.lang,
    title: document.getElementById('title').textContent,
    top: document.getElementById('ios-top').textContent,
  }));
  check('?lang=fr sets <html lang="fr">', out.lang === 'fr', out.lang);
  check('?lang=fr renders French copy', /téléphone/i.test(out.title), out.title);
  check('?lang=fr localises the store button label', out.top === 'Disponible sur', out.top);
  check('French copy is not mojibake', !/Ã|â€/.test(out.title + out.top), out.title);
  await page.close();
}
{
  // A French browser with no ?lang= should also get French.
  const { page } = await loadPage(DESKTOP_UA, { acceptLanguage: 'fr-FR,fr;q=0.9' });
  const lang = await page.evaluate(() => document.documentElement.lang);
  check('fr-FR browser defaults to French', lang === 'fr', lang);
  await page.close();
}
{
  // Default (English browser) stays English.
  const { page } = await loadPage(DESKTOP_UA, { acceptLanguage: 'en-GB,en;q=0.9' });
  const out = await page.evaluate(() => ({
    lang: document.documentElement.lang,
    top: document.getElementById('ios-top').textContent,
  }));
  check('en-GB browser stays English', out.lang === 'en', out.lang);
  check('English store button label', out.top === 'Available on', out.top);
  await page.close();
}

console.log('— crawler UAs must not be redirected —');
{
  const { page, navigations } = await loadPage(WHATSAPP_UA);
  check('WhatsApp: no redirect (preview card comes from this page)', navigations.length === 0, navigations.join(', '));
  await page.close();
}
{
  const { page, navigations } = await loadPage(GOOGLEBOT_MOBILE_UA);
  check(
    'Googlebot smartphone: no redirect despite the Android token',
    navigations.length === 0,
    navigations.join(', ')
  );
  await page.close();
}

console.log('— a real phone whose model name contains "bot" IS redirected —');
{
  const { page, navigations } = await loadPage(CUBOT_UA);
  check('CUBOT Android phone redirects to the Play Store', navigations.includes(PLAY_STORE), navigations.join(', ') || '(none)');
  await page.close();
}

console.log('— the GA event is fired with a non-colliding parameter name —');
{
  const page = await browser.newPage();
  await page.setUserAgent(DESKTOP_UA);
  await page.setRequestInterception(true);
  page.on('request', (req) =>
    req.url().startsWith(`http://localhost:${PORT}`) ? req.continue() : req.abort().catch(() => {})
  );
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 1100));
  // gtag.js is blocked by the interception above, so the queued dataLayer
  // call is still inspectable — which is exactly what we want to assert.
  const ev = await page.evaluate(() =>
    (window.dataLayer || [])
      .map((a) => Array.prototype.slice.call(a))
      .find((a) => a[0] === 'event' && a[1] === 'download_redirect')
  );
  check('download_redirect event queued', !!ev);
  check('carries download_platform=web_fallback', ev?.[2]?.download_platform === 'web_fallback', JSON.stringify(ev?.[2]));
  check(
    'does not use the bare "platform" name (collides with GA4 built-in)',
    ev && !('platform' in ev[2]),
    JSON.stringify(ev?.[2])
  );
  await page.close();
}

console.log('— /download stays out of the app-association paths —');
{
  const aasaRaw = await fs
    .readFile(path.join(distDir, '.well-known/apple-app-site-association'), 'utf8')
    .catch(() => null);
  let aasa = null;
  try { aasa = aasaRaw && JSON.parse(aasaRaw); } catch { /* invalid */ }
  check('apple-app-site-association exists + valid JSON', !!aasa);
  if (aasa) {
    const paths = (aasa.applinks?.details || []).flatMap((d) => d.paths || []);
    check(
      'no path matches /download',
      !paths.some((p) => p === '*' || p === '/download' || /^\/(\*|download)/.test(p)),
      paths.join(', ')
    );
  }
}

await browser.close();
server.close();
console.log(failures ? `\n${failures} check(s) FAILED` : '\nAll checks passed');
process.exit(failures ? 1 : 0);
