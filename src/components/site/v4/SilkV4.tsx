"use client";

import { useEffect, useRef } from "react";

/**
 * Silky flowing-noise shader background — raw WebGL fullscreen quad, no
 * three.js overhead. Renders at reduced resolution and only while its
 * section is in the viewport. Drop inside a position:relative section.
 *
 * Interactive: the cursor warps the silk folds and lights them up where it
 * passes — the fabric answers the visitor's hand.
 */

const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseI;
uniform float uScroll;
uniform float uVel;

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
  for (int i = 0; i < 5; i++) {
    v += amp * noise(p);
    p = rot(0.6) * p * 2.05;
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  // Kept unwarped: the vignette belongs to the screen, not to the fabric, so
  // it must not drift off-centre when scroll moves the weave.
  vec2 screenUv = uv;
  float t = uTime * 0.075;

  // Scroll drifts the weave and rotates it a few degrees over the length of a
  // page, so a long guide does not sit on one frozen fold pattern. Velocity
  // shears it along the scroll axis — the fabric lags the movement, then
  // catches up, which is the whole effect.
  uv += vec2(uScroll * 0.18, -uScroll * 0.42);
  uv = rot(uScroll * 0.22 + uVel * 0.09) * uv;
  uv.y *= 1.0 + abs(uVel) * 0.35;

  // cursor influence — a soft pocket that pushes and lights the folds
  vec2 duv = uv - uMouse;
  float inf = exp(-dot(duv, duv) * 9.0) * uMouseI;

  // Idle life. Without this the fabric only really moves under the cursor,
  // so a visitor who is reading rather than pointing sees a still image. A
  // second pocket wanders the frame on a slow lissajous and fades in exactly
  // as the cursor's influence fades out, so the two never fight.
  vec2 iuv = vec2(cos(uTime * 0.11) * 0.62, sin(uTime * 0.083) * 0.42);
  vec2 iduv = uv - iuv;
  float idle = exp(-dot(iduv, iduv) * 5.0) * (1.0 - uMouseI) * 0.85;

  // two layers of domain-warped fbm — silk folds
  vec2 q = vec2(fbm(uv * 1.6 + t), fbm(uv * 1.6 - t * 0.7 + 3.1));
  q += normalize(duv + 0.0001) * inf * 0.55;
  q += normalize(iduv + 0.0001) * idle * 0.4;
  // the warp itself is pulled along by the gesture
  q += vec2(0.0, uVel * 0.30);
  // the whole weave also breathes, so the folds themselves keep shifting
  float breath = sin(uTime * 0.13) * 0.12;
  float f = fbm(uv * (1.8 + breath) + q * 1.4 + vec2(t * 0.6, -t * 0.4));

  vec3 deep = vec3(0.016, 0.016, 0.03);
  // two-blue palette only — no cyan/violet
  vec3 blue = vec3(0.16, 0.36, 0.9);
  vec3 blueDeep = vec3(0.13, 0.26, 0.68);

  vec3 col = deep;
  col += blue * smoothstep(0.35, 0.85, f) * 0.5;
  col += blueDeep * smoothstep(0.55, 1.0, fbm(uv * 2.4 - q)) * 0.45;
  // fine sheen lines along the folds — they flare while the page is moving
  col += vec3(0.5, 0.62, 1.0) * pow(abs(sin(f * 14.0 + t * 3.0)), 24.0)
       * (0.06 + abs(uVel) * 0.10);
  // cursor glow rides on top of the fabric; the idle pocket gets a dimmer
  // version of the same light so the page never sits completely dead
  col += vec3(0.24, 0.44, 0.95) * inf * 0.45;
  col += vec3(0.2, 0.38, 0.9) * idle * 0.22;

  // vignette, tightening slightly as the reader goes down the page
  col *= 1.0 - dot(screenUv, screenUv) * (0.7 + uScroll * 0.10);

  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

export function SilkV4({ opacity = 0.85 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Phones used to get nothing at all here. They now run the same silk at a
    // third of the resolution with three fbm octaves instead of five, which is
    // cheaper than the old desktop path and still answers the scroll. Anything
    // without WebGL keeps the painted background behind it.
    const phone = window.matchMedia("(max-width: 767px)").matches;
    const fragSrc = phone ? FRAG.replace("i < 5; i++", "i < 3; i++") : FRAG;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: phone ? "low-power" : "default",
    });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fragSrc));
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
    const uScroll = gl.getUniformLocation(prog, "uScroll");
    const uVel = gl.getUniformLocation(prog, "uVel");

    // render at reduced resolution — the silk is soft anyway
    const SCALE = phone ? 0.28 : 0.4;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(2, Math.floor(r.width * SCALE));
      canvas.height = Math.max(2, Math.floor(r.height * SCALE));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // pointer tracked in the shader's own uv space; intensity eases in
    // while the cursor is over the section and back out when it leaves
    let tx = 0;
    let ty = 0;
    let mx = 0;
    let my = 0;
    let tI = 0;
    let mI = 0;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const relX = (e.clientX - r.left) / Math.max(r.width, 1);
      const relY = (e.clientY - r.top) / Math.max(r.height, 1);
      const inside = relX >= -0.1 && relX <= 1.1 && relY >= -0.1 && relY <= 1.1;
      if (inside) {
        tx = (relX - 0.5) * (r.width / Math.max(r.height, 1));
        ty = 0.5 - relY;
      }
      tI = inside ? 1 : 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // Same two inputs the aurora uses: where the reader is, and how fast they
    // are moving. Position drifts the weave, velocity shears it.
    let tScroll = 0;
    let mScroll = 0;
    let tVel = 0;
    let mVel = 0;
    let lastY = window.scrollY;
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      tScroll = Math.min(1, Math.max(0, window.scrollY / max));
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      tVel = Math.max(-1, Math.min(1, dy / 90));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let visible = false;
    let raf = 0;
    const start = performance.now();
    const tick = () => {
      if (!visible) return;
      mx += (tx - mx) * 0.08;
      my += (ty - my) * 0.08;
      mI += (tI - mI) * 0.06;
      mScroll += (tScroll - mScroll) * 0.08;
      // attack fast, release slow — the shear arrives with the gesture
      mVel += (tVel - mVel) * (Math.abs(tVel) > Math.abs(mVel) ? 0.35 : 0.06);
      tVel *= 0.82;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, mx, my);
      gl.uniform1f(uMouseI, mI);
      gl.uniform1f(uScroll, mScroll);
      gl.uniform1f(uVel, mVel);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const on = entries.some((e) => e.isIntersecting);
        if (on && !visible) {
          visible = true;
          raf = requestAnimationFrame(tick);
        } else if (!on) {
          visible = false;
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: "80px" },
    );
    io.observe(canvas);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
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
        opacity,
        pointerEvents: "none",
      }}
    />
  );
}
