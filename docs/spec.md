# Glassy panel — reusable design metrics

Distilled from two working custom themes built for a browser-extension side
panel I built: **Sunstone** (warm) and **Glacier** (cool/dark). The point of this
file is not the panel — it is the *numbers and relationships*, so a similar UI
(translucent cards, floating chrome, one accent hue) can be rebuilt anywhere:
a Tauri/Electron app, a Flutter or React Native surface, a website.

Everything here was measured on rendered pixels or validated by script, not
eyeballed. The method and its limits are recorded in `docs/provenance.md`.

---

## 1. The shape of the system

Two appearances, one hue family each, seven semantic roles. Nothing is named by
value (`blue`, `grey-200`); everything is named by job, so the whole palette can
be re-hued by editing one hue and re-running the validator.

| Role | Job |
| --- | --- |
| `canvas` | the window behind everything |
| `paper` | the surface cards sit on / are made of |
| `input` | a field that must read as editable |
| `ink` | primary text |
| `muted` | secondary text |
| `line` | boundaries that must be *findable* (≥3:1) |
| `primary` = `accent` | the single accent: actions, focus, active state |
| `primaryDeep` | the shell/chrome, one step away from the canvas |
| `danger` / `onPrimary` / `onDanger` / `shellForeground` | fills and their paired text |

**Rule of one hue.** Both themes stay inside a ~25° hue family, with saturation
doing the work instead of hue jumps:

| | hue range across all roles | accent hue |
| --- | --- | --- |
| Sunstone | 26–37° (warm orange) | 26° light / 36° dark |
| Glacier | 187–201° (cyan–teal) | 187° light / 176° dark |

---

## 2. The lightness ladder (the portable part)

Themes were designed as a **CIE L\* ladder**, not as hex guesses. To build a new
palette: pick one hue, then place these values. This is the actual measured
structure of both themes.

| Role | Light appearance | Dark appearance |
| --- | --- | --- |
| `primaryDeep` (shell) | L\* **91.0–91.4** (just under canvas) | L\* **3.1–4.8** (just under canvas) |
| `canvas` | L\* **91.6–95.3** | L\* **5.9–8.1** |
| `paper` | L\* **99.2–99.4** (Δ to canvas **+3.9 to +7.8**) | L\* **11.5–12.7** (Δ to canvas **+4.6 to +5.6**) |
| `input` | = paper | L\* **14.4–15.9** (Δ to paper **+2.9**) |
| `ink` | L\* **12.9–13.6** | L\* **94.6–94.8** |
| `muted` | L\* **36.6–38.3** | L\* **70.1–71.7** |
| `line` | L\* **52.1–52.7** | L\* **49.8–49.9** |
| `accent` | L\* **40.4–41.8**, saturation **74–90 %** | L\* **72.0–73.8**, saturation **54–79 %** |

Three consequences worth keeping:

1. **Paper sits only 4–8 L\* above the canvas.** If you separate surfaces by
   value alone, you lose the glass (see §3). The border and the bloom do the
   separating.
2. **`line` is mid-grey in both appearances** (L\* ~50) — it is a boundary
   colour, tuned to clear 3:1 against both canvas and paper, not a text colour.
3. **`muted` is deliberately far from `ink`** (L\* 37 vs 13 light; 71 vs 95
   dark) — one clear secondary tier, not five.

### Measured contrast, both themes

All 16 pairs per appearance, run through the validator; every value below is
output, not estimate. This table shows the 12 pairs the spec documents; the full
16-pair run for both palettes is in `docs/validator-output.md`.

