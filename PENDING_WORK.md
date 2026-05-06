# Pending Work — Lumifin Website

SEO / GEO / localization status, last updated 2026-05-05.

---

## ✅ What's already shipped

These are live on lumifin.io after the recent commits. No further action needed.

- **Per-route canonicals** — every page links to its own URL.
- **Crawler-visible HTML** — Puppeteer prerender produces real `dist/<route>/index.html` for every route. AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) now see real content, not the empty SPA shell.
- **robots.txt** — explicit `Allow:` rules for GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot.
- **llms.txt** — Markdown sitemap for AI crawlers.
- **Soft 404 fix** — unknown URLs return HTTP 404, not 200 + homepage.
- **Unique titles / descriptions / OG / Twitter tags per page** — via the `<SEO>` component, baked into static HTML.
- **JSON-LD structured data** — Organization, WebSite, FAQPage, Article, Breadcrumb schemas live.
- **`<html lang="fr">`** — primary audience flagged correctly.
- **French body content prerendered** — Puppeteer runs in French locale.
- **Homepage SEO title/description in French** — moved to i18n, FR audience sees French title in browser tab and search results.
- **French localization audit fixes** — untranslated text, grammar, calques, currency formatting, brand-name consistency.
- **French copy rewrite guide applied** — hero, mission, value props, trust, FAQ, testimonials, team, CTAs all rewritten to sound natively French.

---

## 🔴 P0 — Must do before launch

### 1. Mentions légales + CGU pages *(legally required by LCEN)*
French law requires every commercial website to publish:
- **Mentions légales** (legal notice) — company name, SIREN, address, director, hosting provider.
- **CGU** (Conditions Générales d'Utilisation) — terms of use.

`/privacy` exists but the other two are missing. **Blocker for going live with a real waitlist.**

**What I need from you**: either (a) the legal text from your lawyer, or (b) approval to scaffold from a generic French SaaS template with placeholders. Once content is in hand, ~30 min to wire up.

### 2. Translate SEO meta strings on all other pages
The homepage SEO title/description is now French. **Other 14 pages still serve English `<title>` and `<meta description>` to French Google searches** — biggest remaining SEO miss for the French audience.

Pages affected: FAQ, team, privacy, blog, blog posts (×3), careers, security, travel-money (×4), compare, 404.

**No input needed** — I can do this end-to-end (~45 min). Just say go.

---

## 🟡 P1 — Strongly recommended

### 3. Analytics
Currently zero tracking. Google Search Console is verified (via the `googlefd1fc77406a5591d.html` file) but nothing is collecting visitor data.

| Provider | Cost | Cookie banner | Setup |
|---|---|---|---|
| **Plausible** | ~€9/mo | No | ~5 min |
| **GA4** | Free | Yes (CNIL-compliant banner) | ~30 min |
| **Both** | €9/mo | Yes | ~45 min |

Recommendation given Lumifin is French B2C: **Plausible alone**. Solid privacy story, no banner friction, no GDPR complications. Can add GA4 later when you need audience features.

**What I need from you**: pick a provider; if Plausible, share the script snippet they give you on signup.

### 4. Bing Webmaster Tools verification
Quick win. ~30 seconds once you grab the verify code from https://www.bing.com/webmasters. Adds Bing as a search engine source.

### 5. Sitemap re-check
`public/sitemap.xml` exists but should be verified that all 15 prerendered routes are listed and that lastmod dates make sense. Not auto-generated currently.

**No input needed** — 10 min to audit and refresh.

### 6. Open Graph image audit
The OG image is `https://lumifin.io/assets/preview/og-wa.jpg`, declared as 1920×1080. Best practice for social shares (LinkedIn, X, WhatsApp) is 1200×630, under 1MB. Worth confirming the file is actually that size and uses the right aspect ratio.

**No input needed** — 15 min to inspect and re-export if needed.

---

## 🟢 P2 — Nice to have

### 7. Bilingual URLs with hreflang
Right now both EN and FR serve from the same URL (e.g., `/faq`). The prerender is French; English visitors get a brief flash of French before JS swaps to English. The "right" way is `/fr/faq` and `/en/faq` with `hreflang` tags pointing each at the other.

This is a bigger restructure (touches App.tsx routing, prerender, sitemap, every internal link). Defer until you have actual EN traffic worth optimizing for.

### 8. Native French copywriter pass
The localization audit and rewrite guide both flagged this: a native copywriter should sanity-check the rewritten copy and adjust for brand voice. Especially:
- Hero tagline and mission statement (highest visibility)
- Testimonials (still feel synthetic)

Not a code task — needs an actual copywriter. Probably 2–4 hours of their time.

### 9. Hydration warning sanity check
With prerender-FR / runtime-EN-detection mix, React might log hydration mismatch warnings in the console. Open lumifin.io in incognito with DevTools → Console open, click around, screenshot any warnings. **Send to me, 5 min to fix.**

### 10. Image alt-text audit
Wasn't part of the SEO audit but standard practice. Hero, mockups, blog post images, team photos. Helps accessibility *and* image-search SEO. ~30 min if I do it.

### 11. Schema additions
The audit hinted at `SoftwareApplication` schema being missing (Lumi is technically a software/app product). Adding it would help Google understand the product type. ~15 min.

### 12. Bump Puppeteer to v24+
Current v23 is past its support window. Pure housekeeping; works fine today. ~5 min.

### 13. "Step 1 displayed twice" *(from localization audit)*
Couldn't reproduce in code — likely a runtime visual artifact. **Send a screenshot from the live site once Netlify finishes the latest deploy and I'll fix.**

---

## Quick-reference: which commits did what

- `dd8c1c0` — Initial PENDING_WORK doc
- `dd4a1a0` — French localization audit fixes (P0/P1/P2)
- `ddb6067` — EN footer "Blogs" → "Blog"
- `8af4d03`, `48da71e` — Netlify build command (Puppeteer + Chromium install)
- `abcd25e` — French copy rewrite guide applied (sections 1–8)

---

## Recommended order if you tackle these

1. **Mentions légales + CGU** (legal blocker)
2. **SEO meta on all pages** (biggest SEO win you haven't picked up yet)
3. **Plausible analytics** (5-min setup, lets you measure everything that comes next)
4. **Bing verification** (30 sec)
5. **Sitemap + OG image audit** (defensive cleanup)
6. **Native copywriter pass** (when budget permits)
7. **Bilingual URLs** (when EN traffic justifies it)
