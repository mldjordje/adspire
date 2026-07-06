"use client";

import { useEffect, useRef } from "react";

/**
 * EMBER — fullscreen GLSL ember field.
 * Raw Three.js (matches ServicesR3F imperative pattern), fullscreen shader quad.
 * Reacts to pointer (desktop) and touch (mobile). DPR clamped for mobile perf.
 */
const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2  uMouse;
  uniform vec2  uRes;
  uniform float uPointer;
  uniform float uCount;
  varying vec2  vUv;

  float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    float a = hash(i), b = hash(i + vec2(1.0,0.0)), c = hash(i + vec2(0.0,1.0)), d = hash(i + vec2(1.0,1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
  }

  void main(){
    vec2 uv = vUv;
    float aspect = uRes.x / uRes.y;
    vec2 p = vec2(uv.x * aspect, uv.y);
    vec2 m = vec2(uMouse.x * aspect, uMouse.y);

    vec3 col = vec3(0.022, 0.019, 0.017);

    // warm vignette rising from bottom
    float vig = smoothstep(1.15, 0.15, length((uv - vec2(0.5, 0.08)) * vec2(aspect, 1.0)));
    col += vec3(0.20, 0.07, 0.015) * vig * 0.35;

    vec3 emberCol = vec3(1.0, 0.45, 0.10);
    float ember = 0.0;

    for (int i = 0; i < 64; i++){
      if (float(i) >= uCount) break;
      float fi = float(i);
      float seed  = hash(vec2(fi, 1.0));
      float speed = 0.035 + 0.10 * hash(vec2(fi, 2.0));
      float x     = hash(vec2(fi, 3.0));
      float y     = fract(seed + uTime * speed);
      x += 0.03 * sin(uTime * (0.4 + seed) + fi);
      vec2 pos = vec2(x * aspect, y);
      float d  = length(p - pos);
      float size  = 0.0010 + 0.0030 * hash(vec2(fi, 4.0));
      float flick = 0.55 + 0.45 * sin(uTime * (3.0 + seed * 6.0) + fi * 1.7);
      float life  = smoothstep(1.0, 0.55, y) * smoothstep(0.0, 0.06, y);
      ember += (size / max(d, 0.0008)) * 0.42 * flick * life;
    }
    col += emberCol * ember;

    // cursor heat — "raspaljuje vatru"
    float md = length(p - m);
    float glow = exp(-md * md * 9.0) * uPointer;
    col += vec3(1.0, 0.38, 0.10) * glow * 0.55;
    col += emberCol * (0.0035 / (md + 0.025)) * uPointer * 0.12;

    // fine grain
    col += (noise(uv * uRes * 0.5 + uTime) - 0.5) * 0.014;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function EmberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let raf = 0;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "high-performance" });
      const dprCap = isMobile ? 1.4 : 2;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));

      const scene = new THREE.Scene();
      const camera = new THREE.Camera();

      const uniforms = {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uRes: { value: new THREE.Vector2(1, 1) },
        uPointer: { value: isMobile ? 0.6 : 0.0 },
        uCount: { value: isMobile ? 32 : 64 },
      };

      const material = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      scene.add(mesh);

      const targetMouse = new THREE.Vector2(0.5, 0.5);
      let targetPointer = isMobile ? 0.6 : 0.0;

      const resize = () => {
        const w = canvas.clientWidth || window.innerWidth;
        const h = canvas.clientHeight || window.innerHeight;
        renderer.setSize(w, h, false);
        uniforms.uRes.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
      };
      resize();
      window.addEventListener("resize", resize);

      const onMove = (e: PointerEvent) => {
        const r = canvas.getBoundingClientRect();
        targetMouse.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
        targetPointer = 1;
      };
      const onLeave = () => { targetPointer = isMobile ? 0.6 : 0; };
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerout", onLeave);

      const start = performance.now();
      const loop = () => {
        if (disposed) return;
        uniforms.uTime.value = (performance.now() - start) / 1000;
        uniforms.uMouse.value.lerp(targetMouse, 0.08);
        uniforms.uPointer.value += (targetPointer - uniforms.uPointer.value) * 0.06;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(loop);
      };
      loop();

      (canvas as HTMLCanvasElement & { __cleanup?: () => void }).__cleanup = () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerout", onLeave);
        cancelAnimationFrame(raf);
        mesh.geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      const c = canvasRef.current as (HTMLCanvasElement & { __cleanup?: () => void }) | null;
      c?.__cleanup?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, display: "block" }}
    />
  );
}
