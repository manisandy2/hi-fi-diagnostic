# Hi-Fi Diagnostic — Testing Report

> Executed tests are recorded here per phase. Builds run with `npm run build` (Vite production build). Browser tests use Chrome headless (`google-chrome --headless=new --no-sandbox`) with SwiftShader WebGL (`--enable-unsafe-swiftshader --use-angle=swiftshader`). Browser tests are executed via custom CDP scripts (in `/tmp/opencode`) that connect to Chrome DevTools Protocol and evaluate the rendered DOM, console, and interaction state — no screenshots (model does not support image input).

## 0. Baseline (pre-changes, audit verification)

- Date: 2026-11-21
- Command: `npm run build` → **PASS** — vite 8.3.8, 597 modules transformed, ~1.2 s build.
- Browser smoke: `google-chrome --headless=new --dump-dom about:blank` → OK. WebGL context test (`data:` URL page) → `WEBGL_OK`.

## Phase 1 — Requirements and Planning

- `npm run build` (baseline, pre-changes): **PASS** — 597 modules, dist/ produced.
- Docs created: PROJECT_PLAN.md, PROJECT_STATUS.md, TECHNICAL_ARCHITECTURE.md, 3D_WORKFLOW_SPECIFICATION.md, TESTING_REPORT.md, DEPLOYMENT_GUIDE.md.
- `src/data/businessInfo.js` created with placeholders.
- No code changes yet.

## Phase 3 — React project architecture

- `npm run build` → **PASS** — `dist/assets/index-GPQDUhTW.css` 19.89 kB, `dist/assets/index-BJlOCLjt.js` 1,216.05 kB.
- CSS architecture verified (browser check on `/`: rootChildren 3, no exceptions).
- Header/Footer refactored to shared `data/navigation.js`.

## Phase 4 — 3D modeling

- `npm run build` → **PASS**.
- Geometry fix (Node check): needle tip + flow path had `ConeGeometry` arg misreads → replaced with `CylinderGeometry(radiusTop, radiusBottom, height)` — `Three`-verified spans.

## Phase 5 — 3D animation and interaction

- `npm run build` → **PASS**.
- CDP: initial stage 1 on `/` (canvas present, WebGL2 true); Play → stage advances (Stage 2, 25% observed at 10 s); Pause (controls: Play+Resume); Restart (back to Stage 1). No console errors.

## Phase 6 — Home page

- `npm run build` → **PASS**.
- CDP on `/`: rootChildren 3, no exceptions; sections: home-hero, company-introduction, services-overview, why-choose, facilities-preview, appointment-cta.

## Phase 7 — About page

- `npm run build` → **PASS** (rolldown emission issue with static BloodKitCanvas diagnosed and worked around — see PROJECT_STATUS.md Known issues).
- CDP on `/about`: rootChildren 3, no exceptions; sections: about-hero, laboratory-introduction, mission-vision, values, quality-commitment, laboratory-approach, about-contact-cta.

## Phase 9 — Animations and interactions

- Reduced-motion media query verified present (global.css).
- CSS transitions verified (cards, buttons, progress bar) — CSS-level, no browser assertions recorded (visual).

## Phase 10 — SEO and accessibility

- CDP `seo-check` (all 5 routes): titles OK; canonical placeholders present; OG images present; Organization JSON-LD count 1.

## Phase 11 — Performance and QA (recorded)

### 11.1 Production build (final)
- Command: `npm run build` → **PASS** — `dist/assets/index-Co9hJd9T.js` 302.49 kB (gzip 91.08 kB), `dist/assets/BloodWorkflowCanvas-fGTuvAD7.js` 967.03 kB (gzip 256.33 kB), `dist/assets/index-Db9-HtWa.css` 21.01 kB (gzip 4.25 kB), built in ~0.6 s.

### 11.2 Browser tests — routes + rendering (all five routes)
Executed via CDP: `node /tmp/opencode/cdp-test.mjs <url>`.

