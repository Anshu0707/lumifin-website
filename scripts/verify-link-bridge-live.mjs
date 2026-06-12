#!/usr/bin/env node
/**
 * verify-link-bridge-live.mjs — automated checks against a DEPLOYED /link
 * bridge (ngrok tunnel today, https://lumifin.io after the merge).
 *
 * Sibling of verify-link-bridge.mjs (which builds + serves dist locally and
 * drives headless Chrome). This one is pure HTTP — it asserts everything a
 * no-JS client can see, which is exactly the email-security-scanner surface
 * (design doc §10) plus the .well-known association files.
 *
 * Usage:
 *   node scripts/verify-link-bridge-live.mjs --base https://<id>.ngrok-free.dev
 *   node scripts/verify-link-bridge-live.mjs --base https://lumifin.io --strict-headers
 *
 * Flags:
 *   --base            base URL to test (required)
 *   --strict-headers  fail (instead of warn) when the AASA Content-Type is
 *                     not application/json. Use against Netlify, where
 *                     netlify.toml controls the header. Dev-server/ngrok runs
 *                     don't apply netlify.toml, so the header is legitimately
 *                     absent there — lax mode only warns.
 *
 * Exit code: 0 = all checks pass (warnings allowed in lax mode), 1 = failures.
 *
 * Sprint 4 runbook Part A mapping: A1 (c1,c2), A2 (c3), A3 (c8,c9),
 * A6 (c5,c6,c7), plus assetlinks state (c10). A4/A5 (Apple CDN / Google DAL)
 * only make sense on the real domain — run those curls from the runbook.
 */

'use strict';

const args = process.argv.slice(2);
const baseIdx = args.indexOf('--base');
const BASE = baseIdx !== -1 ? (args[baseIdx + 1] || '').replace(/\/+$/, '') : '';
const STRICT_HEADERS = args.includes('--strict-headers');

if (!/^https:\/\//i.test(BASE)) {
  console.error('Usage: node scripts/verify-link-bridge-live.mjs --base https://<host> [--strict-headers]');
  process.exit(1);
}

// ngrok free shows a browser interstitial unless this header is present;
// harmless everywhere else.
const HEADERS = { 'ngrok-skip-browser-warning': '1', 'user-agent': 'lumifin-bridge-verify/1.0' };

const results = [];
function record(id, name, ok, detail, warnOnly = false) {
  results.push({ id, name, ok, detail, warnOnly });
  const mark = ok ? 'PASS' : warnOnly ? 'WARN' : 'FAIL';
  console.log(`  [${mark}] ${id} ${name}${detail ? ` — ${detail}` : ''}`);
}

async function get(path) {
  // redirect:'manual' so any 3xx is OUR finding, never silently followed —
  // "no server-side redirect" is the core scanner-safety property.
  const res = await fetch(BASE + path, { redirect: 'manual', headers: HEADERS });
  const body = await res.text();
  return { status: res.status, headers: res.headers, body };
}

console.log(`Verifying live bridge at ${BASE}  (${STRICT_HEADERS ? 'strict' : 'lax'} header mode)\n`);

try {
  // ── /link?intent=add-funds — the URL every KYC email carries ─────────────
  const main = await get('/link?intent=add-funds');
  record('c1', '/link returns 200 (no 3xx redirect)', main.status === 200, `status ${main.status}`);
  const ct = main.headers.get('content-type') || '';
  record('c2', '/link Content-Type is text/html', ct.includes('text/html'), ct || '(empty)');
  record('c3', 'no meta-refresh in HTML', !/http-equiv\s*=\s*["']?refresh/i.test(main.body));
  record('c4', 'bridge page served, not the React app',
    main.body.includes('email-CTA deep-link bridge'),
    main.body.includes('email-CTA deep-link bridge') ? '' : 'marker comment missing — SPA fallback?');

  // ── reflection guards (allowlist + id charset, §5.1) ─────────────────────
  const evil = await get('/link?intent=%3Cscript%3Eevil()%3C%2Fscript%3E');
  record('c5', 'garbage intent never reflected', evil.status === 200 && !evil.body.includes('<script>evil'));
  const badId = await get('/link?intent=add-funds&id=%22%3E%3Cimg%20src%3Dx%3E');
  record('c6', 'malformed id never reflected', badId.status === 200 && !badId.body.includes('<img src=x>'));
  const okId = await get('/link?intent=add-funds&id=tx_abc-123');
  record('c7', 'well-formed id still serves the bridge', okId.status === 200 && okId.body.includes('email-CTA deep-link bridge'));

  // ── AASA ──────────────────────────────────────────────────────────────────
  const aasa = await get('/.well-known/apple-app-site-association');
  record('c8', 'AASA returns 200 (no redirect)', aasa.status === 200, `status ${aasa.status}`);
  const appIds = ['CX3NHAM8XH.com.lumifin.app', 'CX3NHAM8XH.com.lumifin.app.qa', 'CX3NHAM8XH.com.lumifin.app.dev'];
  const missing = appIds.filter((id) => !aasa.body.includes(id));
  record('c9', 'AASA carries all 3 real appIDs', missing.length === 0, missing.length ? `missing: ${missing.join(', ')}` : '');
  const aasaCt = aasa.headers.get('content-type') || '';
  record('c9h', 'AASA Content-Type is application/json',
    aasaCt.includes('application/json'),
    aasaCt || '(empty — netlify.toml header; absent on dev-server/ngrok)',
    !STRICT_HEADERS);

  // ── bridge config state (v3 allowlist + Android package map) ─────────────
  record('c11', 'allowlist v3 served (frozen contract tokens)',
    ['transaction', 'withdraw', 'set-mpin', 'terms'].every((t) => main.body.includes(`'${t}'`)),
    '', false);
  record('c12', 'ANDROID_PACKAGES map filled (com.finxflow.app)',
    main.body.includes('com.finxflow.app'));

  // ── assetlinks.json ───────────────────────────────────────────────────────
  const al = await get('/.well-known/assetlinks.json');
  let alState = 'unparseable';
  try {
    const parsed = JSON.parse(al.body);
    alState = JSON.stringify(parsed).includes('PLACEHOLDER') ? 'placeholder' : 'real values';
  } catch { /* keep unparseable */ }
  record('c10', 'assetlinks.json returns 200 + valid JSON',
    al.status === 200 && alState !== 'unparseable', alState);
} catch (err) {
  console.error(`\nRequest error: ${err.message}`);
  console.error('Is the tunnel/dev server up? (and the URL current — ngrok URLs rotate)');
  process.exit(1);
}

// ── summary ──────────────────────────────────────────────────────────────────
const failures = results.filter((r) => !r.ok && !r.warnOnly);
const warnings = results.filter((r) => !r.ok && r.warnOnly);
console.log('\n────────────────────────────────────────────');
console.log(`  ${results.filter((r) => r.ok).length}/${results.length} passed` +
  (warnings.length ? `, ${warnings.length} warning(s)` : '') +
  (failures.length ? `, ${failures.length} FAILURE(S)` : ''));
if (warnings.length) {
  console.log('  Warnings are expected on ngrok/dev-server; re-run with');
  console.log('  --strict-headers against https://lumifin.io after the merge.');
}
console.log('  Not coverable over HTTP: device app-open, store fallback,');
console.log('  EN/FR switch — see sprint-4-e2e-runbook.md Part B.');
console.log('────────────────────────────────────────────');
process.exit(failures.length ? 1 : 0);
