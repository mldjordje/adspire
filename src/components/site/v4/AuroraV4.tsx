"use client";

import { useEffect, useRef } from "react";
import { startBackground } from "./bgCore";

/**
 * Aurora shader background — raw WebGL, two-pass engine in bgCore.
 * Deliberately heavier than SilkV4: layered aurora curtains over a starfield,
 * a horizon bloom and a scanning band. Reserved for the pages where the
 * visitor decides to buy and the industry pages — everything else keeps silk.
 *
 * Scroll is a descent: the top of the page sits above the curtains, reading
 * down lowers the camera through them (the near sheet passes fastest) toward
 * a horizon that rises at the foot. Each new section makes the curtains flare
 * once, scrubbed by the scroll. When a form is on screen the light gathers in
 * an arch behind it and the rest of the sky quiets — the next step is where
 * the eye goes.
 *
 * Field pass: the curtain bodies and the haze (the fbm). Fine pass, native
 * resolution: filaments, stars as real points, light, grain.
 *
 * Palette is locked to the site tokens: ink-black void, trust-blue, white
 * highlights. No cyan, no violet.
 */

// Shared by both passes: the cheap coordinate warps (no fbm), so the fine
// pass can rebuild the exact curtain coordinates the field pass used.
const COORDS = `
vec2 skyUv(vec2 sc) {
  vec2 duv = sc - uMouse;
  float inf = exp(-dot(duv, duv) * (7.0 - 2.5 * uPhone)) * uMouseI;
  vec2 suv = sc + vec2(uProg * 0.25, 0.0);
  suv += duv * inf * 0.6;
  // a form on screen bows the curtains down around it
  float fx = sc.x - uFocus.x;
  suv.y += uFocus.z * 0.16 * exp(-fx * fx * 2.0);
  vec2 adv = uAttract.xy - sc;
  suv += adv * exp(-dot(adv, adv) * 3.0) * uAttract.z * 0.12;
  suv += normalize(sc - uRipple.xy + 0.0001) * rippleRing(sc) * 0.05;
  return suv;
}

// Descent: each sheet rises past the camera at its own rate.
vec2 sheet(vec2 suv, float rate) { return suv + vec2(0.0, 0.22 - uProg * rate); }

// A flick of the wheel or thumb leans the sheet, like a curtain lagging the air.
vec2 lean(vec2 uv) { uv.x += uVel * 0.5 * (0.35 + uv.y * 0.25); return uv; }

vec2 uv1(vec2 suv) { return lean(sheet(suv, 1.3)); }
vec2 uv2(vec2 suv) { return lean(sheet(suv, 0.8) * vec2(0.8, 1.25) + vec2(1.7, 0.10)); }
vec2 uv3(vec2 suv) { return lean(sheet(suv, 0.5) * vec2(1.35, 0.85) + vec2(-2.2, -0.16)); }
`;

const FIELD = `
float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.55;
  for (int i = 0; i < OCTAVES; i++) {
    v += amp * noise(p);
    p = rot(0.55) * p * 2.02;
    amp *= 0.5;
  }
  return v;
}
${COORDS}
float body(vec2 uv, float seed, float speed, float width) {
  float t = uTime * speed;
  float w = width * (1.0 + abs(uVel) * 0.55);
  // Phones see a narrow slice of the sky, so the sheets bend more across it.
  float wobble = fbm(vec2(uv.x * (1.3 + 1.4 * uPhone) + seed, t * 0.5 + seed)) - 0.5;
  // A real aurora has a hard lower edge and rays that fade upward; the old
  // symmetric falloff read as a blue fog on a narrow phone screen.
  float d = uv.y - wobble * 0.9;
  float wd = w * mix(0.35, 1.25, step(0.0, d));
  return exp(-d * d / (wd * wd));
}

void main() {
  vec2 suv = skyUv(screenUv());
  float c1 = body(uv1(suv), 0.0, 0.16, 0.19);
  float c2 = body(uv2(suv), 3.1, 0.11, 0.13);
  float c3 = body(uv3(suv), 7.4, 0.23, 0.27);
  vec2 q = vec2(fbm(suv * 1.5 + uTime * 0.04), fbm(suv * 1.5 - uTime * 0.031 + 4.2));
  float haze = fbm(suv * 1.9 + q * 1.5);
  gl_FragColor = vec4(c1, c2, c3, clamp(haze, 0.0, 1.0));
}
`;

