"use client";

import { useEffect } from "react";
import type * as ThreeTypes from "three";

// ─── Scene definitions ────────────────────────────────────────────────────────

type SceneFactory = (
  THREE: typeof ThreeTypes,
  canvas: HTMLCanvasElement,
  isMobile: boolean,
) => () => void;

const SCENES: Record<string, SceneFactory> = {
  // Web prezentacije — rotating wireframe sphere grid
  "web-prezentacije": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = setup(THREE, canvas, isMobile, 3);
    const geo = new THREE.IcosahedronGeometry(1.1, isMobile ? 1 : 2);
    const wire = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x3d7aff, wireframe: true, transparent: true, opacity: 0.4 }));
    scene.add(wire);
    scene.add(particles(THREE, 80, 4, 0x6699ff));
    return loop(renderer, scene, camera, () => { wire.rotation.x += 0.003; wire.rotation.y += 0.005; });
  },

  // E-commerce — floating cube grid
  "ecommerce": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = setup(THREE, canvas, isMobile, 4);
    const count = isMobile ? 12 : 24;
    const meshes: ThreeTypes.Mesh[] = [];
    const geo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
    for (let i = 0; i < count; i++) {
      const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x00ccaa, wireframe: Math.random() > 0.5, transparent: true, opacity: 0.5 + Math.random() * 0.4 }));
      m.position.set((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 2);
      scene.add(m);
      meshes.push(m);
    }
    return loop(renderer, scene, camera, (t) => { meshes.forEach((m, i) => { m.rotation.x = t * 0.5 + i; m.rotation.y = t * 0.3 + i; }); });
  },

  // Mobilne aplikacije — orbit rings
  "mobile-app": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = setup(THREE, canvas, isMobile, 3.5);
    const rings: ThreeTypes.Mesh[] = [];
    const colors = [0x4488ff, 0x44ffcc, 0xaa44ff];
    for (let i = 0; i < 3; i++) {
      const r = new THREE.Mesh(
        new THREE.TorusGeometry(0.6 + i * 0.45, 0.02, 8, 60),
        new THREE.MeshBasicMaterial({ color: colors[i], transparent: true, opacity: 0.6 - i * 0.1 }),
      );
      r.rotation.x = (i * Math.PI) / 3;
      scene.add(r);
      rings.push(r);
    }
    const center = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 }));
    scene.add(center);
    return loop(renderer, scene, camera, (t) => { rings.forEach((r, i) => { r.rotation.z = t * (0.4 + i * 0.15); r.rotation.y = t * 0.2; }); });
  },

  // CMS — connected nodes
  "cms": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera } = setup(THREE, canvas, isMobile, 4);
    const n = isMobile ? 30 : 55;
    const nodes: { mesh: ThreeTypes.Mesh; vx: number; vy: number }[] = [];
    const geo = new THREE.SphereGeometry(0.05, 6, 6);
    for (let i = 0; i < n; i++) {
      const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x00ff99 }));
      m.position.set((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 3.5, 0);
      scene.add(m);
      nodes.push({ mesh: m, vx: (Math.random() - 0.5) * 0.008, vy: (Math.random() - 0.5) * 0.008 });
    }
    const lineGeo = new THREE.BufferGeometry();
    const verts = new Float32Array(n * n * 6);
    lineGeo.setAttribute("position", new THREE.BufferAttribute(verts, 3));
    scene.add(new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: 0x00cc77, transparent: true, opacity: 0.18 })));
    return loop(renderer, scene, camera, () => {
      let idx = 0;
      nodes.forEach(({ mesh: m, vx, vy }, a) => {
        m.position.x += vx; m.position.y += vy;
        if (Math.abs(m.position.x) > 2.6) nodes[a].vx *= -1;
        if (Math.abs(m.position.y) > 1.8) nodes[a].vy *= -1;
        nodes.forEach(({ mesh: mb }, b) => {
          if (b <= a) return;
          const d = m.position.distanceTo(mb.position);
          if (d < 1.3) {
            verts[idx++] = m.position.x; verts[idx++] = m.position.y; verts[idx++] = 0;
            verts[idx++] = mb.position.x; verts[idx++] = mb.position.y; verts[idx++] = 0;
          }
        });
      });
      for (let i = idx; i < verts.length; i++) verts[i] = 0;
      lineGeo.attributes.position.needsUpdate = true;
    });
  },

  // AI i automatizacija — pulsing neural network
  "ai": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera } = setup(THREE, canvas, isMobile, 3.5);
    const layers = [3, 5, 5, 3];
    const nodesByLayer: ThreeTypes.Mesh[][] = [];
    const geo = new THREE.SphereGeometry(0.09, 8, 8);
    layers.forEach((count, li) => {
      const row: ThreeTypes.Mesh[] = [];
      for (let i = 0; i < count; i++) {
        const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xcc44ff, transparent: true, opacity: 0.7 }));
        m.position.set((li - layers.length / 2 + 0.5) * 1.2, (i - count / 2 + 0.5) * 0.7, 0);
        scene.add(m);
        row.push(m);
      }
      nodesByLayer.push(row);
    });
    const lines: ThreeTypes.Line[] = [];
    for (let li = 0; li < nodesByLayer.length - 1; li++) {
      nodesByLayer[li].forEach((a) => {
        nodesByLayer[li + 1].forEach((b) => {
          const g = new THREE.BufferGeometry().setFromPoints([a.position, b.position]);
          const l = new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0x8822cc, transparent: true, opacity: 0.2 }));
          scene.add(l);
          lines.push(l);
        });
      });
    }
    return loop(renderer, scene, camera, (t) => {
      nodesByLayer.forEach((row, li) => row.forEach((m, i) => {
        (m.material as ThreeTypes.MeshBasicMaterial).opacity = 0.3 + 0.5 * Math.abs(Math.sin(t * 1.2 + li * 0.8 + i * 0.5));
      }));
    });
  },

  // SEO i marketing — growing bar chart particles
  "seo": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera } = setup(THREE, canvas, isMobile, 4);
    const bars: { mesh: ThreeTypes.Mesh; target: number; phase: number }[] = [];
    const count = isMobile ? 10 : 16;
    const geo = new THREE.BoxGeometry(0.18, 1, 0.18);
    for (let i = 0; i < count; i++) {
      const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: new THREE.Color().setHSL(0.35 + i / count * 0.15, 1, 0.5), transparent: true, opacity: 0.7 }));
      const x = (i - count / 2) * 0.32;
      m.position.set(x, -1, 0);
      scene.add(m);
      bars.push({ mesh: m, target: 0.3 + Math.random() * 1.4, phase: Math.random() * Math.PI * 2 });
    }
    return loop(renderer, scene, camera, (t) => {
      bars.forEach(({ mesh: m, target, phase }) => {
        const h = target * (0.7 + 0.3 * Math.sin(t * 0.8 + phase));
        m.scale.y = h;
        m.position.y = -1 + h * 0.5;
      });
    });
  },

  // Cyber security — shield + particles
  "security": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera } = setup(THREE, canvas, isMobile, 3.5);
    const outer = new THREE.Mesh(new THREE.IcosahedronGeometry(1.3, 1), new THREE.MeshBasicMaterial({ color: 0xff4444, wireframe: true, transparent: true, opacity: 0.25 }));
    const inner = new THREE.Mesh(new THREE.OctahedronGeometry(0.7, 0), new THREE.MeshBasicMaterial({ color: 0xff8800, wireframe: true, transparent: true, opacity: 0.5 }));
    scene.add(outer, inner);
    scene.add(particles(THREE, 60, 4, 0xff6644));
    return loop(renderer, scene, camera, (t) => {
      outer.rotation.y = t * 0.3; outer.rotation.x = t * 0.15;
      inner.rotation.y = -t * 0.5; inner.rotation.z = t * 0.2;
    });
  },

  // UI/UX dizajn — dot wave grid
  "uiux": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera } = setup(THREE, canvas, isMobile, 4);
    camera.position.set(0, 2.5, 4); camera.lookAt(0, 0, 0);
    const cols = isMobile ? 12 : 18, rows = isMobile ? 9 : 13;
    const meshes: { m: ThreeTypes.Mesh; c: number; r: number }[] = [];
    const geo = new THREE.SphereGeometry(0.07, 6, 6);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x00ccff, transparent: true, opacity: 0.6 }));
        m.position.set((c - cols / 2) * 0.38, 0, (r - rows / 2) * 0.38);
        scene.add(m);
        meshes.push({ m, c, r });
      }
    }
    return loop(renderer, scene, camera, (t) => {
      meshes.forEach(({ m, c, r }) => {
        m.position.y = Math.sin(c * 0.5 + t) * 0.22 + Math.sin(r * 0.5 + t * 0.7) * 0.22;
        (m.material as ThreeTypes.MeshBasicMaterial).opacity = 0.25 + 0.5 * (0.5 + 0.5 * Math.sin(c * 0.4 + r * 0.3 + t));
      });
    });
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function setup(THREE: typeof ThreeTypes, canvas: HTMLCanvasElement, isMobile: boolean, camZ = 3) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
  renderer.setClearColor(0x000000, 0);
  const w = canvas.clientWidth || 400, h = canvas.clientHeight || 300;
  renderer.setSize(w, h, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
  camera.position.z = camZ;

  const obs = new ResizeObserver(() => {
    const rw = canvas.clientWidth, rh = canvas.clientHeight;
    renderer.setSize(rw, rh, false);
    camera.aspect = rw / rh;
    camera.updateProjectionMatrix();
  });
  obs.observe(canvas);

  return { renderer, scene, camera, stopResize: () => obs.disconnect() };
}

