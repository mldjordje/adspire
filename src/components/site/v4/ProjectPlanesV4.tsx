"use client";

import { useEffect, useRef } from "react";

/**
 * ProjectPlanesV4 — one shared WebGL canvas over the pinned horizontal
 * projects strip. Each project screenshot becomes a shader quad that tracks
 * its DOM <img> rect every frame (so GSAP parallax / hover zoom / velocity
 * skew keep driving the motion). Effects: ripple displacement on
 * hover/touch, RGB split tied to scroll velocity, noise dissolve + curl as
 * panels enter and leave the frame. The DOM <img> stays in the tree as
 * SEO / no-JS / no-WebGL fallback and is only faded once its texture is live.
 */

const VERT = `
attribute vec2 aPos;
uniform vec4 uRect;   /* x, y, w, h in canvas device px */
uniform vec2 uCanvas;
varying vec2 vUv;
void main() {
  vUv = aPos;
  vec2 px = uRect.xy + aPos * uRect.zw;
  vec2 clip = (px / uCanvas) * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uUvOff;
uniform vec2 uUvScale;
uniform vec2 uSize;    /* quad size in device px */
uniform float uRadius; /* corner radius in device px */
uniform vec2 uMouse;   /* pointer in quad uv */
uniform float uHover;
uniform float uVel;    /* smoothed scroll velocity, signed */
uniform float uReveal; /* 0 hidden -> 1 fully in frame */
uniform float uTime;
uniform vec3 uAccent;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

void main() {
  vec2 uv = vUv;
  float aspect = uSize.x / max(uSize.y, 1.0);

  /* curl roll while the panel materialises / dissolves */
  float curl = 1.0 - uReveal;
  uv.x += curl * 0.16 * sin(uv.y * 6.0 + uTime * 1.3) * (0.35 + 0.65 * uv.x);
  uv.y += curl * 0.09 * sin(uv.x * 8.0 - uTime * 1.1);

  /* pointer ripple + soft magnet */
  vec2 d = uv - uMouse;
  vec2 da = d * vec2(aspect, 1.0);
  float dist = length(da);
  float rip = sin(dist * 30.0 - uTime * 5.2) * exp(-dist * 4.6) * uHover;
  uv += (da / max(dist, 1e-4)) * rip * 0.016 * vec2(1.0 / aspect, 1.0);
  uv -= d * exp(-dist * 3.4) * uHover * 0.045;

  /* velocity + ripple drive the RGB split */
  float split = clamp(uVel, -3.0, 3.0) * 0.0032 + rip * 0.010;
  vec2 tuv = uUvOff + uv * uUvScale;
  float r = texture2D(uTex, tuv + vec2(split, 0.0)).r;
  vec4 gs = texture2D(uTex, tuv);
  float b = texture2D(uTex, tuv - vec2(split, 0.0)).b;
  vec3 col = vec3(r, gs.g, b);

  /* accent wash, echoes the old ::after gradient */
  float gmask = smoothstep(0.5, 1.15, vUv.x * 0.34 + vUv.y * 0.94);
  col += uAccent * gmask * 0.16;

  /* noise dissolve with accent-lit edge: pixels appear where n < threshold */
  float n = noise(vUv * vec2(9.0, 6.0) + uTime * 0.04);
  float th = uReveal * 1.28 - 0.14;
  float a = 1.0 - smoothstep(th - 0.06, th + 0.06, n);
  float edge = smoothstep(th - 0.16, th - 0.04, n) * (1.0 - smoothstep(th - 0.04, th + 0.02, n));
  edge *= smoothstep(1.0, 0.8, uReveal);
  col += uAccent * edge * 1.1;

  /* rounded-rect mask so corners match the DOM frame */
  vec2 p = (vUv - 0.5) * uSize;
  vec2 q = abs(p) - (uSize * 0.5 - uRadius);
  float sd = length(max(q, vec2(0.0))) + min(max(q.x, q.y), 0.0) - uRadius;
  float corner = 1.0 - smoothstep(-1.5, 0.5, sd);

  float outA = a * corner;
  gl_FragColor = vec4(col * outA, outA);
}
`;

