"use client";

import { useEffect, useRef, useState } from "react";

import type { ShapeSpots } from "./nanoShapes";

/**
 * Step 2 of the home-scene rework: a swarm of LINK micro-bots (fixed ball
 * joint, two independent faceted arms) that flies in streams and docks into
 * recognisable silhouettes.
 *
 * Everything moves on the GPU. Three instanced draws (balls, LED rings, arms)
 * use the real PBR materials from the design lab; their vertex shaders are
 * patched with one shared state function, so flight, docking, arm motion and
 * touch response all come from the same few uniforms. No depth of field: it
 * blurred exactly the facets and LED rings that carry the quality.
 *
 * Lab only. `window.__swarm` steps frames by hand for the in-app browser.
 */

type Api = {
  names: string[];
  /** render the intro at `t` seconds (stills for the in-app browser) */
  intro: (t: number) => void;
  /** jump the scroll story to chapter position P and let the camera settle */
  story?: (P: number) => void;
  set: (from: number, to: number) => void;
  render: (p: number, t: number, opts?: { rot?: number; push?: number; ripple?: number; px?: number; py?: number }) => void;
  shot: (name: string, dir: string) => Promise<unknown>;
};

declare global {
  interface Window {
    __swarm?: Api;
  }
}

const HEAD = /* glsl */ `
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute vec3 aNFrom;
  attribute vec3 aNTo;
  // the two shared control points of this bot's stream (its "spine"):
  // every bot of a stream funnels through them, so streams fly as tight
  // ribbons instead of a cloud
  attribute vec3 aStream;
  attribute vec3 aSpine2;
  // the stream's own start and end (its centroid on each form, lifted)
  attribute vec3 aSpine0;
  attribute vec3 aSpine3;
  attribute vec4 aRnd;
  // packed to stay under 16 vertex attributes: x delay, y arm side (arms
  // only), z/w link direction on the old/new form as an angle about the
  // normal
  attribute vec4 aMisc;
  #ifdef NB_ARM
  // docked arm pose: yaw around the back, pitch off the surface, stretch
  attribute vec3 aArmFrom;
  attribute vec3 aArmTo;
  #endif
  uniform float uP;
  uniform float uTime;
  uniform float uScale;
  uniform float uScaleFrom;
  // pointer: a soft field that lifts bots near it; taps launch ripples
  uniform vec3 uHover;
  uniform float uHoverAmt;
  uniform vec4 uRip[3];
  // intro: the sheet links up in a wave that starts at one hero bot
  uniform float uIntro;
  uniform float uLinkT0;
  uniform vec3 uHeroPos;
  uniform float uHeroId;
  uniform float uHeroShow;
  // 1 = fold the sheet into the form like paper instead of flying in streams
  uniform float uFold;
  // flight shape: 1 = every path passes through one tight spinning core
  uniform float uImplode;
  uniform vec3 uMid;
  // a docked form that turns (the process gear): rad/s about uSpinAxis
  // the gear's turn: an angle integrated on the CPU (only while it is held),
  // applied to whichever side of the transition is the gear
  uniform float uSpinAng;
  uniform float uSpinTo;
  uniform float uSpinFrom;
  uniform vec3 uSpinAxis;
  // how fast the story progress is moving right now (dp/dt): real speed of
  // a flying bot, so the motion streak follows the viewer's own scroll
  uniform float uFlow;
  varying float vLed;
  varying float vNbDepth;
  // motion streak for the transform stage: direction and stretch amount
  vec3 nbVDir = vec3(0.0, 0.0, 1.0);
  float nbStretch = 0.0;

  mat3 nbRot(vec3 a, float ang) {
    a = normalize(a);
    float s = sin(ang), c = cos(ang), oc = 1.0 - c;
    return mat3(
      oc * a.x * a.x + c,       oc * a.x * a.y + a.z * s, oc * a.z * a.x - a.y * s,
      oc * a.x * a.y - a.z * s, oc * a.y * a.y + c,       oc * a.y * a.z + a.x * s,
      oc * a.z * a.x + a.y * s, oc * a.y * a.z - a.x * s, oc * a.z * a.z + c
    );
  }
  // local X = link direction, local Y = the bot's back (surface normal)
  mat3 nbFrame(vec3 n, vec3 d) {
    n = normalize(n);
    vec3 x = d - n * dot(d, n);
    x = dot(x, x) < 1e-6 ? normalize(cross(vec3(0.0, 1.0, 0.0), n) + vec3(1e-3, 0.0, 0.0)) : normalize(x);
    return mat3(x, n, cross(x, n));
  }
  // link direction from its angle about the normal (same tangent basis
  // as the CPU side in NanobotSwarmV4)
  vec3 nbDir(vec3 n, float ang) {
    n = normalize(n);
    vec3 up = abs(n.y) < 0.95 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
    vec3 x0 = normalize(cross(up, n));
    vec3 b0 = cross(n, x0);
    return x0 * cos(ang) + b0 * sin(ang);
  }
  mat3 nbMix(mat3 A, mat3 B, float k) {
    vec3 x = normalize(mix(A[0], B[0], k) + 1e-5);
    vec3 n = mix(A[1], B[1], k);
    n = normalize(n - x * dot(n, x) + 1e-5);
    return mat3(x, n, cross(x, n));
  }

  void nbState(out vec3 pos, out mat3 R, out float s, out mat3 A, out vec3 M, out float st) {
    float aDelay = aMisc.x;
    float aSide = aMisc.y;
    vec3 aDFrom = nbDir(aNFrom, aMisc.z);
    vec3 aDTo = nbDir(aNTo, aMisc.w);
    // the target may be turning (the gear): every use of the docking spot
    // below reads these, never the raw attributes
    vec3 bTo = aTo;
    vec3 bNTo = aNTo;
    vec3 bDTo = aDTo;
    vec3 fFrom = aFrom;
    vec3 fNFrom = aNFrom;
    if (uSpinTo > 0.5 || uSpinFrom > 0.5) {
      mat3 Sr = nbRot(uSpinAxis, uSpinAng);
      if (uSpinTo > 0.5) {
        bTo = uMid + Sr * (aTo - uMid);
        bNTo = Sr * aNTo;
        bDTo = Sr * aDTo;
      }
      if (uSpinFrom > 0.5) {
        fFrom = uMid + Sr * (aFrom - uMid);
        fNFrom = Sr * aNFrom;
        aDFrom = Sr * aDFrom;
      }
    }

    // Per-bot timeline outside the intro fold: a release pre-roll (raw
    // -0.3..0) where the bot unlatches and rises off its spot, the flight
    // (0..1), then the hover-drop and the latch past 1.
    float raw = uFold > 0.5 ? (uP / 1.3 - aDelay * 0.3) / 0.7 : (uP - 0.15 - aDelay * 0.5) / 0.5;
    float lp = clamp(raw, 0.0, 1.0);
    float e = lp * lp * lp * (lp * (lp * 6.0 - 15.0) + 10.0);
    float ie = 1.0 - e;
    // beat 1 — release, with anticipation: the bot crouches into its
    // socket, then kicks off the surface (a jump, not a fade)
    float rel = uFold > 0.5 ? 0.0 : smoothstep(-0.16, 0.0, raw);
    float crouch = uFold > 0.5 ? 0.0 : sin(3.14159 * clamp((raw + 0.3) / 0.16, 0.0, 1.0));

    // beat 2 — flight on a cubic: take off along the old normal, swirl
    // around the shared axis in a ribbon with its stream, come down along
    // the new normal. Implode: every path runs through one tight core.
    float liftH = 0.9 + aRnd.w * 0.5;
    vec3 P0 = fFrom + fNFrom * uScaleFrom * (1.4 * rel - 0.45 * crouch);
    vec3 P3 = bTo;
    float ie2 = ie * ie;
    float e2 = e * e;
    // the bot's own path: its spot → the stream's two spine points → its spot
    pos = ie2 * ie * P0 + 3.0 * ie2 * e * aStream + 3.0 * ie * e2 * aSpine2 + e2 * e * P3;
    vec3 vel = 3.0 * ie2 * (aStream - P0) + 6.0 * ie * e * (aSpine2 - aStream) + 3.0 * e2 * (P3 - aSpine2);

    // Tube: mid-flight every bot of a stream leaves its own path for the
    // stream's shared spine and rides a lane a few centimetres off it; the
    // lanes twist along the spine like a braided cable. The stream's bots
    // are staggered in time, so the cable reads as a train, not a cloud.
    vec3 spine = ie2 * ie * aSpine0 + 3.0 * ie2 * e * aStream + 3.0 * ie * e2 * aSpine2 + e2 * e * aSpine3;
    vec3 spineVel = 3.0 * ie2 * (aStream - aSpine0) + 6.0 * ie * e * (aSpine2 - aStream) + 3.0 * e2 * (aSpine3 - aSpine2);
    vec3 tng = normalize(spineVel + vec3(1e-4, 0.0, 0.0));
    // frame from the axis least parallel to the path, so it never flips
    // mid-flight; lanes sit well apart so the braid reads from the far
    // camera too (near lanes then grow visibly larger in projection)
    vec3 ref = abs(tng.y) < 0.8 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
    vec3 o1 = normalize(cross(tng, ref));
    vec3 o2 = cross(tng, o1);
    float laneAng = floor(aRnd.x * 5.0) * 1.2566 + e * 9.0;
    float laneR = 0.14 + aRnd.y * 0.12;
    vec3 lane = spine + (o1 * cos(laneAng) + o2 * sin(laneAng)) * laneR;
    float tube = smoothstep(0.06, 0.3, e) * (1.0 - smoothstep(0.7, 0.94, e));
    pos = mix(pos, lane, tube);
    vel = mix(vel, spineVel, tube) + vec3(1e-4, 0.0, 0.0);

    // Vortex: mid-flight the whole swarm wheels around the vertical axis of
    // the form, one direction for every stream — a coordinated river of
    // machines, not particles drifting. Zero at take-off and landing.
    if (uFold < 0.5 && uImplode < 0.5) {
      float swK = 1.1 + aRnd.z * 0.5;
      float sw = sin(3.14159 * e) * swK;
      mat3 Sw = nbRot(vec3(0.0, 1.0, 0.0), sw);
      vel = Sw * vel + cross(vec3(0.0, 1.0, 0.0), Sw * pos) * (3.14159 * cos(3.14159 * e) * swK);
      pos = Sw * pos;
    }

    // Implode: all paths pour into one tight core, it holds and spins,
    // then bursts outward onto the form
    float burst = 0.0;
    if (uImplode > 0.5) {
      vec3 core = uMid + normalize(aRnd.xyz - 0.5 + 1e-3) * (0.12 + aRnd.w * 0.2);
      float ein = smoothstep(0.0, 0.42, lp);
      float eout = smoothstep(0.62, 1.0, lp);
      float spinA = ein * 2.0 + max(lp - 0.42, 0.0) * 9.0;
      vec3 inP = mix(P0, core, ein * ein);
      vec3 coreP = uMid + nbRot(vec3(0.0, 1.0, 0.0), spinA) * (inP - uMid);
      float outK = 1.0 - pow(1.0 - eout, 3.0);
      pos = mix(coreP, P3, outK);
      vel = eout > 0.0 ? P3 - core : nbRot(vec3(0.0, 1.0, 0.0), spinA) * vec3(0.0, 0.0, 1.0) + (core - P0) * (1.0 - ein);
      burst = exp(-pow((lp - 0.63) / 0.05, 2.0));
    }

    // in flight a bot is a dart: arms swept back as wings (both visible
    // from any angle), nose along the path, a gentle bank instead of a spin
    vec3 fv = normalize(vel);
    vec3 fw = normalize(cross(fv, normalize(aRnd.yzx - 0.5 + 1e-3)));
    vec3 fb = normalize(cross(fw, fv));
    mat3 F = mat3(fw, fb, cross(fw, fb)) * nbRot(vec3(0.0, 0.0, 1.0), sin(uTime * 1.3 + aRnd.x * 6.2831) * 0.35);
    float leave = smoothstep(0.0, 0.18, lp);
    float land = smoothstep(0.72, 1.0, lp);
    // (the fold below reassigns leave/land: arms keep their grip throughout)
    R = nbMix(nbMix(nbFrame(fNFrom, aDFrom), F, leave), nbFrame(bNTo, bDTo), land);

    // fold: the sheet closes towards the camera like a book, its top and
    // bottom curl, and the curled sheet settles into the form — one surface
    // the whole way, never a cloud
    float foldK = 0.0;
    if (uFold > 0.5) {
      float fa = smoothstep(0.0, 0.7, e);
      float sx = aFrom.x >= 0.0 ? 1.0 : -1.0;
      float sy = aFrom.y >= 0.0 ? 1.0 : -1.0;
      mat3 Rf = nbRot(vec3(0.0, 1.0, 0.0), -sx * fa * 0.9)
        * nbRot(vec3(1.0, 0.0, 0.0), sy * fa * 0.55 * smoothstep(0.15, 0.75, e));
      foldK = smoothstep(0.25, 1.0, e);
      pos = mix(Rf * aFrom, bTo, foldK);
      R = nbMix(Rf * nbFrame(aNFrom, aDFrom), nbFrame(bNTo, bDTo), foldK);
      leave = 0.0;
      land = foldK;
    }

    // lock-in: a small overshoot as the bot seats itself
    float seat = clamp((raw - 0.85) / 0.3, 0.0, 1.0);
    float pop = sin(seat * 3.14159);
    s = mix(uScaleFrom, uScale, e) * (1.0 - 0.14 * sin(3.14159 * e) + pop * 0.16);

    // approach: hold a few bot-lengths above the spot, then drop in along
    // the normal — a landing, not a collision
    if (uFold < 0.5) {
      float hoverH = smoothstep(0.45, 0.78, lp) * (1.0 - smoothstep(0.8, 0.97, lp));
      pos += bNTo * s * 3.2 * hoverH;
    }

    float docked = step(1.0, raw);

    // Motion streak (the CG film look): a flying bot smears along its path
    // in proportion to its real speed — progress rate (uFlow) times how fast
    // the eased flight is moving — so a fast scroll paints light trails and
    // a paused scroll freezes a crisp frame.
    float flying = smoothstep(0.04, 0.2, lp) * (1.0 - smoothstep(0.78, 0.96, lp)) * (1.0 - uFold) * (1.0 - docked);
    float deDp = 60.0 * lp * lp * (1.0 - lp) * (1.0 - lp);
    nbVDir = normalize(vel);
    nbStretch = clamp(length(vel) * deDp * uFlow * 0.03, 0.0, 2.6) * flying;

    // the hero bot is drawn by a detailed mesh while the camera is on it
    #ifdef NB_ARM
    float nbId = float(gl_InstanceID / 2);
    #else
    float nbId = float(gl_InstanceID);
    #endif
    if (abs(nbId - uHeroId) < 0.5) s *= uHeroShow;

    // intro chain reaction: each bot links when the wave from the hero
    // reaches it — arms unfold, the LED fires. Outside the intro uIntro is
    // huge, so every bot is simply linked.
    float linkT = uLinkT0 + length(aFrom - uHeroPos) * 0.5;
    // mechanical: open to ~70%, a beat of stillness, then snap home with a
    // little overshoot — reads as a latch, not a fade
    float link = 0.72 * smoothstep(linkT, linkT + 0.22, uIntro)
      + 0.28 * smoothstep(linkT + 0.3, linkT + 0.34, uIntro)
      + 0.08 * exp(-pow((uIntro - linkT - 0.37) / 0.05, 2.0));
    float linkAge = uIntro - linkT;
    // the LED fires on the latch, not on the first twitch
    float latchAge = linkAge - 0.32;
    float linkFlash = latchAge > 0.0 ? exp(-latchAge * 4.0) : 0.0;

    // Interaction stays on the surface: bots lift along their own normal,
    // never towards the camera, so nothing balloons into the lens. Distance
    // is measured on screen (world XY) from the docking spot.
    vec3 dockW = (modelMatrix * vec4(bTo, 1.0)).xyz;
    vec2 hv = dockW.xy - uHover.xy;
    float hover = uHoverAmt * exp(-dot(hv, hv) / 0.3) * docked;
    float rip = 0.0;
    for (int i = 0; i < 3; i++) {
      float age = uTime - uRip[i].w;
      if (age > 0.0 && age < 2.6) {
        float d = length(dockW.xy - uRip[i].xy);
        float f = (d - age * 2.4) / 0.2;
        rip += exp(-f * f) * (1.0 - age / 2.6);
      }
    }
    rip *= docked;
    float lift = hover * 0.55 + rip;
    pos += R[1] * lift * s * 1.4;
    float w = lift;
    float breath = sin(uTime * 1.4 - bTo.y * 2.2 + aRnd.x * 0.8);

    // the latch after touchdown: open to 70%, a beat, snap home with a small
    // overshoot — the same mechanical signature as the intro chain reaction
    float latchT = (raw - 0.9) / 0.25;
    float latch = 0.72 * smoothstep(0.0, 0.45, latchT)
      + 0.28 * smoothstep(0.6, 0.68, latchT)
      + 0.08 * exp(-pow((latchT - 0.74) / 0.1, 2.0));

    // The living machine: now and then a docked bot re-seats itself — arms
    // lift and turn, a beat, then snap home with a flash. ~10% of bots, each
    // on its own 7 s clock; the silhouette never moves.
    float mT = fract(uTime / 7.0 + aRnd.z * 13.7);
    float mOn = step(fract(aRnd.y * 7.31), 0.1) * docked * (1.0 - uFold) * step(1e3, uIntro);
    float mOpen = mOn * smoothstep(0.0, 0.045, mT) * (1.0 - smoothstep(0.085, 0.095, mT));
    float mFlash = mT > 0.095 ? mOn * exp(-(mT - 0.095) * 60.0) : 0.0;

    A = mat3(1.0);
    M = vec3(1.0);
    st = 1.0;
    #ifdef NB_ARM
    // left arm is the right one turned half a turn about the back
    M = vec3(aSide, 1.0, aSide);
    // leave the old grip, fly straight, then reach for the new neighbours:
    // docked, each arm ends on a neighbour's ball, so the form has no gaps
    // folded: arms tucked down under the ball, so an unlinked field reads as
    // a field of spheres and the unfolding arms are the event
    vec3 linked = mix(vec3(0.0, -1.25, 0.42), aArmFrom, link);
    vec3 pose;
    float swim;
    float beat = 0.0;
    if (uFold > 0.5) {
      // A sheet's links can't survive a fold without stretching through the
      // form, so they visibly let go as it starts to curl, ride tucked, and
      // latch onto the new neighbours as the A seats — release, reconnect
      float letGo = smoothstep(0.04, 0.26, e);
      pose = mix(mix(linked, vec3(0.0, -1.25, 0.42), letGo), aArmTo, clamp(latch, 0.0, 1.1));
      swim = 0.0;
    } else {
      // release: let go of the neighbours; flight: wings swept back with a
      // slow beat; touchdown: the latch reaches for the new neighbours
      vec3 wing = vec3(-0.55 * aSide, 0.12, 0.8);
      pose = mix(mix(linked, wing, rel), aArmTo, clamp(latch, 0.0, 1.1));
      swim = 0.0;
      beat = sin(uTime * 10.0 + aRnd.z * 6.2831) * 0.2 * (1.0 - clamp(latch, 0.0, 1.0)) * rel;
    }
    // arms flare up and out as the lift passes through the bot
    float pitch = pose.y + beat + 0.04 * breath * land + (uFold > 0.5 ? pop * 0.3 : 0.0) + w * 0.55 + mOpen * 0.85;
    st = mix(pose.z, 0.7, mOpen);
    A = nbRot(vec3(0.0, 1.0, 0.0), pose.x + swim + w * 0.25 * aSide + mOpen * 0.55 * aSide) * nbRot(vec3(0.0, 0.0, 1.0), pitch * aSide);
    #endif

    // the LED fires on the latch
    float arrive = uFold > 0.5
      ? (raw >= 1.0 ? exp(-(raw - 1.0) * 7.0) : 0.0)
      : (latchT > 0.65 ? exp(-(latchT - 0.65) * 3.0) : 0.0);
    float wave = pow(max(0.0, sin(uTime * 1.1 - bTo.y * 2.4 - bTo.x * 0.6)), 18.0);
    vLed = 0.3 + arrive * 3.0 + wave * 1.8 * max(docked, 1.0 - rel) + hover * 1.6 + rip * 3.2 + ie * 0.35 * rel;
    // an unlinked bot is dark; linking fires its LED once
    vLed = vLed * max(link, leave) + linkFlash * 3.0 * (1.0 - leave);
    if (uFold < 0.5) vLed *= 1.0 - 0.55 * rel * (1.0 - clamp(latch, 0.0, 1.0));
    if (uImplode > 0.5) vLed += smoothstep(0.3, 0.45, lp) * (1.0 - smoothstep(0.6, 0.7, lp)) * 1.4 + burst * 4.0;
    // flying LEDs burn a little hotter: stretched by the streak they read as
    // light trails; a re-seated bot flashes on the snap
    vLed += flying * 0.9 + mFlash * 3.0;
  }
`;

