/**
 * Static prerender step — runs after `vite build`.
 *
 * Why: The site is a React SPA, so the same shell index.html is served for every URL.
 * Crawlers (especially AI crawlers) often don't execute JS, so they can't see per-page
 * content, titles, or canonicals. This script:
 *   1. Serves the freshly-built dist/ from a local port.
 *   2. Visits every route in a headless browser, letting React + Helmet render fully.
 *   3. Writes the rendered HTML back to dist/<route>/index.html.
 *
 * Netlify's static hosting then serves the prerendered file directly for each route.
 */
import express from 'express';
import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');

// Routes mirror src/App.tsx. Keep this in sync when adding pages.
// Each entry: { path, out } where `out` is the dist file relative to dist/.
//
// Output convention: <route>.html (NOT <route>/index.html). This avoids
// Netlify's automatic /faq → /faq/ trailing-slash 301 redirect — Netlify
// serves <route>.html directly at the no-slash URL, matching our canonicals.
const routes = [
  { path: '/', out: 'index.html' },
  { path: '/faq', out: 'faq.html' },
  { path: '/team', out: 'team.html' },
  { path: '/privacy', out: 'privacy.html' },
  { path: '/blog', out: 'blog.html' },
  { path: '/blog/why-we-built-lumi', out: 'blog/why-we-built-lumi.html' },
  { path: '/blog/cash-is-king', out: 'blog/cash-is-king.html' },
  { path: '/blog/qris-decoded', out: 'blog/qris-decoded.html' },
  { path: '/careers', out: 'careers.html' },
  { path: '/security', out: 'security.html' },
  { path: '/travel-money', out: 'travel-money.html' },
  { path: '/travel-money/thailand', out: 'travel-money/thailand.html' },
  { path: '/travel-money/vietnam', out: 'travel-money/vietnam.html' },
  { path: '/travel-money/indonesia', out: 'travel-money/indonesia.html' },
  { path: '/compare', out: 'compare.html' },
  { path: '/mentions-legales', out: 'mentions-legales.html' },
  { path: '/cgu', out: 'cgu.html' },
  // 404 page: hit any unmatched route, save as 404.html so Netlify auto-serves
  // it with HTTP 404 for unknown URLs (proper 404 instead of soft-200).
  { path: '/__404__', out: '404.html' },
];

/**
 * Clean up the captured <head>: remove duplicate/empty meta tags.
 *
 * react-helmet-async + React 19 Suspense can leave transient tags from prior
 * renders in the DOM during prerender. We can't fix this in the browser
 * because Helmet re-adds tags asynchronously after we clean. Instead we
 * post-process the captured HTML string here.
 *
 * Rules (verified empirically against Helmet 3.0.0 + React 19):
 *   - <title>: keep the FIRST occurrence (Helmet prepends new titles).
 *   - <link rel="canonical">: drop empty-href entries, then keep LAST.
 *   - <meta name="X">: drop empty-content entries, then keep LAST per name.
 *   - <meta property="X">: drop empty-content entries, then keep LAST per property.
 *   - <link rel="alternate" hreflang="X">: keep LAST per hreflang.
 */
