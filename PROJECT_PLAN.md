# Hi-Fi Diagnostic — Project Plan

| Field | Value |
|---|---|
| Project | Hi-Fi Diagnostic — blood testing & pathology laboratory website |
| Project directory | `/home/manisandy/hi-fi-diagnostic` |
| Plan created | 2026-11-21 |
| Phases | 12 |
| Status | Phase 11 in progress |

## Site architecture

Single-page React application with React Router (`/` `/about` `/services` `/facilities` `/contact`), shared `Layout` (Header + Footer). Pages: Home, About Us, Services, Facilities, Contact.

### Page content map

- **Home `/`** — Premium medical hero (3D blood collection workflow is the main visual feature — lazy-loaded) → Company introduction → Diagnostic services overview → Why choose Hi-Fi Diagnostic → Laboratory facilities preview → Appointment/contact CTA.
- **About `/about`** — About hero → Laboratory introduction → Mission and vision → Values → Quality commitment → Laboratory approach → Contact CTA.
- **Services `/services`** — Services hero → Diagnostic testing categories (placeholder, business-confirmed only, marked as placeholders) → Individual service cards (placeholder) → Sample collection information (generic educational) → Test enquiry CTA → Contact section.
- **Facilities `/facilities`** — Facilities hero → Laboratory environment → Equipment presentation (illustrative, labeled) → Sample processing overview → Quality and safety → Gallery (illustrative) → Contact CTA.
- **Contact `/contact`** — Contact hero → Contact information (placeholders) → Enquiry form (validated) → Appointment enquiry → Map placeholder → Footer.

## Phase plan

### Phase 1 — Requirements and planning [x]
- [x] Review project requirements and existing codebase (audit recorded in PROJECT_STATUS.md).
- [x] Define page content and site architecture (above).
- [x] Define user journeys (visitor → learn about workflow → services → appointment; visitor → contact/enquiry).
- [x] Define 3D workflow (see `3D_WORKFLOW_SPECIFICATION.md`).
- [x] Define design specifications (see `TECHNICAL_ARCHITECTURE.md` §2, design tokens in `src/styles/variables.css`).

### Phase 2 — UI/UX design [x]
- [x] Define shared components (Header/Footer/CTA buttons/cards).
- [x] Define responsive layouts — desktop ≥1024px, tablet, mobile ≤767px.
- [x] Define color and typography systems — design tokens.
- [x] Design 3D integration area — responsive Canvas, hero placement.
- [x] Define navigation and CTA behavior — Header/Footer, CTA flows.

### Phase 3 — React project architecture [x]
- [x] Inspect current Vite setup.
- [x] Preserve existing routing (`App.jsx` unchanged).
- [x] Organize components — `src/components/{layout,sections,forms,three/workflow,three/blood-kit,three/shared}`.
- [x] Organize pages — `src/pages/`.
- [x] Organize CSS — `src/styles/` (variables, global, layout, sections, pages, forms, workflow, components, responsive).
- [x] Organize data — `src/data/`.
- [x] Organize assets — `public/` (favicon.svg, OG images).
- [x] Verify build — `npm run build`.

### Phase 4 — Complete 3D modeling [x]
- [x] Patient arm, collection needle, needle holder, FillingTube, TubeCap, StorageRack, SampleLabel, BloodFlow, Lighting/Environment reuse.

### Phase 5 — 3D animation and interaction [x]
- [x] Blood collection animation, blood flow animation, progressive tube filling, tube removal, tube transfer, rack placement.
- [x] Play/Pause/Resume/Restart/Step, progress indicator, component selection, camera focus, responsive Canvas, WebGL fallback.
- [x] Reduced-motion support.

### Phase 6 — Home page [x]
- [x] Premium hero (3D canvas + content), company introduction, services overview, why choose, facilities preview, CTA.

### Phase 7 — About and Services pages [x]
- [x] About page: hero, laboratory introduction, mission/vision, values, quality commitment, laboratory approach.
- [x] Services page: hero, categories (placeholders), service cards (placeholders), sample collection info, enquiry CTA, contact section.

### Phase 8 — Facilities and Contact pages [x]
- [x] Facilities page: hero, environment, equipment presentation (illustrative), processing overview, quality/safety, gallery (illustrative).
- [x] Contact page: hero, contact info (placeholders), enquiry form (validated), appointment enquiry, map placeholder.

### Phase 9 — Animations and interactions [x]
- [x] Smooth scroll behavior + hover/card/button transitions.
- [x] Reduced-motion support (global + workflow).
- [x] Lazy-loaded 3D experience.
- [x] Workflow playback controls, selection, focus, speed.

### Phase 10 — SEO and accessibility [x]
- [x] Page titles, meta descriptions, canonical placeholders, OG tags, Twitter card, Organization JSON-LD.
- [x] Semantic HTML, heading hierarchy, alt text (no raster images used), keyboard navigation, accessible form labels/status, placeholders noted in copy.

### Phase 11 — Performance and QA [ ]
- [ ] Record browser test results in TESTING_REPORT.md (final pass — all recorded passing, see TESTING_REPORT.md §11).
- [ ] Final lint + build verification.
- [x] `npm run build` after every phase — PASS (see TESTING_REPORT.md).
- [x] Chrome headless per page: routes, navigation, 3D, workflow, forms, console — no critical errors (see TESTING_REPORT.md §11).
- [x] Optimize: lazy 3D chunk, code splitting, vector-only assets.

### Phase 12 — Deployment [ ]
- [ ] Final production build.
- [ ] Verify production routes (all five).
- [ ] Document Cloudflare Pages deploy + SPA fallback + rollback (`DEPLOYMENT_GUIDE.md`).
- [ ] Final delivery report.

---

**Build strategy:** every major phase ends with `npm run build` (Vite production build). Testing executed with Chrome headless (CDP scripts — see `TESTING_REPORT.md`).

**Known issues / notes:**
- Static `BloodKitCanvas` preserved in `src/components/three/blood-kit/` but not mounted — see PROJECT_STATUS.md Known issues (rolldown emission bug).
- Canonical URL placeholder: `https://hi-fi-diagnostic.example/` — replace with the real domain before launch.
- Business information placeholders: `src/data/businessInfo.js`.
- `THREE.Clock` deprecation warning (from Drei) — acceptable.