// scroll story chapters (lab): the copy sits opposite the form
const CHAPTERS = [
  { shape: "monogram", side: "right", kicker: "", title: "", mode: "flight", az: 0, el: 0.04, dd: 0 },
  { shape: "bulb", side: "left", kicker: "Manifest", title: "Svaki veliki sistem počinje jednim preciznim delom.", mode: "flight", az: 0.32, el: 0.12, dd: 0.4 },
  { shape: "devices", side: "right", kicker: "Projekti", title: "Sajtovi i aplikacije koji rade umesto vas.", mode: "flight", az: -0.12, el: 0.05, dd: 0.5 },
  { shape: "chip", side: "left", kicker: "AI", title: "Sistemi koji uče iz vaših podataka.", mode: "implode", az: 0.18, el: 0.1, dd: 0.2 },
  { shape: "gear", side: "right", kicker: "Proces", title: "Jedan tim, jasni koraci, bez iznenađenja.", mode: "flight", az: -0.3, el: 0.16, dd: 0.3 },
  { shape: "growth", side: "left", kicker: "Rezultati", title: "Rast koji se meri, ne obećava.", mode: "flight", az: 0.24, el: 0.02, dd: 0.4 },
] as const;
// long chapters: the transition gets room to breathe
const CHAPTER_VH = 260;

