# violetnote-ang — Zoneless Migration

Progress log so work can resume after a pause. Last updated: 2026-06-22.

## The idea / goal

Make `violetnote-ang` run **without Zone.js** (zoneless change detection). Angular 21.2,
standalone bootstrap, Angular Material 21, 18 components.

The app was already ~80% zoneless-ready: state flows mostly through the **async pipe** and
**signals**, both of which trigger change detection without Zone.js. There is no
`NgZone`/`runOutsideAngular`/`ApplicationRef.tick` usage. The work is concentrated in a few
imperative escape hatches (`setTimeout`, manual `subscribe` writing plain properties) that
Zone.js used to cover for free.

## Status: core migration DONE and verified

- **`npm run build`** passes (no Zone.js in bundle).
- **`ng test`** → **40/40 specs pass** (ChromeHeadless).

The app is zoneless. What remains (below) is hardening + a manual smoke test — none of it
blocks the app from running zoneless.

## What was done

### 1. Config switch
- `src/app/app.config.ts` — `provideZoneChangeDetection({ eventCoalescing: true })`
  → `provideZonelessChangeDetection()` (import updated).
- `angular.json` — removed `"zone.js"` from build `polyfills`; removed `"zone.js"` +
  `"zone.js/testing"` from the `test` target polyfills.
- `package.json` — removed the `zone.js` dependency.

### 2. Signal conversions (the certain breakages — plain props mutated from non-CD contexts)
- `home-page.ts` — `configurationRequired` and `errorObject` → signals (`.set()` in the
  `queryParams` callback / rxjs `catchError`); template uses `configurationRequired()` /
  `!errorObject()`.
- `password.ts` — `submitted` and `errorObject` → signals; template
  `@else if (!errorObject() && submitted())`.
- `pass-data-file-name.ts` — `submitted` and `errorObject` → signals; template `[disabled]`
  and loader condition updated.

### 3. Spec updates (so `ng test` passes zoneless)
- Added `provideZonelessChangeDetection()` to all **16 component specs** (the ones that create
  fixtures). Service/util specs only `TestBed.inject(...)` (no CD) → left untouched.
- Fixed **6 pre-existing failing specs** (NOT caused by zoneless — they were masked because the
  test build never compiled before, due to a broken import):
  - `progress-spinner-overlay.component.spec.ts` — imported non-existent `../layout.module` and
    used NgModule `declarations` for a standalone component → switched to `imports: [Component]`.
  - `confirmation-dialog-form.spec.ts` — provided stub `MAT_DIALOG_DATA`.
  - `pass-data-category-edit-form.spec.ts` — added `MatDialogRef`, `MAT_DIALOG_DATA`,
    `provideHttpClient(Testing)`.
  - `pass-data-note-edit-form.spec.ts` — same; `MAT_DIALOG_DATA: null` (the "add new" path).
  - `pass-data-note-view-form.spec.ts` — added `MatDialogRef` + `MAT_DIALOG_DATA` stubs.
  - `home-page.spec.ts` — added `provideRouter([])` + `provideHttpClient(Testing)`.
  - `app.spec.ts` — replaced stale `'Hello, violetnote-mat-ang'` h1 assertion with
    `app-header` + `router-outlet` presence checks; added zoneless + router providers.

### 4. (Tier 1 #1) Reworked `pass-data-note-list.ts`
- `dataSource` is now a **pure** `computed(() => new MatTableDataSource(this.selectedNotes()))`
  — all paginator/sort side effects removed from the computed.
- `@ViewChild` → signal **`viewChild`** queries (`paginator`, `sort`,
  `confirmationContentTemplate`). The `<mat-paginator>` lives inside
  `@if(passDataModeReadOnly())`, so the `paginator` signal flips defined/undefined as mode
  toggles, driving the effect.
- The two `setTimeout(…, 0)` blocks **and** `ngAfterViewInit` replaced by a **single reactive
  `effect`** that attaches/detaches paginator & sort. Preserved `sort.sortChange.emit()` on
  entering edit mode (the data-source instance is shared across mode toggles, so the emit is
  what forces natural order back).
