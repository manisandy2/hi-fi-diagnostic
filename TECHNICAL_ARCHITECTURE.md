# Hi-Fi Diagnostic — Technical Architecture

## 1. Stack

| Area | Technology |
|---|---|
| Framework | React 19 (functional components, hooks) |
| Build tool | Vite 8 (production build → `dist/`) |
| Router | React Router 7 (`BrowserRouter`, nested `Layout` route) |
| 3D | Three.js 0.187 + React Three Fiber 9.8 (`@react-three/fiber`) + Drei 10.7 (`@react-three/drei`) |
| Animations | GSAP 3.15 (UI effects); R3F `useFrame` + manual timing (workflow stage animations) |
| Icons | Lucide React 1.77 (`lucide-react`) |
| Styling | CSS + CSS custom properties (`src/styles/variables.css`); no CSS-in-JS |
| CSS-in-JS | None (plain CSS with class prefixes per area) |
| Testing | Chrome headless (`--headless=new` + SwiftShader WebGL) — manual + automated verification scripts in `TESTING_REPORT.md` |
| Lint | Oxlint (`npm run lint`) |
| Package manager | npm (`package.json`/`package-lock.json` present) |

No unit-test framework is installed (audit decision, see PROJECT_STATUS.md). Browser-level verification via Chrome headless is the testing layer.

## 2. Directory structure

```
/home/manisandy/hi-fi-diagnostic
├── src
│   ├── main.jsx                      # entry (unchanged)
│   ├── App.jsx                       # routes (unchanged)
│   ├── index.css                     # rewritten entry stylesheet (imports below)
│   ├── App.css                       # dead template styles (left untouched)
│   ├── data/
│   │   ├── businessInfo.js           # business information placeholders
│   │   ├── navigation.js             # shared nav definitions (Header/Footer/SEO)
│   │   ├── pageMeta.js               # SEO meta per route
│   │   └── 3d/
│   │       ├── bloodKitData.js       # static blood-kit component data (existing)
│   │       └── workflowComponentsData.js  # workflow component data (new)
│   ├── sections/                     # page sections (shared across pages)
│   │   ├── HeroSection.jsx
│   │   ├── CTAButton.jsx
│   │   ├── ServicesOverviewSection.jsx
│   │   ├── WhyChooseSection.jsx
│   │   ├── FacilitiesPreviewSection.jsx
│   │   ├── AppointmentCTASection.jsx
│   │   ├── AboutHeroSection.jsx
│   │   ├── MissionVisionSection.jsx
│   │   ├── ValuesSection.jsx
│   │   ├── QualityCommitmentSection.jsx
│   │   ├── LaboratoryApproachSection.jsx   # static BloodKitCanvas explorer
│   │   ├── ServicesSections.jsx
│   │   ├── FacilitiesSections.jsx
│   │   ├── GallerySection.jsx
│   │   └── ContactSections.jsx
│   ├── forms/
│   │   └── ContactForm.jsx           # validated contact/appointment form
│   ├── pages/                        # route pages (Home, About, Services, Facilities, Contact)
│   ├── components/
│   │   ├── layout/                   # Layout, Header, Footer (existing, preserved)
│   │   └── three/
│   │       ├── shared/               # Lighting.jsx, Environment.jsx (existing)
│   │       ├── blood-kit/            # existing static blood-kit 3D (preserved, used in About)
│   │       └── workflow/             # NEW: 3D blood-collection workflow
│   │           ├── PatientArm.jsx
│   │           ├── CollectionNeedle.jsx
│   │           ├── NeedleHolder.jsx
│   │           ├── BloodFlow.jsx
│   │           ├── FillingTube.jsx
│   │           ├── TubeCap.jsx
│   │           ├── StorageRack.jsx
│   │           ├── SampleLabel.jsx
│   │           ├── BloodWorkflowScene.jsx
│   │           ├── BloodWorkflowCanvas.jsx
│   │           ├── WorkflowController.jsx   # timeline + state + context
│   │           ├── BloodFlowAnimation.jsx
│   │           ├── TubeFillAnimation.jsx
│   │           ├── TubeTransferAnimation.jsx
│   │           ├── WorkflowControls.jsx
│   │           ├── WorkflowProgress.jsx
│   │           └── WorkflowComponentInfo.jsx
│   └── styles/
│       ├── variables.css   (design tokens — existing, preserved)
│       ├── global.css      (base resets — existing, extended)
│       ├── layout.css      (header/footer/container/grid systems)
│       ├── sections.css    (section cards/heros/why-choose etc.)
│       ├── pages.css       (page-specific styles: home, about, services, facilities, contact)
│       ├── forms.css       (contact form)
│       ├── workflow.css    (3D workflow area + controls + progress)
│       └── responsive.css  (tablet/mobile/reduced-motion — existing, extended)
├── public/
│   ├── favicon.svg
│   └── images/og/           # NEW: generated OG images (static SVGs)
├── docs/ (empty)            # documentation lives at repo root
├── PROJECT_PLAN.md, PROJECT_STATUS.md, TECHNICAL_ARCHITECTURE.md,
│   3D_WORKFLOW_SPECIFICATION.md, TESTING_REPORT.md, DEPLOYMENT_GUIDE.md
└── package.json, vite.config.js, index.html, dist/
```

