"use client";

import { useEffect } from "react";
import type * as ThreeTypes from "three";

// ─── Types ────────────────────────────────────────────────────────────────────

type SceneFactory = (
  THREE: typeof ThreeTypes,
  canvas: HTMLCanvasElement,
  isMobile: boolean,
) => () => void;

// ─── Shared shader snippets ───────────────────────────────────────────────────

const FRESNEL_VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPos;
  void main() {
    vNormal   = normalize(normalMatrix * normal);
    vec4 mvp  = modelViewMatrix * vec4(position, 1.0);
    vViewPos  = -mvp.xyz;
    gl_Position = projectionMatrix * mvp;
  }
`;

const FRESNEL_FRAG = /* glsl */ `
  uniform vec3  glowColor;
  uniform float rimPow;
  uniform float alpha;
  varying vec3  vNormal;
  varying vec3  vViewPos;
  void main() {
    float f   = 1.0 - abs(dot(normalize(vNormal), normalize(vViewPos)));
    float rim = pow(f, rimPow);
    gl_FragColor = vec4(glowColor * rim, alpha * rim);
  }
`;

/** Creates an additive Fresnel rim mesh wrapping any geometry. */
function fresnelMesh(
  THREE: typeof ThreeTypes,
  geo: ThreeTypes.BufferGeometry,
  color: number,
  rimPow = 2.5,
  alpha = 1.0,
): ThreeTypes.Mesh {
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      glowColor: { value: new THREE.Color(color) },
      rimPow:    { value: rimPow },
      alpha:     { value: alpha },
    },
    vertexShader:   FRESNEL_VERT,
    fragmentShader: FRESNEL_FRAG,
    transparent:    true,
    blending:       THREE.AdditiveBlending,
    depthWrite:     false,
    side:           THREE.FrontSide,
  });
  return new THREE.Mesh(geo, mat);
}

// ─── Organic noise helper (cheap 3-frequency sum) ────────────────────────────

function sno(t: number, f1 = 1, f2 = 2.1, f3 = 3.7, a3 = 0.25) {
  return Math.sin(t * f1) + Math.sin(t * f2) * 0.5 + Math.sin(t * f3) * a3;
}

// ─── Scene definitions ────────────────────────────────────────────────────────

const SCENES: Record<string, SceneFactory> = {

  // ── Web prezentacije — liquid chrome orb with flowing data streams ─────────
  "web-prezentacije": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = makeRenderer(THREE, canvas, isMobile, 3.5);
    scene.fog = new THREE.FogExp2(0x010614, 0.055);
    scene.add(new THREE.AmbientLight(0x0a1f50, 1.2));
    const pl1 = new THREE.PointLight(0x3b82f6, 18, 9);  pl1.position.set(2, 3, 2);   scene.add(pl1);
    const pl2 = new THREE.PointLight(0x06b6d4, 12, 7);  pl2.position.set(-3, -1, 1); scene.add(pl2);
    const pl3 = new THREE.PointLight(0x8b5cf6,  8, 6);  pl3.position.set(1, -3, -1); scene.add(pl3);

    // ── Orb ─────────────────────────────────────────────────────────────────
    const segs = isMobile ? 32 : 64;
    const orbGeo = new THREE.SphereGeometry(0.72, segs, segs);
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0x0d1f5c, emissive: 0x091540, emissiveIntensity: 0.6,
      metalness: 1.0, roughness: 0.02,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    scene.add(orb);

    // Fresnel rim
    const fGeo = new THREE.SphereGeometry(0.74, segs, segs);
    const fMesh = fresnelMesh(THREE, fGeo, 0x60a5fa, 3.5, 0.85);
    scene.add(fMesh);

    // Equatorial + lat rings
    const eqGeo  = new THREE.TorusGeometry(0.84, 0.004, 4, 160);
    const eqMat  = new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false });
    const eqRing = new THREE.Mesh(eqGeo, eqMat); scene.add(eqRing);

    const latGroup = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const g = new THREE.TorusGeometry(0.84, 0.0022, 3, 100);
      const m = new THREE.MeshBasicMaterial({ color: i === 2 ? 0x38bdf8 : 0x1d4ed8, transparent: true, opacity: i === 2 ? 0.5 : 0.15, blending: THREE.AdditiveBlending, depthWrite: false });
      const r = new THREE.Mesh(g, m);
      r.rotation.x = (i / 5) * Math.PI;
      latGroup.add(r);
    }
    scene.add(latGroup);

    // ── Flowing sphere particles (replaced TetrahedronGeometry(0)) ───────────
    const shardN   = isMobile ? 14 : 26;
    const shardGeo = new THREE.SphereGeometry(0.05, 7, 7); // smooth sphere
    const shardMat = new THREE.MeshStandardMaterial({
      color: 0x93c5fd, emissive: 0x2563eb, emissiveIntensity: 3.5,
      metalness: 0.9, roughness: 0.05, transparent: true, opacity: 0.88,
    });
    const shardMesh = new THREE.InstancedMesh(shardGeo, shardMat, shardN);
    shardMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(shardMesh);
    const dummy    = new THREE.Object3D();
    const shardData = Array.from({ length: shardN }, () => ({
      phi:   Math.acos(2 * Math.random() - 1),
      theta: Math.random() * Math.PI * 2,
      r:     1.0 + Math.random() * 1.6,
      speed: 0.003 + Math.random() * 0.006,
      f1:    0.4 + Math.random() * 0.5,
      f2:    1.1 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2,
    }));

    // Fine dust
    const dustN   = isMobile ? 120 : 240;
    const dustPos = new Float32Array(dustN * 3);
    for (let i = 0; i < dustN; i++) {
      const r2 = 1.2 + Math.random() * 2.8;
      const p2 = Math.acos(2 * Math.random() - 1), t2 = Math.random() * Math.PI * 2;
      dustPos[i*3]   = r2 * Math.sin(p2) * Math.cos(t2);
      dustPos[i*3+1] = r2 * Math.cos(p2);
      dustPos[i*3+2] = r2 * Math.sin(p2) * Math.sin(t2);
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustPts = new THREE.Points(dustGeo, new THREE.PointsMaterial({
      color: 0x93c5fd, size: 0.016, sizeAttenuation: true,
      transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    scene.add(dustPts);

    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => { mx = (e.clientX / window.innerWidth - 0.5) * 0.5; my = (e.clientY / window.innerHeight - 0.5) * 0.35; };
    if (!isMobile) window.addEventListener("mousemove", onMouse);

    return stopLoop(renderer, scene, camera, (t) => {
      orb.rotation.y = t * 0.08;
      eqRing.rotation.y = t * 0.2;
      eqRing.rotation.x = sno(t, 0.25, 0.5, 0.9, 0.15) * 0.08;
      eqMat.opacity = 0.7 + 0.25 * Math.sin(t * 1.8);
      latGroup.rotation.y = t * 0.14;
      orbMat.emissiveIntensity = 0.5 + 0.3 * sno(t, 0.8, 1.5, 2.3, 0.2);

      shardData.forEach((s, i) => {
        s.theta += s.speed;
        // Organic radial breathe with two frequencies
        const wave = 1 + 0.12 * Math.sin(t * s.f1 + s.phase) + 0.06 * Math.cos(t * s.f2 + s.phase * 1.3);
        const r = s.r * wave;
        dummy.position.set(
          r * Math.sin(s.phi) * Math.cos(s.theta),
          r * Math.cos(s.phi) + 0.08 * sno(t, s.f1, s.f2, 0.9),
          r * Math.sin(s.phi) * Math.sin(s.theta),
        );
        dummy.scale.setScalar(0.7 + 0.4 * Math.abs(Math.sin(t * 0.7 + i * 0.5)));
        dummy.updateMatrix();
        shardMesh.setMatrixAt(i, dummy.matrix);
      });
      shardMesh.instanceMatrix.needsUpdate = true;
      dustPts.rotation.y = t * 0.018;

      camera.position.x += (mx * 0.6 - camera.position.x) * 0.04;
      camera.position.y += (-my * 0.6 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
    }, () => {
      window.removeEventListener("mousemove", onMouse); stopResize();
      orbGeo.dispose(); orbMat.dispose(); fGeo.dispose();
      eqGeo.dispose(); eqMat.dispose();
      shardGeo.dispose(); shardMat.dispose(); dustGeo.dispose();
    });
  },

  // ── E-commerce — luxury gem crystal with Fresnel + precision orbits ─────────
  "ecommerce": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = makeRenderer(THREE, canvas, isMobile, 3.8);
    scene.fog = new THREE.FogExp2(0x020906, 0.052);
    scene.add(new THREE.AmbientLight(0x0a1a10, 1.5));
    const pl1 = new THREE.PointLight(0x10b981, 16, 9); pl1.position.set(2, 3, 2);   scene.add(pl1);
    const pl2 = new THREE.PointLight(0x34d399, 10, 7); pl2.position.set(-2, -2, 1); scene.add(pl2);
    const pl3 = new THREE.PointLight(0xfbbf24,  7, 6); pl3.position.set(0, 2, -2);  scene.add(pl3);

    // Gem centerpiece
    const gemGeo = new THREE.IcosahedronGeometry(0.78, isMobile ? 1 : 2);
    const gemMat = new THREE.MeshStandardMaterial({
      color: 0x064e3b, emissive: 0x059669, emissiveIntensity: 0.9,
      metalness: 1.0, roughness: 0.0, transparent: true, opacity: 0.93,
    });
    const gem = new THREE.Mesh(gemGeo, gemMat);
    scene.add(gem);

    // Fresnel rim on gem
    const gemFGeo  = new THREE.IcosahedronGeometry(0.82, isMobile ? 1 : 2);
    const gemFMesh = fresnelMesh(THREE, gemFGeo, 0x34d399, 2.8, 0.9);
    gem.add(gemFMesh);

    // Inner glow
    const igGeo = new THREE.SphereGeometry(0.55, 14, 14);
    const igMat = new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.13, blending: THREE.AdditiveBlending, depthWrite: false });
    const innerGlow = new THREE.Mesh(igGeo, igMat);
    scene.add(innerGlow);

    // Outer bloom
    const bgGeo = new THREE.SphereGeometry(1.1, 14, 14);
    const bgMat = new THREE.MeshBasicMaterial({ color: 0x059669, transparent: true, opacity: 0.05, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.BackSide });
    scene.add(new THREE.Mesh(bgGeo, bgMat));

    // Orbit rings
    const ring1Geo = new THREE.TorusGeometry(1.25, 0.005, 4, 140);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x6ee7b7, transparent: true, opacity: 0.72, blending: THREE.AdditiveBlending, depthWrite: false });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat); ring1.rotation.x = Math.PI / 3; scene.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.6, 0.003, 4, 140);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending, depthWrite: false });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat); ring2.rotation.x = -Math.PI / 4; ring2.rotation.z = Math.PI / 5; scene.add(ring2);

    // Smooth sphere micro-gems (replaced OctahedronGeometry(0))
    const microN   = isMobile ? 12 : 20;
    const microGeo = new THREE.SphereGeometry(0.058, 8, 8); // smooth, not blocky
    const microMat = new THREE.MeshStandardMaterial({ color: 0x6ee7b7, emissive: 0x059669, emissiveIntensity: 2.8, metalness: 1.0, roughness: 0.0 });
    const microInst = new THREE.InstancedMesh(microGeo, microMat, microN);
    microInst.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(microInst);
    const dummy    = new THREE.Object3D();
    const microData = Array.from({ length: microN }, (_, i) => ({
      ang: (i / microN) * Math.PI * 2,
      r:   i % 2 === 0 ? 1.25 : 1.6,
      tilt: i % 2 === 0 ? Math.PI / 3 : -Math.PI / 4,
      tz:  i % 2 === 0 ? 0 : Math.PI / 5,
      speed: 0.006 + (i % 3) * 0.002,
      vOff: Math.random() * Math.PI * 2,
    }));

    // Sparkle dust
    const sparkN   = isMobile ? 80 : 160;
    const sparkPos = new Float32Array(sparkN * 3).map(() => (Math.random() - 0.5) * 5.5);
    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPos, 3));
    const sparkPts = new THREE.Points(sparkGeo, new THREE.PointsMaterial({ color: 0x6ee7b7, size: 0.019, sizeAttenuation: true, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }));
    scene.add(sparkPts);

    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => { mx = (e.clientX / window.innerWidth - 0.5) * 0.5; my = -(e.clientY / window.innerHeight - 0.5) * 0.35; };
    if (!isMobile) window.addEventListener("mousemove", onMouse);

    return stopLoop(renderer, scene, camera, (t) => {
      gem.rotation.y = t * 0.22;
      gem.rotation.x = t * 0.1 + sno(t, 0.3, 0.6, 1.1, 0.1) * 0.06;
      const pulse = 1 + 0.06 * sno(t, 1.5, 2.8, 4.3, 0.15);
      innerGlow.scale.setScalar(pulse);
      igMat.opacity = 0.1 + 0.08 * Math.sin(t * 2.0);
      gemMat.emissiveIntensity = 0.7 + 0.45 * sno(t, 1.2, 2.1, 3.3, 0.2);

      ring1.rotation.y = t * 0.3;
      ring2.rotation.y = -t * 0.22;
      ring1Mat.opacity = 0.6 + 0.2 * Math.sin(t * 1.2);

      microData.forEach((m, i) => {
        m.ang += m.speed;
        const ca = Math.cos(m.tilt), sa = Math.sin(m.tilt);
        const cz = Math.cos(m.tz), sz = Math.sin(m.tz);
        const x0 = Math.cos(m.ang) * m.r;
        const y0 = Math.sin(m.ang) * m.r;
        const yv = Math.sin(t * 0.4 + m.vOff) * 0.15;
        dummy.position.set(x0 * cz - y0 * sz * 0.2, x0 * ca * sz + y0 * ca + yv, -x0 * sa);
        dummy.scale.setScalar(0.75 + 0.35 * Math.abs(Math.sin(t * 0.9 + i * 0.6)));
        dummy.rotation.set(t + i, t * 0.7 + i, 0);
        dummy.updateMatrix();
        microInst.setMatrixAt(i, dummy.matrix);
      });
      microInst.instanceMatrix.needsUpdate = true;
      sparkPts.rotation.y = t * 0.012;

      camera.position.x += (mx - camera.position.x) * 0.04;
      camera.position.y += (my - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
    }, () => {
      window.removeEventListener("mousemove", onMouse); stopResize();
      gemGeo.dispose(); gemMat.dispose(); gemFGeo.dispose();
      igGeo.dispose(); igMat.dispose(); bgGeo.dispose(); bgMat.dispose();
      ring1Geo.dispose(); ring1Mat.dispose(); ring2Geo.dispose(); ring2Mat.dispose();
      microGeo.dispose(); microMat.dispose(); sparkGeo.dispose();
    });
  },

  // ── Mobilne aplikacije — glass phone with live holographic UI + signals ───────
  "mobile-app": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = makeRenderer(THREE, canvas, isMobile, 3.5);
    scene.fog = new THREE.FogExp2(0x02040f, 0.06);
    scene.add(new THREE.AmbientLight(0x050515, 1.8));
    const pl1 = new THREE.PointLight(0x6366f1, 16, 7); pl1.position.set(1, 2, 2);   scene.add(pl1);
    const pl2 = new THREE.PointLight(0x8b5cf6,  9, 5); pl2.position.set(-2, -1, 1); scene.add(pl2);
    const pl3 = new THREE.PointLight(0xa78bfa,  5, 4); pl3.position.set(0, -2, 2);  scene.add(pl3);

    // Phone body
    const bodyGeo = new THREE.BoxGeometry(0.32, 0.60, 0.052);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0f0f23, emissive: 0x1e1b4b, emissiveIntensity: 0.4, metalness: 0.95, roughness: 0.04 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    scene.add(body);

    // Fresnel glass rim on phone
    const bodyFGeo  = new THREE.BoxGeometry(0.325, 0.61, 0.056);
    const bodyFMesh = fresnelMesh(THREE, bodyFGeo, 0x818cf8, 3.0, 0.7);
    body.add(bodyFMesh);

    // Screen glow
    const scrGeo = new THREE.PlaneGeometry(0.25, 0.48);
    const scrMat = new THREE.MeshBasicMaterial({ color: 0x4f46e5, transparent: true, opacity: 0.52, blending: THREE.AdditiveBlending, depthWrite: false });
    const screen = new THREE.Mesh(scrGeo, scrMat);
    screen.position.z = 0.03; scene.add(screen);

    // UI bars
    const barGroup = new THREE.Group();
    barGroup.position.z = 0.032;
    const uiBars = [
      { w: 0.17, h: 0.013, y:  0.12, c: 0x818cf8 },
      { w: 0.11, h: 0.013, y:  0.07, c: 0xa5b4fc },
      { w: 0.14, h: 0.013, y:  0.02, c: 0x6366f1 },
      { w: 0.09, h: 0.013, y: -0.03, c: 0x818cf8 },
      { w: 0.12, h: 0.013, y: -0.08, c: 0x7c3aed },
    ];
    const uiMeshes: { mat: ThreeTypes.MeshBasicMaterial }[] = [];
    uiBars.forEach(({ w, h, y, c }) => {
      const bg = new THREE.PlaneGeometry(w, h);
      const bm = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.72, blending: THREE.AdditiveBlending, depthWrite: false });
      const bMesh = new THREE.Mesh(bg, bm);
      bMesh.position.y = y;
      barGroup.add(bMesh);
      uiMeshes.push({ mat: bm });
    });
    scene.add(barGroup);

    // Expanding signal halos
    const haloN   = isMobile ? 5 : 8;
    const halos: { mesh: ThreeTypes.Mesh; mat: ThreeTypes.MeshBasicMaterial; phase: number }[] = [];
    for (let i = 0; i < haloN; i++) {
      const hg = new THREE.RingGeometry(0.02, 0.04, 80);
      const hm = new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
      const hMesh = new THREE.Mesh(hg, hm);
      scene.add(hMesh);
      halos.push({ mesh: hMesh, mat: hm, phase: (i / haloN) * Math.PI * 2 });
    }

    // Floating data dots
    const dotN   = isMobile ? 55 : 100;
    const dotPos = new Float32Array(dotN * 3);
    for (let i = 0; i < dotN; i++) {
      dotPos[i*3]   = (Math.random() - 0.5) * 3.8;
      dotPos[i*3+1] = (Math.random() - 0.5) * 4.2;
      dotPos[i*3+2] = (Math.random() - 0.5) * 2.2;
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPos, 3));
    const dotPts = new THREE.Points(dotGeo, new THREE.PointsMaterial({ color: 0x6366f1, size: 0.017, sizeAttenuation: true, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending, depthWrite: false }));
    scene.add(dotPts);

    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => { mx = (e.clientX / window.innerWidth - 0.5) * 0.7; my = -(e.clientY / window.innerHeight - 0.5) * 0.5; };
    if (!isMobile) window.addEventListener("mousemove", onMouse);

    return stopLoop(renderer, scene, camera, (t) => {
      body.rotation.y = mx * 0.8 + sno(t, 0.28, 0.55, 0.9, 0.1) * 0.08;
      body.rotation.x = my * 0.5 + sno(t, 0.22, 0.41, 0.7, 0.08) * 0.04;
      screen.rotation.copy(body.rotation);
      barGroup.rotation.copy(body.rotation);
      scrMat.opacity = 0.42 + 0.15 * sno(t, 1.5, 2.9, 4.3, 0.2);

      uiMeshes.forEach(({ mat }, i) => {
        mat.opacity = 0.5 + 0.3 * Math.sin(t * 1.3 + i * 0.9);
      });

      halos.forEach(({ mesh, mat, phase }) => {
        const p = ((t * 0.42 + phase / (Math.PI * 2)) % 1);
        mesh.scale.setScalar(p * 4.0);
        mat.opacity = Math.pow(1 - p, 1.5) * 0.65;
      });

      camera.position.x += (mx * 0.3 - camera.position.x) * 0.05;
      camera.lookAt(0, 0, 0);
    }, () => {
      window.removeEventListener("mousemove", onMouse); stopResize();
      bodyGeo.dispose(); bodyMat.dispose(); bodyFGeo.dispose();
      scrGeo.dispose(); scrMat.dispose(); dotGeo.dispose();
    });
  },

  // ── CMS — double helix DNA with electric glow + Fresnel nodes ────────────────
  "cms": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = makeRenderer(THREE, canvas, isMobile, 4.2);
    scene.fog = new THREE.FogExp2(0x010a08, 0.048);
    scene.add(new THREE.AmbientLight(0x01120a, 1.8));
    const pl1 = new THREE.PointLight(0x06b6d4, 14, 8); pl1.position.set(2, 2, 1);   scene.add(pl1);
    const pl2 = new THREE.PointLight(0x8b5cf6,  9, 7); pl2.position.set(-2, -2, 1); scene.add(pl2);
    const pl3 = new THREE.PointLight(0x10b981,  6, 5); pl3.position.set(0, 0, 3);   scene.add(pl3);

    const count  = isMobile ? 32 : 56;
    const height = 3.8;
    const R      = 0.62;
    const nsegs  = isMobile ? 10 : 14;

    // Strand A — cyan
    const nodeGeoA = new THREE.SphereGeometry(0.068, nsegs, nsegs);
    const matA = new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x0891b2, emissiveIntensity: 3.0, metalness: 0.65, roughness: 0.12 });
    const strandA = new THREE.InstancedMesh(nodeGeoA, matA, count);
    strandA.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(strandA);

    // Strand B — violet
    const nodeGeoB = new THREE.SphereGeometry(0.068, nsegs, nsegs);
    const matB = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, emissive: 0x7c3aed, emissiveIntensity: 3.0, metalness: 0.65, roughness: 0.12 });
    const strandB = new THREE.InstancedMesh(nodeGeoB, matB, count);
    strandB.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(strandB);

    // Fresnel glow on strands (large instanced spheres, additive)
    const glowGeoA = new THREE.SphereGeometry(0.13, 8, 8);
    const glowA    = new THREE.InstancedMesh(glowGeoA, new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false }), count);
    glowA.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(glowA);

    const glowGeoB = new THREE.SphereGeometry(0.13, 8, 8);
    const glowB    = new THREE.InstancedMesh(glowGeoB, new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false }), count);
    glowB.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(glowB);

    // Rungs
    const rungGeo = new THREE.CylinderGeometry(0.007, 0.007, 1, isMobile ? 5 : 8);
    const rungMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.32, blending: THREE.AdditiveBlending, depthWrite: false });
    const rungs   = new THREE.InstancedMesh(rungGeo, rungMat, count);
    rungs.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(rungs);

    // Axis
    const axGeo = new THREE.CylinderGeometry(0.006, 0.006, height, 4);
    scene.add(new THREE.Mesh(axGeo, new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.13, blending: THREE.AdditiveBlending, depthWrite: false })));

    // Particles
    const ptN   = isMobile ? 60 : 120;
    const ptPos = new Float32Array(ptN * 3);
    for (let i = 0; i < ptN; i++) {
      ptPos[i*3] = (Math.random() - 0.5) * 2.4; ptPos[i*3+1] = (Math.random() - 0.5) * height; ptPos[i*3+2] = (Math.random() - 0.5) * 2.4;
    }
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute("position", new THREE.BufferAttribute(ptPos, 3));
    scene.add(new THREE.Points(ptGeo, new THREE.PointsMaterial({ color: 0x67e8f9, size: 0.018, sizeAttenuation: true, transparent: true, opacity: 0.48, blending: THREE.AdditiveBlending, depthWrite: false })));

    const dummy = new THREE.Object3D();
    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => { mx = (e.clientX / window.innerWidth - 0.5) * 0.5; my = -(e.clientY / window.innerHeight - 0.5) * 0.3; };
    if (!isMobile) window.addEventListener("mousemove", onMouse);

    return stopLoop(renderer, scene, camera, (t) => {
      matA.emissiveIntensity = 2.5 + 0.9 * sno(t, 1.0, 1.9, 3.1, 0.2);
      matB.emissiveIntensity = 2.5 + 0.9 * sno(t + 1.2, 1.0, 1.9, 3.1, 0.2);
      rungMat.opacity = 0.28 + 0.14 * Math.abs(Math.sin(t * 0.7));

      for (let i = 0; i < count; i++) {
        const frac  = i / count;
        const angle = frac * Math.PI * 4 + t * 0.62;
        const y     = (frac - 0.5) * height;
        const wave  = 1 + 0.08 * Math.sin(t * 1.1 + i * 0.3);
        const pulse = 0.85 + 0.35 * Math.abs(Math.sin(t * 1.3 + i * 0.22));

        dummy.position.set(Math.cos(angle) * R * wave, y, Math.sin(angle) * R * wave);
        dummy.scale.setScalar(pulse); dummy.updateMatrix();
        strandA.setMatrixAt(i, dummy.matrix);
        glowA.setMatrixAt(i, dummy.matrix);

        dummy.position.set(-Math.cos(angle) * R * wave, y, -Math.sin(angle) * R * wave);
        dummy.scale.setScalar(pulse); dummy.updateMatrix();
        strandB.setMatrixAt(i, dummy.matrix);
        glowB.setMatrixAt(i, dummy.matrix);

        dummy.position.set(0, y, 0);
        dummy.rotation.set(0, -angle - Math.PI / 2, Math.PI / 2);
        dummy.scale.setScalar(1); dummy.updateMatrix();
        rungs.setMatrixAt(i, dummy.matrix);
      }
      strandA.instanceMatrix.needsUpdate = true;
      strandB.instanceMatrix.needsUpdate = true;
      glowA.instanceMatrix.needsUpdate   = true;
      glowB.instanceMatrix.needsUpdate   = true;
      rungs.instanceMatrix.needsUpdate   = true;

      scene.rotation.y = t * 0.16 + mx * 0.5;
      scene.rotation.x = my * 0.22 + sno(t, 0.2, 0.38, 0.6, 0.08) * 0.04;
    }, () => {
      window.removeEventListener("mousemove", onMouse); stopResize();
      nodeGeoA.dispose(); matA.dispose(); nodeGeoB.dispose(); matB.dispose();
      glowGeoA.dispose(); glowGeoB.dispose();
      rungGeo.dispose(); rungMat.dispose(); axGeo.dispose(); ptGeo.dispose();
    });
  },

  // ── AI — holographic neural network with flowing signals + Fresnel nodes ─────
  "ai": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = makeRenderer(THREE, canvas, isMobile, 4.5);
    scene.fog = new THREE.FogExp2(0x05020f, 0.042);
    scene.add(new THREE.AmbientLight(0x0d0022, 1.8));
    const pl1 = new THREE.PointLight(0xa855f7, 16, 9); pl1.position.set(0, 2, 2);   scene.add(pl1);
    const pl2 = new THREE.PointLight(0x7c3aed,  9, 7); pl2.position.set(-2, -1, 1); scene.add(pl2);
    const pl3 = new THREE.PointLight(0xec4899,  6, 5); pl3.position.set(2, -2, -1); scene.add(pl3);

    const layers     = isMobile ? [2, 3, 3, 2] : [3, 5, 5, 3];
    const totalNodes = layers.reduce((a, b) => a + b, 0);
    const nsegs      = isMobile ? 10 : 18;

    // Nodes
    const nodeGeo = new THREE.SphereGeometry(0.1, nsegs, nsegs);
    const nodeMat = new THREE.MeshStandardMaterial({ color: 0xd946ef, emissive: 0xa21caf, emissiveIntensity: 2.8, metalness: 0.8, roughness: 0.08 });
    const nodeInst = new THREE.InstancedMesh(nodeGeo, nodeMat, totalNodes);
    nodeInst.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(nodeInst);

    // Fresnel glow spheres per node
    const fGeo   = new THREE.SphereGeometry(0.22, 8, 8);
    const fInst  = new THREE.InstancedMesh(fGeo, new THREE.MeshBasicMaterial({ color: 0xc026d3, transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending, depthWrite: false }), totalNodes);
    fInst.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(fInst);

    const nodePos: ThreeTypes.Vector3[] = [];
    const dummy = new THREE.Object3D();
    let ni = 0;
    layers.forEach((cnt, li) => {
      for (let i = 0; i < cnt; i++) {
        const v = new THREE.Vector3(
          (li - layers.length / 2 + 0.5) * 1.12,
          (i  - cnt / 2 + 0.5) * 0.74,
          0,
        );
        nodePos.push(v);
        dummy.position.copy(v); dummy.scale.setScalar(1); dummy.updateMatrix();
        nodeInst.setMatrixAt(ni, dummy.matrix);
        fInst.setMatrixAt(ni++, dummy.matrix);
      }
    });
    nodeInst.instanceMatrix.needsUpdate = true;
    fInst.instanceMatrix.needsUpdate    = true;

    // Connections
    const connPts: number[] = [];
    let ls = 0;
    for (let li = 0; li < layers.length - 1; li++) {
      const ns = ls + layers[li];
      for (let a = 0; a < layers[li]; a++)
        for (let b = 0; b < layers[li + 1]; b++) {
          const pa = nodePos[ls + a], pb = nodePos[ns + b];
          connPts.push(pa.x, pa.y, pa.z, pb.x, pb.y, pb.z);
        }
      ls += layers[li];
    }
    const connGeo = new THREE.BufferGeometry();
    connGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(connPts), 3));
    scene.add(new THREE.LineSegments(connGeo, new THREE.LineBasicMaterial({ color: 0x9333ea, transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending })));

    // Flowing signal particles
    const flowN    = isMobile ? 50 : 100;
    const flowGeo  = new THREE.BufferGeometry();
    const flowPos  = new Float32Array(flowN * 3);
    const flowProg = new Float32Array(flowN).map(() => Math.random());
    const flowConn = new Uint16Array(flowN).map(() => Math.floor(Math.random() * (connPts.length / 6)));
    flowGeo.setAttribute("position", new THREE.BufferAttribute(flowPos, 3));
    const flowPts = new THREE.Points(flowGeo, new THREE.PointsMaterial({ color: 0xe879f9, size: 0.06, sizeAttenuation: true, transparent: true, opacity: 0.97, blending: THREE.AdditiveBlending, depthWrite: false }));
    scene.add(flowPts);

    // Ambient dust
    const dustN   = isMobile ? 70 : 140;
    const dustPos = new Float32Array(dustN * 3).map(() => (Math.random() - 0.5) * 5.5);
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    scene.add(new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0xa855f7, size: 0.014, sizeAttenuation: true, transparent: true, opacity: 0.38, blending: THREE.AdditiveBlending, depthWrite: false })));

    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => { mx = (e.clientX / window.innerWidth - 0.5) * 0.4; my = -(e.clientY / window.innerHeight - 0.5) * 0.3; };
    if (!isMobile) window.addEventListener("mousemove", onMouse);

    return stopLoop(renderer, scene, camera, (t) => {
      nodeMat.emissiveIntensity = 2.4 + 0.9 * sno(t, 0.9, 1.7, 2.8, 0.18);
      for (let i = 0; i < totalNodes; i++) {
        const s = 0.72 + 0.45 * Math.abs(sno(t, 1.1, 2.0, 3.3, 0.2) * 0.33 + Math.sin(t * 1.1 + i * 0.6));
        dummy.position.copy(nodePos[i]);
        dummy.scale.setScalar(s); dummy.updateMatrix();
        nodeInst.setMatrixAt(i, dummy.matrix);
        dummy.scale.setScalar(s * 1.6 + 0.2 * Math.sin(t * 2.1 + i)); dummy.updateMatrix();
        fInst.setMatrixAt(i, dummy.matrix);
      }
      nodeInst.instanceMatrix.needsUpdate = true;
      fInst.instanceMatrix.needsUpdate    = true;

      const posAttr = flowGeo.attributes.position as ThreeTypes.BufferAttribute;
      for (let i = 0; i < flowN; i++) {
        flowProg[i] += 0.016;
        if (flowProg[i] > 1) { flowProg[i] = 0; flowConn[i] = Math.floor(Math.random() * (connPts.length / 6)); }
        const ci = flowConn[i] * 6; const p = flowProg[i];
        posAttr.setXYZ(i,
          connPts[ci]   + (connPts[ci+3] - connPts[ci])   * p,
          connPts[ci+1] + (connPts[ci+4] - connPts[ci+1]) * p,
          connPts[ci+2] + (connPts[ci+5] - connPts[ci+2]) * p,
        );
      }
      posAttr.needsUpdate = true;

      scene.rotation.y = mx * 0.5 + sno(t, 0.15, 0.28, 0.47, 0.1) * 0.08;
      scene.rotation.x = my * 0.3;
    }, () => {
      window.removeEventListener("mousemove", onMouse); stopResize();
      nodeGeo.dispose(); nodeMat.dispose(); fGeo.dispose();
      connGeo.dispose(); flowGeo.dispose(); dustGeo.dispose();
    });
  },

  // ── SEO — neon radar dish with sweep + animated data columns ─────────────────
  "seo": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = makeRenderer(THREE, canvas, isMobile, 4.8);
    camera.position.set(0, 2.5, 4.8); camera.lookAt(0, 0, 0);
    scene.fog = new THREE.FogExp2(0x010a03, 0.038);
    scene.add(new THREE.AmbientLight(0x02150a, 1.8));
    const pl1 = new THREE.PointLight(0x22c55e, 14, 9); pl1.position.set(0, 3.5, 1); scene.add(pl1);
    const pl2 = new THREE.PointLight(0x16a34a,  7, 6); pl2.position.set(-2, 1, 2);  scene.add(pl2);

    // Radar rings (5)
    const ringMats: ThreeTypes.MeshBasicMaterial[] = [];
    for (let i = 1; i <= 5; i++) {
      const rg = new THREE.RingGeometry(i * 0.46 - 0.004, i * 0.46 + 0.004, 120);
      const rm = new THREE.MeshBasicMaterial({ color: 0x16a34a, transparent: true, opacity: 0.14 + i * 0.022, blending: THREE.AdditiveBlending, depthWrite: false });
      const ring = new THREE.Mesh(rg, rm); ring.rotation.x = -Math.PI / 2; scene.add(ring);
      ringMats.push(rm);
    }

    // Cross-hairs
    const chPts = new Float32Array([-2.4, 0, 0,  2.4, 0, 0,  0, 0, -2.4,  0, 0, 2.4]);
    const chGeo = new THREE.BufferGeometry();
    chGeo.setAttribute("position", new THREE.BufferAttribute(chPts, 3));
    chGeo.setIndex([0, 1, 2, 3]);
    scene.add(new THREE.LineSegments(chGeo, new THREE.LineBasicMaterial({ color: 0x15803d, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending })));

    // Sweep sector
    const sweepGeo = new THREE.CircleGeometry(2.4, 120, 0, Math.PI / 5.5);
    const sweepMat = new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
    const sweep    = new THREE.Mesh(sweepGeo, sweepMat); sweep.rotation.x = -Math.PI / 2; scene.add(sweep);

    // Sweep edge
    const edgeGeo = new THREE.CircleGeometry(2.4, 120, -0.03, 0.065);
    const edgeMat = new THREE.MeshBasicMaterial({ color: 0x4ade80, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
    const sweepEdge = new THREE.Mesh(edgeGeo, edgeMat); sweepEdge.rotation.x = -Math.PI / 2; scene.add(sweepEdge);

    // Blips
    const blipN   = isMobile ? 16 : 28;
    const blipGeo = new THREE.SphereGeometry(0.052, isMobile ? 8 : 12, isMobile ? 8 : 12);
    const blipMat = new THREE.MeshStandardMaterial({ color: 0x4ade80, emissive: 0x16a34a, emissiveIntensity: 3.2, metalness: 0.4, roughness: 0.2 });
    const blipInst = new THREE.InstancedMesh(blipGeo, blipMat, blipN);
    blipInst.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(blipInst);
    const blipDummy = new THREE.Object3D();
    const blipData  = Array.from({ length: blipN }, () => ({
      ang: Math.random() * Math.PI * 2, r: 0.3 + Math.random() * 1.95,
      h: 0.02 + Math.random() * 0.3, blip: 0,
    }));

    // Data bars
    const barN   = isMobile ? 10 : 18;
    const barGeo = new THREE.BoxGeometry(0.085, 1, 0.085);
    const bars: { mesh: ThreeTypes.Mesh; mat: ThreeTypes.MeshStandardMaterial; target: number; ph: number }[] = [];
    for (let i = 0; i < barN; i++) {
      const hue = 0.33 + (i / barN) * 0.12;
      const bm  = new THREE.MeshStandardMaterial({ color: new THREE.Color().setHSL(hue, 1, 0.45), emissive: new THREE.Color().setHSL(hue, 1, 0.28), emissiveIntensity: 2.0, metalness: 0.3, roughness: 0.2 });
      const m   = new THREE.Mesh(barGeo, bm);
      m.position.set((i - barN / 2) * 0.24, 0, -1.85);
      scene.add(m);
      bars.push({ mesh: m, mat: bm, target: 0.3 + Math.random() * 1.6, ph: Math.random() * Math.PI * 2 });
    }

    // Dust
    const dustN   = isMobile ? 70 : 130;
    const dustPos = new Float32Array(dustN * 3).map(() => (Math.random() - 0.5) * 5.2);
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    scene.add(new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0x86efac, size: 0.014, sizeAttenuation: true, transparent: true, opacity: 0.38, blending: THREE.AdditiveBlending, depthWrite: false })));

    let sweepAngle = 0;
    return stopLoop(renderer, scene, camera, (t) => {
      sweepAngle += 0.026;
      sweep.rotation.y    = sweepAngle;
      sweepEdge.rotation.y = sweepAngle;
      edgeMat.opacity = 0.55 + 0.2 * Math.sin(t * 4.5);
      const sweepPos = sweepAngle % (Math.PI * 2);

      ringMats.forEach((rm, i) => { rm.opacity = 0.11 + 0.07 * Math.sin(t * 0.45 + i * 0.75); });

      blipData.forEach((b, i) => {
        const diff = (sweepPos - b.ang + Math.PI * 4) % (Math.PI * 2);
        if (diff < 0.25) b.blip = 1;
        b.blip *= 0.92;
        blipDummy.position.set(Math.cos(b.ang) * b.r, b.h + sno(t, 0.4, 0.8, 1.3, 0.15) * 0.06, Math.sin(b.ang) * b.r);
        blipDummy.scale.setScalar(0.6 + b.blip * 1.6);
        blipDummy.updateMatrix(); blipInst.setMatrixAt(i, blipDummy.matrix);
      });
      blipInst.instanceMatrix.needsUpdate = true;
      blipMat.emissiveIntensity = 2.6 + Math.sin(t * 1.6) * 0.9;

      bars.forEach(({ mesh, mat, target, ph }, i) => {
        const h = target * (0.55 + 0.45 * sno(t, 0.6, 1.1, 1.8, 0.15) * 0.5 + 0.5 * Math.sin(t * 0.65 + ph));
        mesh.scale.y = Math.max(0.05, h); mesh.position.y = h * 0.5 - 0.5;
        mat.emissiveIntensity = 1.5 + 0.8 * Math.sin(t * 1.3 + i * 0.45);
      });
    }, () => {
      stopResize();
      sweepGeo.dispose(); sweepMat.dispose(); edgeGeo.dispose(); edgeMat.dispose();
      blipGeo.dispose(); blipMat.dispose(); barGeo.dispose(); chGeo.dispose(); dustGeo.dispose();
    });
  },

  // ── Cyber security — torusknot core + wireframe shields + Fresnel ────────────
  "security": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = makeRenderer(THREE, canvas, isMobile, 4);
    scene.fog = new THREE.FogExp2(0x0c0002, 0.048);
    scene.add(new THREE.AmbientLight(0x1a0005, 1.8));
    const pl1 = new THREE.PointLight(0xef4444, 16, 8); pl1.position.set(0, 2.5, 2);  scene.add(pl1);
    const pl2 = new THREE.PointLight(0xf97316,  9, 6); pl2.position.set(-2, -1, 1);  scene.add(pl2);
    const pl3 = new THREE.PointLight(0xfb7185,  6, 5); pl3.position.set(2, -2, -1);  scene.add(pl3);

    // TorusKnot core
    const knotGeo = new THREE.TorusKnotGeometry(0.35, 0.1, isMobile ? 80 : 160, isMobile ? 10 : 16);
    const knotMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xdc2626, emissiveIntensity: 2.4, metalness: 1.0, roughness: 0.03 });
    const knot    = new THREE.Mesh(knotGeo, knotMat);
    scene.add(knot);

    // Fresnel rim on knot
    const kFGeo   = new THREE.TorusKnotGeometry(0.39, 0.13, isMobile ? 60 : 120, 8);
    const kFMesh  = fresnelMesh(THREE, kFGeo, 0xf87171, 2.5, 0.9);
    knot.add(kFMesh);

    // Outer knot glow
    const kGlowGeo = new THREE.TorusKnotGeometry(0.48, 0.17, isMobile ? 50 : 100, 6);
    const kGlowMat = new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.05, blending: THREE.AdditiveBlending, depthWrite: false });
    scene.add(new THREE.Mesh(kGlowGeo, kGlowMat));

    // Wireframe icosphere shields
    const shieldData = [
      { r: 1.48, color: 0xf87171, opacity: 0.18, speed:  0.18 },
      { r: 1.12, color: 0xfb923c, opacity: 0.22, speed: -0.32 },
      { r: 0.80, color: 0xfbbf24, opacity: 0.28, speed:  0.48 },
    ];
    const shields = shieldData.map(({ r, color, opacity, speed }, i) => {
      const sg = new THREE.IcosahedronGeometry(r, isMobile ? 1 : 2);
      const sm = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false });
      const m  = new THREE.Mesh(sg, sm); scene.add(m);
      return { m, sm, speed, i };
    });

    // Scan ring
    const scanGeo = new THREE.TorusGeometry(1.65, 0.007, 4, 120);
    const scanMat = new THREE.MeshBasicMaterial({ color: 0xf87171, transparent: true, opacity: 0.78, blending: THREE.AdditiveBlending, depthWrite: false });
    const scanRing = new THREE.Mesh(scanGeo, scanMat); scene.add(scanRing);

    // Alert particles
    const ptN   = isMobile ? 55 : 100;
    const ptPos = new Float32Array(ptN * 3).map(() => (Math.random() - 0.5) * 5.2);
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute("position", new THREE.BufferAttribute(ptPos, 3));
    scene.add(new THREE.Points(ptGeo, new THREE.PointsMaterial({ color: 0xfca5a5, size: 0.02, sizeAttenuation: true, transparent: true, opacity: 0.48, blending: THREE.AdditiveBlending, depthWrite: false })));

    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => { mx = (e.clientX / window.innerWidth - 0.5) * 0.5; my = -(e.clientY / window.innerHeight - 0.5) * 0.4; };
    if (!isMobile) window.addEventListener("mousemove", onMouse);

    return stopLoop(renderer, scene, camera, (t) => {
      knot.rotation.x = t * 0.52;
      knot.rotation.y = t * 0.68;
      knotMat.emissiveIntensity = 1.9 + 0.8 * sno(t, 2.2, 3.8, 5.1, 0.2);

      shields.forEach(({ m, sm, speed, i }) => {
        m.rotation.y = t * speed;
        m.rotation.x = t * speed * 0.52 + sno(t, 0.2, 0.4, 0.7, 0.1) * 0.15;
        sm.opacity   = shieldData[i].opacity * (0.6 + 0.45 * Math.sin(t * 1.4 + i * 0.9));
      });

      scanRing.position.y  = sno(t, 1.1, 1.8, 2.7, 0.15) * 1.0;
      scanMat.opacity = 0.5 + 0.38 * Math.abs(Math.cos(t * 1.3));

      scene.rotation.y = mx * 0.5;
      scene.rotation.x = my * 0.3;
    }, () => {
      window.removeEventListener("mousemove", onMouse); stopResize();
      knotGeo.dispose(); knotMat.dispose(); kFGeo.dispose(); kGlowGeo.dispose(); kGlowMat.dispose();
      scanGeo.dispose(); scanMat.dispose(); ptGeo.dispose();
    });
  },

  // ── UI/UX — morphing holographic crystal + orbiting design panels ────────────
  "uiux": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = makeRenderer(THREE, canvas, isMobile, 4.2);
    scene.fog = new THREE.FogExp2(0x010f1a, 0.048);
    scene.add(new THREE.AmbientLight(0x021520, 1.8));
    const pl1 = new THREE.PointLight(0x0ea5e9, 16, 9); pl1.position.set(2, 2.5, 2);  scene.add(pl1);
    const pl2 = new THREE.PointLight(0x06b6d4,  9, 7); pl2.position.set(-2, -1, 1);  scene.add(pl2);
    const pl3 = new THREE.PointLight(0x8b5cf6,  6, 5); pl3.position.set(0, 2, -2);   scene.add(pl3);

    // Morphing icosahedron core
    const detail   = isMobile ? 2 : 4;
    const morphGeo = new THREE.IcosahedronGeometry(1.0, detail);
    const morphMat = new THREE.MeshStandardMaterial({ color: 0x0369a1, emissive: 0x0ea5e9, emissiveIntensity: 0.85, metalness: 0.72, roughness: 0.1 });
    const morphMesh = new THREE.Mesh(morphGeo, morphMat);
    scene.add(morphMesh);

    // Fresnel shell on morphing core
    const morphFGeo  = new THREE.IcosahedronGeometry(1.04, 1);
    const morphFMesh = fresnelMesh(THREE, morphFGeo, 0x38bdf8, 2.8, 0.8);
    morphMesh.add(morphFMesh);

    // Wireframe shell
    const wireGeo = new THREE.IcosahedronGeometry(1.09, 1);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending, depthWrite: false });
    scene.add(new THREE.Mesh(wireGeo, wireMat));

    // Bloom sphere
    const bloomGeo = new THREE.SphereGeometry(0.92, 12, 12);
    const bloomMat = new THREE.MeshBasicMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false });
    const bloomSph = new THREE.Mesh(bloomGeo, bloomMat); scene.add(bloomSph);

    const posAttr = morphGeo.attributes.position as ThreeTypes.BufferAttribute;
    const origPos = new Float32Array(posAttr.array);

    // Orbiting design cards
    const cardN   = isMobile ? 3 : 5;
    const cardGeo = new THREE.BoxGeometry(0.46, 0.29, 0.014);
    const cardMat = new THREE.MeshStandardMaterial({ color: 0x0c4a6e, emissive: 0x0369a1, emissiveIntensity: 1.3, metalness: 0.92, roughness: 0.03, transparent: true, opacity: 0.84 });
    const cardInst = new THREE.InstancedMesh(cardGeo, cardMat, cardN);
    cardInst.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(cardInst);

    // Card Fresnel rim
    const cgGeo  = new THREE.BoxGeometry(0.5, 0.32, 0.016);
    const cgInst = new THREE.InstancedMesh(cgGeo, new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false }), cardN);
    cgInst.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(cgInst);

    const cardDummy  = new THREE.Object3D();
    const cardAngles = Array.from({ length: cardN }, (_, i) => (i / cardN) * Math.PI * 2);
    const cardRadii  = Array.from({ length: cardN }, (_, i) => 1.7 + (i % 2) * 0.45);

    // Fine dust
    const dustN   = isMobile ? 80 : 150;
    const dustPos = new Float32Array(dustN * 3).map(() => (Math.random() - 0.5) * 5.8);
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    scene.add(new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0x7dd3fc, size: 0.016, sizeAttenuation: true, transparent: true, opacity: 0.48, blending: THREE.AdditiveBlending, depthWrite: false })));

    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => { mx = (e.clientX / window.innerWidth - 0.5) * 0.4; my = -(e.clientY / window.innerHeight - 0.5) * 0.3; };
    if (!isMobile) window.addEventListener("mousemove", onMouse);

    return stopLoop(renderer, scene, camera, (t) => {
      // Organic vertex morph
      if (!isMobile) {
        for (let i = 0; i < posAttr.count; i++) {
          const ox = origPos[i*3], oy = origPos[i*3+1], oz = origPos[i*3+2];
          const n  = Math.sin(ox * 2.2 + t * 0.55) * Math.cos(oy * 1.9 + t * 0.42) * 0.12;
          const n2 = Math.sin(oz * 1.8 + t * 0.38) * 0.06;
          const len = Math.sqrt(ox*ox + oy*oy + oz*oz);
          posAttr.setXYZ(i, ox + (ox/len) * (n + n2), oy + (oy/len) * (n + n2), oz + (oz/len) * (n + n2));
        }
        posAttr.needsUpdate = true;
        morphGeo.computeVertexNormals();
      }

      // Color cycle
      const hue = (t * 0.032) % 1;
      morphMat.color.setHSL(hue, 0.78, 0.35);
      morphMat.emissive.setHSL(hue, 0.88, 0.22);
      morphMat.emissiveIntensity = 0.82 + 0.42 * sno(t, 0.9, 1.7, 2.8, 0.18);
      bloomSph.scale.setScalar(1 + 0.1 * Math.sin(t * 1.35));
      bloomMat.opacity = 0.06 + 0.04 * Math.sin(t * 1.35);
      pl1.color.setHSL(hue, 0.82, 0.5);

      morphMesh.rotation.y = t * 0.17 + mx * 0.4;
      morphMesh.rotation.x = t * 0.09 + my * 0.26;

      cardAngles.forEach((_, i) => {
        cardAngles[i] += (0.2 + i * 0.05) * 0.013;
        const a = cardAngles[i];
        const yWave = sno(t, 0.25, 0.48, 0.8, 0.12) * 0.18;
        cardDummy.position.set(Math.cos(a) * cardRadii[i], Math.sin(a * 0.5) * 0.44 + yWave, Math.sin(a) * cardRadii[i]);
        cardDummy.lookAt(0, 0, 0);
        cardDummy.updateMatrix();
        cardInst.setMatrixAt(i, cardDummy.matrix);
        cgInst.setMatrixAt(i, cardDummy.matrix);
      });
      cardInst.instanceMatrix.needsUpdate = true;
      cgInst.instanceMatrix.needsUpdate   = true;
    }, () => {
      window.removeEventListener("mousemove", onMouse); stopResize();
      morphGeo.dispose(); morphMat.dispose(); morphFGeo.dispose();
      wireGeo.dispose(); wireMat.dispose();
      bloomGeo.dispose(); bloomMat.dispose();
      cardGeo.dispose(); cardMat.dispose(); cgGeo.dispose();
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
  renderer.toneMappingExposure = 1.12;

  const w = canvas.clientWidth  || 400;
  const h = canvas.clientHeight || 300;
  renderer.setSize(w, h, false);

  const scene  = new THREE.Scene();
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
  scene:    ThreeTypes.Scene,
  camera:   ThreeTypes.PerspectiveCamera,
  tick:     (t: number) => void,
  extraDispose: () => void,
): () => void {
  let raf    = 0;
  let t      = 0;
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
      const key     = canvas.dataset.scene ?? "";
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