const FINE = `
${COORDS}
// Vertical striations along a sheet. Two frequencies: the coarse one is the
// old filament look, the fine one only resolves at native resolution.
float fil(vec2 uv, float seed, float speed) {
  float t = uTime * speed;
  float a = noise(vec2(uv.x * 9.0 + seed * 4.0, t * 1.6));
  float b = noise(vec2(uv.x * 38.0 + seed * 11.0, t * 2.3));
  return 0.3 + 0.5 * a + 0.25 * b;
}

void main() {
  vec2 sc = screenUv();
  vec2 st = gl_FragCoord.xy / uRes;
  vec4 F = texture2D(uField, st);
  vec2 suv = skyUv(sc);
  float calm = 1.0 - uCalm * 0.3;

  // Chapter flare: the curtains brighten once as a new section comes in.
  float sw = smoothstep(0.0, 0.45, fract(uChapter));
  float flare = sin(sw * PI) * step(0.9, uChapter);

  float c1 = F.r * fil(uv1(suv), 0.0, 0.16) * (1.0 + flare * 0.6);
  float c2 = F.g * fil(uv2(suv), 3.1, 0.11);
  float c3 = F.b * fil(uv3(suv), 7.4, 0.23);
  float haze = F.a;

  vec3 blue = vec3(0.18, 0.42, 1.0);
  vec3 blueDeep = vec3(0.09, 0.19, 0.62);
  vec3 pale = vec3(0.62, 0.74, 1.0);

  vec3 col = vec3(0.008, 0.010, 0.024);

  // ── stars: three depths, real points a pixel or two wide ──
  for (int i = 0; i < 3; i++) {
    float layer = float(i);
    float scale = 16.0 + layer * 20.0;
    vec2 g = suv * scale + vec2(uTime * (0.01 + layer * 0.015), -uProg * (3.0 + layer * 7.0));
    vec2 id = floor(g);
    vec2 f = fract(g) - 0.5;
    float h = hash(id + layer * 17.0);
    if (h > 0.9) {
      vec2 d = f - (vec2(hash(id + 3.1), hash(id + 7.7)) - 0.5) * 0.7;
      // A fling pulls each star into a trail; the near layer smears more.
      float trail = 1.0 + abs(uVel) * (6.0 + layer * 8.0);
      d.y /= trail;
      float r = max((0.0010 + 0.0016 * fract(h * 13.0)) * scale, 0.7 * scale / uRes.y);
      float tw = 0.65 + 0.35 * sin(uTime * (1.2 + h * 3.0) + h * 30.0);
      col += vec3(0.72, 0.80, 1.0) * exp(-dot(d, d) / (r * r)) * tw / sqrt(trail) * (0.8 - layer * 0.22);
    }
  }

  // ── curtains ──
  col += (blue * c1 * 0.46 + pale * pow(c1, 2.2) * 0.34) * calm;
  col += blueDeep * c2 * 0.40 * calm;
  col += blue * c3 * 0.12 * calm;

  // ── haze behind the curtains, with a fine sheen along its folds ──
  col += blueDeep * smoothstep(0.42, 0.95, haze) * 0.26;
  col += vec3(0.55, 0.66, 1.0) * pow(abs(sin(haze * 13.0 + uTime * 0.9)), 26.0) * 0.05;

  // ── horizon: rises into view as the reader reaches the foot of the page ──
  float hc = -0.95 + uProg * 0.5;
  float horizon = exp(-pow((sc.y - hc) * 3.2, 2.0));
  col += blue * horizon * (0.30 + abs(uVel) * 0.35);
  col += pale * pow(horizon, 3.0) * 0.14;

  // ── scanning band, slow, gives the frame a heartbeat ──
  float scan = exp(-pow((sc.y - sin(uTime * 0.21) * 0.75) * 5.0, 2.0));
  col += vec3(0.30, 0.48, 1.0) * scan * 0.05;

  // ── form focus: an arch of light behind the form, the rest quiets ──
  vec2 fp = sc - uFocus.xy;
  // Sized to the screen width: on a phone the whole view is ±0.23 wide.
  float R = min(0.42, 0.5 * uRes.x / uRes.y * 0.85);
  float rr = length(fp * vec2(0.75, 1.25));
  float arch = exp(-pow((rr - R) * 2.94 / R, 2.0)) * smoothstep(-0.15, 0.25, fp.y);
  col *= 1.0 - uFocus.z * 0.28 * smoothstep(0.2, 0.9, length(fp));
  col += (blue * 0.30 + pale * 0.12 * arch) * arch * uFocus.z;

  // ── pointer / finger light, CTA pull, click ring ──
  vec2 duv = sc - uMouse;
  float inf = exp(-dot(duv, duv) * (7.0 - 2.5 * uPhone)) * uMouseI;
  col += vec3(0.26, 0.48, 1.0) * inf * 0.55;
  col += pale * pow(inf, 2.2) * 0.20;
  vec2 iuv = vec2(cos(uTime * 0.09) * 0.7, sin(uTime * 0.067) * 0.3);
  col += vec3(0.20, 0.38, 0.92) * exp(-dot(sc - iuv, sc - iuv) * 4.5) * (1.0 - uMouseI) * 0.8 * 0.24;
  vec2 adv = sc - uAttract.xy;
  col += vec3(0.26, 0.48, 1.0) * exp(-dot(adv, adv) * 6.0) * uAttract.z * 0.22;
  col += blue * rippleRing(sc) * 0.2;

  // A trace of chromatic shear while the page moves. Blue channel only: the
  // palette has no red to spend.
  float shear = clamp(abs(uVel) * 2.2, 0.0, 1.0);
  col.b += shear * smoothstep(0.35, 0.95, haze) * 0.06;
  col.rg *= 1.0 - shear * 0.03;

  col *= 1.0 - dot(sc, sc) * 0.72;
  col *= 1.0 - uProg * 0.18;

  // grain at the real pixel; also dithers the dark gradients
  float g = hash(gl_FragCoord.xy + fract(uTime * 7.31) * 413.0) - 0.5;
  col += g * (0.014 + 0.03 * dot(col, vec3(0.333)));

  gl_FragColor = vec4(max(col, 0.0), 1.0);
}
`;

export function AuroraV4() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const stop = startBackground(canvas, { field: FIELD, fine: FINE, octaves: [6, 4] });
    return () => stop?.();
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        height: "100%",
        // Painted gradient stands in wherever WebGL is unavailable, so the
        // page is never a flat black field.
        background:
          "radial-gradient(120% 80% at 18% 8%, rgba(28,44,120,0.55), transparent 62%)," +
          "radial-gradient(90% 60% at 82% 22%, rgba(18,30,88,0.5), transparent 60%)," +
          "linear-gradient(180deg, #05070f 0%, #04050c 55%, #020308 100%)",
      }}
    >
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}