export function NanobotSwarmV4({
  intro = false,
  scroll = false,
  landing = false,
}: { intro?: boolean; scroll?: boolean; landing?: boolean } = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctlRef = useRef({ auto: !intro, spin: true, pick: -1, count: 0, replay: false });
  const titleRef = useRef<HTMLDivElement>(null);
  const [shapes, setShapes] = useState<{ name: string; label: string }[]>([]);
  const [current, setCurrent] = useState(-1);
  const [auto, setAuto] = useState(!intro);
  const [spin, setSpin] = useState(true);
  const [count, setCount] = useState(0);
  const [staticFallback, setStaticFallback] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let raf = 0;
    let cleanup = () => {};

    const prog = (p: number) => window.dispatchEvent(new CustomEvent("v4:scene-progress", { detail: p }));

    if (landing) {
      // same software-GPU guard as SceneV4: don't hand a bad driver 6k
      // instanced bots, fall back to the plain void backdrop instead
      let ok = false;
      try {
        const probe = document.createElement("canvas");
        const gl =
          probe.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ??
          probe.getContext("webgl", { failIfMajorPerformanceCaveat: true });
        if (gl) {
          gl.getExtension("WEBGL_lose_context")?.loseContext();
          ok = true;
        }
      } catch {
        ok = false;
      }
      if (!ok) {
        setStaticFallback(true);
        prog(1);
        return;
      }
    }

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    // Low tier gets its own, smaller lattice (sampled at that count, so every
    // arm still finds a neighbour) — never a thinned-out big one
    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowEnd = mobile && ((nav.deviceMemory ?? 8) <= 4 || (navigator.hardwareConcurrency ?? 8) <= 4);
    const qn = Number(new URLSearchParams(location.search).get("n"));
    const N = qn > 0 ? Math.min(qn, 16000) : lowEnd ? 1500 : mobile ? 2500 : 6000;

    // shapes are built in a worker, in parallel with the three.js download;
    // the main-thread build stays as a fallback (old browsers, worker errors)
    let worker: Worker | null = null;
    const fromWorker = new Promise<{ shapes: ShapeSpots[]; sheet: ShapeSpots } | null>((resolve) => {
      try {
        worker = new Worker(new URL("./nanoShapes.worker.ts", import.meta.url), { type: "module" });
        worker.onmessage = (e) => resolve(e.data);
        worker.onerror = () => resolve(null);
        worker.postMessage({ N });
      } catch {
        resolve(null);
      }
    });

    (async () => {
      if (landing) prog(0.15);
      const THREE = await import("three");
      const PP = await import("postprocessing");
      const { mergeGeometries } = await import("three/examples/jsm/utils/BufferGeometryUtils.js");
      if (disposed) return;
      if (landing) prog(0.45);

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        // only the lab's shot() reads pixels back; the landing skips the cost
        preserveDrawingBuffer: !landing,
        // landing: transparent, like SceneV4 — the hero title sits BEHIND the
        // swarm (z-index -1) and the void is painted by `.sceneBackdrop`
        alpha: landing,
        powerPreference: "high-performance",
      });
      const basePR = Math.min(window.devicePixelRatio, lowEnd ? 1 : mobile ? 1.25 : 1.5);
      renderer.setPixelRatio(basePR);
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      renderer.setClearColor(0x000000, landing ? 0 : 1);
      renderer.toneMapping = THREE.NoToneMapping;

      const scene = new THREE.Scene();
      scene.background = landing ? null : new THREE.Color(0x000000);
      const camera = new THREE.PerspectiveCamera(30, canvas.clientWidth / canvas.clientHeight, 0.1, 80);
      camera.position.set(0, 0.3, mobile ? 10 : 7.2);
      camera.lookAt(0, 0, 0);

      // studio of emissive soft boxes, same as the design lab
      const envScene = new THREE.Scene();
      const softbox = (w: number, h: number, pos: [number, number, number], color: string, power: number) => {
        const m = new THREE.Mesh(
          new THREE.PlaneGeometry(w, h),
          new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(power), side: THREE.DoubleSide }),
        );
        m.position.set(...pos);
        m.lookAt(0, 0, 0);
        envScene.add(m);
      };
      softbox(9, 2.4, [0, 7, 1.5], "#ffffff", 5);
      softbox(0.7, 7, [6, 0.8, 3.5], "#ffffff", 9);
      softbox(1.4, 6, [-6.5, 0.5, 2], "#5b82ff", 5);
      softbox(7, 0.8, [0, 1.2, -7], "#dfe6ff", 4);
      softbox(3, 3, [-2, 3, 6], "#ffffff", 1.2);
      // backlight from the wormhole's side: dark bots pick up bright rims
      // at their silhouettes, so the form separates from the void by light,
      // not by adding colour
      if (landing) softbox(6, 6, [1.8, 0.7, -9], "#f4f1ec", 2.6);
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(envScene, 0.015).texture;
      scene.environment = envTex;
      const ENV_I = 2.1;
      scene.environmentIntensity = ENV_I;

      // ── dust: fine motes in the space around the form. The far sky is the
      // backdrop below; these are near, so the camera's movement produces real
      // parallax and the void stops reading as an empty box.
      const STARS = landing ? (mobile ? 500 : 900) : 0;
      const starPos = new Float32Array(STARS * 3);
      const starTw = new Float32Array(STARS);
      {
        let s = 7777;
        const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
        for (let i = 0; i < STARS; i++) {
          starPos[i * 3] = (r() - 0.5) * 20;
          starPos[i * 3 + 1] = (r() - 0.5) * 13;
          starPos[i * 3 + 2] = (r() - 0.5) * 12 - 2.5;
          starTw[i] = r();
        }
      }
      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
      starGeo.setAttribute("aTw", new THREE.BufferAttribute(starTw, 1));
      const starMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uPR: { value: basePR }, uFade: { value: 0 } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: /* glsl */ `
          attribute float aTw;
          uniform float uTime;
          uniform float uPR;
          varying float vA;
          varying float vTw;
          void main() {
            vTw = aTw;
            vA = 0.3 + 0.35 * (0.5 + 0.5 * sin(uTime * (0.4 + aTw * 0.9) + aTw * 41.0));
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            // nearer motes are larger and softer, far ones a pinpoint
            float near = clamp(6.0 / max(-mv.z, 0.5), 0.4, 2.2);
            gl_PointSize = (1.1 + aTw * aTw * 1.8) * near * uPR;
            vA *= mix(0.55, 1.0, clamp(near - 0.4, 0.0, 1.0));
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform float uFade;
          varying float vA;
          varying float vTw;
          void main() {
            float d = distance(gl_PointCoord, vec2(0.5));
            if (d > 0.5) discard;
            float halo = exp(-d * d * 14.0);
            float core = smoothstep(0.18, 0.0, d);
            vec3 col = mix(vec3(0.8, 0.8, 0.82), vec3(0.97, 0.96, 0.95), vTw);
            float a = (halo * 0.5 + core * 0.7) * vA * uFade * 0.42;
            gl_FragColor = vec4(col, a);
          }
        `,
      });
      const stars = new THREE.Points(starGeo, starMat);
      stars.frustumCulled = false;
      if (STARS) scene.add(stars);

      // ── the void: far sky behind everything ─────────────────────────────
      // ── the void: a wormhole, after Interstellar ────────────────────────
      // Done the way DNEG did it (Thorne et al., "Visualizing Interstellar's
      // Wormhole"): real skies bent through a lens. Our side is NASA's Deep
      // Star Maps 2020 (Hipparcos/Tycho/Gaia stars with true colours and
      // dust); the universe through the throat is ESO's all-sky Milky Way
      // photograph (S. Brunier). Both are equirectangular, in galactic
      // coordinates, loaded after the page and faded in when ready.
      const texLoader = new THREE.TextureLoader();
      const blank = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1);
      blank.needsUpdate = true;
      const skyTextures: InstanceType<typeof THREE.Texture>[] = [blank];
      const loadSky = (url: string, onLoad: (t: InstanceType<typeof THREE.Texture>) => void) => {
        if (!landing) return;
        texLoader.load(url, (t) => {
          if (disposed) {
            t.dispose();
            return;
          }
          t.colorSpace = THREE.SRGBColorSpace;
          t.wrapS = THREE.RepeatWrapping;
          t.wrapT = THREE.ClampToEdgeWrapping;
          t.minFilter = THREE.LinearMipmapLinearFilter;
          t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
          t.needsUpdate = true;
          skyTextures.push(t);
          onLoad(t);
        });
      };
      const big = !mobile && !lowEnd;

      const skyUniforms = {
        uInvProj: { value: camera.projectionMatrixInverse },
        uCamWorld: { value: camera.matrixWorld },
        uRes: { value: new THREE.Vector2(1, 1) },
        uPx: { value: 0.001 },
        uTime: { value: 0 },
        uFade: { value: 0 },
        uGlow: { value: new THREE.Vector3(0, 0, 1) },
        // upper centre-left, between the headline and the form: in view, far
        // away, from the first frame
        uHoleDir: { value: new THREE.Vector3(-0.12, 0.18, -1).normalize() },
        uHoleR: { value: 0.04 },
        uEnter: { value: 0 },
        uOur: { value: blank as InstanceType<typeof THREE.Texture> },
        uFar: { value: blank as InstanceType<typeof THREE.Texture> },
        uOurOn: { value: 0 },
        uFarOn: { value: 0 },
      };
      loadSky(big ? "/images/space/nasa-starmap-3840.webp" : "/images/space/nasa-starmap-2048.webp", (t) => {
        skyUniforms.uOur.value = t;
        skyUniforms.uOurOn.value = 1;
      });
      loadSky(big ? "/images/space/eso-milkyway-3072.webp" : "/images/space/eso-milkyway-2048.webp", (t) => {
        skyUniforms.uFar.value = t;
        skyUniforms.uFarOn.value = 1;
      });
      const sky = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({
          uniforms: skyUniforms,
          depthTest: false,
          depthWrite: false,
          blending: THREE.NoBlending,
          vertexShader: /* glsl */ `
            void main() { gl_Position = vec4(position.xy, 0.999, 1.0); }
          `,
          fragmentShader: /* glsl */ `
            uniform mat4 uInvProj;
            uniform mat4 uCamWorld;
            uniform vec2 uRes;
            uniform float uPx;
            uniform float uTime;
            uniform float uFade;
            uniform vec3 uGlow;
            uniform vec3 uHoleDir;
            uniform float uHoleR;
            uniform float uEnter;
            uniform sampler2D uOur;
            uniform sampler2D uFar;
            uniform float uOurOn;
            uniform float uFarOn;

            float hash(vec2 p) {
              p = fract(p * vec2(123.34, 456.21));
              p += dot(p, p + 45.32);
              return fract(p.x * p.y);
            }
            vec3 hash33(vec3 p) {
              p = fract(p * vec3(0.1031, 0.1030, 0.0973));
              p += dot(p, p.yxz + 33.33);
              return fract((p.xxy + p.yxx) * p.zyx);
            }
            vec3 rotAxis(vec3 v, vec3 k, float a) {
              return v * cos(a) + cross(k, v) * sin(a) + k * dot(k, v) * (1.0 - cos(a));
            }
            // a few crisp sparkles on top of the photographic stars
            vec3 sparkle(vec3 d, float px) {
              vec3 id = floor(d * 45.0);
              vec3 r = hash33(id);
              if (r.x > 0.045) return vec3(0.0);
              vec3 sp = normalize((id + 0.2 + 0.6 * hash33(id + 17.0)) / 45.0);
              vec3 dd = d - sp;
              float size = px * (0.45 + 0.35 * r.z);
              float b = exp(-dot(dd, dd) / (size * size));
              float tw = 0.75 + 0.25 * sin(uTime * (0.6 + 1.8 * r.y) + r.z * 40.0);
              return mix(vec3(1.0, 0.9, 0.78), vec3(1.0), r.y) * b * tw * (0.15 + pow(r.z, 5.0) * 1.2);
            }
            // equirect lookup; the band is tilted for a diagonal composition
            vec2 equi(vec3 d) {
              const float c = 0.906;
              const float s = 0.423;
              d = vec3(c * d.x - s * d.y, s * d.x + c * d.y, d.z);
              return vec2(atan(d.x, -d.z) / 6.2831853 + 0.5, asin(clamp(d.y, -1.0, 1.0)) / 3.14159265 + 0.5);
            }
            // our side: NASA's map, lifted — it is exposed for print, not film
            vec3 ours(vec3 d) {
              vec3 c = texture2D(uOur, equi(d)).rgb;
              c = pow(c, vec3(1.18)) * 1.35;
              float l = dot(c, vec3(0.3, 0.55, 0.15));
              return max(mix(vec3(l), c, 1.35), 0.0) * uOurOn;
            }
            // the far side: ESO's photograph, graded warm (blue pulled back)
            vec3 fars(vec3 d) {
              vec3 c = pow(texture2D(uFar, equi(d)).rgb, vec3(1.12)) * 1.25 * uFarOn;
              float l = dot(c, vec3(0.3, 0.55, 0.15));
              c = mix(vec3(l), c, 1.25);
              return c * vec3(1.06, 0.99, 0.86);
            }

            void main() {
              vec2 ndc = gl_FragCoord.xy / uRes * 2.0 - 1.0;
              vec4 v = uInvProj * vec4(ndc, 1.0, 1.0);
              vec3 dir = normalize(mat3(uCamWorld) * (v.xyz / v.w));

              float cosT = clamp(dot(dir, uHoleDir), -1.0, 1.0);
              float th = acos(cosT);
              float R = uHoleR;
              float edge = max(fwidth(th), 1e-5);
              vec3 t1 = normalize(cross(uHoleDir, vec3(0.0, 1.0, 0.0)));
              vec3 t2 = cross(uHoleDir, t1);
              vec3 pr = dir - uHoleDir * cosT;
              vec2 dn = vec2(dot(pr, t1), dot(pr, t2));
              dn /= max(length(dn), 1e-5);
              vec3 wh = vec3(1.0, 0.96, 0.9);

              // ── outside: an Einstein-ring lens over the real sky. Grazing
              // rays come from far round the back; the inner field turns
              // faster than the outer, so stars stream round the mouth.
              float thS = th - R * R * 1.15 / max(th, R * 0.5);
              vec3 axis = normalize(cross(uHoleDir, dir) + vec3(1e-6));
              vec3 src = rotAxis(dir, axis, thS - th);
              float near = R / max(th, R);
              src = rotAxis(src, uHoleDir, uTime * 0.006 + near * near * uTime * 0.04);
              float px = max(length(fwidth(src)), uPx * 0.5);
              // the lens smears starlight into concentric arcs near the rim
              float arc = 0.05 * near * near * near;
              vec3 outside = vec3(0.0);
              for (int j = 0; j < 5; j++) {
                outside += ours(rotAxis(src, uHoleDir, (float(j) / 4.0 - 0.5) * arc));
              }
              outside /= 5.0;
              outside += sparkle(src, px);
              outside *= 1.0 + 0.7 * near * near;

              // ── inside: the whole far sky is packed into the ball — straight
              // through at the centre, then ever further round toward the rim,
              // where it compresses into thin flipped rings as in the film
              float u = th / R;
              vec3 F = normalize(vec3(sin(uTime * 0.01) * 0.3, 0.05, -1.0));
              vec3 f1 = normalize(cross(F, vec3(0.0, 1.0, 0.0)));
              vec3 f2 = cross(F, f1);
              float thF = 3.0 * pow(u, 1.6);
              vec3 fdir = cos(thF) * F + sin(thF) * (dn.x * f1 + dn.y * f2);
              vec3 inside = fars(fdir);
              inside += sparkle(fdir, max(length(fwidth(fdir)), 1e-5)) * 0.8;
              // the glass: crescents where the light from the upper right
              // catches the rim, a faint sheen across the ball
              vec2 L = normalize(vec2(0.75, 0.55));
              float lit = pow(max(dot(dn, L), 0.0), 3.0) + 0.45 * pow(max(-dot(dn, L), 0.0), 6.0);
              float rim = smoothstep(0.84, 0.995, u);
              inside += wh * rim * rim * (0.03 + 0.8 * lit);
              inside *= mix(1.0, 0.8, smoothstep(0.9, 1.0, u));

              vec3 col = mix(outside, inside, 1.0 - smoothstep(R - edge, R + edge, th));
              col += wh * exp(-pow((th - R) / (edge * 1.0 + R * 0.002), 2.0)) * (0.08 + 0.5 * lit);

              // ── through the throat: a dark glass tube; its walls carry the
              // far sky wrapped round it, rippling like thick glass, stars
              // streaking along the travel, faint rings of glass passing
              if (uEnter > 0.0) {
                float phi = atan(dn.y, dn.x);
                float z = 0.3 / max(tan(th), 0.015) + uTime * 0.9;
                float ph2 = phi + 0.06 * sin(z * 4.0 + phi * 3.0) + z * 0.04;
                vec3 wall = vec3(0.0);
                for (int j = 0; j < 4; j++) {
                  float zz = z - float(j) * 0.05;
                  vec3 wdir = normalize(vec3(cos(ph2), sin(ph2), 0.55));
                  wall += fars(rotAxis(wdir, vec3(0.0, 0.0, 1.0), zz * 0.12));
                }
                wall *= 0.25 * 0.9;
                // glass: ribs of light where the tube's rings pass
                float ribs = pow(0.5 + 0.5 * sin(z * 2.2), 30.0);
                wall += wh * ribs * 0.05 * (0.4 + lit);
                // depth: the throat darkens away from the walls
                wall *= smoothstep(0.02, 0.3, th);
                // a small warm light at the far end
                wall += vec3(1.0, 0.88, 0.72) * exp(-th / 0.025) * 0.9;
                col = mix(col, wall, uEnter);
              }

              vec2 gd = (ndc - uGlow.xy) * vec2(uRes.x / uRes.y, 1.0);
              col += vec3(0.05, 0.05, 0.05) * exp(-dot(gd, gd) / 0.55) * uGlow.z * 0.4;

              col *= uFade;
              col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) / 400.0;
              col = max(col, 0.0);
              float a = clamp(max(col.r, max(col.g, col.b)) * 1.5, 0.0, 1.0);
              gl_FragColor = vec4(col, a);
            }
          `,
        }),
      );
      sky.frustumCulled = false;
      sky.renderOrder = -10;
      if (landing) scene.add(sky);
      const skyRes = new THREE.Vector2();
      const glowV = new THREE.Vector3();
      const updateSky = (t: number, fade: number, progress = 0) => {
        camera.updateMatrixWorld();
        renderer.getDrawingBufferSize(skyRes);
        skyUniforms.uRes.value.copy(skyRes);
        skyUniforms.uPx.value = ((2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2)) / skyRes.y) * 0.75;
        skyUniforms.uTime.value = t;
        skyUniforms.uFade.value = fade;
        // far away at the top of the page; we travel toward it as we read,
        // slowly then faster, and near the end go through the throat
        skyUniforms.uHoleR.value = 0.06 + 0.5 * Math.pow(progress, 1.4);
        skyUniforms.uEnter.value = smooth01(0.5, 0.72, progress);
        glowV.set(0, 0, 0).project(camera);
        skyUniforms.uGlow.value.set(glowV.x, glowV.y, 1);
      };

      const buildT0 = performance.now();
      let built = await fromWorker;
      (worker as Worker | null)?.terminate();
      if (disposed) return;
      if (!built) {
        if (process.env.NODE_ENV !== "production") console.warn("[swarm] worker unavailable, building shapes on the main thread");
        const { MeshSurfaceSampler } = await import("three/examples/jsm/math/MeshSurfaceSampler.js");
        const { buildShapes } = await import("./nanoShapes");
        built = buildShapes(THREE, { mergeGeometries }, MeshSurfaceSampler, N);
      }
      const { shapes: spots, sheet } = built;
      if (process.env.NODE_ENV !== "production") {
        console.info(`[swarm] ${spots.length} shapes × ${N} bots ready after ${Math.round(performance.now() - buildT0)} ms wait`);
      }
      if (landing) prog(0.75);
      // bot model is ~2.7 units tip to tip; a reach of ~2.5 spacings lets
      // neighbours overlap, so the lattice closes instead of leaving windows
      const scaleOf = (sp: ShapeSpots) => (sp.spacing * 2.5) / 2.7;

      // ── shared uniforms ───────────────────────────────────────────────
      const U = {
        uP: { value: 0 },
        uTime: { value: 0 },
        uScale: { value: scaleOf(spots[0]) },
        uScaleFrom: { value: scaleOf(spots[0]) * 0.8 },
        uHover: { value: new THREE.Vector3(0, 0, 0) },
        uHoverAmt: { value: 0 },
        uRip: { value: [new THREE.Vector4(0, 0, 0, -99), new THREE.Vector4(0, 0, 0, -99), new THREE.Vector4(0, 0, 0, -99)] },
        uIntro: { value: 1e4 },
        uLinkT0: { value: 0.95 },
        uHeroPos: { value: new THREE.Vector3() },
        uHeroId: { value: -1 },
        uHeroShow: { value: 1 },
        uFold: { value: 0 },
        uImplode: { value: 0 },
        uMid: { value: new THREE.Vector3() },
        uSpinAng: { value: 0 },
        uSpinTo: { value: 0 },
        uSpinFrom: { value: 0 },
        uSpinAxis: { value: new THREE.Vector3(0, 0, 1) },
        uFlow: { value: 0 },
      };

      type AnyMat = InstanceType<typeof THREE.Material> & { defines?: Record<string, unknown> };
      const patchLit = (m: AnyMat, arm: boolean) => {
        m.defines = { ...(m.defines ?? {}), ...(arm ? { NB_ARM: "" } : {}) };
        m.onBeforeCompile = (sh) => {
          Object.assign(sh.uniforms, U);
          sh.vertexShader =
            HEAD +
            sh.vertexShader
              .replace(
                "#include <beginnormal_vertex>",
                `vec3 nbPos; mat3 nbR; float nbS; mat3 nbA; vec3 nbM; float nbSt;
                 nbState(nbPos, nbR, nbS, nbA, nbM, nbSt);
                 vec3 nbP = nbM * position;
                 #ifdef NB_ARM
                 // telescoping: the arm root stays in the ball, the tip reaches on
                 nbP.x = sign(nbP.x) * (0.2 + (abs(nbP.x) - 0.2) * nbSt);
                 // a touch heavier than the hero model: more cover per bot
                 nbP.yz *= 1.22;
                 #endif
                 vec3 objectNormal = nbR * (nbA * (nbM * normal));
                 #ifdef USE_TANGENT
                 vec3 objectTangent = vec3(tangent.xyz);
                 #endif`,
              )
              .replace(
                "#include <begin_vertex>",
                `vec3 nbRel = nbR * (nbA * nbP) * nbS;
                 nbRel += nbVDir * dot(nbRel, nbVDir) * nbStretch;
                 vec3 transformed = nbRel + nbPos;
                 // model-space height above the bot's docking plane
                 vNbDepth = dot(nbA * nbP, vec3(0.0, 1.0, 0.0));`,
              );
          // Fake contact occlusion. A screen-space AO pass would redraw the
          // scene with its own material and miss the shader animation, so the
          // bot darkens its own underside instead: the side facing into the
          // form, where neighbours and the core block the light.
          sh.fragmentShader =
            "varying float vNbDepth;\nvarying float vLed;\n" +
            sh.fragmentShader.replace(
              "#include <opaque_fragment>",
              "outgoingLight *= mix(0.22, 1.0, smoothstep(-0.26, 0.14, vNbDepth));\n" +
                // the LED lights its own metal: when a bot latches the blue
                // washes over its body, so the chain reaction carries light
                // through the mechanism instead of the whole scene brightening
                "outgoingLight += vec3(0.2, 0.34, 1.0) * max(vLed - 2.2, 0.0) * 0.035;\n" +
                "#include <opaque_fragment>",
            );
        };
      };
      const patchGlow = (m: AnyMat) => {
        m.onBeforeCompile = (sh) => {
          Object.assign(sh.uniforms, U);
          sh.vertexShader =
            HEAD +
            sh.vertexShader.replace(
              "#include <begin_vertex>",
              `vec3 nbPos; mat3 nbR; float nbS; mat3 nbA; vec3 nbM; float nbSt;
               nbState(nbPos, nbR, nbS, nbA, nbM, nbSt);
               vec3 nbRel = nbR * (nbA * (nbM * position)) * nbS;
               nbRel += nbVDir * dot(nbRel, nbVDir) * nbStretch;
               vec3 transformed = nbRel + nbPos;`,
            );
          sh.fragmentShader =
            "varying float vLed;\n" +
            sh.fragmentShader.replace(
              "vec4 diffuseColor = vec4( diffuse, opacity );",
              "vec4 diffuseColor = vec4( diffuse * vLed, opacity );",
            );
        };
      };

      // ── materials (the LINK design from the lab) ─────────────────────────
      // Dark body, clearcoated: the black carries the reflections as sharp
      // lines. (A mid-grey "machined" substrate was tried and read as flat,
      // bright plastic on real screens.)
      const ballMat = new THREE.MeshPhysicalMaterial({
        color: 0x1b1d23, metalness: 1, roughness: 0.3, clearcoat: 0.6, clearcoatRoughness: 0.18,
      });
      const armMat = new THREE.MeshPhysicalMaterial({
        color: 0x2c3038, metalness: 0.9, roughness: 0.24, clearcoat: 0.7, clearcoatRoughness: 0.1, flatShading: true,
      });
      // satin, not mirror: at swarm scale polished tips sparkle into fireflies
      const tipMat = new THREE.MeshPhysicalMaterial({ color: 0xaeb4bf, metalness: 1, roughness: 0.4, flatShading: true });
      const ringMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0x6f95ff).multiplyScalar(4.5) });
      patchLit(ballMat, false);
      patchLit(armMat, true);
      patchLit(tipMat, true);
      patchGlow(ringMat);

      // ── geometry ────────────────────────────────────────────────────────
      const v2 = (pts: number[][]) => pts.map(([x, y]) => new THREE.Vector2(x, y));
      const lathe = (pts: number[][]) => {
        const g = new THREE.LatheGeometry(v2(pts), 6);
        g.rotateY(Math.PI / 6);
        g.rotateZ(-Math.PI / 2);
        return g;
      };
      const arm = lathe([
        [0.001, 0], [0.2, 0], [0.235, 0.05], [0.235, 0.16], [0.215, 0.19], [0.2, 0.2], [0.13, 1.02], [0.125, 1.04],
      ]);
      const tip = lathe([[0.125, 0], [0.105, 0.05], [0.06, 0.09], [0.001, 0.1]]);
      tip.translate(1.04, 0, 0);
      const armBase = mergeGeometries([arm, tip], true)!;
      // the arm root sits inside the ball: the pivot is the ball centre
      armBase.translate(0.2, 0, 0);
      // fuller ball, fewer triangles: twice the bots at the same budget
      const ballBase = new THREE.SphereGeometry(0.27, 14, 10);
      // thick enough that MSAA does not average it below the bloom threshold
      const ringBase = new THREE.TorusGeometry(0.278, 0.02, 4, 28);
      ringBase.rotateY(Math.PI / 2);

      // instance data: balls + rings share one set, arms get two per bot
      const inst = (count: number) => ({
        aFrom: new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3),
        aTo: new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3),
        aNFrom: new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3),
        aNTo: new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3),
        aStream: new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3),
        aSpine2: new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3),
        aSpine0: new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3),
        aSpine3: new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3),
        aRnd: new THREE.InstancedBufferAttribute(new Float32Array(count * 4), 4),
        aMisc: new THREE.InstancedBufferAttribute(new Float32Array(count * 4), 4),
      });
      const bodyI = inst(N);
      const armI = inst(N * 2);
      // lab geometry is always plain BufferAttributes
      type Attr = InstanceType<typeof THREE.BufferAttribute>;
      const instanced = (base: InstanceType<typeof THREE.BufferGeometry>, I: ReturnType<typeof inst>, count: number) => {
        const g = new THREE.InstancedBufferGeometry();
        g.index = base.index;
        g.setAttribute("position", base.attributes.position as Attr);
        g.setAttribute("normal", base.attributes.normal as Attr);
        for (const gr of base.groups) g.addGroup(gr.start, gr.count, gr.materialIndex);
        for (const [k, a] of Object.entries(I)) g.setAttribute(k, a);
        g.instanceCount = count;
        return g;
      };
      const ballGeo = instanced(ballBase, bodyI, N);
      const ringGeo = instanced(ringBase, bodyI, N);
      const armGeo = instanced(armBase, armI, N * 2);
      const armFrom = new THREE.InstancedBufferAttribute(new Float32Array(N * 6), 3);
      const armTo = new THREE.InstancedBufferAttribute(new Float32Array(N * 6), 3);
      armGeo.setAttribute("aArmFrom", armFrom);
      armGeo.setAttribute("aArmTo", armTo);

      const rig = new THREE.Group();
      scene.add(rig);
      for (const m of [
        new THREE.Mesh(ballGeo, ballMat),
        new THREE.Mesh(ringGeo, ringMat),
        new THREE.Mesh(armGeo, [armMat, tipMat]),
      ]) {
        m.frustumCulled = false;
        rig.add(m);
      }

      // fixed per-bot randomness
      let seed = 1234567;
      const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
      const rndArr = new Float32Array(N * 4);
      for (let i = 0; i < N * 4; i++) rndArr[i] = rnd();

      // the loose cloud the first form is pulled out of
      const cloud = (() => {
        const pos = new Float32Array(N * 3);
        const nrm = new Float32Array(N * 3);
        const dir = new Float32Array(N * 3);
        for (let i = 0; i < N; i++) {
          const th = rnd() * Math.PI * 2;
          const ph = Math.acos(rnd() * 2 - 1);
          const r = 5 + rnd() * 4;
          pos.set([Math.sin(ph) * Math.cos(th) * r, Math.cos(ph) * r * 0.55, Math.sin(ph) * Math.sin(th) * r - 2], i * 3);
          nrm.set([rnd() - 0.5, rnd() - 0.5, rnd() - 0.5], i * 3);
          dir.set([rnd() - 0.5, rnd() - 0.5, rnd() - 0.5], i * 3);
        }
        return { pos, nrm, dir, reach: null as Float32Array | null, spacing: spots[0].spacing * 0.8 };
      })();

      // yaw / pitch / stretch that put an arm tip on the neighbour's ball
      const X = new THREE.Vector3();
      const Y = new THREE.Vector3();
      const Z = new THREE.Vector3();
      const V = new THREE.Vector3();
      const armPoses = (sp: { nrm: Float32Array; dir: Float32Array; reach: Float32Array | null }, scale: number) => {
        const out = new Float32Array(N * 6);
        for (let i = 0; i < N; i++) {
          if (!sp.reach) {
            out.set([0, 0, 1, 0, 0, 1], i * 6);
            continue;
          }
          X.fromArray(sp.dir, i * 3);
          Y.fromArray(sp.nrm, i * 3);
          Z.crossVectors(X, Y);
          for (let a = 0; a < 2; a++) {
            V.fromArray(sp.reach, i * 6 + a * 3);
            const lx = V.dot(X);
            const ly = V.dot(Y);
            const lz = V.dot(Z);
            const h = Math.hypot(lx, lz) || 1e-6;
            // right arm rests on +X, left on -X (see the shader's mirror)
            const yaw = a === 0 ? Math.atan2(-lz, lx) : Math.atan2(lz, -lx);
            const pitch = Math.atan2(ly, h);
            // tip = root 0.2 + 1.14 * stretch; stop at the neighbour's ball
            const L = V.length() / scale;
            const stretch = Math.min(1.8, Math.max(0.5, (L - 0.24 - 0.2) / 1.14));
            out.set([yaw, pitch, stretch], i * 6 + a * 3);
          }
        }
        return out;
      };

      // Crystal growth: a form builds outward from one seed spot, hop by hop
      // along the arm links, so the front crawls over the surface like
      // something growing rather than a scan line. Cached per form + axis.
      const growthCache = new Map<string, Float32Array>();
      const growth = (sp: ShapeSpots, axis: number) => {
        const key = `${sp.name}:${axis}`;
        const hit = growthCache.get(key);
        if (hit) return hit;
        const other = axis === 1 ? 0 : 1;
        let seed = 0;
        let best = Infinity;
        for (let i = 0; i < N; i++) {
          const v = sp.pos[i * 3 + axis] + Math.abs(sp.pos[i * 3 + other]) * 0.25;
          if (v < best) {
            best = v;
            seed = i;
          }
        }
        const adj: number[][] = Array.from({ length: N }, () => []);
        for (let i = 0; i < N; i++) {
          for (let a = 0; a < 2; a++) {
            const j = sp.nbr[i * 2 + a];
            if (j < 0) continue;
            adj[i].push(j);
            adj[j].push(i);
          }
        }
        const hop = new Int32Array(N).fill(-1);
        const queue = new Int32Array(N);
        let qh = 0;
        let qt = 0;
        hop[seed] = 0;
        queue[qt++] = seed;
        while (qh < qt) {
          const i = queue[qh++];
          for (const j of adj[i]) {
            if (hop[j] >= 0) continue;
            hop[j] = hop[i] + 1;
            queue[qt++] = j;
          }
        }
        let maxHop = 1;
        for (let i = 0; i < N; i++) maxHop = Math.max(maxHop, hop[i]);
        let lo = Infinity;
        let hi = -Infinity;
        for (let i = 0; i < N; i++) {
          lo = Math.min(lo, sp.pos[i * 3 + axis]);
          hi = Math.max(hi, sp.pos[i * 3 + axis]);
        }
        const order = new Float32Array(N);
        for (let i = 0; i < N; i++) {
          // islands the links never reach fall back to their height
          order[i] = hop[i] >= 0 ? hop[i] / maxHop : (sp.pos[i * 3 + axis] - lo) / (hi - lo || 1);
        }
        growthCache.set(key, order);
        return order;
      };

      // fewer, fuller streams: more air between the cables
      const STREAM = 60;
      // link direction as an angle about the normal (matches nbDir in GLSL)
      const angOf = (sp: { nrm: Float32Array; dir: Float32Array }, i: number) => {
        const nx = sp.nrm[i * 3];
        const ny = sp.nrm[i * 3 + 1];
        const nz = sp.nrm[i * 3 + 2];
        const nl = Math.hypot(nx, ny, nz) || 1;
        const n0 = nx / nl;
        const n1 = ny / nl;
        const n2 = nz / nl;
        const up = Math.abs(n1) < 0.95 ? [0, 1, 0] : [1, 0, 0];
        // x0 = normalize(up × n), b0 = n × x0
        let x0 = [up[1] * n2 - up[2] * n1, up[2] * n0 - up[0] * n2, up[0] * n1 - up[1] * n0];
        const xl = Math.hypot(x0[0], x0[1], x0[2]) || 1;
        x0 = x0.map((v) => v / xl);
        const b0 = [n1 * x0[2] - n2 * x0[1], n2 * x0[0] - n0 * x0[2], n0 * x0[1] - n1 * x0[0]];
        const d = [sp.dir[i * 3], sp.dir[i * 3 + 1], sp.dir[i * 3 + 2]];
        return Math.atan2(d[0] * b0[0] + d[1] * b0[1] + d[2] * b0[2], d[0] * x0[0] + d[1] * x0[1] + d[2] * x0[2]);
      };
      // per-bot launch delay and the form of the current transition, for
      // the close-up that opens each scroll transition
      const lastDelay = new Float32Array(N);
      let lastFrom: { pos: Float32Array; nrm: Float32Array; dir: Float32Array; reach: Float32Array | null } = cloud;
      let lastFromScale = 1;
      const set = (from: number, to: number, peel: "y" | "x" = "y", mode: "flight" | "implode" = "flight") => {
        U.uImplode.value = mode === "implode" ? 1 : 0;
        // the process gear keeps turning once it is built
        U.uSpinTo.value = spots[to].name === "gear" ? 1 : 0;
        U.uSpinFrom.value = from >= 0 && spots[from].name === "gear" ? 1 : 0;
        // the intro sheet folds into its form; everything else flies
        U.uFold.value = from === -2 ? 1 : 0;
        const A = from === -2 ? sheet : from < 0 ? cloud : spots[from];
        const B = spots[to];
        // peel axis: forms build bottom-up; scroll transitions peel sideways,
        // in the direction the camera swings
        const ax = peel === "x" ? 0 : 1;
        let lo = Infinity;
        let hi = -Infinity;
        for (let i = 0; i < N; i++) {
          lo = Math.min(lo, A.pos[i * 3 + ax], B.pos[i * 3 + ax]);
          hi = Math.max(hi, A.pos[i * 3 + ax], B.pos[i * 3 + ax]);
        }
        const streamBend: number[][] = [];
        const streamLag: number[] = [];
        let s2 = 97 + to * 13;
        const r2 = () => ((s2 = (s2 * 16807) % 2147483647) / 2147483647);
        // organised, not random: streams wind round one shared axis in a
        // three-turn helix, so the swarm reads as a choreographed ribbon
        const nStreams = Math.ceil(N / STREAM) + 1;
        for (let k = 0; k < nStreams; k++) {
          const u = k / nStreams;
          const th = u * Math.PI * 2 * 3 + r2() * 0.4;
          const r = 1.25 + r2() * 0.35;
          streamBend.push([Math.cos(th) * r, (u - 0.5) * 1.3, Math.sin(th) * r]);
          streamLag.push(r2());
        }
        const order = "nbr" in B ? growth(B, ax) : null;
        // stream spines: each stream's centroid on the old and the new form,
        // lifted off the surface and wound onto the shared helix
        const spine1: number[][] = [];
        const spine2: number[][] = [];
        const spine0: number[][] = [];
        const spine3: number[][] = [];
        for (let k = 0; k < nStreams; k++) {
          const i0 = k * STREAM;
          const i1 = Math.min(N, i0 + STREAM);
          if (i0 >= N) {
            spine1.push([0, 0, 0]);
            spine2.push([0, 0, 0]);
            spine0.push([0, 0, 0]);
            spine3.push([0, 0, 0]);
            continue;
          }
          const cA = [0, 0, 0];
          const cB = [0, 0, 0];
          const nA = [0, 0, 0];
          const nB = [0, 0, 0];
          for (let i = i0; i < i1; i++) {
            for (let c = 0; c < 3; c++) {
              cA[c] += A.pos[i * 3 + c];
              cB[c] += B.pos[i * 3 + c];
              nA[c] += A.nrm[i * 3 + c];
              nB[c] += B.nrm[i * 3 + c];
            }
          }
          const n = i1 - i0;
          const la = Math.hypot(nA[0], nA[1], nA[2]) || 1;
          const lb = Math.hypot(nB[0], nB[1], nB[2]) || 1;
          const h = streamBend[k];
          // the second control point is the helix offset turned 1.6 rad on
          const c16 = Math.cos(1.6);
          const s16 = Math.sin(1.6);
          const h2 = [h[0] * c16 + h[2] * s16, h[1], -h[0] * s16 + h[2] * c16];
          const lift = 0.9;
          spine1.push([0, 1, 2].map((c) => (cA[c] / n) * 0.65 + (nA[c] / la) * lift + h[c]));
          spine2.push([0, 1, 2].map((c) => (cB[c] / n) * 0.65 + (nB[c] / lb) * lift + h2[c]));
          spine0.push([0, 1, 2].map((c) => cA[c] / n + (nA[c] / la) * 0.25));
          spine3.push([0, 1, 2].map((c) => cB[c] / n + (nB[c] / lb) * 0.25));
        }
        const trainDelay = new Float32Array(N);
        if (order) {
          for (let k = 0; k < nStreams; k++) {
            const i0 = k * STREAM;
            const i1 = Math.min(N, i0 + STREAM);
            if (i0 >= N) break;
            const idx: number[] = [];
            for (let i = i0; i < i1; i++) idx.push(i);
            idx.sort((u, v) => order[u] - order[v]);
            const startH = order[idx[0]];
            idx.forEach((i, r) => {
              trainDelay[i] = Math.min(1, startH * 0.62 + (r / idx.length) * 0.28 + rndArr[i * 4 + 1] * 0.01);
            });
          }
        }
        const fill = (I: ReturnType<typeof inst>, copies: number) => {
          const w = (key: keyof ReturnType<typeof inst>) => I[key].array as Float32Array;
          for (let i = 0; i < N; i++) {
            const st = Math.floor(i / STREAM);
            const h = order ? order[i] : ((peel === "x" ? A : B).pos[i * 3 + ax] - lo) / (hi - lo || 1);
            const delay =
              from === -2
                ? // fold: the whole sheet moves as one, the rim a touch behind
                  Math.min(0.35, Math.hypot(A.pos[i * 3], A.pos[i * 3 + 1]) * 0.1 + rndArr[i * 4 + 1] * 0.03)
                : mode === "implode"
                  ? rndArr[i * 4 + 1] * 0.12
                  : order
                    ? trainDelay[i]
                    : Math.min(1, Math.max(0, h * 0.72 + streamLag[st] * 0.06 + rndArr[i * 4 + 1] * 0.03));
            if (copies === 1) lastDelay[i] = delay;
            const angA = angOf(A, i);
            const angB = angOf(B, i);
            for (let c = 0; c < copies; c++) {
              const j = i * copies + c;
              for (let k = 0; k < 3; k++) {
                w("aFrom")[j * 3 + k] = A.pos[i * 3 + k];
                w("aTo")[j * 3 + k] = B.pos[i * 3 + k];
                w("aNFrom")[j * 3 + k] = A.nrm[i * 3 + k];
                w("aNTo")[j * 3 + k] = B.nrm[i * 3 + k];
                w("aStream")[j * 3 + k] = spine1[st][k];
                w("aSpine2")[j * 3 + k] = spine2[st][k];
                w("aSpine0")[j * 3 + k] = spine0[st][k];
                w("aSpine3")[j * 3 + k] = spine3[st][k];
              }
              for (let k = 0; k < 4; k++) w("aRnd")[j * 4 + k] = rndArr[i * 4 + k];
              const misc = w("aMisc");
              misc[j * 4] = delay;
              misc[j * 4 + 1] = copies === 2 ? (c === 0 ? 1 : -1) : 0;
              misc[j * 4 + 2] = angA;
              misc[j * 4 + 3] = angB;
            }
          }
          for (const a of Object.values(I)) a.needsUpdate = true;
        };
        fill(bodyI, 1);
        fill(armI, 2);
        const fromScale = from === -2 ? scaleOf(sheet) : from < 0 ? scaleOf(spots[0]) * 0.8 : scaleOf(spots[from]);
        (armFrom.array as Float32Array).set(armPoses(A, fromScale));
        (armTo.array as Float32Array).set(armPoses(B, scaleOf(B)));
        armFrom.needsUpdate = true;
        armTo.needsUpdate = true;
        U.uScaleFrom.value = fromScale;
        U.uScale.value = scaleOf(B);
        lastFrom = A;
        lastFromScale = fromScale;
      };

      // ── intro ───────────────────────────────────────────────────────────
      // The hero: the spot nearest the sheet's centre. While the camera is
      // on it, a detailed LINK model stands in for its low-poly instance.
      let heroId = 0;
      {
        let best = Infinity;
        for (let i = 0; i < N; i++) {
          const d = Math.hypot(sheet.pos[i * 3], sheet.pos[i * 3 + 1]);
          if (d < best) {
            best = d;
            heroId = i;
          }
        }
      }
      const heroPos = new THREE.Vector3().fromArray(sheet.pos, heroId * 3);
      const heroN = new THREE.Vector3().fromArray(sheet.nrm, heroId * 3);
      const heroX = new THREE.Vector3().fromArray(sheet.dir, heroId * 3);
      const heroZ = new THREE.Vector3().crossVectors(heroX, heroN);
      const heroScale = scaleOf(sheet);
      const heroPose = armPoses(sheet, heroScale).slice(heroId * 6, heroId * 6 + 6);
      U.uHeroPos.value.copy(heroPos);
      U.uHeroId.value = heroId;

      const hero = new THREE.Group();
      {
        // the close-up bot carries the machining: brushed along the arm and
        // around the ball, so highlights stretch in a manufacturing direction
        const heroBall = new THREE.MeshPhysicalMaterial({
          color: 0x1b1d23, metalness: 1, roughness: 0.3, clearcoat: 0.6, clearcoatRoughness: 0.18,
        });
        const heroArm = new THREE.MeshPhysicalMaterial({
          color: 0x2c3038, metalness: 0.9, roughness: 0.24, clearcoat: 0.7, clearcoatRoughness: 0.1, flatShading: true,
        });
        const heroTip = new THREE.MeshPhysicalMaterial({ color: 0xaeb4bf, metalness: 1, roughness: 0.4, flatShading: true });
        const groove = new THREE.MeshPhysicalMaterial({ color: 0x33363d, metalness: 1, roughness: 0.34 });
        const slot = new THREE.MeshPhysicalMaterial({ color: 0x07080b, metalness: 0.1, roughness: 0.22, clearcoat: 1 });
        hero.add(new THREE.Mesh(new THREE.SphereGeometry(0.27, 64, 32), heroBall));
        for (const x of [-0.08, 0.08]) {
          const g = new THREE.Mesh(new THREE.TorusGeometry(0.262, 0.011, 10, 96), groove);
          g.rotation.y = Math.PI / 2;
          g.position.x = x;
          hero.add(g);
        }
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.276, 0.012, 10, 128), new THREE.MeshBasicMaterial());
        ring.rotation.y = Math.PI / 2;
        ring.name = "ring";
        hero.add(ring);
        for (const side of [1, -1]) {
          const pivot = new THREE.Group();
          pivot.rotation.order = "YZX";
          pivot.name = side > 0 ? "armR" : "armL";
          const mirror = new THREE.Group();
          if (side < 0) mirror.rotation.y = Math.PI;
          const stretch = new THREE.Group();
          stretch.name = "stretch";
          const armMesh = new THREE.Mesh(armBase, [heroArm, heroTip]);
          stretch.add(armMesh);
          for (const [y, z] of [[0.2, 0.06], [0.2, -0.06], [0.06, 0.21]]) {
            const cut = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.02, 0.035), slot);
            cut.position.set(0.5, y, z);
            stretch.add(cut);
          }
          mirror.add(stretch);
          pivot.add(mirror);
          hero.add(pivot);
        }
        hero.matrixAutoUpdate = false;
        rig.add(hero);
      }
      const heroBasis = new THREE.Matrix4().makeBasis(heroX, heroN, heroZ);
      const setHero = (armK: number, led: number) => {
        hero.matrix
          .copy(heroBasis)
          .scale(new THREE.Vector3(heroScale, heroScale, heroScale))
          .setPosition(heroPos);
        for (const o of hero.children) {
          if (o.name === "ring") {
            ((o as InstanceType<typeof THREE.Mesh>).material as InstanceType<typeof THREE.MeshBasicMaterial>).color
              .setHex(0x6f95ff)
              .multiplyScalar(4.5 * led);
          }
          if (o.name !== "armR" && o.name !== "armL") continue;
          const a = o.name === "armR" ? 0 : 3;
          const sideSign = o.name === "armR" ? 1 : -1;
          // same pose maths as the instanced arms, folded → reaching
          const yaw = THREE.MathUtils.lerp(0, heroPose[a], armK);
          const pitch = THREE.MathUtils.lerp(-1.25, heroPose[a + 1], armK);
          const st = THREE.MathUtils.lerp(0.42, heroPose[a + 2], armK);
          o.rotation.set(0, yaw, pitch * sideSign);
          const sg = o.children[0].children[0];
          sg.scale.set(st, 1.22, 1.22);
          sg.position.x = 0.2 * (1 - st);
        }
      };

      // intro timeline (seconds)
      // One dominant event per beat: recognition (0–0.55), the first
      // connection (0.55–1.3), its consequence running into depth (1.3–2.15),
      // scale (2.15–3.25), identity — the A readable by ~4.1 s — and a held
      // poster frame; the camera is still by ~5.2 s.
      const T = {
        heroUnfold: 0.6,
        linkStart: 1.3,
        pullStart: 1.35,
        pullLen: 3.8,
        foldStart: 3.25,
        foldLen: 1.5,
        title: 4.4,
      };
      const INTRO_END = 5.9;
      U.uLinkT0.value = T.linkStart;
      // desktop: the A stands right of the headline; phone: above it
      const wideTarget = mobile ? new THREE.Vector3(0, -1.5, 0) : new THREE.Vector3(-1.35, 0.1, 0);
      const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
      const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
      const camDirMacro = new THREE.Vector3()
        .addScaledVector(heroN, 1)
        .addScaledVector(heroX, 0.28)
        .addScaledVector(heroZ, -0.36)
        .normalize();
      const camDirWide = new THREE.Vector3(0, 0.04, 1).normalize();
      const tgt = new THREE.Vector3();
      const cdir = new THREE.Vector3();
      const WIDE = mobile ? 10 : 7.2;
      // returns the build progress p for the swarm at intro time t
      const introFrame = (t: number) => {
        U.uIntro.value = t;
        // lights come up from black as the chain reaction spreads
        scene.environmentIntensity = 0.12 + (ENV_I - 0.12) * ease(clamp01((t - 0.3) / 0.9));
        // the void fills with stars as the camera pulls back off the macro
        starMat.uniforms.uFade.value = ease(clamp01((t - 1.2) / 2.2));
        starMat.uniforms.uTime.value = t;

        // hero: heartbeat, unfold, link flash
        const beat = Math.max(Math.exp(-Math.pow((t - 0.2) / 0.06, 2)), Math.exp(-Math.pow((t - 0.44) / 0.06, 2)));
        // the hero's latch: open to 70%, hold, snap with a small overshoot
        const h0 = T.heroUnfold;
        const unfold =
          0.72 * ease(clamp01((t - h0) / 0.3)) +
          0.28 * clamp01((t - h0 - 0.42) / 0.05) +
          0.08 * Math.exp(-Math.pow((t - h0 - 0.49) / 0.05, 2));
        const flash = t > h0 + 0.46 ? Math.exp(-(t - h0 - 0.46) * 4) * 2.5 : 0;
        setHero(unfold, Math.max(beat * 1.2, 0.15 + unfold * 0.5 + flash));
        // detailed hero while close; its instance takes over once we're far
        const heroDetail = t < T.pullStart + 1.3;
        hero.visible = heroDetail;
        U.uHeroShow.value = heroDetail ? 0 : 1;

        // Camera. Macro: a slow push-in with a small orbit, like a watch ad.
        // Pull-back: a crane move — slow lift-off, a sideways arc that
        // settles, FOV opening the space a beat before the dolly.
        // framed for the 38° macro lens below
        const macroD = heroScale * 3.4;
        const push = ease(clamp01(t / T.pullStart));
        const x = clamp01((t - T.pullStart) / T.pullLen);
        const pull = ease(x);
        const d = THREE.MathUtils.lerp(macroD * (1 - 0.12 * push), WIDE, pull);
        cdir
          .copy(camDirMacro)
          .applyAxisAngle(heroN, 0.2 * push)
          .lerp(camDirWide, pull)
          .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.sin(pull * Math.PI) * 0.38)
          .normalize();
        tgt.copy(heroPos).lerp(wideTarget, pull);
        camera.position.copy(tgt).addScaledVector(cdir, d);
        // crane: rise through the middle of the move
        camera.position.y += Math.sin(pull * Math.PI) * d * 0.16;
        // hand-held breath, only while close
        camera.position.x += Math.sin(t * 1.1) * macroD * 0.025 * (1 - pull);
        camera.position.y += Math.sin(t * 0.8 + 1) * macroD * 0.025 * (1 - pull);
        // lens and dolly are separate decisions: the macro holds 38°, eases to
        // 34° as the light front runs into depth, settles on 30° before the
        // fold — the dolly back, not the lens, reveals the space
        camera.fov =
          t < 1.3
            ? 38
            : t < 2.15
              ? THREE.MathUtils.lerp(38, 34, ease((t - 1.3) / 0.85))
              : THREE.MathUtils.lerp(34, 30, ease(clamp01((t - 2.15) / 1.1)));
        camera.near = Math.max(0.004, Math.min(0.1, d * 0.03));
        camera.updateProjectionMatrix();
        camera.lookAt(tgt);

        // the sky comes up behind the first connection, before the pull-back
        if (landing) updateSky(t, ease(clamp01((t - 0.6) / 2.0)));
        // title lands as the A locks
        if (titleRef.current) titleRef.current.style.opacity = String(clamp01((t - T.title) / 0.7));
        return clamp01((t - T.foldStart) / T.foldLen) * 1.3;
      };
      const endIntro = () => {
        U.uIntro.value = 1e4;
        U.uHeroShow.value = 1;
        hero.visible = false;
        scene.environmentIntensity = ENV_I;
        starMat.uniforms.uFade.value = 1;
        camera.fov = 30;
        camera.near = 0.1;
        camera.position.copy(wideTarget).addScaledVector(camDirWide, WIDE);
        camera.updateProjectionMatrix();
        camera.lookAt(wideTarget);
        if (titleRef.current) titleRef.current.style.opacity = "1";
      };
      if (!intro) {
        endIntro();
        wideTarget.set(0, 0, 0);
        camera.position.set(0, 0.3, WIDE);
        camera.lookAt(0, 0, 0);
        if (titleRef.current) titleRef.current.style.opacity = "0";
      }

      // ── post: bloom on the LEDs, AgX, vignette, SMAA — no depth of field ──
      // real MSAA: thousands of thin facets alias into grain; SMAA alone can't fix it
      const composer = new PP.EffectComposer(renderer, {
        frameBufferType: THREE.HalfFloatType,
        multisampling: Math.min(renderer.capabilities.maxSamples, mobile ? 2 : 4),
      });
      composer.addPass(new PP.RenderPass(scene, camera));
      composer.addPass(
        new PP.EffectPass(
          camera,
          new PP.BloomEffect({ intensity: 1.1, luminanceThreshold: 0.9, luminanceSmoothing: 0.25, mipmapBlur: true }),
          new PP.ToneMappingEffect({ mode: PP.ToneMappingMode.AGX }),
          new PP.VignetteEffect({ darkness: 0.55, offset: 0.3 }),
        ),
      );
      composer.addPass(new PP.EffectPass(camera, new PP.SMAAEffect({ preset: PP.SMAAPreset.HIGH })));
      composer.setSize(canvas.clientWidth, canvas.clientHeight);

      // ── pointer: hover lifts the lattice, a tap sends a ripple across it ──
      const ray = new THREE.Raycaster();
      const ndc = new THREE.Vector2();
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const hit = new THREE.Vector3();
      let hoverTarget = 0;
      let ripSlot = 0;
      let clock = 0;
      const aim = (x: number, y: number) => {
        const r = canvas.getBoundingClientRect();
        ndc.set(((x - r.left) / r.width) * 2 - 1, -((y - r.top) / r.height) * 2 + 1);
        ray.setFromCamera(ndc, camera);
        if (ray.ray.intersectPlane(plane, hit)) U.uHover.value.copy(hit);
      };
      const onMove = (e: PointerEvent) => {
        aim(e.clientX, e.clientY);
        hoverTarget = 1;
      };
      const onDown = (e: PointerEvent) => {
        aim(e.clientX, e.clientY);
        hoverTarget = 1;
        const r = U.uRip.value[ripSlot];
        r.set(U.uHover.value.x, U.uHover.value.y, 0, clock);
        ripSlot = (ripSlot + 1) % 3;
      };
      const onLeave = () => (hoverTarget = 0);
      // on the landing the canvas sits under the page copy, so it never gets
      // pointer events itself; listen on the document instead
      const pointerTarget: HTMLElement = landing ? document.documentElement : canvas;
      const onUp = (e: PointerEvent) => {
        // a finger lifting off should not leave the field hanging
        if (e.pointerType !== "mouse") hoverTarget = 0;
      };
      pointerTarget.addEventListener("pointerdown", onDown);
      pointerTarget.addEventListener("pointermove", onMove);
      pointerTarget.addEventListener("pointerleave", onLeave);
      pointerTarget.addEventListener("pointerup", onUp);

      // ── landing: turntable + grab to spin (same feel as SceneV4) ──────────
      // The form turns on its own; a drag adds spin with momentum and tilts
      // it. Drags that start on a link, button or field are left to the page.
      let spinAngle = 0;
      let spinVel = 0;
      let pitch = 0;
      let pitchTarget = 0;
      let dragging = false;
      let dragLastX = 0;
      let dragLastY = 0;
      let grabbedOnce = false;
      // pointer position in -1..1, for a touch of camera parallax
      let mx = 0;
      let my = 0;
      let mxS = 0;
      let myS = 0;
      const INTERACTIVE = "a,button,input,textarea,select,label,[role='button'],[contenteditable]";
      const grab = (dx: number, dy: number, k: number, kp: number) => {
        if (Math.abs(dx) + Math.abs(dy) > 2 && !grabbedOnce) {
          grabbedOnce = true;
          window.dispatchEvent(new CustomEvent("v4:grabbed"));
        }
        spinAngle += dx * k;
        spinVel = spinVel * 0.6 + dx * k * 24;
        pitchTarget = Math.max(-0.45, Math.min(0.45, pitchTarget + dy * kp));
      };
      const onGrabStart = (e: PointerEvent) => {
        if (e.pointerType !== "mouse" || e.button !== 0) return;
        const el = e.target as HTMLElement | null;
        if (el?.closest?.(INTERACTIVE)) return;
        dragging = true;
        dragLastX = e.clientX;
        dragLastY = e.clientY;
      };
      const onGrabMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        mx = (e.clientX / window.innerWidth - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
        if (!dragging) return;
        const dx = e.clientX - dragLastX;
        const dy = e.clientY - dragLastY;
        dragLastX = e.clientX;
        dragLastY = e.clientY;
        grab(dx, dy, 0.0075, 0.003);
        document.documentElement.classList.add("v4-dragging");
      };
      const onGrabEnd = () => {
        dragging = false;
        document.documentElement.classList.remove("v4-dragging");
      };
      // Touch: pointer events get cancelled the moment the page starts to
      // scroll, touch events keep coming — every swipe also turns the form
      let touchX: number | null = null;
      let touchY: number | null = null;
      const onTouchStart = (e: TouchEvent) => {
        const t = e.touches[0];
        if (!t) return;
        touchX = t.clientX;
        touchY = t.clientY;
        dragging = true;
      };
      const onTouchMove = (e: TouchEvent) => {
        const t = e.touches[0];
        if (!t || touchX === null || touchY === null) return;
        grab(t.clientX - touchX, t.clientY - touchY, 0.006, 0.0012);
        touchX = t.clientX;
        touchY = t.clientY;
      };
      const onTouchEnd = () => {
        touchX = null;
        touchY = null;
        dragging = false;
      };
      if (landing) {
        window.addEventListener("pointerdown", onGrabStart, { passive: true });
        window.addEventListener("pointermove", onGrabMove, { passive: true });
        window.addEventListener("pointerup", onGrabEnd, { passive: true });
        window.addEventListener("pointercancel", onGrabEnd, { passive: true });
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: true });
        window.addEventListener("touchend", onTouchEnd, { passive: true });
        window.addEventListener("touchcancel", onTouchEnd, { passive: true });
      }
      // almost still: a settled machine should read as precise, not as a
      // turntable; the drag is where the rotation lives
      let swayT = 0;
      const stepSpin = (dt: number) => {
        swayT += dt;
        if (!dragging) {
          // momentum from a drag, then a soft pull back to face the camera
          spinAngle += spinVel * dt;
          spinVel *= Math.exp(-dt * 1.6);
          spinAngle *= Math.exp(-dt * 0.45);
          pitchTarget *= Math.exp(-dt * 0.7);
        }
        pitch += (pitchTarget - pitch) * (1 - Math.exp(-dt * 5));
        mxS += (mx - mxS) * (1 - Math.exp(-dt * 2.5));
        myS += (my - myS) * (1 - Math.exp(-dt * 2.5));
      };

      // idle life: every few seconds a pulse runs through the lattice from a
      // random bot, so the formed shape is never a still
      const pulseV = new THREE.Vector3();
      let nextPulse = 6;
      let shownShape = spots.length - 1;
      const autoPulse = (tsec: number) => {
        if (tsec < nextPulse) return;
        // sparse: a long rest, one route lights up, a long rest
        nextPulse = tsec + 10 + Math.random() * 4;
        const sp = spots[shownShape];
        const i = Math.floor(Math.random() * N);
        pulseV.fromArray(sp.pos, i * 3).applyMatrix4(rig.matrixWorld);
        U.uRip.value[ripSlot].set(pulseV.x, pulseV.y, 0, clock);
        ripSlot = (ripSlot + 1) % 3;
      };

      const onResize = () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
        composer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      // ── adaptive quality ────────────────────────────────────────────────
      // Frame time is judged over 2 s windows. Two slow windows in a row drop
      // one step (MSAA first, then resolution); a step comes back only after
      // 12 s of clearly fast frames, so quality never oscillates.
      const maxMS = Math.min(renderer.capabilities.maxSamples, mobile ? 2 : 4);
      const qSteps = [
        { pr: basePR, ms: maxMS },
        { pr: basePR, ms: Math.min(maxMS, mobile ? 0 : 2) },
        { pr: Math.max(0.85, basePR - 0.25), ms: 0 },
        { pr: Math.max(0.75, basePR - 0.5), ms: 0 },
      ];
      let qLevel = 0;
      let winT = 0;
      let winN = 0;
      let slowWins = 0;
      let lastUnrest = performance.now();
      const adapt = (dt: number, now: number) => {
        winT += dt;
        winN++;
        if (winT < 2) return;
        const avg = winT / winN;
        winT = 0;
        winN = 0;
        if (avg > 1 / 42) {
          slowWins++;
          lastUnrest = now;
          if (slowWins < 2 || qLevel === qSteps.length - 1) return;
          qLevel++;
          slowWins = 0;
        } else {
          slowWins = 0;
          if (!(avg < 1 / 57 && qLevel > 0 && now - lastUnrest > 12000)) return;
          qLevel--;
          lastUnrest = now;
        }
        renderer.setPixelRatio(qSteps[qLevel].pr);
        composer.multisampling = qSteps[qLevel].ms;
        onResize();
      };

      // the GPU may drop the context (backgrounded tab, driver reset): fall
      // back to the static void instead of leaving a dead canvas
      const onLost = (e: Event) => {
        e.preventDefault();
        setStaticFallback(true);
      };
      canvas.addEventListener("webglcontextlost", onLost);

      const render: Api["render"] = (p, t, opts = {}) => {
        U.uP.value = p;
        U.uTime.value = t;

        clock = t;
        rig.rotation.y = opts.rot ?? -0.35;
        if (opts.push !== undefined) {
          // stills: push = hover strength; ripple = seconds since a tap
          aim(opts.px ?? canvas.clientWidth / 2, opts.py ?? canvas.clientHeight / 2);
          U.uHoverAmt.value = opts.push;
          if (opts.ripple !== undefined) U.uRip.value[0].set(U.uHover.value.x, U.uHover.value.y, 0, t - opts.ripple);
        }
        composer.render();
      };

      window.__swarm = {
        names: spots.map((s) => s.name),
        intro: (t) => {
          set(-2, spots.length - 1);
          rig.rotation.y = 0;
          U.uP.value = introFrame(t);
          U.uTime.value = t;
          composer.render();
        },
        set,
        render,
        shot: (name, dir) =>
          fetch("/api/dev/lab-shot", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ name, dir, dataUrl: canvas.toDataURL("image/png") }),
          }).then((r) => r.json()),
      };

      setShapes(spots.map((s) => ({ name: s.name, label: s.label })));
      setCount(N);

      // live: build (3.4s), hold, move on — or jump on demand
      const BUILD = 3.4;
      const HOLD = 4.2;
      // on the landing page the intro chain reaction waits for the
      // preloader curtain to lift (v4:ready), so it never plays underneath it
      const runIntroNow = intro && !landing;
      let cur = intro ? -2 : -1;
      let next = intro ? spots.length - 1 : 0;
      set(cur, next);
      setCurrent(next);
      const start = performance.now();
      let segStart = start;
      let last = start;
      let rot = -0.35;
      let introStart = runIntroNow ? start : -1;
      let introClock = 0;
      let rush = 0;
      const onRush = () => (rush = 1);
      window.addEventListener("wheel", onRush, { passive: true });
      window.addEventListener("touchmove", onRush, { passive: true });
      window.addEventListener("keydown", onRush);
      let spinIn = runIntroNow ? 0 : 1;
      const onSceneReady = () => {
        if (disposed) return;
        // scroll may have parked a form while the curtain was down: restart
        // from the sheet, and let the story re-pick its transition afterwards
        set(-2, spots.length - 1);
        activeSet = "";
        introStart = performance.now();
        introClock = 0;
        spinIn = 0;
      };
      if (landing && intro) window.addEventListener("v4:ready", onSceneReady, { once: true });

      // ── scroll story ─────────────────────────────────────────────────────
      // Scroll position is a chapter index. Each chapter holds its form while
      // its copy is read (first 30%), then a transition plays across the
      // middle half — scrubbed by scroll, so it runs backwards too. The
      // camera rides a rail of per-chapter framings through a spring, and
      // swings, lifts and pushes into the swarm mid-transition.
      // Landing: one chapter per `[data-swarm]` section of the real page, so
      // every section gets its own form and something happens on each
      // scroll. The lab keeps its fixed CHAPTERS.
      type Ch = {
        shape: string;
        side: string;
        mode: string;
        az: number;
        el: number;
        dd: number;
        quiet: boolean;
        node: HTMLElement | null;
      };
      const CH: Ch[] = landing
        ? Array.from(document.querySelectorAll<HTMLElement>("[data-swarm]")).map((node, i) => {
            const quiet = node.hasAttribute("data-swarm-quiet");
            const mode = node.dataset.swarmMode === "implode" ? "implode" : "flight";
            // alternate sides so the form answers the layout; quiet sections
            // push it to the far edge where it yields to the content
            const side = i === 0 || quiet ? "right" : i % 2 ? "left" : "right";
            return {
              shape: node.dataset.swarm ?? "monogram",
              side,
              mode,
              az: (side === "right" ? -1 : 1) * (0.16 + (i % 3) * 0.07),
              el: 0.04 + (i % 4) * 0.035,
              dd: quiet ? WIDE * 0.9 : (i % 3) * 0.18 + (mode === "implode" ? 0.2 : 0),
              quiet,
              node,
            };
          })
        : CHAPTERS.map((c) => ({ ...c, quiet: false, node: null }));
      const shapeIdx = (name: string) => {
        const i = spots.findIndex((sp) => sp.name === name);
        return i < 0 ? spots.length - 1 : i;
      };
      const chapterShape = CH.map((ch) => shapeIdx(ch.shape));
      const frame = CH.map((ch) => ({
        // wide forms (devices, globe) need less offset to stay in frame
        x: mobile
          ? 0
          : ch.quiet
            ? -2.4
            : ch.side === "right"
              ? ch.shape === "devices" || ch.shape === "globe"
                ? -0.95
                : -1.35
              : 1.45,
        y: mobile ? (ch.quiet ? -2.6 : -1.5) : 0.1,
        az: ch.az,
        el: ch.el,
        d: WIDE + ch.dd,
      }));
      const railA = new THREE.Vector3();
      const railB = new THREE.Vector3();
      const railM = new THREE.Vector3();
      const rail = new THREE.CatmullRomCurve3([railA.clone(), railM.clone(), railB.clone()], false, "centripetal");
      const goalPos = new THREE.Vector3();
      const goalLook = new THREE.Vector3();
      const ORIGIN = new THREE.Vector3();
      const UP = new THREE.Vector3(0, 1, 0);
      const camPos = new THREE.Vector3(
        frame[0].x + Math.sin(frame[0].az) * Math.cos(frame[0].el) * frame[0].d,
        frame[0].y + Math.sin(frame[0].el) * frame[0].d,
        Math.cos(frame[0].az) * Math.cos(frame[0].el) * frame[0].d,
      );
      const camLook = new THREE.Vector3(frame[0].x, frame[0].y, 0);
      const camPrev = camPos.clone();
      const camVel = new THREE.Vector3();
      const camFwd = new THREE.Vector3();
      const camRight = new THREE.Vector3();
      let camFov = 30;
      let camRoll = 0;
      let lastY = 0;
      let scrollSpeed = 0;
      const camUp = new THREE.Vector3();
      const flyPos = new THREE.Vector3();
      const flyX = new THREE.Vector3();
      const flyY = new THREE.Vector3();
      const flyZ = new THREE.Vector3();
      const flyBasis = new THREE.Matrix4();
      const rigInv = new THREE.Matrix4();
      // Fly-by: in the middle of each pass one detailed bot crosses the frame
      // close to the lens, wings swept back — the reminder, at full detail,
      // that the whole swarm is made of real machines.
      const flyBy = (u: number, sc: number, tsec: number) => {
        if (u <= 0 || u >= 1) {
          hero.visible = false;
          return;
        }
        hero.visible = true;
        const eu = landing ? u : ease(u);
        camUp.crossVectors(camRight, camFwd).normalize();
        if (landing) {
          // one readable crossing through the inner frame: ~20% of the
          // viewport tall, entering and leaving past the edges, with the far
          // ribbon still visible behind it
          const dist = 0.75;
          const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * dist;
          const halfW = halfH * camera.aspect;
          sc = (0.4 * halfH) / 1.35;
          flyPos
            .copy(camPos)
            .addScaledVector(camFwd, dist)
            .addScaledVector(camRight, THREE.MathUtils.lerp(-1.25, 1.25, eu) * halfW)
            .addScaledVector(camUp, (0.12 - 0.2 * eu) * halfH);
        } else {
          flyPos
            .copy(camPos)
            .addScaledVector(camFwd, 0.55 + 0.3 * eu)
            .addScaledVector(camRight, -0.55 + 1.1 * eu)
            .addScaledVector(camUp, 0.1 - 0.18 * eu);
        }
        // flying along +right: tail (+Z) points back, wings level, a bank
        flyZ.copy(camRight).negate();
        flyY.copy(camUp).applyAxisAngle(flyZ, Math.sin(u * Math.PI) * 0.35);
        flyX.crossVectors(flyY, flyZ).normalize();
        flyBasis.makeBasis(flyX, flyY, flyZ);
        hero.matrix.copy(flyBasis).scale(new THREE.Vector3(sc, sc, sc)).setPosition(flyPos);
        // placed in world space, but it lives inside the turning rig
        hero.matrix.premultiply(rigInv.copy(rig.matrixWorld).invert());
        for (const o of hero.children) {
          if (o.name === "ring") {
            ((o as InstanceType<typeof THREE.Mesh>).material as InstanceType<typeof THREE.MeshBasicMaterial>).color
              .setHex(0x6f95ff)
              .multiplyScalar(4.5 * 0.9);
          }
          if (o.name !== "armR" && o.name !== "armL") continue;
          const sideSign = o.name === "armR" ? 1 : -1;
          o.rotation.set(0, -0.55 * sideSign, (0.12 + Math.sin(tsec * 10) * 0.2) * sideSign);
          const sg = o.children[0].children[0];
          sg.scale.set(0.8, 1.22, 1.22);
          sg.position.x = 0.2 * (1 - 0.8);
        }
      };
      // globals.css makes <body> the scroller on some pages; read either
      // stills in the in-app browser can't scroll the page; story() pins it
      let pinnedY: number | null = null;
      const scrollTop = () =>
        pinnedY ?? (window.scrollY || document.body.scrollTop || document.documentElement.scrollTop);
      let smoothY = scrollTop();
      let activeSet = "";

      // section tops, re-measured on a throttle (pins and late images move them)
      let winA: number[] = [];
      let winB: number[] = [];
      let measuredAt = -1e9;
      // Each transition gets a long scroll window: it starts while the next
      // section is still 1.5 screens away and lands as that section settles
      // (~1.35 screens of scroll). A short window made the forms swap
      // instantly. Windows never overlap — short sections chain into one
      // continuous flight instead of jumping chapters mid-transition.
      const measure = (now: number) => {
        if (!landing || now - measuredAt < 500) return;
        measuredAt = now;
        const y = scrollTop();
        const vh = window.innerHeight;
        const tops = CH.map((c) => {
          const n = c.node!;
          const box = n.parentElement?.classList.contains("pin-spacer") ? n.parentElement : n;
          return box.getBoundingClientRect().top + y;
        });
        winA = [];
        winB = [];
        let prevEnd = -Infinity;
        for (let i = 0; i + 1 < tops.length; i++) {
          const a = Math.max(tops[i + 1] - vh * 1.5, prevEnd, 0);
          const b = Math.max(tops[i + 1] - vh * 0.15, a + vh * 0.6);
          winA.push(a);
          winB.push(b);
          prevEnd = b;
        }
      };
      const landingP = (y: number) => {
        let P = 0;
        for (let i = 0; i < winA.length; i++) P += clamp01((y - winA[i]) / (winB[i] - winA[i]));
        return P;
      };

      // Services: hovering a row re-wires the form into that service
      // (~0.7 s, time-based); the latest request always wins, no backlog
      let morphWant: number | null = null;
      let morphShown = -1;
      let morphFrom = -1;
      let morphT0 = 0;
      let leaveSeg = -1;
      let leaveFrom = -1;
      let flowKey = "";
      let flowP = 0;
      let gearHold = true;

      // ── transition close-up state ──
      let macroOn = false;
      let macroShown = false;
      let macroId = 0;
      let macroDelay = 0;
      let macroScale = 1;
      const macroPos = new THREE.Vector3();
      const macroN = new THREE.Vector3();
      const macroX = new THREE.Vector3();
      const macroLocal = new THREE.Vector3();
      const macroWorld = new THREE.Vector3();
      const macroNW = new THREE.Vector3();
      const macroDir = new THREE.Vector3();
      const macroCam = new THREE.Vector3();
      let macroPose = new Float32Array(6);
      const mTmp = new THREE.Vector3();
      const mTmpN = new THREE.Vector3();
      // the lead bot: facing the camera and launching a beat after the first
      // wave, so the camera has arrived before it crouches and its
      // neighbours are already streaming away behind it
      const pickMacro = () => {
        const A = lastFrom;
        rig.updateMatrixWorld();
        let best = Infinity;
        let id = -1;
        for (let i = 0; i < N; i += 2) {
          mTmp.fromArray(A.pos, i * 3).applyMatrix4(rig.matrixWorld);
          mTmpN.fromArray(A.nrm, i * 3).transformDirection(rig.matrixWorld);
          const toCam = macroCam.copy(camera.position).sub(mTmp).normalize();
          const facing = mTmpN.dot(toCam);
          if (facing < 0.55) continue;
          const score = Math.abs(lastDelay[i] - 0.3) - facing * 0.25 + Math.hypot(A.pos[i * 3], A.pos[i * 3 + 1]) * 0.04;
          if (score < best) {
            best = score;
            id = i;
          }
        }
        if (id < 0 || !A.reach) {
          macroOn = false;
          return;
        }
        macroId = id;
        macroDelay = lastDelay[id];
        macroScale = lastFromScale;
        macroPos.fromArray(A.pos, id * 3);
        macroN.fromArray(A.nrm, id * 3).normalize();
        macroX.fromArray(A.dir, id * 3).normalize();
        macroPose = armPoses(A, lastFromScale).slice(id * 6, id * 6 + 6);
      };
      const heroBasisM = new THREE.Matrix4();
      const heroZ2 = new THREE.Vector3();
      const heroS = new THREE.Vector3();
      // the detailed model on the lead bot: docked grip → wings as it lets go,
      // LED flaring on the kick
      const poseHero = (
        at: InstanceType<typeof THREE.Vector3>,
        n: InstanceType<typeof THREE.Vector3>,
        x: InstanceType<typeof THREE.Vector3>,
        sc: number,
        pose: Float32Array,
        rel: number,
        raw: number,
      ) => {
        heroZ2.crossVectors(x, n);
        heroBasisM.makeBasis(x, n, heroZ2);
        hero.matrix.copy(heroBasisM).scale(heroS.set(sc, sc, sc)).setPosition(at);
        hero.visible = true;
        macroShown = true;
        const kick = raw > -0.02 ? Math.exp(-(raw + 0.02) * 30) : 0;
        for (const o of hero.children) {
          if (o.name === "ring") {
            ((o as InstanceType<typeof THREE.Mesh>).material as InstanceType<typeof THREE.MeshBasicMaterial>).color
              .setHex(0x6f95ff)
              .multiplyScalar(4.5 * (0.35 + kick * 1.6));
          }
          if (o.name !== "armR" && o.name !== "armL") continue;
          const a = o.name === "armR" ? 0 : 3;
          const side = o.name === "armR" ? 1 : -1;
          const yaw = THREE.MathUtils.lerp(pose[a], -0.55 * side, rel);
          const pitch = THREE.MathUtils.lerp(pose[a + 1], 0.12, rel);
          const st = THREE.MathUtils.lerp(pose[a + 2], 0.8, rel);
          o.rotation.set(0, yaw, pitch * side);
          const sg = o.children[0].children[0];
          sg.scale.set(st, 1.22, 1.22);
          sg.position.x = 0.2 * (1 - st);
        }
      };
      const macroHide = () => {
        if (!macroShown) return;
        macroShown = false;
        hero.visible = false;
        U.uHeroShow.value = 1;
      };
      const onMorph = (e: Event) => {
        const d = (e as CustomEvent<{ swarm?: string } | null>).detail;
        morphWant = d?.swarm ? shapeIdx(d.swarm) : null;
      };
      if (landing) window.addEventListener("v4:morph", onMorph);
      const endNode = landing ? CH[CH.length - 1].node : null;
      const diveLook = new THREE.Vector3();
      let lastOpacity = "";
      const smooth01 = (a: number, b: number, v: number) => {
        const k = clamp01((v - a) / (b - a));
        return k * k * (3 - 2 * k);
      };
      const driveScroll = (now: number, dt: number) => {
        // a soft, weighty follow: the form trails the scroll like a camera
        // operator, never snapping with a flick
        const follow = landing ? 4 : 7;
        smoothY += (scrollTop() - smoothY) * (1 - Math.exp(-dt * follow));
        measure(now);
        const span = landing
          ? Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
          : window.innerHeight * (CHAPTER_VH / 100) * (CH.length - 1);
        const P = Math.min(
          Math.max(landing ? landingP(smoothY) : (smoothY / span) * (CH.length - 1), 0),
          CH.length - 1,
        );
        const seg = Math.min(Math.floor(P), CH.length - 2);
        const f = P - seg;
        // landing transitions already sit in the gaps; the lab holds 22% first
        const H = landing ? 1e-4 : 0.22;
        const tRaw = clamp01((f - H) / (landing ? 1 - 2e-4 : 0.7));
        const tt = tRaw * tRaw * tRaw * (tRaw * (tRaw * 6 - 15) + 10);
        // the chapter being held; P lands exactly on the last one at the end
        const atEnd = P >= CH.length - 1;
        const holding = f < H || atEnd;
        const holdIdx = atEnd ? CH.length - 1 : seg;
        gearHold = holding;
        // which transition the swarm is on, and how far along it is
        let key: string;
        let p: number;
        if (holding) {
          const base = chapterShape[holdIdx];
          const want = landing && morphWant !== null ? morphWant : base;
          if (morphShown < 0) morphShown = base;
          if (want !== morphShown) {
            morphFrom = morphShown;
            morphShown = want;
            morphT0 = now;
          }
          if (landing && morphFrom >= 0) {
            key = `${morphFrom}>${morphShown}:m`;
            p = Math.min(1.3, ((now - morphT0) / 700) * 1.3);
          } else {
            key = holdIdx === 0 ? `-2>${chapterShape[0]}` : `${chapterShape[holdIdx - 1]}>${chapterShape[holdIdx]}`;
            p = 1.3;
          }
        } else {
          // leaving a section: start from whatever form is actually docked,
          // latched for the whole transition so it can't pop mid-flight
          if (leaveSeg !== seg) {
            leaveSeg = seg;
            leaveFrom = morphShown >= 0 ? morphShown : chapterShape[seg];
          }
          key = `${leaveFrom}>${chapterShape[seg + 1]}:x:${CH[seg + 1].mode}`;
          p = tt * 1.3;
          morphShown = -1;
          morphFrom = -1;
        }
        if (holding) leaveSeg = -1;
        if (key !== activeSet) {
          activeSet = key;
          const [a, rest] = key.split(">");
          const [b, peelMode, flightMode] = rest.split(":");
          set(Number(a), Number(b), peelMode === "x" ? "x" : "y", flightMode === "implode" ? "implode" : "flight");
          setCurrent(Number(b));
          shownShape = Number(b);
          macroOn = landing && rest.includes(":x:") && Number(a) >= 0;
          if (macroOn) pickMacro();
        }
        // Rail: framing A → a close pass beside the swarm → framing B on a
        // centripetal Catmull-Rom, so the move has no corners. Position and
        // gaze ride separate springs — the gaze lags like an operator
        // following the action — and the camera banks into lateral motion.
        const FA = frame[seg];
        const FB = frame[Math.min(seg + 1, frame.length - 1)];
        const k = holding ? 0 : tt;
        // tempo: a fast scroll gets a wider, more direct pass; a slow one
        // is taken close, where the bots read one by one
        const yNow = scrollTop();
        const instSpeed = Math.abs(yNow - lastY) / Math.max(dt, 1e-3);
        lastY = yNow;
        scrollSpeed += (instSpeed - scrollSpeed) * (1 - Math.exp(-dt * 4));
        const tempo = clamp01(scrollSpeed / 2500);
        const place = (x: number, y: number, az: number, el: number, d: number, out: InstanceType<typeof THREE.Vector3>) =>
          out.set(x + Math.sin(az) * Math.cos(el) * d, y + Math.sin(el) * d, Math.cos(az) * Math.cos(el) * d);
        const toImplode = CH[Math.min(seg + 1, CH.length - 1)].mode === "implode" && !holding;
        let goalFov: number;
        if (landing) {
          // Holds are never a locked-off frame: a slow product-film push and a
          // few degrees of orbit across the section. The end of one hold's
          // creep is exactly where the next transition starts.
          const hi = holdIdx;
          const hStart = hi === 0 ? 0 : (winB[hi - 1] ?? 0);
          const hEnd = hi < winA.length ? winA[hi] : hStart + window.innerHeight;
          const hk = holding ? clamp01((smoothY - hStart) / Math.max(hEnd - hStart, 1)) : 1;
          const creep = (F: (typeof frame)[number], c: number) => ({
            x: F.x,
            y: F.y,
            az: F.az + 0.14 * c * (F.x < 0 ? 1 : -1),
            el: F.el + 0.03 * c,
            d: F.d * (1 - 0.08 * c),
          });
          const A0 = holding ? creep(frame[hi], hk) : creep(FA, 1);
          const B0 = holding ? A0 : creep(FB, 0);
          // Transition as one directed shot: anticipation push (while the
          // bots crouch), then the camera rides WITH the vortex — orbiting
          // the same way, dropping in among the ribbons, craning up, lens
          // opening for speed — and finally arcs out to reveal the new form.
          const ek = ease(k);
          const sk = Math.sin(Math.PI * k);
          const pre = k < 0.22 ? Math.sin(Math.PI * (k / 0.22)) : 0;
          const orbit = toImplode ? 0.35 : 1.15;
          const az = THREE.MathUtils.lerp(A0.az, B0.az, ek) + orbit * sk;
          const el = THREE.MathUtils.lerp(A0.el, B0.el, ek) + 0.3 * sk;
          const d =
            THREE.MathUtils.lerp(A0.d, B0.d, ek) *
            (1 - (toImplode ? 0.38 : 0.5) * Math.pow(sk, 1.2)) *
            (1 - 0.05 * pre);
          const tx = THREE.MathUtils.lerp(A0.x, B0.x, ek) * (1 - 0.85 * sk);
          const ty = THREE.MathUtils.lerp(A0.y, B0.y, ek) * (1 - 0.6 * sk);
          place(tx, ty, az, el, d, goalPos);
          goalLook.set(tx, ty, 0);
          goalFov = 30 + sk * (toImplode ? -5 : 10);
        } else {
          place(FA.x, FA.y, FA.az, FA.el, FA.d, railA);
          place(FB.x, FB.y, FB.az, FB.el, FB.d, railB);
          // the pass swings out on the side the form is leaving from
          const swingSide = toImplode ? 0 : FB.x > FA.x ? -1 : 1;
          place(
            0,
            (FA.y + FB.y) / 2,
            (FA.az + FB.az) / 2 + swingSide * THREE.MathUtils.lerp(0.6, 0.35, tempo),
            (FA.el + FB.el) / 2 + 0.16,
            WIDE * (toImplode ? 0.62 : THREE.MathUtils.lerp(0.5, 0.7, tempo)),
            railM,
          );
          rail.points[0].copy(railA);
          rail.points[1].copy(railM);
          rail.points[2].copy(railB);
          rail.getPoint(k, goalPos);
          goalLook.set(THREE.MathUtils.lerp(FA.x, FB.x, k), THREE.MathUtils.lerp(FA.y, FB.y, k), 0);
          // mid-move the gaze is pulled onto the swarm itself
          goalLook.lerp(ORIGIN, Math.sin(Math.PI * k) * (toImplode ? 1 : 0.65));
          // implode tightens the lens for tension; a flight opens it for speed
          goalFov = 30 + Math.sin(Math.PI * k) * (toImplode ? -5 : 7);
        }

        // how fast the story is moving: drives the motion streak
        if (key === flowKey) {
          const rate = Math.abs(p - flowP) / Math.max(dt, 1e-3);
          U.uFlow.value += (rate - U.uFlow.value) * (1 - Math.exp(-dt * 8));
        } else {
          flowKey = key;
          U.uFlow.value = 0;
        }
        flowP = p;

        // Close-up: each scroll transition opens on its lead bot, the way
        // the intro opens — the camera snaps in while it crouches, holds
        // on the kick-off, then pulls back to ride the river
        let macroW = 0;
        let macroNear = 0.05;
        if (landing && macroOn && !holding) {
          const raw = (p - 0.15 - macroDelay * 0.5) / 0.5;
          const endK = Math.min(0.45, (0.175 + macroDelay * 0.5) / 1.3);
          macroW = smooth01(0, 0.1, k) * (1 - smooth01(endK, endK + 0.16, k));
          const rel = smooth01(-0.16, 0, raw);
          const crouch = Math.sin(Math.PI * clamp01((raw + 0.3) / 0.16));
          macroLocal.copy(macroPos).addScaledVector(macroN, macroScale * (1.4 * rel - 0.45 * crouch));
          macroWorld.copy(macroLocal).applyMatrix4(rig.matrixWorld);
          macroNW.copy(macroN).transformDirection(rig.matrixWorld);
          if (raw < 0.06 && macroW > 0.01) {
            poseHero(macroLocal, macroN, macroX, macroScale * 0.86, macroPose, rel, raw);
            U.uHeroId.value = macroId;
            U.uHeroShow.value = 0;
          } else {
            macroHide();
          }
          if (macroW > 0) {
            macroDir.copy(goalPos).sub(macroWorld).normalize().multiplyScalar(0.65).addScaledVector(macroNW, 0.75).normalize();
            const md = macroScale * 4.2;
            macroNear = Math.max(0.004, md * 0.08);
            goalPos.lerp(macroCam.copy(macroWorld).addScaledVector(macroDir, md), macroW);
            goalLook.lerp(macroWorld, macroW);
            goalFov = THREE.MathUtils.lerp(goalFov, 36, macroW);
          }
        } else if (macroShown) {
          macroHide();
        }
        camPos.lerp(goalPos, 1 - Math.exp(-dt * (2.8 + 7 * macroW)));
        camLook.lerp(goalLook, 1 - Math.exp(-dt * (1.9 + 8 * macroW)));
        camFov += (goalFov - camFov) * (1 - Math.exp(-dt * 2.5));
        // bank into lateral motion, a degree and a half at most
        camVel.copy(camPos).sub(camPrev).divideScalar(Math.max(dt, 1e-3));
        camPrev.copy(camPos);
        camFwd.copy(camLook).sub(camPos).normalize();
        camRight.crossVectors(camFwd, UP).normalize();
        // landing: barely any bank at rest, up to ~2° while riding the vortex
        const rollMax = landing ? 0.009 + 0.028 * Math.sin(Math.PI * k) : 0.026;
        const rollGoal = THREE.MathUtils.clamp(-camVel.dot(camRight) * 0.012, -rollMax, rollMax);
        camRoll += (rollGoal - camRoll) * (1 - Math.exp(-dt * 3));

        // a breath of hand-held motion, never still
        const tsec = (now - start) / 1000;
        camera.position.copy(camPos);
        if (!landing) {
          camera.position.x += Math.sin(tsec * 0.7) * 0.03;
          camera.position.y += Math.sin(tsec * 0.9 + 1) * 0.025;
        }
        if (landing) {
          // the key light slowly travels ~10° across the facets and back:
          // the form stays put, the light does the revealing
          scene.environmentRotation.y = Math.sin(tsec * 0.48) * 0.18;
          scene.environmentRotation.x = Math.sin(tsec * 0.31 + 1.3) * 0.05;
          // the pointer leans the camera a little: the scene answers the hand
          stepSpin(dt);
          camera.position.x += mxS * 0.35;
          camera.position.y -= myS * 0.22;
        }
        // Ending: as the closing section rises the camera dives into the A —
        // the lattice rushes past the lens — and the swarm dissolves into the
        // footer's black hole, which then owns the screen alone
        let dive = 0;
        if (landing && endNode) {
          const top = endNode.getBoundingClientRect().top;
          // the A lands as the section settles (top at 15%); the dive starts
          // only once it has, and runs over most of a screen of scroll
          dive = clamp01((window.innerHeight * -0.1 - top) / (window.innerHeight * 0.9));
        }
        const dk = ease(dive);
        diveLook.copy(camLook).lerp(ORIGIN, dk);
        if (dk > 0) camera.position.lerp(ORIGIN, dk * 0.93);
        camera.fov = camFov + dk * 12;
        camera.near = THREE.MathUtils.lerp(0.05, macroNear, macroW);
        camera.updateProjectionMatrix();
        camera.lookAt(diveLook);
        camera.rotateZ(camRoll);
        // landing: the close crossing happens once, leaving the manifesto —
        // a spectacle repeated on every transition stops being one
        if (!(landing && macroShown)) {
          flyBy(landing ? (seg === 1 && !holding ? (k - 0.5) / 0.45 : -1) : (k - 0.3) / 0.4, U.uScale.value, tsec);
        }
        if (landing) {
          // a slow sway of ±17° around frontal: alive, always readable
          rig.rotation.y = spinAngle + Math.sin(swayT * 0.16) * 0.3;
          rig.rotation.x = pitch;
          rig.updateMatrixWorld();
          updateSky(tsec, 1, clamp01(smoothY / span));
          starMat.uniforms.uTime.value = tsec;
          // stars drift slower than the form: depth without a second scene
          stars.rotation.y = tsec * 0.008 + spinAngle * 0.04;
          stars.position.y = (smoothY / span) * 4;
          if (p >= 1.3) autoPulse(tsec);
        } else {
          rig.rotation.y = Math.sin(tsec * 0.18) * 0.1;
        }
        U.uHoverAmt.value += (hoverTarget - U.uHoverAmt.value) * (hoverTarget > U.uHoverAmt.value ? 0.12 : 0.04);
        U.uP.value = p;
        U.uTime.value = tsec;
        clock = tsec;
        // the hero headline leaves with the first scroll
        if (titleRef.current) titleRef.current.style.opacity = String(1 - smooth01(0.05, 0.3, P));
        if (landing) {
          // quiet sections (projects, FAQ) keep the swarm dim at the edge:
          // it yields to the content instead of competing with it
          const qA = CH[seg].quiet ? 1 : 0;
          const qB = CH[Math.min(seg + 1, CH.length - 1)].quiet ? 1 : 0;
          const quietK = holding ? (CH[holdIdx].quiet ? 1 : 0) : THREE.MathUtils.lerp(qA, qB, tt);
          const op = (1 - 0.6 * quietK) * (1 - smooth01(0.55, 0.95, dive));
          const opS = op.toFixed(3);
          if (opS !== lastOpacity) {
            lastOpacity = opS;
            canvas.style.opacity = opS;
          }
          // fully handed over: stop drawing, the footer renderer has the GPU
          if (op < 0.005) return;
        }
        composer.render();
      };

      if (scroll && window.__swarm) {
        window.__swarm.story = (P: number) => {
          introStart = -1;
          endIntro();
          const y = P * window.innerHeight * (CHAPTER_VH / 100);
          pinnedY = y;
          smoothY = y;
          const t0 = performance.now();
          for (let i = 0; i < 90; i++) driveScroll(t0 + i * 50, 0.05);
        };
      }

      let firstFrame = true;
      const loop = (now: number) => {
        if (disposed) return;
        if (firstFrame) {
          firstFrame = false;
          if (landing) prog(1);
        }
        const c = ctlRef.current;
        if (c.replay) {
          c.replay = false;
          cur = -2;
          next = spots.length - 1;
          set(cur, next);
          setCurrent(next);
          introStart = now;
          introClock = 0;
          spinIn = 0;
        }
        if (introStart >= 0) {
          // a scroll or swipe runs the intro at 3x until the input stops
          const idt = Math.min((now - last) / 1000, 0.05);
          rush = Math.max(0, rush - idt * 2.5);
          introClock += idt * (1 + rush * 2);
          const it = introClock;
          last = now;
          // reading comes first: a real scroll exits the intro into the story
          // instead of trapping the page behind playback
          const bailOut = landing && scroll && scrollTop() > window.innerHeight * 0.3;
          if (it < INTRO_END && !bailOut) {
            rig.rotation.y = 0;
            U.uP.value = introFrame(it);
            U.uTime.value = (now - start) / 1000;
            composer.render();
            raf = requestAnimationFrame(loop);
            return;
          }
          // hand over: hold the A, ease the turntable in
          endIntro();
          introStart = -1;
          segStart = now - (BUILD / 1.3) * 1000 * 1.3;
          rot = 0;
        }
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        // the gear turns only while it is held; frozen through transitions
        if (U.uSpinTo.value > 0.5 && (!scroll || gearHold)) U.uSpinAng.value += dt * 0.35;
        if (scroll) {
          if (landing) adapt(dt, now);
          driveScroll(now, dt);
          raf = requestAnimationFrame(loop);
          return;
        }
        const seg = (now - segStart) / 1000;
        const jump = c.pick >= 0 && c.pick !== next;
        if (jump || (c.auto && seg > BUILD + HOLD)) {
          cur = next;
          next = jump ? c.pick : (next + 1) % spots.length;
          c.pick = -1;
          set(cur, next);
          setCurrent(next);
          segStart = now;
        }
        c.pick = -1;
        // the field follows the pointer in quickly and fades out slowly
        U.uHoverAmt.value += (hoverTarget - U.uHoverAmt.value) * (hoverTarget > U.uHoverAmt.value ? 0.12 : 0.04);
        if (c.spin) rot += dt * 0.12;
        spinIn = Math.min(1, spinIn + dt * 0.5);
        const p = Math.min(((now - segStart) / 1000 / BUILD) * 1.3, 1.3);
        render(p, (now - start) / 1000, { rot: (-0.35 + Math.sin(rot) * 0.55) * ease(spinIn) });
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      cleanup = () => {
        cancelAnimationFrame(raf);
        pointerTarget.removeEventListener("pointerdown", onDown);
        pointerTarget.removeEventListener("pointermove", onMove);
        pointerTarget.removeEventListener("pointerleave", onLeave);
        pointerTarget.removeEventListener("pointerup", onUp);
        window.removeEventListener("wheel", onRush);
        window.removeEventListener("touchmove", onRush);
        window.removeEventListener("keydown", onRush);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("v4:ready", onSceneReady);
        window.removeEventListener("v4:morph", onMorph);
        canvas.removeEventListener("webglcontextlost", onLost);
        window.removeEventListener("pointerdown", onGrabStart);
        window.removeEventListener("pointermove", onGrabMove);
        window.removeEventListener("pointerup", onGrabEnd);
        window.removeEventListener("pointercancel", onGrabEnd);
        window.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", onTouchEnd);
        window.removeEventListener("touchcancel", onTouchEnd);
        document.documentElement.classList.remove("v4-dragging");
        starGeo.dispose();
        starMat.dispose();
        sky.geometry.dispose();
        sky.material.dispose();
        for (const t of skyTextures) t.dispose();
        composer.dispose();
        pmrem.dispose();
        envTex.dispose();
        for (const g of [ballGeo, ringGeo, armGeo, ballBase, ringBase, armBase]) g.dispose();
        renderer.dispose();
        delete window.__swarm;
      };
    })();

    return () => {
      disposed = true;
      (worker as Worker | null)?.terminate();
      cleanup();
    };
  }, []);

  const btn = (active: boolean): React.CSSProperties => ({
    padding: "8px 12px",
    borderRadius: 8,
    border: `1px solid ${active ? "#2f6bff" : "rgba(255,255,255,0.18)"}`,
    background: active ? "#2f6bff" : "rgba(255,255,255,0.04)",
    color: "#fff",
    font: "600 13px/1 system-ui, sans-serif",
    cursor: "pointer",
  });

  if (staticFallback) {
    // software-GPU devices: no swarm, let the plain sceneBackdrop void show
    return null;
  }

  return (
    <>
      {scroll && !landing && (
        <div style={{ position: "relative", zIndex: 1, pointerEvents: "none" }}>
          {CHAPTERS.map((ch, i) => (
            <section
              key={ch.shape}
              style={{
                height: `${CHAPTER_VH}vh`,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: ch.side === "right" ? "flex-start" : "flex-end",
                padding: "0 7vw",
              }}
            >
              {i > 0 && (
                <div style={{ marginTop: "32vh", maxWidth: "min(460px, 86vw)", color: "#f2f1ec" }}>
                  <div style={{ font: "600 12px/1 system-ui", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8fb0ff" }}>
                    {ch.kicker}
                  </div>
                  <h2 style={{ margin: "14px 0 0", font: "800 clamp(30px, 4vw, 54px)/1.04 system-ui", letterSpacing: "-0.02em" }}>
                    {ch.title}
                  </h2>
                </div>
              )}
            </section>
          ))}
        </div>
      )}
      {intro && !landing && (
        <div
          ref={titleRef}
          style={{
            position: "fixed",
            left: "7vw",
            bottom: "12vh",
            maxWidth: "min(560px, 86vw)",
            opacity: 0,
            color: "#f2f1ec",
            font: "800 clamp(34px, 5vw, 68px)/1.02 system-ui, sans-serif",
            letterSpacing: "-0.02em",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          IT firma i web agencija iz Niša
        </div>
      )}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={
          landing
            ? // same layer as SceneV4's `.scene`: under the copy, never eats taps or scroll
              { position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }
            : { position: "fixed", inset: 0, width: "100vw", height: "100vh", background: "#000", touchAction: "none" }
        }
      />
      {!landing && (
      <div
        style={{
          position: "fixed",
          left: scroll ? "auto" : 16,
          right: scroll ? 16 : "auto",
          top: scroll ? "auto" : 16,
          bottom: scroll ? 16 : "auto",
          width: scroll ? "auto" : "min(340px, calc(100vw - 32px))",
          zIndex: 3,
          padding: 14,
          display: "grid",
          gap: 12,
          borderRadius: 14,
          background: "rgba(8,9,14,0.72)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          color: "#fff",
          font: "13px/1.45 system-ui, sans-serif",
        }}
      >
        <div style={{ display: scroll ? "none" : "flex", flexWrap: "wrap", gap: 6 }}>
          {shapes.map((s, i) => (
            <button
              key={s.name}
              type="button"
              style={btn(current === i)}
              onClick={() => {
                ctlRef.current.pick = i;
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            type="button"
            style={btn(auto)}
            onClick={() => {
              ctlRef.current.auto = !auto;
              setAuto(!auto);
            }}
          >
            Automatski
          </button>
          <button
            type="button"
            style={btn(false)}
            onClick={() => {
              ctlRef.current.replay = true;
            }}
          >
            Ponovi intro
          </button>
          <button
            type="button"
            style={btn(spin)}
            onClick={() => {
              ctlRef.current.spin = !spin;
              setSpin(!spin);
            }}
          >
            Rotacija
          </button>
        </div>
        <p style={{ margin: 0, color: "rgba(255,255,255,0.6)" }}>
          {count ? `${count} botova. ` : ""}Pređi mišem preko oblika ili tapni: kroz mrežu prođe talas.{" "}
          <a href="/dev/nanobot-variants?v=link" style={{ color: "#8fb0ff" }}>
            Jedan bot
          </a>
        </p>
      </div>
      )}
    </>
  );
}
