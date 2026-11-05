# Worked example

A portable build of the spec's material layer with no app tokens in it.

- `glass.css` — the material layer: the token block, the bloom, the card / chip /
  bar / overlay / input surfaces, the two-part shadow, the focus ring, and the
  three `prefers-*` fallbacks. Copy it and define the eight `--gp-*` colours for
  your own theme.
- `index.html` — a single page that uses `glass.css`: a shell with the bloom,
  three cards, chips, a code block, an input and an overlay, with a palette and
  an appearance toggle. No build step, no dependencies.

## Open it

Open `examples/index.html` in a browser. There is no build and no server — the
page reads the palette hexes as inline CSS variables and `glass.css` does the
rest.

## The five steps it demonstrates

1. **Pick a hue and place the ladder** (`docs/spec.md` §2). `index.html` inlines
   the ladder for both palettes and both appearances as `--gp-*` variables.
2. **Run the validator** on the palette before you trust it:
   `node tools/theme-contrast-check.mjs <palette.json>`. Text pairs must clear
   4.5:1 and boundaries 3:1.
3. **Apply the material table unchanged** (§3). `glass.css` is that table: it is
   appearance-aware, not hue-aware.
4. **Answer every preference.** The three `prefers-*` blocks at the bottom of
   `glass.css` are the spec's fallbacks: reduced transparency and higher contrast
   go solid, reduced motion drops transitions.
5. **Re-measure on rendered pixels** after any change. Sample a text-free column
   inside a card; a flat result means the surface is an opaque fill.

## One caveat before you scale it

The spec's bloom radials (125 % / 95 % / 75 %) were tuned for a 320–420 px panel.
Above ~1000 px they wash out into a flat field, so `glass.css` carries a
desktop-scaled version: a `linear-gradient(157deg, …)` ramp plus rescaled
radials. Going back to a narrow panel, rescale the radials up again.
