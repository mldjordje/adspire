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
  x: number;
  /** how much continuous rotation this shape gets (flat shapes face camera) */
  rot: number;
  /** static X tilt — disc/surface shapes are viewed from slightly above */
  tilt: number;
  /** cloud opacity — recedes where real content (screenshots) is the star */
  alpha: number;
  /** 1 = this shape is the living wave surface (adds animated undulation) */
  wave: number;
  color: [number, number, number];
  /** second palette tone — particles blend between the two by seed */
  color2: [number, number, number];
};

// gen: 0 sphere · 1 torus knot · 2 galaxy · 3 crystal · 4 neural · 5 wave · 6 "A"
const SHAPES: ShapeDef[] = [
  { section: "hero", gen: 0, camZ: 8.6, x: 0.0, rot: 1.0, tilt: 0, alpha: 0.7, wave: 0, color: [0.42, 0.88, 1.0], color2: [0.55, 0.49, 1.0] },
  { section: "manifesto", gen: 1, camZ: 8.4, x: 0.0, rot: 0.55, tilt: 0.15, alpha: 0.6, wave: 0, color: [0.61, 0.93, 1.0], color2: [0.42, 0.7, 1.0] },
  { section: "projects", gen: 2, camZ: 8.2, x: 2.4, rot: 0.6, tilt: 0.5, alpha: 0.3, wave: 0, color: [0.55, 0.49, 1.0], color2: [1.0, 0.42, 0.56] },
  { section: "services", gen: 3, camZ: 8.4, x: -2.8, rot: 0.35, tilt: 0, alpha: 0.22, wave: 0, color: [1.0, 0.42, 0.56], color2: [0.55, 0.49, 1.0] },
  { section: "aiDemo", gen: 4, camZ: 8.4, x: 1.8, rot: 0.8, tilt: 0, alpha: 0.6, wave: 0, color: [0.42, 0.88, 1.0], color2: [0.35, 0.95, 0.65] },
  { section: "process", gen: 5, camZ: 7.6, x: 0.0, rot: 0.04, tilt: 0.62, alpha: 0.75, wave: 1, color: [0.55, 0.49, 1.0], color2: [0.42, 0.88, 1.0] },
  { section: "metrics", gen: 5, camZ: 8.2, x: 0.0, rot: 0.04, tilt: 0.55, alpha: 0.32, wave: 1, color: [0.42, 0.88, 1.0], color2: [0.55, 0.49, 1.0] },
  { section: "cta", gen: 6, camZ: 7.0, x: 0.0, rot: 0.2, tilt: 0, alpha: 0.8, wave: 0, color: [1.0, 0.33, 0.44], color2: [1.0, 0.6, 0.32] },
];

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

function genSphere(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  const rnd = mulberry32(101);
  const R = 2.05;
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = golden * i;
    out[i * 3] = Math.cos(th) * rad * R + (rnd() - 0.5) * 0.08;
    out[i * 3 + 1] = y * R + (rnd() - 0.5) * 0.08;
    out[i * 3 + 2] = Math.sin(th) * rad * R + (rnd() - 0.5) * 0.08;
  }
  return out;
}

/** (2,3) torus knot with a particle tube around the curve — woven craft */
function genTorusKnot(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  const rnd = mulberry32(202);
  const P = 2;
  const Q = 3;
  const S = 0.62;
  for (let i = 0; i < n; i++) {
    const t = rnd() * Math.PI * 2;
    const r = 2 + Math.cos(Q * t);
    const x = r * Math.cos(P * t);
    const y = r * Math.sin(P * t);
    const z = Math.sin(Q * t);
    const th = rnd() * Math.PI * 2;
    const tr = Math.sqrt(rnd()) * 0.28;
    out[i * 3] = x * S + Math.cos(th) * tr;
    out[i * 3 + 1] = y * S * 0.9 + Math.sin(th) * tr;
    out[i * 3 + 2] = z * S * 1.5 + (rnd() - 0.5) * 0.26;
  }
  return out;
}