function dedupeHeadTags(html) {
  const headMatch = html.match(/<head>([\s\S]*?)<\/head>/);
  if (!headMatch) return html;
  let head = headMatch[1];

  // <title>: keep first
  let firstTitleSeen = false;
  head = head.replace(/<title[^>]*>[\s\S]*?<\/title>/g, (m) => {
    if (!firstTitleSeen) {
      firstTitleSeen = true;
      return m;
    }
    return '';
  });

  // <link rel="canonical">: drop empty href, keep last
  const canonicalRe = /<link[^>]*\brel="canonical"[^>]*>/g;
  const canonicals = head.match(canonicalRe) || [];
  const validCanonicals = canonicals.filter((t) => /\bhref="[^"]+"/.test(t));
  const keepCanonical = validCanonicals[validCanonicals.length - 1];
  let canonicalSwapped = false;
  head = head.replace(canonicalRe, (m) => {
    if (m === keepCanonical && !canonicalSwapped) {
      canonicalSwapped = true;
      return m;
    }
    return '';
  });

  // <meta name="X">: keep last per name (skip empty content)
  const metaNameRe = /<meta[^>]*\bname="([^"]+)"[^>]*>/g;
  const lastByName = new Map();
  let m;
  while ((m = metaNameRe.exec(head)) !== null) {
    const name = m[1];
    const tag = m[0];
    if (!/\bcontent="[^"]+"/.test(tag) && !/\bcontent="[^"]*"/.test(tag)) continue;
    // accept any content (including empty), but prefer ones with non-empty content
    const hasNonEmpty = /\bcontent="[^"]+"/.test(tag);
    const existing = lastByName.get(name);
    if (!existing || hasNonEmpty) lastByName.set(name, tag);
  }
  metaNameRe.lastIndex = 0;
  const usedName = new Set();
  head = head.replace(metaNameRe, (full, name) => {
    const keep = lastByName.get(name);
    if (keep && full === keep && !usedName.has(name)) {
      usedName.add(name);
      return full;
    }
    return '';
  });

  // <meta property="X">: keep last per property (skip empty content)
  const metaPropRe = /<meta[^>]*\bproperty="([^"]+)"[^>]*>/g;
  const lastByProp = new Map();
  while ((m = metaPropRe.exec(head)) !== null) {
    const prop = m[1];
    const tag = m[0];
    const hasNonEmpty = /\bcontent="[^"]+"/.test(tag);
    const existing = lastByProp.get(prop);
    if (!existing || hasNonEmpty) lastByProp.set(prop, tag);
  }
  metaPropRe.lastIndex = 0;
  const usedProp = new Set();
  head = head.replace(metaPropRe, (full, prop) => {
    const keep = lastByProp.get(prop);
    if (keep && full === keep && !usedProp.has(prop)) {
      usedProp.add(prop);
      return full;
    }
    return '';
  });

  // <link rel="alternate" hreflang="X">: keep last per hreflang
  const altRe = /<link[^>]*\brel="alternate"[^>]*\bhreflang="([^"]+)"[^>]*>/g;
  const lastByLang = new Map();
  while ((m = altRe.exec(head)) !== null) {
    lastByLang.set(m[1], m[0]);
  }
  altRe.lastIndex = 0;
  const usedLang = new Set();
  head = head.replace(altRe, (full, lang) => {
    const keep = lastByLang.get(lang);
    if (keep && full === keep && !usedLang.has(lang)) {
      usedLang.add(lang);
      return full;
    }
    return '';
  });

  return html.replace(/<head>[\s\S]*?<\/head>/, `<head>${head}</head>`);
}

async function main() {
  // 1. Spin up a tiny static server with SPA fallback.
  // `extensions: ['html']` lets express resolve /faq → dist/faq.html so the
  // Puppeteer pass works against the same flat-file layout Netlify will serve.
  const app = express();
  app.use(express.static(distDir, { index: false, extensions: ['html'] }));
  app.get(/.*/, (_req, res) => res.sendFile(path.join(distDir, 'index.html')));
  const server = await new Promise((resolve) => {
    const s = app.listen(0, '127.0.0.1', () => resolve(s));
  });
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  // 2. Launch headless Chrome with French locale.
  // Lumifin's primary audience is French — prerender body content in French
  // (i18n picks up the locale via navigator.language + Accept-Language).
  // Runtime i18n still switches to English for English-browser users.
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--lang=fr-FR',
    ],
  });

  const start = Date.now();
  let success = 0;
  let failed = 0;

  try {
    for (const route of routes) {
      const url = `${baseUrl}${route.path}`;
      const page = await browser.newPage();

      // Force French locale so i18next-browser-languagedetector picks "fr".
      // Detection order in src/i18n/config.ts: localStorage → navigator → htmlTag.
      // Setting localStorage before page load short-circuits to French immediately.
      await page.setExtraHTTPHeaders({ 'Accept-Language': 'fr-FR,fr;q=0.9' });
      await page.evaluateOnNewDocument(() => {
        try {
          localStorage.setItem('lumifin_lang', 'fr');
        } catch {
          // localStorage may be unavailable in some prerender contexts; ignore.
        }
      });

      // Block analytics / external trackers so prerender doesn't hang on them
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        const reqUrl = req.url();
        if (reqUrl.startsWith('http://127.0.0.1') || reqUrl.startsWith('data:')) {
          req.continue();
        } else {
          req.abort();
        }
      });

      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        // Give Helmet a few frames to flush head changes
        await new Promise((r) => setTimeout(r, 500));

        const rawHtml = await page.content();
        const html = dedupeHeadTags(rawHtml);

        const outPath = path.join(distDir, route.out);
        await fs.mkdir(path.dirname(outPath), { recursive: true });
        await fs.writeFile(outPath, html, 'utf8');

        console.log(`  ✓ ${route.path} → ${route.out}`);
        success++;
      } catch (err) {
        console.error(`  ✗ ${route.path} — ${err.message}`);
        failed++;
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\nPrerendered ${success}/${routes.length} routes in ${elapsed}s`);

  if (failed > 0) {
    console.error(`${failed} route(s) failed to prerender`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
