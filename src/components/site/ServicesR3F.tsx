"use client";

import { useEffect } from "react";
import type * as ThreeTypes from "three";

// ─── Types ────────────────────────────────────────────────────────────────────

type SceneFactory = (
  THREE: typeof ThreeTypes,
  canvas: HTMLCanvasElement,
  isMobile: boolean,
) => () => void; // returns cleanup/dispose function

// ─── Scene definitions ────────────────────────────────────────────────────────

const SCENES: Record<string, SceneFactory> = {

  // ── Web prezentacije — rotating icosahedron + particles ─────────────────────
  "web-prezentacije": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = makeRenderer(THREE, canvas, isMobile, 3.2);

    scene.add(new THREE.AmbientLight(0x112244, 3));
    const dir = new THREE.DirectionalLight(0x4466ff, 5);
    dir.position.set(2, 3, 2);
    scene.add(dir);

    // Main icosahedron — no per-frame vertex updates
    const detail = isMobile ? 1 : 2;
    const geo = new THREE.IcosahedronGeometry(1.1, detail);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x1133dd,
      emissive: 0x0022aa,
      emissiveIntensity: 0.6,
      metalness: 0.7,
      roughness: 0.3,
      wireframe: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const wire = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({ color: 0x4488ff, wireframe: true, transparent: true, opacity: 0.18 }),
    );
    scene.add(wire);

    // Particles
    scene.add(makeParticles(THREE, isMobile ? 60 : 120, 4, 0x4477ff));

    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 0.6;
      my = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    if (!isMobile) window.addEventListener("mousemove", onMouse);

    return stopLoop(renderer, scene, camera, (t) => {
      mesh.rotation.x += 0.003;
      mesh.rotation.y += 0.005;
      wire.rotation.x = mesh.rotation.x;
      wire.rotation.y = mesh.rotation.y;
      camera.position.x += (mx - camera.position.x) * 0.05;
      camera.position.y += (my - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
    }, () => {
      window.removeEventListener("mousemove", onMouse);
      stopResize();
      geo.dispose(); mat.dispose();
    });
  },

  // ── E-commerce — holographic orbit rings + boxes ────────────────────────────
  "ecommerce": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = makeRenderer(THREE, canvas, isMobile, 4);

    scene.add(new THREE.AmbientLight(0x051a10, 3));
    const p1 = new THREE.PointLight(0x00ffaa, 6, 7); p1.position.set(2, 2, 1); scene.add(p1);
    const p2 = new THREE.PointLight(0x00ccff, 4, 6); p2.position.set(-2, -1, 2); scene.add(p2);

    // Central glowing core
    const coreGeo = new THREE.SphereGeometry(0.32, 24, 24);
    const coreMat = new THREE.MeshStandardMaterial({ color: 0x00ffaa, emissive: 0x00aa66, emissiveIntensity: 2, metalness: 1, roughness: 0 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Orbit torus rings
    const ringColors = [0x00ffcc, 0x00ddff, 0x44ffaa];
    const rings: ThreeTypes.Mesh[] = [];
    ringColors.forEach((color, i) => {
      const rg = new THREE.TorusGeometry(0.8 + i * 0.5, 0.008, 6, 64);
      const rm = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 1, metalness: 0.9, roughness: 0.1 });
      const r = new THREE.Mesh(rg, rm);
      r.rotation.x = (i * Math.PI) / 3 + 0.3;
      r.rotation.z = i * 0.4;
      scene.add(r);
      rings.push(r);
    });

    // Small orbiting boxes (InstancedMesh — 1 draw call)
    const boxCount = isMobile ? 8 : 14;
    const boxGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
    const boxMat = new THREE.MeshStandardMaterial({ color: 0x00ffaa, emissive: 0x00cc88, emissiveIntensity: 0.8, metalness: 1, roughness: 0, transparent: true, opacity: 0.8 });
    const boxInst = new THREE.InstancedMesh(boxGeo, boxMat, boxCount);
    scene.add(boxInst);
    const dummy = new THREE.Object3D();
    const boxAngles = Array.from({ length: boxCount }, (_, i) => (i / boxCount) * Math.PI * 2);
    const boxRadii = Array.from({ length: boxCount }, (_, i) => 0.8 + Math.floor(i % 3) * 0.5);
    const boxTilts = Array.from({ length: boxCount }, (_, i) => (Math.floor(i / 3) * Math.PI) / 3 + 0.3);

    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => { mx = (e.clientX / window.innerWidth - 0.5) * 0.5; my = -(e.clientY / window.innerHeight - 0.5) * 0.3; };
    if (!isMobile) window.addEventListener("mousemove", onMouse);

    return stopLoop(renderer, scene, camera, (t) => {
      core.rotation.y = t * 0.5;
      const pulse = 1 + 0.07 * Math.sin(t * 2);
      core.scale.setScalar(pulse);
      rings.forEach((r, i) => { r.rotation.z = t * (0.25 + i * 0.1); r.rotation.y = t * 0.15; });

      boxAngles.forEach((_, i) => {
        boxAngles[i] += 0.008;
        const a = boxAngles[i]; const r = boxRadii[i]; const tilt = boxTilts[i];
        dummy.position.set(Math.cos(a) * r, Math.sin(tilt) * Math.sin(a) * r * 0.4, Math.sin(a) * r * Math.cos(tilt));
        dummy.rotation.set(t * 0.5 + i, t * 0.3 + i, 0);
        dummy.updateMatrix();
        boxInst.setMatrixAt(i, dummy.matrix);
      });
      boxInst.instanceMatrix.needsUpdate = true;
      camera.position.x += (mx - camera.position.x) * 0.05;
      camera.position.y += (my - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
    }, () => { window.removeEventListener("mousemove", onMouse); stopResize(); coreGeo.dispose(); coreMat.dispose(); boxGeo.dispose(); boxMat.dispose(); });
  },

  // ── Mobilne aplikacije — signal ripple rings ───────────────────────────────
  "mobile-app": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = makeRenderer(THREE, canvas, isMobile, 3.5);

    scene.add(new THREE.AmbientLight(0x050520, 4));
    const p = new THREE.PointLight(0x4488ff, 8, 6); p.position.set(0, 0, 2); scene.add(p);

    // Device body
    const devGeo = new THREE.BoxGeometry(0.26, 0.50, 0.04);
    const devMat = new THREE.MeshStandardMaterial({ color: 0x3366ff, emissive: 0x1133cc, emissiveIntensity: 1.2, metalness: 0.9, roughness: 0.1 });
    const device = new THREE.Mesh(devGeo, devMat);
    scene.add(device);

    // Ripple rings (RingGeometry, no per-frame vertex updates)
    const rippleCount = isMobile ? 5 : 8;
    const ripples: { mesh: ThreeTypes.Mesh; phase: number }[] = [];
    for (let i = 0; i < rippleCount; i++) {
      const rg = new THREE.RingGeometry(0.01, 1.0, 48);
      const rm = new THREE.MeshBasicMaterial({ color: 0x4488ff, transparent: true, opacity: 0, side: THREE.DoubleSide });
      const r = new THREE.Mesh(rg, rm);
      scene.add(r);
      ripples.push({ mesh: r, phase: (i / rippleCount) * Math.PI * 2 });
    }

    scene.add(makeParticles(THREE, isMobile ? 40 : 80, 3, 0x88aaff));

    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => { mx = (e.clientX / window.innerWidth - 0.5) * 0.6; my = -(e.clientY / window.innerHeight - 0.5) * 0.4; };
    if (!isMobile) window.addEventListener("mousemove", onMouse);

    return stopLoop(renderer, scene, camera, (t) => {
      device.rotation.y = mx * 0.8 + Math.sin(t * 0.4) * 0.1;
      device.rotation.x = my * 0.5;
      ripples.forEach(({ mesh, phase }) => {
        const progress = ((t * 0.45 + phase / (Math.PI * 2)) % 1);
        mesh.scale.setScalar(progress * 2.5);
        (mesh.material as ThreeTypes.MeshBasicMaterial).opacity = (1 - progress) * 0.55;
      });
      camera.position.x += (mx * 0.3 - camera.position.x) * 0.05;
      camera.lookAt(0, 0, 0);
    }, () => { window.removeEventListener("mousemove", onMouse); stopResize(); devGeo.dispose(); devMat.dispose(); });
  },

  // ── CMS — DNA double helix (InstancedMesh, no CPU vertex loops) ────────────
  "cms": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = makeRenderer(THREE, canvas, isMobile, 4);

    scene.add(new THREE.AmbientLight(0x001a0a, 3));
    const p1 = new THREE.PointLight(0x00ff99, 6, 6); p1.position.set(2, 2, 1); scene.add(p1);
    const p2 = new THREE.PointLight(0x00ccff, 4, 6); p2.position.set(-2, -2, 1); scene.add(p2);

    const count = isMobile ? 24 : 44;
    const height = 3.2;

    const nodeGeo = new THREE.SphereGeometry(0.065, 7, 7);
    const mat1 = new THREE.MeshStandardMaterial({ color: 0x00ff99, emissive: 0x00cc77, emissiveIntensity: 1.5, metalness: 0.7, roughness: 0.2 });
    const mat2 = new THREE.MeshStandardMaterial({ color: 0x00ccff, emissive: 0x0088cc, emissiveIntensity: 1.5, metalness: 0.7, roughness: 0.2 });
    const strand1 = new THREE.InstancedMesh(nodeGeo, mat1, count);
    const strand2 = new THREE.InstancedMesh(nodeGeo, mat2, count);
    scene.add(strand1, strand2);

    const rungGeo = new THREE.CylinderGeometry(0.01, 0.01, 1, 4);
    const rungMat = new THREE.MeshStandardMaterial({ color: 0x00ffaa, emissive: 0x00aa66, emissiveIntensity: 0.4, transparent: true, opacity: 0.45 });
    const rungs = new THREE.InstancedMesh(rungGeo, rungMat, count);
    scene.add(rungs);

    const dummy = new THREE.Object3D();

    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => { mx = (e.clientX / window.innerWidth - 0.5) * 0.5; my = -(e.clientY / window.innerHeight - 0.5) * 0.3; };
    if (!isMobile) window.addEventListener("mousemove", onMouse);

    return stopLoop(renderer, scene, camera, (t) => {
      for (let i = 0; i < count; i++) {
        const frac = i / count;
        const angle = frac * Math.PI * 4 + t * 0.5;
        const y = (frac - 0.5) * height;
        const R = 0.58;
        dummy.position.set(Math.cos(angle) * R, y, Math.sin(angle) * R);
        dummy.updateMatrix(); strand1.setMatrixAt(i, dummy.matrix);
        dummy.position.set(-Math.cos(angle) * R, y, -Math.sin(angle) * R);
        dummy.updateMatrix(); strand2.setMatrixAt(i, dummy.matrix);
        dummy.position.set(0, y, 0);
        dummy.rotation.set(0, -angle - Math.PI / 2, Math.PI / 2);
        dummy.scale.setScalar(1); dummy.updateMatrix();
        rungs.setMatrixAt(i, dummy.matrix);
      }
      strand1.instanceMatrix.needsUpdate = true;
      strand2.instanceMatrix.needsUpdate = true;
      rungs.instanceMatrix.needsUpdate = true;
      scene.rotation.y = t * 0.15 + mx * 0.5;
      scene.rotation.x = my * 0.25;
    }, () => { window.removeEventListener("mousemove", onMouse); stopResize(); nodeGeo.dispose(); mat1.dispose(); mat2.dispose(); rungGeo.dispose(); rungMat.dispose(); });
  },

  // ── AI — neural network + flowing particles ────────────────────────────────
  "ai": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = makeRenderer(THREE, canvas, isMobile, 4);

    scene.add(new THREE.AmbientLight(0x0a0020, 4));
    const p1 = new THREE.PointLight(0xcc44ff, 8, 6); p1.position.set(0, 1, 2); scene.add(p1);
    const p2 = new THREE.PointLight(0x4422ff, 4, 5); p2.position.set(-2, -1, 1); scene.add(p2);

    const layers = isMobile ? [2, 3, 3, 2] : [3, 5, 5, 3];
    const totalNodes = layers.reduce((a, b) => a + b, 0);

    const nodeGeo = new THREE.SphereGeometry(0.1, 10, 10);
    const nodeMat = new THREE.MeshStandardMaterial({ color: 0xcc44ff, emissive: 0x8822cc, emissiveIntensity: 2, metalness: 0.8, roughness: 0.1 });
    const nodeInst = new THREE.InstancedMesh(nodeGeo, nodeMat, totalNodes);
    scene.add(nodeInst);

    const nodePos: ThreeTypes.Vector3[] = [];
    const dummy = new THREE.Object3D();
    let ni = 0;
    layers.forEach((count, li) => {
      for (let i = 0; i < count; i++) {
        const v = new THREE.Vector3((li - layers.length / 2 + 0.5) * 1.1, (i - count / 2 + 0.5) * 0.72, 0);
        nodePos.push(v);
        dummy.position.copy(v); dummy.updateMatrix();
        nodeInst.setMatrixAt(ni++, dummy.matrix);
      }
    });
    nodeInst.instanceMatrix.needsUpdate = true;

    // Connection lines
    const connPts: number[] = [];
    let ls = 0;
    for (let li = 0; li < layers.length - 1; li++) {
      const ns = ls + layers[li];
      for (let a = 0; a < layers[li]; a++) {
        for (let b = 0; b < layers[li + 1]; b++) {
          const pa = nodePos[ls + a], pb = nodePos[ns + b];
          connPts.push(pa.x, pa.y, pa.z, pb.x, pb.y, pb.z);
        }
      }
      ls += layers[li];
    }
    const connGeo = new THREE.BufferGeometry();
    connGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(connPts), 3));
    scene.add(new THREE.LineSegments(connGeo, new THREE.LineBasicMaterial({ color: 0x8833cc, transparent: true, opacity: 0.18 })));

    // Flowing particles along connections
    const ptCount = isMobile ? 30 : 60;
    const ptGeo = new THREE.BufferGeometry();
    const ptPos = new Float32Array(ptCount * 3);
    const ptProg = new Float32Array(ptCount).map(() => Math.random());
    const ptConn = new Uint16Array(ptCount).map(() => Math.floor(Math.random() * (connPts.length / 6)));
    ptGeo.setAttribute("position", new THREE.BufferAttribute(ptPos, 3));
    const ptMat = new THREE.PointsMaterial({ color: 0xff88ff, size: 0.045, sizeAttenuation: true, transparent: true, opacity: 0.9 });
    scene.add(new THREE.Points(ptGeo, ptMat));

    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => { mx = (e.clientX / window.innerWidth - 0.5) * 0.4; my = -(e.clientY / window.innerHeight - 0.5) * 0.3; };
    if (!isMobile) window.addEventListener("mousemove", onMouse);

    return stopLoop(renderer, scene, camera, (t) => {
      // Pulse nodes via scale
      for (let i = 0; i < totalNodes; i++) {
        const s = 0.8 + 0.35 * Math.abs(Math.sin(t * 1.5 + i * 0.6));
        dummy.position.copy(nodePos[i]); dummy.scale.setScalar(s); dummy.updateMatrix();
        nodeInst.setMatrixAt(i, dummy.matrix);
      }
      nodeInst.instanceMatrix.needsUpdate = true;

      // Move flow particles
      const posAttr = ptGeo.attributes.position as ThreeTypes.BufferAttribute;
      for (let i = 0; i < ptCount; i++) {
        ptProg[i] += 0.009;
        if (ptProg[i] > 1) { ptProg[i] = 0; ptConn[i] = Math.floor(Math.random() * (connPts.length / 6)); }
        const ci = ptConn[i] * 6; const p = ptProg[i];
        posAttr.setXYZ(i, connPts[ci] + (connPts[ci+3]-connPts[ci])*p, connPts[ci+1] + (connPts[ci+4]-connPts[ci+1])*p, connPts[ci+2] + (connPts[ci+5]-connPts[ci+2])*p);
      }
      posAttr.needsUpdate = true;
      scene.rotation.y = mx * 0.5 + Math.sin(t * 0.2) * 0.08;
      scene.rotation.x = my * 0.3;
    }, () => { window.removeEventListener("mousemove", onMouse); stopResize(); nodeGeo.dispose(); nodeMat.dispose(); connGeo.dispose(); ptGeo.dispose(); ptMat.dispose(); });
  },

  // ── SEO — radar sweep + data orbs ─────────────────────────────────────────
  "seo": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = makeRenderer(THREE, canvas, isMobile, 4);
    camera.position.set(0, 1.8, 4); camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0x001a00, 3));
    const p = new THREE.PointLight(0x00ff66, 6, 7); p.position.set(0, 3, 1); scene.add(p);

    // Radar rings
    for (let i = 1; i <= 4; i++) {
      const rg = new THREE.RingGeometry(i * 0.55 - 0.004, i * 0.55 + 0.004, 56);
      const rm = new THREE.MeshBasicMaterial({ color: 0x00aa44, transparent: true, opacity: 0.22 });
      const ring = new THREE.Mesh(rg, rm);
      ring.rotation.x = -Math.PI / 2; scene.add(ring);
    }

    // Sweep
    const sweepGeo = new THREE.CircleGeometry(2.5, 56, 0, Math.PI / 5);
    const sweepMat = new THREE.MeshBasicMaterial({ color: 0x00ff66, transparent: true, opacity: 0.1, side: THREE.DoubleSide });
    const sweep = new THREE.Mesh(sweepGeo, sweepMat);
    sweep.rotation.x = -Math.PI / 2; scene.add(sweep);

    // Data orbs (InstancedMesh)
    const orbCount = isMobile ? 12 : 20;
    const orbGeo = new THREE.SphereGeometry(0.06, 7, 7);
    const orbMat = new THREE.MeshStandardMaterial({ color: 0x44ff88, emissive: 0x00cc55, emissiveIntensity: 2, metalness: 0.5, roughness: 0.2 });
    const orbInst = new THREE.InstancedMesh(orbGeo, orbMat, orbCount);
    scene.add(orbInst);
    const dummy = new THREE.Object3D();
    const orbData = Array.from({ length: orbCount }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 0.4 + Math.random() * 1.8,
      h: Math.random() * 0.5,
      blip: 0,
    }));

    // Bars
    const barCount = isMobile ? 8 : 12;
    const barGeo = new THREE.BoxGeometry(0.11, 1, 0.11);
    const bars: { mesh: ThreeTypes.Mesh; target: number; phase: number }[] = [];
    for (let i = 0; i < barCount; i++) {
      const bm = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(0.33 + (i / barCount) * 0.1, 1, 0.5),
        emissive: new THREE.Color().setHSL(0.33 + (i / barCount) * 0.1, 1, 0.3),
        emissiveIntensity: 1, metalness: 0.4, roughness: 0.3,
      });
      const m = new THREE.Mesh(barGeo, bm);
      m.position.set((i - barCount / 2) * 0.27, 0, -1.8);
      scene.add(m);
      bars.push({ mesh: m, target: 0.3 + Math.random() * 1.4, phase: Math.random() * Math.PI * 2 });
    }

    let sweepAngle = 0;
    return stopLoop(renderer, scene, camera, (t) => {
      sweepAngle += 0.022;
      sweep.rotation.y = sweepAngle;
      const sweepPos = sweepAngle % (Math.PI * 2);

      orbData.forEach((orb, i) => {
        const diff = (sweepPos - orb.angle + Math.PI * 4) % (Math.PI * 2);
        if (diff < 0.18) orb.blip = 1;
        orb.blip *= 0.95;
        dummy.position.set(Math.cos(orb.angle) * orb.radius, orb.h + Math.sin(t * 0.5 + i) * 0.05, Math.sin(orb.angle) * orb.radius);
        dummy.scale.setScalar(0.7 + orb.blip * 1.3);
        dummy.updateMatrix(); orbInst.setMatrixAt(i, dummy.matrix);
      });
      orbInst.instanceMatrix.needsUpdate = true;

      bars.forEach(({ mesh, target, phase }) => {
        const h = target * (0.7 + 0.3 * Math.sin(t * 0.8 + phase));
        mesh.scale.y = h; mesh.position.y = h * 0.5 - 0.5;
      });
    }, () => { stopResize(); sweepGeo.dispose(); sweepMat.dispose(); orbGeo.dispose(); orbMat.dispose(); barGeo.dispose(); });
  },

  // ── Cyber security — layered rotating shields ──────────────────────────────
  "security": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = makeRenderer(THREE, canvas, isMobile, 3.5);

    scene.add(new THREE.AmbientLight(0x200010, 3));
    const p1 = new THREE.PointLight(0xff2244, 8, 6); p1.position.set(0, 2, 2); scene.add(p1);
    const p2 = new THREE.PointLight(0xff8800, 4, 5); p2.position.set(-2, -1, 1); scene.add(p2);

    const detail = isMobile ? 1 : 2;
    const sizes = [1.4, 1.0, 0.6];
    const colors = [0xff4444, 0xff6622, 0xff9900];
    const shields = sizes.map((size, i) => {
      const sg = new THREE.IcosahedronGeometry(size, detail);
      const sm = new THREE.MeshStandardMaterial({
        color: colors[i], emissive: colors[i], emissiveIntensity: 0.4 + i * 0.2,
        metalness: 0.9, roughness: 0.1, wireframe: true, transparent: true, opacity: 0.3 - i * 0.07,
      });
      const m = new THREE.Mesh(sg, sm);
      scene.add(m);
      return m;
    });

    const coreGeo = new THREE.OctahedronGeometry(0.28, 0);
    const coreMat = new THREE.MeshStandardMaterial({ color: 0xff6600, emissive: 0xff3300, emissiveIntensity: 3, metalness: 1, roughness: 0 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    const scanGeo = new THREE.TorusGeometry(1.55, 0.005, 4, 72);
    const scanMat = new THREE.MeshBasicMaterial({ color: 0xff4444, transparent: true, opacity: 0.7 });
    scene.add(new THREE.Mesh(scanGeo, scanMat));

    scene.add(makeParticles(THREE, isMobile ? 30 : 50, 4, 0xff6644));

    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => { mx = (e.clientX / window.innerWidth - 0.5) * 0.5; my = -(e.clientY / window.innerHeight - 0.5) * 0.4; };
    if (!isMobile) window.addEventListener("mousemove", onMouse);

    return stopLoop(renderer, scene, camera, (t) => {
      shields[0].rotation.y = t * 0.2; shields[0].rotation.x = t * 0.1;
      shields[1].rotation.y = -t * 0.35; shields[1].rotation.z = t * 0.15;
      shields[2].rotation.x = t * 0.5; shields[2].rotation.y = -t * 0.3;
      core.rotation.x = t * 0.8; core.rotation.y = t * 0.6;
      core.scale.setScalar(1 + 0.12 * Math.sin(t * 3));
      scene.rotation.y = mx * 0.5; scene.rotation.x = my * 0.3;
    }, () => { window.removeEventListener("mousemove", onMouse); stopResize(); coreGeo.dispose(); coreMat.dispose(); scanGeo.dispose(); scanMat.dispose(); });
  },

  // ── UI/UX dizajn — morphing icosahedron + orbiting cards ──────────────────
  "uiux": (THREE, canvas, isMobile) => {
    const { renderer, scene, camera, stopResize } = makeRenderer(THREE, canvas, isMobile, 4);

    scene.add(new THREE.AmbientLight(0x001a2a, 3));
    const p1 = new THREE.PointLight(0x00ccff, 8, 6); p1.position.set(2, 2, 2); scene.add(p1);
    const p2 = new THREE.PointLight(0x0044ff, 4, 5); p2.position.set(-2, -1, 1); scene.add(p2);

    // Icosahedron — morph via uniform noise, NOT per-vertex CPU loop
    const detail = isMobile ? 2 : 4;
    const morphGeo = new THREE.IcosahedronGeometry(1.0, detail);
    const morphMat = new THREE.MeshStandardMaterial({
      color: 0x0099ff, emissive: 0x003366, emissiveIntensity: 0.8, metalness: 0.7, roughness: 0.2,
    });
    const morphMesh = new THREE.Mesh(morphGeo, morphMat);
    scene.add(morphMesh);

    // Wireframe overlay
    const wireGeo = new THREE.IcosahedronGeometry(1.05, isMobile ? 1 : 3);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x44ccff, wireframe: true, transparent: true, opacity: 0.14 });
    scene.add(new THREE.Mesh(wireGeo, wireMat));

    // Save original positions for morph
    const posAttr = morphGeo.attributes.position as ThreeTypes.BufferAttribute;
    const origPos = new Float32Array(posAttr.array);

    // Floating mini cards (InstancedMesh)
    const cardCount = isMobile ? 3 : 5;
    const cardGeo = new THREE.BoxGeometry(0.38, 0.24, 0.02);
    const cardMat = new THREE.MeshStandardMaterial({ color: 0x0055cc, emissive: 0x0033aa, emissiveIntensity: 0.8, metalness: 0.9, roughness: 0.05, transparent: true, opacity: 0.75 });
    const cardInst = new THREE.InstancedMesh(cardGeo, cardMat, cardCount);
    scene.add(cardInst);
    const cardDummy = new THREE.Object3D();
    const cardAngles = Array.from({ length: cardCount }, (_, i) => (i / cardCount) * Math.PI * 2);
    const cardRadii = Array.from({ length: cardCount }, (_, i) => 1.6 + (i % 2) * 0.3);

    scene.add(makeParticles(THREE, isMobile ? 50 : 100, 3, 0x44aaff));

    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => { mx = (e.clientX / window.innerWidth - 0.5) * 0.4; my = -(e.clientY / window.innerHeight - 0.5) * 0.3; };
    if (!isMobile) window.addEventListener("mousemove", onMouse);

    return stopLoop(renderer, scene, camera, (t) => {
      if (!isMobile) {
        // Vertex displacement only on desktop — too expensive on mobile
        for (let i = 0; i < posAttr.count; i++) {
          const ox = origPos[i * 3], oy = origPos[i * 3 + 1], oz = origPos[i * 3 + 2];
          const n = Math.sin(ox * 2 + t * 0.7) * Math.cos(oy * 1.8 + t * 0.5) * 0.15;
          const len = Math.sqrt(ox*ox + oy*oy + oz*oz);
          posAttr.setXYZ(i, ox + (ox/len)*n, oy + (oy/len)*n, oz + (oz/len)*n);
        }
        posAttr.needsUpdate = true;
        morphGeo.computeVertexNormals();
      }
      morphMesh.rotation.y = t * 0.18 + mx * 0.4;
      morphMesh.rotation.x = t * 0.1 + my * 0.25;

      cardAngles.forEach((_, i) => {
        cardAngles[i] += (0.2 + i * 0.05) * 0.012;
        const a = cardAngles[i];
        cardDummy.position.set(Math.cos(a) * cardRadii[i], Math.sin(a * 0.5) * 0.4, Math.sin(a) * cardRadii[i]);
        cardDummy.lookAt(0, 0, 0);
        cardDummy.updateMatrix();
        cardInst.setMatrixAt(i, cardDummy.matrix);
      });
      cardInst.instanceMatrix.needsUpdate = true;
    }, () => { window.removeEventListener("mousemove", onMouse); stopResize(); morphGeo.dispose(); morphMat.dispose(); wireGeo.dispose(); wireMat.dispose(); cardGeo.dispose(); cardMat.dispose(); });
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeRenderer(THREE: typeof ThreeTypes, canvas: HTMLCanvasElement, isMobile: boolean, camZ = 3) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const w = canvas.clientWidth || 400;
  const h = canvas.clientHeight || 300;
  renderer.setSize(w, h, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
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

function makeParticles(THREE: typeof ThreeTypes, count: number, spread: number, color: number): ThreeTypes.Points {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * spread;
    pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
    pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  return new THREE.Points(geo, new THREE.PointsMaterial({ color, size: 0.022, sizeAttenuation: true, transparent: true, opacity: 0.55 }));
}

/**
 * Starts the rAF loop, pauses when canvas is off-screen.
 * Returns a cleanup function that cancels the loop and runs extraDispose.
 */
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
//
// Strategy: lazy-create each renderer when card enters the viewport (300px
// rootMargin so it's ready before the card is fully visible). Destroy it
// when the card has been off-screen for DISPOSE_DELAY ms. This caps the
// number of live WebGL contexts to ~2 at any time (only visible cards have
// active renderers), well under browser limits even with Spline contexts.
//
// On mobile: DPR=1, simpler geometry counts, pause render when off-screen.

const DISPOSE_DELAY = 2000; // ms after leaving view before context is destroyed

export function ServicesR3F() {
  useEffect(() => {
    const isMobile = window.matchMedia("(hover: none)").matches;
    let THREE: typeof ThreeTypes | null = null;

    // Map from canvas element to { dispose fn, timeout id }
    const active = new Map<HTMLCanvasElement, { dispose: () => void; timer: ReturnType<typeof setTimeout> | null }>();

    // Create scene lazily
    function create(canvas: HTMLCanvasElement) {
      const existing = active.get(canvas);
      if (existing) {
        // Cancel any pending disposal
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

    // Schedule disposal after delay
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

    // Viewport observer with generous rootMargin so scenes init before visible
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