/** 3-arm logarithmic spiral galaxy with thickness falloff toward the rim */
function genGalaxy(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  const rnd = mulberry32(303);
  const ARMS = 3;
  for (let i = 0; i < n; i++) {
    const arm = Math.floor(rnd() * ARMS);
    const r = Math.pow(rnd(), 0.55) * 2.7;
    const spread = (rnd() - 0.5) * (rnd() - 0.5) * 1.6 * (0.35 + r * 0.28);
    const ang = (arm / ARMS) * Math.PI * 2 + r * 1.75 + spread;
    const y = (rnd() - 0.5) * (rnd() - 0.5) * (1.15 - r * 0.3);
    out[i * 3] = Math.cos(ang) * r;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = Math.sin(ang) * r;
  }
  return out;
}

/** elongated octahedron sampled on faces + edges — the obsidian crystal */
function genCrystal(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  const rnd = mulberry32(404);
  const R = 1.45;
  const V = [
    [R, 0, 0],
    [-R, 0, 0],
    [0, R * 1.75, 0],
    [0, -R * 1.75, 0],
    [0, 0, R],
    [0, 0, -R],
  ];
  const faces: number[][][] = [];
  for (const xi of [0, 1]) for (const yi of [2, 3]) for (const zi of [4, 5]) faces.push([V[xi], V[yi], V[zi]]);
  for (let i = 0; i < n; i++) {
    const f = faces[Math.floor(rnd() * 8)];
    let px: number;
    let py: number;
    let pz: number;
    if (rnd() < 0.45) {
      // edge sample — crisp facet outlines
      const a = f[Math.floor(rnd() * 3)];
      let b = f[Math.floor(rnd() * 3)];
      if (b === a) b = f[(f.indexOf(a) + 1) % 3];
      const t = rnd();
      px = a[0] + (b[0] - a[0]) * t;
      py = a[1] + (b[1] - a[1]) * t;
      pz = a[2] + (b[2] - a[2]) * t;
    } else {
      // face fill
      let a = rnd();
      let b = rnd();
      if (a + b > 1) {
        a = 1 - a;
        b = 1 - b;
      }
      const c = 1 - a - b;
      px = f[0][0] * a + f[1][0] * b + f[2][0] * c;
      py = f[0][1] * a + f[1][1] * b + f[2][1] * c;
      pz = f[0][2] * a + f[1][2] * b + f[2][2] * c;
    }
    out[i * 3] = px + (rnd() - 0.5) * 0.05;
    out[i * 3 + 1] = py + (rnd() - 0.5) * 0.05;
    out[i * 3 + 2] = pz + (rnd() - 0.5) * 0.05;
  }
  return out;
}

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

/**
 * Flat particle grid — the base of the "digital ocean" surface. The living
 * undulation is added in the vertex shader (wave weight blends in/out during
 * morphs), so the stored target stays static.
 */
