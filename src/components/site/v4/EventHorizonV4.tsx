"use client";

import { useEffect, useRef } from "react";

/**
 * Event-horizon shader behind the closing CTA and the footer, on every page.
 * One fullscreen quad, no post passes; everything is analytic so it stays
 * sharp at native resolution:
 *
 * - accretion disc with seamless angular noise, doppler beaming, polar jets
 * - photon ring and shadow edge anti-aliased to the pixel size
 * - point stars (cell hash) lensed by the hole and by the cursor
 * - the section's `[data-horizon-wordmark]` redrawn into a texture and bent
 *   by the same lens, so the ADSPIRE letters fall around the hole
 *
 * Inputs: pointer tilts the disc and lenses the stars, drag spins it with
 * inertia, press sends a shockwave, hovering `[data-horizon-feed]` feeds the
 * disc, scroll progress pulls the hole closer and scroll speed streaks the
 * stars. Resolution adapts to frame time; GL is created only near the viewport.
 */

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uPhase;
uniform vec2 uTilt;
uniform vec2 uSpin;
uniform float uHeat;
uniform float uPulse;
uniform float uWave;
uniform float uScroll;
uniform float uVel;
uniform float uIgnite;
uniform vec2 uCursor;
uniform float uCursorI;
uniform float uFeed;
uniform float uOct;
uniform float uJets;
uniform float uFadeTop;
uniform sampler2D uText;
uniform float uTextA;

const float TAU = 6.2831853;

mat2 rot(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// value noise, periodic in x with period per (keeps the disc seam-free at +-pi)
float pnoise(vec2 p, float per) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x0 = mod(i.x, per);
  float x1 = mod(i.x + 1.0, per);
  return mix(
    mix(hash(vec2(x0, i.y)), hash(vec2(x1, i.y)), u.x),
    mix(hash(vec2(x0, i.y + 1.0)), hash(vec2(x1, i.y + 1.0)), u.x),
    u.y
  );
}

float dfbm(vec2 p, float per) {
  float v = 0.0;
  float a = 0.52;
  for (int i = 0; i < 6; i++) {
    if (float(i) >= uOct) break;
    v += a * pnoise(p, per);
    p = p * 2.0 + vec2(0.0, 11.7);
    per *= 2.0;
    a *= 0.5;
  }
  return v;
}