## 3. 3D architecture (workflow module)

See `3D_WORKFLOW_SPECIFICATION.md` for the complete spec (stages, timeline, animation logic). Key points:

- `WorkflowController` (React context provider): owns timeline state (`stageIndex`, `elapsed`), playback state (`playing`, `paused`, `stepMode`), speed, selected component. Drives a ~50 ms interval loop that advances stages; exposes `play/pause/resume/restart/stepForward/selectComponent/focusComponent/setSpeed`.
- `BloodWorkflowScene`: three content groups — *Equipment* (PatientArm, CollectionNeedle, NeedleHolder, TubeCap), *Collection* (FillingTube, BloodFlow + BloodFlowAnimation pulse), *Storage* (StorageRack, SampleLabel via `Html`), plus shared Lighting/Environment and OrbitControls.
- Animations are context-driven: components read `{ stageIndex, elapsed, duration }` from context and animate with `useFrame` math; no timelines, no manual cleanup.
- `BloodWorkflowCanvas`: wraps `Canvas` with `fallback` (WebGL failure), responsive sizing via CSS, and overlays controls + progress + component info.

## 4. Data flow

```
src/data/businessInfo.js (placeholders)   →  pages/sections read for labels/copy
src/data/navigation.js                    →  Header, Footer
src/data/pageMeta.js                      →  SEO head (titles/descriptions/OG/canonical)
src/data/3d/workflowComponentsData.js     →  WorkflowComponentInfo + selection info
src/components/three/blood-kit (existing) →  About page explorer + legacy Home position
pages → sections → (icons/lucide)         →  presentational markup + CSS
```

## 5. State management

- Pages: local `useState` in route components.
- Workflow: `WorkflowContext` (React context) — see WorkflowController.
- No global state; no Redux/Zustand needed (audit decision).

## 6. Performance & build

- Pages: `React.lazy` + `Suspense` (lazy route loading; `Home` includes the 3D canvas — 3D code is bundled into the Home chunk; consider dynamic import of the workflow if needed for hero split — implemented via `React.lazy` around `BloodWorkflowCanvas` usage where feasible).
- Images: static SVG OG images; all other assets are vector/CSS (no raster images to optimize).
- CSS: single stylesheet set, code-split naturally by Vite per chunk; pages lazy → CSS code-splitting via per-page imports.
- Build: `npm run build` → `dist/` (Vite 8, Rolldown-based).

## 7. Deployment (placeholder steps)

- Cloudflare Pages: build command `npm run build`, output directory `dist/`.
- SPA fallback: `rewrite` all `/*` → `/index.html` (Cloudflare Pages dashboard "Rewrites and redirects" or `wrangler.toml` equivalent).
- Production domain: placeholder `https://hi-fi-diagnostic.example/` (replace before launch).
- Rollback: restore previous build / redeploy previous commit.
- Details: `DEPLOYMENT_GUIDE.md`.

## 8. Testing approach

- Builds: `npm run build` after every major phase (PASS criteria).
- Browser: Chrome headless `--headless=new` with SwiftShader WebGL; per-phase checks: routes, navigation, layout (desktop/tablet/mobile), 3D rendering, workflow animation, form validation, console errors. Screenshots reviewed by model.
- Documented in `TESTING_REPORT.md` per phase.

## 9. Known issues

- **Static `BloodKitCanvas` not mounted** (rolldown emission bug): bundling any module chain that inlines `src/components/three/blood-kit/components/SampleLiquid.jsx` emits a stray runtime statement `src / components / three / blood - kit / components / SampleLiquid.jsx;` — `ReferenceError: src is not defined` at module evaluation in the produced bundle (verified via bisection: About stub → clean; About importing BloodKitCanvas → error; root cause not fully identified in rolldown). Workaround applied: the static explorer is preserved in the codebase but not mounted; About "Laboratory approach" is text-based; the new 3D workflow module (`src/components/three/workflow/`) is the main Home feature. To re-enable: investigate the rolldown emission and mount `<BloodKitCanvas />` again.
- Stray file `File:` at repo root — accidental copy of Lighting.jsx source — left untouched (potential user work).
- `src/App.css` dead code (unimported) — left untouched.
- Lint warnings (react refs/purity/only-export-components) — accepted (warnings only).
- THREE.Clock deprecation warning (from Drei) — acceptable.
- Browser compatibility: tested on Chrome (headless, SwiftShader). Other browsers: use browser testing (Playwright/Puppeteer) — see `TESTING_REPORT.md` / `DEPLOYMENT_GUIDE.md`.