type Plane = {
  img: HTMLImageElement;
  media: HTMLElement;
  link: HTMLElement; // rect source for the quad (inside the 1px border)
  tex: WebGLTexture | null;
  texW: number;
  texH: number;
  ready: boolean;
  accent: [number, number, number];
  mouse: [number, number];
  mouseT: [number, number];
  hover: number;
  hoverT: number;
};

function hexTo01(hex: string): [number, number, number] {
  const m = hex.trim().match(/^#?([0-9a-f]{6})$/i);
  if (!m) return [0.95, 0.94, 0.9];
  const v = parseInt(m[1], 16);
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
}

export default function ProjectPlanesV4({
  panelClass,
  mediaClass,
  linkClass,
  imgClass,
  className,
}: {
  panelClass: string;
  mediaClass: string;
  linkClass: string;
  imgClass: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = canvas.parentElement;
    if (!section) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.warn("ProjectPlanesV4 shader:", gl.getShaderInfoLog(sh));
        return null;
      }
      return sh;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uRect = U("uRect");
    const uCanvas = U("uCanvas");
    const uTex = U("uTex");
    const uUvOff = U("uUvOff");
    const uUvScale = U("uUvScale");
    const uSize = U("uSize");
    const uRadius = U("uRadius");
    const uMouse = U("uMouse");
    const uHover = U("uHover");
    const uVel = U("uVel");
    const uReveal = U("uReveal");
    const uTime = U("uTime");
    const uAccent = U("uAccent");
    gl.uniform1i(uTex, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    // ── planes from the DOM strip ─────────────────────────────────
    const planes: Plane[] = [];
    const cleanups: Array<() => void> = [];
    section.querySelectorAll<HTMLElement>(`.${panelClass}`).forEach((panel) => {
      const img = panel.querySelector<HTMLImageElement>(`.${imgClass}`);
      const link = panel.querySelector<HTMLElement>(`.${linkClass}`);
      const media = panel.querySelector<HTMLElement>(`.${mediaClass}`);
      if (!img || !link || !media) return;
      const plane: Plane = {
        img,
        media,
        link,
        tex: null,
        texW: 1,
        texH: 1,
        ready: false,
        accent: hexTo01(getComputedStyle(panel).getPropertyValue("--accent")),
        mouse: [0.5, 0.5],
        mouseT: [0.5, 0.5],
        hover: 0,
        hoverT: 0,
      };
      planes.push(plane);

      const loader = new Image();
      loader.onload = () => {
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, loader);
        plane.tex = tex;
        plane.texW = loader.naturalWidth || 1;
        plane.texH = loader.naturalHeight || 1;
        plane.ready = true;
        img.style.opacity = "0"; // DOM img keeps layout + SEO, shader takes over paint
        media.style.background = "transparent"; // dissolve reveals the particle scene, not a black card
      };
      loader.src = img.getAttribute("src") || "";

      const onMove = (e: PointerEvent) => {
        const r = link.getBoundingClientRect();
        plane.mouseT[0] = (e.clientX - r.left) / Math.max(r.width, 1);
        plane.mouseT[1] = (e.clientY - r.top) / Math.max(r.height, 1);
        plane.hoverT = 1;
      };
      const onLeave = () => {
        plane.hoverT = 0;
      };
      media.addEventListener("pointermove", onMove);
      media.addEventListener("pointerdown", onMove);
      media.addEventListener("pointerleave", onLeave);
      media.addEventListener("pointercancel", onLeave);
      cleanups.push(() => {
        media.removeEventListener("pointermove", onMove);
        media.removeEventListener("pointerdown", onMove);
        media.removeEventListener("pointerleave", onLeave);
        media.removeEventListener("pointercancel", onLeave);
      });
    });
    if (!planes.length) return;

    // ── sizing ────────────────────────────────────────────────────
    const dpr = () => Math.min(window.devicePixelRatio || 1, 1.75);
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const d = dpr();
      canvas.width = Math.max(1, Math.round(r.width * d));
      canvas.height = Math.max(1, Math.round(r.height * d));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // ── render loop, alive only near the section ──────────────────
    let raf = 0;
    let active = false;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let vel = 0;
    const t0 = performance.now();

    const tick = () => {
      raf = active ? requestAnimationFrame(tick) : 0;
      const now = performance.now();
      const dt = Math.min((now - lastT) / 1000, 0.05) || 0.016;
      lastT = now;

      const y = window.scrollY;
      const rawV = (y - lastY) / dt / 1000; // ~kpx/s
      lastY = y;
      vel += (Math.max(-3, Math.min(3, rawV)) - vel) * Math.min(dt * 8, 1);

      const cr = canvas.getBoundingClientRect();
      if (canvas.width !== Math.round(cr.width * dpr())) resize();
      const d = dpr();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uCanvas, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - t0) / 1000);
      gl.uniform1f(uVel, vel);

      for (const plane of planes) {
        if (!plane.ready) continue;
        const lr = plane.link.getBoundingClientRect();
        if (lr.right < -80 || lr.left > vw + 80 || lr.bottom < -80 || lr.top > vh + 80) continue;

        // reveal: horizontal enter/exit through the strip + vertical arrival
        const enter = Math.min(Math.max((vw - lr.left) / (vw * 0.42), 0), 1);
        const exit = Math.min(Math.max((lr.right + vw * 0.04) / (vw * 0.3), 0), 1);
        const ventry = Math.min(Math.max((vh * 1.05 - lr.top) / (vh * 0.4), 0), 1);
        let reveal = Math.min(enter, exit, ventry);
        reveal = reveal * reveal * (3 - 2 * reveal);

        plane.mouse[0] += (plane.mouseT[0] - plane.mouse[0]) * Math.min(dt * 9, 1);
        plane.mouse[1] += (plane.mouseT[1] - plane.mouse[1]) * Math.min(dt * 9, 1);
        plane.hover += (plane.hoverT - plane.hover) * Math.min(dt * (plane.hoverT ? 5 : 3), 1);

        // uv mapping: quad uv -> texture uv, honouring object-fit cover
        // (top center) on the transform-scaled <img> box — GSAP parallax and
        // hover zoom move the img rect, the mapping follows for free
        const ir = plane.img.getBoundingClientRect();
        const s = Math.max(ir.width / plane.texW, ir.height / plane.texH) || 1;
        const visW = ir.width / s;
        const visH = ir.height / s;
        const offX = (plane.texW - visW) / 2;
        const scaleX = (lr.width / ir.width) * (visW / plane.texW);
        const scaleY = (lr.height / ir.height) * (visH / plane.texH);
        const offU = (((lr.left - ir.left) / ir.width) * visW + offX) / plane.texW;
        const offV = (((lr.top - ir.top) / ir.height) * visH) / plane.texH;

        gl.bindTexture(gl.TEXTURE_2D, plane.tex);
        gl.uniform4f(uRect, (lr.left - cr.left) * d, (lr.top - cr.top) * d, lr.width * d, lr.height * d);
        gl.uniform2f(uUvOff, offU, offV);
        gl.uniform2f(uUvScale, scaleX, scaleY);
        gl.uniform2f(uSize, lr.width * d, lr.height * d);
        gl.uniform1f(uRadius, 17 * d);
        gl.uniform2f(uMouse, plane.mouse[0], plane.mouse[1]);
        gl.uniform1f(uHover, plane.hover);
        gl.uniform1f(uReveal, reveal);
        gl.uniform3f(uAccent, plane.accent[0], plane.accent[1], plane.accent[2]);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        const next = entry.isIntersecting;
        if (next && !active) {
          active = true;
          lastY = window.scrollY;
          lastT = performance.now();
          raf = requestAnimationFrame(tick);
        } else if (!next && active) {
          active = false;
          if (raf) cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { rootMargin: "25% 0px" },
    );
    io.observe(section);

    const restoreImgs = () =>
      planes.forEach((p) => {
        p.img.style.opacity = "";
        p.media.style.background = "";
      });
    const onLost = (e: Event) => {
      e.preventDefault();
      restoreImgs(); // DOM screenshots come back if the context dies
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      active = false;
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("webglcontextlost", onLost);
      cleanups.forEach((fn) => fn());
      restoreImgs();
      planes.forEach((p) => p.tex && gl.deleteTexture(p.tex));
      gl.deleteBuffer(quad);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      // no loseContext(): a StrictMode remount reuses this canvas and
      // getContext would hand back the lost context, leaving black frames
    };
  }, [panelClass, mediaClass, linkClass, imgClass]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