| Pair | Sunstone L / D | Glacier L / D | Minimum |
| --- | --- | --- | --- |
| ink on canvas | 12.74 / 15.61 | 14.25 / 16.22 | 4.5 |
| ink on paper | 15.53 / 14.13 | 15.74 / 14.47 | 4.5 |
| ink on input | 15.53 / 13.02 | 15.74 / 13.48 | 4.5 |
| muted on canvas | 5.57 / 7.77 | 6.50 / 8.53 | 4.5 |
| muted on paper | 6.79 / 7.03 | 7.17 / 7.61 | 4.5 |
| accent on canvas | 4.88 / 8.26 | 5.66 / 9.09 | 4.5 |
| accent on paper | 5.95 / 7.47 | 6.24 / 8.11 | 4.5 |
| onAccent on accent | 6.04 / 8.22 | 6.37 / 8.85 | 4.5 |
| danger on canvas | 5.29 / 6.98 | 5.80 / 6.70 | 4.5 |
| shellForeground on primaryDeep | 12.52 / 16.64 | 12.91 / 17.15 | 4.5 |
| line on canvas | 3.37 / 3.94 | 3.61 / 4.12 | 3.0 (boundaries) |
| line on paper | 4.10 / 3.56 | 3.99 / 3.68 | 3.0 (boundaries) |

The tightest number in the whole system is **Sunstone light `line on canvas`
3.37:1** — that is the one to re-check first if you re-hue it.

**Iteration that proved the ladder matters:** deepening Sunstone's light canvas
to separate cards from the window pushed `accent on canvas` to **4.42:1** — under
AA. The fix was not to revert the canvas but to darken the accent from `#a9500b`
to `#a04a08` (4.88:1). Budget for that trade: *in a light appearance, a darker
canvas and a light accent fight each other.*

---

## 3. The material recipe (translucency that actually reads)

Glass fails in one specific way: **a blur over a flat fill is just a flat fill.**
The first attempt measured only ~1.6 luminance steps of variation across a card
and was judged "transparency implied rather than demonstrated". Two things fixed
it, and both are required:

**(a) A bloom behind the content** — three radial gradients built from the
theme's own accent/primary, anchored to the shell (not to the scroll container),
so content drifts over a fixed gradient:

```css
.shell::before {
  background:
    radial-gradient(125% 60% at 15%  0%,   accent 40%, transparent 74%),
    radial-gradient( 95% 50% at 100% 100%, primary 26%, transparent 72%),
    radial-gradient( 75% 38% at 82%  45%,  accent 14%, transparent 76%);
}
/* light appearance: 16 % / 10 % — a strong tint under white reads as staining */
```

**(b) Enough see-through in the surface.** Surfaces at 46 % paper measured a
~1.6-step ramp; at **36 %** the same span ramps ~2.3 steps with a visible hue
shift, and ink still measures **13.97:1** on the lightest composite.

Measured on the rendered pixels (text-free column inside a card):

| Variant | Card surface, top → bottom | Ink on lightest composite |
| --- | --- | --- |
| 46 % paper, weaker bloom | `#0d2123` → `#0c1519` | 14.6:1 |
| **36 % paper, stronger bloom** | `#0d2527` → `#193437` → `#0b1417` | **14.0:1** |

### Surface table

| Element | Fill | Blur | Radius | Edge |
| --- | --- | --- | --- | --- |
| Cards (messages, panels) | paper **36 %** | `blur(24px) saturate(150%)` | **18 px** | `1px color-mix(paper 50%, line)` |
| Chips, pills, table wrap, code | paper **45 %** | `blur(12px) saturate(120%)` | **14 px** | `1px color-mix(paper 55%, line)` |
| Code block | paper **40 %** | — | **12 px** | — |
| Composer / search field | paper **44 %** | `blur(20px) saturate(130%)` | **20 px** | same as chips |
| Bars (header, dock) | panel **72 %** | `blur(22px) saturate(130%)` | — | **none** |
| Overlays (menus, dialogs) | menu **76 %** | `blur(24px) saturate(130%)` | **18 px** | `1px color-mix(paper 55%, line)` |
| User's own turn | accent **20 %** over paper **44 %** | inherits card | 18 px | `1px accent 42 %` |

