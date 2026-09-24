"use client";

import { useEffect, useRef, useState } from "react";
import { startBackground } from "./bgCore";
import { BgLiteV4 } from "./BgLiteV4";

/**
 * Aurora shader background — raw WebGL, two-pass engine in bgCore.
 * Deliberately heavier than SilkV4: aurora curtains over a starfield, a
 * horizon bloom and a scanning band. Reserved for the pages where the visitor
 * decides to buy and the industry pages — everything else keeps silk.
 *
 * Scroll is a vertical flight through a sky that never runs out: curtains
 * repeat in three depth layers, each scrolled at its own fraction of the page
 * speed (near 0.85, mid 0.55, far 0.3) and each sheet seeded differently, so
 * a long page keeps passing new ones to the last screen. The old version tied
 * them to page progress; on a long page every curtain had left the frame by
 * the middle and the sky went still.
 *  - each section start is a seam: curtains flare along it as it passes
 *  - the horizon rises only in the last screen
 *  - a form on screen gets an arch of light behind it, the rest quiets
 *
 * Field pass: the curtain bodies and the haze (the fbm). Fine pass, native
 * resolution: filaments, stars as real points, light, grain.
 *
 * Palette is locked to the site tokens: ink-black void, trust-blue, white
 * highlights. No cyan, no violet.
 */

// Shared by both passes: the cheap coordinate work (no fbm), so the fine pass
// can rebuild the exact curtain coordinates the field pass used.
const COORDS = `
vec2 skyUv(vec2 sc) {
  vec2 duv = sc - uMouse;
  float inf = exp(-dot(duv, duv) * (7.0 - 2.5 * uPhone)) * uMouseI;
  vec2 suv = sc;
  // the spring velocity stretches the sky about the screen centre
  suv.y /= 1.0 + abs(uVel) * (0.35 + 0.3 * uPhone);
  suv += duv * inf * 0.6;
  // a form on screen bows the curtains down around it
  float fx = sc.x - uFocus.x;
  suv.y += uFocus.z * 0.16 * exp(-fx * fx * 2.0);
  vec2 adv = uAttract.xy - sc;
  suv += adv * exp(-dot(adv, adv) * 3.0) * uAttract.z * 0.12;
  suv += normalize(sc - uRipple.xy + 0.0001) * rippleRing(sc) * 0.05;
  return suv;
}

// One depth layer of repeating sheets. Returns the sheet-local uv (x, y from
// the base line) and a per-sheet seed. Sheets sit a period apart, so only the
// nearest can light a pixel; halfway between two both are dark, which hides
// the switch.
vec3 sheet(vec2 suv, float rate, float period, float seed, float phase) {
  float w = suv.y - uScroll * rate + phase;
  float k = floor(w / period + 0.5);
  return vec3(suv.x, w - k * period, seed + k * 7.31);
}

// A flick of the wheel or thumb leans the sheet, like a curtain lagging the air.
vec2 lean(vec2 uv) { uv.x += uVel * 0.5 * (0.35 + uv.y * 0.25); return uv; }

vec3 sh1(vec2 suv) { vec3 s = sheet(suv, 0.85, 1.0, 0.0, 0.0); s.xy = lean(s.xy); return s; }
vec3 sh2(vec2 suv) { vec3 s = sheet(suv, 0.55, 1.2, 3.1, 0.55); s.xy = lean(s.xy * vec2(0.8, 1.25) + vec2(1.7, 0.0)); return s; }
vec3 sh3(vec2 suv) { vec3 s = sheet(suv, 0.30, 1.4, 7.4, 0.3); s.xy = lean(s.xy * vec2(1.35, 0.85) + vec2(-2.2, 0.0)); return s; }
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
float body(vec3 s, float speed, float width) {
  float t = uTime * speed;
  float w = width * (1.0 + abs(uVel) * 0.55);
  // Phones see a narrow slice of the sky, so the sheets bend more across it.
  float wobble = fbm(vec2(s.x * (1.3 + 1.4 * uPhone) + s.z, t * 0.5 + s.z)) - 0.5;
  // A real aurora has a hard lower edge and rays that fade upward.
  float d = s.y - wobble * 0.5;
  float wd = w * mix(0.35, 1.25, step(0.0, d));
  return exp(-d * d / (wd * wd));
}

void main() {
  vec2 suv = skyUv(screenUv());
  float c1 = body(sh1(suv), 0.16, 0.19);
  float c2 = body(sh2(suv), 0.11, 0.13);
  float c3 = body(sh3(suv), 0.23, 0.27);
  // haze is the farthest thing in the sky: it barely moves
  vec2 hz = vec2(suv.x, suv.y - uScroll * 0.12);
  vec2 q = vec2(fbm(hz * 1.5 + uTime * 0.04), fbm(hz * 1.5 - uTime * 0.031 + 4.2));
  float haze = fbm(hz * 1.9 + q * 1.5);
  gl_FragColor = vec4(c1, c2, c3, clamp(haze, 0.0, 1.0));
}
`;

