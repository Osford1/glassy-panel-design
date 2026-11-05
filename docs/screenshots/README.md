# Screenshots

One of the three shots is captured and committed; two are still to be taken.
There is no placeholder art, and the README links only files that exist.

## Captured

`docs/img/glacier-dark-card-over-bloom.png` — the worked example as it opens:
Glacier, dark appearance, the first card sitting over the bloom. Captured from
`examples/index.html` in headless Edge at 1400 x 1000, full window rather than
the suggested crop.

## Still to take

They must be shot from `examples/index.html`, not from the private app the panel
was originally built for. The original session captures show another project's UI
and conversation content and are not publishable.

| Filename | What it must show | Suggested size |
| --- | --- | --- |
| ~~`glacier-dark-card-over-bloom.png`~~ | Captured 2026-11-06 — see above. | done |
| `sunstone-light-hairline.png` | Sunstone in the light appearance: two surfaces where the hairline, not the value, does the separating. | ~1200 px wide, PNG |
| `in-card-ramp.png` | A crop of one text-free column inside a card, top against bottom, with the sampled hex values labelled `#0d2527` → `#193437` → `#0b1417`. | ~600 px wide crop, PNG |

## Why these three

- The README claims a card reads as glass. The first two shots let a reader see
  that claim instead of taking it on faith.
- The ramp crop is the one claim a reader cannot check from the code: it is the
  measured proof that the surface is translucent rather than an opaque fill.

Two notes from the capture attempt, so the next one is quicker:

- The light appearances are hard to shoot headless. Glacier light and Sunstone
  light both came back as near-white pages: at 88 % paper over a light bloom
  there is almost nothing for a screenshot to catch, and the hairline is the
  whole subject. Take those two by hand and check the hairline survives the
  export.
- Headless Edge writes the PNG where you point `--screenshot`; a relative path
  fails with `Access is denied`. Use the full Windows path.

## Where they go

`docs/img/`. The two `TODO(owner)` comments in `README.md` are already replaced
for the captured shot.