Shadows — two ingredients, on every glass card:

```css
box-shadow:
  inset 0 1px 0 color-mix(in srgb, var(--paper) 80%, transparent),  /* light catching the top edge */
  0 10px 30px color-mix(in srgb, var(--primaryDeep) 34%, transparent); /* depth, not a drop shadow */
```

Focus ring — one accent ring, never a second outline:

```css
:focus-visible { border-color: accent; box-shadow: 0 0 0 3px color-mix(in srgb, accent 26%, transparent); }
```

### Light and dark are not mirror images

| | cards | rationale |
| --- | --- | --- |
| Dark | paper **36 %** | plenty of value range; the bloom reads through |
| Light | paper **88 %** | at 78 % the bloom read as *staining* the white; at 88 % cards stay crisp and the glass shows only at the edges |

Light also needs a **harder edge and deeper shadow** (border `line 70 %`, shadow
`0 10px 30px line 22 %`) because a light translucent card over a light canvas
separates by its hairline, not by value. The 88 % is the floor for cards; a wider
implementation band across surfaces runs 88–94 %.

### Accessibility fallbacks (glass must have an answer)

| Signal | Answer |
| --- | --- |
| `prefers-reduced-transparency: reduce` | `backdrop-filter: none`, surfaces → solid `paper` |
| `prefers-contrast: more` | glass → solid surface, bloom and texture layers `display: none` |
| `prefers-reduced-motion: reduce` | transitions off (feedback stays, motion goes) |

---

## 4. Type metrics

One reading size, one micro tier, size-specific tracking (large text tightens,
small text loosens).

