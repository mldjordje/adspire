"use client";

import { useEffect } from "react";
import type * as ThreeTypes from "three";

// ─── Types ────────────────────────────────────────────────────────────────────

type SceneFactory = (
  THREE: typeof ThreeTypes,
  canvas: HTMLCanvasElement,
  isMobile: boolean,
) => () => void;

// ─── Scene definitions ────────────────────────────────────────────────────────

const SCENES: Record<string, SceneFactory> = {

  // ── Web prezentacije — fluid chrome orb dissolving into data shards ─────────
  "web-prezentacije": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = makeRenderer(THREE, canvas, isMobile, 3.5);

    scene.fog = new THREE.FogExp2(0x010614, 0.06);
    const al = new THREE.AmbientLight(0x0a1f50, 1.5); scene.add(al);
    const pl1 = new THREE.PointLight(0x3b82f6, 16, 9); pl1.position.set(2, 3, 2); scene.add(pl1);
    const pl2 = new THREE.PointLight(0x06b6d4, 10, 7); pl2.position.set(-3, -1, 1); scene.add(pl2);
    const pl3 = new THREE.PointLight(0x8b5cf6, 7, 6); pl3.position.set(1, -3, -1); scene.add(pl3);

    // Chrome orb — tight reflective sphere
    const orbGeo = new THREE.SphereGeometry(0.72, isMobile ? 32 : 64, isMobile ? 32 : 64);
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0x0d1f5c, emissive: 0x091540, emissiveIntensity: 0.6,
      metalness: 1.0, roughness: 0.02,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    scene.add(orb);

    // Outer glow shell — additive
    const glowGeo = new THREE.SphereGeometry(0.82, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6, transparent: true, opacity: 0.06,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.BackSide,
    });
    scene.add(new THREE.Mesh(glowGeo, glowMat));

    // Equatorial ring — single bright line
    const eqGeo = new THREE.TorusGeometry(0.82, 0.004, 4, 128);
    const eqMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa, transparent: true, opacity: 0.9,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const eqRing = new THREE.Mesh(eqGeo, eqMat);
    scene.add(eqRing);

    // Data shards dissolving away from orb (InstancedMesh)
    const shardN = isMobile ? 12 : 22;
    const shardGeo = new THREE.TetrahedronGeometry(0.055, 0);
    const shardMat = new THREE.MeshStandardMaterial({
      color: 0x93c5fd, emissive: 0x2563eb, emissiveIntensity: 3,
      metalness: 0.9, roughness: 0.1, transparent: true, opacity: 0.85,
    });
    const shardMesh = new THREE.InstancedMesh(shardGeo, shardMat, shardN);
    shardMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(shardMesh);
    const dummy = new THREE.Object3D();
    const shardData = Array.from({ length: shardN }, (_, i) => ({
      phi: Math.acos(2 * Math.random() - 1),
      theta: Math.random() * Math.PI * 2,
      r: 1.0 + Math.random() * 1.4,
      speed: 0.004 + Math.random() * 0.006,
      drift: Math.random() * Math.PI * 2,
    }));

    // Thin latitude rings (5 planes)
    const latGroup = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const lrg = new THREE.TorusGeometry(0.82, 0.0025, 3, 96);
      const lrm = new THREE.MeshBasicMaterial({
        color: i === 2 ? 0x38bdf8 : 0x1d4ed8, transparent: true,
        opacity: i === 2 ? 0.5 : 0.18,
        blending: THREE.AdditiveBlending, depthWrite: false,
      });
      const lr = new THREE.Mesh(lrg, lrm);
      lr.rotation.x = (i / 5) * Math.PI;
      latGroup.add(lr);
    }
    scene.add(latGroup);

    // Fine dust (additive points)
    const dustN = isMobile ? 100 : 200;
    const dustPos = new Float32Array(dustN * 3);
    for (let i = 0; i < dustN; i++) {
      const r = 1.2 + Math.random() * 2.5;
      const p = Math.acos(2 * Math.random() - 1), t2 = Math.random() * Math.PI * 2;
      dustPos[i*3] = r*Math.sin(p)*Math.cos(t2); dustPos[i*3+1] = r*Math.cos(p); dustPos[i*3+2] = r*Math.sin(p)*Math.sin(t2);
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    scene.add(new THREE.Points(dustGeo, new THREE.PointsMaterial({
      color: 0x93c5fd, size: 0.018, sizeAttenuation: true,
      transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false,
    })));

    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => { mx = (e.clientX/window.innerWidth - 0.5)*0.5; my = (e.clientY/window.innerHeight - 0.5)*0.35; };
    if (!isMobile) window.addEventListener("mousemove", onMouse);

    return stopLoop(renderer, scene, camera, (t) => {
      orb.rotation.y = t * 0.08;
      eqRing.rotation.y = t * 0.18;
      eqRing.rotation.x = Math.sin(t * 0.3) * 0.1;
      eqMat.opacity = 0.7 + 0.25 * Math.sin(t * 1.8);
      latGroup.rotation.y = t * 0.14;
      orbMat.emissiveIntensity = 0.5 + 0.25 * Math.sin(t * 1.2);

      shardData.forEach((s, i) => {
        s.theta += s.speed;
        const wave = 1 + 0.18 * Math.sin(t * 0.6 + s.drift);
        const r = s.r * wave;
        dummy.position.set(
          r * Math.sin(s.phi) * Math.cos(s.theta),
          r * Math.cos(s.phi),
          r * Math.sin(s.phi) * Math.sin(s.theta),
        );
        dummy.rotation.set(t*0.7+i, t*0.5+i*0.8, t*0.3+i*0.4);
        dummy.updateMatrix();
        shardMesh.setMatrixAt(i, dummy.matrix);
      });
      shardMesh.instanceMatrix.needsUpdate = true;

      camera.position.x += (mx*0.6 - camera.position.x) * 0.04;
      camera.position.y += (-my*0.6 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
    }, () => {
      window.removeEventListener("mousemove", onMouse); stopResize();
      orbGeo.dispose(); orbMat.dispose(); glowGeo.dispose(); glowMat.dispose();
      eqGeo.dispose(); eqMat.dispose(); shardGeo.dispose(); shardMat.dispose();
      dustGeo.dispose();
    });
  },

  // ── E-commerce — luxury gold crystalline gem rotating in dark space ──────────
  "ecommerce": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = makeRenderer(THREE, canvas, isMobile, 3.8);

    scene.fog = new THREE.FogExp2(0x020906, 0.055);
    scene.add(new THREE.AmbientLight(0x0a1a10, 1.8));
    const pl1 = new THREE.PointLight(0x10b981, 14, 9); pl1.position.set(2, 3, 2); scene.add(pl1);
    const pl2 = new THREE.PointLight(0x34d399, 10, 7); pl2.position.set(-2, -2, 1); scene.add(pl2);
    const pl3 = new THREE.PointLight(0xfbbf24, 6, 6); pl3.position.set(0, 2, -2); scene.add(pl3);

    // Large faceted gem — icosahedron as centerpiece
    const gemGeo = new THREE.IcosahedronGeometry(0.78, isMobile ? 1 : 2);
    const gemMat = new THREE.MeshStandardMaterial({
      color: 0x064e3b, emissive: 0x059669, emissiveIntensity: 0.8,
      metalness: 1.0, roughness: 0.0, transparent: true, opacity: 0.92,
    });
    const gem = new THREE.Mesh(gemGeo, gemMat);
    scene.add(gem);

    // Gem inner glow (smaller sphere, additive)
    const igGeo = new THREE.SphereGeometry(0.55, 12, 12);
    const igMat = new THREE.MeshBasicMaterial({
      color: 0x34d399, transparent: true, opacity: 0.12,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const innerGlow = new THREE.Mesh(igGeo, igMat);
    scene.add(innerGlow);

    // Outer bloom sphere
    const bgGeo = new THREE.SphereGeometry(1.05, 12, 12);
    const bgMat = new THREE.MeshBasicMaterial({
      color: 0x059669, transparent: true, opacity: 0.05,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.BackSide,
    });
    scene.add(new THREE.Mesh(bgGeo, bgMat));

    // Two precision orbit rings
    const ring1Geo = new THREE.TorusGeometry(1.22, 0.005, 4, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x6ee7b7, transparent: true, opacity: 0.7,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3; scene.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.55, 0.003, 4, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x10b981, transparent: true, opacity: 0.45,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4; ring2.rotation.z = Math.PI / 5; scene.add(ring2);

    // Orbiting tiny gems (InstancedMesh)
    const microN = isMobile ? 10 : 18;
    const microGeo = new THREE.OctahedronGeometry(0.062, 0);
    const microMat = new THREE.MeshStandardMaterial({
      color: 0x6ee7b7, emissive: 0x059669, emissiveIntensity: 2.5,
      metalness: 1.0, roughness: 0.0,
    });
    const microInst = new THREE.InstancedMesh(microGeo, microMat, microN);
    microInst.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(microInst);
    const dummy = new THREE.Object3D();
    const microData = Array.from({ length: microN }, (_, i) => ({
      ang: (i / microN) * Math.PI * 2,
      r: i % 2 === 0 ? 1.22 : 1.55,
      tilt: i % 2 === 0 ? Math.PI / 3 : -Math.PI / 4,
      tz: i % 2 === 0 ? 0 : Math.PI / 5,
      speed: 0.007 + (i % 3) * 0.002,
    }));

    // Sparkle dust
    const sparkN = isMobile ? 70 : 140;
    const sparkPos = new Float32Array(sparkN * 3).map(() => (Math.random()-0.5)*5);
    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPos, 3));
    scene.add(new THREE.Points(sparkGeo, new THREE.PointsMaterial({
      color: 0x6ee7b7, size: 0.02, sizeAttenuation: true,
      transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false,
    })));

    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => { mx = (e.clientX/window.innerWidth-0.5)*0.5; my = -(e.clientY/window.innerHeight-0.5)*0.35; };
    if (!isMobile) window.addEventListener("mousemove", onMouse);

    return stopLoop(renderer, scene, camera, (t) => {
      gem.rotation.y = t * 0.22;
      gem.rotation.x = t * 0.1 + Math.sin(t * 0.4) * 0.08;
      const pulse = 1 + 0.06 * Math.sin(t * 2);
      innerGlow.scale.setScalar(pulse);
      igMat.opacity = 0.1 + 0.07 * Math.sin(t * 2);
      gemMat.emissiveIntensity = 0.7 + 0.4 * Math.sin(t * 1.5);

      ring1.rotation.y = t * 0.3;
      ring2.rotation.y = -t * 0.22;
      ring1Mat.opacity = 0.6 + 0.2 * Math.sin(t * 1.2);

      microData.forEach((m, i) => {
        m.ang += m.speed;
        const ca = Math.cos(m.tilt), sa = Math.sin(m.tilt);
        const cz = Math.cos(m.tz), sz = Math.sin(m.tz);
        const x0 = Math.cos(m.ang) * m.r, y0 = Math.sin(m.ang) * m.r;
        dummy.position.set(x0 * cz - y0 * 0, x0 * ca * sz + y0 * ca, -x0 * sa);
        dummy.rotation.set(t + i, t * 0.7 + i, 0);
        dummy.updateMatrix();
        microInst.setMatrixAt(i, dummy.matrix);
      });
      microInst.instanceMatrix.needsUpdate = true;

      camera.position.x += (mx - camera.position.x) * 0.04;
      camera.position.y += (my - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
    }, () => {
      window.removeEventListener("mousemove", onMouse); stopResize();
      gemGeo.dispose(); gemMat.dispose(); igGeo.dispose(); igMat.dispose();
      bgGeo.dispose(); bgMat.dispose();
      ring1Geo.dispose(); ring1Mat.dispose(); ring2Geo.dispose(); ring2Mat.dispose();
      microGeo.dispose(); microMat.dispose(); sparkGeo.dispose();
    });
  },

  // ── Mobilne aplikacije — clean phone silhouette + live UI signals ────────────
  "mobile-app": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = makeRenderer(THREE, canvas, isMobile, 3.5);

    scene.fog = new THREE.FogExp2(0x02040f, 0.065);
    scene.add(new THREE.AmbientLight(0x050515, 2));
    const pl1 = new THREE.PointLight(0x6366f1, 14, 7); pl1.position.set(1, 2, 2); scene.add(pl1);
    const pl2 = new THREE.PointLight(0x8b5cf6, 8, 5); pl2.position.set(-2, -1, 1); scene.add(pl2);

    // Phone body — clean box with rounded feel from lighting
    const bodyGeo = new THREE.BoxGeometry(0.3, 0.58, 0.05);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0f0f23, emissive: 0x1e1b4b, emissiveIntensity: 0.4,
      metalness: 0.95, roughness: 0.04,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    scene.add(body);

    // Screen — bright glow quad
    const scrGeo = new THREE.PlaneGeometry(0.24, 0.46);
    const scrMat = new THREE.MeshBasicMaterial({
      color: 0x4f46e5, transparent: true, opacity: 0.5,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const screen = new THREE.Mesh(scrGeo, scrMat);
    screen.position.z = 0.028; scene.add(screen);

    // UI elements — 3 horizontal bars (simulates app interface)
    const barGroup = new THREE.Group();
    barGroup.position.z = 0.03;
    const uiBars = [
      { w: 0.16, h: 0.015, y: 0.1, c: 0x818cf8 },
      { w: 0.10, h: 0.015, y: 0.06, c: 0xa5b4fc },
      { w: 0.13, h: 0.015, y: 0.02, c: 0x6366f1 },
      { w: 0.08, h: 0.015, y: -0.02, c: 0x818cf8 },
    ];
    const uiMeshes: { mesh: ThreeTypes.Mesh; mat: ThreeTypes.MeshBasicMaterial }[] = [];
    uiBars.forEach(({ w, h, y, c }) => {
      const bg = new THREE.PlaneGeometry(w, h);
      const bm = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false });
      const bMesh = new THREE.Mesh(bg, bm);
      bMesh.position.y = y;
      barGroup.add(bMesh);
      uiMeshes.push({ mesh: bMesh, mat: bm });
    });
    scene.add(barGroup);

    // Signal halos — expanding rings
    const haloN = isMobile ? 5 : 7;
    const halos: { mesh: ThreeTypes.Mesh; mat: ThreeTypes.MeshBasicMaterial; phase: number }[] = [];
    for (let i = 0; i < haloN; i++) {
      const hg = new THREE.RingGeometry(0.02, 0.04, 72);
      const hm = new THREE.MeshBasicMaterial({
        color: 0x818cf8, transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
      });
      const hMesh = new THREE.Mesh(hg, hm);
      scene.add(hMesh);
      halos.push({ mesh: hMesh, mat: hm, phase: (i / haloN) * Math.PI * 2 });
    }

    // Floating data dots (small particles around phone)
    const dotN = isMobile ? 50 : 90;
    const dotPos = new Float32Array(dotN * 3);
    for (let i = 0; i < dotN; i++) {
      dotPos[i*3]   = (Math.random()-0.5) * 3.5;
      dotPos[i*3+1] = (Math.random()-0.5) * 4;
      dotPos[i*3+2] = (Math.random()-0.5) * 2;
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPos, 3));
    scene.add(new THREE.Points(dotGeo, new THREE.PointsMaterial({
      color: 0x6366f1, size: 0.018, sizeAttenuation: true,
      transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending, depthWrite: false,
    })));

    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => { mx = (e.clientX/window.innerWidth-0.5)*0.7; my = -(e.clientY/window.innerHeight-0.5)*0.5; };
    if (!isMobile) window.addEventListener("mousemove", onMouse);

    return stopLoop(renderer, scene, camera, (t) => {
      body.rotation.y = mx * 0.8 + Math.sin(t * 0.35) * 0.1;
      body.rotation.x = my * 0.5;
      screen.rotation.copy(body.rotation);
      barGroup.rotation.copy(body.rotation);
      scrMat.opacity = 0.4 + 0.15 * Math.sin(t * 2);

      uiMeshes.forEach(({ mat }, i) => {
        mat.opacity = 0.5 + 0.3 * Math.sin(t * 1.5 + i * 0.8);
      });

      halos.forEach(({ mesh, mat, phase }) => {
        const p = ((t * 0.45 + phase / (Math.PI * 2)) % 1);
        mesh.scale.setScalar(p * 3.5);
        mat.opacity = (1 - p) * 0.6;
      });

      camera.position.x += (mx * 0.3 - camera.position.x) * 0.05;
      camera.lookAt(0, 0, 0);
    }, () => {
      window.removeEventListener("mousemove", onMouse); stopResize();
      bodyGeo.dispose(); bodyMat.dispose(); scrGeo.dispose(); scrMat.dispose();
      dotGeo.dispose();
    });
  },

  // ── CMS — double helix DNA in electric cyan + violet ───────────────────────
  "cms": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = makeRenderer(THREE, canvas, isMobile, 4.2);

    scene.fog = new THREE.FogExp2(0x010a08, 0.05);
    scene.add(new THREE.AmbientLight(0x01120a, 2));
    const pl1 = new THREE.PointLight(0x06b6d4, 12, 8); pl1.position.set(2, 2, 1); scene.add(pl1);
    const pl2 = new THREE.PointLight(0x8b5cf6, 8, 7); pl2.position.set(-2, -2, 1); scene.add(pl2);
    const pl3 = new THREE.PointLight(0x10b981, 5, 5); pl3.position.set(0, 0, 3); scene.add(pl3);

    const count = isMobile ? 30 : 54;
    const height = 3.6;
    const R = 0.62;

    // Strand A — cyan
    const nodeGeoA = new THREE.SphereGeometry(0.068, isMobile ? 7 : 12, isMobile ? 7 : 12);
    const matA = new THREE.MeshStandardMaterial({
      color: 0x06b6d4, emissive: 0x0891b2, emissiveIntensity: 2.8,
      metalness: 0.6, roughness: 0.15,
    });
    const strandA = new THREE.InstancedMesh(nodeGeoA, matA, count);
    strandA.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(strandA);

    // Strand B — violet
    const nodeGeoB = new THREE.SphereGeometry(0.068, isMobile ? 7 : 12, isMobile ? 7 : 12);
    const matB = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6, emissive: 0x7c3aed, emissiveIntensity: 2.8,
      metalness: 0.6, roughness: 0.15,
    });
    const strandB = new THREE.InstancedMesh(nodeGeoB, matB, count);
    strandB.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(strandB);

    // Rungs — flat cylinders
    const rungGeo = new THREE.CylinderGeometry(0.008, 0.008, 1, isMobile ? 4 : 6);
    const rungMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee, transparent: true, opacity: 0.35,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const rungs = new THREE.InstancedMesh(rungGeo, rungMat, count);
    rungs.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(rungs);

    // Axis glow
    const axGeo = new THREE.CylinderGeometry(0.006, 0.006, height, 4);
    const axMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, transparent: true, opacity: 0.15,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    scene.add(new THREE.Mesh(axGeo, axMat));

    // Floating particles
    const ptN = isMobile ? 55 : 110;
    const ptPos = new Float32Array(ptN * 3);
    for (let i = 0; i < ptN; i++) {
      ptPos[i*3] = (Math.random()-0.5)*2.2; ptPos[i*3+1] = (Math.random()-0.5)*height; ptPos[i*3+2] = (Math.random()-0.5)*2.2;
    }
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute("position", new THREE.BufferAttribute(ptPos, 3));
    scene.add(new THREE.Points(ptGeo, new THREE.PointsMaterial({
      color: 0x67e8f9, size: 0.02, sizeAttenuation: true,
      transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false,
    })));

    const dummy = new THREE.Object3D();
    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => { mx = (e.clientX/window.innerWidth-0.5)*0.5; my = -(e.clientY/window.innerHeight-0.5)*0.3; };
    if (!isMobile) window.addEventListener("mousemove", onMouse);

    return stopLoop(renderer, scene, camera, (t) => {
      matA.emissiveIntensity = 2.4 + 0.8 * Math.sin(t * 1.3);
      matB.emissiveIntensity = 2.4 + 0.8 * Math.cos(t * 1.3);
      rungMat.opacity = 0.28 + 0.14 * Math.abs(Math.sin(t * 0.7));

      for (let i = 0; i < count; i++) {
        const frac = i / count;
        const angle = frac * Math.PI * 4 + t * 0.6;
        const y = (frac - 0.5) * height;
        const pulse = 0.8 + 0.35 * Math.abs(Math.sin(t * 1.5 + i * 0.22));

        dummy.position.set(Math.cos(angle) * R, y, Math.sin(angle) * R);
        dummy.scale.setScalar(pulse); dummy.updateMatrix();
        strandA.setMatrixAt(i, dummy.matrix);

        dummy.position.set(-Math.cos(angle) * R, y, -Math.sin(angle) * R);
        dummy.scale.setScalar(pulse); dummy.updateMatrix();
        strandB.setMatrixAt(i, dummy.matrix);

        dummy.position.set(0, y, 0);
        dummy.rotation.set(0, -angle - Math.PI/2, Math.PI/2);
        dummy.scale.setScalar(1); dummy.updateMatrix();
        rungs.setMatrixAt(i, dummy.matrix);
      }
      strandA.instanceMatrix.needsUpdate = true;
      strandB.instanceMatrix.needsUpdate = true;
      rungs.instanceMatrix.needsUpdate = true;

      scene.rotation.y = t * 0.16 + mx * 0.5;
      scene.rotation.x = my * 0.22;
    }, () => {
      window.removeEventListener("mousemove", onMouse); stopResize();
      nodeGeoA.dispose(); matA.dispose(); nodeGeoB.dispose(); matB.dispose();
      rungGeo.dispose(); rungMat.dispose(); axGeo.dispose(); axMat.dispose(); ptGeo.dispose();
    });
  },

  // ── AI — layered neural rings with flowing signal particles ─────────────────
  "ai": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = makeRenderer(THREE, canvas, isMobile, 4.5);

    scene.fog = new THREE.FogExp2(0x05020f, 0.045);
    scene.add(new THREE.AmbientLight(0x0d0022, 2));
    const pl1 = new THREE.PointLight(0xa855f7, 14, 9); pl1.position.set(0, 2, 2); scene.add(pl1);
    const pl2 = new THREE.PointLight(0x7c3aed, 8, 7); pl2.position.set(-2, -1, 1); scene.add(pl2);
    const pl3 = new THREE.PointLight(0xec4899, 5, 5); pl3.position.set(2, -2, -1); scene.add(pl3);

    const layers = isMobile ? [2, 3, 3, 2] : [3, 5, 5, 3];
    const totalNodes = layers.reduce((a, b) => a + b, 0);

    // Nodes
    const nodeGeo = new THREE.SphereGeometry(0.1, isMobile ? 8 : 16, isMobile ? 8 : 16);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xd946ef, emissive: 0xa21caf, emissiveIntensity: 2.5,
      metalness: 0.8, roughness: 0.1,
    });
    const nodeInst = new THREE.InstancedMesh(nodeGeo, nodeMat, totalNodes);
    nodeInst.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(nodeInst);

    // Glow halos per node
    const haloGeo = new THREE.SphereGeometry(0.2, 7, 7);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xc026d3, transparent: true, opacity: 0.07,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const haloInst = new THREE.InstancedMesh(haloGeo, haloMat, totalNodes);
    haloInst.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(haloInst);

    const nodePos: ThreeTypes.Vector3[] = [];
    const dummy = new THREE.Object3D();
    let ni = 0;
    layers.forEach((cnt, li) => {
      for (let i = 0; i < cnt; i++) {
        const v = new THREE.Vector3((li - layers.length/2 + 0.5) * 1.1, (i - cnt/2 + 0.5) * 0.72, 0);
        nodePos.push(v);
        dummy.position.copy(v); dummy.scale.setScalar(1); dummy.updateMatrix();
        nodeInst.setMatrixAt(ni, dummy.matrix);
        haloInst.setMatrixAt(ni++, dummy.matrix);
      }
    });
    nodeInst.instanceMatrix.needsUpdate = true;
    haloInst.instanceMatrix.needsUpdate = true;

    // Connections — bright additive lines
    const connPts: number[] = [];
    let ls = 0;
    for (let li = 0; li < layers.length - 1; li++) {
      const ns = ls + layers[li];
      for (let a = 0; a < layers[li]; a++)
        for (let b = 0; b < layers[li+1]; b++) {
          const pa = nodePos[ls+a], pb = nodePos[ns+b];
          connPts.push(pa.x,pa.y,pa.z, pb.x,pb.y,pb.z);
        }
      ls += layers[li];
    }
    const connGeo = new THREE.BufferGeometry();
    connGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(connPts), 3));
    scene.add(new THREE.LineSegments(connGeo, new THREE.LineBasicMaterial({
      color: 0x9333ea, transparent: true, opacity: 0.3,
      blending: THREE.AdditiveBlending,
    })));

    // Flowing signal particles
    const flowN = isMobile ? 40 : 80;
    const flowGeo = new THREE.BufferGeometry();
    const flowPos = new Float32Array(flowN * 3);
    const flowProg = new Float32Array(flowN).map(() => Math.random());
    const flowConn = new Uint16Array(flowN).map(() => Math.floor(Math.random() * (connPts.length / 6)));
    flowGeo.setAttribute("position", new THREE.BufferAttribute(flowPos, 3));
    scene.add(new THREE.Points(flowGeo, new THREE.PointsMaterial({
      color: 0xe879f9, size: 0.055, sizeAttenuation: true,
      transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false,
    })));

    // Ambient dust
    const dustN = isMobile ? 60 : 120;
    const dustPos = new Float32Array(dustN * 3).map(() => (Math.random()-0.5)*5.5);
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    scene.add(new THREE.Points(dustGeo, new THREE.PointsMaterial({
      color: 0xa855f7, size: 0.015, sizeAttenuation: true,
      transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false,
    })));

    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => { mx = (e.clientX/window.innerWidth-0.5)*0.4; my = -(e.clientY/window.innerHeight-0.5)*0.3; };
    if (!isMobile) window.addEventListener("mousemove", onMouse);

    return stopLoop(renderer, scene, camera, (t) => {
      nodeMat.emissiveIntensity = 2.2 + 0.8 * Math.sin(t * 1.1);
      for (let i = 0; i < totalNodes; i++) {
        const s = 0.7 + 0.45 * Math.abs(Math.sin(t * 1.4 + i * 0.65));
        dummy.position.copy(nodePos[i]); dummy.scale.setScalar(s); dummy.updateMatrix();
        nodeInst.setMatrixAt(i, dummy.matrix);
        dummy.scale.setScalar(s * 1.5 + 0.2 * Math.sin(t * 2.2 + i)); dummy.updateMatrix();
        haloInst.setMatrixAt(i, dummy.matrix);
      }
      nodeInst.instanceMatrix.needsUpdate = true;
      haloInst.instanceMatrix.needsUpdate = true;

      const posAttr = flowGeo.attributes.position as ThreeTypes.BufferAttribute;
      for (let i = 0; i < flowN; i++) {
        flowProg[i] += 0.014;
        if (flowProg[i] > 1) { flowProg[i] = 0; flowConn[i] = Math.floor(Math.random() * (connPts.length/6)); }
        const ci = flowConn[i] * 6; const p = flowProg[i];
        posAttr.setXYZ(i,
          connPts[ci]+(connPts[ci+3]-connPts[ci])*p,
          connPts[ci+1]+(connPts[ci+4]-connPts[ci+1])*p,
          connPts[ci+2]+(connPts[ci+5]-connPts[ci+2])*p
        );
      }
      posAttr.needsUpdate = true;

      scene.rotation.y = mx * 0.5 + Math.sin(t * 0.2) * 0.1;
      scene.rotation.x = my * 0.3;
    }, () => {
      window.removeEventListener("mousemove", onMouse); stopResize();
      nodeGeo.dispose(); nodeMat.dispose(); haloGeo.dispose(); haloMat.dispose();
      connGeo.dispose(); flowGeo.dispose(); dustGeo.dispose();
    });
  },

  // ── SEO — rotating radar with neon sweep + pulsing data columns ─────────────
  "seo": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = makeRenderer(THREE, canvas, isMobile, 4.8);
    camera.position.set(0, 2.5, 4.8); camera.lookAt(0, 0, 0);

    scene.fog = new THREE.FogExp2(0x010a03, 0.04);
    scene.add(new THREE.AmbientLight(0x02150a, 2));
    const pl1 = new THREE.PointLight(0x22c55e, 12, 9); pl1.position.set(0, 3.5, 1); scene.add(pl1);
    const pl2 = new THREE.PointLight(0x16a34a, 6, 6); pl2.position.set(-2, 1, 2); scene.add(pl2);

    // Concentric radar rings (5 rings)
    const ringMats: ThreeTypes.MeshBasicMaterial[] = [];
    for (let i = 1; i <= 5; i++) {
      const rg = new THREE.RingGeometry(i*0.46 - 0.004, i*0.46 + 0.004, 100);
      const rm = new THREE.MeshBasicMaterial({
        color: 0x16a34a, transparent: true, opacity: 0.15 + i*0.025,
        blending: THREE.AdditiveBlending, depthWrite: false,
      });
      const ring = new THREE.Mesh(rg, rm);
      ring.rotation.x = -Math.PI/2; scene.add(ring);
      ringMats.push(rm);
    }

    // Cross-hairs
    const lines = [
      [-2.35, 0, 0, 2.35, 0, 0],
      [0, 0, -2.35, 0, 0, 2.35],
    ];
    const chPts = new Float32Array(lines.flat());
    const chGeo = new THREE.BufferGeometry();
    chGeo.setAttribute("position", new THREE.BufferAttribute(chPts, 3));
    chGeo.setIndex([0,1,2,3]);
    scene.add(new THREE.LineSegments(chGeo, new THREE.LineBasicMaterial({
      color: 0x15803d, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending,
    })));

    // Sweep sector
    const sweepGeo = new THREE.CircleGeometry(2.35, 100, 0, Math.PI / 5.5);
    const sweepMat = new THREE.MeshBasicMaterial({
      color: 0x22c55e, transparent: true, opacity: 0.1,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
    });
    const sweep = new THREE.Mesh(sweepGeo, sweepMat);
    sweep.rotation.x = -Math.PI/2; scene.add(sweep);

    // Sweep leading edge (bright line)
    const edgeGeo = new THREE.CircleGeometry(2.35, 100, -0.025, 0.055);
    const edgeMat = new THREE.MeshBasicMaterial({
      color: 0x4ade80, transparent: true, opacity: 0.65,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
    });
    const sweepEdge = new THREE.Mesh(edgeGeo, edgeMat);
    sweepEdge.rotation.x = -Math.PI/2; scene.add(sweepEdge);

    // Blip dots (InstancedMesh)
    const blipN = isMobile ? 14 : 26;
    const blipGeo = new THREE.SphereGeometry(0.052, isMobile ? 6 : 10, isMobile ? 6 : 10);
    const blipMat = new THREE.MeshStandardMaterial({
      color: 0x4ade80, emissive: 0x16a34a, emissiveIntensity: 3,
      metalness: 0.4, roughness: 0.25,
    });
    const blipInst = new THREE.InstancedMesh(blipGeo, blipMat, blipN);
    blipInst.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(blipInst);
    const blipDummy = new THREE.Object3D();
    const blipData = Array.from({ length: blipN }, () => ({
      ang: Math.random()*Math.PI*2, r: 0.3 + Math.random()*1.9, h: 0.02 + Math.random()*0.3, blip: 0,
    }));

    // Data bars (rising from ground plane)
    const barN = isMobile ? 10 : 16;
    const barGeo = new THREE.BoxGeometry(0.095, 1, 0.095);
    const bars: { mesh: ThreeTypes.Mesh; mat: ThreeTypes.MeshStandardMaterial; target: number; ph: number }[] = [];
    for (let i = 0; i < barN; i++) {
      const hue = 0.33 + (i/barN)*0.12;
      const bm = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(hue, 1, 0.45),
        emissive: new THREE.Color().setHSL(hue, 1, 0.28),
        emissiveIntensity: 1.8, metalness: 0.3, roughness: 0.2,
      });
      const m = new THREE.Mesh(barGeo, bm);
      m.position.set((i - barN/2) * 0.24, 0, -1.8);
      scene.add(m);
      bars.push({ mesh: m, mat: bm, target: 0.3 + Math.random()*1.5, ph: Math.random()*Math.PI*2 });
    }

    // Dust
    const dustN = isMobile ? 60 : 110;
    const dustPos = new Float32Array(dustN * 3).map(() => (Math.random()-0.5)*5);
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    scene.add(new THREE.Points(dustGeo, new THREE.PointsMaterial({
      color: 0x86efac, size: 0.015, sizeAttenuation: true,
      transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false,
    })));

    let sweepAngle = 0;
    return stopLoop(renderer, scene, camera, (t) => {
      sweepAngle += 0.025;
      sweep.rotation.y = sweepAngle;
      sweepEdge.rotation.y = sweepAngle;
      edgeMat.opacity = 0.55 + 0.15 * Math.sin(t * 4);
      const sweepPos = sweepAngle % (Math.PI*2);

      ringMats.forEach((rm, i) => { rm.opacity = 0.12 + 0.08 * Math.sin(t*0.5 + i*0.7); });

      blipData.forEach((b, i) => {
        const diff = (sweepPos - b.ang + Math.PI*4) % (Math.PI*2);
        if (diff < 0.22) b.blip = 1;
        b.blip *= 0.93;
        blipDummy.position.set(Math.cos(b.ang)*b.r, b.h + Math.sin(t*0.5+i)*0.06, Math.sin(b.ang)*b.r);
        blipDummy.scale.setScalar(0.6 + b.blip * 1.5);
        blipDummy.updateMatrix(); blipInst.setMatrixAt(i, blipDummy.matrix);
      });
      blipInst.instanceMatrix.needsUpdate = true;
      blipMat.emissiveIntensity = 2.5 + Math.sin(t*1.5)*0.8;

      bars.forEach(({ mesh, mat, target, ph }, i) => {
        const h = target * (0.6 + 0.4*Math.sin(t*0.7 + ph));
        mesh.scale.y = h; mesh.position.y = h*0.5 - 0.5;
        mat.emissiveIntensity = 1.4 + 0.7*Math.sin(t*1.2 + i*0.4);
      });
    }, () => {
      stopResize();
      sweepGeo.dispose(); sweepMat.dispose(); edgeGeo.dispose(); edgeMat.dispose();
      blipGeo.dispose(); blipMat.dispose(); barGeo.dispose(); chGeo.dispose(); dustGeo.dispose();
    });
  },

  // ── Cyber security — torusknot core + wireframe icosphere shields ───────────
  "security": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = makeRenderer(THREE, canvas, isMobile, 4);

    scene.fog = new THREE.FogExp2(0x0c0002, 0.05);
    scene.add(new THREE.AmbientLight(0x1a0005, 2));
    const pl1 = new THREE.PointLight(0xef4444, 14, 8); pl1.position.set(0, 2.5, 2); scene.add(pl1);
    const pl2 = new THREE.PointLight(0xf97316, 8, 6); pl2.position.set(-2, -1, 1); scene.add(pl2);
    const pl3 = new THREE.PointLight(0xfb7185, 5, 5); pl3.position.set(2, -2, -1); scene.add(pl3);

    // TorusKnot core — the centrepiece
    const knotGeo = new THREE.TorusKnotGeometry(0.35, 0.1, isMobile ? 64 : 128, isMobile ? 8 : 14);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0xef4444, emissive: 0xdc2626, emissiveIntensity: 2.2,
      metalness: 1.0, roughness: 0.04,
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    scene.add(knot);

    // Knot outer glow
    const kGlowGeo = new THREE.TorusKnotGeometry(0.46, 0.16, isMobile ? 40 : 80, 6);
    const kGlowMat = new THREE.MeshBasicMaterial({
      color: 0xef4444, transparent: true, opacity: 0.05,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    scene.add(new THREE.Mesh(kGlowGeo, kGlowMat));

    // Icosphere shields (wireframe)
    const shieldData = [
      { r: 1.45, color: 0xf87171, opacity: 0.18, speed: 0.18 },
      { r: 1.1,  color: 0xfb923c, opacity: 0.22, speed: -0.3 },
      { r: 0.78, color: 0xfbbf24, opacity: 0.28, speed: 0.46 },
    ];
    const shields = shieldData.map(({ r, color, opacity, speed }, i) => {
      const sg = new THREE.IcosahedronGeometry(r, isMobile ? 1 : 2);
      const sm = new THREE.MeshBasicMaterial({
        color, wireframe: true, transparent: true, opacity,
        blending: THREE.AdditiveBlending, depthWrite: false,
      });
      const m = new THREE.Mesh(sg, sm);
      scene.add(m);
      return { m, sm, speed, i };
    });

    // Scan ring — horizontal, oscillates vertically
    const scanGeo = new THREE.TorusGeometry(1.6, 0.007, 4, 100);
    const scanMat = new THREE.MeshBasicMaterial({
      color: 0xf87171, transparent: true, opacity: 0.75,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const scanRing = new THREE.Mesh(scanGeo, scanMat);
    scene.add(scanRing);

    // Alert particles
    const ptN = isMobile ? 50 : 90;
    const ptPos = new Float32Array(ptN * 3).map(() => (Math.random()-0.5)*5);
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute("position", new THREE.BufferAttribute(ptPos, 3));
    scene.add(new THREE.Points(ptGeo, new THREE.PointsMaterial({
      color: 0xfca5a5, size: 0.022, sizeAttenuation: true,
      transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false,
    })));

    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => { mx = (e.clientX/window.innerWidth-0.5)*0.5; my = -(e.clientY/window.innerHeight-0.5)*0.4; };
    if (!isMobile) window.addEventListener("mousemove", onMouse);

    return stopLoop(renderer, scene, camera, (t) => {
      knot.rotation.x = t * 0.5;
      knot.rotation.y = t * 0.65;
      knotMat.emissiveIntensity = 1.8 + 0.7 * Math.sin(t * 2.8);

      shields.forEach(({ m, sm, speed, i }) => {
        m.rotation.y = t * speed;
        m.rotation.x = t * speed * 0.5;
        sm.opacity = shieldData[i].opacity * (0.65 + 0.4 * Math.sin(t * 1.3 + i));
      });

      scanRing.position.y = Math.sin(t * 1.3) * 1.1;
      scanMat.opacity = 0.5 + 0.35 * Math.abs(Math.cos(t * 1.3));

      scene.rotation.y = mx * 0.5;
      scene.rotation.x = my * 0.3;
    }, () => {
      window.removeEventListener("mousemove", onMouse); stopResize();
      knotGeo.dispose(); knotMat.dispose(); kGlowGeo.dispose(); kGlowMat.dispose();
      scanGeo.dispose(); scanMat.dispose(); ptGeo.dispose();
    });
  },

  // ── UI/UX dizajn — morphing crystal with color-cycling + orbiting panels ─────
  "uiux": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = makeRenderer(THREE, canvas, isMobile, 4.2);

    scene.fog = new THREE.FogExp2(0x010f1a, 0.05);
    scene.add(new THREE.AmbientLight(0x021520, 2));
    const pl1 = new THREE.PointLight(0x0ea5e9, 14, 9); pl1.position.set(2, 2.5, 2); scene.add(pl1);
    const pl2 = new THREE.PointLight(0x06b6d4, 8, 7); pl2.position.set(-2, -1, 1); scene.add(pl2);
    const pl3 = new THREE.PointLight(0x8b5cf6, 5, 5); pl3.position.set(0, 2, -2); scene.add(pl3);

    // Morphing icosahedron core
    const detail = isMobile ? 2 : 4;
    const morphGeo = new THREE.IcosahedronGeometry(1.0, detail);
    const morphMat = new THREE.MeshStandardMaterial({
      color: 0x0369a1, emissive: 0x0ea5e9, emissiveIntensity: 0.8,
      metalness: 0.7, roughness: 0.12,
    });
    const morphMesh = new THREE.Mesh(morphGeo, morphMat);
    scene.add(morphMesh);

    // Wireframe overlay shell
    const wireGeo = new THREE.IcosahedronGeometry(1.08, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.12,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    scene.add(new THREE.Mesh(wireGeo, wireMat));

    // Inner glow bloom
    const bloomGeo = new THREE.SphereGeometry(0.88, 10, 10);
    const bloomMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9, transparent: true, opacity: 0.07,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const bloomSphere = new THREE.Mesh(bloomGeo, bloomMat);
    scene.add(bloomSphere);

    const posAttr = morphGeo.attributes.position as ThreeTypes.BufferAttribute;
    const origPos = new Float32Array(posAttr.array);

    // Orbiting design panels
    const cardN = isMobile ? 3 : 5;
    const cardGeo = new THREE.BoxGeometry(0.44, 0.28, 0.014);
    const cardMat = new THREE.MeshStandardMaterial({
      color: 0x0c4a6e, emissive: 0x0369a1, emissiveIntensity: 1.2,
      metalness: 0.9, roughness: 0.04, transparent: true, opacity: 0.82,
    });
    const cardInst = new THREE.InstancedMesh(cardGeo, cardMat, cardN);
    cardInst.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(cardInst);

    // Card glow border
    const cgGeo = new THREE.BoxGeometry(0.48, 0.31, 0.016);
    const cgMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, transparent: true, opacity: 0.07,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const cgInst = new THREE.InstancedMesh(cgGeo, cgMat, cardN);
    cgInst.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(cgInst);

    const cardDummy = new THREE.Object3D();
    const cardAngles = Array.from({ length: cardN }, (_, i) => (i/cardN)*Math.PI*2);
    const cardRadii  = Array.from({ length: cardN }, (_, i) => 1.65 + (i%2)*0.4);

    // Fine dust
    const dustN = isMobile ? 70 : 130;
    const dustPos = new Float32Array(dustN * 3).map(() => (Math.random()-0.5)*5.5);
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    scene.add(new THREE.Points(dustGeo, new THREE.PointsMaterial({
      color: 0x7dd3fc, size: 0.018, sizeAttenuation: true,
      transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false,
    })));

    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => { mx = (e.clientX/window.innerWidth-0.5)*0.4; my = -(e.clientY/window.innerHeight-0.5)*0.3; };
    if (!isMobile) window.addEventListener("mousemove", onMouse);

    return stopLoop(renderer, scene, camera, (t) => {
      // Vertex morph (desktop only)
      if (!isMobile) {
        for (let i = 0; i < posAttr.count; i++) {
          const ox = origPos[i*3], oy = origPos[i*3+1], oz = origPos[i*3+2];
          const n = Math.sin(ox*2 + t*0.6) * Math.cos(oy*1.8 + t*0.45) * 0.13;
          const len = Math.sqrt(ox*ox + oy*oy + oz*oz);
          posAttr.setXYZ(i, ox+(ox/len)*n, oy+(oy/len)*n, oz+(oz/len)*n);
        }
        posAttr.needsUpdate = true;
        morphGeo.computeVertexNormals();
      }

      // Smooth color cycle
      const hue = (t * 0.035) % 1;
      morphMat.color.setHSL(hue, 0.75, 0.35);
      morphMat.emissive.setHSL(hue, 0.85, 0.22);
      morphMat.emissiveIntensity = 0.8 + 0.4 * Math.sin(t * 1.2);
      bloomSphere.scale.setScalar(1 + 0.1 * Math.sin(t * 1.4));
      bloomMat.opacity = 0.06 + 0.04 * Math.sin(t * 1.4);
      pl1.color.setHSL(hue, 0.8, 0.5);

      morphMesh.rotation.y = t * 0.16 + mx * 0.4;
      morphMesh.rotation.x = t * 0.09 + my * 0.25;

      cardAngles.forEach((_, i) => {
        cardAngles[i] += (0.2 + i*0.05) * 0.013;
        const a = cardAngles[i];
        cardDummy.position.set(Math.cos(a)*cardRadii[i], Math.sin(a*0.5)*0.42, Math.sin(a)*cardRadii[i]);
        cardDummy.lookAt(0, 0, 0);
        cardDummy.updateMatrix();
        cardInst.setMatrixAt(i, cardDummy.matrix);
        cgInst.setMatrixAt(i, cardDummy.matrix);
      });
      cardInst.instanceMatrix.needsUpdate = true;
      cgInst.instanceMatrix.needsUpdate = true;
    }, () => {
      window.removeEventListener("mousemove", onMouse); stopResize();
      morphGeo.dispose(); morphMat.dispose(); wireGeo.dispose(); wireMat.dispose();
      bloomGeo.dispose(); bloomMat.dispose();
      cardGeo.dispose(); cardMat.dispose(); cgGeo.dispose(); cgMat.dispose();
      dustGeo.dispose();
    });
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeRenderer(THREE: typeof ThreeTypes, canvas: HTMLCanvasElement, isMobile: boolean, camZ = 3) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const w = canvas.clientWidth || 400;
  const h = canvas.clientHeight || 300;
  renderer.setSize(w, h, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(58, w / h, 0.1, 100);
  camera.position.z = camZ;

  const ro = new ResizeObserver(() => {
    const rw = canvas.clientWidth, rh = canvas.clientHeight;
    if (rw <= 0 || rh <= 0) return;
    renderer.setSize(rw, rh, false);
    camera.aspect = rw / rh;
    camera.updateProjectionMatrix();
  });
  ro.observe(canvas);

  return { renderer, scene, camera, stopResize: () => ro.disconnect() };
}

function stopLoop(
  renderer: ThreeTypes.WebGLRenderer,
  scene: ThreeTypes.Scene,
  camera: ThreeTypes.PerspectiveCamera,
  tick: (t: number) => void,
  extraDispose: () => void,
): () => void {
  let raf = 0;
  let t = 0;
  let active = true;

  const io = new IntersectionObserver(([e]) => { active = e.isIntersecting; }, { threshold: 0 });
  io.observe(renderer.domElement);

  (function animate() {
    raf = requestAnimationFrame(animate);
    if (!active) return;
    t += 0.016;
    tick(t);
    renderer.render(scene, camera);
  })();

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    renderer.dispose();
    extraDispose();
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

const DISPOSE_DELAY = 2000;

export function ServicesR3F() {
  useEffect(() => {
    const isMobile = window.matchMedia("(hover: none)").matches;
    let THREE: typeof ThreeTypes | null = null;

    const active = new Map<HTMLCanvasElement, { dispose: () => void; timer: ReturnType<typeof setTimeout> | null }>();

    function create(canvas: HTMLCanvasElement) {
      const existing = active.get(canvas);
      if (existing) {
        if (existing.timer !== null) clearTimeout(existing.timer);
        active.set(canvas, { dispose: existing.dispose, timer: null });
        return;
      }
      if (!THREE) return;
      const key = canvas.dataset.scene ?? "";
      const factory = SCENES[key];
      if (!factory) return;
      const dispose = factory(THREE, canvas, isMobile);
      active.set(canvas, { dispose, timer: null });
    }

    function scheduleDispose(canvas: HTMLCanvasElement) {
      const entry = active.get(canvas);
      if (!entry) return;
      if (entry.timer !== null) clearTimeout(entry.timer);
      const timer = setTimeout(() => {
        const e = active.get(canvas);
        if (e) { e.dispose(); active.delete(canvas); }
      }, DISPOSE_DELAY);
      active.set(canvas, { dispose: entry.dispose, timer });
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const canvas = e.target as HTMLCanvasElement;
          if (e.isIntersecting) create(canvas);
          else scheduleDispose(canvas);
        });
      },
      { rootMargin: isMobile ? "150px" : "300px" },
    );

    async function init() {
      THREE = await import("three");
      const canvases = Array.from(document.querySelectorAll<HTMLCanvasElement>(".card-r3f-canvas"));
      canvases.forEach((c) => io.observe(c));
    }

    init();

    return () => {
      io.disconnect();
      active.forEach(({ dispose, timer }) => { if (timer !== null) clearTimeout(timer); dispose(); });
      active.clear();
    };
  }, []);

  return null;
}