| Route | rootChildren | Exceptions | Sections (all present) |
|---|---|---|---|
| `/` | 3 ✓ | 0 | home-hero, company-introduction, services-overview, why-choose, facilities-preview, appointment-cta |
| `/about` | 3 ✓ | 0 | about-hero, laboratory-introduction, mission-vision, values, quality-commitment, laboratory-approach, about-contact-cta |
| `/services` | 3 ✓ | 0 | services-hero, service-categories, service-cards, sample-collection-information, test-enquiry, services-contact |
| `/facilities` | 3 ✓ | 0 | facilities-hero, laboratory-environment, equipment-presentation, sample-processing, quality-safety, gallery, facilities-contact |
| `/contact` | 3 ✓ | 0 | contact-hero, contact-information, enquiry-form, appointment-enquiry, map-placeholder |

WebGL2 context present on `/` (canvas.getContext("webgl2") === true).

### 11.3 Browser tests — 3D workflow (Home, full playback)
Executed via CDP: `node /tmp/opencode/workflow-fullrun.mjs`.
- Initial: stage = "Stage 1 — Equipment preparation", canvas present.
- Click Play → wait 25 s → snapshot: `{"stage":"Completed","status":"Completed","doneDots":7,"activeDots":0,"message":"All stages complete. The collected sample is stored in rack slot 0."}`.
- Console errors/warnings: `[]`.

(Also recorded earlier: Play → Stage 2 "Blood collection" 25% at ~10 s; Pause → controls switch to Play+Resume; Restart → Stage 1.)

### 11.4 Browser tests — Contact form validation
Executed via CDP: `node /tmp/opencode/contact-test.mjs` on `/contact`.
1. Empty general enquiry submit → status: "Please check the form fields — 3 fields need attention."; field errors: "Please enter your full name.", "Please enter your email address.", "Please describe your enquiry."
2. Valid submit (name/email/phone/message filled) → status: "Thank you — your enquiry has been submitted for review. Contact details will be provided once confirmed with the laboratory."
3. Invalid email ("not-an-email") → status: "Please check the form fields — 1 field needs attention."; email error: "Please enter a valid email address."
4. Appointment form variant renders with "Request Appointment" submit button.

### 11.5 SEO checks
Executed via CDP: `node /tmp/opencode/seo-check.mjs` — all 5 routes: titles OK; canonical placeholders (e.g., `https://hi-fi-diagnostic.example/about`); og:image present; Organization JSON-LD count 1.

### 11.6 Lint
`npm run lint` (oxlint) — **warnings only** (react refs/purity/only-export-components; pre-existing purity warning in Footer). No errors.

### 11.6b WebGL fallback + navigation + mobile
Executed via CDP (`node /tmp/opencode/nav-mobile-test.mjs`):
- Navigation: Home → click "About Us" → /about; click "Services" → /services; click footer "Contact" → /contact; click logo → /. All with `rootChildren: 3`, no exceptions.
- Mobile viewport (Emulation.setDeviceMetricsOverride 390×844 DPR 3): canvas present, `webgl2: true`, rootChildren 3.
- WebGL fallback: `Canvas` accepts the `fallback` prop (R3F v9 — verified in installed fiber source); the fallback element is in the DOM (hidden when WebGL available). Verified `webgl2 === true` on `/` — fallback not shown.

### 11.7 SEO checks
Executed via CDP: `node /tmp/opencode/seo-check.mjs` — all 5 routes: titles OK; canonical placeholders (e.g., `https://hi-fi-diagnostic.example/about`); og:image present; Organization JSON-LD count 1.

### 11.8 Performance
- 3D experience lazy-loaded (separate `BloodWorkflowCanvas-*.js` chunk — 967 kB; main bundle 302 kB).
- No raster images used; OG images are vector SVGs.
- Production build passes; no critical browser errors.

### 11.7 Performance
- 3D experience lazy-loaded (separate `BloodWorkflowCanvas-*.js` chunk — 967 kB; main bundle 302 kB).
- No raster images used; OG images are vector SVGs.
- Production build passes; no critical browser errors.

## Phase 12 — Deployment (pending final pass)

See `DEPLOYMENT_GUIDE.md`. Final production build + route verification recorded in Phase 11.
