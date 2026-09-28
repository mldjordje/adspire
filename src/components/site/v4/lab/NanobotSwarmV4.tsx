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
  uniform float uSpin;
  uniform vec3 uSpinAxis;
  varying float vLed;
  varying float vNbDepth;

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
    if (uSpin != 0.0) {
      mat3 Sr = nbRot(uSpinAxis, uTime * uSpin);
      bTo = uMid + Sr * (aTo - uMid);
      bNTo = Sr * aNTo;
      bDTo = Sr * aDTo;
    }

    // Per-bot timeline outside the intro fold: a release pre-roll (raw
    // -0.3..0) where the bot unlatches and rises off its spot, the flight
    // (0..1), then the hover-drop and the latch past 1.
    float raw = uFold > 0.5 ? (uP / 1.3 - aDelay * 0.3) / 0.7 : (uP - 0.15 - aDelay * 0.5) / 0.5;
    float lp = clamp(raw, 0.0, 1.0);
    float e = lp * lp * lp * (lp * (lp * 6.0 - 15.0) + 10.0);
    float ie = 1.0 - e;
    // beat 1 — release
    float rel = uFold > 0.5 ? 0.0 : smoothstep(-0.3, 0.0, raw);

    // beat 2 — flight on a cubic: take off along the old normal, swirl
    // around the shared axis in a ribbon with its stream, come down along
    // the new normal. Implode: every path runs through one tight core.
    float liftH = 0.9 + aRnd.w * 0.5;
    vec3 P0 = aFrom + aNFrom * uScaleFrom * 1.4 * rel;
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
    vec3 o1 = normalize(cross(tng, vec3(0.31, 0.83, 0.47)));
    vec3 o2 = cross(tng, o1);
    float laneAng = aRnd.x * 6.2831 + e * 7.0;
    float laneR = 0.04 + aRnd.y * 0.06;
    vec3 lane = spine + (o1 * cos(laneAng) + o2 * sin(laneAng)) * laneR;
    float tube = smoothstep(0.06, 0.3, e) * (1.0 - smoothstep(0.7, 0.94, e));
    pos = mix(pos, lane, tube);
    vel = mix(vel, spineVel, tube) + vec3(1e-4, 0.0, 0.0);

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
    R = nbMix(nbMix(nbFrame(aNFrom, aDFrom), F, leave), nbFrame(bNTo, bDTo), land);

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
    s = mix(uScaleFrom, uScale, e) * (0.86 + 0.14 * e + pop * 0.16);

    // approach: hold a few bot-lengths above the spot, then drop in along
    // the normal — a landing, not a collision
    if (uFold < 0.5) {
      float hoverH = smoothstep(0.45, 0.78, lp) * (1.0 - smoothstep(0.8, 0.97, lp));
      pos += bNTo * s * 3.2 * hoverH;
    }

    float docked = step(1.0, raw);

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
      // the fold keeps its grip the whole way
      pose = mix(mix(linked, vec3(0.0, 0.0, 1.0), leave), aArmTo, land);
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
    float pitch = pose.y + beat + 0.04 * breath * land + (uFold > 0.5 ? pop * 0.3 : 0.0) + w * 0.55;
    st = pose.z;
    A = nbRot(vec3(0.0, 1.0, 0.0), pose.x + swim + w * 0.25 * aSide) * nbRot(vec3(0.0, 0.0, 1.0), pitch * aSide);
    #endif

    // the LED fires on the latch
    float arrive = uFold > 0.5
      ? (raw >= 1.0 ? exp(-(raw - 1.0) * 7.0) : 0.0)
      : (latchT > 0.65 ? exp(-(latchT - 0.65) * 3.0) : 0.0);
    float wave = pow(max(0.0, sin(uTime * 1.1 - bTo.y * 2.4 - bTo.x * 0.6)), 18.0);
    vLed = 0.3 + arrive * 3.0 + wave * 1.8 * docked + hover * 1.6 + rip * 3.2 + ie * 0.35;
    // an unlinked bot is dark; linking fires its LED once
    vLed = vLed * max(link, leave) + linkFlash * 3.0 * (1.0 - leave);
    if (uFold < 0.5) vLed *= 1.0 - 0.55 * rel * (1.0 - clamp(latch, 0.0, 1.0));
    if (uImplode > 0.5) vLed += smoothstep(0.3, 0.45, lp) * (1.0 - smoothstep(0.6, 0.7, lp)) * 1.4 + burst * 4.0;
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

    (async () => {
      if (landing) prog(0.15);
      const THREE = await import("three");
      const PP = await import("postprocessing");
      const { mergeGeometries } = await import("three/examples/jsm/utils/BufferGeometryUtils.js");
      const { MeshSurfaceSampler } = await import("three/examples/jsm/math/MeshSurfaceSampler.js");
      const { buildShapes } = await import("./nanoShapes");
      if (disposed) return;
      if (landing) prog(0.45);

      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const qn = Number(new URLSearchParams(location.search).get("n"));
      const N = qn > 0 ? Math.min(qn, 16000) : mobile ? 2500 : 6000;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.5));
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      renderer.setClearColor(0x000000, 1);
      renderer.toneMapping = THREE.NoToneMapping;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
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
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(envScene, 0.015).texture;
      scene.environment = envTex;
      scene.environmentIntensity = 2.1;

      const { shapes: spots, sheet } = buildShapes(THREE, { mergeGeometries }, MeshSurfaceSampler, N);
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
        uSpin: { value: 0 },
        uSpinAxis: { value: new THREE.Vector3(0, 0, 1) },
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
                `vec3 transformed = nbR * (nbA * nbP) * nbS + nbPos;
                 // model-space height above the bot's docking plane
                 vNbDepth = dot(nbA * nbP, vec3(0.0, 1.0, 0.0));`,
              );
          // Fake contact occlusion. A screen-space AO pass would redraw the
          // scene with its own material and miss the shader animation, so the
          // bot darkens its own underside instead: the side facing into the
          // form, where neighbours and the core block the light.
          sh.fragmentShader =
            "varying float vNbDepth;\n" +
            sh.fragmentShader.replace(
              "#include <opaque_fragment>",
              "outgoingLight *= mix(0.22, 1.0, smoothstep(-0.26, 0.14, vNbDepth));\n#include <opaque_fragment>",
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
               vec3 transformed = nbR * (nbA * (nbM * position)) * nbS + nbPos;`,
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
      const set = (from: number, to: number, peel: "y" | "x" = "y", mode: "flight" | "implode" = "flight") => {
        U.uImplode.value = mode === "implode" ? 1 : 0;
        // the process gear keeps turning once it is built
        U.uSpin.value = spots[to].name === "gear" ? 0.35 : 0;
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
      const T = {
        heroUnfold: 0.7,
        linkStart: 1.25,
        pullStart: 1.7,
        pullLen: 2.8,
        foldStart: 3.2,
        foldLen: 2.3,
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
        scene.environmentIntensity = 0.12 + 1.98 * ease(clamp01((t - 0.3) / 0.9));

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
        const macroD = heroScale * 2.6;
        const push = ease(clamp01(t / T.pullStart));
        const x = clamp01((t - T.pullStart) / T.pullLen);
        const pull = ease(x);
        const fovK = ease(clamp01((t - T.pullStart + 0.2) / (T.pullLen * 0.75)));
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
        camera.fov = THREE.MathUtils.lerp(52, 30, fovK);
        camera.near = Math.max(0.004, Math.min(0.1, d * 0.03));
        camera.updateProjectionMatrix();
        camera.lookAt(tgt);

        // title lands as the A locks
        if (titleRef.current) titleRef.current.style.opacity = String(clamp01((t - T.title) / 0.7));
        return clamp01((t - T.foldStart) / T.foldLen) * 1.3;
      };
      const endIntro = () => {
        U.uIntro.value = 1e4;
        U.uHeroShow.value = 1;
        hero.visible = false;
        scene.environmentIntensity = 2.1;
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
      canvas.addEventListener("pointerdown", onDown);
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerleave", onLeave);
      // a finger lifting off should not leave the field hanging
      canvas.addEventListener("pointerup", (e) => {
        if (e.pointerType !== "mouse") hoverTarget = 0;
      });

      const onResize = () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
        composer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

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
      const chapterShape = CHAPTERS.map((ch) => spots.findIndex((sp) => sp.name === ch.shape));
      const frame = CHAPTERS.map((ch) => ({
        // wide forms (devices) need less offset to stay in frame
        x: mobile ? 0 : ch.side === "right" ? (ch.shape === "devices" ? -0.95 : -1.35) : 1.45,
        y: mobile ? -1.5 : 0.1,
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
      // Fly-by: in the middle of each pass one detailed bot crosses the frame
      // close to the lens, wings swept back — the reminder, at full detail,
      // that the whole swarm is made of real machines.
      const flyBy = (u: number, sc: number, tsec: number) => {
        if (u <= 0 || u >= 1) {
          hero.visible = false;
          return;
        }
        hero.visible = true;
        const eu = ease(u);
        camUp.crossVectors(camRight, camFwd).normalize();
        flyPos
          .copy(camPos)
          .addScaledVector(camFwd, 0.55 + 0.3 * eu)
          .addScaledVector(camRight, -0.55 + 1.1 * eu)
          .addScaledVector(camUp, 0.1 - 0.18 * eu);
        // flying along +right: tail (+Z) points back, wings level, a bank
        flyZ.copy(camRight).negate();
        flyY.copy(camUp).applyAxisAngle(flyZ, Math.sin(u * Math.PI) * 0.35);
        flyX.crossVectors(flyY, flyZ).normalize();
        flyBasis.makeBasis(flyX, flyY, flyZ);
        hero.matrix.copy(flyBasis).scale(new THREE.Vector3(sc, sc, sc)).setPosition(flyPos);
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
      const smooth01 = (a: number, b: number, v: number) => {
        const k = clamp01((v - a) / (b - a));
        return k * k * (3 - 2 * k);
      };
      const driveScroll = (now: number, dt: number) => {
        smoothY += (scrollTop() - smoothY) * (1 - Math.exp(-dt * 7));
        // landing: no own spacer sections, so ride the real page's scroll
        // range instead of a fixed CHAPTER_VH budget
        const span = landing
          ? Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
          : window.innerHeight * (CHAPTER_VH / 100) * (CHAPTERS.length - 1);
        const P = Math.min(Math.max((smoothY / span) * (CHAPTERS.length - 1), 0), CHAPTERS.length - 1);
        const seg = Math.min(Math.floor(P), CHAPTERS.length - 2);
        const f = P - seg;
        // transition across most of the chapter; smootherstep ends
        const tRaw = clamp01((f - 0.22) / 0.7);
        const tt = tRaw * tRaw * tRaw * (tRaw * (tRaw * 6 - 15) + 10);
        // which transition the swarm is on, and how far along it is
        let key: string;
        let p: number;
        if (f < 0.22 || seg < 0) {
          key = seg === 0 ? `-2>${chapterShape[0]}` : `${chapterShape[seg - 1]}>${chapterShape[seg]}`;
          p = 1.3;
        } else {
          key = `${chapterShape[seg]}>${chapterShape[seg + 1]}:x:${CHAPTERS[seg + 1].mode}`;
          p = tt * 1.3;
        }
        if (key !== activeSet) {
          activeSet = key;
          const [a, rest] = key.split(">");
          const [b, peelMode, flightMode] = rest.split(":");
          set(Number(a), Number(b), peelMode === "x" ? "x" : "y", flightMode === "implode" ? "implode" : "flight");
          setCurrent(Number(b));
        }
        // Rail: framing A → a close pass beside the swarm → framing B on a
        // centripetal Catmull-Rom, so the move has no corners. Position and
        // gaze ride separate springs — the gaze lags like an operator
        // following the action — and the camera banks into lateral motion.
        const FA = frame[seg];
        const FB = frame[Math.min(seg + 1, frame.length - 1)];
        const k = f < 0.22 ? 0 : tt;
        // tempo: a fast scroll gets a wider, more direct pass; a slow one
        // is taken close, where the bots read one by one
        const yNow = scrollTop();
        const instSpeed = Math.abs(yNow - lastY) / Math.max(dt, 1e-3);
        lastY = yNow;
        scrollSpeed += (instSpeed - scrollSpeed) * (1 - Math.exp(-dt * 4));
        const tempo = clamp01(scrollSpeed / 2500);
        const place = (x: number, y: number, az: number, el: number, d: number, out: InstanceType<typeof THREE.Vector3>) =>
          out.set(x + Math.sin(az) * Math.cos(el) * d, y + Math.sin(el) * d, Math.cos(az) * Math.cos(el) * d);
        place(FA.x, FA.y, FA.az, FA.el, FA.d, railA);
        place(FB.x, FB.y, FB.az, FB.el, FB.d, railB);
        // the pass swings out on the side the form is leaving from
        const toImplode = CHAPTERS[Math.min(seg + 1, CHAPTERS.length - 1)].mode === "implode" && f >= 0.22;
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
        goalLook.set(
          THREE.MathUtils.lerp(FA.x, FB.x, k),
          THREE.MathUtils.lerp(FA.y, FB.y, k),
          0,
        );
        // mid-move the gaze is pulled onto the swarm itself
        goalLook.lerp(ORIGIN, Math.sin(Math.PI * k) * (toImplode ? 1 : 0.65));
        // implode tightens the lens for tension; a flight opens it for speed
        const goalFov = 30 + Math.sin(Math.PI * k) * (toImplode ? -5 : 7);

        camPos.lerp(goalPos, 1 - Math.exp(-dt * 2.8));
        camLook.lerp(goalLook, 1 - Math.exp(-dt * 1.9));
        camFov += (goalFov - camFov) * (1 - Math.exp(-dt * 2.5));
        // bank into lateral motion, a degree and a half at most
        camVel.copy(camPos).sub(camPrev).divideScalar(Math.max(dt, 1e-3));
        camPrev.copy(camPos);
        camFwd.copy(camLook).sub(camPos).normalize();
        camRight.crossVectors(camFwd, UP).normalize();
        const rollGoal = THREE.MathUtils.clamp(-camVel.dot(camRight) * 0.012, -0.026, 0.026);
        camRoll += (rollGoal - camRoll) * (1 - Math.exp(-dt * 3));

        // a breath of hand-held motion, never still
        const tsec = (now - start) / 1000;
        camera.position.copy(camPos);
        camera.position.x += Math.sin(tsec * 0.7) * 0.03;
        camera.position.y += Math.sin(tsec * 0.9 + 1) * 0.025;
        camera.fov = camFov;
        camera.near = 0.05;
        camera.updateProjectionMatrix();
        camera.lookAt(camLook);
        camera.rotateZ(camRoll);
        flyBy((k - 0.3) / 0.4, U.uScale.value, tsec);
        rig.rotation.y = Math.sin(tsec * 0.18) * 0.1;
        U.uHoverAmt.value += (hoverTarget - U.uHoverAmt.value) * (hoverTarget > U.uHoverAmt.value ? 0.12 : 0.04);
        U.uP.value = p;
        U.uTime.value = tsec;
        clock = tsec;
        // the hero headline leaves with the first scroll
        if (titleRef.current) titleRef.current.style.opacity = String(1 - smooth01(0.05, 0.3, P));
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
          if (it < INTRO_END) {
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
        if (scroll) {
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
        canvas.removeEventListener("pointerdown", onDown);
        canvas.removeEventListener("pointermove", onMove);
        canvas.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("wheel", onRush);
        window.removeEventListener("touchmove", onRush);
        window.removeEventListener("keydown", onRush);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("v4:ready", onSceneReady);
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
        style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", background: "#000", touchAction: "none" }}
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
