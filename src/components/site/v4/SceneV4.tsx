"use client";

import { useEffect, useRef } from "react";
import styles from "./HomeV4.module.css";

/**
 * Persistent WebGL background — one particle cloud that morphs between
 * volumetric brand forms as the page scrolls:
 *
 *   sphere (ideja) → torus knot (craft) → galaxy (radovi) → obsidian crystal
 *   (usluge) → neural mesh (AI) → digital ocean (proces/metrike) → "A" monogram
 *
 * All particle motion lives in the vertex shader: the CPU only uploads the
 * two active shape targets when the scroll segment changes and drives a
 * handful of uniforms per frame. Transitions swirl through a simplex-noise
 * flow field with per-particle stagger — the cloud tears apart and re-knits
 * instead of flying in straight lines.
 */

type ShapeDef = {
  /** styles.* class of the section this shape belongs to (stop measured from DOM) */
  section: string;
  /** index into the generated shape-target list */
  gen: number;
  camZ: number;
  /** camera orbit angle (rad) around the sculpture — scroll swings the view */
  camA: number;
  /** camera height on the orbit — crane up/down between sections */
  camY: number;
  x: number;
  /** how much continuous rotation this shape gets (flat shapes face camera) */
  rot: number;
  /** static X tilt — disc/surface shapes are viewed from slightly above */
  tilt: number;
  /** cloud opacity — recedes where real content (screenshots) is the star */
  alpha: number;
  /** 1 = this shape is the living wave surface (adds animated undulation) */
  wave: number;
  /** how deep the camera dives mid-transition OUT of this section —
   *  big values (≈5) fly the lens straight through the particle field */
  dive: number;
  /** scene background grade for this chapter — mood shifts per section */
  bg: [number, number, number];
  /** shard field for this chapter — the formation itself is authored in
   *  `buildShardForms` (indexed by `gen`); these two grade it per section:
   *  shardAlpha = opacity, drops where real content is the star
   *  shardSpread = formation scale, so a structure can crowd in or stand off */
  shardAlpha: number;
  shardSpread: number;
  color: [number, number, number];
  /** second palette tone — particles blend between the two by seed */
  color2: [number, number, number];
};

// gen: 0 idea-core · 1 blueprint · 2 devices · 3 service-hub · 4 neural ·
//      5 pipeline · 6 growth-chart · 7 "A" monogram
// PALETTE: black void · white structure · electric/accent-blue fill (no grey).
// Each particle shimmers between `color` (bright white/ice) and `color2`
// (cobalt signal → liquid silver), additively lit on a near-black background.
// Chapters shift how blue-dominant they are to tell the story; bloom makes the
// cold signal glow. Bg is deep ink-blue, never grey.
// color = BLUE body (dominant tone, keeps the cloud reading blue even where
// particles pile up additively); color2 = bright ice/white HIGHLIGHT end.
// White-dominant tones average to silver-grey under additive blending — so
// blue must be the base and white only the sparkle.
const SHAPES: ShapeDef[] = [
  { section: "hero", gen: 0, camZ: 8.5, camA: 0.0, camY: 0.0, x: 0.0, rot: 0.52, tilt: 0.08, alpha: 0.52, wave: 0, dive: 0.45, bg: [0.003, 0.005, 0.02], shardAlpha: 1.0, shardSpread: 1.0, color: [0.16, 0.36, 1.0], color2: [0.45, 0.63, 1.0] },
  { section: "manifesto", gen: 1, camZ: 8.8, camA: 0.42, camY: 0.34, x: 0.0, rot: 0.3, tilt: 0.14, alpha: 0.36, wave: 0, dive: 2.4, bg: [0.004, 0.006, 0.024], shardAlpha: 0.95, shardSpread: 1.02, color: [0.11, 0.26, 0.88], color2: [0.33, 0.52, 1.0] },
  { section: "projects", gen: 2, camZ: 8.6, camA: -0.38, camY: -0.22, x: 1.8, rot: 0.1, tilt: 0.06, alpha: 0.2, wave: 0, dive: 0.4, bg: [0.002, 0.004, 0.016], shardAlpha: 0.45, shardSpread: 1.12, color: [0.2, 0.42, 1.0], color2: [0.5, 0.67, 1.0] },
  { section: "services", gen: 3, camZ: 8.8, camA: 0.46, camY: 0.28, x: -2.1, rot: 0.14, tilt: 0, alpha: 0.18, wave: 0, dive: 2.6, bg: [0.004, 0.006, 0.022], shardAlpha: 0.62, shardSpread: 1.08, color: [0.09, 0.22, 0.8], color2: [0.28, 0.46, 1.0] },
  { section: "aiDemo", gen: 4, camZ: 8.7, camA: -0.42, camY: -0.22, x: 1.45, rot: 0.52, tilt: 0, alpha: 0.3, wave: 0, dive: 0.45, bg: [0.004, 0.006, 0.026], shardAlpha: 0.9, shardSpread: 1.0, color: [0.18, 0.4, 1.0], color2: [0.47, 0.64, 1.0] },
  { section: "process", gen: 5, camZ: 8.0, camA: 0.2, camY: 0.52, x: 0.0, rot: 0.05, tilt: 0.09, alpha: 0.38, wave: 0, dive: 0.45, bg: [0.004, 0.006, 0.024], shardAlpha: 0.85, shardSpread: 0.95, color: [0.2, 0.44, 1.0], color2: [0.5, 0.66, 1.0] },
  { section: "metrics", gen: 6, camZ: 8.6, camA: -0.24, camY: 0.32, x: 0.0, rot: 0.08, tilt: 0.12, alpha: 0.24, wave: 0, dive: 1.4, bg: [0.003, 0.005, 0.02], shardAlpha: 0.7, shardSpread: 1.0, color: [0.22, 0.45, 1.0], color2: [0.51, 0.67, 1.0] },
  { section: "cta", gen: 7, camZ: 7.5, camA: 0.0, camY: 0.0, x: 0.0, rot: 0.14, tilt: 0, alpha: 0.62, wave: 0, dive: 0.35, bg: [0.002, 0.003, 0.016], shardAlpha: 1.2, shardSpread: 1.0, color: [0.26, 0.5, 1.0], color2: [0.58, 0.74, 1.0] },
];

/** payload of the `v4:morph` event — the services index can take the cloud
 *  over: force a shape + palette while the visitor hovers an item */
export type MorphOverride = {
  gen: number;
  color: [number, number, number];
  color2: [number, number, number];
} | null;

/**
 * Measure where each shape's section actually sits in page scroll progress.
 * Accounts for ScrollTrigger pin spacers (measure the spacer, not the pinned
 * element). Falls back to an even spread if a section is missing.
 */
function measureStops(): number[] {
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  if (max <= 0) return SHAPES.map((_, i) => i / (SHAPES.length - 1));

  return SHAPES.map((shape, i) => {
    const el = document.querySelector<HTMLElement>(`.${styles[shape.section]}`);
    if (!el) return i / (SHAPES.length - 1);
    // pinned sections get wrapped in a .pin-spacer that owns the real height
    const box =
      el.parentElement && el.parentElement.classList.contains("pin-spacer")
        ? el.parentElement
        : el;
    const top = box.getBoundingClientRect().top + window.scrollY;
    const center = top + box.offsetHeight * 0.45 - window.innerHeight * 0.5;
    return Math.min(Math.max(center / max, 0), 1);
  }).map((v, i, arr) => (i === 0 ? 0 : i === arr.length - 1 ? 1 : v));
}

// deterministic rand so shapes are identical every load
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ─── Shape generators — each fills n*3 floats, all volumetric ───────────────
// The morph narrates the agency pipeline as the visitor scrolls:
//   idea-core → blueprint → device build → service hub → neural AI →
//   automation pipeline → growth chart → "A" brand
// Every form is abstract-legible: reads as premium particle art, but decodes
// into a chapter of "we turn your idea into a growing digital product".

/** HERO — the signal lens: a hollow iris wrapped by a continuous Möbius skin.
 * It reads as one authored kinetic sculpture, not the familiar atom/sphere
 * motif used by generic tech templates. */
function genIdeaCore(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  const rnd = mulberry32(101);
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < n; i++) {
    const layer = rnd();
    let x: number;
    let y: number;
    let z: number;

    if (layer < 0.22) {
      // Inner iris: a bright, hollow lenticular shell with a dark aperture.
      const v = 1 - rnd() * 2;
      const th = golden * i;
      const shell = 0.64 + Math.pow(rnd(), 2.2) * 0.34;
      const radial = Math.sqrt(Math.max(0, 1 - v * v)) * shell;
      x = Math.cos(th) * radial * 1.16;
      y = v * shell * 0.74;
      z = Math.sin(th) * radial * 0.34;
    } else if (layer < 0.84) {
      // One continuous Möbius skin: broad enough to read as a surface, with
      // an asymmetric three-lobed pulse that changes silhouette as it rotates.
      const a = rnd() * Math.PI * 2;
      const strip = (rnd() - 0.5) * 0.74;
      const pulse = 1.72 + Math.sin(a * 3 + 0.45) * 0.18;
      const edge = strip * Math.cos(a * 0.5);
      x = (pulse + edge) * Math.cos(a);
      y = (pulse + edge) * Math.sin(a) * 0.62;
      z = strip * Math.sin(a * 0.5) * 1.22 + Math.cos(a * 3) * 0.1;
    } else {
      // Sparse counter-orbit gives the lens scale without recreating an atom.
      const a = rnd() * Math.PI * 2;
      const r = 2.2 + Math.sin(a * 2) * 0.12;
      x = Math.cos(a) * r;
      y = Math.sin(a) * r * 0.4;
      z = Math.sin(a * 2) * 0.62 + (rnd() - 0.5) * 0.08;
    }

    // A slight diagonal posture makes the hero feel placed by an art director.
    const tilt = 0.24;
    const cy = Math.cos(tilt);
    const sy = Math.sin(tilt);
    out[i * 3] = x * cy + z * sy + (rnd() - 0.5) * 0.035;
    out[i * 3 + 1] = y + (rnd() - 0.5) * 0.035;
    out[i * 3 + 2] = -x * sy + z * cy + (rnd() - 0.5) * 0.035;
  }
  return out;
}

/** MANIFESTO — the blueprint: a 3D wireframe lattice, particles strung along
 *  the edges of a grid of cells. The plan / scaffold before the build. */
function genBlueprint(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  const rnd = mulberry32(202);
  const G = 3;
  const S = 2.0;
  const at = (x: number, y: number, z: number) => (x * (G + 1) + y) * (G + 1) + z;
  const nodes: number[][] = [];
  for (let xi = 0; xi <= G; xi++)
    for (let yi = 0; yi <= G; yi++)
      for (let zi = 0; zi <= G; zi++)
        nodes.push([(xi / G - 0.5) * 2 * S, (yi / G - 0.5) * 2 * S * 0.7, (zi / G - 0.5) * 2 * S * 0.5]);
  const edges: number[][] = [];
  for (let xi = 0; xi <= G; xi++)
    for (let yi = 0; yi <= G; yi++)
      for (let zi = 0; zi <= G; zi++) {
        if (xi < G) edges.push([at(xi, yi, zi), at(xi + 1, yi, zi)]);
        if (yi < G) edges.push([at(xi, yi, zi), at(xi, yi + 1, zi)]);
        if (zi < G) edges.push([at(xi, yi, zi), at(xi, yi, zi + 1)]);
      }
  for (let i = 0; i < n; i++) {
    const e = edges[Math.floor(rnd() * edges.length)];
    const a = nodes[e[0]];
    const b = nodes[e[1]];
    const t = rnd();
    out[i * 3] = a[0] + (b[0] - a[0]) * t + (rnd() - 0.5) * 0.03;
    out[i * 3 + 1] = a[1] + (b[1] - a[1]) * t + (rnd() - 0.5) * 0.03;
    out[i * 3 + 2] = a[2] + (b[2] - a[2]) * t + (rnd() - 0.5) * 0.03;
  }
  return out;
}

/** particle outline of a rounded screen frame + a few interior content bars */
function rectFrame(
  out: Float32Array,
  start: number,
  count: number,
  cx: number,
  cy: number,
  cz: number,
  w: number,
  h: number,
  rnd: () => number,
) {
  const peri = 2 * (w + h);
  for (let k = 0; k < count; k++) {
    const i = start + k;
    let x: number;
    let y: number;
    if (rnd() < 0.72) {
      // border walk
      const p = rnd() * peri;
      if (p < w) {
        x = -w / 2 + p;
        y = h / 2;
      } else if (p < w + h) {
        x = w / 2;
        y = h / 2 - (p - w);
      } else if (p < 2 * w + h) {
        x = w / 2 - (p - w - h);
        y = -h / 2;
      } else {
        x = -w / 2;
        y = -h / 2 + (p - 2 * w - h);
      }
    } else {
      // interior content lines (UI rows)
      const rows = 5;
      const row = Math.floor(rnd() * rows);
      y = h / 2 - 0.24 - (row * (h - 0.48)) / rows;
      x = -w / 2 + 0.16 + rnd() * (w - 0.32) * 0.92;
    }
    out[i * 3] = cx + x + (rnd() - 0.5) * 0.02;
    out[i * 3 + 1] = cy + y + (rnd() - 0.5) * 0.02;
    out[i * 3 + 2] = cz + (rnd() - 0.5) * 0.05;
  }
}

/** PROJECTS — the build: a desktop screen + a phone screen assembled from
 *  particles. Web + app work, the portfolio made literal-but-elegant. */
function genDevices(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  const rnd = mulberry32(303);
  const desk = Math.floor(n * 0.6);
  rectFrame(out, 0, desk, -0.6, 0.15, -0.2, 3.2, 2.0, rnd);
  rectFrame(out, desk, n - desk, 1.75, -0.3, 0.35, 1.0, 1.95, rnd);
  return out;
}

/** SERVICES — the toolkit: a central node with spokes radiating to satellite
 *  service-nodes on a ring. One team, every capability. */
function genServiceHub(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  const rnd = mulberry32(404);
  const SPOKES = 8;
  const R = 2.25;
  const tips: number[][] = [];
  for (let k = 0; k < SPOKES; k++) {
    const a = (k / SPOKES) * Math.PI * 2;
    tips.push([Math.cos(a) * R, Math.sin(a) * R * 0.82, (rnd() - 0.5) * 0.4]);
  }
  for (let i = 0; i < n; i++) {
    const r = rnd();
    if (r < 0.16) {
      // core hub cluster
      out[i * 3] = (rnd() - 0.5) * 0.5;
      out[i * 3 + 1] = (rnd() - 0.5) * 0.5;
      out[i * 3 + 2] = (rnd() - 0.5) * 0.5;
    } else if (r < 0.62) {
      // spoke line out to a tip
      const tp = tips[Math.floor(rnd() * SPOKES)];
      const t = rnd();
      out[i * 3] = tp[0] * t + (rnd() - 0.5) * 0.03;
      out[i * 3 + 1] = tp[1] * t + (rnd() - 0.5) * 0.03;
      out[i * 3 + 2] = tp[2] * t + (rnd() - 0.5) * 0.03;
    } else {
      // satellite node cluster
      const tp = tips[Math.floor(rnd() * SPOKES)];
      out[i * 3] = tp[0] + (rnd() - 0.5) * 0.28;
      out[i * 3 + 1] = tp[1] + (rnd() - 0.5) * 0.28;
      out[i * 3 + 2] = tp[2] + (rnd() - 0.5) * 0.28;
    }
  }
  return out;
}

/** node positions cached so the constellation-line layer can connect them */
let NEURAL_NODES: number[][] = [];

function genNeural(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  const rnd = mulberry32(505);
  const NODES = 18;
  const nodes: number[][] = [];
  for (let k = 0; k < NODES; k++) {
    const th = rnd() * Math.PI * 2;
    const ph = Math.acos(rnd() * 2 - 1);
    const r = 1.1 + rnd() * 1.15;
    nodes.push([
      Math.sin(ph) * Math.cos(th) * r,
      Math.sin(ph) * Math.sin(th) * r * 0.72,
      Math.cos(ph) * r,
    ]);
  }
  NEURAL_NODES = nodes;
  const nCluster = Math.floor(n * 0.45);
  for (let i = 0; i < nCluster; i++) {
    const nd = nodes[Math.floor(rnd() * NODES)];
    out[i * 3] = nd[0] + (rnd() - 0.5) * 0.22;
    out[i * 3 + 1] = nd[1] + (rnd() - 0.5) * 0.22;
    out[i * 3 + 2] = nd[2] + (rnd() - 0.5) * 0.22;
  }
  // synapse strands between random node pairs
  for (let i = nCluster; i < n; i++) {
    const a = nodes[Math.floor(rnd() * NODES)];
    const b = nodes[Math.floor(rnd() * NODES)];
    const t = rnd();
    out[i * 3] = a[0] + (b[0] - a[0]) * t + (rnd() - 0.5) * 0.03;
    out[i * 3 + 1] = a[1] + (b[1] - a[1]) * t + (rnd() - 0.5) * 0.03;
    out[i * 3 + 2] = a[2] + (b[2] - a[2]) * t + (rnd() - 0.5) * 0.03;
  }
  return out;
}

/** PROCESS — the automation pipeline: a horizontal chain of stage-nodes wired
 *  left→right, particles clustering at each stage and flowing along the wires.
 *  Reads as an n8n / workflow diagram — work that runs itself. */
