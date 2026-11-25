# Hi-Fi Diagnostic — Deployment Guide

## 1. Overview

Deploy the production build (`dist/`) to Cloudflare Pages. The app is a single-page React application — configure the SPA fallback so that routes `/about`, `/services`, `/facilities`, `/contact` return `index.html`.

## 2. Local production build

```bash
npm install        # ensure dependencies are installed
npm run build      # → dist/ (Vite production build)
```

Verify: `dist/index.html` exists; assets in `dist/assets/`.

Local preview (optional): `npm run preview` (serves `dist/` on `http://localhost:4173`), then open `http://localhost:4173/`, `/about`, etc.

## 3. Cloudflare Pages configuration

**Deployment settings (Cloudflare Pages dashboard or `wrangler`):**

- **Pages app:** Hi-Fi Diagnostic (any UI framework — select "None" or connect the GitHub repo).
- **Project root:** repo root (`/home/manisandy/hi-fi-diagnostic`).
- **Build command:** `npm install && npm run build` (or `npm run build` if `node_modules` is cached).
- **Build output directory:** `dist`.
- **Environment variables:** none required for v1 (audit decision). Placeholders: `NODE_ENV=production` set by Pages automatically.

**SPA fallback (required):**

1. Go to **Settings → Pages → Rewrites and redirects**, or define `wrangler.toml`:

```toml
# wrangler.toml (optional, for Cloudflare Pages with custom settings)
[build]
command = "npm run build"
output_directory = "dist"

# Rewrite all routes to index.html for SPA behavior
[[rewrites]]
source = "/*"
destination = "/index.html"
```

Or via dashboard: add rewrite `/*` → `/index.html`.

2. Alternatively, when deploying with `wrangler`, Pages already handles SPA apps (`--compatibility`?). Confirm via the dashboard "Rewrites and redirects" tab.

## 4. Domain configuration

- The canonical URL placeholder is `https://hi-fi-diagnostic.example/` (`src/data/businessInfo.js`).
- Update before launch: set the production domain, set `BUSINESS_INFO.canonical` to the real domain, and update `pageMeta.js` canonical URLs (placeholders — see `TESTING_REPORT.md` and `PROJECT_STATUS.md`).

## 5. Verify production URLs

After deploy, test:
- `https://<pages-domain>/` — Home renders.
- `https://<pages-domain>/about` — About renders (SPA fallback).
- `https://<pages-domain>/services` — Services renders.
- `https://<pages-domain>/facilities` — Facilities renders.
- `https://<pages-domain>/contact` — Contact renders.
- All pages: 3D workflow visible on Home, no console errors (Chrome headless screenshots; see `TESTING_REPORT.md`).

## 6. Rollback

- **Immediate:** roll back to the previous deployment in the Cloudflare Pages dashboard.
- **Code:** revert to the previous commit/tag, rebuild, and redeploy.
- **Asset versioning:** Cloudflare Pages serves content-hashed assets; old builds remain available for rollback until purged.

## 7. Verified before deploy (Phase 11)

- **Production build** (recorded in `TESTING_REPORT.md`): `npm run build` → PASS — `dist/assets/index-Co9hJd9T.js` 302.49 kB, `dist/assets/BloodWorkflowCanvas-fGTuvAD7.js` 967.03 kB, `dist/assets/index-Db9-HtWa.css` 21.01 kB.
- **All five routes verified** in headless Chrome (CDP): `/`, `/about`, `/services`, `/facilities`, `/contact` — DOM checks: rootChildren 3, no exceptions; expected sections present per route.
- **3D workflow verified**: Play → completes through all stages to "Completed" ("All stages complete. The collected sample is stored in rack slot 0."); zero console errors.
- **Contact form verified**: validation messages (empty, invalid email, valid submit → success status).
- **SEO verified**: titles/meta/canonical/OG/JSON-LD present per route.
- **Static BloodKitCanvas**: preserved in the codebase but not mounted (rolldown emission bug — see PROJECT_STATUS.md Known issues).

## 8. Notes

- No backend or API is configured in v1 (audit decision). The Contact form validates client-side and shows a clear local status.
- Replace the canonical placeholder domain (`https://hi-fi-diagnostic.example/` — `src/data/pageMeta.js`) with the real production domain before launch.
- Replace business-information placeholders (`src/data/businessInfo.js`) with verified business details before launch.
- If a backend is added later, wire the form to the new service and update `BUSINESS_INFO.contactNote` (removing the placeholder note).
