/**
 * Shared engine for the inner-page shader backgrounds (SilkV4, AuroraV4).
 *
 * Two passes per frame:
 *  1. FIELD — the expensive part (fbm, domain warp, curtains) rendered into a
 *     small offscreen texture. It is smooth by nature, so a low resolution
 *     loses nothing once it is sampled back with linear filtering.
 *  2. FINE — a cheap pass at native resolution (DPR ≤ 2) that reads the field
 *     and adds everything that has to be sharp: sheen lines, stars, grain,
 *     light. This is what makes it look like a high-res render at roughly the
 *     cost of the old single low-res pass.
 *
 * Quality is picked per device up front, never by watching rAF: rAF measures
 * the whole page's frame (GSAP, Lenis, ScrollTrigger), and an earlier adaptive
 * version pinned the silk to its floor even on an RTX 3060.
 */

export type BgQuality = {
  phone: boolean;
  low: boolean;
  /** Field pass resolution, in CSS pixels. */
  fieldScale: number;
  /** Fine pass resolution, in CSS pixels (≈ capped device pixel ratio). */
  fineScale: number;
};

export function detectQuality(): BgQuality {
  const phone =
    window.matchMedia("(max-width: 767px)").matches ||
    (window.matchMedia("(pointer: coarse)").matches && Math.min(screen.width, screen.height) < 768);
  const cores = navigator.hardwareConcurrency || 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  // Budget phones are where a background turns into scroll jank; they keep
  // every scene (those are just uniforms) but render the fine pass at 1x.
  const low = phone ? cores <= 4 || mem <= 3 : cores <= 2;
  const dpr = window.devicePixelRatio || 1;
  return {
    phone,
    low,
    fieldScale: low ? 0.3 : phone ? 0.4 : 0.5,
    fineScale: low ? 1 : Math.min(dpr, 2),
  };
}

/* ── GLSL shared by both passes of both backgrounds ─────────────────────── */

export const GLSL_COMMON = `
precision highp float;
uniform vec2 uRes;
uniform vec2 uFieldRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseI;
uniform float uScroll;
uniform float uProg;
uniform float uVel;
uniform float uChapter;
uniform float uOpen;
uniform float uCalm;
uniform vec3 uFocus;
uniform vec3 uAttract;
uniform vec3 uRipple;
uniform float uPhone;

const float PI = 3.14159265;

mat2 rot(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }

// Hash without sine (Hoskins). The sin() hash smears into blotches on mobile
// GPUs and starts repeating at the large coordinates a long scroll reaches.
float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

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

// Screen uv: centred, height = 1. Identical in both passes because the field
// target keeps the canvas aspect.
vec2 screenUv() { return (gl_FragCoord.xy - 0.5 * uRes) / uRes.y; }

// Click ripple: a ring that runs out from the click point and fades.
float rippleRing(vec2 uv) {
  float age = uRipple.z;
  if (age > 1.6) return 0.0;
  float d = length(uv - uRipple.xy);
  return exp(-pow((d - age * 0.95) * 11.0, 2.0)) * exp(-age * 2.2);
}
`;

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const UNIFORMS = [
  "uRes",
  "uFieldRes",
  "uTime",
  "uMouse",
  "uMouseI",
  "uScroll",
  "uProg",
  "uVel",
  "uChapter",
  "uOpen",
  "uCalm",
  "uFocus",
  "uAttract",
  "uRipple",
  "uPhone",
  "uField",
] as const;

type UniformName = (typeof UNIFORMS)[number];

/* ── Inputs ─────────────────────────────────────────────────────────────── */

type Inputs = {
  mouse: [number, number];
  mouseI: number;
  screens: number;
  prog: number;
  vel: number;
  chapter: number;
  open: number;
  calm: number;
  time: number;
  focus: [number, number, number];
  attract: [number, number, number];
  ripple: [number, number, number];
};