function genPipeline(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  const rnd = mulberry32(707);
  const STAGES = 6;
  const span = 4.1;
  const nodes: number[][] = [];
  for (let k = 0; k < STAGES; k++) {
    const x = -span + (k / (STAGES - 1)) * 2 * span;
    const y = Math.sin(k * 1.3) * 0.55;
    nodes.push([x, y, (rnd() - 0.5) * 0.3]);
  }
  for (let i = 0; i < n; i++) {
    if (rnd() < 0.4) {
      // stage-node cluster
      const nd = nodes[Math.floor(rnd() * STAGES)];
      out[i * 3] = nd[0] + (rnd() - 0.5) * 0.32;
      out[i * 3 + 1] = nd[1] + (rnd() - 0.5) * 0.32;
      out[i * 3 + 2] = nd[2] + (rnd() - 0.5) * 0.32;
    } else {
      // connector wire between consecutive stages
      const k = Math.floor(rnd() * (STAGES - 1));
      const a = nodes[k];
      const b = nodes[k + 1];
      const t = rnd();
      out[i * 3] = a[0] + (b[0] - a[0]) * t + (rnd() - 0.5) * 0.04;
      out[i * 3 + 1] = a[1] + (b[1] - a[1]) * t + (rnd() - 0.5) * 0.04;
      out[i * 3 + 2] = a[2] + (b[2] - a[2]) * t + (rnd() - 0.5) * 0.04;
    }
  }
  return out;
}

/** METRICS — the growth: an ascending bar chart with a trend line climbing
 *  above the tops. Results, ROI, the numbers going up. */
function genGrowth(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  const rnd = mulberry32(808);
  const BARS = 7;
  const bw = 0.42;
  const gap = 0.26;
  const totalW = BARS * bw + (BARS - 1) * gap;
  const x0 = -totalW / 2 + bw / 2;
  const base = -1.7;
  const heights: number[] = [];
  for (let k = 0; k < BARS; k++) heights.push(0.6 + (k / (BARS - 1)) * 3.0 + (rnd() - 0.3) * 0.3);
  const barsN = Math.floor(n * 0.82);
  for (let i = 0; i < barsN; i++) {
    const k = Math.floor(rnd() * BARS);
    const bx = x0 + k * (bw + gap);
    out[i * 3] = bx + (rnd() - 0.5) * bw;
    out[i * 3 + 1] = base + rnd() * heights[k];
    out[i * 3 + 2] = (rnd() - 0.5) * 0.35;
  }
  // trend line riding just above the bar tops
  for (let i = barsN; i < n; i++) {
    const f = rnd() * (BARS - 1);
    const k = Math.floor(f);
    const frac = f - k;
    const bx = x0 + f * (bw + gap);
    const h = heights[k] + (heights[Math.min(k + 1, BARS - 1)] - heights[k]) * frac;
    out[i * 3] = bx + (rnd() - 0.5) * 0.05;
    out[i * 3 + 1] = base + h + 0.28 + (rnd() - 0.5) * 0.05;
    out[i * 3 + 2] = 0.25 + (rnd() - 0.5) * 0.05;
  }
  return out;
}

/** brand "A" with real depth — thick strokes extruded along Z */
function genMonogramA(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  const rnd = mulberry32(606);
  const strokes = [
    [-1.15, -1.75, 0, 1.75], // left leg
    [1.15, -1.75, 0, 1.75], // right leg
    [-0.58, -0.25, 0.58, -0.25], // crossbar
  ];
  const lens = strokes.map((s) => Math.hypot(s[2] - s[0], s[3] - s[1]));
  const total = lens.reduce((a, b) => a + b, 0);
  let i = 0;
  for (let s = 0; s < strokes.length; s++) {
    const [x1, y1, x2, y2] = strokes[s];
    const count = s === strokes.length - 1 ? n - i : Math.round((n * lens[s]) / total);
    for (let k = 0; k < count && i < n; k++, i++) {
      const t = rnd();
      out[i * 3] = x1 + (x2 - x1) * t + (rnd() - 0.5) * 0.16;
      out[i * 3 + 1] = y1 + (y2 - y1) * t + (rnd() - 0.5) * 0.16;
      out[i * 3 + 2] = (rnd() - 0.5) * 0.5;
    }
  }
  return out;
}

// ─── Shaders ─────────────────────────────────────────────────────────────────

// Ashima / Stefan Gustavson 3D simplex noise (MIT) — powers the morph swirl
const SNOISE = /* glsl */ `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }
`;

const CLOUD_VERT = /* glsl */ `
  attribute vec3 aTargetA;
  attribute vec3 aTargetB;
  attribute vec3 aTargetC;
  attribute vec3 aTargetD;
  attribute vec3 aScatter;
  attribute float aSize;
  attribute float aSeed;
  uniform float uTime;
  uniform float uScale;
  uniform float uMix;
  uniform float uOverride;
  uniform float uOvBlend;
  uniform float uIntro;
  uniform float uAgitation;
  uniform float uWarp;
  uniform float uAttract;
  uniform float uPointerVel;
  uniform float uArrival;
  uniform float uWaveA;
  uniform float uWaveB;
  uniform float uWaveC;
  uniform float uWaveD;
  uniform vec3 uPointer;
  uniform vec3 uShockPos;
  uniform float uShockT;
  varying float vSeed;
  varying float vGlow;
  varying float vDepth;
  varying float vSize;

  ${SNOISE}

  vec3 flow(vec3 p) {
    return vec3(
      snoise(p),
      snoise(p + vec3(31.4, 47.2, 12.9)),
      snoise(p + vec3(113.5, 71.3, 57.8))
    );
  }

  // gentle ease-out-back: particles overshoot the target ~3% and settle —
  // arrivals feel sprung, not machined
  float outBack(float x) {
    float u = x - 1.0;
    return 1.0 + 1.9 * u * u * u + 0.9 * u * u;
  }

  void main() {
    vSeed = aSeed;
    // per-particle stagger: each particle leaves and arrives on its own
    // schedule, so the cloud tears apart and re-knits instead of gliding
    float lead = fract(aSeed * 0.618);
    float d = clamp(uMix * 1.3 - lead * 0.3, 0.0, 1.0);
    // blend smoothstep with overshoot per particle (mix weight >1 is the point)
    float pm = mix(d * d * (3.0 - 2.0 * d), outBack(d), 0.55 + fract(aSeed * 5.3) * 0.35);
    float pmC = clamp(pm, 0.0, 1.0);

    vec3 pos = mix(aTargetA, aTargetB, pm);

    // hover override: two target slots ping-pong, so switching one service
    // to another crossfades shape-to-shape instead of snapping the buffer
    float dB = clamp(uOvBlend * 1.3 - lead * 0.3, 0.0, 1.0);
    float pB = dB * dB * (3.0 - 2.0 * dB);
    vec3 ovTarget = mix(aTargetC, aTargetD, pB);
    float dO = clamp(uOverride * 1.3 - lead * 0.3, 0.0, 1.0);
    float pO = mix(dO * dO * (3.0 - 2.0 * dO), outBack(dO), 0.5);
    float pOC = clamp(pO, 0.0, 1.0);
    pos = mix(pos, ovTarget, pO);

    // big-bang intro: everything starts crushed into a hot kernel and
    // blooms outward to the first shape when the preloader lifts
    float dI = clamp(uIntro * 1.5 - lead * 0.5, 0.0, 1.0);
    float pI = dI * dI * (3.0 - 2.0 * dI);
    pos = mix(aScatter * (0.25 + fract(aSeed * 7.13) * 0.4), pos, pI);

    // vortex morph: mid-flight the whole cloud corkscrews around its axis —
    // shapes tear apart in a spiral galaxy motion instead of drifting.
    // ovSwitch = crossfade between two hovered services, same drama
    float ovSwitch = pB * (1.0 - pB) * 4.0 * pOC;
    float midE = pmC * (1.0 - pmC) * 4.0 + pOC * (1.0 - pOC) * 4.0
      + pI * (1.0 - pI) * 4.0 + ovSwitch;
    float vAng = midE * (0.55 + fract(aSeed * 2.39) * 0.75);
    float vc = cos(vAng);
    float vs = sin(vAng);
    pos.xz = mat2(vc, -vs, vs, vc) * pos.xz;

    // living ocean undulation, blended in/out through the morph;
    // fast scrolling whips the surface into a storm
    float waveW = mix(mix(uWaveA, uWaveB, pmC), mix(uWaveC, uWaveD, pB), pOC)
      * (1.0 + uWarp * 0.9);
    pos.y += waveW * (
      sin(pos.x * 1.4 + uTime * 1.1) * 0.28 +
      sin(pos.z * 2.1 + uTime * 0.8) * 0.18 +
      sin((pos.x + pos.z) * 0.8 - uTime * 0.6) * 0.12
    );

    // puff peaks mid-transition; the noise field turns it into a swirl
    float puff = pmC * (1.0 - pmC) * 3.4 + pOC * (1.0 - pOC) * 3.4 + ovSwitch * 0.85
      + pI * (1.0 - pI) * 3.0 + uAgitation;
    vec3 fl = flow(pos * 0.42 + vec3(0.0, uTime * 0.1, uTime * 0.06));
    pos += (fl * 0.85 + aScatter * 0.4) * puff;

    // idle breathing so the cloud never freezes solid
    pos.x += sin(uTime * 1.1 + aSeed * 6.283) * 0.016;
    pos.y += cos(uTime * 0.9 + aSeed * 4.71) * 0.016;

    // cursor repulsion in world space — particles part around the pointer
    // and ignite; press-and-hold flips the force: the swarm gathers to the
    // hand, and letting go releases the shockwave burst
    // fast hand = wide, hot wake; slow hand = calm pocket — the field
    // answers the *energy* of the gesture, not just its position
    vec4 wp = modelMatrix * vec4(pos, 1.0);
    vec2 toP = wp.xy - uPointer.xy;
    float pd = length(toP);
    float rep = smoothstep(1.7 + uAttract * 1.4 + uPointerVel * 1.1, 0.0, pd);
    wp.xy += normalize(toP + vec2(0.0001)) * rep * rep * (0.6 + uPointerVel * 0.5 - uAttract * 1.6);

    // tap/click shockwave — an igniting ring races through the cloud
    float shock = 0.0;
    if (uShockT >= 0.0) {
      vec2 toS = wp.xy - uShockPos.xy;
      float sd = length(toS);
      float ring = uShockT * 5.5;
      float band = exp(-pow((sd - ring) * 2.0, 2.0));
      float decay = exp(-uShockT * 1.7);
      shock = band * decay;
      wp.xy += normalize(toS + vec2(0.0001)) * shock * 0.85;
    }

    // hyperspace warp — fast scroll smears the cloud toward the lens,
    // each particle by its own depth so the volume stretches, not slides
    wp.z += uWarp * (0.35 + fract(aSeed * 3.71)) * 1.7;

    // cinematic key-light band slowly panning across the sculpture —
    // particles it crosses catch fire for a beat (world space, so the
    // sweep stays level while the shape itself keeps turning)
    float sweepX = mod(uTime * 0.55, 9.0) - 4.5;
    float sweep = exp(-pow((wp.x - sweepX) * 1.1, 2.0));

    vGlow = puff + rep * 0.7 + shock * 1.3 + sweep * 0.55
      + rep * uAttract * 0.9
      + rep * uPointerVel * 0.5
      + uArrival * (0.25 + step(2.2, aSize) * 0.9)
      + uWarp * (0.25 + fract(aSeed * 3.71) * 0.5);
    vec4 mv = viewMatrix * wp;
    vDepth = -mv.z;
    vSize = aSize;
    float twinkle = 0.82 + 0.28 * sin(uTime * 1.6 + aSeed * 7.0);
    gl_PointSize = aSize * twinkle * uScale / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const CLOUD_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uColorB;
  uniform float uOpacity;
  uniform float uTime;
  varying float vSeed;
  varying float vGlow;
  varying float vDepth;
  varying float vSize;
  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;
    // tight falloff with a hot core — crisp point, not a fuzzy puff
    float glow = exp(-d * d * 19.0);
    float core = smoothstep(0.15, 0.0, d);
    // the few big hero particles get 4-point lens spikes — camera sparkle
    float spikes = (pow(max(0.0, 1.0 - abs(gl_PointCoord.x - 0.5) * 2.0), 12.0)
      + pow(max(0.0, 1.0 - abs(gl_PointCoord.y - 0.5) * 2.0), 12.0))
      * step(2.2, vSize);
    glow += spikes * 0.8;
    // two-tone palette — each particle drifts slowly between the pair,
    // so the cloud shimmers instead of sitting in a frozen gradient
    vec3 base = mix(uColor, uColorB,
      fract(vSeed * 0.618 + sin(uTime * 0.25 + vSeed * 6.0) * 0.07));
    // Core tint stays blue-dominant. Anything with matched R/G/B here is a
    // grey vote, and with thousands of additive sprites the greys win.
    vec3 col = base + vec3(0.1, 0.3, 0.72) * core + base * 0.2 * sin(vSeed);
    // particles in flight (or near the cursor) ignite — accent blue, not a
    // white tip. Bloom supplies the white on the hot cores by itself.
    col += vec3(0.24, 0.52, 1.0) * vGlow * 0.6;
    // fake depth-of-field: particles swirling right up to the lens dissolve
    // instead of turning into hard discs
    float nearFade = smoothstep(1.0, 2.6, vDepth);
    // atmospheric haze — the far side of the sculpture recedes into the void
    float farFade = 1.0 - smoothstep(10.5, 15.0, vDepth) * 0.5;
    // halo weighted DOWN vs the hot core: thousands of overlapping soft
    // halos additively clip to white — that was the grey fog ring around
    // dense shapes. Cores carry the sparkle, halos stay thin and blue.
    float a = (glow * 0.55 + core * 0.6) * uOpacity * (1.0 + vGlow * 0.35);
    gl_FragColor = vec4(col, a * nearFade * farFade);
  }
`;

// ─── Shard formations ────────────────────────────────────────────────────────
// The shard field gets its own scroll scene, separate from the particle cloud.
// Where the cloud morphs volumetric masses, these are *built structures* —
// rings, a lattice wall, a gate, a geodesic cage. Each shard is given a home
// AND the direction its long axis should point, so an arrived formation reads
// as assembled hardware instead of scattered debris.
//
//   0 hero      armillary rings      4 aiDemo   geodesic cage
//   1 manifesto lattice wall         5 process  double helix
//   2 projects  gate / portal        6 metrics  ascending columns
//   3 services  radial burst         7 cta      "A" monogram
//
// Shards sit at radius ~3–5, outside the particle cloud, so the two layers
// read as separate depths rather than one mush.

type ShardForm = { pos: Float32Array; dir: Float32Array };

/** deterministic shuffle — lets the three shard meshes each take a slice that
 *  is spread across the whole structure instead of owning one corner of it */
function shuffledIndices(n: number, seed: number): number[] {
  const out = Array.from({ length: n }, (_, i) => i);
  const rnd = mulberry32(seed);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const tmp = out[i];
    out[i] = out[j];
    out[j] = tmp;
  }
  return out;
}

function rotX(v: number[], a: number) {
  const c = Math.cos(a);
  const s = Math.sin(a);
  const y = v[1] * c - v[2] * s;
  v[2] = v[1] * s + v[2] * c;
  v[1] = y;
}

function rotY(v: number[], a: number) {
  const c = Math.cos(a);
  const s = Math.sin(a);
  const x = v[0] * c + v[2] * s;
  v[2] = -v[0] * s + v[2] * c;
  v[0] = x;
}

function emptyForm(n: number): ShardForm {
  return { pos: new Float32Array(n * 3), dir: new Float32Array(n * 3) };
}

/** write one shard's home + long-axis direction */
function put(f: ShardForm, i: number, p: number[], d: number[]) {
  f.pos[i * 3] = p[0];
  f.pos[i * 3 + 1] = p[1];
  f.pos[i * 3 + 2] = p[2];
  const l = Math.hypot(d[0], d[1], d[2]) || 1;
  f.dir[i * 3] = d[0] / l;
  f.dir[i * 3 + 1] = d[1] / l;
  f.dir[i * 3 + 2] = d[2] / l;
}

/** HERO — armillary sphere: three tilted rings, shards laid tangent so the
 *  ring reads as a machined band rather than beads on a string */
function formRings(n: number): ShardForm {
  const f = emptyForm(n);
  const rnd = mulberry32(31);
  const rings = [
    { r: 3.2, tilt: 0.08, yaw: 0.0 },
    { r: 4.0, tilt: 1.18, yaw: 0.55 },
    { r: 4.7, tilt: 0.6, yaw: -0.95 },
  ];
  const per = Math.ceil(n / rings.length);
  for (let i = 0; i < n; i++) {
    const ring = rings[i % rings.length];
    const a = (Math.floor(i / rings.length) / per) * Math.PI * 2;
    const p = [Math.cos(a) * ring.r, (rnd() - 0.5) * 0.12, Math.sin(a) * ring.r];
    const d = [-Math.sin(a), 0, Math.cos(a)];
    rotX(p, ring.tilt);
    rotY(p, ring.yaw);
    rotX(d, ring.tilt);
    rotY(d, ring.yaw);
    put(f, i, p, d);
  }
  return f;
}

/** MANIFESTO — lattice wall: an architectural grid facing the camera with
 *  cells punched out, plus horizontal members so it reads as structure */
function formLattice(n: number): ShardForm {
  const f = emptyForm(n);
  const COLS = 16;
  const ROWS = 9;
  const cells = shuffledIndices(COLS * ROWS, 512);
  const rnd = mulberry32(77);
  for (let i = 0; i < n; i++) {
    const cell = cells[i % cells.length];
    const cx = cell % COLS;
    const cy = Math.floor(cell / COLS);
    const p = [
      (cx - (COLS - 1) / 2) * 0.62,
      (cy - (ROWS - 1) / 2) * 0.64,
      -0.6 + (rnd() - 0.5) * 0.7,
    ];
    // every fourth member lies flat — verticals alone read as a picket fence
    const d = i % 4 === 0 ? [1, 0, 0] : [0, 1, 0];
    put(f, i, p, d);
  }
  return f;
}

