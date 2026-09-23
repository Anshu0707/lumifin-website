# Hosting app images on the Lumifin website

**Status:** proposal for discussion
**Last updated:** 23 September 2026
**Scope:** fixed app assets (onboarding screens, icons, illustrations, promo banners) — *not* user-uploaded content

---

## TL;DR

Serving the app's fixed images from `lumifin.io/assets/app/` works, costs nothing extra, and
needs no new accounts. The website already does exactly this for 39 MB of its own images.

The catch is cache invalidation. Files in `public/assets/` keep their exact filenames after a
build, and Netlify serves them with a **one-year immutable cache**. Overwrite an image in place
and users who already downloaded it may keep the old version for up to a year.

**The rule that makes this safe: never overwrite an image. Always publish a new filename.**

If that rule is followed, this is the right choice for where Lumifin is today. If the app later
needs per-user images, uploads, or guaranteed independence from the marketing site, move to
Cloudflare R2 — and design for that now by keeping the base URL in config.

---

## 1. What is actually being proposed

The app needs to display images. Rather than bundling them inside the app binary, it downloads
them at runtime from a URL.

```
App launches
   ↓
Requests https://lumifin.io/assets/app/onboarding-1.webp
   ↓
Netlify CDN serves the file from an edge node near the user
   ↓
App caches it on the device
```

Concretely, this means adding a folder to the website repo:

```
public/assets/app/
├── onboarding/
│   ├── welcome-v1.webp
│   ├── scan-v1.webp
│   └── topup-v1.webp
├── icons/
│   └── wallet-v1.webp
└── promo/
    └── vietnam-beta-v1.webp
```

Deploy the site, and those files are live at `https://lumifin.io/assets/app/onboarding/welcome-v1.webp`.

---

## 2. Why this is being considered

### The problem it solves

Images bundled inside an app can only change when you ship a new build. That means:

- An App Store review cycle (typically 1–3 days, occasionally longer)
- A Play Store rollout
- Users who don't auto-update keep seeing the old image indefinitely

For a promo banner or a seasonal onboarding screen, that is a slow and expensive way to change
a picture.

### What remote hosting buys

| Benefit | Why it matters for Lumifin |
|---|---|
| Change images without an app release | Swap a beta promo banner the same day, no review queue |
| Smaller app download | Fewer MB in the binary; matters on mobile data in SEA |
| One source of truth | The same illustration can appear in the app and on the website |
| Zero additional cost | Uses infrastructure that already exists and is already paid for |

---

## 3. What already exists (so this is less new than it sounds)

The website is not starting from zero here. It already serves a substantial image library
from the same mechanism.

**Current contents of `public/assets/` — 39 MB total:**

| Folder | Size | What it holds |
|---|---|---|
| `demo/` | 13 MB | Beta tester photos and videos |
| `team/` | 12 MB | Team portraits |
| `blog/` | 8.7 MB | Blog cover images |
| `places/` | 2.9 MB | Destination photography |
| `screens/` | 796 KB | App screenshots |
| `preview/` | 792 KB | Open Graph / social preview images |
| `regions/` | 380 KB | Region illustrations |
| `hero/` | 52 KB | Landing page hero assets |

Typical blog cover: **90–180 KB** as WebP at 1600×900.

**The delivery path is already configured.** From `netlify.toml`:

```toml
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

That is a one-year cache. Every image under `/assets/` is downloaded once per device and served
from local cache thereafter.

Adding `public/assets/app/` inherits all of this automatically. **No configuration change is
required.**

---

## 4. How it would work

### 4.1 Adding an image

1. Export at the size actually needed — do not ship a 4000px image to a 400px slot
2. Convert to WebP (the site standard; roughly 25–35% smaller than JPEG at equal quality)
3. Name it with a version suffix: `welcome-v1.webp`
4. Place it in `public/assets/app/<category>/`
5. Commit and push — Netlify deploys it automatically

### 4.2 Updating an image — **read this part carefully**

This is where the approach can go wrong, so it is worth being precise about the mechanism.

Vite content-hashes the files it bundles. A JavaScript chunk comes out as:

```
dist/assets/AuthorBio--bmik4II.js
```

When that file's contents change, the hash changes, the URL changes, and browsers fetch the new
version. Caching is safe because the filename is tied to the content.

**Files in `public/assets/` are not hashed.** They are copied through verbatim:

```
public/assets/blog/cash-is-king-cover.webp
   ↓  (build)
dist/assets/blog/cash-is-king-cover.webp     ← same name, no hash
```

Combine that with `max-age=31536000, immutable` and the consequence is:

> If you overwrite `welcome-v1.webp` with new artwork, every device that already downloaded it
> will keep showing the **old** image — potentially for a year. There is no way to force a refresh
> on those devices from the server side.

**Two ways to handle this correctly:**

**Option A — version the filename (recommended)**

```
welcome-v1.webp   →   welcome-v2.webp
```

New filename, new URL, no cache to fight. The app must be told the new name, which means either
an app update or a config endpoint (see §4.3). Keep the old file in place for a while so users on
older app versions do not get a 404.

**Option B — query-string versioning**

```
welcome.webp?v=2
```

The app appends the version. CDNs generally treat the query string as part of the cache key, so
this usually works. It is slightly less reliable than a genuine filename change and depends on
CDN behaviour, so Option A is safer.

### 4.3 The one design decision worth making now

**Do not hardcode `https://lumifin.io` throughout the app.** Put the base URL and the image
manifest in a config the app fetches at startup:

```json
{
  "imageBaseUrl": "https://lumifin.io/assets/app",
  "images": {
    "onboardingWelcome": "onboarding/welcome-v2.webp",
    "onboardingScan": "onboarding/scan-v1.webp"
  }
}
```

