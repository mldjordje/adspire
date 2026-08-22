"use client";

import { useEffect, useRef } from "react";

/**
 * Aurora shader for the booking landing page — raw WebGL fullscreen quad, no
 * three.js. Deliberately heavier than SilkV4: layered aurora curtains over a
 * drifting starfield, a horizon bloom and a scanning light band, so the page
 * that ads point at does not look like every other inner page.
 *
 * Reacts to two inputs the visitor actually produces: the pointer (a warm
 * pocket that bends the curtains) and scroll progress (the horizon sinks and
 * the palette cools as you read down).
 *
 * Palette is locked to the site tokens: ink-black void, trust-blue, white
 * highlights. No cyan, no violet.
 */

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseI;
uniform float uScroll;

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
  for (int i = 0; i < 6; i++) {
    v += amp * noise(p);
    p = rot(0.55) * p * 2.02;
    amp *= 0.5;
  }
  return v;
}

/* One aurora curtain: a vertical sheet whose base line wobbles with fbm and
   whose brightness falls off away from that line. Stacking three of these
   with different speeds is what reads as depth. */
float curtain(vec2 uv, float seed, float speed, float width) {
  float t = uTime * speed;
  float wobble = fbm(vec2(uv.x * 1.3 + seed, t * 0.5 + seed)) - 0.5;
  float base = wobble * 0.9;
  float d = abs(uv.y - base);
  float body = exp(-d * d / (width * width));
  // vertical striations along the sheet — the filament look
  float fil = 0.55 + 0.45 * noise(vec2(uv.x * 9.0 + seed * 4.0, t * 1.6));
  return body * fil;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;

  // pointer pocket, eased in the JS side
  vec2 duv = uv - uMouse;
  float inf = exp(-dot(duv, duv) * 7.0) * uMouseI;

  // idle pocket so a reader who never moves the mouse still sees life
  vec2 iuv = vec2(cos(uTime * 0.09) * 0.7, sin(uTime * 0.067) * 0.3);
  float idle = exp(-dot(uv - iuv, uv - iuv) * 4.5) * (1.0 - uMouseI) * 0.8;

  // scroll sinks the horizon and slides the whole field sideways
  float sink = uScroll * 0.45;
  vec2 suv = uv + vec2(uScroll * 0.25, sink * 0.6);
  suv += normalize(duv + 0.0001) * inf * 0.16;

  vec3 col = vec3(0.008, 0.010, 0.024);

  // ── starfield: two parallax layers, the far one barely moving ──
  for (int i = 0; i < 2; i++) {
    float layer = float(i);
    vec2 g = suv * (26.0 + layer * 34.0) + vec2(uTime * (0.012 + layer * 0.02), -sink * (0.4 + layer));
    vec2 id = floor(g);
    vec2 f = fract(g) - 0.5;
    float h = hash(id + layer * 17.0);
    if (h > 0.955) {
      float tw = 0.65 + 0.35 * sin(uTime * (1.2 + h * 3.0) + h * 30.0);
      float s = exp(-dot(f, f) * (120.0 - layer * 45.0)) * tw;
      col += vec3(0.72, 0.80, 1.0) * s * (0.55 - layer * 0.22);
    }
  }

  // ── aurora curtains ──
  vec2 auv = suv;
  auv.y += 0.22;
  float c1 = curtain(auv, 0.0, 0.16, 0.30);
  float c2 = curtain(auv * vec2(0.8, 1.25) + vec2(1.7, 0.10), 3.1, 0.11, 0.20);
  float c3 = curtain(auv * vec2(1.35, 0.85) + vec2(-2.2, -0.16), 7.4, 0.23, 0.42);

  vec3 blue = vec3(0.18, 0.42, 1.0);
  vec3 blueDeep = vec3(0.09, 0.19, 0.62);
  vec3 pale = vec3(0.62, 0.74, 1.0);

  col += blue * c1 * 0.50;
  col += pale * pow(c1, 2.6) * 0.28;
  col += blueDeep * c2 * 0.46;
  col += blue * c3 * 0.22;

  // ── volumetric haze behind the curtains, warped by the same fbm ──
  vec2 q = vec2(fbm(suv * 1.5 + uTime * 0.04), fbm(suv * 1.5 - uTime * 0.031 + 4.2));
  float haze = fbm(suv * 1.9 + q * 1.5);
  col += blueDeep * smoothstep(0.42, 0.95, haze) * 0.38;
  // fine sheen along the haze folds, the same trick the silk uses
  col += vec3(0.55, 0.66, 1.0) * pow(abs(sin(haze * 13.0 + uTime * 0.9)), 26.0) * 0.05;

  // ── horizon bloom: the light source the curtains hang above ──
  float horizon = exp(-pow((uv.y + 0.62 + sink) * 3.2, 2.0));
  col += blue * horizon * 0.30;
  col += pale * pow(horizon, 3.0) * 0.14;

  // ── scanning band, slow, gives the frame a heartbeat ──
  float scan = exp(-pow((uv.y - sin(uTime * 0.21) * 0.75) * 5.0, 2.0));
  col += vec3(0.30, 0.48, 1.0) * scan * 0.05;

  // ── pointer light on top of everything ──
  col += vec3(0.26, 0.48, 1.0) * inf * 0.55;
  col += pale * pow(inf, 2.2) * 0.20;
  col += vec3(0.20, 0.38, 0.92) * idle * 0.24;

  // vignette + slight cooling as the page scrolls
  col *= 1.0 - dot(uv, uv) * 0.72;
  col *= 1.0 - uScroll * 0.22;

  // dithering — kills the banding that flat gradients show on wide gamuts
  col += (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.012;

  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

type Props = {
  /** Render scale. Below 1 the shader is cheap and still soft enough. */
  scale?: number;
};

export function BookingAuroraV4({ scale = 0.45 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Phones get the CSS gradient underneath instead — a six-octave fbm per
    // pixel is not worth the battery on a page people open from an ad.
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
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
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

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(2, Math.floor(r.width * scale));
      canvas.height = Math.max(2, Math.floor(r.height * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

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
      const inside = relX >= 0 && relX <= 1 && relY >= 0 && relY <= 1;
      if (inside) {
        tx = (relX - 0.5) * (r.width / Math.max(r.height, 1));
        ty = 0.5 - relY;
      }
      tI = inside ? 1 : 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // Scroll progress of the document, eased in the loop so a fling does not
    // snap the horizon.
    let tScroll = 0;
    let mScroll = 0;
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      tScroll = Math.min(1, Math.max(0, window.scrollY / max));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let visible = false;
    let raf = 0;
    const start = performance.now();
    const tick = () => {
      if (!visible) return;
      mx += (tx - mx) * 0.07;
      my += (ty - my) * 0.07;
      mI += (tI - mI) * 0.05;
      mScroll += (tScroll - mScroll) * 0.08;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, mx, my);
      gl.uniform1f(uMouseI, mI);
      gl.uniform1f(uScroll, mScroll);
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
      { rootMargin: "120px" },
    );
    io.observe(canvas);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, [scale]);

  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        height: "100%",
        // Painted gradient stands in for the shader wherever WebGL is skipped
        // (phones) or unavailable, so the page is never a flat black field.
        background:
          "radial-gradient(120% 80% at 18% 8%, rgba(28,44,120,0.55), transparent 62%)," +
          "radial-gradient(90% 60% at 82% 22%, rgba(18,30,88,0.5), transparent 60%)," +
          "linear-gradient(180deg, #05070f 0%, #04050c 55%, #020308 100%)",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}