| Role | Size | Leading | Tracking |
| --- | --- | --- | --- |
| Body / reply text | **14 px** (clamp 12–28 px, scales with the reader's text-size setting) | **1.6** | **0** |
| h1 / h2 / h3 / h4 / h5 | 21 / 18.5 / 16.5 / 15 / 14 px | **1.18** | **−0.01em** |
| Micro tier (labels, chips, status) | floor **11 px** | **1.45** | **+0.07em** |
| Code block | 12.5 px | 1.55 | — |
| Table cells | 13 px | 1.45 | — |
| Tabular / eyebrow | 12 px | 1.3–1.35 | +0.04–0.05em |

Derived rules, not opinions:

- Headings are **larger than body text**, weight **400**, tracked **negative** —
  the old scheme (24 px at 0.95 leading) read as shouting in a narrow panel.
- **11 px is a hard floor** for anything the user must read; the whole micro
  tier routes through one variable so a text-size change moves it everywhere.
- **Vertical rhythm scales with type**: paragraph gap `0.95em` (a fixed 0.78em
  at 12 px read tighter once the body grew to 14 px).
- Secondary text on a translucent surface needs a *calibrated* tone, not the
  theme's mid grey: `ink` at **0.88** alpha clears 6.9:1 dark, **0.82** clears
  4.7:1 light (the worst light theme needs 0.78 for AA). Boundaries take ink at
  **0.6** — the lowest alpha that clears 3:1 everywhere.

---

## 5. Rhythm & space

| Where | Value |
| --- | --- |
| Between turns | **18 px** |
| Scroll area padding | **14 px 12 px 16 px**, row gap 14 px |
| Card inner padding (prose) | 11–12 px vertical |
| Radius ladder | **12 px** nested (code) → **14 px** small controls → **18 px** cards & overlays → **20 px** the one input |
| Narrow panel (≤360 px) | padding 10 px 8 px 12 px; action rows wrap |

Radius rule: **nesting goes outside-in** — the container is rounder than what it
holds. Cards 18 px holding 14 px chips holding 12 px code never look like one
blob.

---

## 6. Making a new theme from this recipe

1. Pick a hue `H` (one family, ≤25° of spread) and an appearance to start from.
2. Place the ladder from §2: canvas, paper (+4–8 L\*), input, ink, muted (~L\* 37
   light / 71 dark), line (~L\* 50), accent (L\* 40 light / 73 dark, high
   saturation), primaryDeep (just past the canvas).
3. Check the seven pairs in §2 — **text ≥4.5:1, boundaries ≥3:1**. If the accent
   fails against the canvas, darken the accent; if the canvas is too light to
   see the cards, deepen the canvas *and* darken the accent together.
4. Apply the material table from §3 unchanged. It is appearance-aware, not
   hue-aware — that is the point.
5. Verify on rendered pixels, not in the editor (§7).

---

## 7. Verification method (reusable)

Three cheap checks that caught every real defect in this work:

1. **Palette validator** — `tools/theme-contrast-check.mjs` (standalone: no
   imports, runs anywhere Node runs). It checks the 14 required roles, exact
   lowercase `#rrggbb`, the schema version, all 16 contrast pairs per appearance
   against the contract above, and prints the CIE L\* / HSL ladder with the
   paper−canvas surface step so the numbers can be compared against §2:

   ```
   node tools/theme-contrast-check.mjs <theme.json>     # exit 0 = pass, 1 = fail
   ```

   Sanity-check it catches breakage rather than rubber-stamping: lighten the
   accent and weaken `line` in a copy and it reports the five pairs that fall
   over (`accent on canvas` 1.53:1, `line on canvas` 1.34:1, …).
2. **Render and measure, don't look** — capture the UI headless at 320 px and
   420 px, then sample pixels: take a text-free column inside a card and compare
   the top against the bottom. A flat result means your "glass" is an opaque
   fill, whatever the CSS says. The same screenshot pass proves **0 px
   horizontal overflow** at the narrow width.
3. **Loaded-artifact e2e** — screenshot the real product, then assert on it. The
   harness that caught the interesting bugs loaded the actual built UI rather
   than a stub page.

---

## 8. Pitfalls that cost iterations

- **Blur without a gradient behind it is invisible.** Build the bloom first.
- **46 % surface alpha is not enough to read as glass** on a dark canvas; 36 %
  is, and it still holds 14:1 for text. On *light* canvases the opposite holds:
  88 %, or the bloom looks like a stain.
- **A parallel design system will ignore your tokens somewhere.** Two controls
  painted a hard-coded brand blue regardless of theme and clashed with every warm
  palette — fixed by pointing them at the accent tokens. Sweep for hard-coded
  colours whenever you claim a theme is fully themed.
- **Screenshot harnesses and Windows paths:** a `:` in a generated filename
  silently creates an NTFS alternate data stream and the file "vanishes".
  Sanitise `[:\/*?"<>|]`.
- **Text size settings must reach every tier.** A zoom variable that only
  touched 22 of 927 rules produced 8 px labels that never grew.
- **A light translucent card needs its own edge treatment.** Reusing the dark
  recipe gives cards that merge with the canvas; the hairline is load-bearing.
- **Verify against the build you shipped.** Every CSS change invalidates the
  previous e2e pass — re-run it on the final artifact.

---

*Metrics provenance: a private Chromium side panel at 320/420 px, measured in
Edge/Chrome with the panel's own renderer. Palette maths in CIE L\*; contrast by
WCAG 2.1 relative luminance; glass verified by pixel sampling with Pillow. See
`docs/provenance.md`.*

---

## Files in this repo

| File | Use |
| --- | --- |
| `docs/spec.md` | this spec |
| `tools/theme-contrast-check.mjs` | standalone validator: roles, hex, schema, all 16 contrast pairs, plus the L\* / HSL ladder. `node tools/theme-contrast-check.mjs <theme.json>`, exit 0 = pass |
| `palettes/sunstone.json` | reference palette, warm (terracotta + warm graphite) |
| `palettes/glacier.json` | reference palette, cool (teal + cool slate), darker |

A portable version of the material table is in `examples/glass.css`.