const FINE = `
${COORDS}
// Vertical striations along a sheet. Two frequencies: the coarse one is the
// filament look, the fine one only resolves at native resolution.
float fil(vec3 s, float speed) {
  float t = uTime * speed;
  float a = noise(vec2(s.x * 9.0 + s.z * 4.0, t * 1.6));
  float b = noise(vec2(s.x * 38.0 + s.z * 11.0, t * 2.3));
  return 0.18 + 0.6 * a + 0.32 * b;
}

void main() {
  vec2 sc = screenUv();
  vec2 st = gl_FragCoord.xy / uRes;
  vec4 F = fieldSample(st);
  vec2 suv = skyUv(sc);
  float calm = 1.0 - uCalm * 0.3;

  // Seam flare: curtains brighten along a section start as it passes.
  float flare = exp(-pow((sc.y - uSeam.x) * 3.5, 2.0)) * uSeam.y;

  float c1 = F.r * fil(sh1(suv), 0.16) * (1.0 + flare * 0.9);
  float c2 = F.g * fil(sh2(suv), 0.11) * (1.0 + flare * 0.5);
  float c3 = F.b * fil(sh3(suv), 0.23);
  float haze = F.a;

  vec3 blue = vec3(0.18, 0.42, 1.0);
  vec3 blueDeep = vec3(0.09, 0.19, 0.62);
  vec3 pale = vec3(0.62, 0.74, 1.0);

  vec3 col = vec3(0.008, 0.010, 0.024);

  // ── stars: three depths in vertical parallax, points a pixel or two wide ──
  for (int i = 0; i < 3; i++) {
    float layer = float(i);
    float scale = 16.0 + layer * 20.0;
    vec2 g = vec2(suv.x, suv.y - uScroll * (0.06 + layer * 0.12)) * scale
           + vec2(uTime * (0.01 + layer * 0.015), 0.0);
    vec2 id = floor(g);
    vec2 f = fract(g) - 0.5;
    float h = hash(id + layer * 17.0);
    // sparse on purpose: fewer, finer stars read as depth, not as noise
    if (h > 0.93) {
      vec2 d = f - (vec2(hash(id + 3.1), hash(id + 7.7)) - 0.5) * 0.7;
      // A fling pulls each star into a vertical trail; the near layer smears more.
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
  col += vec3(0.55, 0.66, 1.0) * pow(abs(sin(haze * 13.0 + uTime * 0.9)), 26.0) * 0.022;

  // ── horizon: rises into view only in the last screen of the page ──
  float hc = -0.55 - uRemain * 1.1;
  float horizon = exp(-pow((sc.y - hc) * 3.2, 2.0));
  col += blue * horizon * (0.30 + abs(uVel) * 0.35);
  col += pale * pow(horizon, 3.0) * 0.14;

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
  vec2 adv = sc - uAttract.xy;
  col += vec3(0.26, 0.48, 1.0) * exp(-dot(adv, adv) * 6.0) * uAttract.z * 0.22;
  col += blue * rippleRing(sc) * 0.2;

  // A trace of chromatic shear while the page moves. Blue channel only: the
  // palette has no red to spend.
  float shear = clamp(abs(uVel) * 2.2, 0.0, 1.0);
  col.b += shear * smoothstep(0.35, 0.95, haze) * 0.06;
  col.rg *= 1.0 - shear * 0.03;

  col = finish(col * vignette(sc));

  // grain at the real pixel; also dithers the dark gradients
  float g = hash(gl_FragCoord.xy + fract(uTime * 7.31) * 413.0) - 0.5;
  col += g * (0.014 + 0.03 * dot(col, vec3(0.333)));

  gl_FragColor = vec4(max(col, 0.0), 1.0);
}
`;

export function AuroraV4() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || lite) return;
    const goLite = () => setLite(true);
    const stop = startBackground(canvas, { field: FIELD, fine: FINE, octaves: [6, 4] }, goLite);
    if (!stop) goLite();
    return () => stop?.();
  }, [lite]);

  if (lite) return <BgLiteV4 variant="aurora" />;

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