/** PROJECTS — gate: two columns and a lintel framing the screenshots, so the
 *  shards surround the content instead of sitting on top of it */
function formGate(n: number): ShardForm {
  const f = emptyForm(n);
  const rnd = mulberry32(133);
  const lintel = Math.floor(n * 0.22);
  const perCol = Math.ceil((n - lintel) / 2);
  for (let i = 0; i < n; i++) {
    let p: number[];
    let d: number[];
    if (i < lintel) {
      const t = i / Math.max(lintel - 1, 1);
      p = [(t - 0.5) * 8.4, 3.9, (rnd() - 0.5) * 0.6];
      d = [1, 0, 0];
    } else {
      const k = i - lintel;
      const side = k < perCol ? -1 : 1;
      const t = (k % perCol) / Math.max(perCol - 1, 1);
      p = [side * 4.2, -3.6 + t * 7.3, (rnd() - 0.5) * 0.6];
      d = [0, 1, 0];
    }
    put(f, i, p, d);
  }
  return f;
}

/** SERVICES — radial burst: spokes from a hub, every shard pointing outward.
 *  Same read as the service list itself: one core, many branches */
function formBurst(n: number): ShardForm {
  const f = emptyForm(n);
  const ARMS = 7;
  const rnd = mulberry32(404);
  const per = Math.ceil(n / ARMS);
  for (let i = 0; i < n; i++) {
    const arm = i % ARMS;
    const t = Math.floor(i / ARMS) / Math.max(per - 1, 1);
    const a = (arm / ARMS) * Math.PI * 2 + t * 0.24;
    // density falls off outward — the hub stays the visual anchor
    const r = 1.1 + Math.pow(t, 0.72) * 3.7;
    const p = [Math.cos(a) * r, Math.sin(a) * r, (rnd() - 0.5) * 1.1];
    put(f, i, p, [Math.cos(a), Math.sin(a), 0]);
  }
  return f;
}

/** AI DEMO — geodesic cage: shards ride the edges of an icosahedron, a
 *  wireframe shell around the neural cloud */
function formCage(n: number): ShardForm {
  const f = emptyForm(n);
  const phi = (1 + Math.sqrt(5)) / 2;
  const raw = [
    [0, 1, phi], [0, -1, phi], [0, 1, -phi], [0, -1, -phi],
    [1, phi, 0], [-1, phi, 0], [1, -phi, 0], [-1, -phi, 0],
    [phi, 0, 1], [-phi, 0, 1], [phi, 0, -1], [-phi, 0, -1],
  ];
  const R = 3.9;
  const verts = raw.map((v) => {
    const l = Math.hypot(v[0], v[1], v[2]);
    return [(v[0] / l) * R, (v[1] / l) * R, (v[2] / l) * R];
  });
  // icosahedron edge length for this radius; a small epsilon catches all 30
  const edgeLen = 2 * R * Math.sin(Math.PI / 5) * 0.62;
  const edges: number[][] = [];
  for (let i = 0; i < verts.length; i++) {
    for (let j = i + 1; j < verts.length; j++) {
      const dx = verts[i][0] - verts[j][0];
      const dy = verts[i][1] - verts[j][1];
      const dz = verts[i][2] - verts[j][2];
      if (Math.hypot(dx, dy, dz) < edgeLen * 1.9) edges.push([i, j]);
    }
  }
  // lanes, not a modulo — a wrapping step would drop the tail of the field
  // exactly on top of the head and silently lose those shards
  const lanes = Math.ceil(n / edges.length);
  for (let i = 0; i < n; i++) {
    const e = edges[i % edges.length];
    const lane = Math.floor(i / edges.length);
    const t = 0.16 + ((lane + 0.5) / lanes) * 0.68;
    const A = verts[e[0]];
    const B = verts[e[1]];
    put(
      f,
      i,
      [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t],
      [B[0] - A[0], B[1] - A[1], B[2] - A[2]],
    );
  }
  return f;
}

/** PROCESS — double helix: two strands travelling one axis. The automation
 *  chapter gets the only formation with a direction of flow */
function formHelix(n: number): ShardForm {
  const f = emptyForm(n);
  const TURNS = 2.6;
  const R = 2.3;
  for (let i = 0; i < n; i++) {
    const strand = i % 2;
    const t = Math.floor(i / 2) / Math.max(Math.ceil(n / 2) - 1, 1);
    const ang = t * Math.PI * 2 * TURNS + strand * Math.PI;
    const p = [(t - 0.5) * 9.2, Math.cos(ang) * R, Math.sin(ang) * R];
    // tangent of the helix — shards lie along the direction of travel
    const dAng = Math.PI * 2 * TURNS;
    const d = [9.2, -Math.sin(ang) * R * dAng, Math.cos(ang) * R * dAng];
    rotY(p, 0.42);
    rotX(p, 0.18);
    rotY(d, 0.42);
    rotX(d, 0.18);
    put(f, i, p, d);
  }
  return f;
}

/** METRICS — ascending columns: stacked bars on a baseline. The numbers
 *  chapter literally gets a bar chart built out of glass */
function formColumns(n: number): ShardForm {
  const f = emptyForm(n);
  const BARS = 7;
  const rnd = mulberry32(909);
  const heights = [0.3, 0.46, 0.4, 0.62, 0.74, 0.88, 1.0];
  const per = Math.ceil(n / BARS);
  for (let i = 0; i < n; i++) {
    const bar = i % BARS;
    const t = Math.floor(i / BARS) / Math.max(per - 1, 1);
    const h = heights[bar] * 6.4;
    const p = [(bar - (BARS - 1) / 2) * 1.22, -3.2 + t * h, (rnd() - 0.5) * 0.8];
    put(f, i, p, [0, 1, 0]);
  }
  return f;
}

/** CTA — the "A" monogram: two legs and a crossbar. The last thing the
 *  visitor sees the field build is the brand mark */
function formMonogram(n: number): ShardForm {
  const f = emptyForm(n);
  const rnd = mulberry32(1717);
  const apex = [0, 3.9];
  const legL = [-2.9, -3.5];
  const legR = [2.9, -3.5];
  const bar = Math.floor(n * 0.2);
  const perLeg = Math.ceil((n - bar) / 2);
  for (let i = 0; i < n; i++) {
    let p: number[];
    let d: number[];
    if (i < bar) {
      const t = i / Math.max(bar - 1, 1);
      p = [-1.35 + t * 2.7, -0.5, (rnd() - 0.5) * 0.5];
      d = [1, 0, 0];
    } else {
      const k = i - bar;
      const left = k < perLeg;
      const foot = left ? legL : legR;
      const t = (k % perLeg) / Math.max(perLeg - 1, 1);
      p = [foot[0] + (apex[0] - foot[0]) * t, foot[1] + (apex[1] - foot[1]) * t, (rnd() - 0.5) * 0.5];
      d = [apex[0] - foot[0], apex[1] - foot[1], 0];
    }
    put(f, i, p, d);
  }
  return f;
}

/** SERVICES 2 — logarithmic spiral: three arms winding out of the hub. The
 *  burst's answer — same centre, but growth instead of radiation */
function formSpiral(n: number): ShardForm {
  const f = emptyForm(n);
  const ARMS = 3;
  const per = Math.ceil(n / ARMS);
  for (let i = 0; i < n; i++) {
    const arm = i % ARMS;
    const t = Math.floor(i / ARMS) / Math.max(per - 1, 1);
    const th = t * 5.4;
    const r = Math.min(0.75 * Math.exp(0.34 * th), 4.9);
    const a = th + (arm / ARMS) * Math.PI * 2;
    // tangent of a log spiral — the shard lies along the curve, not across it
    const dr = 0.34 * r;
    const d = [dr * Math.cos(a) - r * Math.sin(a), dr * Math.sin(a) + r * Math.cos(a), 0];
    put(f, i, [Math.cos(a) * r, Math.sin(a) * r, (t - 0.5) * 1.4], d);
  }
  return f;
}

/** METRICS 2 — ring tower: stacked rings with a waist, each turned against
 *  the last. Reads as a machined column, the most "built" object in the set */
function formRingTower(n: number): ShardForm {
  const f = emptyForm(n);
  const RINGS = 8;
  const per = Math.ceil(n / RINGS);
  for (let i = 0; i < n; i++) {
    const ring = i % RINGS;
    const k = Math.floor(i / RINGS);
    const y = -3.4 + (ring / (RINGS - 1)) * 6.8;
    // waist — a straight cylinder reads cheap, a curved profile reads turned
    const r = 2.0 + Math.pow(Math.abs(ring / (RINGS - 1) - 0.5) * 2, 1.7) * 1.9;
    const a = (k / per) * Math.PI * 2 + ring * 0.42;
    put(f, i, [Math.cos(a) * r, y, Math.sin(a) * r], [-Math.sin(a), 0, Math.cos(a)]);
  }
  return f;
}

/** PROCESS 2 — wave grid: a plane of shards riding a standing wave, each one
 *  tilted into the slope so the surface reads as a solid sheet */
function formWave(n: number): ShardForm {
  const f = emptyForm(n);
  const COLS = 15;
  const rows = Math.ceil(n / COLS);
  for (let i = 0; i < n; i++) {
    const cx = i % COLS;
    const cy = Math.floor(i / COLS);
    const x = (cx - (COLS - 1) / 2) * 0.66;
    const z = (cy - (rows - 1) / 2) * 0.72;
    const ph = x * 0.85 + z * 0.5;
    const y = Math.sin(ph) * 1.25;
    // slope of the surface along x — shards lie in the sheet, not through it
    put(f, i, [x, y, z], [1, Math.cos(ph) * 0.85 * 1.25, 0]);
  }
  return f;
}

/** HERO 2 — sphere shell: a fibonacci-spaced shell of shards all pointing
 *  outward, the field's calmest, most symmetric state */
function formShell(n: number): ShardForm {
  const f = emptyForm(n);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const R = 4.05;
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / Math.max(n - 1, 1)) * 2;
    const rad = Math.sqrt(Math.max(1 - y * y, 0));
    const th = golden * i;
    const p = [Math.cos(th) * rad * R, y * R, Math.sin(th) * rad * R];
    put(f, i, p, [p[0], p[1], p[2]]);
  }
  return f;
}

/** PROJECTS 2 — vault: concentric arcs receding into depth. The gate opens
 *  into a corridor; the camera is inside architecture, not looking at it */
function formVault(n: number): ShardForm {
  const f = emptyForm(n);
  const ARCS = 5;
  const per = Math.ceil(n / ARCS);
  for (let i = 0; i < n; i++) {
    const arc = i % ARCS;
    const t = Math.floor(i / ARCS) / Math.max(per - 1, 1);
    // arcs shrink as they recede — forced perspective down the corridor
    const r = 4.4 - arc * 0.42;
    const z = -3.4 + arc * 1.75;
    const a = 0.12 + t * (Math.PI - 0.24);
    put(f, i, [Math.cos(a) * r, Math.sin(a) * r - 1.4, z], [-Math.sin(a), Math.cos(a), 0]);
  }
  return f;
}

/** MANIFESTO 2 — cube frame: the twelve edges of a box. Pure structure, the
 *  hardest-edged formation in the set */
function formCube(n: number): ShardForm {
  const f = emptyForm(n);
  const S = 2.85;
  const c: number[][] = [];
  for (let xi = -1; xi <= 1; xi += 2) {
    for (let yi = -1; yi <= 1; yi += 2) {
      for (let zi = -1; zi <= 1; zi += 2) c.push([xi * S, yi * S, zi * S]);
    }
  }
  const edges: number[][] = [];
  for (let i = 0; i < c.length; i++) {
    for (let j = i + 1; j < c.length; j++) {
      // corners that differ on exactly one axis share an edge
      let diff = 0;
      for (let k = 0; k < 3; k++) if (Math.abs(c[i][k] - c[j][k]) > 0.001) diff++;
      if (diff === 1) edges.push([i, j]);
    }
  }
  const lanes = Math.ceil(n / edges.length);
  for (let i = 0; i < n; i++) {
    const e = edges[i % edges.length];
    const lane = Math.floor(i / edges.length);
    const t = 0.1 + ((lane + 0.5) / lanes) * 0.8;
    const A = c[e[0]];
    const B = c[e[1]];
    put(
      f,
      i,
      [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t],
      [B[0] - A[0], B[1] - A[1], B[2] - A[2]],
    );
  }
  return f;
}

/** AI DEMO 2 — funnel: a cone spiralling toward the lens. The only formation
 *  that reaches at the visitor rather than sitting in front of them */
function formFunnel(n: number): ShardForm {
  const f = emptyForm(n);
  for (let i = 0; i < n; i++) {
    const t = i / Math.max(n - 1, 1);
    const r = 4.6 * (1 - t) + 0.45;
    const a = t * Math.PI * 2 * 3.2;
    const z = -3.6 + t * 7.2;
    const dr = -4.6;
    const da = Math.PI * 2 * 3.2;
    put(
      f,
      i,
      [Math.cos(a) * r, Math.sin(a) * r, z],
      [dr * Math.cos(a) - r * Math.sin(a) * da, dr * Math.sin(a) + r * Math.cos(a) * da, 7.2],
    );
  }
  return f;
}

/** indexed by SHARD_ORDER, not by ShapeDef.gen — the shard field runs its own
 *  scene at twice the cloud's rate */
function buildShardForms(n: number): ShardForm[] {
  return [
    formRings(n),
    formLattice(n),
    formGate(n),
    formBurst(n),
    formCage(n),
    formHelix(n),
    formColumns(n),
    formMonogram(n),
    formSpiral(n),
    formRingTower(n),
    formWave(n),
    formShell(n),
    formVault(n),
    formCube(n),
    formFunnel(n),
  ];
}

/**
 * The shard scene's running order — two formations per scroll section, so the
 * background geometry rebuilds itself fifteen times across the landing while
 * the particle cloud morphs eight. Each pair is a statement and its answer:
 * rings → shell, gate → vault, burst → spiral. The last thing the visitor
 * watches the field assemble is the monogram.
 */
const SHARD_ORDER = [
  0, 11, // hero:      armillary rings → sphere shell
  1, 13, // manifesto: lattice wall → cube frame
  2, 12, // projects:  gate → vault
  3, 8,  // services:  radial burst → logarithmic spiral
  4, 14, // aiDemo:    geodesic cage → funnel
  5, 10, // process:   double helix → wave grid
  6, 9,  // metrics:   columns → ring tower
  7,     // cta:       the "A" monogram
];

/**
 * Chain the formations so consecutive ones are index-matched by proximity.
 *
 * This is the difference between a structure MORPHING and a swarm reshuffling.
 * Authored independently, slot 12 of the gate and slot 12 of the vault are
 * unrelated points, so every shard crosses the whole scene to reach a spot
 * some other shard just left — a hundred paths cancelling out into noise.
 *
 * Walking SHARD_ORDER and greedily re-indexing each formation to the nearest
 * free slot in the previous one means each shard makes the shortest move it
 * can. The eye can then follow individual shards, and the field reads as one
 * object rearranging itself.
 */
function chainForms(forms: ShardForm[], order: number[], n: number) {
  for (let k = 1; k < order.length; k++) {
    const prev = forms[order[k - 1]];
    const cur = forms[order[k]];
    const used = new Uint8Array(n);
    const pos = new Float32Array(n * 3);
    const dir = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const px = prev.pos[i * 3];
      const py = prev.pos[i * 3 + 1];
      const pz = prev.pos[i * 3 + 2];
      let best = -1;
      let bestD = Infinity;
      for (let j = 0; j < n; j++) {
        if (used[j]) continue;
        const dx = cur.pos[j * 3] - px;
        const dy = cur.pos[j * 3 + 1] - py;
        const dz = cur.pos[j * 3 + 2] - pz;
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < bestD) {
          bestD = d2;
          best = j;
        }
      }
      used[best] = 1;
      pos[i * 3] = cur.pos[best * 3];
      pos[i * 3 + 1] = cur.pos[best * 3 + 1];
      pos[i * 3 + 2] = cur.pos[best * 3 + 2];
      dir[i * 3] = cur.dir[best * 3];
      dir[i * 3 + 1] = cur.dir[best * 3 + 1];
      dir[i * 3 + 2] = cur.dir[best * 3 + 2];
    }

    // Greedy is first-come-first-served: the shards matched last get whatever
    // slots are left and can end up crossing the entire scene. Those few long
    // stragglers are exactly what reads as randomness, so pair-swap them out.
    const d2 = (ax: number, ay: number, az: number, bx: number, by: number, bz: number) => {
      const dx = ax - bx;
      const dy = ay - by;
      const dz = az - bz;
      return dx * dx + dy * dy + dz * dz;
    };
    for (let pass = 0; pass < 6; pass++) {
      let swaps = 0;
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const pix = prev.pos[i * 3];
          const piy = prev.pos[i * 3 + 1];
          const piz = prev.pos[i * 3 + 2];
          const pjx = prev.pos[j * 3];
          const pjy = prev.pos[j * 3 + 1];
          const pjz = prev.pos[j * 3 + 2];
          const now =
            d2(pix, piy, piz, pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]) +
            d2(pjx, pjy, pjz, pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
          const swapped =
            d2(pix, piy, piz, pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]) +
            d2(pjx, pjy, pjz, pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
          if (swapped < now - 1e-6) {
            for (let k = 0; k < 3; k++) {
              const tp = pos[i * 3 + k];
              pos[i * 3 + k] = pos[j * 3 + k];
              pos[j * 3 + k] = tp;
              const td = dir[i * 3 + k];
              dir[i * 3 + k] = dir[j * 3 + k];
              dir[j * 3 + k] = td;
            }
            swaps++;
          }
        }
      }
      if (!swaps) break;
    }

    cur.pos.set(pos);
    cur.dir.set(dir);
  }
}