// one star per cell, gaussian point sized in pixels; stretched radially by scroll speed
vec3 stars(vec2 p, float scale, float seed, float px, float streak) {
  vec2 g = p * scale;
  vec2 id = floor(g);
  vec2 f = fract(g);
  float h = hash(id + seed);
  float h2 = hash(id * 1.37 + seed + 3.1);
  float h3 = hash(id * 0.71 + seed + 9.4);
  vec2 o = 0.2 + 0.6 * vec2(h2, h3);
  vec2 d = (f - o) / scale;
  vec2 dir = normalize(p + 1e-4);
  float along = dot(d, dir) / (1.0 + streak);
  float perp = dot(d, vec2(-dir.y, dir.x));
  float size = px * mix(0.6, 1.7, h2 * h2 * h2);
  float b = exp(-(along * along + perp * perp) / (size * size));
  float on = step(0.8, h);
  float tw = 0.6 + 0.4 * sin(uTime * (0.8 + 2.6 * h3) + h2 * 40.0);
  vec3 tint = mix(vec3(0.6, 0.72, 1.0), vec3(1.0, 0.97, 0.93), h3);
  return tint * b * on * tw * mix(0.4, 1.5, pow(max(h - 0.8, 0.0) * 5.0, 3.0));
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 screen = (frag - 0.5 * uRes) / uRes.y;
  float px = 1.0 / uRes.y;
  float ph = uPhase;

  // the whole system leans after the pointer
  vec2 hole = uTilt * 0.05;
  vec2 uv = screen - hole;

  // scroll pulls the hole closer, feeding it tightens the disc
  float RH = mix(0.088, 0.15, smoothstep(0.0, 1.0, uScroll));
  float sr = length(uv);

  // ── lensing: the hole, plus a small second mass riding the cursor ──
  float tE = RH * 1.05;
  vec2 beta = uv - uv * (tE * tE) / max(dot(uv, uv), tE * tE * 0.35);
  vec2 dc = screen - uCursor;
  float cE = 0.05 * uCursorI;
  vec2 cDef = dc * (cE * cE) / max(dot(dc, dc), cE * cE * 0.5 + 1e-5);
  beta -= cDef;
  // shockwave: a ring of displacement racing outward
  float wr = uWave * 1.4;
  float wave = exp(-pow((sr - RH - wr) * 14.0, 2.0)) * (1.0 - uWave) * step(uWave, 1.0);
  beta += normalize(uv + 1e-4) * wave * 0.02;

  float shadow = smoothstep(RH * 0.94 - px, RH * 0.94 + 2.0 * px + RH * 0.1, sr);
  // capped so a trail never outgrows its star cell and gets clipped square
  float streak = min(abs(uVel) * 6.0, 3.5);
  vec2 drift = vec2(uTime * 0.004, 0.0);
  vec3 col = vec3(0.006, 0.006, 0.011);
  col += stars(beta + drift, 26.0, 1.0, px * 1.1, streak * 0.4) * 0.55;
  col += stars(beta * 1.03 + drift * 1.6, 52.0, 7.0, px, streak * 0.8) * 0.75;
  col += stars(beta * 1.07 + drift * 2.3, 104.0, 13.0, px * 0.9, streak) * 0.6;
  col *= shadow;

  // ── the wordmark, bent by the same lens ──
  vec2 ts = beta + hole;
  vec2 tc = ts * vec2(uRes.y / uRes.x, 1.0) + 0.5;
  float inside = step(0.0, tc.x) * step(tc.x, 1.0) * step(0.0, tc.y) * step(tc.y, 1.0);
  float glyph = texture2D(uText, clamp(tc, 0.0, 1.0)).a * inside;
  col += vec3(0.95, 0.945, 0.925) * glyph * uTextA * shadow;

  // ── accretion disc: tilted plane, pointer and drag set inclination + roll ──
  float incl = clamp(0.34 + uTilt.y * 0.14 + uSpin.y, 0.12, 0.8);
  vec2 p = rot(0.3 + uTilt.x * 0.3 + uSpin.x) * uv;
  vec2 dp = vec2(p.x, p.y / incl) * (1.0 + uFeed * 0.12);
  float r = length(dp);
  float ang = atan(dp.y, dp.x);
  float a01 = ang / TAU + 0.5;

  // inner orbits drag space around, the swirl tightens toward the horizon
  float swirl = 0.27 / (r + 0.22);
  float band = dfbm(vec2((a01 + swirl + ph * 0.038) * 8.0, r * 7.0 - ph * 0.5), 8.0);
  float band2 = dfbm(vec2((a01 - swirl * 0.7 - ph * 0.021) * 12.0, r * 15.0 + ph * 0.28), 12.0);
  float fil = pnoise(vec2((a01 + swirl * 1.4 + ph * 0.05) * 64.0, r * 60.0), 64.0);

  float disc = smoothstep(RH + 0.01, RH + 0.1, r) * exp(-(r - RH) * 3.1);
  disc *= 0.38 + band * 0.95 + band2 * 0.38 + (fil - 0.5) * 0.22 * step(4.5, uOct);
  // doppler beaming, the approaching side burns brighter
  disc *= 0.6 + 0.4 * cos(ang - 0.7);
  disc *= 1.0 + uHeat * 0.55 + uPulse * 1.1 + uFeed * 0.7;
  disc *= uIgnite;
  // the disc passes behind the hole on its far half
  disc *= mix(1.0, shadow, step(0.0, p.y));

  vec3 hot = vec3(0.84, 0.91, 1.0);
  vec3 plasma = vec3(0.42, 0.58, 0.98);
  col += mix(plasma, hot, clamp(disc * 1.3, 0.0, 1.0)) * disc;

  // far side of the disc, lensed up over the shadow: the arc that makes it read as a black hole
  float sa = atan(uv.y, uv.x) / TAU + 0.5;
  float arcN = dfbm(vec2((sa + ph * 0.03) * 8.0, sr * 9.0 - ph * 0.4), 8.0);
  float over = smoothstep(-0.35, 0.95, (rot(0.3 + uTilt.x * 0.3 + uSpin.x) * uv).y / max(sr, 1e-4));
  float arc = exp(-pow((sr - RH * 1.2) / (RH * 0.2), 2.0));
  float arcI = arc * (0.2 + arcN * 0.85) * (0.25 + 0.75 * over) * uIgnite * (1.0 + uFeed * 0.6 + uPulse);
  col += mix(plasma, hot, clamp(arcI * 1.4, 0.0, 1.0)) * arcI * 0.85;

  // photon ring: a circle hugging the shadow, width tied to the pixel so it stays a crisp line
  float rw = 1.8 * px + 0.0012;
  float ring = exp(-pow((sr - RH * 1.02) / rw, 2.0));
  float halo = exp(-pow((sr - RH * 1.02) / (rw * 6.0), 2.0)) * 0.2;
  float ringI = (1.3 + uPulse * 2.2 + uFeed * 0.9) * mix(0.25, 1.0, uIgnite);
  col += hot * (ring + halo) * ringI;

  // polar jets along the disc axis, slow pulses travelling outward
  float ay = abs(p.y);
  float jw = 0.01 + ay * 0.07;
  float jet = exp(-pow(p.x / jw, 2.0)) * exp(-ay * 2.4) * smoothstep(RH * 0.9, RH * 1.8, ay);
  jet *= 0.55 + 0.45 * sin(ay * 26.0 - ph * 5.0);
  col += plasma * jet * 0.22 * uJets * uIgnite * (1.0 + uFeed);

  // tap pulse breathes a halo outward
  col += plasma * wave * 0.25;
  col += plasma * exp(-pow((sr - RH - uPulse * 0.5) * 9.0, 2.0)) * uPulse * 0.22;

  // vignette in screen space
  col *= 1.0 - dot(screen, screen) * 0.5;

  // dither, kills banding in the dark gradients
  col += (hash(frag + fract(uTime)) - 0.5) / 255.0;

  // top edge fades into whatever background sits above the section
  float a = uFadeTop > 0.0 ? smoothstep(0.0, uFadeTop, (uRes.y - frag.y) / uRes.y) : 1.0;
  gl_FragColor = vec4(col * a, a);
}
`;

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const UNIFORMS = [
  "uRes", "uTime", "uPhase", "uTilt", "uSpin", "uHeat", "uPulse", "uWave", "uScroll", "uVel",
  "uIgnite", "uCursor", "uCursorI", "uFeed", "uOct", "uJets", "uFadeTop", "uText", "uTextA",
] as const;
type UniformName = (typeof UNIFORMS)[number];

// Painted ring for browsers without WebGL, or after the context is lost.
const FALLBACK_BG =
  "radial-gradient(ellipse 24% 8% at 50% 50%, transparent 36%, rgba(184,197,255,0.5) 42%, rgba(120,144,255,0.16) 56%, transparent 74%)," +
  "radial-gradient(circle at 50% 50%, #000 0 7%, rgba(184,197,255,0.35) 7.6%, transparent 9.5%)";

const WAVE_MS = 1400;
const IGNITE_MS = 1400;
const IDLE_AFTER_MS = 3000;

type DevCanvas = HTMLCanvasElement & {
  __boot?: () => void;
  __step?: (now: number, patch?: Record<string, number | boolean>) => void;
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Starts GL on the canvas and returns its teardown. */
function boot(canvas: HTMLCanvasElement, section: HTMLElement, mobile: boolean, coarse: boolean) {
  const noop = () => {};
  const gl = canvas.getContext("webgl", {
    antialias: false,
    alpha: true,
    premultipliedAlpha: true,
    powerPreference: mobile ? "low-power" : "high-performance",
  });
  if (!gl) {
    canvas.style.background = FALLBACK_BG;
    return noop;
  }

  const compile = (type: number, src: string) => {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    return sh;
  };
  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs = compile(gl.FRAGMENT_SHADER, FRAG);
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.warn("EventHorizonV4:", gl.getShaderInfoLog(fs) || gl.getProgramInfoLog(prog));
    canvas.style.background = FALLBACK_BG;
    return noop;
  }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "aPos");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const u = Object.fromEntries(UNIFORMS.map((n) => [n, gl.getUniformLocation(prog, n)])) as Record<
    UniformName,
    WebGLUniformLocation | null
  >;

  // ── wordmark texture: the DOM letters, redrawn so the lens can bend them ──
  const tex = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));
  gl.uniform1i(u.uText, 0);

  const wordmark = section.querySelector<HTMLElement>("[data-horizon-wordmark]");
  const glyphs = (wordmark?.firstElementChild as HTMLElement | null) ?? wordmark;
  const textCanvas = document.createElement("canvas");
  let hasText = false;
  let disposed = false;

  const drawText = () => {
    if (!glyphs || !wordmark) return;
    const cr = canvas.getBoundingClientRect();
    const tr = glyphs.getBoundingClientRect();
    const text = (glyphs.textContent ?? "").trim();
    const ctx = textCanvas.getContext("2d");
    if (!ctx || !cr.width || !tr.width || !text) return;
    const k = canvas.width / cr.width;
    textCanvas.width = canvas.width;
    textCanvas.height = canvas.height;
    const cs = getComputedStyle(glyphs);
    ctx.font = `${cs.fontWeight} ${parseFloat(cs.fontSize) * k}px ${cs.fontFamily}`;
    const spacing = parseFloat(cs.letterSpacing);
    (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = `${
      Number.isFinite(spacing) ? spacing * k : 0
    }px`;
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    const m = ctx.measureText(text);
    const ascent = m.fontBoundingBoxAscent ?? m.actualBoundingBoxAscent;
    const descent = m.fontBoundingBoxDescent ?? m.actualBoundingBoxDescent;
    // an inline box is exactly the font's content area, so centre ascent+descent in it
    const baseline = (tr.top - cr.top) * k + (tr.height * k - (ascent + descent)) / 2 + ascent;
    ctx.lineWidth = 1.5 * k;
    ctx.strokeStyle = "#fff";
    ctx.strokeText(text, (tr.left + tr.width / 2 - cr.left) * k, baseline);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);
    hasText = true;
  };

  // ── resolution: native up to DPR 2, stepped down when frames run long ──
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const qMax = mobile ? 1 : dpr;
  const qMin = mobile ? 0.35 : 0.5;
  let q = mobile ? 0.6 : dpr;
  let qCeil = qMax;
  const octaves = () => (mobile ? (q >= 0.8 ? 4 : 3) : q >= 1 ? 6 : 5);

  const resize = () => {
    const r = canvas.getBoundingClientRect();
    const w = Math.max(2, Math.round(r.width * q));
    const h = Math.max(2, Math.round(r.height * q));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
    drawText();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(section);
  document.fonts?.ready.then(() => {
    if (!disposed) drawText();
  });

  // ── input state ──
  const s = {
    tx: 0, ty: 0, mx: 0, my: 0,
    heat: 0, pulse: 0, waveStart: -1,
    lastX: 0, lastY: 0, lastMove: performance.now(),
    ctx: 0, cty: 0, cx: 0, cy: 0, cIt: 0, cI: 0,
    drag: false, spinX: 0, spinY: 0, spinVX: 0, spinVY: 0,
    feedT: 0, feed: 0, nearText: 0, textA: 0,
    vel: 0, lastScroll: window.scrollY, phase: 0, igniteAt: -1,
  };

  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;
    const lx = e.clientX - r.left;
    const ly = e.clientY - r.top;
    s.tx = clamp((lx / Math.max(r.width, 1) - 0.5) * 2, -1, 1);
    s.ty = clamp(0.5 - ly / Math.max(r.height, 1), -1, 1);
    s.ctx = (lx - r.width / 2) / Math.max(r.height, 1);
    s.cty = (r.height / 2 - ly) / Math.max(r.height, 1);
    const inside = ly >= 0 && ly <= r.height;
    s.cIt = inside && (e.pointerType !== "touch" || s.drag) ? 1 : 0;
    if (s.drag) {
      s.spinVX += (e.clientX - s.lastX) * 0.0022;
      // vertical finger drags scroll the page; only a mouse tips the disc
      if (e.pointerType !== "touch") s.spinVY -= (e.clientY - s.lastY) * 0.0011;
    }
    s.heat = Math.min(s.heat + Math.hypot(e.clientX - s.lastX, e.clientY - s.lastY) * 0.004, 1);
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    s.lastMove = performance.now();
    if (glyphs) {
      const g = glyphs.getBoundingClientRect();
      s.nearText =
        e.clientX >= g.left && e.clientX <= g.right && e.clientY >= g.top - 40 && e.clientY <= g.bottom + 40
          ? 1
          : 0;
    }
  };

  const onDown = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    if (e.clientY < r.top || e.clientY > r.bottom) return;
    s.pulse = 1;
    s.waveStart = performance.now();
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    const t = e.target as Element | null;
    if (!t?.closest?.("a, button, input, textarea, select, label")) s.drag = true;
    if (e.pointerType === "touch") onMove(e);
  };

  const onUp = (e: PointerEvent) => {
    s.drag = false;
    if (e.pointerType === "touch") s.cIt = 0;
  };

  const onOut = (e: PointerEvent) => {
    if (!e.relatedTarget) s.cIt = 0;
  };

  // hovering the section's main button feeds the hole; any other link a little
  const onOver = (e: PointerEvent) => {
    const el = (e.target as Element | null)?.closest?.("[data-horizon-feed], a, button");
    s.feedT = !el ? 0 : el.hasAttribute("data-horizon-feed") ? 1 : 0.3;
  };
  const onLeave = () => {
    s.feedT = 0;
  };

  // Android tilt; iOS needs a permission prompt, not worth one for decoration
  const onTilt = (e: DeviceOrientationEvent) => {
    if (e.gamma == null || e.beta == null) return;
    s.tx = clamp(e.gamma / 25, -1, 1);
    s.ty = clamp((45 - e.beta) / 25, -1, 1);
    s.lastMove = performance.now();
  };
  const useTilt =
    coarse && typeof DeviceOrientationEvent !== "undefined" && !("requestPermission" in DeviceOrientationEvent);

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerdown", onDown, { passive: true });
  window.addEventListener("pointerup", onUp, { passive: true });
  window.addEventListener("pointercancel", onUp, { passive: true });
  window.addEventListener("pointerout", onOut, { passive: true });
  section.addEventListener("pointerover", onOver, { passive: true });
  section.addEventListener("pointerleave", onLeave, { passive: true });
  if (useTilt) window.addEventListener("deviceorientation", onTilt, { passive: true });

  // ── frame ──
  const start = performance.now();
  let last = start;
  let fAcc = 0;
  let fN = 0;
  let calm = 0;

  const frame = (now: number) => {
    const rawDt = now - last;
    const dt = Math.min(rawDt, 50);
    last = now;
    const k = dt / 16.667;
    const t = (now - start) / 1000;

    // adapt resolution to the measured frame time
    if (rawDt < 100) {
      fAcc += rawDt;
      fN++;
    }
    if (fN === 30) {
      const avg = fAcc / fN;
      fAcc = 0;
      fN = 0;
      if (avg > 21 && q > qMin) {
        // a level that dropped frames once is not tried again, or it would oscillate
        qCeil = q * 0.999;
        q = Math.max(qMin, q * 0.8);
        calm = 0;
        resize();
      } else if (avg < 18 && q * 1.15 < qCeil) {
        // 18 ms, not less: a 60 Hz screen never reports faster than ~16.7
        if (++calm >= 4) {
          q = Math.min(qCeil, q * 1.15);
          calm = 0;
          resize();
        }
      } else {
        calm = 0;
      }
    }

    // idle: nobody touching for a while, the disc wanders on its own
    const idle = clamp((now - s.lastMove - IDLE_AFTER_MS) / 1500, 0, 1);
    const ix = Math.sin(t * 0.23) * 0.55 * idle;
    const iy = Math.sin(t * 0.31 + 1) * 0.45 * idle;
    s.mx += (s.tx * (1 - idle) + ix - s.mx) * 0.06 * k;
    s.my += (s.ty * (1 - idle) + iy - s.my) * 0.06 * k;

    s.cx += (s.ctx - s.cx) * 0.2 * k;
    s.cy += (s.cty - s.cy) * 0.2 * k;
    s.cI += (s.cIt - s.cI) * 0.08 * k;

    s.spinX += s.spinVX * k;
    s.spinY = clamp(s.spinY + s.spinVY * k, -0.3, 0.35);
    s.spinVX *= Math.pow(0.93, k);
    s.spinVY *= Math.pow(0.93, k);
    if (!s.drag) {
      s.spinX *= Math.pow(0.985, k);
      s.spinY *= Math.pow(0.97, k);
    }

    s.heat *= Math.pow(0.94, k);
    s.pulse *= Math.pow(0.94, k);
    s.feed += (s.feedT - s.feed) * 0.08 * k;

    const r = canvas.getBoundingClientRect();
    const scroll = clamp((window.innerHeight - r.top) / Math.max(r.height, 1), 0, 1);
    const sy = window.scrollY;
    const v = clamp((sy - s.lastScroll) / Math.max(dt, 1) / 3, -1, 1);
    s.lastScroll = sy;
    // fast attack, slow release: the smear appears at once, then settles
    s.vel += (v - s.vel) * Math.min(1, (Math.abs(v) > Math.abs(s.vel) ? 0.35 : 0.06) * k);

    s.phase += (dt / 1000) * (1 + scroll * 0.5 + s.feed * 0.9 + s.heat * 0.6 + s.pulse * 0.8);

    if (s.igniteAt < 0) s.igniteAt = now;
    const ig = clamp((now - s.igniteAt) / IGNITE_MS, 0, 1);
    const ignite = 1 - Math.pow(1 - ig, 3);

    let wave = 2;
    if (s.waveStart >= 0) {
      wave = (now - s.waveStart) / WAVE_MS;
      if (wave > 1) {
        s.waveStart = -1;
        wave = 2;
      }
    }

    const textTarget = hasText ? 0.22 + s.nearText * 0.38 + s.feed * 0.12 : 0;
    s.textA += (textTarget - s.textA) * 0.06 * k;

    gl.uniform2f(u.uRes, canvas.width, canvas.height);
    gl.uniform1f(u.uTime, t);
    gl.uniform1f(u.uPhase, s.phase);
    gl.uniform2f(u.uTilt, s.mx, s.my);
    gl.uniform2f(u.uSpin, s.spinX, s.spinY);
    gl.uniform1f(u.uHeat, s.heat);
    gl.uniform1f(u.uPulse, s.pulse);
    gl.uniform1f(u.uWave, wave);
    gl.uniform1f(u.uScroll, scroll);
    gl.uniform1f(u.uVel, s.vel);
    gl.uniform1f(u.uIgnite, ignite);
    gl.uniform2f(u.uCursor, s.cx, s.cy);
    gl.uniform1f(u.uCursorI, s.cI);
    gl.uniform1f(u.uFeed, s.feed);
    gl.uniform1f(u.uOct, octaves());
    gl.uniform1f(u.uJets, mobile ? 0 : 1);
    gl.uniform1f(u.uFadeTop, 0.12);
    gl.uniform1f(u.uTextA, s.textA * ignite);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    // the shader now draws the letters; the DOM copy would double them
    if (hasText && wordmark && wordmark.style.opacity !== "0") wordmark.style.opacity = "0";
  };

  // ── run only while on screen, the tab is visible and the context lives ──
  let inView = false;
  let lost = false;
  let running = false;
  let raf = 0;
  const tick = (now: number) => {
    if (!running) return;
    frame(now);
    raf = requestAnimationFrame(tick);
  };
  const sync = () => {
    const should = inView && !document.hidden && !lost && !disposed;
    if (should && !running) {
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    } else if (!should && running) {
      running = false;
      cancelAnimationFrame(raf);
    }
  };
  const io = new IntersectionObserver(
    (entries) => {
      inView = entries.some((en) => en.isIntersecting);
      sync();
    },
    { rootMargin: "120px" },
  );
  io.observe(canvas);
  document.addEventListener("visibilitychange", sync);

  const onLost = (e: Event) => {
    e.preventDefault();
    lost = true;
    sync();
    canvas.style.background = FALLBACK_BG;
    if (wordmark) wordmark.style.opacity = "";
  };
  canvas.addEventListener("webglcontextlost", onLost);

  // Dev only: the in-app browser pane runs no rAF, so frames are stepped by hand.
  if (process.env.NODE_ENV === "development") {
    (canvas as DevCanvas).__step = (now, patch) => {
      Object.assign(s, patch);
      frame(now);
    };
  }

  return () => {
    disposed = true;
    running = false;
    cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    document.removeEventListener("visibilitychange", sync);
    canvas.removeEventListener("webglcontextlost", onLost);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onUp);
    window.removeEventListener("pointerout", onOut);
    section.removeEventListener("pointerover", onOver);
    section.removeEventListener("pointerleave", onLeave);
    if (useTilt) window.removeEventListener("deviceorientation", onTilt);
    if (wordmark) wordmark.style.opacity = "";
    gl.deleteTexture(tex);
    gl.deleteProgram(prog);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    gl.deleteBuffer(buf);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  };
}

/**
 * Drop into any `position: relative` section; the canvas fills it. The
 * section's `[data-horizon-wordmark]` (first child holds the letters) is taken
 * over by the shader, and `[data-horizon-feed]` marks the button that feeds it.
 */
export function EventHorizonV4() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement;
    if (!canvas || !section) return;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    // GL, shader compile and listeners only once the section is close: this
    // sits at the bottom of every page and must not cost the first paint.
    let dispose: (() => void) | null = null;
    const lazy = new IntersectionObserver(
      (entries) => {
        if (dispose || !entries.some((en) => en.isIntersecting)) return;
        lazy.disconnect();
        dispose = boot(canvas, section, mobile, coarse);
      },
      { rootMargin: "400px" },
    );
    lazy.observe(canvas);
    if (process.env.NODE_ENV === "development") {
      (canvas as DevCanvas).__boot = () => {
        if (dispose) return;
        lazy.disconnect();
        dispose = boot(canvas, section, mobile, coarse);
      };
    }

    return () => {
      lazy.disconnect();
      dispose?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