function createInputs(canvas: HTMLCanvasElement, q: BgQuality) {
  const s: Inputs = {
    mouse: [0, 0],
    mouseI: 0,
    screens: 0,
    prog: 0,
    vel: 0,
    chapter: 0,
    open: 0,
    calm: 0,
    time: 0,
    focus: [0, 0, 0],
    attract: [0, 0, 0],
    ripple: [0, 0, 9],
  };

  // Maps a client point to the shader's screen uv (centred, height = 1).
  const toUv = (cx: number, cy: number): [number, number] => {
    const r = canvas.getBoundingClientRect();
    const h = Math.max(r.height, 1);
    return [(cx - r.left - r.width / 2) / h, (r.top + r.height / 2 - cy) / h];
  };

  let tMouse: [number, number] = [0, 0];
  let tMouseI = 0;
  let tScreens = 0;
  let tProg = 0;
  let tOpen = 0;
  let tChapter = 0;
  let tVel = 0;
  let velV = 0;
  let lastY = window.scrollY;
  let lastInput = performance.now();
  let tFocus: [number, number, number] = [0, 0, 0];
  let tAttract: [number, number, number] = [0, 0, 0];

  /* Chapters: section starts and h2s inside <main>. A guide can be three
     sections long and still a dozen headings deep, so headings count too.
     Positions are cached — reading rects on every scroll event would force
     layout against GSAP's writes. */
  let marks: number[] = [];
  let forms: HTMLElement[] = [];
  const measure = () => {
    const vh = window.innerHeight;
    const tops = Array.from(
      document.querySelectorAll<HTMLElement>("main section, main h2"),
    )
      .map((el) => el.getBoundingClientRect().top + window.scrollY)
      .sort((a, b) => a - b);
    marks = [];
    for (const t of tops) {
      if (!marks.length || t - marks[marks.length - 1] > vh * 0.5) marks.push(t);
    }
    forms = Array.from(document.querySelectorAll<HTMLElement>("[data-form]"));
  };

  const readScroll = () => {
    const vh = Math.max(1, window.innerHeight);
    const y = window.scrollY;
    const max = Math.max(1, document.documentElement.scrollHeight - vh);
    tScreens = y / vh;
    tProg = Math.min(1, Math.max(0, y / max));
    tOpen = Math.min(1, y / (vh * 0.7));

    const centre = y + vh * 0.45;
    let idx = -1;
    for (let i = 0; i < marks.length; i++) if (marks[i] <= centre) idx = i;
    if (idx < 0) tChapter = 0;
    else {
      const a = marks[idx];
      const b = idx + 1 < marks.length ? marks[idx + 1] : a + vh * 1.5;
      tChapter = idx + Math.min(0.999, (centre - a) / Math.max(1, b - a));
    }

    // The form, when one is on screen, is where the aurora gathers its light.
    let best: [number, number, number] = [tFocus[0], tFocus[1], 0];
    for (const f of forms) {
      const r = f.getBoundingClientRect();
      const vis = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0)) / Math.min(vh, r.height || 1);
      if (vis > best[2]) {
        const [x, yy] = toUv(r.left + r.width / 2, Math.max(r.top, 0) + Math.min(r.height, vh) * 0.35);
        best = [x, yy, Math.min(1, vis)];
      }
    }
    tFocus = best;
  };

  const onScroll = () => {
    const vh = Math.max(1, window.innerHeight);
    const dy = window.scrollY - lastY;
    lastY = window.scrollY;
    // Normalised to the viewport, so a thumb flick on a phone and a wheel
    // notch on a desktop both land near the top of the range.
    tVel = Math.max(-1, Math.min(1, dy / (vh * 0.06)));
    lastInput = performance.now();
    readScroll();
  };

  const onPointer = (e: PointerEvent) => {
    if (e.pointerType === "touch") return; // touch has its own path below
    const r = canvas.getBoundingClientRect();
    const inside =
      e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (inside) tMouse = toUv(e.clientX, e.clientY);
    tMouseI = inside ? 1 : 0;
    lastInput = performance.now();
  };

  const onTouch = (e: TouchEvent) => {
    const t = e.touches[0];
    if (!t) return;
    tMouse = toUv(t.clientX, t.clientY);
    tMouseI = 1;
    lastInput = performance.now();
  };
  const onTouchEnd = () => {
    tMouseI = 0;
  };

  const onOver = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = (e.target as Element | null)?.closest?.("[data-cta]");
    if (el) {
      const r = el.getBoundingClientRect();
      const [x, y] = toUv(r.left + r.width / 2, r.top + r.height / 2);
      tAttract = [x, y, 1];
    } else tAttract = [tAttract[0], tAttract[1], 0];
  };

  const onDown = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    // A click on a link or control is navigation, not play.
    if ((e.target as Element | null)?.closest?.("a, button, input, textarea, select, label")) return;
    const [x, y] = toUv(e.clientX, e.clientY);
    s.ripple = [x, y, 0];
  };

  measure();
  readScroll();
  const ro = new ResizeObserver(() => {
    measure();
    readScroll();
  });
  ro.observe(document.body);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("touchstart", onTouch, { passive: true });
  window.addEventListener("touchmove", onTouch, { passive: true });
  window.addEventListener("touchend", onTouchEnd, { passive: true });
  window.addEventListener("touchcancel", onTouchEnd, { passive: true });
  if (!q.phone) {
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
  }

  const ease = (k: number, dt: number) => 1 - Math.exp(-k * dt);

  const update = (dt: number) => {
    s.mouse[0] += (tMouse[0] - s.mouse[0]) * ease(5, dt);
    s.mouse[1] += (tMouse[1] - s.mouse[1]) * ease(5, dt);
    // A lifted finger fades slower than it arrives, so the touch leaves a trace.
    s.mouseI += (tMouseI - s.mouseI) * ease(tMouseI > s.mouseI ? 6 : 1.6, dt);
    s.screens += (tScreens - s.screens) * ease(9, dt);
    s.prog += (tProg - s.prog) * ease(5, dt);
    s.open += (tOpen - s.open) * ease(6, dt);
    s.chapter += (tChapter - s.chapter) * ease(6, dt);

    // Velocity through an underdamped spring: a fling stretches the field, it
    // overshoots a little on release and settles. The overshoot is what reads
    // as physical rather than as a filter being applied.
    const k = q.phone ? 70 : 90;
    const c = q.phone ? 8.5 : 11;
    velV += (k * (tVel - s.vel) - c * velV) * dt;
    s.vel = Math.max(-1.4, Math.min(1.4, s.vel + velV * dt));
    tVel *= Math.exp(-dt * 7);

    // Reading mode: a still reader gets a quieter background.
    const idle = (performance.now() - lastInput) / 1000;
    s.calm += ((idle > 2.5 ? 1 : 0) - s.calm) * ease(idle > 2.5 ? 0.7 : 4, dt);
    s.time += dt * (1 - 0.55 * s.calm);

    for (let i = 0; i < 3; i++) {
      s.focus[i] += (tFocus[i] - s.focus[i]) * ease(i === 2 ? 2.5 : 6, dt);
      s.attract[i] += (tAttract[i] - s.attract[i]) * ease(i === 2 ? 4 : 8, dt);
    }
    s.ripple[2] += dt;

    // Dev-only: pin any input from the console to inspect one scene state.
    if (process.env.NODE_ENV !== "production") {
      const pin = (window as Window & { __bg?: Partial<Inputs> }).__bg;
      if (pin) Object.assign(s, pin);
    }
  };

  const dispose = () => {
    ro.disconnect();
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener("touchstart", onTouch);
    window.removeEventListener("touchmove", onTouch);
    window.removeEventListener("touchend", onTouchEnd);
    window.removeEventListener("touchcancel", onTouchEnd);
    window.removeEventListener("pointerover", onOver);
    window.removeEventListener("pointerdown", onDown);
  };

  return { state: s, update, dispose };
}

