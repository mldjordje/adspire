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
  color: [number, number, number];
  /** second palette tone — particles blend between the two by seed */
  color2: [number, number, number];
};

// gen: 0 idea-core · 1 blueprint · 2 devices · 3 service-hub · 4 neural ·
//      5 pipeline · 6 growth-chart · 7 "A" monogram
// PALETTE: black void · white structure · electric/accent-blue fill (no grey).
// Each particle shimmers between `color` (bright white/ice) and `color2`
// (blue → accent-blue #2f6bff), additively lit on a near-black background.
// Chapters shift how blue-dominant they are to tell the story; bloom makes the
// accent blue glow. Bg is deep black-blue, never grey.
// color = BLUE body (dominant tone, keeps the cloud reading blue even where
// particles pile up additively); color2 = bright ice/white HIGHLIGHT end.
// White-dominant tones average to silver-grey under additive blending — so
// blue must be the base and white only the sparkle.
const SHAPES: ShapeDef[] = [
  { section: "hero", gen: 0, camZ: 8.6, camA: 0.0, camY: 0.0, x: 0.0, rot: 1.0, tilt: 0, alpha: 0.62, wave: 0, dive: 0.5, bg: [0.004, 0.008, 0.022], color: [0.32, 0.58, 1.0], color2: [0.62, 0.8, 1.0] },
  { section: "manifesto", gen: 1, camZ: 8.4, camA: 0.55, camY: 0.5, x: 0.0, rot: 0.4, tilt: 0.2, alpha: 0.5, wave: 0, dive: 5.0, bg: [0.005, 0.01, 0.028], color: [0.24, 0.5, 1.0], color2: [0.6, 0.82, 1.0] },
  { section: "projects", gen: 2, camZ: 8.2, camA: -0.5, camY: -0.35, x: 2.4, rot: 0.12, tilt: 0.08, alpha: 0.3, wave: 0, dive: 0.6, bg: [0.006, 0.012, 0.03], color: [0.36, 0.62, 1.0], color2: [0.66, 0.83, 1.0] },
  { section: "services", gen: 3, camZ: 8.4, camA: 0.6, camY: 0.4, x: -2.8, rot: 0.18, tilt: 0, alpha: 0.22, wave: 0, dive: 5.2, bg: [0.005, 0.01, 0.03], color: [0.18, 0.42, 1.0], color2: [0.5, 0.76, 1.0] },
  { section: "aiDemo", gen: 4, camZ: 8.4, camA: -0.55, camY: -0.3, x: 1.8, rot: 0.8, tilt: 0, alpha: 0.42, wave: 0, dive: 0.7, bg: [0.005, 0.011, 0.03], color: [0.28, 0.58, 1.0], color2: [0.6, 0.84, 1.0] },
  { section: "process", gen: 5, camZ: 7.6, camA: 0.25, camY: 0.7, x: 0.0, rot: 0.06, tilt: 0.12, alpha: 0.55, wave: 0, dive: 0.6, bg: [0.005, 0.011, 0.03], color: [0.3, 0.56, 1.0], color2: [0.68, 0.87, 1.0] },
  { section: "metrics", gen: 6, camZ: 8.2, camA: -0.3, camY: 0.45, x: 0.0, rot: 0.1, tilt: 0.18, alpha: 0.32, wave: 0, dive: 2.6, bg: [0.005, 0.011, 0.028], color: [0.34, 0.6, 1.0], color2: [0.66, 0.83, 1.0] },
  { section: "cta", gen: 7, camZ: 7.0, camA: 0.0, camY: 0.0, x: 0.0, rot: 0.2, tilt: 0, alpha: 0.8, wave: 0, dive: 0.5, bg: [0.003, 0.007, 0.02], color: [0.42, 0.66, 1.0], color2: [0.85, 0.92, 1.0] },
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

/** HERO — the idea: a bright dense nucleus with service-electrons orbiting on
 *  tilted rings. "One idea radiating many capabilities." */
function genIdeaCore(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  const rnd = mulberry32(101);
  const golden = Math.PI * (3 - Math.sqrt(5));
  // (tiltX, tiltZ) for three orbital planes crossing the core
  const planes = [
    [0.15, 0.1],
    [1.15, 0.55],
    [2.05, -0.5],
  ];
  for (let i = 0; i < n; i++) {
    if (rnd() < 0.42) {
      // glowing core sphere
      const y = 1 - rnd() * 2;
      const rad = Math.sqrt(Math.max(0, 1 - y * y));
      const th = golden * i;
      const cr = 0.72;
      out[i * 3] = Math.cos(th) * rad * cr + (rnd() - 0.5) * 0.1;
      out[i * 3 + 1] = y * cr + (rnd() - 0.5) * 0.1;
      out[i * 3 + 2] = Math.sin(th) * rad * cr + (rnd() - 0.5) * 0.1;
    } else {
      // orbiting electron ring on a tilted plane
      const pl = planes[Math.floor(rnd() * planes.length)];
      const R = 1.55 + Math.floor(rnd() * 3) * 0.24;
      const a = rnd() * Math.PI * 2;
      const tube = (rnd() - 0.5) * 0.14;
      let x = Math.cos(a) * R + (rnd() - 0.5) * 0.05;
      let y = tube;
      let z = Math.sin(a) * R + (rnd() - 0.5) * 0.05;
      // rotate the flat ring about X then Z into its plane
      const cx = Math.cos(pl[0]);
      const sx = Math.sin(pl[0]);
      const y1 = y * cx - z * sx;
      const z1 = y * sx + z * cx;
      y = y1;
      z = z1;
      const cz = Math.cos(pl[1]);
      const sz = Math.sin(pl[1]);
      const x1 = x * cz - y * sz;
      const y2 = x * sz + y * cz;
      x = x1;
      y = y2;
      out[i * 3] = x;
      out[i * 3 + 1] = y;
      out[i * 3 + 2] = z;
    }
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
    vec3 col = base + vec3(0.16, 0.32, 0.62) * core + base * 0.2 * sin(vSeed);
    // particles in flight (or near the cursor) ignite — electric blue with a
    // white-hot tip, never warm/grey. Blue-weighted so glow stays saturated.
    col += vec3(0.55, 0.78, 1.0) * vGlow * 0.5;
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

// dark-glass fresnel — the debris becomes actual obsidian shards
const SHARD_VERT = /* glsl */ `
  varying vec3 vN;
  varying vec3 vV;
  varying vec3 vPos;
  void main() {
    vN = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vV = normalize(-mv.xyz);
    vPos = position;
    gl_Position = projectionMatrix * mv;
  }
`;

const SHARD_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  varying vec3 vN;
  varying vec3 vV;
  varying vec3 vPos;
  void main() {
    float ndv = abs(dot(normalize(vN), normalize(vV)));
    // tighter fresnel = a thin hard rim of light on each facet edge
    float fres = pow(1.0 - ndv, 3.2);
    // slow light band crawling across the glass — obsidian catches light
    float band = 0.5 + 0.5 * sin(vPos.y * 7.0 + uTime * 0.7);
    // facets aligned with the lens flash a white-hot specular glint
    float glint = pow(band, 9.0) * pow(ndv, 3.0) * 0.6;
    vec3 base = vec3(0.006, 0.012, 0.03);
    // rim locked to electric blue — the shards carry the accent, not grey
    vec3 rim = mix(uColor, vec3(0.18, 0.42, 1.0), 0.55);
    vec3 col = base + rim * fres * (1.0 + band * 0.7) + vec3(0.8, 0.9, 1.0) * glint;
    gl_FragColor = vec4(col, 0.4 + fres * 0.6);
  }
`;

// ─── Component ───────────────────────────────────────────────────────────────

export function SceneV4() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    let cleanup: (() => void) | null = null;

    // preloader listens: counter tracks real load, not a fake timer
    const prog = (p: number) =>
      window.dispatchEvent(new CustomEvent("v4:scene-progress", { detail: p }));

    // Reduced-motion users (any device) get the static CSS backdrop instead of the
    // live sim. Everyone else — mobile included — gets the signature morphing
    // particle kernel; it's the visual that sets this site apart, so it stays.
    // Mobile is kept affordable by fewer particles + a capped pixel ratio below,
    // and the postprocessing composer is already desktop-only.
    if (reduced) {
      canvas.classList.add(styles.sceneStatic);
      prog(1);
      return;
    }

    (async () => {
      const THREE = await import("three");
      if (disposed) return;
      prog(0.35);

      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      });
      // cap desktop DPR at 1.8 (not 2): a full 2x draw = 4x the fragment work
      // through the whole post-chain, which is what makes scroll stutter.
      // 1.8 buys visibly sharper edges than the old 1.6 cap while the
      // adaptive low-res drop below still protects the frame budget when the
      // cloud recedes behind content.
      // Mobile has NO post-chain (bloom/godrays are desktop-only), so it can
      // afford a crisp render: a 1.15 cap on a DPR-3 phone drew at ~1.15x then
      // upscaled = the "360p" blur. Cap at 2 for a retina-sharp background.
      const basePR = Math.min(window.devicePixelRatio, isMobile ? 2 : 1.8);
      renderer.setPixelRatio(basePR);
      renderer.setSize(window.innerWidth, window.innerHeight);

      const scene = new THREE.Scene();
      // opaque bg matches the page — required for the bloom composer path
      // deep black-blue void: pure black would read flat, grey is banned
      scene.background = new THREE.Color(0x03060e);
      const camera = new THREE.PerspectiveCamera(
        42,
        window.innerWidth / window.innerHeight,
        0.1,
        60,
      );
      camera.position.z = SHAPES[0].camZ;

      // ── Morphing cloud — GPU-side, CPU only swaps targets ─────────────
      const COUNT = isMobile ? 10000 : 24000;
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
          uColor: { value: new THREE.Color(0.35, 0.72, 1.0) },
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
        uniforms: { uColor: { value: new THREE.Color(0.88, 0.88, 0.95) } },
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
          uColor: { value: new THREE.Color(0.95, 0.94, 0.9) },
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

      // ── Obsidian shards — faceted dark glass with fresnel rims ────────
      const shardUniforms = {
        uColor: { value: new THREE.Color(0xbcd4ff) },
        uTime: { value: 0 },
      };
      const shardMat = new THREE.ShaderMaterial({
        uniforms: shardUniforms,
        transparent: true,
        vertexShader: SHARD_VERT,
        fragmentShader: SHARD_FRAG,
      });
      // detail-0 icosahedron is already non-indexed → per-face normals → crisp facets
      const shardGeo = new THREE.IcosahedronGeometry(0.26, 0);
      shardGeo.computeVertexNormals();
      const debris: { mesh: InstanceType<typeof THREE.Mesh>; spin: number; orbit: number; baseY: number }[] = [];
      const dRnd = mulberry32(1234);
      const DEBRIS_COUNT = isMobile ? 6 : 13;
      for (let i = 0; i < DEBRIS_COUNT; i++) {
        const mesh = new THREE.Mesh(shardGeo, shardMat);
        const ang = dRnd() * Math.PI * 2;
        const r = 3.2 + dRnd() * 3.4;
        mesh.position.set(Math.cos(ang) * r, (dRnd() - 0.5) * 5, -1.5 - dRnd() * 5);
        const s = 0.4 + dRnd() * 1.5;
        // non-uniform scale — elongated shards, not platonic solids; wider
        // size spread = a few monoliths among slivers, reads more expensive
        mesh.scale.set(s * (0.45 + dRnd() * 0.5), s * (1.0 + dRnd() * 1.3), s * (0.45 + dRnd() * 0.5));
        mesh.rotation.set(dRnd() * Math.PI, dRnd() * Math.PI, dRnd() * Math.PI);
        scene.add(mesh);
        debris.push({ mesh, spin: 0.15 + dRnd() * 0.4, orbit: 0.2 + dRnd() * 0.5, baseY: mesh.position.y });
      }

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
        { color: 0x1e46a0, pos: [-5, 2.5, -10], s: 1.4 },
        { color: 0x122f6e, pos: [6, -3, -12], s: 1.7 },
        { color: 0x2f6bff, pos: [0, 4.5, -14], s: 1.9 },
      ];
      const nebulas = nebDefs.map((def, i) => {
        const mat = new THREE.ShaderMaterial({
          uniforms: { uColor: { value: new THREE.Color(def.color) }, uOpacity: { value: 0.14 } },
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
        uColorLo: { value: new THREE.Color(0x0a1f4a) },
        uColorHi: { value: new THREE.Color(0x2f6bff) },
        uOpacity: { value: isMobile ? 0.42 : 0.5 },
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
        { y: 2.6, z: -9.5, rz: 0.12, phase: 0, op: 0.085 },
        { y: -3.4, z: -12.5, rz: -0.09, phase: 2.4, op: 0.065 },
      ];
      const ribbons = ribbonDefs.map((def) => {
        const mat = new THREE.ShaderMaterial({
          uniforms: {
            uColorA: { value: new THREE.Color(0x4a7dff) },
            uColorB: { value: new THREE.Color(0x2f6bff) },
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
        uniforms: { uWarp: { value: 0 }, uColor: { value: new THREE.Color(0.5, 0.72, 1.0) } },
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
          uniforms: { uColor: { value: new THREE.Color(0.42, 0.64, 1.0) }, uAlpha: { value: 0 } },
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
          uColor: { value: new THREE.Color(0x2f6bff) },
          uOpacity: { value: 0.12 },
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
            g.y -= uTime * 0.4 + uWarp * 3.0;
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
        color: 0xbfd6ff,
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
        uniforms: { uColor: { value: new THREE.Color(0.55, 0.75, 1.0) }, uOpacity: { value: 0.1 } },
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

      // touch drag steers the repulsion pocket — the finger parts the cloud
      // exactly like the desktop cursor does. Horizontal swipe velocity also
      // torques the sculpture: flick it and it spins like a globe
      let spinVel = 0;
      let lastTX: number | null = null;
      const onTouchStart = (e: TouchEvent) => {
        const tch = e.touches[0];
        if (tch) lastTX = tch.clientX;
      };
      const onTouchMove = (e: TouchEvent) => {
        const tch = e.touches[0];
        if (!tch) return;
        targetMX = (tch.clientX / window.innerWidth - 0.5) * 2;
        targetMY = (tch.clientY / window.innerHeight - 0.5) * 2;
        if (lastTX !== null) spinVel += (tch.clientX - lastTX) * 0.00011;
        lastTX = tch.clientX;
      };
      const onTouchEnd = () => {
        lastTX = null;
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
        if (e.gamma === null || e.beta === null) return;
        targetMX = Math.max(-1, Math.min(1, e.gamma / 28));
        targetMY = Math.max(-1, Math.min(1, (e.beta - 45) / 28));
      };
      if (isTouch) window.addEventListener("deviceorientation", onOrient, { passive: true });

      // desktop gets a real bloom pass — tuned so only hot cores bloom,
      // not the whole cloud (high threshold = crisp glow, no haze)
      let composer: { render: () => void; setSize: (w: number, h: number) => void; dispose: () => void } | null = null;
      // lens pack: subtle chromatic fringing that breathes with scroll speed
      let caOffset: { set: (x: number, y: number) => void } | null = null;
      // live handle on bloom so morphs/shocks/warp can pulse it
      let bloomFx: { intensity: number } | null = null;
      if (!isMobile) {
        try {
          const PP = await import("postprocessing");
          if (disposed) return;
          const c = new PP.EffectComposer(renderer, { frameBufferType: THREE.HalfFloatType });
          c.addPass(new PP.RenderPass(scene, camera));
          // SMAA smooths shard edges and line layers — the "shot in 8K" edge
          try {
            const smaa = new PP.SMAAEffect({ preset: PP.SMAAPreset.HIGH });
            c.addPass(new PP.EffectPass(camera, smaa));
          } catch {
            /* AA is decoration — skip if the preset API shifts */
          }
          const bloom = new PP.BloomEffect({
            intensity: 0.9,
            // high threshold = only white-hot cores bloom; anything lower
            // wraps the nucleus in the grey fog we just removed
            luminanceThreshold: 0.56,
            luminanceSmoothing: 0.3,
            // mipmapBlur's LDR mip chain warm-shifts saturated blues — the
            // "amber ring" around dense shapes. Kawase blur keeps hue true.
            mipmapBlur: false,
            radius: 0.68,
          });
          bloomFx = bloom;
          const ca = new PP.ChromaticAberrationEffect({
            offset: new THREE.Vector2(0.0006, 0.0006),
            radialModulation: true,
            modulationOffset: 0.4,
          });
          caOffset = ca.offset;
          const vignette = new PP.VignetteEffect({ darkness: 0.52, offset: 0.28 });
          // NO god rays: the white volumetric wash read as warm-grey fog over
          // the navy void and murdered the contrast. Bloom + anamorphic flare
          // carry the light story now — crisp, blue, no milk.
          c.addPass(new PP.EffectPass(camera, bloom, ca, vignette));
          c.setSize(window.innerWidth, window.innerHeight);
          composer = c;
        } catch {
          composer = null; // effects are decoration — plain render is the fallback
        }
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
      let warp = 0;
      let prevAng = SHAPES[0].camA;
      let bank = 0;
      let attract = 0;
      let spinOffset = 0;
      let stops = measureStops();
      let measuredHeight = document.documentElement.scrollHeight;
      let currentSeg = -1;

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
          currentSeg = seg;
          (tgtA.array as Float32Array).set(shapes[a.gen]);
          (tgtB.array as Float32Array).set(shapes[b.gen]);
          tgtA.needsUpdate = true;
          tgtB.needsUpdate = true;
          cloudUniforms.uWaveA.value = a.wave;
          cloudUniforms.uWaveB.value = b.wave;
          // suppress a false arrival from the mix value jumping across segments
          prevRawMix = rawMix;
        }
        cloudUniforms.uMix.value = rawMix;

        // arrival beat — the frame a morph settles, the scene acknowledges
        // it (flare pop, particle flash, bloom breath)
        if (rawMix >= 0.9 && prevRawMix < 0.9) arrivalAt = t;
        prevRawMix = rawMix;

        // scroll velocity agitates the cloud — fast scroll, restless particles
        const dy = Math.abs(window.scrollY - lastScrollY);
        lastScrollY = window.scrollY;
        smoothedVel += (Math.min(dy, 120) - smoothedVel) * 0.08;
        cloudUniforms.uAgitation.value = Math.min(smoothedVel * 0.004, 0.45);

        // rotation — round shapes spin, flat shapes face the camera;
        // disc/surface shapes get a fixed downward-view tilt instead.
        // Scroll progress scrubs extra rotation on top of the idle spin, so
        // the visitor's hand literally turns the sculpture
        const rot = a.rot + (b.rot - a.rot) * m;
        const tilt = a.tilt + (b.tilt - a.tilt) * m;
        // swipe torque: horizontal flicks keep spinning the sculpture with
        // momentum, decaying like a struck globe
        spinVel = Math.max(-0.05, Math.min(0.05, spinVel));
        spinOffset += spinVel;
        spinVel *= 0.94;
        cloud.rotation.y = t * 0.22 * rot + p * 2.4 * rot + spinOffset;
        cloud.rotation.x = tilt + Math.sin(t * 0.14) * 0.08 * rot;

        // narrow viewports: side offsets would push the cloud off screen
        const xFactor = isMobile ? 0.35 : 1;
        cloud.position.x += ((a.x + (b.x - a.x) * m) * xFactor - cloud.position.x) * 0.06;

        mouseX += (targetMX - mouseX) * 0.05;
        mouseY += (targetMY - mouseY) * 0.05;

        // scroll velocity → hyperspace warp. Dead zone keeps a slow reading
        // scroll perfectly calm; a real flick punches the drive
        const warpTarget = Math.min(Math.max((smoothedVel - 22) / 80, 0), 1);
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
        const orbitR = a.camZ + (b.camZ - a.camZ) * m + Math.sin(t * 0.35) * 0.18 - morphE * a.dive;
        const ang = a.camA + (b.camA - a.camA) * m + ovAng * overrideMix;
        const craneY = a.camY + (b.camY - a.camY) * m;
        camera.position.x += (Math.sin(ang) * orbitR * 0.62 + mouseX * 0.5 - camera.position.x) * 0.06;
        camera.position.y += (craneY - mouseY * 0.35 - camera.position.y) * 0.06;
        camera.position.z += (Math.cos(ang * 0.72) * orbitR - camera.position.z) * 0.06;
        camera.position.z -= shockAge < 2 ? Math.exp(-shockAge * 3.2) * 0.3 : 0;
        camera.fov += (42 + warp * 9 + morphE * 4 - camera.fov) * 0.1;
        camera.updateProjectionMatrix();
        camera.lookAt(cloud.position.x * 0.4, 0, 0);
        // banking roll leans into the orbit swing — handheld cinema, not a tripod
        bank += (Math.max(-0.055, Math.min(0.055, (ang - prevAng) * 30)) - bank) * 0.05;
        prevAng = ang;
        camera.rotation.z = Math.sin(t * 0.1) * 0.012 + bank;

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
        // warm black → rose (projects) → green-black (AI) → pure void (CTA)
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
        shardUniforms.uTime.value = t;

        // laser grid breathes with warp + arrival; sinks as the page scrolls
        // so it never crowds the mid-page content sections
        gridMat.uniforms.uTime.value = t;
        gridMat.uniforms.uWarp.value = warp;
        gridMat.uniforms.uOpacity.value +=
          (0.12 + warp * 0.34 + arrE * 0.22 - gridMat.uniforms.uOpacity.value) * 0.06;
        grid.position.y = -5.6 - p * 1.6;
        gridMat.uniforms.uColor.value.lerp(tmpColor, 0.02);

        // shards drift, tumble, and slide slowly against the scroll
        for (let i = 0; i < debris.length; i++) {
          const d = debris[i];
          d.mesh.rotation.x = t * d.spin;
          d.mesh.rotation.y = t * d.spin * 1.4;
          d.mesh.position.y = d.baseY + Math.sin(t * d.orbit + i * 1.7) * 0.5 + p * 2.2;
        }
        shardUniforms.uColor.value.lerp(tmpColor, 0.04);

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
          s.mat.uniforms.uAlpha.value = Math.sin(Math.PI * s.u) * 0.5;
        }

        // chromatic fringing widens under fast scroll + warp — lens, not glitch
        if (caOffset) {
          const caAmt = Math.min(0.0005 + smoothedVel * 0.000018 + warp * 0.0011, 0.0034);
          caOffset.set(caAmt, caAmt);
        }

        // morphs, shocks and warp read as light events — bloom breathes with them
        if (bloomFx) {
          bloomFx.intensity +=
            (0.9 + morphE * 0.3 + warp * 0.65 + shockE * 0.55 + arrE * 0.4 - bloomFx.intensity) * 0.08;
        }

        if (composer) composer.render();
        else renderer.render(scene, camera);
        if (!firstFrameDone) {
          firstFrameDone = true;
          prog(1); // shaders compiled, kernel is on screen — preloader may lift
        }
        raf = requestAnimationFrame(tick);
      };

      if (reduced) {
        cloudUniforms.uIntro.value = 1; // no intro animation — land assembled
        if (composer) composer.render();
        else renderer.render(scene, camera);
        prog(1);
      } else {
        raf = requestAnimationFrame(tick);
      }

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
        shardGeo.dispose();
        shardMat.dispose();
        nebGeo.dispose();
        nebulas.forEach((n) => n.mat.dispose());
        inkGeo.dispose();
        inkMat.dispose();
        ribbonGeo.dispose();
        ribbons.forEach((r) => r.mat.dispose());
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
