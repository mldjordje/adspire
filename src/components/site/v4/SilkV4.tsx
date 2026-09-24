"use client";

import { useEffect, useRef } from "react";
import { startBackground } from "./bgCore";

/**
 * Silk shader background — default layer behind every inner page. Raw WebGL,
 * no three.js; the two-pass engine lives in bgCore.
 *
 * This is a base layer, not a blended overlay: it paints its own near-black
 * ground and is meant to sit at opacity 1 under the content. Fading it and
 * masking it is what made an earlier version invisible.
 *
 * The page drives it as a sequence of scenes rather than one texture:
 *  - top of the page: the silk hangs as vertical pleats; the first scroll
 *    parts them to the sides with light through the gap, then lets them relax
 *  - every section / heading is a chapter: the weave turns and changes density,
 *    and a band of light runs across the folds, scrubbed by the scroll
 *  - a fling stretches the weave on a spring that overshoots and settles
 *  - finger or cursor push the folds and light them; a CTA under the cursor
 *    draws the folds toward itself; a click sends a ring through the fabric
 *  - a reader who stops scrolling gets a quieter, slower background
 */

const FIELD = `
float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.55;
  for (int i = 0; i < OCTAVES; i++) {
    v += amp * noise(p);
    p = rot(0.6) * p * 2.05;
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 sc = screenUv();
  vec2 s = sc;
  float t = uTime * 0.075;
  float arc = sin(clamp(uProg, 0.0, 1.0) * PI);

  // Opening curtain. Closed, the domain is squashed vertically so the folds
  // hang as long pleats; while it opens the folds are pushed to the sides.
  // sin() envelope: fully open is exactly the normal silk, no leftover seam.
  float closed = 1.0 - uOpen;
  float part = sin(uOpen * PI);
  s.x -= sign(s.x) * part * (0.10 - 0.04 * uPhone) * smoothstep(0.0, 0.25, abs(s.x));
  s.y *= 1.0 - closed * (0.55 + 0.20 * uPhone);

  // Chapter turn happens in the first third of each chapter, scrubbed by the
  // scroll. Rotated about the screen centre, before the drift, so it reads as
  // the fabric turning rather than the texture whipping past.
  float turn = floor(uChapter) + smoothstep(0.0, 0.35, fract(uChapter));
  vec2 uv = rot(turn * (0.22 + 0.16 * uPhone)) * s;

  // Drift per screen scrolled, so a short page and a long guide move alike.
  uv += vec2(uScroll * 0.12, -uScroll * 0.38);
  uv = rot(uProg * 0.55 + uVel * 0.22) * uv;
  // The spring-driven velocity stretches the weave along the scroll axis.
  uv.y *= 1.0 + abs(uVel) * (0.60 + 0.45 * uPhone);

  // Pointer / finger pocket, in screen space so it stays under the cursor
  // however far the weave has drifted.
  vec2 duv = sc - uMouse;
  float inf = exp(-dot(duv, duv) * (9.0 - 3.5 * uPhone)) * uMouseI;
  vec2 iuv = vec2(cos(uTime * 0.11) * 0.62, sin(uTime * 0.083) * 0.42);
  vec2 iduv = sc - iuv;
  float idle = exp(-dot(iduv, iduv) * 5.0) * (1.0 - uMouseI) * 0.85;

  vec2 q = vec2(fbm(uv * 1.6 + t), fbm(uv * 1.6 - t * 0.7 + 3.1));
  q += duv * inf * 2.2;
  q += iduv * idle * 1.4;
  q += vec2(0.0, uVel * 0.75);

  vec2 adv = uAttract.xy - sc;
  q += adv * exp(-dot(adv, adv) * 3.0) * uAttract.z * 0.9;
  q += normalize(sc - uRipple.xy + 0.0001) * rippleRing(sc) * 0.35;

  float breath = sin(uTime * 0.13) * 0.12;
  float detail = 1.8 + breath + arc * 0.85 + 0.25 * sin(turn * 2.1);
  float f = fbm(uv * detail + q * 1.4 + vec2(t * 0.6, -t * 0.4));
  float f2 = fbm(uv * 2.4 - q);

  // Closed, the fabric is a drape: regular vertical pleats, wavering with the
  // fbm so they do not read as stripes. The satin shading in the fine pass is
  // what turns this slope into folds with light and shadow.
  float px = s.x * (7.0 + 3.0 * uPhone) + (q.x - 0.5) * 1.6 + sin(s.y * 2.2 + uTime * 0.3) * 0.25;
  float pleat = 0.5 + 0.32 * sin(px * PI) + 0.08 * sin(px * PI * 2.0 + 1.3);
  f = mix(f, pleat * 0.75 + f * 0.25, closed * 0.85);
  gl_FragColor = vec4(clamp(f, 0.0, 1.0), clamp(f2, 0.0, 1.0), 0.0, 1.0);
}
`;