/* ── Renderer ───────────────────────────────────────────────────────────── */

type Pass = { prog: WebGLProgram; loc: Record<UniformName, WebGLUniformLocation | null> };

export type BackgroundSpec = {
  /** Field pass fragment body (after GLSL_COMMON). Writes gl_FragColor in 0..1. */
  field: string;
  /** Fine pass fragment body (after GLSL_COMMON). Samples `uField`. */
  fine: string;
  /** Replaces `OCTAVES` in both sources: [desktop, phone]. */
  octaves: [number, number];
};

/**
 * Starts a background on `canvas`. Returns a disposer. Returns null when WebGL
 * is unavailable or a shader fails, so the caller's painted fallback stays.
 */
export function startBackground(canvas: HTMLCanvasElement, spec: BackgroundSpec): (() => void) | null {
  const q = detectQuality();
  const oct = String(q.phone ? spec.octaves[1] : spec.octaves[0]);
  const fieldSrc = GLSL_COMMON + spec.field.replaceAll("OCTAVES", oct);
  const fineSrc = GLSL_COMMON + "uniform sampler2D uField;\n" + spec.fine.replaceAll("OCTAVES", oct);

  const inputs = createInputs(canvas, q);
  let stopGl: (() => void) | null = null;

  const initGl = (): boolean => {
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: q.phone ? "low-power" : "default",
    });
    if (!gl) return false;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS) && process.env.NODE_ENV !== "production") {
        console.error("[bg] shader:", gl.getShaderInfoLog(sh));
      }
      return sh;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const makePass = (src: string): Pass | null => {
      const prog = gl.createProgram()!;
      gl.attachShader(prog, vs);
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, src));
      gl.bindAttribLocation(prog, 0, "aPos");
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
      const loc = {} as Pass["loc"];
      for (const u of UNIFORMS) loc[u] = gl.getUniformLocation(prog, u);
      return { prog, loc };
    };
    const field = makePass(fieldSrc);
    const fine = makePass(fineSrc);
    if (!field || !fine) return false;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    // Half-float field where the device can render and filter it: 8 bits
    // quantise the fbm enough to step the thin sheen lines. Falls back to 8-bit.
    const hf = gl.getExtension("OES_texture_half_float");
    const hfLinear = gl.getExtension("OES_texture_half_float_linear");
    const tex = gl.createTexture();
    const fbo = gl.createFramebuffer();
    let texType: number = gl.UNSIGNED_BYTE;
    const allocField = (w: number, h: number) => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, texType, null);
    };
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    if (hf && hfLinear) {
      texType = hf.HALF_FLOAT_OES;
      allocField(4, 4);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) texType = gl.UNSIGNED_BYTE;
    }
    allocField(4, 4);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    let fw = 4;
    let fh = 4;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(2, Math.round(r.width * q.fineScale));
      canvas.height = Math.max(2, Math.round(r.height * q.fineScale));
      // Field keeps the canvas aspect exactly, so uv lines up between passes.
      fh = Math.max(2, Math.round(r.height * q.fieldScale));
      fw = Math.max(2, Math.round((fh * canvas.width) / canvas.height));
      allocField(fw, fh);
    };
    resize();
    window.addEventListener("resize", resize);

    const s = inputs.state;
    const setUniforms = (p: Pass, w: number, h: number) => {
      const l = p.loc;
      gl.uniform2f(l.uRes, w, h);
      gl.uniform2f(l.uFieldRes, fw, fh);
      gl.uniform1f(l.uTime, s.time);
      gl.uniform2f(l.uMouse, s.mouse[0], s.mouse[1]);
      gl.uniform1f(l.uMouseI, s.mouseI);
      gl.uniform1f(l.uScroll, s.screens);
      gl.uniform1f(l.uProg, s.prog);
      gl.uniform1f(l.uVel, s.vel);
      gl.uniform1f(l.uChapter, s.chapter);
      gl.uniform1f(l.uOpen, s.open);
      gl.uniform1f(l.uCalm, s.calm);
      gl.uniform3f(l.uFocus, s.focus[0], s.focus[1], s.focus[2]);
      gl.uniform3f(l.uAttract, s.attract[0], s.attract[1], s.attract[2]);
      gl.uniform3f(l.uRipple, s.ripple[0], s.ripple[1], s.ripple[2]);
      gl.uniform1f(l.uPhone, q.phone ? 1 : 0);
      gl.uniform1i(l.uField, 0);
    };

    let raf = 0;
    let running = false;
    let last = performance.now();
    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      inputs.update(dt);

      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.viewport(0, 0, fw, fh);
      gl.useProgram(field.prog);
      setUniforms(field, fw, fh);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(fine.prog);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      setUniforms(fine, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      raf = requestAnimationFrame(frame);
    };

    let onScreen = false;
    const sync = () => {
      const want = onScreen && !document.hidden;
      if (want && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!want && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };
    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((e) => e.isIntersecting);
        sync();
      },
      { rootMargin: "120px" },
    );
    io.observe(canvas);
    document.addEventListener("visibilitychange", sync);

    stopGl = () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("resize", resize);
      if (!gl.isContextLost()) {
        gl.deleteProgram(field.prog);
        gl.deleteProgram(fine.prog);
        gl.deleteShader(vs);
        gl.deleteBuffer(buf);
        gl.deleteTexture(tex);
        gl.deleteFramebuffer(fbo);
      }
    };
    return true;
  };

  // A lost context (tab backgrounded on a phone, GPU reset) otherwise leaves
  // a frozen black canvas until reload.
  const onLost = (e: Event) => {
    e.preventDefault();
    stopGl?.();
    stopGl = null;
  };
  const onRestored = () => {
    initGl();
  };
  canvas.addEventListener("webglcontextlost", onLost);
  canvas.addEventListener("webglcontextrestored", onRestored);

  if (!initGl()) {
    inputs.dispose();
    canvas.removeEventListener("webglcontextlost", onLost);
    canvas.removeEventListener("webglcontextrestored", onRestored);
    return null;
  }

  return () => {
    stopGl?.();
    inputs.dispose();
    canvas.removeEventListener("webglcontextlost", onLost);
    canvas.removeEventListener("webglcontextrestored", onRestored);
  };
}
