"use client";

import { useEffect, useRef } from "react";

/**
 * Event-horizon shader — replaces the CTA blackhole.mp4 with a live,
 * interactive black hole: fbm accretion disc with doppler beaming, a hot
 * photon ring, and a gravitationally lensed starfield. Raw WebGL fullscreen
 * quad (SilkV4 pattern): reduced resolution, renders only while on screen.
 *
 * Interactive on both inputs: pointer/finger tilts and rolls the disc,
 * movement speed heats it; press/tap sends a bright pulse through the ring.
 */

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseI;
uniform float uPulse;

mat2 rot(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.55;
  for (int i = 0; i < 4; i++) {
    v += amp * noise(p);
    p = rot(0.6) * p * 2.1;
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime;

  // hand parallax — the whole system leans after the pointer
  uv -= uMouse * 0.05;

  const float RH = 0.15; // event horizon radius (screen space)

  // ── lensed starfield: rays bend toward the mass ──
  float sr = length(uv);
  vec2 bg = uv * (1.0 + 0.06 / max(sr, 0.06)) + vec2(t * 0.004, 0.0);
  float stars = smoothstep(0.88, 1.0, noise(bg * 46.0)) * 0.45
    + smoothstep(0.94, 1.0, noise(bg * 90.0 + 7.0)) * 0.6;
  // the shadow swallows everything behind it
  float shadow = smoothstep(RH * 0.92, RH * 1.06, sr);
  vec3 col = vec3(0.006, 0.006, 0.01) + vec3(0.6, 0.72, 1.0) * stars * shadow;

  // ── accretion disc: tilted plane, pointer changes inclination + roll ──
  float incl = 0.34 + uMouse.y * 0.14;
  vec2 p = rot(0.3 + uMouse.x * 0.3) * uv;
  vec2 dp = vec2(p.x, p.y / max(incl, 0.16));
  float r = length(dp);
  float ang = atan(dp.y, dp.x);

  // inner orbits drag space around — the swirl tightens toward the horizon
  float swirl = 1.7 / (r + 0.22);
  float band = fbm(vec2(r * 7.0 - t * 0.5, ang * 2.2 + swirl + t * 0.24));
  float band2 = fbm(vec2(r * 13.0 + t * 0.28, ang * 3.4 - swirl * 0.7));

  float disc = smoothstep(RH + 0.012, RH + 0.1, r) * exp(-(r - RH) * 3.1);
  disc *= 0.4 + band * 0.95 + band2 * 0.35;
  // doppler beaming — the approaching side burns brighter
  disc *= 0.6 + 0.4 * cos(ang - 0.7);
  disc *= 1.0 + uMouseI * 0.55 + uPulse * 1.1;

  // ice grade: electric-blue plasma with a white-hot inner edge
  vec3 warm = vec3(0.82, 0.9, 1.0);
  vec3 silver = vec3(0.42, 0.58, 0.98);
  col += mix(silver, warm, clamp(disc * 1.3, 0.0, 1.0)) * disc;

  // photon ring — light orbiting the horizon itself
  float ring = exp(-pow((r - (RH + 0.014)) * 85.0, 2.0));
  col += warm * ring * (1.3 + uPulse * 2.2);

  // tap pulse also breathes a faint halo outward
  col += silver * exp(-pow((sr - RH - uPulse * 0.5) * 9.0, 2.0)) * uPulse * 0.5;

  // vignette
  col *= 1.0 - dot(uv, uv) * 0.55;

  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

export function EventHorizonV4() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Mobile: decorative event-horizon shader — skip the WebGL rAF loop on
    // low-end phones to protect the main thread (mobile Lighthouse).
    if (window.matchMedia("(max-width: 767px)").matches) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uMouseI = gl.getUniformLocation(prog, "uMouseI");
    const uPulse = gl.getUniformLocation(prog, "uPulse");

    // sharper than silk (the photon ring needs pixels), still sub-native
    const SCALE = window.matchMedia("(max-width: 767px)").matches ? 0.5 : 0.65;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(2, Math.floor(r.width * SCALE));
      canvas.height = Math.max(2, Math.floor(r.height * SCALE));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // pointer (mouse or finger) in shader uv space; speed heats the disc
    let tx = 0;
    let ty = 0;
    let mx = 0;
    let my = 0;
    let heat = 0;
    let lastX = 0;
    let lastY = 0;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const relX = (e.clientX - r.left) / Math.max(r.width, 1);
      const relY = (e.clientY - r.top) / Math.max(r.height, 1);
      tx = (relX - 0.5) * 2.0;
      ty = 0.5 - relY;
      heat = Math.min(heat + Math.hypot(e.clientX - lastX, e.clientY - lastY) * 0.004, 1);
      lastX = e.clientX;
      lastY = e.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // tap / click → pulse races through the ring
    let pulse = 0;
    const onDown = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      if (e.clientY >= r.top && e.clientY <= r.bottom) pulse = 1;
    };
    window.addEventListener("pointerdown", onDown, { passive: true });

    let visible = false;
    let raf = 0;
    const start = performance.now();
    const frame = () => {
      mx += (tx - mx) * 0.06;
      my += (ty - my) * 0.06;
      heat *= 0.94;
      pulse *= 0.94;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, mx, my);
      gl.uniform1f(uMouseI, heat);
      gl.uniform1f(uPulse, pulse);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const tick = () => {
      if (!visible) return;
      frame();
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const on = entries.some((en) => en.isIntersecting);
        if (on && !visible) {
          visible = true;
          raf = requestAnimationFrame(tick);
        } else if (!on) {
          visible = false;
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: "120px" },
    );
    io.observe(canvas);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
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