const FINE = `
void main() {
  vec2 sc = screenUv();
  vec2 st = gl_FragCoord.xy / uRes;
  vec4 F = texture2D(uField, st);
  float f = F.r;
  float f2 = F.g;
  float t = uTime * 0.075;
  float arc = sin(clamp(uProg, 0.0, 1.0) * PI);
  float calm = 1.0 - uCalm * 0.35;

  // Satin: a normal from the field's slope (per uv unit, so it does not change
  // with resolution) and one light from the upper left.
  vec2 px = 1.0 / uFieldRes;
  float sx = (texture2D(uField, st + vec2(px.x, 0.0)).r - texture2D(uField, st - vec2(px.x, 0.0)).r) * uFieldRes.y * 0.5;
  float sy = (texture2D(uField, st + vec2(0.0, px.y)).r - texture2D(uField, st - vec2(0.0, px.y)).r) * uFieldRes.y * 0.5;
  vec3 n = normalize(vec3(-sx * 0.22, -sy * 0.22, 1.0));
  vec3 L = normalize(vec3(-0.55, 0.65, 0.55));
  float diff = clamp(dot(n, L), 0.0, 1.0);
  float spec = pow(clamp(dot(n, normalize(L + vec3(0.0, 0.0, 1.0))), 0.0, 1.0), 48.0);

  // two-blue palette only — no cyan/violet
  vec3 deep = mix(vec3(0.010, 0.012, 0.026), vec3(0.020, 0.030, 0.070), arc);
  vec3 blue = mix(vec3(0.14, 0.32, 0.86), vec3(0.20, 0.42, 0.98), arc);
  vec3 blueDeep = vec3(0.13, 0.26, 0.68);
  vec3 pale = vec3(0.62, 0.74, 1.0);

  float body = smoothstep(0.35, 0.85, f);
  vec3 col = deep;
  col += blue * body * (0.40 + arc * 0.14) * calm;
  col += blueDeep * smoothstep(0.55, 1.0, f2) * 0.45 * calm;
  col *= 0.50 + 0.72 * diff;
  col += pale * spec * (0.25 + body) * 0.45 * calm;

  // Sheen lines along the folds, at native resolution — the sharp detail the
  // low-res field cannot carry. They flare while the page moves.
  col += vec3(0.5, 0.62, 1.0) * pow(abs(sin(f * 14.0 + t * 3.0)), 24.0)
       * (0.09 + abs(uVel) * 0.38) * (0.5 + arc * 0.6);

  // pointer / finger light, and the dimmer idle pocket
  vec2 duv = sc - uMouse;
  float inf = exp(-dot(duv, duv) * (9.0 - 3.5 * uPhone)) * uMouseI;
  col += vec3(0.24, 0.44, 0.95) * inf * 0.45;
  vec2 iduv = sc - vec2(cos(uTime * 0.11) * 0.62, sin(uTime * 0.083) * 0.42);
  col += vec3(0.2, 0.38, 0.9) * exp(-dot(iduv, iduv) * 5.0) * (1.0 - uMouseI) * 0.85 * 0.22;

  // Opening curtain: light through the parting, and a slightly darker drape
  // while closed so the hero title sits on calm ground.
  float part = sin(uOpen * PI);
  float gw = 0.012 + part * (0.09 - 0.04 * uPhone);
  float gap = exp(-sc.x * sc.x / (gw * gw)) * part;
  col += blue * gap * 0.26 + pale * pow(gap, 3.0) * 0.16;
  col *= 1.0 - (1.0 - uOpen) * 0.18;

  // Chapter sweep: a band of light crosses the folds as a new section comes
  // in. Scrubbed — scrolling back runs it backwards. Not on the hero.
  float sw = smoothstep(0.0, 0.45, fract(uChapter));
  float swOn = sin(sw * PI) * step(0.9, uChapter);
  float d = dot(sc, normalize(vec2(0.35, 1.0)));
  float band = exp(-pow((d - mix(0.95, -0.95, sw)) * 5.0, 2.0)) * swOn;
  col += pale * band * smoothstep(0.3, 0.9, f) * 0.24 + blue * band * 0.05;

  // CTA under the cursor gathers light; click ring lights the fabric it moves.
  vec2 adv = sc - uAttract.xy;
  col += vec3(0.26, 0.48, 1.0) * exp(-dot(adv, adv) * 6.0) * uAttract.z * 0.22;
  col += blue * rippleRing(sc) * 0.18;

  // End of the page: a calm pool of light where the last CTA sits.
  vec2 e = sc - vec2(0.0, -0.15);
  col += blue * exp(-dot(e, e) * 2.5) * smoothstep(0.86, 1.0, uProg) * 0.16;

  // Vignette stays in screen space: it belongs to the screen, not the fabric.
  col *= 1.0 - dot(sc, sc) * (0.52 + uProg * 0.10);

  // Film grain at the real pixel. Also dithers the dark gradients, which
  // banded visibly before.
  float g = hash(gl_FragCoord.xy + fract(uTime * 7.31) * 413.0) - 0.5;
  col += g * (0.016 + 0.03 * dot(col, vec3(0.333)));

  gl_FragColor = vec4(max(col, 0.0), 1.0);
}
`;

export function SilkV4({ opacity = 1 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Phones keep three octaves in the field; the fine pass is what makes the
    // difference there, and it is cheap.
    const stop = startBackground(canvas, { field: FIELD, fine: FINE, octaves: [5, 3] });
    return () => stop?.();
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