function particles(THREE: typeof ThreeTypes, count: number, spread: number, color: number): ThreeTypes.Points {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * spread;
    pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
    pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  return new THREE.Points(geo, new THREE.PointsMaterial({ color, size: 0.025 }));
}

function loop(
  renderer: ThreeTypes.WebGLRenderer,
  scene: ThreeTypes.Scene,
  camera: ThreeTypes.PerspectiveCamera,
  tick: (t: number) => void,
): () => void {
  let raf = 0;
  let t = 0;
  let active = true;

  // Pause when off-screen
  const obs = new IntersectionObserver(([e]) => { active = e.isIntersecting; }, { threshold: 0 });
  obs.observe(renderer.domElement);

  (function animate() {
    raf = requestAnimationFrame(animate);
    if (!active) return;
    t += 0.016;
    tick(t);
    renderer.render(scene, camera);
  })();

  return () => {
    cancelAnimationFrame(raf);
    obs.disconnect();
    renderer.dispose();
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ServicesR3F() {
  useEffect(() => {
    const disposers: (() => void)[] = [];
    const isMobile = window.matchMedia("(hover: none)").matches;

    // Gyroscope parallax for mobile (doesn't conflict with scroll)
    let gyroX = 0, gyroY = 0;
    let gyroObjects: ThreeTypes.Object3D[] = [];

    function onOrientation(e: DeviceOrientationEvent) {
      gyroX = ((e.gamma ?? 0) / 90) * 0.4;   // left-right tilt
      gyroY = ((e.beta  ?? 45) - 45) / 90 * 0.4; // front-back tilt
    }
    if (isMobile) window.addEventListener("deviceorientation", onOrientation);

    // Mouse parallax for desktop
    let mouseX = 0, mouseY = 0;
    function onMouse(e: MouseEvent) {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    }
    if (!isMobile) window.addEventListener("mousemove", onMouse);

    async function init() {
      const THREE = await import("three");

      const canvases = Array.from(
        document.querySelectorAll<HTMLCanvasElement>(".card-r3f-canvas"),
      );
      if (!canvases.length) return;

      canvases.forEach((canvas) => {
        const sceneKey = canvas.dataset.scene ?? "";
        const factory = SCENES[sceneKey];
        if (!factory) return;

        const dispose = factory(THREE, canvas, isMobile);
        disposers.push(dispose);
      });
    }

    init();

    return () => {
      disposers.forEach((fn) => fn());
      window.removeEventListener("deviceorientation", onOrientation);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return null;
}