// Instanced obsidian shards. Every instance carries the home AND long-axis
// direction of the formation it belongs to on either side of the current
// scroll segment, so the whole field assembles, holds, travels and re-assembles
// on the GPU — the CPU only swaps targets when the segment changes.
const SHARD_VERT = /* glsl */ `
  attribute vec3 aTgtA;
  attribute vec3 aTgtB;
  attribute vec3 aDirA;
  attribute vec3 aDirB;
  attribute vec3 aScatter;
  attribute vec3 aScale;
  attribute vec3 aAxis;
  attribute float aSeed;

  uniform float uTime;
  uniform float uMix;
  uniform float uSpread;
  uniform float uWaveMode;

  varying vec3 vN;
  varying vec3 vV;
  varying vec3 vPos;
  varying float vSeed;
  varying float vTravel;
  varying float vEdge;

  mat3 axisRot(vec3 axis, float a) {
    float s = sin(a);
    float c = cos(a);
    float t = 1.0 - c;
    vec3 n = normalize(axis);
    return mat3(
      t * n.x * n.x + c,       t * n.x * n.y + s * n.z, t * n.x * n.z - s * n.y,
      t * n.x * n.y - s * n.z, t * n.y * n.y + c,       t * n.y * n.z + s * n.x,
      t * n.x * n.z + s * n.y, t * n.y * n.z - s * n.x, t * n.z * n.z + c
    );
  }

  void main() {
    // A formation must be READ, not glimpsed. The plateau parks the field for
    // the first and last stretch of every beat and compresses the whole
    // journey into the middle — assemble, hold, fly, re-assemble.
    //
    // The delay comes from where the shard is GOING, not from noise, so the
    // structure builds as a sweep: bottom-up on one beat, centre-outward on
    // the next. Noise-staggered shards look like debris; a swept one looks
    // choreographed, and that difference is most of "premium".
    float ordY = clamp((aTgtB.y + 4.6) / 9.2, 0.0, 1.0);
    float ordR = clamp(length(aTgtB) / 5.6, 0.0, 1.0);
    float d0 = mix(ordY, ordR, uWaveMode) * 0.22 + aSeed * 0.04;
    float e = smoothstep(0.30 + d0, 0.66 + d0, uMix);

    // bell that peaks halfway between two formations
    float travel = 4.0 * e * (1.0 - e);

    // ease-out-back — a slight overshoot past the slot before settling into
    // it reads as mass. Kept gentle: on a whole field, a big overshoot is
    // a twitch, not weight.
    float c1 = 0.5;
    float t1 = e - 1.0;
    float ep = 1.0 + (c1 + 1.0) * t1 * t1 * t1 + c1 * t1 * t1;

    // Curved flight. A straight lerp reads as a slide, but a randomly offset
    // arc per shard reads as noise — so every shard bows the SAME way, away
    // from the centre of the scene, by an amount set by how far it has to go.
    // The field swells outward as one body and settles into the next form.
    vec3 mid = (aTgtA + aTgtB) * 0.5;
    vec3 outward = normalize(mid + vec3(0.0, 0.0001, 0.0));
    float span = length(aTgtB - aTgtA);
    vec3 ctrl = mid + outward * span * 0.3 + aScatter * span * 0.05;
    vec3 home = mix(mix(aTgtA, ctrl, ep), mix(ctrl, aTgtB, ep), ep) * uSpread;
    // idle breathing so a parked formation is never frozen
    home += aScatter * sin(uTime * (0.2 + aSeed * 0.3) + aSeed * 21.0) * 0.03;

    // Orientation. In flight the shard aligns to its own velocity down the
    // bezier and stretches along it — a streak, not a tumbling rock. The lock
    // is squared so alignment snaps late: shards streak most of the way over,
    // then whip into the formation's facing in the last moment.
    vec3 vel = 2.0 * (1.0 - ep) * (ctrl - aTgtA) + 2.0 * ep * (aTgtB - ctrl);
    vec3 flight = normalize(vel + vec3(0.0, 0.0001, 0.0));

    // opposite facings can cancel mid-blend — fall back to the destination
    vec3 dsum = mix(aDirA, aDirB, e);
    float dlen = length(dsum);
    vec3 dirNow = dlen > 0.02 ? dsum / dlen : normalize(aDirB + vec3(0.0, 0.0001, 0.0));

    float lock = 1.0 - travel;
    vec3 want = normalize(mix(flight, dirNow, lock * lock));

    vec3 upv = abs(want.y) > 0.95 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
    vec3 tanA = normalize(cross(upv, want));
    mat3 basis = mat3(tanA, want, cross(want, tanA));

    // stretched thin along the direction of travel, thinned across it
    vec3 sc = aScale * vec3(1.0 - travel * 0.4, 1.0 + travel * 2.2, 1.0 - travel * 0.4);
    // Slow twirl about its own long axis. Fast spin on 88 objects is visual
    // noise; slow is what reads as heavy glass.
    mat3 twirl = axisRot(vec3(0.0, 1.0, 0.0), uTime * (0.1 + aSeed * 0.16) + aSeed * 6.283);
    mat3 wobble = axisRot(aAxis, travel * 0.6 * (0.4 + aSeed));
    mat3 local = wobble * twirl;

    vec3 vert = basis * (local * (position * sc));
    vec3 nrm = basis * (local * normal);

    vec4 mv = modelViewMatrix * vec4(home + vert, 1.0);
    vN = normalize(normalMatrix * nrm);
    vV = normalize(-mv.xyz);
    vPos = position;
    vSeed = aSeed;
    vTravel = travel;
    // narrow band just off the plateau — one flash on launch, one on landing
    vEdge = smoothstep(0.0, 0.10, travel) * smoothstep(0.34, 0.10, travel);
    gl_Position = projectionMatrix * mv;
  }
`;

const SHARD_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uAlpha;
  uniform float uArrival;
  varying vec3 vN;
  varying vec3 vV;
  varying vec3 vPos;
  varying float vSeed;
  varying float vTravel;
  varying float vEdge;
  void main() {
    float ndv = abs(dot(normalize(vN), normalize(vV)));
    // tight fresnel = a thin hard rim of light on each facet edge
    float fres = pow(1.0 - ndv, 3.0);
    // slow light band crawling across the glass — obsidian catches light
    float band = 0.5 + 0.5 * sin(vPos.y * 9.0 + uTime * 0.6 + vSeed * 6.283);
    // rare, hard glint — a sparse flash reads more expensive than constant shine
    float glint = pow(band, 14.0) * pow(ndv, 3.0) * 0.7;
    vec3 base = vec3(0.004, 0.008, 0.024);
    // Locked to the brand accent (#2f6bff). The grazing edge lifts toward a
    // brighter blue, NOT toward white — a white rim on 88 shards averages out
    // to the silver haze that made the field read grey.
    vec3 rim = mix(uColor, vec3(0.18, 0.42, 1.0), 0.7);
    rim = mix(rim, vec3(0.42, 0.64, 1.0), pow(fres, 3.5));
    vec3 col = base + rim * fres * (1.0 + band * 0.6) + vec3(0.5, 0.7, 1.0) * glint;
    // shards in transit run hotter, so the eye follows the flight and the
    // parked structure reads as the calm state
    col += rim * vTravel * 0.5;
    // launch and landing each get a bloom — bright, still blue
    col += vec3(0.4, 0.62, 1.0) * vEdge * 0.8;
    // crystallisation flash — the frame a formation lands, the facets ring
    col += rim * uArrival * 0.5;
    // per-shard opacity variance keeps the field from looking printed
    float a = (0.18 + fres * 0.55 + glint + vEdge * 0.5) * uAlpha * (0.75 + vSeed * 0.5);
    gl_FragColor = vec4(col, a);
  }
