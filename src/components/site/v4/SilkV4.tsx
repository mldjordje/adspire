"use client";

import { useEffect, useRef } from "react";

/**
 * Silky flowing-noise shader background — raw WebGL fullscreen quad, no
 * three.js overhead. Renders at device resolution and only while its section
 * is in the viewport. Drop inside a position:relative section.
 *
 * This is a base layer, not a blended overlay: it paints its own near-black
 * ground and is meant to sit at opacity 1 under the content. Fading it and
 * masking it is what made the earlier version invisible.
 *
 * Interactive: the cursor warps the silk folds and lights them up where it
 * passes, and the page scroll drags the whole weave across the frame.
 */

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseI;
uniform float uScroll;
uniform float uProg;
uniform float uVel;

const float PI = 3.14159265;

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

  // Dramaturgy: dark at the top of the page, brightest and busiest through the
  // middle, dark again at the foot. Gives a long guide a shape instead of one
  // flat texture from first screen to last.
  float arc = sin(clamp(uProg, 0.0, 1.0) * PI);

  // uScroll is measured in SCREENS scrolled, not in page progress. Progress
  // normalises the drift away on a long page — a whole guide would move the
  // weave by a couple of percent of the frame, which reads as a still image.
  // Per-screen drift moves it the same visible amount however long the page is.
  uv += vec2(uScroll * 0.12, -uScroll * 0.38);
  // Rotation stays on progress so the frame never spins on a very long page.
  uv = rot(uProg * 0.55 + uVel * 0.22) * uv;
  // Velocity stretches the weave along the scroll axis — the fabric lags the
  // movement, then catches up, which is the whole effect.
  uv.y *= 1.0 + abs(uVel) * 0.60;

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
  q += vec2(0.0, uVel * 0.75);
  // the whole weave also breathes, so the folds themselves keep shifting
  float breath = sin(uTime * 0.13) * 0.12;
  // mid-page runs finer, so the texture densifies as the reader goes in
  float detail = 1.8 + breath + arc * 0.85;
  float f = fbm(uv * detail + q * 1.4 + vec2(t * 0.6, -t * 0.4));

  // ground darkens at the ends of the page and lifts slightly in the middle
  vec3 deep = mix(vec3(0.010, 0.012, 0.026), vec3(0.020, 0.030, 0.070), arc);
  // two-blue palette only — no cyan/violet
  vec3 blue = mix(vec3(0.14, 0.32, 0.86), vec3(0.26, 0.50, 1.0), arc);
  vec3 blueDeep = vec3(0.13, 0.26, 0.68);

  vec3 col = deep;
  col += blue * smoothstep(0.35, 0.85, f) * (0.42 + arc * 0.30);
  col += blueDeep * smoothstep(0.55, 1.0, fbm(uv * 2.4 - q)) * 0.45;
  // fine sheen lines along the folds — they flare while the page is moving
  col += vec3(0.5, 0.62, 1.0) * pow(abs(sin(f * 14.0 + t * 3.0)), 24.0)
       * (0.05 + abs(uVel) * 0.38) * (0.5 + arc * 0.6);
  // cursor glow rides on top of the fabric; the idle pocket gets a dimmer
  // version of the same light so the page never sits completely dead
  col += vec3(0.24, 0.44, 0.95) * inf * 0.45;
  col += vec3(0.2, 0.38, 0.9) * idle * 0.22;

  // vignette, tightening slightly as the reader goes down the page. Lighter
  // than before: this layer is no longer masked by a gradient above it, so the
  // falloff has to leave the corners alive rather than crushing them to flat.
  col *= 1.0 - dot(screenUv, screenUv) * (0.52 + uProg * 0.10);

  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

export function SilkV4({ opacity = 1 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Phones run the same silk with three fbm octaves instead of five, which is
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
    const uProg = gl.getUniformLocation(prog, "uProg");
    const uVel = gl.getUniformLocation(prog, "uVel");

    // Render at device resolution instead of the old flat 0.4. That scale is
    // what made the fabric look soft and cheap. No adaptive downscaling here on
    // purpose: an earlier version watched the rAF interval and walked the
    // resolution down, but rAF measures the whole page's frame time — GSAP,
    // ScrollTrigger and Lenis included — so it pinned the shader to its floor
    // even on an RTX 3060. A fixed dpr cap is what the fluid background on the
    // sister project uses, and that runs a far heavier sim.
    const dprCap = phone ? 1.5 : 2;
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    const scale = phone ? dpr * 0.6 : dpr * 0.75;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(2, Math.floor(r.width * scale));
      canvas.height = Math.max(2, Math.floor(r.height * scale));
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

    // Three scroll inputs. Screens-scrolled drives the drift so the movement
    // per screen is the same on a short contact page and a long guide; page
    // progress drives rotation and the palette arc, which do need to be bounded;
    // velocity shears the weave.
    let tScreens = 0;
    let mScreens = 0;
    let tProg = 0;
    let mProg = 0;
    let tVel = 0;
    let mVel = 0;
    let lastY = window.scrollY;
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      tScreens = window.scrollY / Math.max(1, window.innerHeight);
      tProg = Math.min(1, Math.max(0, window.scrollY / max));
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      // /45 rather than /90: a normal wheel notch now reaches most of the range
      // instead of a fifth of it.
      tVel = Math.max(-1, Math.min(1, dy / 45));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let visible = false;
    let raf = 0;
    const start = performance.now();
    const tick = () => {
      if (!visible) return;
      const now = performance.now();

      mx += (tx - mx) * 0.08;
      my += (ty - my) * 0.08;
      mI += (tI - mI) * 0.06;
      // drift follows quickly — this is the part the reader is meant to notice
      mScreens += (tScreens - mScreens) * 0.14;
      mProg += (tProg - mProg) * 0.08;
      // attack fast, release slow — the shear arrives with the gesture
      mVel += (tVel - mVel) * (Math.abs(tVel) > Math.abs(mVel) ? 0.35 : 0.05);
      tVel *= 0.88;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mx, my);
      gl.uniform1f(uMouseI, mI);
      gl.uniform1f(uScroll, mScreens);
      gl.uniform1f(uProg, mProg);
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
