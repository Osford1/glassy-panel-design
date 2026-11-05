# Owner TODOs

Open decisions and assets that need Chen Bin's input. Each line says what is
needed, why, and where it lands.

- **Two screenshots to take by hand.** `docs/img/glacier-dark-card-over-bloom.png`
  is committed and the two `TODO(owner)` comments in `README.md` are gone. Still
  outstanding: Sunstone light (the hairline doing the separating) and the in-card
  ramp crop with the sampled hexes. Both are hard to shoot headless — the light
  appearances came back nearly white at 88 % paper — so take them from a real
  window. Where: `docs/screenshots/README.md`.
- **Naming the origin app.** Decide whether naming **Hermes** as the origin is
  acceptable, or whether the repo keeps saying "a browser-extension side panel I
  built". This repo currently takes the neutral route in `docs/provenance.md` and
  `docs/spec.md`; if you approve the name, both files change. (Your
  `hermes-desktop-plugins` repo going public is why it came up.)
- **Copyright line.** Confirm the exact legal name and year for `LICENSE`, which
  currently reads `Copyright (c) 2026 Chen Bin`. It is legal text, so the name
  form was not guessed.
- **Version disclosure.** Confirm that publishing "v0.3.1, 320/420 px, measured
  in Edge/Chrome" is acceptable. It reveals a version number and form factor of a
  private build. `docs/provenance.md` and `docs/spec.md` state it today.
- **GitHub Pages.** Decide whether to enable Pages for `examples/index.html` so
  the demo has a live URL. Needs your repo settings, no code change.
- **Type metrics placement.** Confirm the type metrics in `docs/spec.md` §4
  belong in this repo rather than a separate typography repo. I recommend keeping
  them: the 11 px floor and the alpha-calibrated secondary tier are load-bearing
  for contrast over glass.
- **Skill citation.** The spec was originally packaged as a Hermes skill. Decide
  whether to credit that skill by name in the README `## Credits` section. This
  repo currently credits only the public standards (WCAG 2.1, CIE L\*) and the
  measurement tools, because the skill wrapper is not published here.

## Resolved in this pass — no action

- The validator run is real: `docs/validator-output.md` holds the verbatim
  stdout of `tools/theme-contrast-check.mjs` for both palettes, run from the repo
  root. The README's numbers are taken from that run.