This costs very little now and buys two things:

1. Images can be updated by changing the manifest — no app release
2. Migrating to R2 or a CDN later is a one-line change, not a code sweep

Without this, both a filename change and a provider migration require an app-store release, which
removes most of the benefit you were trying to gain.

---

## 5. Pros and cons, honestly

### Pros

**No new infrastructure.** No account, no bill, no extra system to monitor or hand over. For a
pre-launch team this is worth more than it sounds.

**Global CDN, already paid for.** Netlify serves from edge nodes worldwide. A user in Da Nang or
Bangkok gets the file locally, not from Europe. This is the single biggest technical argument, and
it is genuinely free here.

**Aggressive caching already configured.** One-year immutable cache is optimal for versioned
assets.

**Same pipeline the team already knows.** Commit, push, deployed. No separate upload tool.

**Shared assets stay in sync.** An illustration used in both the app and on the website lives in
one place.

### Cons

**The app becomes dependent on the marketing site.** Today a broken website deploy affects the
website. Under this proposal it also affects the app. These are currently independent failure
domains and this couples them. Worth naming explicitly.

**Cache invalidation is a genuine footgun.** Covered in §4.2. Manageable, but it will bite someone
who overwrites a file without knowing the rule.

**Bandwidth is capped.** Netlify's free tier allows 100 GB/month. The current site is nowhere near
it, but app traffic has a different shape: every install fetching a few MB accumulates faster than
web traffic does. At 10,000 installs × 3 MB that is 30 GB in a month — still within budget, but no
longer negligible. **Worth monitoring, not worrying about.**

**Everything is public.** Any URL under `/assets/` is fetchable by anyone. Fine for onboarding
art; unacceptable for anything user-specific or sensitive.

**Repo size grows.** Images in git are binary blobs that never compress well. 39 MB today is fine;
if app assets add hundreds of MB, clone times and CI will start to suffer.

**No image transformation.** No automatic resizing or format negotiation. Every variant must be
exported and committed by hand. A dedicated image CDN does this automatically.

---

## 6. The alternatives, and when each is right

| Option | Cost | Best for | Main drawback |
|---|---|---|---|
| **This website** (`/assets/app/`) | Free | Fixed assets, small library, pre-launch | Couples app to site; manual versioning |
| **Cloudflare R2** | Free tier, then ~$0.015/GB stored; **no egress fees** | The natural next step; decoupled from the site | One more account and deploy path |
| **AWS S3 + CloudFront** | ~$0.023/GB + egress | Teams already on AWS | Egress charges add up; more setup |
| **Cloudinary / imgix** | Free tier, then paid | Many size variants, on-the-fly transforms | Cost scales with usage; vendor lock-in |
| **Supabase / Firebase Storage** | Free tier, then paid | When you *also* need user uploads and auth | Overkill for fixed assets alone |
| **Bundle in the app** | Free | Assets that must work offline on first run | Requires an app release to change |

### Recommendation by stage

**Now (pre-launch, beta in Vietnam):** use the website. The library is small, the cost is zero,
and the team already knows the workflow.

**When you add user uploads** — profile photos, KYC documents, receipts — stop. That is a different
problem with real security, GDPR and access-control requirements. It needs proper object storage
with signed URLs, almost certainly alongside whatever backend handles KYC. Do not extend this
approach to cover it.

**When app bandwidth approaches the Netlify cap, or you want the app independent of website
deploys:** move to Cloudflare R2. If §4.3 was followed, this is a config change rather than an app
release.

---

## 7. Recommended setup

If this is approved, the concrete steps:

1. **Create the folder structure** under `public/assets/app/`, organised by purpose
2. **Adopt the versioning rule**: filenames end in `-v1`, `-v2`, … and are never overwritten
3. **Keep old versions live** for at least one app release cycle so older clients do not 404
4. **Serve a config manifest** (§4.3) so image paths can change without an app release
5. **Ship offline fallbacks in the app** for anything a first-run user sees — a broken image box is
   a poor first impression, and first launch is exactly when the network may be unreliable
6. **Set a size budget**: target under 200 KB per image, WebP, sized to the actual display slot
7. **Watch Netlify bandwidth** monthly once the app is in real use

### Things to avoid

- Overwriting an existing filename (see §4.2 — this is the main risk)
- Hardcoding `lumifin.io` in app source
- Putting anything user-specific or sensitive under `/assets/`
- Committing unoptimised exports — a 4 MB PNG helps nobody

---

## 8. Open questions for the team

1. **Roughly how many images, and what total size?** Under ~50 MB this is clearly fine. Several
   hundred MB changes the repo-size calculus.
2. **How often will they change?** Rarely → versioning is trivial. Weekly → the config manifest
   in §4.3 becomes essential rather than nice-to-have.
3. **Are per-user images coming soon?** If KYC document upload is on the near roadmap, it may be
   worth standing up R2 once and using it for both, rather than migrating later.
4. **Who owns the images?** If a designer without repo access needs to update them, a
   commit-and-push workflow may be the wrong fit and a storage bucket with a UI may be better.

---

## Appendix: quick reference

**URL pattern**
```
https://lumifin.io/assets/app/<category>/<name>-v<n>.webp
```

**Adding an image**
```bash
# 1. optimise and convert to WebP at the display size
# 2. place under public/assets/app/<category>/
# 3. commit and push — Netlify deploys automatically
```

**Cache behaviour**

| Path | Cache | Filename hashed? |
|---|---|---|
| `/assets/*` | 1 year, immutable | **No** — you must version manually |
| Bundled JS/CSS | 1 year, immutable | Yes — Vite adds a content hash |
| `*.html` | 5 min CDN, revalidate | n/a |
