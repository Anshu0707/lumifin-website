# Pending Work — Lumifin Website

A running list of outstanding tasks from the SEO/GEO audit and follow-up reviews.
Last updated: 2026-05-05.

---

## 1. Verify the last two deploys are actually live

Before doing anything else, confirm the prerender + 404 fixes from commits
`decf96a` and `b7deb59` are working in production.

Run these against the live site:

```bash
# Should return HTTP/2 404 (not 200)
curl -I https://lumifin.io/this-does-not-exist

# Should return Markdown (not the SPA shell)
curl https://lumifin.io/llms.txt

# Should return real FAQ HTML with FAQ-specific title and content
curl -A "GPTBot" https://lumifin.io/faq | head -40

# Should show <html lang="fr">
curl -s https://lumifin.io/ | grep '<html'
```

If any of these still look broken, check the Netlify build log first
(Puppeteer install can occasionally fail and silently fall back to the
old SPA shell).

---

## 2. Mentions légales + CGU pages — *legally required (LCEN)*

French law requires every commercial website to publish:

- **Mentions légales** (legal notice) — company name, SIREN, address,
  director's name, hosting provider's contact info.
- **CGU** (Conditions Générales d'Utilisation) — terms of use.

Currently `/privacy` exists but the other two are missing from the sitemap
and footer.

### What I need from you

Pick one:

- **(a)** You write the text (or your lawyer does), and send it over.
- **(b)** Authorize me to scaffold the pages with a generic French SaaS
  template that has placeholders for the LumiFin SAS specifics (SIREN,
  hosting provider, etc.), so you can fill them in. Get a lawyer to vet
  before going live with real users.

### Once content exists

I can wire up:

- New routes in `src/App.tsx`: `/mentions-legales`, `/cgu`
- New components: `src/pages/MentionsLegalesPage.tsx`, `src/pages/CguPage.tsx`
- Footer links pointing to both
- Sitemap entries in `public/sitemap.xml`
- Add both routes to the prerender list in `scripts/prerender.mjs`
- Translate via the existing i18n setup if you want EN versions too

Estimated effort once text is in hand: ~30 min.

---

## 3. Analytics setup

Currently no analytics or tracking is live. Google Search Console *is*
verified (via `public/googlefd1fc77406a5591d.html`), but there's nothing
collecting visitor data, conversions, or funnel metrics.

### What I need from you

**Decide on a provider.** Trade-offs:

| Option | Cost | Cookie banner needed? | Setup effort |
|---|---|---|---|
| **Plausible** | ~€9/mo | No (no PII) | Easiest, ~5 min |
| **GA4** | Free | Yes (CNIL-compliant banner) | ~30 min + banner work |
| **Both** | €9/mo | Yes (GA needs the banner) | ~45 min |
| **None for now** | — | — | — |

Recommendation given Lumifin is French B2C and GDPR scrutiny is real:
Plausible alone is probably the right call until you actually need GA4's
audience features.

### Bonus — Bing Webmaster Tools

Adding this is one meta tag in `index.html`. ~30 seconds once you grab
the verify code from https://www.bing.com/webmasters. Worth doing —
small but free SEO surface area.

---

## 4. Translate SEO meta strings into French

**This is the highest-impact remaining SEO improvement.**

The prerendered body content is now French, but the `<title>`,
`<meta description>`, `og:title`, etc. are still hardcoded English in each
page component. So a French Google searcher sees:

- Body: French ✓
- Title in search results: "FAQ — Frequently Asked Questions | Lumifin" ✗

For the French audience this is a noticeable miss.

### What needs to happen

Each page (e.g., `src/pages/FAQPage.tsx`) currently has:

```tsx
<SEO
  title="FAQ — Frequently Asked Questions"
  description="Everything you need to know about Lumifin..."
  canonical="/faq"
/>
```

Move those strings into `src/i18n/locales/{en,fr}.json` and reference them
via `t()`:

```tsx
<SEO
  title={t('faqPage.seo.title')}
  description={t('faqPage.seo.description')}
  canonical="/faq"
/>
```

15 pages × ~3 strings each = ~45 strings to translate. Estimated effort:
~45 min for the wiring, plus translation time (or use DeepL).

No input needed from you — I can do this end-to-end. Just say the word.

---

## 5. Sanity-check hydration warnings

Open the live site in a Chrome incognito window with DevTools open, switch
to the Console tab, and reload a few pages. We're now serving prerendered
HTML in French to a browser that may detect English — React might log
hydration mismatch warnings.

If you see warnings: send me a screenshot, I'll fix.
If clean: no action needed.

5-minute check.

---

## 6. Future / nice-to-have (not urgent)

- **Bilingual URLs** (`/fr/faq`, `/en/faq` with hreflang). The "right" way
  to serve both languages — gives English users prerendered English
  content instead of a French→English flip. Bigger project, not blocking.
- **Bump Puppeteer to v24+** — current v23 is past its support window.
  Pure housekeeping; works fine today.
- **Image alt text audit** — was not part of the GEO audit but standard
  practice for accessibility and image-search SEO.
- **Performance pass** — Lighthouse, LCP, JS bundle splitting beyond
  what's there now. Not urgent given the site is already light.

---

## Quick reference — recent commits

- `decf96a` — Prerender all routes + AI crawler rules
- `b7deb59` — Soft-404 fix, llms.txt, lang="fr", French prerender locale