`;

// ─── Component ───────────────────────────────────────────────────────────────

export function SceneV4() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let cleanup: (() => void) | null = null;

    // preloader listens: counter tracks real load, not a fake timer
    const prog = (p: number) =>
      window.dispatchEvent(new CustomEvent("v4:scene-progress", { detail: p }));

    // Every device gets the live morphing kernel — it's the visual that sets this
    // site apart. Mobile stays affordable via fewer particles + a capped pixel
    // ratio below, and the postprocessing composer is already desktop-only.
    (async () => {
      const THREE = await import("three");
      if (disposed) return;
      prog(0.35);

      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      // No WebGL (blocked, blacklisted driver, exhausted contexts) is the only
      // case that falls back — the static gradient keeps the hero legible.
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        });
      } catch {
        canvas.classList.add(styles.sceneStatic);
        prog(1);
        return;
      }
      // cap desktop DPR at 1.8 (not 2): a full 2x draw = 4x the fragment work
      // through the whole post-chain, which is what makes scroll stutter.
      // 1.8 buys visibly sharper edges than the old 1.6 cap while the
      // adaptive low-res drop below still protects the frame budget when the
      // cloud recedes behind content.
      // Mobile now runs a lean bloom/vignette pass, so 1.35 DPR is the sweet
      // spot: materially sharper than 1x, without multiplying fill-rate on a
      // DPR-3 phone. Adaptive resolution still protects dense mid-page shots.
      const basePR = Math.min(window.devicePixelRatio, isMobile ? 1.35 : 1.5);
      renderer.setPixelRatio(basePR);
      renderer.setSize(window.innerWidth, window.innerHeight);

      const scene = new THREE.Scene();
      // opaque bg matches the page — required for the bloom composer path
      // deep black-blue void: pure black would read flat, grey is banned
      scene.background = new THREE.Color(0x02030a);
      const camera = new THREE.PerspectiveCamera(
        42,
        window.innerWidth / window.innerHeight,
        0.1,
        60,
      );
      camera.position.z = SHAPES[0].camZ;

      // ── Morphing cloud — GPU-side, CPU only swaps targets ─────────────
      const COUNT = isMobile ? 7000 : 16000;
      // indexed by ShapeDef.gen
      const shapes = [
        genIdeaCore(COUNT),
        genBlueprint(COUNT),
        genDevices(COUNT),
        genServiceHub(COUNT),
        genNeural(COUNT),
        genPipeline(COUNT),
        genGrowth(COUNT),
        genMonogramA(COUNT),
      ];
      // scale non-sphere shapes down a touch on mobile
      const shapeScale = isMobile ? 0.72 : 0.95;
      for (let s = 1; s < shapes.length; s++) {
        for (let i = 0; i < shapes[s].length; i++) shapes[s][i] *= shapeScale;
      }

      // per-particle scatter direction for the puff between shapes
      const rnd = mulberry32(999);
      const scatter = new Float32Array(COUNT * 3);
      for (let i = 0; i < COUNT; i++) {
        const th = rnd() * Math.PI * 2;
        const ph = Math.acos(rnd() * 2 - 1);
        scatter[i * 3] = Math.sin(ph) * Math.cos(th);
        scatter[i * 3 + 1] = Math.sin(ph) * Math.sin(th);
        scatter[i * 3 + 2] = Math.cos(ph);
      }

      const cloudGeo = new THREE.BufferGeometry();
      // position is unused by the shader but three.js wants it present
      cloudGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(shapes[0]), 3));
      const tgtA = new THREE.BufferAttribute(new Float32Array(shapes[0]), 3);
      const tgtB = new THREE.BufferAttribute(new Float32Array(shapes[1]), 3);
      tgtA.setUsage(THREE.DynamicDrawUsage);
      tgtB.setUsage(THREE.DynamicDrawUsage);
      cloudGeo.setAttribute("aTargetA", tgtA);
      cloudGeo.setAttribute("aTargetB", tgtB);
      // third + fourth targets — ping-pong override slots for the services
      // index, so service→service switches crossfade instead of snapping
      const tgtC = new THREE.BufferAttribute(new Float32Array(shapes[3]), 3);
      tgtC.setUsage(THREE.DynamicDrawUsage);
      cloudGeo.setAttribute("aTargetC", tgtC);
      const tgtD = new THREE.BufferAttribute(new Float32Array(shapes[3]), 3);
      tgtD.setUsage(THREE.DynamicDrawUsage);
      cloudGeo.setAttribute("aTargetD", tgtD);
      cloudGeo.setAttribute("aScatter", new THREE.BufferAttribute(scatter, 3));

      // per-particle size + seed → soft glowing dots of varied size that
      // twinkle out of phase; the premium look vs. uniform square points
      const sizes = new Float32Array(COUNT);
      const seeds = new Float32Array(COUNT);
      const sRnd = mulberry32(4242);
      for (let i = 0; i < COUNT; i++) {
        const r = sRnd();
        // few large "hero" particles, many small dust ones
        sizes[i] = r > 0.97 ? 2.4 + sRnd() * 1.6 : 0.55 + sRnd() * 0.9;
        seeds[i] = sRnd() * 100;
      }
      cloudGeo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
      cloudGeo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

      const cloudUniforms = {
        uColor: { value: new THREE.Color(SHAPES[0].color[0], SHAPES[0].color[1], SHAPES[0].color[2]) },
        uColorB: { value: new THREE.Color(SHAPES[0].color2[0], SHAPES[0].color2[1], SHAPES[0].color2[2]) },
        uOpacity: { value: 0.7 },
        uTime: { value: 0 },
        uScale: { value: (isMobile ? 46 : 40) * basePR },
        uMix: { value: 0 },
        uOverride: { value: 0 },
        uOvBlend: { value: 0 },
        uIntro: { value: 0 },
        uAgitation: { value: 0 },
        uWarp: { value: 0 },
        uAttract: { value: 0 },
        uPointerVel: { value: 0 },
        uArrival: { value: 0 },
        uShockPos: { value: new THREE.Vector3(0, 0, 0) },
        uShockT: { value: -1 },
        uWaveA: { value: SHAPES[0].wave },
        uWaveB: { value: SHAPES[1].wave },
        uWaveC: { value: 0 },
        uWaveD: { value: 0 },
        uPointer: { value: new THREE.Vector3(0, 0, 99) },
      };
      const cloudMat = new THREE.ShaderMaterial({
        uniforms: cloudUniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: CLOUD_VERT,
        fragmentShader: CLOUD_FRAG,
      });
      const cloud = new THREE.Points(cloudGeo, cloudMat);
      // real positions live in the shader — never let three cull on stale bounds
      cloud.frustumCulled = false;
      scene.add(cloud);

      // ── Neural constellation — synapse lines between the AI shape's nodes,
      // energy pulses racing along them; fades in only while the neural shape
      // holds the stage ───────────────────────────────────────────────────
      const nlRnd = mulberry32(2468);
      const nlPairs: number[][] = [];
      let nlGuard = 0;
      while (nlPairs.length < 44 && nlGuard++ < 500) {
        const i = Math.floor(nlRnd() * NEURAL_NODES.length);
        const j = Math.floor(nlRnd() * NEURAL_NODES.length);
        if (i === j) continue;
        const a = NEURAL_NODES[i];
        const b = NEURAL_NODES[j];
        const dd = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
        if (dd < 2.3) nlPairs.push([i, j]);
      }
      const nlPos = new Float32Array(nlPairs.length * 2 * 3);
      const nlT = new Float32Array(nlPairs.length * 2);
      const nlSeed = new Float32Array(nlPairs.length * 2);
      for (let k = 0; k < nlPairs.length; k++) {
        const sd = nlRnd();
        for (let v = 0; v < 2; v++) {
          const nd = NEURAL_NODES[nlPairs[k][v]];
          // NEURAL_NODES are raw gen coords — apply the same shapeScale
          nlPos[(k * 2 + v) * 3] = nd[0] * shapeScale;
          nlPos[(k * 2 + v) * 3 + 1] = nd[1] * shapeScale;
          nlPos[(k * 2 + v) * 3 + 2] = nd[2] * shapeScale;
          nlT[k * 2 + v] = v;
          nlSeed[k * 2 + v] = sd;
        }
      }
      const neuralGeo = new THREE.BufferGeometry();
      neuralGeo.setAttribute("position", new THREE.BufferAttribute(nlPos, 3));
      neuralGeo.setAttribute("aT", new THREE.BufferAttribute(nlT, 1));
      neuralGeo.setAttribute("aSeed", new THREE.BufferAttribute(nlSeed, 1));
      const neuralMat = new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(0.32, 0.94, 0.74) },
          uOpacity: { value: 0 },
          uTime: { value: 0 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: /* glsl */ `
          attribute float aT;
          attribute float aSeed;
          varying float vT;
          varying float vSeed;
          void main() {
            vT = aT;
            vSeed = aSeed;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          uniform float uOpacity;
          uniform float uTime;
          varying float vT;
          varying float vSeed;
          void main() {
            // bright pulse racing node-to-node; each synapse on its own clock
            float pulse = pow(0.5 + 0.5 * sin(vT * 9.4 - uTime * 2.6 + vSeed * 40.0), 4.0);
            gl_FragColor = vec4(uColor + pulse * 0.5, (0.16 + pulse * 0.84) * uOpacity);
          }
        `,
      });
      const neuralLines = new THREE.LineSegments(neuralGeo, neuralMat);
      neuralLines.frustumCulled = false;
      scene.add(neuralLines);

      // ── Fireflies — a handful of bright motes on elliptical orbits around
      // the sculpture, each dragging a fading light-trail. Constant life even
      // when the visitor stops scrolling ───────────────────────────────────
      const FLY_N = isMobile ? 6 : 7;
      const TRAIL = 10;
      const flyRnd = mulberry32(6161);
      const flyDefs = Array.from({ length: FLY_N }, () => ({
        rx: 2.7 + flyRnd() * 1.7,
        ry: 1.1 + flyRnd() * 1.2,
        sp: 0.14 + flyRnd() * 0.17,
        ph: flyRnd() * Math.PI * 2,
        zw: 1.1 + flyRnd() * 0.9,
      }));
      const flyPoint = (f: (typeof flyDefs)[number], tt: number, out: number[]) => {
        out[0] = Math.cos(tt * f.sp + f.ph) * f.rx;
        out[1] = Math.sin(tt * f.sp * 0.83 + f.ph) * f.ry;
        out[2] = Math.sin(tt * f.sp * 1.31 + f.ph * 2.0) * f.zw;
      };
      // trail: (TRAIL-1) segments per fly, rebuilt on CPU each frame (tiny)
      const trailGeo = new THREE.BufferGeometry();
      const trailPos = new THREE.BufferAttribute(new Float32Array(FLY_N * (TRAIL - 1) * 2 * 3), 3);
      trailPos.setUsage(THREE.DynamicDrawUsage);
      trailGeo.setAttribute("position", trailPos);
      const trailFade = new Float32Array(FLY_N * (TRAIL - 1) * 2);
      for (let f = 0; f < FLY_N; f++) {
        for (let k = 0; k < TRAIL - 1; k++) {
          trailFade[(f * (TRAIL - 1) + k) * 2] = 1 - k / TRAIL;
          trailFade[(f * (TRAIL - 1) + k) * 2 + 1] = 1 - (k + 1) / TRAIL;
        }
      }
      trailGeo.setAttribute("aFade", new THREE.BufferAttribute(trailFade, 1));
      const trailMat = new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color(0.78, 0.84, 1.0) } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: /* glsl */ `
          attribute float aFade;
          varying float vF;
          void main() {
            vF = aFade;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          varying float vF;
          void main() {
            gl_FragColor = vec4(uColor, vF * vF * 0.55);
          }
        `,
      });
      const flyTrails = new THREE.LineSegments(trailGeo, trailMat);
      flyTrails.frustumCulled = false;
      scene.add(flyTrails);
      // heads — hot dots the bloom pass catches
      const headGeo = new THREE.BufferGeometry();
      const headPos = new THREE.BufferAttribute(new Float32Array(FLY_N * 3), 3);
      headPos.setUsage(THREE.DynamicDrawUsage);
      headGeo.setAttribute("position", headPos);
      const headMat = new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(0.86, 0.9, 1.0) },
          uScale: { value: (isMobile ? 46 : 40) * basePR },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: /* glsl */ `
          uniform float uScale;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = 2.6 * uScale / -mv.z;
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          void main() {
            float d = distance(gl_PointCoord, vec2(0.5));
            if (d > 0.5) discard;
            gl_FragColor = vec4(uColor + vec3(0.4), exp(-d * d * 18.0));
          }
        `,
      });
      const flyHeads = new THREE.Points(headGeo, headMat);
      flyHeads.frustumCulled = false;
      scene.add(flyHeads);
      const flyTmp = [0, 0, 0];

      // ── Shard field — the background geometry's own scroll scene ───────
      // One body of shards, drawn as three meshes only so the silhouettes vary
      // (blades / chips / slabs). All three ride the cloud's transform and all
      // three pull from ONE formation per chapter, sliced through a shuffle, so
      // the structure they build is a single composition instead of three
      // overlapping clouds. Every shard knows where it belongs in the next
      // formation and which way to face once it lands.
      // Fewer and bigger. 132 small pieces read as confetti scattered behind
      // the content; ~88 larger ones read as objects, and an object is what
      // has to look expensive.
      const SHARD_TOTAL = isMobile ? 32 : 88;
      const shardForms = buildShardForms(SHARD_TOTAL);
      // pair the formations up by proximity before anything else touches them
      chainForms(shardForms, SHARD_ORDER, SHARD_TOTAL);
      // The structures are authored at radius ~3.5–6; the particle sculpture
      // spans about ±2.5. Pulling them in makes the shards read as a frame
      // built around the cloud instead of a separate ring floating past it.
      const SHARD_FIT = 0.78;
      for (const form of shardForms) {
        for (let i = 0; i < form.pos.length; i++) form.pos[i] *= SHARD_FIT;
      }
      const shardPerm = shuffledIndices(SHARD_TOTAL, 77);
      let shardTaken = 0;

      const shardColor = new THREE.Color(0xc5d0ff);
      const shardCommon = {
        uTime: { value: 0 },
        uColor: { value: shardColor },
        uArrival: { value: 0 },
        uMix: { value: 0 },
        uSpread: { value: 1 },
        // 0 = the form builds bottom-up, 1 = centre-outward. Alternating per
        // beat keeps the sweep from becoming its own repetitive tic.
        uWaveMode: { value: 0 },
      };

      type ShardField = {
        geo: InstanceType<typeof THREE.InstancedBufferGeometry>;
        mat: InstanceType<typeof THREE.ShaderMaterial>;
        mesh: InstanceType<typeof THREE.Mesh>;
        count: number;
        tgtA: InstanceType<typeof THREE.InstancedBufferAttribute>;
        tgtB: InstanceType<typeof THREE.InstancedBufferAttribute>;
        dirA: InstanceType<typeof THREE.InstancedBufferAttribute>;
        dirB: InstanceType<typeof THREE.InstancedBufferAttribute>;
        /** this field's slice of every chapter formation, [gen][pos|dir] */
        homes: { pos: Float32Array; dir: Float32Array }[];
        baseAlpha: number;
      };
      const shardFields: ShardField[] = [];
      const shardGeos: InstanceType<typeof THREE.BufferGeometry>[] = [];

      const buildShardField = (
        base: InstanceType<typeof THREE.BufferGeometry>,
        count: number,
        seed: number,
        sizeMul: number,
        baseAlpha: number,
      ) => {
        // detail-0 polyhedra are non-indexed → per-face normals → crisp facets
        base.computeVertexNormals();
        shardGeos.push(base);

        const geo = new THREE.InstancedBufferGeometry();
        type Attr = InstanceType<typeof THREE.BufferAttribute>;
        geo.setAttribute("position", base.getAttribute("position") as Attr);
        geo.setAttribute("normal", base.getAttribute("normal") as Attr);
        geo.instanceCount = count;

        // this field's slots in the shared formation, spread across the whole
        // structure rather than owning one contiguous corner of it
        const slots = shardPerm.slice(shardTaken, shardTaken + count);
        shardTaken += count;
        const homes = shardForms.map((form) => {
          const pos = new Float32Array(count * 3);
          const dir = new Float32Array(count * 3);
          for (let i = 0; i < count; i++) {
            const s = slots[i];
            pos[i * 3] = form.pos[s * 3];
            pos[i * 3 + 1] = form.pos[s * 3 + 1];
            pos[i * 3 + 2] = form.pos[s * 3 + 2];
            dir[i * 3] = form.dir[s * 3];
            dir[i * 3 + 1] = form.dir[s * 3 + 1];
            dir[i * 3 + 2] = form.dir[s * 3 + 2];
          }
          return { pos, dir };
        });

        const r = mulberry32(seed);
        const scatter = new Float32Array(count * 3);
        const scale = new Float32Array(count * 3);
        const axis = new Float32Array(count * 3);
        const seeds = new Float32Array(count);

        for (let i = 0; i < count; i++) {
          const th = r() * Math.PI * 2;
          const ph = Math.acos(r() * 2 - 1);
          scatter[i * 3] = Math.sin(ph) * Math.cos(th);
          scatter[i * 3 + 1] = Math.sin(ph) * Math.sin(th);
          scatter[i * 3 + 2] = Math.cos(ph);

          // elongated slivers, not platonic solids — a wide size spread puts a
          // few monoliths among the blades and reads more expensive
          const s = sizeMul * (0.95 + r() * 1.1);
          scale[i * 3] = s * (0.4 + r() * 0.45);
          scale[i * 3 + 1] = s * (1.2 + r() * 1.7);
          scale[i * 3 + 2] = s * (0.4 + r() * 0.45);

          const ax = r() * 2 - 1;
          const ay = r() * 2 - 1;
          const az = r() * 2 - 1;
          const al = Math.hypot(ax, ay, az) || 1;
          axis[i * 3] = ax / al;
          axis[i * 3 + 1] = ay / al;
          axis[i * 3 + 2] = az / al;

          seeds[i] = r();
        }

        const tgtA = new THREE.InstancedBufferAttribute(new Float32Array(homes[0].pos), 3);
        const tgtB = new THREE.InstancedBufferAttribute(new Float32Array(homes[0].pos), 3);
        const dirA = new THREE.InstancedBufferAttribute(new Float32Array(homes[0].dir), 3);
        const dirB = new THREE.InstancedBufferAttribute(new Float32Array(homes[0].dir), 3);
        geo.setAttribute("aTgtA", tgtA);
        geo.setAttribute("aTgtB", tgtB);
        geo.setAttribute("aDirA", dirA);
        geo.setAttribute("aDirB", dirB);
        geo.setAttribute("aScatter", new THREE.InstancedBufferAttribute(scatter, 3));
        geo.setAttribute("aScale", new THREE.InstancedBufferAttribute(scale, 3));
        geo.setAttribute("aAxis", new THREE.InstancedBufferAttribute(axis, 3));
        geo.setAttribute("aSeed", new THREE.InstancedBufferAttribute(seeds, 1));

        const mat = new THREE.ShaderMaterial({
          uniforms: { ...shardCommon, uAlpha: { value: baseAlpha } },
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          vertexShader: SHARD_VERT,
          fragmentShader: SHARD_FRAG,
        });

        const mesh = new THREE.Mesh(geo, mat);
        mesh.frustumCulled = false;
        scene.add(mesh);
        shardFields.push({ geo, mat, mesh, count, tgtA, tgtB, dirA, dirB, homes, baseAlpha });
      };

      buildShardField(new THREE.IcosahedronGeometry(0.085, 0), isMobile ? 14 : 40, 1234, 1.0, 1.0);
      buildShardField(new THREE.OctahedronGeometry(0.075, 0), isMobile ? 12 : 32, 4211, 0.95, 0.9);
      buildShardField(new THREE.TetrahedronGeometry(0.115, 0), isMobile ? 6 : 16, 8807, 1.25, 0.85);

      // ── Nebula depth layer — huge soft color pools far behind ─────────
      const nebGeo = new THREE.PlaneGeometry(16, 16);
      const NEB_FRAG = /* glsl */ `
        uniform vec3 uColor;
        uniform float uOpacity;
        varying vec2 vUv;
        void main() {
          float d = distance(vUv, vec2(0.5));
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(uColor, a * a * uOpacity);
        }
      `;
      const NEB_VERT = /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;
      const nebDefs: { color: number; pos: [number, number, number]; s: number }[] = [
        { color: 0x17245f, pos: [-5, 2.5, -10], s: 1.4 },
        { color: 0x0d1744, pos: [6, -3, -12], s: 1.7 },
        { color: 0x7890ff, pos: [0, 4.5, -14], s: 1.9 },
      ];
      const nebulas = nebDefs.map((def, i) => {
        const mat = new THREE.ShaderMaterial({
          uniforms: { uColor: { value: new THREE.Color(def.color) }, uOpacity: { value: 0.06 } },
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          vertexShader: NEB_VERT,
          fragmentShader: NEB_FRAG,
        });
        const mesh = new THREE.Mesh(nebGeo, mat);
        mesh.position.set(def.pos[0], def.pos[1], def.pos[2]);
        mesh.scale.setScalar(def.s);
        mesh.renderOrder = -1;
        scene.add(mesh);
        return { mesh, mat, baseY: def.pos[1], baseX: def.pos[0], phase: i * 2.1 };
      });

      // ── Ink field — interactive plasma void (ported from dropz's ambient
      // fbm drift). A single huge plane far behind everything; a two-octave
      // noise field warps *toward the cursor* so the whole void breathes and
      // answers the hand, not just the sculpture. Additive + blue-only so it
      // deepens the black instead of washing it grey. This is the "living
      // background" layer — the dropz signature, re-themed to the palette ──
      const inkGeo = new THREE.PlaneGeometry(60, 38);
      const INK_FRAG = /* glsl */ `
        uniform float uTime;
        uniform vec2 uPointer;    // 0..1 screen space, y up
        uniform float uAspect;
        uniform vec3 uColorLo;
        uniform vec3 uColorHi;
        uniform float uOpacity;
        uniform float uEnergy;    // scroll/warp lifts the plasma
        varying vec2 vUv;

        float hash(vec2 p) {
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
        }
        float noise(vec2 p) {
          vec2 i = floor(p), f = fract(p);
          float a = hash(i), b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
        }
        float fbm(vec2 p) {
          float v = 0.0, amp = 0.5;
          for (int i = 0; i < 5; i++) { v += amp * noise(p); p *= 2.02; amp *= 0.55; }
          return v;
        }
        void main() {
          vec2 uv = vUv;
          uv.x *= uAspect;
          vec2 drift = vec2(uTime * 0.015, uTime * 0.011);
          // the cursor drags the field — a slow gravitational pull
          vec2 pull = (uPointer - 0.5) * (0.35 + uEnergy * 0.5);
          float n = fbm(uv * 2.2 + drift + pull);
          float n2 = fbm(uv * 3.9 - drift * 1.4 - pull * 0.6);
          float ink = smoothstep(0.34, 0.86, n * 0.6 + n2 * 0.4);
          // hot filaments where the two octaves peak together = plasma veins
          float veins = pow(ink, 4.0);
          vec3 col = mix(uColorLo, uColorHi, ink) * ink;
          col += uColorHi * veins * (0.6 + uEnergy * 0.9);
          // radial falloff keeps the frame edges dark (no flat wash)
          float vig = smoothstep(1.15, 0.25, length(vUv - 0.5) * 1.3);
          gl_FragColor = vec4(col, ink * vig * uOpacity * (1.0 + uEnergy * 0.6));
        }
      `;
      const inkUniforms = {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(0.5, 0.5) },
        uAspect: { value: window.innerWidth / window.innerHeight },
        uColorLo: { value: new THREE.Color(0x0b1232) },
        uColorHi: { value: new THREE.Color(0x7890ff) },
        uOpacity: { value: isMobile ? 0.18 : 0.22 },
        uEnergy: { value: 0 },
      };
      const inkMat = new THREE.ShaderMaterial({
        uniforms: inkUniforms,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
        vertexShader: NEB_VERT,
        fragmentShader: INK_FRAG,
      });
      const inkField = new THREE.Mesh(inkGeo, inkMat);
      inkField.position.set(0, 0, -18);
      inkField.renderOrder = -3; // behind nebulas (-1) and everything else
      inkField.frustumCulled = false;
      scene.add(inkField);

      // ── Aurora ribbons — two vast silk bands undulating far behind the
      // cloud; the volumetric depth cue that makes the void feel expensive ──
      const RIB_FRAG = /* glsl */ `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform float uOpacity;
        uniform float uTime;
        uniform float uPhase;
        varying vec2 vUv;
        void main() {
          // slow traveling wave bends the band; a second harmonic keeps it organic
          float flow = sin(vUv.x * 6.283 + uTime * 0.14 + uPhase
            + sin(vUv.x * 13.9 - uTime * 0.21 + uPhase) * 0.55);
          float band = exp(-pow((vUv.y - 0.5 - flow * 0.16) * 4.6, 2.0));
          // soft second ribbon ghosting above the first
          float band2 = exp(-pow((vUv.y - 0.62 - flow * 0.22) * 7.0, 2.0)) * 0.5;
          float edge = smoothstep(0.0, 0.16, vUv.x) * smoothstep(1.0, 0.84, vUv.x);
          vec3 col = mix(uColorA, uColorB, clamp(vUv.x + flow * 0.25, 0.0, 1.0));
          gl_FragColor = vec4(col, (band + band2) * edge * uOpacity);
        }
      `;
      const ribbonGeo = new THREE.PlaneGeometry(30, 8);
      const ribbonDefs = [
        { y: 2.6, z: -9.5, rz: 0.12, phase: 0, op: 0.045 },
        { y: -3.4, z: -12.5, rz: -0.09, phase: 2.4, op: 0.03 },
      ];
      const ribbons = ribbonDefs.map((def) => {
        const mat = new THREE.ShaderMaterial({
          uniforms: {
            uColorA: { value: new THREE.Color(0xb8c5ff) },
            uColorB: { value: new THREE.Color(0x7890ff) },
            uOpacity: { value: def.op },
            uTime: { value: 0 },
            uPhase: { value: def.phase },
          },
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          vertexShader: NEB_VERT,
          fragmentShader: RIB_FRAG,
        });
        const mesh = new THREE.Mesh(ribbonGeo, mat);
        mesh.position.set(0, def.y, def.z);
        mesh.rotation.z = def.rz;
        mesh.renderOrder = -1;
        scene.add(mesh);
        return { mesh, mat, baseY: def.y };
      });

      // ── Side veils — a second WebGL language, intentionally not particles.
      // Two translucent woven surfaces live just outside the central reading
      // column. Scroll twists their folds; the pointer changes their tension.
      // Normal alpha blending keeps them satin/glass, never another glow cloud.
      const VEIL_VERT = /* glsl */ `
        uniform float uTime;
        uniform float uScroll;
        uniform float uPointer;
        uniform float uSide;
        varying vec2 vUv;
        varying float vFold;
        void main() {
          vUv = uv;
          vec3 p = position;
          float longFold = sin(p.y * 0.72 + uTime * 0.22 + uScroll * 9.0 + uSide * 1.6);
          float crossFold = sin(p.x * 1.45 - uTime * 0.16 + uScroll * 5.0);
          float pointerTension = uPointer * uSide;
          p.z += longFold * (0.34 + abs(pointerTension) * 0.12) + crossFold * 0.15;
          p.x += sin(p.y * 0.38 + uScroll * 6.283) * 0.14 * uSide;
          p.x += pointerTension * (0.16 + uv.y * 0.12);
          vFold = longFold * 0.5 + crossFold * 0.25;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `;
      const VEIL_FRAG = /* glsl */ `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform float uOpacity;
        uniform float uEnergy;
        varying vec2 vUv;
        varying float vFold;
        void main() {
          float sideFade = smoothstep(0.0, 0.18, vUv.x) * smoothstep(1.0, 0.82, vUv.x);
          float endFade = smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.88, vUv.y);
          float ridge = pow(0.5 + 0.5 * vFold, 5.0);
          float contour = smoothstep(0.955, 1.0, 0.5 + 0.5 * sin((vUv.y + vFold * 0.035) * 74.0));
          vec3 color = mix(uColorA, uColorB, clamp(vUv.y + vFold * 0.12, 0.0, 1.0));
          float alpha = sideFade * endFade
            * (0.018 + ridge * 0.052 + contour * 0.026 + uEnergy * 0.018)
            * uOpacity;
          gl_FragColor = vec4(color, alpha);
        }
      `;
      const veilGeo = new THREE.PlaneGeometry(5.4, 12.5, 28, 56);
      const veilDefs = [
        { side: -1, x: -6.15, z: -2.8, ry: 0.58, phase: 0.0 },
        { side: 1, x: 6.15, z: -3.4, ry: -0.58, phase: 2.7 },
      ];
      const veils = veilDefs.map((def) => {
        const mat = new THREE.ShaderMaterial({
          uniforms: {
            uTime: { value: def.phase },
            uScroll: { value: 0 },
            uPointer: { value: 0 },
            uSide: { value: def.side },
            uColorA: { value: new THREE.Color(0x263a92) },
            uColorB: { value: new THREE.Color(0xc5d0ff) },
            uOpacity: { value: isMobile ? 0.48 : 0.9 },
            uEnergy: { value: 0 },
          },
          transparent: true,
          depthWrite: false,
          depthTest: true,
          side: THREE.DoubleSide,
          blending: THREE.NormalBlending,
          vertexShader: VEIL_VERT,
          fragmentShader: VEIL_FRAG,
        });
        const mesh = new THREE.Mesh(veilGeo, mat);
        mesh.position.set(def.x, 0, def.z);
        mesh.rotation.y = def.ry;
        mesh.rotation.z = def.side * 0.055;
        mesh.renderOrder = -1;
        scene.add(mesh);
        return { mesh, mat, baseX: def.x, baseRY: def.ry, side: def.side, phase: def.phase };
      });

      // ── Ambient starfield backdrop ────────────────────────────────────
      const STARS = isMobile ? 720 : 900;
      const starRnd = mulberry32(7777);
      const starPos = new Float32Array(STARS * 3);
      for (let i = 0; i < STARS; i++) {
        starPos[i * 3] = (starRnd() - 0.5) * 30;
        starPos[i * 3 + 1] = (starRnd() - 0.5) * 20;
        starPos[i * 3 + 2] = (starRnd() - 0.5) * 18 - 6;
      }
      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
      // per-star phase so the field twinkles instead of sitting frozen
      const starTw = new Float32Array(STARS);
      for (let i = 0; i < STARS; i++) starTw[i] = starRnd();
      starGeo.setAttribute("aTw", new THREE.BufferAttribute(starTw, 1));
      const starMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uPR: { value: basePR } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: /* glsl */ `
          attribute float aTw;
          uniform float uTime;
          uniform float uPR;
          varying float vA;
          varying float vTw;
          void main() {
            vTw = aTw;
            vA = 0.28 + 0.42 * (0.5 + 0.5 * sin(uTime * (0.5 + aTw * 1.3) + aTw * 41.0));
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            // wider size spread + bigger sprites so bright stars read as real
            // glowing points, not single flat pixels
            gl_PointSize = (1.6 + aTw * aTw * 4.0) * uPR;
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          varying float vA;
          varying float vTw;
          void main() {
            float d = distance(gl_PointCoord, vec2(0.5));
            if (d > 0.5) discard;
            // soft halo + hot core = a star that glows, not a dot
            float halo = exp(-d * d * 11.0);
            float core = smoothstep(0.14, 0.0, d);
            // 4-point diffraction spikes on the brightest stars — camera sparkle
            float spike = (pow(max(0.0, 1.0 - abs(gl_PointCoord.x - 0.5) * 2.0), 16.0)
              + pow(max(0.0, 1.0 - abs(gl_PointCoord.y - 0.5) * 2.0), 16.0)) * step(0.7, vTw);
            vec3 col = vec3(0.72, 0.84, 1.0) + vec3(0.22, 0.14, 0.06) * core;
            float a = (halo * 0.55 + core + spike * 0.6) * vA;
            gl_FragColor = vec4(col + spike * 0.35, a);
          }
        `,
      });
      const stars = new THREE.Points(starGeo, starMat);
      scene.add(stars);

      // ── Hyperspace streaks — invisible at rest; fast scrolling stretches
      // hidden stars into light-lines racing past the camera. Scroll speed
      // becomes literal speed ──────────────────────────────────────────────
      const WARP_N = isMobile ? 150 : 220;
      const wRnd = mulberry32(8811);
      const warpPos = new Float32Array(WARP_N * 2 * 3);
      const warpEnd = new Float32Array(WARP_N * 2);
      const warpSeed = new Float32Array(WARP_N * 2);
      for (let i = 0; i < WARP_N; i++) {
        const x = (wRnd() - 0.5) * 26;
        const y = (wRnd() - 0.5) * 16;
        const z = -13 + wRnd() * 15;
        const sd = wRnd();
        for (let v = 0; v < 2; v++) {
          warpPos[(i * 2 + v) * 3] = x;
          warpPos[(i * 2 + v) * 3 + 1] = y;
          warpPos[(i * 2 + v) * 3 + 2] = z;
          warpEnd[i * 2 + v] = v;
          warpSeed[i * 2 + v] = sd;
        }
      }
      const warpGeo = new THREE.BufferGeometry();
      warpGeo.setAttribute("position", new THREE.BufferAttribute(warpPos, 3));
      warpGeo.setAttribute("aEnd", new THREE.BufferAttribute(warpEnd, 1));
      warpGeo.setAttribute("aSeed", new THREE.BufferAttribute(warpSeed, 1));
      const warpMat = new THREE.ShaderMaterial({
        uniforms: { uWarp: { value: 0 }, uColor: { value: new THREE.Color(0.48, 0.58, 1.0) } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: /* glsl */ `
          attribute float aEnd;
          attribute float aSeed;
          uniform float uWarp;
          varying float vA;
          void main() {
            vec3 pos = position;
            // tail vertex streaks toward the lens — perspective turns the
            // z-stretch into radial speed-lines from the vanishing point
            pos.z += aEnd * uWarp * (1.6 + aSeed * 4.2);
            vA = uWarp * (0.22 + aSeed * 0.45) * (1.0 - aEnd * 0.85);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          varying float vA;
          void main() {
            gl_FragColor = vec4(uColor, vA);
          }
        `,
      });
      const warpLines = new THREE.LineSegments(warpGeo, warpMat);
      warpLines.frustumCulled = false;
      scene.add(warpLines);

      // ── Foreground glass shrapnel — angular slivers drifting in front of
      // the cloud; the third depth layer that sells the parallax. Blades,
      // not discs: soft grey bokeh circles read cheap on the dark void ──
      const DUST = isMobile ? 48 : 90;
      const dustRnd = mulberry32(3131);
      const dustPos = new Float32Array(DUST * 3);
      const dustSize = new Float32Array(DUST);
      const dustSeed = new Float32Array(DUST);
      for (let i = 0; i < DUST; i++) {
        dustPos[i * 3] = (dustRnd() - 0.5) * 15;
        dustPos[i * 3 + 1] = (dustRnd() - 0.5) * 9;
        dustPos[i * 3 + 2] = 2.2 + dustRnd() * 3.4; // between cloud and camera
        dustSize[i] = 10 + dustRnd() * 30;
        dustSeed[i] = dustRnd() * 100;
      }
      const dustGeo = new THREE.BufferGeometry();
      dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
      dustGeo.setAttribute("aSize", new THREE.BufferAttribute(dustSize, 1));
      dustGeo.setAttribute("aSeed", new THREE.BufferAttribute(dustSeed, 1));
      const dustUniforms = {
        uColor: { value: new THREE.Color(SHAPES[0].color[0], SHAPES[0].color[1], SHAPES[0].color[2]) },
        uOpacity: { value: 0.14 },
        uTime: { value: 0 },
        uScale: { value: (isMobile ? 46 : 40) * basePR },
      };
      const dustMat = new THREE.ShaderMaterial({
        uniforms: dustUniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: /* glsl */ `
          attribute float aSize;
          attribute float aSeed;
          uniform float uTime;
          uniform float uScale;
          varying float vSeed;
          void main() {
            vSeed = aSeed;
            vec3 pos = position;
            pos.y += sin(uTime * 0.11 + aSeed * 6.283) * 0.5;
            pos.x += cos(uTime * 0.08 + aSeed * 4.71) * 0.4;
            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = aSize * uScale / -mv.z;
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          uniform float uOpacity;
          uniform float uTime;
          varying float vSeed;
          void main() {
            // each sprite is a slowly tumbling glass sliver — sharp diamond
            // silhouette with a hot electric edge, faceted two-tone fill
            vec2 uv = gl_PointCoord - 0.5;
            float ang = vSeed * 6.283 + uTime * (0.05 + fract(vSeed * 7.31) * 0.08);
            float ca = cos(ang);
            float sa = sin(ang);
            uv = mat2(ca, -sa, sa, ca) * uv;
            // elongated diamond metric — a blade, not a disc
            float dx = abs(uv.x) * 1.15 + abs(uv.y) * 3.4;
            float body = 1.0 - smoothstep(0.3, 0.34, dx);
            if (body <= 0.0) discard;
            // silhouette rim runs hotter than the fill = lit glass edge
            float edge = smoothstep(0.18, 0.32, dx) * body;
            // hard facet split across the long axis catches the key light
            float facet = 0.55 + 0.45 * step(0.0, uv.x * uv.y);
            vec3 col = uColor * (0.4 + facet * 0.5) + vec3(0.35, 0.55, 1.0) * edge * 1.5;
            gl_FragColor = vec4(col, (body * 0.42 + edge * 1.1) * uOpacity);
          }
        `,
      });
      const dust = new THREE.Points(dustGeo, dustMat);
      dust.frustumCulled = false;
      scene.add(dust);

      // ── Shooting streaks — a thin light occasionally crosses the deep bg ──
      const streakGeo = new THREE.PlaneGeometry(3.2, 0.028);
      const STREAK_COUNT = isMobile ? 2 : 3;
      const stRnd = mulberry32(5151);
      const streaks: {
        mesh: InstanceType<typeof THREE.Mesh>;
        mat: InstanceType<typeof THREE.ShaderMaterial>;
        from: InstanceType<typeof THREE.Vector3>;
        to: InstanceType<typeof THREE.Vector3>;
        u: number;
        wait: number;
        dur: number;
      }[] = [];
      const streakSpawn = (s: (typeof streaks)[number], first: boolean) => {
        const x = -10 + stRnd() * 6;
        const y = 1.5 + stRnd() * 4;
        const ang = -0.32 - stRnd() * 0.3;
        const len = 11 + stRnd() * 5;
        s.from.set(x, y, -8 - stRnd() * 3);
        s.to.set(x + Math.cos(ang) * len, y + Math.sin(ang) * len, s.from.z);
        s.mesh.rotation.z = ang;
        s.u = 0;
        s.dur = 1.1 + stRnd() * 0.7;
        s.wait = first ? 2 + stRnd() * 6 : 4 + stRnd() * 9;
      };
      for (let i = 0; i < STREAK_COUNT; i++) {
        const mat = new THREE.ShaderMaterial({
          uniforms: { uColor: { value: new THREE.Color(0.38, 0.48, 0.95) }, uAlpha: { value: 0 } },
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          vertexShader: NEB_VERT,
          fragmentShader: /* glsl */ `
            uniform vec3 uColor;
            uniform float uAlpha;
            varying vec2 vUv;
            void main() {
              float tail = pow(vUv.x, 2.4);
              float edge = smoothstep(0.5, 0.06, abs(vUv.y - 0.5));
              gl_FragColor = vec4(uColor + vec3(0.5), tail * edge * uAlpha);
            }
          `,
        });
        const mesh = new THREE.Mesh(streakGeo, mat);
        scene.add(mesh);
        const s = { mesh, mat, from: new THREE.Vector3(), to: new THREE.Vector3(), u: 0, wait: 0, dur: 1.3 };
        streakSpawn(s, true);
        streaks.push(s);
      }

      // ── Laser grid floor — a vast perspective tech-grid buried far below
      // the sculpture; hard right angles anchor the void and surge with
      // scroll warp. The angular counterweight to all the particle glow ──
      const gridGeo = new THREE.PlaneGeometry(90, 46);
      const gridMat = new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(0x7890ff) },
          uOpacity: { value: 0.035 },
          uTime: { value: 0 },
          uWarp: { value: 0 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: NEB_VERT,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          uniform float uOpacity;
          uniform float uTime;
          uniform float uWarp;
          varying vec2 vUv;
          void main() {
            vec2 g = vec2(vUv.x * 60.0, vUv.y * 30.0);
            // grid streams toward the camera; warp slams the throttle
            g.y -= uTime * 0.12 + uWarp * 1.4;
            vec2 f = abs(fract(g) - 0.5);
            float line = max(smoothstep(0.44, 0.5, f.x), smoothstep(0.44, 0.5, f.y));
            // energy pulse sweeping down the grid every few seconds
            float pulse = exp(-pow(fract(vUv.y * 3.0 - uTime * 0.07) * 6.0 - 1.2, 2.0)) * 0.5;
            float fadeX = smoothstep(0.0, 0.3, vUv.x) * smoothstep(1.0, 0.7, vUv.x);
            float fadeY = smoothstep(0.02, 0.3, vUv.y) * smoothstep(1.0, 0.6, vUv.y);
            float a = line * (0.55 + pulse) * fadeX * fadeY * uOpacity;
            gl_FragColor = vec4(uColor + vec3(0.25, 0.4, 0.9) * pulse, a);
          }
        `,
      });
      const grid = new THREE.Mesh(gridGeo, gridMat);
      grid.rotation.x = -Math.PI / 2;
      grid.position.set(0, -5.6, -6);
      grid.renderOrder = -1;
      scene.add(grid);

      // ── Core glow — the cloud reads as lit from within ────────────────
      const coreMat = new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color(SHAPES[0].color[0], SHAPES[0].color[1], SHAPES[0].color[2]) }, uOpacity: { value: 0.13 } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: NEB_VERT,
        fragmentShader: NEB_FRAG,
      });
      const core = new THREE.Mesh(nebGeo, coreMat);
      core.position.set(0, 0, -2.2);
      core.scale.setScalar(0.5);
      core.renderOrder = -1;
      scene.add(core);

      // god-ray light source — small hot disc buried behind the cloud; the
      // post pass streaks volumetric shafts from it through the particles
      const sunMat = new THREE.MeshBasicMaterial({
        color: 0xdbe3ff,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      });
      const sunGeo = new THREE.CircleGeometry(0.42, 32);
      const sun = new THREE.Mesh(sunGeo, sunMat);
      sun.position.set(0, 0.4, -2.6);
      sun.renderOrder = -2;
      // god rays are gone, so the sun mesh never enters the scene — a bare
      // pale disc is exactly the "basic circle" this palette bans. The mesh
      // still exists because the flare/core choreography reads its transform.

      // anamorphic flare — thin horizontal light bar across the core;
      // the cinema-lens signature on every bright source
      const flareMat = new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color(0.55, 0.65, 1.0) }, uOpacity: { value: 0.08 } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: NEB_VERT,
        fragmentShader: NEB_FRAG,
      });
      const flare = new THREE.Mesh(nebGeo, flareMat);
      flare.position.set(0, 0, -2.1);
      flare.scale.set(0.9, 0.045, 1);
      flare.renderOrder = -1;
      scene.add(flare);

      // ── Interaction ───────────────────────────────────────────────────
      let mouseX = 0;
      let mouseY = 0;
      let targetMX = 0;
      let targetMY = 0;
      const onMove = (e: PointerEvent) => {
        targetMX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMY = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      // services index hover → the cloud re-knits into that service's shape.
      // Two override slots ping-pong: a new hover loads the *far* slot and
      // uOvBlend crossfades to it, so switching rows morphs instead of
      // snapping the target buffer under an already-visible override
      let override: MorphOverride = null;
      let overrideMix = 0;
      let overrideGen = -1;
      let ovBlendTarget = 0; // 0 → aTargetC holds the shape, 1 → aTargetD
      let ovBlend = 0;
      let ovAngTarget = 0; // per-service camera nudge — scene "turns to look"
      const ovColor = new THREE.Color();
      const ovColorB = new THREE.Color();
      const loadOvSlot = (slotIdx: number, gen: number) => {
        const slot = slotIdx === 0 ? tgtC : tgtD;
        (slot.array as Float32Array).set(shapes[gen]);
        slot.needsUpdate = true;
        // no shape uses the ocean-wave undulation in the story sequence
        if (slotIdx === 0) cloudUniforms.uWaveC.value = 0;
        else cloudUniforms.uWaveD.value = 0;
      };
      const onMorph = (e: Event) => {
        const detail = (e as CustomEvent<MorphOverride>).detail ?? null;
        override = detail;
        if (!detail) return;
        if (detail.gen !== overrideGen) {
          overrideGen = detail.gen;
          if (overrideMix < 0.05 || Math.abs(ovBlend - ovBlendTarget) > 0.65) {
            // override not visible yet, or a flip just started and the
            // destination slot still carries almost no weight — overwrite
            // the facing slot in place, no visible pop
            loadOvSlot(ovBlendTarget, detail.gen);
          } else {
            // live switch: load the far slot and crossfade to it
            ovBlendTarget = ovBlendTarget === 0 ? 1 : 0;
            loadOvSlot(ovBlendTarget, detail.gen);
          }
          ovAngTarget = Math.sin(detail.gen * 1.7) * 0.14;
        }
        ovColor.setRGB(detail.color[0], detail.color[1], detail.color[2]);
        ovColorB.setRGB(detail.color2[0], detail.color2[1], detail.color2[2]);
      };
      window.addEventListener("v4:morph", onMorph);

      // projects strip re-tints the palette per project (color only —
      // shape and alpha stay scroll-driven so screenshots keep the stage)
      let tintActive = false;
      let tintMix = 0;
      const tintColor = new THREE.Color();
      const tintColorB = new THREE.Color();
      const onTint = (e: Event) => {
        const d = (e as CustomEvent<{ color: number[]; color2: number[] } | null>).detail ?? null;
        tintActive = !!d;
        if (d) {
          tintColor.setRGB(d.color[0], d.color[1], d.color[2]);
          tintColorB.setRGB(d.color2[0], d.color2[1], d.color2[2]);
        }
      };
      window.addEventListener("v4:tint", onTint);

      // Mobile-first direct manipulation. The page may keep scrolling, but
      // every drag also grabs the sculpture: X rotates/pans it, Y tilts/lifts
      // it, and release leaves physical angular momentum instead of stopping.
      let spinVel = 0;
      let lastTX: number | null = null;
      let lastTY: number | null = null;
      let touchActive = false;
      let touchPitch = 0;
      let touchPitchTarget = 0;
      let touchPanX = 0;
      let touchPanY = 0;
      let touchPanTargetX = 0;
      let touchPanTargetY = 0;
      const onTouchStart = (e: TouchEvent) => {
        const tch = e.touches[0];
        if (!tch) return;
        touchActive = true;
        lastTX = tch.clientX;
        lastTY = tch.clientY;
      };
      const onTouchMove = (e: TouchEvent) => {
        const tch = e.touches[0];
        if (!tch) return;
        targetMX = (tch.clientX / window.innerWidth - 0.5) * 2;
        targetMY = (tch.clientY / window.innerHeight - 0.5) * 2;
        if (lastTX !== null && lastTY !== null) {
          const dx = tch.clientX - lastTX;
          const dy = tch.clientY - lastTY;
          spinVel += dx * 0.00125;
          touchPitchTarget = Math.max(-0.5, Math.min(0.5, touchPitchTarget + dy * 0.0028));
          touchPanTargetX = Math.max(-1.35, Math.min(1.35, touchPanTargetX + dx * 0.007));
          touchPanTargetY = Math.max(-0.9, Math.min(0.9, touchPanTargetY - dy * 0.004));
        }
        lastTX = tch.clientX;
        lastTY = tch.clientY;
      };
      const onTouchEnd = () => {
        touchActive = false;
        lastTX = null;
        lastTY = null;
      };
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      if (coarse) {
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: true });
        window.addEventListener("touchend", onTouchEnd, { passive: true });
      }

      // press-and-hold gathers the swarm to the pointer (uAttract ramps in
      // the shader); release fires the shockwave from that exact spot — a
      // tap still reads as an instant burst
      let shockAt = -1;
      let holdOn = false;
      let holdT0 = 0;
      const shockNdc = new THREE.Vector3();
      const fireShock = (cx: number, cy: number) => {
        shockNdc
          .set((cx / window.innerWidth - 0.5) * 2, -((cy / window.innerHeight - 0.5) * 2), 0.5)
          .unproject(camera);
        const dir = shockNdc.sub(camera.position).normalize();
        if (Math.abs(dir.z) < 0.001) return;
        const tt = -camera.position.z / dir.z;
        (cloudUniforms.uShockPos.value as InstanceType<typeof THREE.Vector3>)
          .copy(camera.position)
          .addScaledVector(dir, tt);
        shockAt = (performance.now() - startTime) / 1000;
      };
      const onPress = () => {
        holdOn = true;
        holdT0 = performance.now();
      };
      const onRelease = (e: PointerEvent) => {
        if (!holdOn) return;
        holdOn = false;
        fireShock(e.clientX, e.clientY);
      };
      const onPressCancel = () => {
        holdOn = false;
      };
      window.addEventListener("pointerdown", onPress, { passive: true });
      window.addEventListener("pointerup", onRelease, { passive: true });
      window.addEventListener("pointercancel", onPressCancel, { passive: true });

      prog(0.6); // geometry + attributes live, shaders not yet compiled

      // big-bang intro arms when the preloader lifts
      let introOn = false;
      const startIntro = () => {
        introOn = true;
      };
      window.addEventListener("v4:ready", startIntro, { once: true });
      const introFallback = window.setTimeout(startIntro, 2800);
      let introMix = 0;
      let firstFrameDone = false;

      // mobile: tilt the phone instead of moving a mouse (Android fires
      // freely; iOS needs a user-gesture permission we don't prompt for)
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      const onOrient = (e: DeviceOrientationEvent) => {
        if (touchActive) return;
        if (e.gamma === null || e.beta === null) return;
        targetMX = Math.max(-1, Math.min(1, e.gamma / 28));
        targetMY = Math.max(-1, Math.min(1, (e.beta - 45) / 28));
      };
      if (isTouch) window.addEventListener("deviceorientation", onOrient, { passive: true });

      // Cinematic post chain. Mobile gets the lightweight cut: one LDR bloom
      // plus vignette, no SMAA or chromatic pass. This keeps the "film" depth
      // where most visitors actually are without paying desktop GPU cost.
      let composer: { render: () => void; setSize: (w: number, h: number) => void; dispose: () => void } | null = null;
      // lens pack: subtle chromatic fringing that breathes with scroll speed
      let caOffset: { set: (x: number, y: number) => void } | null = null;
      // live handle on bloom so morphs/shocks/warp can pulse it
      let bloomFx: { intensity: number } | null = null;
      try {
        const PP = await import("postprocessing");
        if (disposed) return;
        const c = new PP.EffectComposer(renderer, {
          frameBufferType: isMobile ? THREE.UnsignedByteType : THREE.HalfFloatType,
        });
        c.addPass(new PP.RenderPass(scene, camera));
        if (!isMobile) {
          // SMAA smooths shard edges and line layers — the "shot in 8K" edge
          try {
            const smaa = new PP.SMAAEffect({ preset: PP.SMAAPreset.HIGH });
            c.addPass(new PP.EffectPass(camera, smaa));
          } catch {
            /* AA is decoration — skip if the preset API shifts */
          }
        }
        const bloom = new PP.BloomEffect({
          intensity: isMobile ? 0.74 : 0.9,
          luminanceThreshold: isMobile ? 0.5 : 0.56,
          luminanceSmoothing: isMobile ? 0.24 : 0.3,
          mipmapBlur: false,
          radius: isMobile ? 0.52 : 0.68,
        });
        bloomFx = bloom;
        const vignette = new PP.VignetteEffect({
          darkness: isMobile ? 0.62 : 0.52,
          offset: isMobile ? 0.22 : 0.28,
        });
        if (isMobile) {
          c.addPass(new PP.EffectPass(camera, bloom, vignette));
        } else {
          const ca = new PP.ChromaticAberrationEffect({
            offset: new THREE.Vector2(0.0006, 0.0006),
            radialModulation: true,
            modulationOffset: 0.4,
          });
          caOffset = ca.offset;
          c.addPass(new PP.EffectPass(camera, bloom, ca, vignette));
        }
        c.setSize(window.innerWidth, window.innerHeight);
        composer = c;
      } catch {
        composer = null; // effects are decoration — plain render is the fallback
      }
      prog(0.85); // post chain built — first compile + frame still pending

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer?.setSize(window.innerWidth, window.innerHeight);
        inkUniforms.uAspect.value = window.innerWidth / window.innerHeight;
      };
      window.addEventListener("resize", onResize);

      // adaptive resolution — drop render scale where the cloud recedes
      // behind real content (projects / services), restore when it returns;
      // hysteresis so the framebuffer isn't reallocated every frame
      let lowRes = false;
      const applyResolution = () => {
        const pr = lowRes ? basePR * 0.72 : basePR;
        renderer.setPixelRatio(pr);
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer?.setSize(window.innerWidth, window.innerHeight);
        cloudUniforms.uScale.value = (isMobile ? 46 : 40) * pr;
        dustUniforms.uScale.value = (isMobile ? 46 : 40) * pr;
        headMat.uniforms.uScale.value = (isMobile ? 46 : 40) * pr;
        starMat.uniforms.uPR.value = pr;
        // thin the shard field where the cloud already recedes behind content —
        // instanceCount is free to change, no buffers are reallocated
        for (let i = 0; i < shardFields.length; i++) {
          const f = shardFields[i];
          f.geo.instanceCount = lowRes ? Math.ceil(f.count * 0.6) : f.count;
        }
      };

      let raf = 0;
      let running = true;
      const startTime = performance.now();
      const onVisibility = () => {
        running = document.visibilityState === "visible";
        if (running) {
          raf = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(raf);
        }
      };
      document.addEventListener("visibilitychange", onVisibility);

      // integrated GPUs drop the context on long sessions — stop cleanly,
      // resume when the browser hands it back
      const onContextLost = (e: Event) => {
        e.preventDefault();
        running = false;
        cancelAnimationFrame(raf);
      };
      const onContextRestored = () => {
        running = document.visibilityState === "visible";
        if (running) raf = requestAnimationFrame(tick);
      };
      canvas.addEventListener("webglcontextlost", onContextLost);
      canvas.addEventListener("webglcontextrestored", onContextRestored);

      const tmpColor = new THREE.Color();
      const tmpColorB = new THREE.Color();
      const tmpBg = new THREE.Color();
      const pointerNdc = new THREE.Vector3();
      const pointerWorld = new THREE.Vector3();
      const prevPointer = new THREE.Vector3(0, 0, 0);
      let pointerVel = 0;
      let ovAng = 0;
      let arrivalAt = -9;
      let prevRawMix = 0;
      let smoothedProgress = 0;
      let lastScrollY = window.scrollY;
      let smoothedVel = 0;
      let scrollImpulse = 0;
      let warp = 0;
      let prevAng = SHAPES[0].camA;
      let bank = 0;
      let attract = 0;
      let spinOffset = 0;
      let stops = measureStops();
      let measuredHeight = document.documentElement.scrollHeight;
      let currentSeg = -1;
      let currentBeat = -1;

      let lastT = 0;
      const tick = () => {
        if (!running || disposed) return;
        const t = (performance.now() - startTime) / 1000;
        const dt = Math.min(t - lastT, 0.05);
        lastT = t;

        const doc = document.documentElement;
        // pin spacers change the page height after ScrollTrigger init —
        // re-measure section stops whenever layout height moves
        if (doc.scrollHeight !== measuredHeight) {
          measuredHeight = doc.scrollHeight;
          stops = measureStops();
        }

        const max = doc.scrollHeight - window.innerHeight;
        const raw = max > 0 ? window.scrollY / max : 0;
        smoothedProgress += (raw - smoothedProgress) * 0.07;
        const p = smoothedProgress;

        // segment + eased mix
        const last = SHAPES.length - 1;
        let seg = 0;
        while (seg < last - 1 && stops[seg + 1] < p) seg++;
        const a = SHAPES[seg];
        const b = SHAPES[Math.min(seg + 1, last)];
        const span = stops[Math.min(seg + 1, last)] - stops[seg] || 1;
        const rawMix = Math.min(Math.max((p - stops[seg]) / span, 0), 1);
        const m = rawMix * rawMix * (3 - 2 * rawMix);

        // segment changed → upload the two active shape targets once;
        // per-frame morphing happens entirely in the vertex shader
        if (seg !== currentSeg) {
          const enteringNewChapter = currentSeg >= 0;
          currentSeg = seg;
          (tgtA.array as Float32Array).set(shapes[a.gen]);
          (tgtB.array as Float32Array).set(shapes[b.gen]);
          tgtA.needsUpdate = true;
          tgtB.needsUpdate = true;
          cloudUniforms.uWaveA.value = a.wave;
          cloudUniforms.uWaveB.value = b.wave;
          // suppress a false arrival from the mix value jumping across segments
          prevRawMix = rawMix;
          if (enteringNewChapter && isMobile) {
            spinVel += seg % 2 === 0 ? 0.022 : -0.022;
          }
        }
        cloudUniforms.uMix.value = rawMix;

        // arrival beat — the frame a morph settles, the scene acknowledges
        // it (flare pop, particle flash, bloom breath)
        if (rawMix >= 0.9 && prevRawMix < 0.9) {
          arrivalAt = t;
          if (isMobile) fireShock(window.innerWidth * 0.5, window.innerHeight * 0.46);
        }
        prevRawMix = rawMix;

        // scroll velocity agitates the cloud — fast scroll, restless particles
        const scrollDelta = window.scrollY - lastScrollY;
        const dy = Math.abs(scrollDelta);
        lastScrollY = window.scrollY;
        smoothedVel += (Math.min(dy, 120) - smoothedVel) * 0.08;
        const impulseTarget = Math.max(-1, Math.min(1, scrollDelta / 72));
        scrollImpulse += (impulseTarget - scrollImpulse) * (dy > 1 ? 0.16 : 0.06);
        cloudUniforms.uAgitation.value = Math.min(smoothedVel * 0.0018, 0.18);

        // rotation — round shapes spin, flat shapes face the camera;
        // disc/surface shapes get a fixed downward-view tilt instead.
        // Scroll progress scrubs extra rotation on top of the idle spin, so
        // the visitor's hand literally turns the sculpture
        const rot = a.rot + (b.rot - a.rot) * m;
        const tilt = a.tilt + (b.tilt - a.tilt) * m;
        // swipe torque: horizontal flicks keep spinning the sculpture with
        // momentum, decaying like a struck globe
        spinVel = Math.max(-0.12, Math.min(0.12, spinVel));
        spinOffset += spinVel;
        spinVel *= coarse ? 0.965 : 0.94;
        touchPitch += (touchPitchTarget - touchPitch) * 0.12;
        touchPanX += (touchPanTargetX - touchPanX) * 0.12;
        touchPanY += (touchPanTargetY - touchPanY) * 0.12;
        if (!touchActive) {
          touchPitchTarget *= 0.982;
          touchPanTargetX *= 0.978;
          touchPanTargetY *= 0.978;
        }
        cloud.rotation.y = t * 0.22 * rot + p * 1.45 * rot + spinOffset;
        cloud.rotation.x = tilt + Math.sin(t * 0.1) * 0.045 * rot + touchPitch;
        cloud.rotation.z = Math.sin(t * 0.16) * 0.065 * rot + scrollImpulse * 0.045;

        // narrow viewports: side offsets would push the cloud off screen
        const xFactor = isMobile ? 0.35 : 1;
        cloud.position.x +=
          ((a.x + (b.x - a.x) * m) * xFactor + touchPanX - cloud.position.x) * 0.08;
        cloud.position.y += (touchPanY + Math.sin(t * 0.27) * 0.12 - cloud.position.y) * 0.08;

        mouseX += (targetMX - mouseX) * 0.05;
        mouseY += (targetMY - mouseY) * 0.05;

        // scroll velocity → hyperspace warp. Dead zone keeps a slow reading
        // scroll perfectly calm; a real flick punches the drive
        const warpTarget = Math.min(
          Math.max((smoothedVel - (isMobile ? 16 : 30)) / (isMobile ? 72 : 105), 0),
          isMobile ? 0.72 : 0.54,
        );
        warp += (warpTarget - warp) * (warpTarget > warp ? 0.09 : 0.05);
        cloudUniforms.uWarp.value = warp;
        warpMat.uniforms.uWarp.value = warp;

        // press-and-hold gathers the swarm; ramp eases so it feels magnetic
        const attractOn = holdOn && performance.now() - holdT0 > 260;
        attract += ((attractOn ? 1 : 0) - attract) * 0.09;
        cloudUniforms.uAttract.value = attract;

        // shared event energies: mid-morph beat + decaying shock impulse +
        // arrival flash the moment a shape settles
        const morphE = rawMix * (1 - rawMix) * 4;
        const shockAge = shockAt >= 0 ? t - shockAt : 99;
        const shockE = shockAge < 3 ? Math.exp(-shockAge * 1.7) : 0;
        const arrAge = t - arrivalAt;
        const arrE = arrAge >= 0 && arrAge < 1.5 ? Math.exp(-arrAge * 3.5) : 0;
        cloudUniforms.uArrival.value = arrE;

        // camera rides an orbit arc between sections — a crane move, not an
        // elevator. Mid-morph the lens dives by the section's `dive` depth:
        // small = vertigo beat, large (manifesto, services) = a full
        // fly-through of the particle field. Hovered services nudge the
        // orbit so the scene "turns to look" at each one
        const orbitR =
          a.camZ + (b.camZ - a.camZ) * m
          + Math.sin(t * 0.35) * 0.22
          - morphE * a.dive
          - Math.abs(scrollImpulse) * (isMobile ? 0.48 : 0.26);
        const ang = a.camA + (b.camA - a.camA) * m + ovAng * overrideMix;
        const craneY = a.camY + (b.camY - a.camY) * m;
        camera.position.x +=
          (Math.sin(ang) * orbitR * 0.62
            + mouseX * 0.58
            + scrollImpulse * (isMobile ? 0.52 : 0.24)
            - camera.position.x) * 0.075;
        camera.position.y +=
          (craneY - mouseY * 0.4 - scrollImpulse * (isMobile ? 0.3 : 0.16) - camera.position.y) * 0.075;
        camera.position.z +=
          (Math.cos(ang * 0.72) * orbitR - Math.abs(scrollImpulse) * 0.32 - camera.position.z) * 0.075;
        camera.position.z -= shockAge < 2 ? Math.exp(-shockAge * 3.2) * 0.3 : 0;
        camera.fov +=
          (42 + warp * (isMobile ? 6 : 4) + morphE * 2.2 + Math.abs(scrollImpulse) * 2.4 - camera.fov) * 0.1;
        camera.updateProjectionMatrix();
        camera.lookAt(cloud.position.x * 0.42, cloud.position.y * 0.32, 0);
        // banking roll leans into the orbit swing — handheld cinema, not a tripod
        bank +=
          (Math.max(-0.03, Math.min(0.03, (ang - prevAng) * 12 + scrollImpulse * 0.022)) - bank) * 0.065;
        prevAng = ang;
        camera.rotation.z = Math.sin(t * 0.08) * 0.006 + bank;

        // project the cursor onto the z=0 plane the cloud lives around,
        // smoothed so the repulsion pocket glides after the hand
        pointerNdc.set(targetMX, -targetMY, 0.5).unproject(camera);
        const pDir = pointerNdc.sub(camera.position).normalize();
        if (Math.abs(pDir.z) > 0.001) {
          const pT = -camera.position.z / pDir.z;
          pointerWorld.copy(camera.position).addScaledVector(pDir, pT);
          cloudUniforms.uPointer.value.lerp(pointerWorld, 0.12);
        }
        // gesture energy: how fast the (smoothed) pocket is moving drives
        // the wake width + heat in the shader
        const pv = cloudUniforms.uPointer.value.distanceTo(prevPointer) / Math.max(dt, 0.008);
        prevPointer.copy(cloudUniforms.uPointer.value);
        pointerVel += (Math.min(pv * 0.1, 1) - pointerVel) * 0.12;
        cloudUniforms.uPointerVel.value = pointerVel;

        // hover override eases in/out; palette + opacity follow it so the
        // receded services cloud lights back up while a shape is forced
        overrideMix += ((override ? 1 : 0) - overrideMix) * 0.07;
        cloudUniforms.uOverride.value = overrideMix;
        // slot crossfade + camera nudge glide after the hovered service
        ovBlend += (ovBlendTarget - ovBlend) * 0.08;
        cloudUniforms.uOvBlend.value = ovBlend;
        ovAng += (ovAngTarget - ovAng) * 0.06;

        // intro blooms open over ~2s once the preloader lifts
        introMix += ((introOn ? 1 : 0) - introMix) * 0.03;
        cloudUniforms.uIntro.value = introMix;

        // live shockwave clock; -1 parks the ring
        cloudUniforms.uShockT.value = shockAt >= 0 && t - shockAt < 3 ? t - shockAt : -1;

        tintMix += ((tintActive ? 1 : 0) - tintMix) * 0.06;

        tmpColor.setRGB(
          a.color[0] + (b.color[0] - a.color[0]) * m,
          a.color[1] + (b.color[1] - a.color[1]) * m,
          a.color[2] + (b.color[2] - a.color[2]) * m,
        );
        if (overrideMix > 0.001) tmpColor.lerp(ovColor, overrideMix);
        if (tintMix > 0.001) tmpColor.lerp(tintColor, tintMix * 0.85);
        cloudUniforms.uColor.value.lerp(tmpColor, 0.08);
        tmpColorB.setRGB(
          a.color2[0] + (b.color2[0] - a.color2[0]) * m,
          a.color2[1] + (b.color2[1] - a.color2[1]) * m,
          a.color2[2] + (b.color2[2] - a.color2[2]) * m,
        );
        if (overrideMix > 0.001) tmpColorB.lerp(ovColorB, overrideMix);
        if (tintMix > 0.001) tmpColorB.lerp(tintColorB, tintMix * 0.85);
        cloudUniforms.uColorB.value.lerp(tmpColorB, 0.08);
        const baseAlpha = a.alpha + (b.alpha - a.alpha) * m;
        const alpha = baseAlpha + (0.72 - baseAlpha) * overrideMix;
        cloudUniforms.uOpacity.value += (alpha - cloudUniforms.uOpacity.value) * 0.08;
        cloudUniforms.uTime.value = t;

        if (!lowRes && cloudUniforms.uOpacity.value < 0.28) {
          lowRes = true;
          applyResolution();
        } else if (lowRes && cloudUniforms.uOpacity.value > 0.34) {
          lowRes = false;
          applyResolution();
        }

        // chapter grading — the void itself shifts mood per section:
        // ink black → cobalt haze → near-black silver (CTA)
        tmpBg.setRGB(
          a.bg[0] + (b.bg[0] - a.bg[0]) * m,
          a.bg[1] + (b.bg[1] - a.bg[1]) * m,
          a.bg[2] + (b.bg[2] - a.bg[2]) * m,
        );
        (scene.background as InstanceType<typeof THREE.Color>).lerp(tmpBg, 0.04);

        stars.rotation.y = t * 0.008;
        stars.position.y = p * 2.5;
        starMat.uniforms.uTime.value = t;

        // ink field: living plasma void follows the cursor + section palette,
        // and surges with scroll energy (warp) so fast scrolling ignites it
        inkUniforms.uTime.value = t;
        inkUniforms.uPointer.value.set(0.5 + mouseX * 0.5, 0.5 - mouseY * 0.5);
        inkUniforms.uEnergy.value = warp;
        inkUniforms.uColorHi.value.lerp(tmpColor, 0.02);
        inkField.position.x = cloud.position.x * 0.3;

        // nebulas drift slowly and take on the section palette
        for (let i = 0; i < nebulas.length; i++) {
          const nb = nebulas[i];
          nb.mesh.position.y = nb.baseY + Math.sin(t * 0.05 + nb.phase) * 0.9 + p * 1.4;
          nb.mesh.position.x = nb.baseX + Math.cos(t * 0.04 + nb.phase) * 0.7;
          if (i === 0) nb.mat.uniforms.uColor.value.lerp(tmpColor, 0.005);
        }

        // aurora ribbons breathe, drift with scroll, and slowly re-dye
        // themselves in the section palette
        for (let i = 0; i < ribbons.length; i++) {
          const rb = ribbons[i];
          rb.mat.uniforms.uTime.value = t;
          rb.mesh.position.y = rb.baseY + Math.sin(t * 0.045 + i * 2.2) * 0.6 + p * 2.0;
          rb.mat.uniforms.uColorA.value.lerp(i === 0 ? tmpColor : tmpColorB, 0.01);
          rb.mat.uniforms.uColorB.value.lerp(tmpColorB, 0.008);
        }

        // Woven side surfaces twist through the page as one continuous gesture.
        // Their silhouette follows scroll; pointer motion only changes tension.
        for (let i = 0; i < veils.length; i++) {
          const veil = veils[i];
          veil.mat.uniforms.uTime.value = t + veil.phase;
          veil.mat.uniforms.uScroll.value = p;
          veil.mat.uniforms.uPointer.value = mouseX;
          veil.mat.uniforms.uEnergy.value += (warp - veil.mat.uniforms.uEnergy.value) * 0.08;
          veil.mat.uniforms.uColorA.value.lerp(tmpColor, 0.012);
          veil.mat.uniforms.uColorB.value.lerp(tmpColorB, 0.01);
          veil.mesh.position.x = veil.baseX + Math.sin(t * 0.07 + veil.phase + p * 6.0) * 0.28;
          veil.mesh.position.y = (p - 0.5) * 1.6 + Math.sin(t * 0.05 + veil.phase) * 0.22;
          veil.mesh.rotation.y = veil.baseRY + mouseX * 0.07 + Math.sin(p * Math.PI * 2 + veil.phase) * 0.06;
          veil.mesh.rotation.z = veil.side * (0.055 + Math.sin(p * Math.PI * 2) * 0.035);
        }
        // laser grid breathes with warp + arrival; sinks as the page scrolls
        // so it never crowds the mid-page content sections
        gridMat.uniforms.uTime.value = t;
        gridMat.uniforms.uWarp.value = warp;
        gridMat.uniforms.uOpacity.value +=
          (0.035 + warp * 0.08 + arrE * 0.05 - gridMat.uniforms.uOpacity.value) * 0.06;
        grid.position.y = -5.6 - p * 1.6;
        gridMat.uniforms.uColor.value.lerp(tmpColor, 0.02);

        // Shard field. Every mesh rides the cloud's transform so the shared
        // formation stays one rigid structure that the scroll turns, and the
        // shards read as a layer standing off the particle mass rather than
        // three separate swarms.
        //
        // The field runs at twice the cloud's rate: two formations per section,
        // fifteen builds across the landing. The background geometry gets its
        // own rhythm instead of echoing the particle morph.
        const half = rawMix >= 0.5 ? 1 : 0;
        const beat = Math.min(seg * 2 + half, SHARD_ORDER.length - 2);
        if (beat !== currentBeat) {
          currentBeat = beat;
          shardCommon.uWaveMode.value = beat % 2;
          const fa = SHARD_ORDER[beat];
          const fb = SHARD_ORDER[beat + 1];
          for (let i = 0; i < shardFields.length; i++) {
            const f = shardFields[i];
            (f.tgtA.array as Float32Array).set(f.homes[fa].pos);
            (f.tgtB.array as Float32Array).set(f.homes[fb].pos);
            (f.dirA.array as Float32Array).set(f.homes[fa].dir);
            (f.dirB.array as Float32Array).set(f.homes[fb].dir);
            f.tgtA.needsUpdate = true;
            f.tgtB.needsUpdate = true;
            f.dirA.needsUpdate = true;
            f.dirB.needsUpdate = true;
          }
        }

        shardCommon.uTime.value = t;
        shardCommon.uMix.value = rawMix * 2.0 - half;
        shardCommon.uArrival.value = arrE;
        shardCommon.uSpread.value = a.shardSpread + (b.shardSpread - a.shardSpread) * m;
        shardColor.lerp(tmpColor, 0.04);
        const shardAlpha = a.shardAlpha + (b.shardAlpha - a.shardAlpha) * m;
        for (let i = 0; i < shardFields.length; i++) {
          const f = shardFields[i];
          const uA = f.mat.uniforms.uAlpha;
          uA.value += (shardAlpha * f.baseAlpha - uA.value) * 0.06;
          // Locked to the sculpture's own transform. Rotating at a different
          // rate was what made the two layers look like separate things
          // sharing a screen instead of one object.
          f.mesh.rotation.copy(cloud.rotation);
          f.mesh.position.copy(cloud.position);
        }

        // neural constellation lights only while the AI shape holds the
        // stage (scroll or hover-override); squared so it settles in late,
        // after the nodes have re-knit
        let neuralW = 0;
        if (a.gen === 4) neuralW += 1 - m;
        if (b.gen === 4) neuralW += m;
        if (overrideGen === 4) neuralW = Math.max(neuralW, overrideMix);
        else neuralW *= 1 - overrideMix;
        neuralMat.uniforms.uOpacity.value +=
          (neuralW * neuralW * 0.6 - neuralMat.uniforms.uOpacity.value) * 0.06;
        neuralMat.uniforms.uTime.value = t;
        neuralLines.rotation.copy(cloud.rotation);
        neuralLines.position.copy(cloud.position);
        neuralMat.uniforms.uColor.value.lerp(tmpColorB, 0.04);

        // fireflies — heads plus analytic trails (positions sampled back in
        // time along the same orbit, so no history buffer is needed)
        for (let f = 0; f < FLY_N; f++) {
          for (let k = 0; k < TRAIL - 1; k++) {
            const vbase = (f * (TRAIL - 1) + k) * 2;
            flyPoint(flyDefs[f], t - k * 0.09, flyTmp);
            trailPos.setXYZ(vbase, flyTmp[0], flyTmp[1], flyTmp[2]);
            flyPoint(flyDefs[f], t - (k + 1) * 0.09, flyTmp);
            trailPos.setXYZ(vbase + 1, flyTmp[0], flyTmp[1], flyTmp[2]);
          }
          flyPoint(flyDefs[f], t, flyTmp);
          headPos.setXYZ(f, flyTmp[0], flyTmp[1], flyTmp[2]);
        }
        trailPos.needsUpdate = true;
        headPos.needsUpdate = true;
        flyTrails.position.x = cloud.position.x;
        flyHeads.position.x = cloud.position.x;
        trailMat.uniforms.uColor.value.lerp(tmpColorB, 0.03);
        headMat.uniforms.uColor.value.lerp(tmpColorB, 0.03);

        // glass shrapnel: counter-parallax against the camera = depth; palette
        // follows the section's primary blue so the slivers stay electric
        dustUniforms.uTime.value = t;
        dustUniforms.uColor.value.lerp(tmpColor, 0.03);
        dust.position.x = -mouseX * 0.9;
        dust.position.y = mouseY * 0.6 + p * 1.8;

        // core glow trails the cloud and breathes with the camera dolly
        core.position.x += (cloud.position.x * 0.6 - core.position.x) * 0.05;
        core.scale.setScalar(0.5 * (1 + Math.sin(t * 0.5) * 0.09));
        coreMat.uniforms.uColor.value.lerp(tmpColor, 0.06);
        coreMat.uniforms.uOpacity.value = 0.1 + cloudUniforms.uOpacity.value * 0.08;

        // god-ray sun rides the core; rays fade back where content leads
        sun.position.x = core.position.x;
        sun.scale.setScalar(1 + Math.sin(t * 0.45) * 0.12 + arrE * 0.5);
        sunMat.opacity = 0.35 + cloudUniforms.uOpacity.value * 0.6;
        sunMat.color.lerp(tmpColor, 0.05);

        // anamorphic bar rides the core, stretching as it breathes;
        // it POPS wide the instant a morph lands — the arrival signature
        flare.position.x = core.position.x;
        flare.scale.x =
          0.9 * (1 + Math.sin(t * 0.7) * 0.18) + cloudUniforms.uOpacity.value * 0.5 + arrE * 1.6;
        flareMat.uniforms.uColor.value.lerp(tmpColor, 0.06);
        flareMat.uniforms.uOpacity.value = coreMat.uniforms.uOpacity.value * 0.85 + arrE * 0.25;

        // shooting streaks: wait → cross the deep background → re-arm
        for (let i = 0; i < streaks.length; i++) {
          const s = streaks[i];
          if (s.wait > 0) {
            s.wait -= dt;
            s.mat.uniforms.uAlpha.value = 0;
            continue;
          }
          s.u += dt / s.dur;
          if (s.u >= 1) {
            streakSpawn(s, false);
            continue;
          }
          s.mesh.position.lerpVectors(s.from, s.to, s.u);
          s.mat.uniforms.uAlpha.value = Math.sin(Math.PI * s.u) * 0.24;
        }

        // chromatic fringing widens under fast scroll + warp — lens, not glitch
        if (caOffset) {
          const caAmt = Math.min(0.00035 + smoothedVel * 0.000006 + warp * 0.00045, 0.0014);
          caOffset.set(caAmt, caAmt);
        }

        // morphs, shocks and warp read as light events — bloom breathes with them
        if (bloomFx) {
          bloomFx.intensity +=
            (0.78 + morphE * 0.2 + warp * 0.18 + shockE * 0.3 + arrE * 0.22 - bloomFx.intensity) * 0.08;
        }

        if (composer) composer.render();
        else renderer.render(scene, camera);
        if (!firstFrameDone) {
          firstFrameDone = true;
          prog(1); // shaders compiled, kernel is on screen — preloader may lift
        }
        raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("v4:morph", onMorph);
        window.removeEventListener("v4:tint", onTint);
        window.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", onTouchEnd);
        window.removeEventListener("pointerdown", onPress);
        window.removeEventListener("pointerup", onRelease);
        window.removeEventListener("pointercancel", onPressCancel);
        window.removeEventListener("v4:ready", startIntro);
        window.clearTimeout(introFallback);
        if (isTouch) window.removeEventListener("deviceorientation", onOrient);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibility);
        canvas.removeEventListener("webglcontextlost", onContextLost);
        canvas.removeEventListener("webglcontextrestored", onContextRestored);
        cloudGeo.dispose();
        cloudMat.dispose();
        starGeo.dispose();
        starMat.dispose();
        shardGeos.forEach((g) => g.dispose());
        shardFields.forEach((f) => {
          f.geo.dispose();
          f.mat.dispose();
        });
        nebGeo.dispose();
        nebulas.forEach((n) => n.mat.dispose());
        inkGeo.dispose();
        inkMat.dispose();
        ribbonGeo.dispose();
        ribbons.forEach((r) => r.mat.dispose());
        veilGeo.dispose();
        veils.forEach((v) => v.mat.dispose());
        warpGeo.dispose();
        warpMat.dispose();
        neuralGeo.dispose();
        neuralMat.dispose();
        trailGeo.dispose();
        trailMat.dispose();
        headGeo.dispose();
        headMat.dispose();
        dustGeo.dispose();
        dustMat.dispose();
        streakGeo.dispose();
        streaks.forEach((s) => s.mat.dispose());
        gridGeo.dispose();
        gridMat.dispose();
        coreMat.dispose();
        flareMat.dispose();
        sunGeo.dispose();
        sunMat.dispose();
        composer?.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.scene} aria-hidden="true" />;
}