- Removed dead `previousNotesCount` field and the `AfterViewInit` interface/import.
- `onDeleteClick` now reads `this.confirmationContentTemplate()`.

### 5. (Tier 1 #2) Null-guarded validators in `pass-data-note-edit-form.ts`
- `minLengthTrimmedValidator` (was line ~73) and `existingUserValidator` (was line ~88):
  `control.value.trim()` → `control.value?.trim() ?? ''`. Fixes a latent `undefined.trim()`
  crash (this is what failed the note-edit-form spec until the mock was set to `null`).

### 6. (Tier 3 #5) `home-page.ts` subscription leak
- `queryParams` subscription in `ngOnInit` now uses
  `.pipe(takeUntilDestroyed(this.destroyRef))`. Injected `DestroyRef` (the zero-arg
  `takeUntilDestroyed()` can't be used in `ngOnInit` — not an injection context).
  `ngOnDestroy` stays for `messageService.dismiss()`.

## What remains to do

### Tier 2 — Verify at runtime (NOT yet done; the real proof for #1)
Unit tests only assert components *create*. Manually smoke-test the running zoneless app:
- **`pass-data-note-list`**: toggle read-only ↔ edit mode, page through notes, sort columns,
  then switch to edit and confirm natural order returns + drag-drop reorder works. (This is the
  one rework I'm least certain about.)
- `search-input.ts:60,90` — navigate + `.focus()` setTimeouts.
- `password.ts:86` — auto-login path (loader should show; `submitted` is now a signal).
- `pass-data-note-view-form.ts:59` — auto-close via `dialogRef.close()`.

### Tier 3 — Recommended hardening (optional, not required for correctness)
- **#4 `ChangeDetectionStrategy.OnPush` on all components** — only `progress-spinner-overlay`
  has it today. Makes CD explicit; surfaces accidental reliance on default CD.
- **#6 Replace remaining `setTimeout(…, 0)` with `afterNextRender`** — `search-input.ts:60,90`,
  `password.ts:86`, `pass-data-note-view-form.ts:59`. (`tooltip-utils.ts:9` is pure Material DOM
  — leave it.)
- **#7 (architectural, optional)** — migrate `BehaviorSubject` service state to signals
  (`pass-data-service.ts`, `pass-data-search-service.ts`) and move components off the async pipe.
  Aligns with the `rainments-ang` signal/zoneless direction.

### Not worth doing
- Dead code already partially removed; the `searchValueSublect` typo (Subject) across the search
  service/components is cosmetic — rename only if touching those files anyway.

## Useful info for resuming

### Running build/tests in this PowerShell environment
`npm`/`ng` need a prelude every call (npm.cmd is GPO-blocked, npm.ps1 unsigned):
```
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
Set-Location C:\Users\r1525\prj\violetnote-ang
if (Test-Path .\env.ps1) { .\env.ps1 | Out-Null } else { $env:PATH = "C:\Users\r1525\AppData\Local\Programs\node;$env:PATH" }
npm run build
npx ng test --watch=false --browsers=ChromeHeadless
```
(`env.ps1` may not exist in this project — the `else` branch prepends the node dir to PATH.)

### Key facts / gotchas learned
- Angular 21.2 — `provideZonelessChangeDetection()` is the **stable** API (not the old
  `provideExperimentalZonelessChangeDetection`).
- The whole `ng test` build compiles all specs together (esbuild) — one broken spec fails the
  entire run. The `../layout.module` import was the original blocker.
- `MatTableDataSource` instance is shared across mode toggles (the `dataSource` computed depends
  only on `selectedNotes()`, not on mode) — that's why `sort.sortChange.emit()` is needed to
  reset to natural order in edit mode.
- Reading `viewChild` signals inside an `effect` re-runs the effect when the query resolves —
  this is what removes the need for `ngAfterViewInit`/`setTimeout` timing hacks under zoneless.
- Note-edit-form spec uses `MAT_DIALOG_DATA: null` deliberately (the "add new note" case);
  passing `{}` triggers the `patchValue` path that set controls to `undefined`.
