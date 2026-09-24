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
 * Scroll is vertical, bound to the page and never runs out:
 *  - the fabric is a tall world scrolled in parallax — the back layer at half
 *    the page speed, the front one at 0.85 — so a long guide keeps moving to
 *    its last screen instead of saturating halfway (the old version rotated
 *    and darkened on page progress, which read as sideways drift, then stillness)
 *  - top of the page: a pleated theatre drape; its scalloped hem rises faster
 *    than the content, so the first scroll lifts the curtain off the page
 *  - every section start is a seam: the folds lift and a hairline of light
 *    rides along it with the content
 *  - a fling stretches the weave on a spring that overshoots and settles
 *  - finger or cursor push the folds; a CTA under the cursor draws them in;
 *    a click sends a ring through the fabric; a still reader gets a calmer frame
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
  float t = uTime * 0.075;

  // Fabric world in vertical parallax. The spring velocity stretches it about
  // the screen centre, so a fling visibly pulls the folds.
  float stretch = 1.0 + abs(uVel) * (0.55 + 0.45 * uPhone);
  vec2 uv = vec2(sc.x * 0.9, sc.y / stretch - uScroll * 0.5);
  vec2 uvNear = vec2(sc.x, sc.y / stretch - uScroll * 0.85);

  // Pointer / finger pocket, in screen space so it stays under the finger.
  vec2 duv = sc - uMouse;
  float inf = exp(-dot(duv, duv) * (9.0 - 3.5 * uPhone)) * uMouseI;
  vec2 iuv = vec2(cos(uTime * 0.11) * 0.62, sin(uTime * 0.083) * 0.42);
  vec2 iduv = sc - iuv;
  float idle = exp(-dot(iduv, iduv) * 5.0) * (1.0 - uMouseI) * 0.85;

  // folds lift where a section begins
  float seamBulge = exp(-pow((sc.y - uSeam.x) * 5.0, 2.0)) * uSeam.y;

  vec2 q = vec2(fbm(uv * 1.6 + vec2(0.0, t)), fbm(uv * 1.6 + vec2(3.1, -t * 0.7)));
  q += duv * inf * 2.2;
  q += iduv * idle * 1.4;
  q += vec2(0.0, uVel * 0.75 + seamBulge * 0.45);
  vec2 adv = uAttract.xy - sc;
  q += adv * exp(-dot(adv, adv) * 3.0) * uAttract.z * 0.9;
  q += normalize(sc - uRipple.xy + 0.0001) * rippleRing(sc) * 0.35;

  float detail = 1.8 + sin(uTime * 0.13) * 0.12 + 0.25 * sin(uChapter * 1.7);
  float f = fbm(uv * detail + q * 1.4 + vec2(t * 0.25, -t * 0.5));
  float f2 = fbm(uvNear * 2.4 - q);

  // Theatre drape. The hem starts just below the frame and leaves through the
  // top after 0.7 of a screen — faster than the content, so it lifts away.
  float hem = -0.62 + uOpen * 1.35;
  float above = sc.y - hem;
  // pleats gather tighter just above the hem, and ride up with the curtain
  float gather = 1.0 + 0.6 * exp(-max(above, 0.0) * 5.0);
  float px = sc.x * (7.0 + 3.0 * uPhone) * gather + (q.x - 0.5) * 1.4 + sin(above * 2.2 + uTime * 0.3) * 0.2;
  float pleat = 0.5 + 0.32 * sin(px * PI) + 0.08 * sin(px * PI * 2.0 + 1.3);
  // Scalloped hem: each fold crest hangs a little lower than the valley
  // beside it — one rounded swag per pleat.
  float sag = 0.03 * (0.5 + 0.5 * sin(px * PI));
  float drape = smoothstep(-0.02, 0.045, above + sag);
  f = mix(f, pleat * 0.8 + f * 0.2, drape);

  gl_FragColor = vec4(clamp(f, 0.0, 1.0), clamp(f2, 0.0, 1.0), drape, 1.0);
}
`;

const FINE = `
void main() {
  vec2 sc = screenUv();
  vec2 st = gl_FragCoord.xy / uRes;
  vec4 F = texture2D(uField, st);
  float f = F.r;
  float f2 = F.g;
  float drape = F.b;
  float t = uTime * 0.075;
  float calm = 1.0 - uCalm * 0.35;
  // chapters shift the light a little, so a long page has movements
  float tone = 0.5 + 0.5 * sin(uChapter * 1.3);

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
  vec3 deep = mix(vec3(0.010, 0.012, 0.026), vec3(0.016, 0.024, 0.058), tone);
  vec3 blue = mix(vec3(0.14, 0.32, 0.86), vec3(0.18, 0.40, 0.96), tone);
  vec3 blueDeep = vec3(0.13, 0.26, 0.68);
  vec3 pale = vec3(0.62, 0.74, 1.0);

  float body = smoothstep(0.35, 0.85, f);
  vec3 col = deep;
  col += blue * body * 0.46 * calm;
  col += blueDeep * smoothstep(0.55, 1.0, f2) * 0.42 * calm;
  col *= 0.50 + 0.72 * diff;
  col += pale * spec * (0.25 + body) * 0.45 * calm;

  // Sheen lines along the folds, at native resolution — the sharp detail the
  // low-res field cannot carry. They flare while the page moves.
  col += vec3(0.5, 0.62, 1.0) * pow(abs(sin(f * 14.0 + t * 3.0)), 24.0)
       * (0.07 + abs(uVel) * 0.34);

  // pointer / finger light, and the dimmer idle pocket
  vec2 duv = sc - uMouse;
  float inf = exp(-dot(duv, duv) * (9.0 - 3.5 * uPhone)) * uMouseI;
  col += vec3(0.24, 0.44, 0.95) * inf * 0.45;
  vec2 iduv = sc - vec2(cos(uTime * 0.11) * 0.62, sin(uTime * 0.083) * 0.42);
  col += vec3(0.2, 0.38, 0.9) * exp(-dot(iduv, iduv) * 5.0) * (1.0 - uMouseI) * 0.85 * 0.22;

  // Drape: darker velvet, a rim of light along the scalloped hem and a soft
  // shadow cast just under it.
  float hem = -0.62 + uOpen * 1.35;
  float below = hem - sc.y;
  col *= 1.0 - drape * 0.16;
  float rim = drape * (1.0 - drape) * 4.0;
  col += (pale * 0.20 + blue * 0.14) * rim;
  // no step at the hem: (1 - drape) already fades the shadow out above it
  col *= 1.0 - 0.35 * (1.0 - drape) * exp(-max(below, 0.0) * 14.0);

  // Section seam: a hairline of light riding with the content, brightest on
  // the fold crests, over a wider glow on the folds.
  float dy = sc.y - uSeam.x;
  col += pale * exp(-pow(dy * 60.0, 2.0)) * uSeam.y * (0.06 + 0.22 * body);
  col += blue * exp(-pow(dy * 6.0, 2.0)) * uSeam.y * smoothstep(0.35, 0.9, f) * 0.16;

  // CTA under the cursor gathers light; click ring lights the fabric it moves.
  vec2 adv = sc - uAttract.xy;
  col += vec3(0.26, 0.48, 1.0) * exp(-dot(adv, adv) * 6.0) * uAttract.z * 0.22;
  col += blue * rippleRing(sc) * 0.18;

  // Last screen: a calm pool of light where the closing CTA sits.
  vec2 e = sc - vec2(0.0, -0.15);
  col += blue * exp(-dot(e, e) * 2.5) * (1.0 - smoothstep(0.0, 1.0, uRemain)) * 0.16;

  // Vignette stays in screen space: it belongs to the screen, not the fabric.
  col *= 1.0 - dot(sc, sc) * 0.55;

  // Film grain at the real pixel. Also dithers the dark gradients.
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
