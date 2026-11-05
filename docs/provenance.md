# Where the numbers came from

Measured on a Chromium side panel I built (v0.3.1 of a private build), at 320 px
and 420 px, captured headless via the Chrome DevTools Protocol and sampled with
Pillow.

The panel is private, so the runs behind the numbers below cannot be repeated by
a reader. What a reader can repeat is the *method*: the same validator, the same
contract, and the same pixel-sampling procedure over their own rendered UI.

- Full spec: [`docs/spec.md`](spec.md)
- Validator: [`tools/theme-contrast-check.mjs`](../tools/theme-contrast-check.mjs)
  (`node tools/theme-contrast-check.mjs <theme.json>`, exit 0 = pass)
- Palettes: [`palettes/sunstone.json`](../palettes/sunstone.json) (warm),
  [`palettes/glacier.json`](../palettes/glacier.json) (cool, darker)
- Portable material layer: [`examples/glass.css`](../examples/glass.css)

Hard numbers worth quoting without re-deriving:

| Measure | Value |
| --- | --- |
| Card surface ramp at 36 % paper over the bloom | `#0d2527` → `#193437` → `#0b1417` down one card |
| Same at 46 % paper (rejected as too subtle) | `#0d2123` → `#0c1519` |
| Ink on the lightest composite | 13.97:1 |
| Surface step paper−canvas | 4–8 L\* (3.9–7.8 across the two themes) |
| Tightest pair in either theme | Sunstone light `line on canvas` 3.37:1 |

## What is not reproducible here

- The panel's renderer and its CSS are private; the screenshots that produced the
  card ramps are not in this repo.
- The 13.97:1 figure is one pixel-sampled composite. The validator cannot
  reproduce it, because it reads opaque hex only — see the README section "What
  it does not check".
- The 320/420 px capture widths and the version number describe a private build.
  They are context, not a fixture.
