"use client";

import { useEffect } from "react";
import type * as THREE from "three";

/**
 * Mounts lightweight Three.js scenes onto the .card-r3f-canvas elements
 * inside the services stack section. Each canvas has a data-scene attribute
 * that selects the appropriate visual.
 *
 * Dynamic import keeps Three.js out of the initial bundle.
 */
export function ServicesR3F() {
  useEffect(() => {
    const rafIds: number[] = [];
    const disposers: (() => void)[] = [];

    async function init() {
      const THREE = await import("three");

      const canvases = Array.from(
        document.querySelectorAll<HTMLCanvasElement>(".card-r3f-canvas"),
      );
      if (!canvases.length) return;

      canvases.forEach((canvas) => {
        const scene = canvas.dataset.scene ?? "";
        let dispose: (() => void) | undefined;

        switch (scene) {
          case "web-dev":   dispose = webDevScene(THREE, canvas);   break;
          case "branding":  dispose = brandingScene(THREE, canvas);  break;
          case "uiux":      dispose = uiuxScene(THREE, canvas);      break;
          case "seo":       dispose = seoScene(THREE, canvas);       break;
        }
        if (dispose) disposers.push(dispose);
      });
    }

    init();
    return () => {
      rafIds.forEach(cancelAnimationFrame);
      disposers.forEach((fn) => fn());
    };

    // ── Scene helpers ──────────────────────────────────────────────────────

    function makeRenderer(THREE: any, canvas: HTMLCanvasElement) {
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      const w = canvas.clientWidth || canvas.offsetWidth || 400;
      const h = canvas.clientHeight || canvas.offsetHeight || 300;
      renderer.setSize(w, h, false);
      return renderer;
    }

    function makeCamera(THREE: any, canvas: HTMLCanvasElement) {
      const w = canvas.clientWidth || 400;
      const h = canvas.clientHeight || 300;
      const cam = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
      cam.position.z = 3;
      return cam;
    }

    function onResize(
      renderer: any,
      camera: any,
      canvas: HTMLCanvasElement,
    ) {
      const observer = new ResizeObserver(() => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      });
      observer.observe(canvas);
      return () => observer.disconnect();
    }

    // ── 1. Web razvoj — rotating wireframe icosahedron ─────────────────────
    function webDevScene(THREE: any, canvas: HTMLCanvasElement) {
      const renderer = makeRenderer(THREE, canvas);
      const scene    = new THREE.Scene();
      const camera   = makeCamera(THREE, canvas);
      const stopResize = onResize(renderer, camera, canvas);

      // Outer wireframe
      const geoOuter = new THREE.IcosahedronGeometry(1.2, 1);
      const matWire  = new THREE.MeshBasicMaterial({
        color: 0x4477ff,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const meshOuter = new THREE.Mesh(geoOuter, matWire);
      scene.add(meshOuter);

      // Inner solid with slight glow
      const geoInner = new THREE.IcosahedronGeometry(0.75, 1);
      const matInner = new THREE.MeshBasicMaterial({
        color: 0x1133aa,
        transparent: true,
        opacity: 0.55,
      });
      scene.add(new THREE.Mesh(geoInner, matInner));

      // Particles
      const count = 120;
      const pos   = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * 5;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
      }
      const geoP = new THREE.BufferGeometry();
      geoP.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const particles = new THREE.Points(
        geoP,
        new THREE.PointsMaterial({ color: 0x6699ff, size: 0.025 }),
      );
      scene.add(particles);

      let raf: number;
      (function loop() {
        raf = requestAnimationFrame(loop);
        rafIds.push(raf);
        meshOuter.rotation.x += 0.003;
        meshOuter.rotation.y += 0.005;
        particles.rotation.y += 0.001;
        renderer.render(scene, camera);
      })();

      return () => {
        cancelAnimationFrame(raf);
        stopResize();
        renderer.dispose();
      };
    }

    // ── 2. Branding — morphing color torus ────────────────────────────────
    function brandingScene(THREE: any, canvas: HTMLCanvasElement) {
      const renderer = makeRenderer(THREE, canvas);
      const scene    = new THREE.Scene();
      const camera   = makeCamera(THREE, canvas);
      camera.position.z = 3.5;
      const stopResize = onResize(renderer, camera, canvas);

      const geo  = new THREE.TorusKnotGeometry(0.9, 0.3, 128, 32);
      const mat  = new THREE.MeshBasicMaterial({
        color: 0x9933cc,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);

      // Glow ring
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.4, 0.02, 8, 80),
        new THREE.MeshBasicMaterial({ color: 0xff44cc, transparent: true, opacity: 0.3 }),
      );
      scene.add(ring);

      let raf: number;
      (function loop() {
        raf = requestAnimationFrame(loop);
        rafIds.push(raf);
        mesh.rotation.x += 0.004;
        mesh.rotation.y += 0.006;
        ring.rotation.z += 0.003;
        renderer.render(scene, camera);
      })();

      return () => {
        cancelAnimationFrame(raf);
        stopResize();
        renderer.dispose();
      };
    }

    // ── 3. UI/UX — animated dot grid wave ─────────────────────────────────
    function uiuxScene(THREE: any, canvas: HTMLCanvasElement) {
      const renderer = makeRenderer(THREE, canvas);
      const scene    = new THREE.Scene();
      const camera   = makeCamera(THREE, canvas);
      camera.position.set(0, 2.5, 4);
      camera.lookAt(0, 0, 0);
      const stopResize = onResize(renderer, camera, canvas);

      const cols = 18, rows = 14;
      const meshes: any[] = [];
      const geo = new THREE.SphereGeometry(0.07, 6, 6);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const mat  = new THREE.MeshBasicMaterial({
            color: 0x00ccff,
            transparent: true,
            opacity: 0.6,
          });
          const m = new THREE.Mesh(geo, mat);
          m.position.set(
            (c - cols / 2) * 0.38,
            0,
            (r - rows / 2) * 0.38,
          );
          scene.add(m);
          meshes.push(m);
        }
      }

      let t = 0;
      let raf: number;
      (function loop() {
        raf = requestAnimationFrame(loop);
        rafIds.push(raf);
        t += 0.03;
        meshes.forEach((m, i) => {
          const c = i % cols;
          const r = Math.floor(i / cols);
          m.position.y = Math.sin(c * 0.5 + t) * 0.25 + Math.sin(r * 0.5 + t * 0.7) * 0.25;
          (m.material as any).opacity = 0.3 + 0.5 * (0.5 + 0.5 * Math.sin(c * 0.4 + r * 0.3 + t));
        });
        renderer.render(scene, camera);
      })();

      return () => {
        cancelAnimationFrame(raf);
        stopResize();
        renderer.dispose();
      };
    }

    // ── 4. SEO/Marketing — particle network ───────────────────────────────
    function seoScene(THREE: any, canvas: HTMLCanvasElement) {
      const renderer = makeRenderer(THREE, canvas);
      const scene    = new THREE.Scene();
      const camera   = makeCamera(THREE, canvas);
      camera.position.z = 4;
      const stopResize = onResize(renderer, camera, canvas);

      const NODE_COUNT = 60;
      const nodes: { mesh: any; vel: THREE.Vector3Like }[] = [];
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00ff99 });
      const nodeGeo = new THREE.SphereGeometry(0.04, 6, 6);

      const positions: THREE.Vector3[] = [];

      for (let i = 0; i < NODE_COUNT; i++) {
        const mesh = new THREE.Mesh(nodeGeo, nodeMat);
        mesh.position.set(
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 3.5,
          (Math.random() - 0.5) * 1,
        );
        scene.add(mesh);
        positions.push(mesh.position);
        nodes.push({
          mesh,
          vel: new THREE.Vector3(
            (Math.random() - 0.5) * 0.008,
            (Math.random() - 0.5) * 0.008,
            0,
          ),
        });
      }

      // Line segments for connections
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00cc77,
        transparent: true,
        opacity: 0.2,
      });
      const lineGeo  = new THREE.BufferGeometry();
      const lineVerts = new Float32Array(NODE_COUNT * NODE_COUNT * 6);
      lineGeo.setAttribute("position", new THREE.BufferAttribute(lineVerts, 3));
      const lines = new THREE.LineSegments(lineGeo, lineMat);
      scene.add(lines);

      const CONNECT_DIST = 1.4;

      let raf: number;
      (function loop() {
        raf = requestAnimationFrame(loop);
        rafIds.push(raf);

        // Move nodes
        nodes.forEach(({ mesh, vel }) => {
          mesh.position.x += (vel as any).x;
          mesh.position.y += (vel as any).y;
          if (Math.abs(mesh.position.x) > 2.8) (vel as any).x *= -1;
          if (Math.abs(mesh.position.y) > 1.8) (vel as any).y *= -1;
        });

        // Rebuild connections
        let idx = 0;
        for (let a = 0; a < NODE_COUNT; a++) {
          for (let b = a + 1; b < NODE_COUNT; b++) {
            const pa = nodes[a].mesh.position as THREE.Vector3;
            const pb = nodes[b].mesh.position as THREE.Vector3;
            const d  = pa.distanceTo(pb);
            if (d < CONNECT_DIST) {
              lineVerts[idx++] = pa.x; lineVerts[idx++] = pa.y; lineVerts[idx++] = pa.z;
              lineVerts[idx++] = pb.x; lineVerts[idx++] = pb.y; lineVerts[idx++] = pb.z;
            }
          }
        }
        // Zero out remaining
        for (let i = idx; i < lineVerts.length; i++) lineVerts[i] = 0;
        lineGeo.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
      })();

      return () => {
        cancelAnimationFrame(raf);
        stopResize();
        renderer.dispose();
      };
    }
  }, []);

  return null;
}
