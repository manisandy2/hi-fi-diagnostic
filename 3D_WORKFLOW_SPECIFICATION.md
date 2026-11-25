# Hi-Fi Diagnostic — 3D Blood Collection Workflow Specification

> The workflow module is an **educational animation** of the blood sample collection process. It is a simplified, visually coherent illustration. No real-world needle insertion instructions or procedural medical guidance is provided.

## 1. Scene summary

A single connected, animated scene at one collection site. Dimensions are illustrative (prototype units; Three.js default). Materials: shared `Lighting`/`Environment` (existing) + new workflow materials.

**Scene layout:**
- **Table top** at `y = 0.05`.
- **Patient arm** along +X: humerus, forearm, hand (see §2).
- **Collection site** at `S = (0.22, 0.16, 0)` — the arm surface where the collection system is positioned.
- **Needle** vertical, tip at `S`; hub at `(0.22, 1.35, 0)`.
- **Vacutainer-style system**: transparent FillingTube (tip at `S`, rising to `y ≈ 1.95`); TubeCap annulus at the tube top (`y ∈ [1.95, 2.3]`); the needle passes through the cap's hole.
- **Needle holder** — table-mounted clamp bracket holding the needle mid-height (post + 2 arms).
- **Storage rack** at `x ≈ 2.3`: frame + 8 vertical posts with gaps as slots.

## 2. Components (new, in `src/components/three/workflow/`)

All workflow components consume `WorkflowContext` from `WorkflowController`. Each mesh gets `userData = { id: '<component-id>' }` and click/double-click handlers that call `selectComponent(id)` / `focusComponent(id)`.

### PatientArm.jsx
Static, realistic-style arm model:
- Humerus: cylinder `radius 0.09`, center `(-0.78, 0.06, 0)`, height `0.55` → spans `y ∈ [-1.04, -0.52]`.
- Forearm: cylinder `radius 0.09`, center `(-0.325, 0.09, 0)`, height `0.65` → spans `y ∈ [-0.62, 0.05]`.
- Hand: sphere `radius 0.11`, center `(0.25, 0.06, 0)`.
- Site point exposed via constant `SITE = new THREE.Vector3(0.22, 0.16, 0)`.

### CollectionNeedle.jsx
- Needle shaft: `cylinderGeometry(0.012, 0.012, 0.80, 64)`, center `(0.22, 1.085, 0)` → tip at `S`, top at `y = 1.2`.
- Hub: `cylinderGeometry(0.035, 0.035, 0.10)`, center `(0.22, 1.31, 0)` → spans `[1.26, 1.36]`.
- Tip cone: `coneGeometry(0.003, 0.01, 0.02)` at `(0.22, 0.16, 0)` rotated to point at `S` (tip face at `S`).
- Needs `position.y` animated during collection (see §5).

### NeedleHolder.jsx
Table-mounted clamp bracket near the site:
- Base: cylinder `radius 0.32`, center `(0.22, -0.55, 0)`, height `0.2`.
- Post: cylinder `radius 0.08`, center `(0.22, 0.30, 0)`, height `0.66` → spans `[-0.12, 0.54]`.
- Clamp arms (2): cylinders `radius 0.045`, centers `(0.18, 0.50, 0)` and `(0.26, 0.50, 0)`, height `0.35` → hold the needle between them.

### FillingTube.jsx (transparent)
- Body: `cylinderGeometry(0.19, 0.19, 1.9, 64)` (radius `0.19`, spans `y ∈ [0.05, 2.0]`), center `(0.22, 1.025, 0)`.
- Bottom rounded tip: sphere `radius 0.19` at `(0.22, 0.05, 0)`.
- Transparent material (shared `meshPhysicalMaterial` style: `transmission ≈ 0.95`, `thickness 0.8`, `ior 1.45`, `clearcoat 1`, `opaque`).
- Blood level: inner red cylinder `radius 0.17`, `height = fillRatio × (2.0 − 0.05) + 0.01` centered at `(0.22, fillTop, 0)`; plus a red surface highlight ring.
- `position` animated during removal/transfer (see §5).

### TubeCap.jsx
- Annulus (ring) with central hole (fits the needle): outer `radius 0.21`, inner `radius 0.18`, `cylinderGeometry(0.215, 0.215, 0.35, 64)` at `(0.22, 2.125, 0)` → spans `[1.95, 2.3]`.

