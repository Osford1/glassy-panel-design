#!/usr/bin/env node
// Standalone palette validator + lightness ladder for glassy-panel themes.
//
// Self-contained on purpose: no imports from any app. Runs anywhere Node runs.
// Companion to ../docs/spec.md.
//
//   node tools/theme-contrast-check.mjs <theme.json>
//
// Contract enforced (WCAG 2.1 relative luminance):
//   text pairs   >= 4.5:1   (AA)
//   boundary pairs >= 3.0:1  (non-text contrast)
// Exit code 0 = passes, 1 = any failure.
import { readFileSync } from 'node:fs';

const PALETTE_KEYS = [
  'canvas', 'paper', 'ink', 'muted', 'primary', 'primaryDeep', 'onPrimary',
  'accent', 'onAccent', 'line', 'input', 'danger', 'onDanger', 'shellForeground',
];
const TOP_LEVEL_KEYS = ['schemaVersion', 'name', 'description', 'colors', 'darkColors'];
const HEX_RE = /^#[0-9a-f]{6}$/;

const PAIRS = [
  ['ink', 'canvas', 4.5], ['ink', 'paper', 4.5], ['ink', 'input', 4.5],
  ['muted', 'canvas', 4.5], ['muted', 'paper', 4.5],
  ['onPrimary', 'primary', 4.5], ['onAccent', 'accent', 4.5], ['onDanger', 'danger', 4.5],
  ['shellForeground', 'primaryDeep', 4.5],
  ['line', 'canvas', 3], ['line', 'paper', 3],
  ['danger', 'canvas', 4.5], ['danger', 'paper', 4.5],
  ['accent', 'canvas', 4.5], ['accent', 'paper', 4.5], ['primary', 'paper', 4.5],
];

const hexToRgb = (hex) => {
  const s = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16));
};
const channel = (v) => {
  const x = v / 255;
  return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
};
const relativeLuminance = (hex) => {
  const [r, g, b] = hexToRgb(hex).map(channel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrastRatio = (a, b) => {
  const [hi, lo] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const lStar = (hex) => {
  const y = relativeLuminance(hex);
  return y > 0.008856 ? 116 * y ** (1 / 3) - 16 : 903.3 * y;
};
const hsl = (hex) => {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  const l = (max + min) / 2;
  if (d === 0) return { h: 0, s: 0, l: Math.round(l * 100) };
  const s = d / (1 - Math.abs(2 * l - 1));
  let h;
  if (max === r) h = 60 * (((g - b) / d) % 6);
  else if (max === g) h = 60 * ((b - r) / d + 2);
  else h = 60 * ((r - g) / d + 4);
  return { h: Math.round((h + 360) % 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

function checkSchema(doc) {
  const problems = [];
  const unknown = Object.keys(doc).filter((k) => ![...TOP_LEVEL_KEYS, 'derived', 'darkDerived'].includes(k));
  if (unknown.length) problems.push(`unknown top-level keys: ${unknown.join(', ')}`);
  if (doc.schemaVersion !== 1) problems.push(`schemaVersion must be 1, got ${JSON.stringify(doc.schemaVersion)}`);
  for (const key of ['name', 'description']) {
    if (typeof doc[key] !== 'string' || !doc[key].trim()) problems.push(`${key} must be a non-empty string`);
  }
  if (!doc.colors || typeof doc.colors !== 'object') problems.push('colors is required');
  for (const [label, palette] of [['colors', doc.colors], ['darkColors', doc.darkColors]]) {
    if (!palette) continue;
    for (const key of PALETTE_KEYS) {
      if (!(key in palette)) problems.push(`${label}.${key} is missing`);
      else if (!HEX_RE.test(palette[key])) problems.push(`${label}.${key} must be lowercase #rrggbb, got ${palette[key]}`);
    }
    for (const key of Object.keys(palette)) {
      if (!PALETTE_KEYS.includes(key)) problems.push(`${label}.${key} is not a known role`);
    }
  }
  return problems;
}

function reportPairs(label, palette, inkFails) {
  console.log(`\n=== contrast · ${label} ===`);
  for (const [fg, bg, minimum] of PAIRS) {
    const ratio = contrastRatio(palette[fg], palette[bg]);
    const pass = ratio + Number.EPSILON >= minimum;
    if (!pass) inkFails.push(`${label}: ${fg} on ${bg}`);
    console.log(`${pass ? 'ok  ' : 'FAIL'} ${`${fg} on ${bg}`.padEnd(26)} ${ratio.toFixed(2).padStart(7)}:1  (min ${minimum})`);
  }
}

function reportLadder(label, palette) {
  console.log(`\n=== lightness ladder · ${label} ===`);
  console.log('  role            hex        L*     h    s%    l%');
  for (const role of PALETTE_KEYS) {
    const hex = palette[role];
    if (!HEX_RE.test(hex)) continue;
    const { h, s, l } = hsl(hex);
    console.log(`  ${role.padEnd(15)} ${hex}  ${lStar(hex).toFixed(1).padStart(5)}  ${String(h).padStart(3)}  ${String(s).padStart(4)}  ${String(l).padStart(4)}`);
  }
  const canvasL = lStar(palette.canvas), paperL = lStar(palette.paper);
  console.log(`  -> surface step (paper - canvas) = ${(paperL - canvasL).toFixed(1)} L*  (design range: 4-8)`);
}

const path = process.argv[2];
if (!path) {
  console.error('usage: node tools/theme-contrast-check.mjs <theme.json>');
  process.exit(2);
}
const doc = JSON.parse(readFileSync(path, 'utf8'));
const problems = checkSchema(doc);
const fails = [];

reportPairs('light (colors)', doc.colors || {}, fails);
if (doc.darkColors) reportPairs('dark (darkColors)', doc.darkColors, fails);
reportLadder('light (colors)', doc.colors || {});
if (doc.darkColors) reportLadder('dark (darkColors)', doc.darkColors);

console.log('\n=== schema ===');
if (problems.length) problems.forEach((p) => console.log('  FAIL', p));
else console.log('  ok   all required roles present, exact lowercase #rrggbb, schemaVersion 1');

const passed = problems.length === 0 && fails.length === 0;
console.log(`\nRESULT: ${passed ? 'PASS — every contract pair within minimum' : `FAIL — ${problems.length} schema, ${fails.length} contrast`}`);
process.exitCode = passed ? 0 : 1;