function genWave(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  const rnd = mulberry32(707);
  const W = 4.2;
  const D = 2.6;
  const cols = Math.ceil(Math.sqrt(n * (W / D)));
  const rows = Math.ceil(n / cols);
  let i = 0;
  for (let r = 0; r < rows && i < n; r++) {
    for (let c = 0; c < cols && i < n; c++, i++) {
      out[i * 3] = (c / (cols - 1) - 0.5) * 2 * W + (rnd() - 0.5) * 0.05;
      out[i * 3 + 1] = -0.4 + (rnd() - 0.5) * 0.04;
      out[i * 3 + 2] = (r / (rows - 1) - 0.5) * 2 * D + (rnd() - 0.5) * 0.05;
    }
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
  attribute vec3 aScatter;
  attribute float aSize;
  attribute float aSeed;
  uniform float uTime;
  uniform float uScale;
  uniform float uMix;
  uniform float uAgitation;
  uniform float uWaveA;
  uniform float uWaveB;
  uniform vec3 uPointer;
  varying float vSeed;
  varying float vGlow;

  ${SNOISE}

  vec3 flow(vec3 p) {
    return vec3(
      snoise(p),
      snoise(p + vec3(31.4, 47.2, 12.9)),
      snoise(p + vec3(113.5, 71.3, 57.8))
    );
  }

  void main() {
    vSeed = aSeed;
    // per-particle stagger: each particle leaves and arrives on its own
    // schedule, so the cloud tears apart and re-knits instead of gliding
    float lead = fract(aSeed * 0.618);
    float d = clamp(uMix * 1.3 - lead * 0.3, 0.0, 1.0);
    float pm = d * d * (3.0 - 2.0 * d);

    vec3 pos = mix(aTargetA, aTargetB, pm);

    // living ocean undulation, blended in/out through the morph
    float waveW = mix(uWaveA, uWaveB, pm);
    pos.y += waveW * (
      sin(pos.x * 1.4 + uTime * 1.1) * 0.28 +
      sin(pos.z * 2.1 + uTime * 0.8) * 0.18 +
      sin((pos.x + pos.z) * 0.8 - uTime * 0.6) * 0.12
    );

    // puff peaks mid-transition; the noise field turns it into a swirl
    float puff = pm * (1.0 - pm) * 3.4 + uAgitation;
    vec3 fl = flow(pos * 0.42 + vec3(0.0, uTime * 0.1, uTime * 0.06));
    pos += (fl * 0.85 + aScatter * 0.4) * puff;

    // idle breathing so the cloud never freezes solid
    pos.x += sin(uTime * 1.1 + aSeed * 6.283) * 0.016;
    pos.y += cos(uTime * 0.9 + aSeed * 4.71) * 0.016;

    // cursor repulsion in world space — particles part around the pointer
    // and ignite; the whole background answers the visitor's hand
    vec4 wp = modelMatrix * vec4(pos, 1.0);
    vec2 toP = wp.xy - uPointer.xy;
    float pd = length(toP);
    float rep = smoothstep(1.7, 0.0, pd);
    wp.xy += normalize(toP + vec2(0.0001)) * rep * rep * 0.6;

    vGlow = puff + rep * 0.7;
    vec4 mv = viewMatrix * wp;
    float twinkle = 0.82 + 0.28 * sin(uTime * 1.6 + aSeed * 7.0);
    gl_PointSize = aSize * twinkle * uScale / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const CLOUD_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying float vSeed;
  varying float vGlow;
  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;
    // soft gaussian-ish falloff with a hot core
    float glow = exp(-d * d * 14.0);
    float core = smoothstep(0.18, 0.0, d);
    // two-tone palette — each particle sits somewhere between the pair
    vec3 base = mix(uColor, uColorB, fract(vSeed * 0.618));
    vec3 col = base + vec3(0.25, 0.22, 0.3) * core + base * 0.2 * sin(vSeed);
    // particles in flight (or near the cursor) ignite
    col += vec3(0.45, 0.55, 0.7) * vGlow * 0.55;
    gl_FragColor = vec4(col, glow * uOpacity * (1.0 + vGlow * 0.35));
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
    float fres = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.4);
    // slow light band crawling across the glass — obsidian catches light
    float band = 0.5 + 0.5 * sin(vPos.y * 7.0 + uTime * 0.7);
    vec3 base = vec3(0.015, 0.015, 0.024);
    vec3 col = base + uColor * fres * (0.85 + band * 0.55);
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

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      });
      const basePR = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2);
      renderer.setPixelRatio(basePR);
      renderer.setSize(window.innerWidth, window.innerHeight);

      const scene = new THREE.Scene();
      // opaque bg matches the page — required for the bloom composer path
      scene.background = new THREE.Color(0x060608);
      const camera = new THREE.PerspectiveCamera(
        42,
        window.innerWidth / window.innerHeight,
        0.1,
        60,
      );
      camera.position.z = SHAPES[0].camZ;

      // ── Morphing cloud — GPU-side, CPU only swaps targets ─────────────
      const COUNT = isMobile ? 7000 : 24000;
      // indexed by ShapeDef.gen
      const shapes = [
        genSphere(COUNT),
        genTorusKnot(COUNT),
        genGalaxy(COUNT),
        genCrystal(COUNT),
        genNeural(COUNT),
        genWave(COUNT),
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
        uAgitation: { value: 0 },
        uWaveA: { value: SHAPES[0].wave },
        uWaveB: { value: SHAPES[1].wave },
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

      // ── Obsidian shards — faceted dark glass with fresnel rims ────────
      const shardUniforms = {
        uColor: { value: new THREE.Color(0x6be1ff) },
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
      const DEBRIS_COUNT = isMobile ? 5 : 9;
      for (let i = 0; i < DEBRIS_COUNT; i++) {
        const mesh = new THREE.Mesh(shardGeo, shardMat);
        const ang = dRnd() * Math.PI * 2;
        const r = 3.2 + dRnd() * 3.4;
        mesh.position.set(Math.cos(ang) * r, (dRnd() - 0.5) * 5, -1.5 - dRnd() * 5);
        const s = 0.5 + dRnd() * 1.1;
        // non-uniform scale — elongated shards, not platonic solids
        mesh.scale.set(s * (0.55 + dRnd() * 0.5), s * (1.0 + dRnd() * 0.9), s * (0.55 + dRnd() * 0.5));
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
        { color: 0x1a4a66, pos: [-5, 2.5, -10], s: 1.4 },
        { color: 0x2a2060, pos: [6, -3, -12], s: 1.7 },
        { color: 0x451a30, pos: [0, 4.5, -14], s: 1.9 },
      ];
      const nebulas = nebDefs.map((def, i) => {
        const mat = new THREE.ShaderMaterial({
          uniforms: { uColor: { value: new THREE.Color(def.color) }, uOpacity: { value: 0.09 } },
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

      // ── Ambient starfield backdrop ────────────────────────────────────
      const STARS = isMobile ? 350 : 900;
      const starRnd = mulberry32(7777);
      const starPos = new Float32Array(STARS * 3);
      for (let i = 0; i < STARS; i++) {
        starPos[i * 3] = (starRnd() - 0.5) * 30;
        starPos[i * 3 + 1] = (starRnd() - 0.5) * 20;
        starPos[i * 3 + 2] = (starRnd() - 0.5) * 18 - 6;
      }
      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
      const starMat = new THREE.PointsMaterial({
        color: 0x9fb6c9,
        size: 0.02,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
      });
      const stars = new THREE.Points(starGeo, starMat);
      scene.add(stars);

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
      if (!isMobile) {
        try {
          const PP = await import("postprocessing");
          if (disposed) return;
          const c = new PP.EffectComposer(renderer, { frameBufferType: THREE.HalfFloatType });
          c.addPass(new PP.RenderPass(scene, camera));
          const bloom = new PP.BloomEffect({
            intensity: 0.9,
            luminanceThreshold: 0.42,
            luminanceSmoothing: 0.3,
            mipmapBlur: true,
            radius: 0.68,
          });
          c.addPass(new PP.EffectPass(camera, bloom));
          c.setSize(window.innerWidth, window.innerHeight);
          composer = c;
        } catch {
          composer = null; // bloom is decoration — plain render is the fallback
        }
      }

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer?.setSize(window.innerWidth, window.innerHeight);
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
      const pointerNdc = new THREE.Vector3();
      const pointerWorld = new THREE.Vector3();
      let smoothedProgress = 0;
      let lastScrollY = window.scrollY;
      let smoothedVel = 0;
      let stops = measureStops();
      let measuredHeight = document.documentElement.scrollHeight;
      let currentSeg = -1;

      const tick = () => {
        if (!running || disposed) return;
        const t = (performance.now() - startTime) / 1000;

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
        }
        cloudUniforms.uMix.value = rawMix;

        // scroll velocity agitates the cloud — fast scroll, restless particles
        const dy = Math.abs(window.scrollY - lastScrollY);
        lastScrollY = window.scrollY;
        smoothedVel += (Math.min(dy, 120) - smoothedVel) * 0.08;
        cloudUniforms.uAgitation.value = Math.min(smoothedVel * 0.004, 0.45);

        // rotation — round shapes spin, flat shapes face the camera;
        // disc/surface shapes get a fixed downward-view tilt instead
        const rot = a.rot + (b.rot - a.rot) * m;
        const tilt = a.tilt + (b.tilt - a.tilt) * m;
        cloud.rotation.y = t * 0.22 * rot;
        cloud.rotation.x = tilt + Math.sin(t * 0.14) * 0.08 * rot;

        // narrow viewports: side offsets would push the cloud off screen
        const xFactor = isMobile ? 0.35 : 1;
        cloud.position.x += ((a.x + (b.x - a.x) * m) * xFactor - cloud.position.x) * 0.06;

        mouseX += (targetMX - mouseX) * 0.05;
        mouseY += (targetMY - mouseY) * 0.05;
        // slow "breathing" dolly keeps the frame alive even when idle
        const camZ = a.camZ + (b.camZ - a.camZ) * m + Math.sin(t * 0.35) * 0.18;
        camera.position.z += (camZ - camera.position.z) * 0.08;
        camera.position.x = mouseX * 0.5;
        camera.position.y = -mouseY * 0.35;
        camera.lookAt(cloud.position.x * 0.4, 0, 0);
        // barely-there roll — handheld cinema, not a static tripod
        camera.rotation.z = Math.sin(t * 0.1) * 0.012;

        // project the cursor onto the z=0 plane the cloud lives around,
        // smoothed so the repulsion pocket glides after the hand
        pointerNdc.set(targetMX, -targetMY, 0.5).unproject(camera);
        const pDir = pointerNdc.sub(camera.position).normalize();
        if (Math.abs(pDir.z) > 0.001) {
          const pT = -camera.position.z / pDir.z;
          pointerWorld.copy(camera.position).addScaledVector(pDir, pT);
          cloudUniforms.uPointer.value.lerp(pointerWorld, 0.12);
        }

        tmpColor.setRGB(
          a.color[0] + (b.color[0] - a.color[0]) * m,
          a.color[1] + (b.color[1] - a.color[1]) * m,
          a.color[2] + (b.color[2] - a.color[2]) * m,
        );
        cloudUniforms.uColor.value.lerp(tmpColor, 0.08);
        tmpColorB.setRGB(
          a.color2[0] + (b.color2[0] - a.color2[0]) * m,
          a.color2[1] + (b.color2[1] - a.color2[1]) * m,
          a.color2[2] + (b.color2[2] - a.color2[2]) * m,
        );
        cloudUniforms.uColorB.value.lerp(tmpColorB, 0.08);
        const alpha = a.alpha + (b.alpha - a.alpha) * m;
        cloudUniforms.uOpacity.value += (alpha - cloudUniforms.uOpacity.value) * 0.08;
        cloudUniforms.uTime.value = t;

        if (!lowRes && cloudUniforms.uOpacity.value < 0.28) {
          lowRes = true;
          applyResolution();
        } else if (lowRes && cloudUniforms.uOpacity.value > 0.34) {
          lowRes = false;
          applyResolution();
        }

        stars.rotation.y = t * 0.008;
        stars.position.y = p * 2.5;

        // nebulas drift slowly and take on the section palette
        for (let i = 0; i < nebulas.length; i++) {
          const nb = nebulas[i];
          nb.mesh.position.y = nb.baseY + Math.sin(t * 0.05 + nb.phase) * 0.9 + p * 1.4;
          nb.mesh.position.x = nb.baseX + Math.cos(t * 0.04 + nb.phase) * 0.7;
          if (i === 0) nb.mat.uniforms.uColor.value.lerp(tmpColor, 0.005);
        }
        shardUniforms.uTime.value = t;

        // shards drift, tumble, and slide slowly against the scroll
        for (let i = 0; i < debris.length; i++) {
          const d = debris[i];
          d.mesh.rotation.x = t * d.spin;
          d.mesh.rotation.y = t * d.spin * 1.4;
          d.mesh.position.y = d.baseY + Math.sin(t * d.orbit + i * 1.7) * 0.5 + p * 2.2;
        }
        shardUniforms.uColor.value.lerp(tmpColor, 0.04);

        if (composer) composer.render();
        else renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };

      if (reduced) {
        if (composer) composer.render();
        else renderer.render(scene, camera);
      } else {
        raf = requestAnimationFrame(tick);
      }

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onMove);
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