### BloodFlow.jsx (path + pulse, static geometry + animated pulse)
- **Flow path**: truncated cone (tube) `radiusTop 0.012 → radiusBottom 0.18`, center `(0.22, 0.33, 0)`, height `0.34` → spans `y ∈ [0.16, 0.50]`; rising into the tube interior toward the tube top region. Tinted `#b30000`–`#e03b00` subtle, low opacity, `roughness 0.9`.
- **Pulse**: sphere `radius 0.025` at the path top `(0.22, 1.9, 0)`, moves upward during collection (§5). Optionally a second pulse dot midway.

### StorageRack.jsx
Frame + 8 vertical posts (slots as gaps between posts):
- Back panel: `boxGeometry(4.0, 0.5, 0.4)` center `(2.3, 1.1, 0)`.
- Top rail: `boxGeometry(4.0, 0.12, 0.4)` center `(2.3, 2.0, 0)`.
- Base rail: `boxGeometry(4.0, 0.12, 0.4)` center `(2.3, 0.04, 0)`.
- Side posts: 8 × `cylinderGeometry(0.045, 1.9)` centers `x_i = 0.75 + i × 0.525` for `i = 0..7` (`x ∈ [0.75, 4.0]`), `y` center `0.15`.
- Slots: gaps between consecutive posts + beyond the last post (8 slots). Each slot exposes: `index`, `centerX`, `heightFrom` (`0.05`), and an `occupied` flag.
- Filled-tube occupancy highlight: subtle emissive glow on occupied slots (animate with `useFrame` via `sin(time)`; respects reduced motion).
- `placeTube(tube)`: returns `{ slotIndex, x }` of first free slot; (occupancy handled by controller/tube position logic — see §5).

### SampleLabel.jsx (`Html` label on the tube, fictional demonstration data only)
Rendered via `Html` (drei) — positioned at `(−0.08, 2.15, 0)` (in front of the tube cap), sized ~`0.42 × 0.16`. Label content (example):
```
SPECIMEN DEMO-202611-T1
Whole blood (illustrative)
Collected — demonstration only
```
Visible on the stored tube in the rack and during storage.

### WorkflowComponentInfo.jsx
Panel showing details of the selected workflow component, driven by `src/data/3d/workflowComponentsData.js` (new data file): patient-arm, collection-needle, needle-holder, blood-flow, filling-tube, tube-cap, storage-rack, sample-label, filled-tube. Style similar to existing `ComponentInfo` (`component-info` CSS class).

## 3. WorkflowController (timeline & state)

```js
// Timeline (durations in seconds; total ≈ 21 s)
STAGES = [
  { id: 'preparation',  duration: 2.0 },
  { id: 'blood-collection', duration: 4.0 },
  { id: 'tube-filling', duration: 4.5 },
  { id: 'tube-removal', duration: 2.5 },
  { id: 'tube-transfer',   duration: 3.0 },
  { id: 'storage',         duration: 3.0 },
  { id: 'completed',       duration: 2.0 }, // hold, then done
];
```

State (`WorkflowContext` value):
```
{
  stageIndex: number, elapsed: number, duration: number,   // current stage elapsed
  isPlaying: boolean, isPaused: boolean, stepMode: boolean,
  speed: 0.5 | 1 | 2,
  stageIds: string[], currentStageId,
  overallProgress: 0..1, stageProgress: 0..1,
  completedCount, status: 'playing' | 'paused' | 'stopped',
  actions: play, pause, resume, restart, stepForward,
           setSpeed, selectComponent, focusComponent,
           selectedComponent,
}
```

Timer: `setInterval` (~50 ms) calling `advance()` when `isPlaying`; advances `elapsed`; on stage end → `stageIndex + 1`, `elapsed = 0`; when `stageIndex >= stages.length` → `completed`, `isPlaying = false`, status "Completed". `restart()` → `stageIndex = 0, elapsed = 0, isPlaying = true`. `stepForward()` → `stageIndex + 1` (no-op at end).

**Respect reduced motion:** if `prefers-reduced-motion`, animations use instant transitions (`Math.min(t, 1)` easing disabled, gentle idle disabled).

## 4. Animations

All animations are context-driven, using `t = clamp(elapsed / duration, 0, 1)` of the current stage (plus per-stage easing helpers like `smoothstep`):

- `BloodFlowAnimation` (inside BloodFlow):
  - Collection stage (`blood-collection`): `pulseY = SITE.y + (1.9 − 0.16) × t_collection`; pulse sphere moves up along the flow path. Optionally draw a growing red "wavy" line on the path via animated mesh scales.
- `TubeFillAnimation` (inside FillingTube):
  - Filling stage: `fillRatio = t_filling` (`0 → 1`); blood height animates `0.01 → maxLevel` via mesh scale/geometry.
  - Removal stage: `fillRatio` stays `1`.
  - Transfer stage: tube moves (below).
- Needle movement (in CollectionNeedle, via controller context):
  - Collection stage: `needleTipY = 0.16 − 0.12 × t_collection` (needle penetrates the arm slightly).
  - Removal stage: `needleTipY = 0.16 + 0.08 × t_removal` (needle retracts back to hub height).
  - Other stages: tip at `0.16`.
- `TubeTransferAnimation` (FillingTube):
  - Transfer stage: `position = lerp(sitePos, slotPos, t_transfer)`; `y = 0.95`; minor rotation toward upright.
  - Storage stage: tube stays at slot.
- `StorageRack` occupancy highlight: subtle pulsing glow on occupied slots (respects reduced motion).

## 5. Controls & progress (`WorkflowControls.jsx`, `WorkflowProgress.jsx`)

- `WorkflowControls`: Play (when stopped), Pause, Resume (when paused), Restart, Step, Speed `<select>` (0.5×/1×/2×). Buttons accessible (`aria-label`, keyboard focus visible).
- `WorkflowProgress`: stage name (`Stage 1 — Blood collection`), stage progress bar (`%`), overall progress bar (`Stage 3/7`), completed stages count, and "Completed" status at the end. During storage, shows "Storage complete — tube stored in rack slot N" when storage stage completes.
- `WorkflowComponentInfo`: selected component details (§2), click/double-click on components to select; `Focus` button focuses camera on component via `OrbitControls.target` animation.

## 6. Camera & interactions (`BloodWorkflowCanvas.jsx`)

- `OrbitControls` (drei): rotate, zoom, pan. `minDistance 3, maxDistance 9`, `enableDamping`.
- `focusComponent(id)`: smooth camera move to component's world position (`OrbitControls.target`).
- Component selection: `onClick` → `selectComponent(id)`; `onDoubleClick` → `focusComponent(id)`.
- `canvasSize`: CSS `width: 100%`, aspect-ratio `16/9` (desktop), responsive height on tablet/mobile; R3F reads container size.
- `fallback`: `<Canvas fallback={<p className="webgl-fallback">3D rendering is not supported in this browser.</p>}>` — plus an accessible fallback message ("WebGL failure fallback" — shows the notice if WebGL cannot be created; verified with Chrome headless in testing).

## 7. Stage semantics (educational, not procedural)

- Stage 1 "Equipment preparation": arm, needle, holder, tube (not yet connected).
- Stage 2 "Blood collection": needle enters the site; educational pulse rises.
- Stage 3 "Tube filling": sample level increases inside the transparent tube; blood stays inside.
- Stage 4 "Tube removal": needle retracts; filled tube separates from the collection system and is held upright.
- Stage 5 "Transfer": tube moves toward the storage rack.
- Stage 6 "Storage": tube placed in an available rack slot; completed state; sample label visible (fictional demonstration data only).
- Do **not** show: real needle insertion instructions, gauge details beyond generic shapes, tube additive details, storage condition claims.

## 8. Medical accuracy notes (documented)

- Vacutainer-style connection: needle tip passes through the tube's top annulus into the tube; visually consistent ("needle → tube").
- No invented clinical details: tube "additives", volumes, storage conditions, and handling requirements are not shown. Confirm with the laboratory before presenting any as actual procedures.
- Labels and info text use fictional demonstration data only.
- Animation is educational; resets and holds are safe states.

## 9. Materials & colors

- Tube: `meshPhysicalMaterial` transmission style, color `#d9f3ff`.
- Blood: `#a51228` with soft highlight `#d94a5b`.
- Needle: `#073568`.
- Holder/rack/arm: `#0756A4`, white accents, `#EAF5FF`, `#31BCEB` — shared palette.
- Flow path: translucent red `#b30000`.
- Shared Lighting/Environment reused (from `src/components/three/shared`).

## 10. Files

- `src/data/3d/workflowComponentsData.js` — component info data (new).
- `src/components/three/workflow/` — 16 files as listed above (new).

All workflow components are consumed by `BloodWorkflowScene` + `BloodWorkflowCanvas` + `WorkflowController`; the static `BloodKitCanvas` remains untouched for the About page.
