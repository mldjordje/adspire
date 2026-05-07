"use client";

import { useEffect } from "react";
import type * as ThreeTypes from "three";

// ─── Types ────────────────────────────────────────────────────────────────────

type SceneFactory = (
  THREE: typeof ThreeTypes,
  isMobile: boolean,
) => SceneHandle;

interface SceneHandle {
  scene: ThreeTypes.Scene;
  camera: ThreeTypes.PerspectiveCamera;
  tick: (t: number, mouseX: number, mouseY: number) => void;
  dispose: () => void;
}

// ─── Scene factories ──────────────────────────────────────────────────────────

const SCENES: Record<string, SceneFactory> = {

  // ── Web prezentacije — fluid displacement mesh ─────────────────────────────
  "web-prezentacije": (THREE, isMobile) => {
    const scene = new THREE.Scene();
    const camera = makeCam(THREE, 3.2);

    // Ambient + directional light
    scene.add(new THREE.AmbientLight(0x1a1a3a, 2));
    const dir = new THREE.DirectionalLight(0x4466ff, 4);
    dir.position.set(2, 3, 2);
    scene.add(dir);
    const rim = new THREE.DirectionalLight(0x0033ff, 2);
    rim.position.set(-3, -1, 1);
    scene.add(rim);

    const seg = isMobile ? 32 : 64;
    const geo = new THREE.PlaneGeometry(4, 4, seg, seg);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x0a1aff,
      metalness: 0.6,
      roughness: 0.2,
      wireframe: false,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 3;
    scene.add(mesh);

    // Wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x3366ff,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const wire = new THREE.Mesh(geo, wireMat);
    wire.rotation.x = -Math.PI / 3;
    scene.add(wire);

    // Floating orbs
    const orbGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const orbMat = new THREE.MeshStandardMaterial({ color: 0x6699ff, emissive: 0x3355ff, emissiveIntensity: 1.5, metalness: 0.8, roughness: 0.1 });
    const orbCount = isMobile ? 8 : 16;
    const orbs: { m: ThreeTypes.Mesh; ox: number; oy: number; oz: number; speed: number }[] = [];
    for (let i = 0; i < orbCount; i++) {
      const m = new THREE.Mesh(orbGeo, orbMat.clone());
      const ox = (Math.random() - 0.5) * 3;
      const oy = (Math.random() - 0.5) * 2;
      const oz = Math.random() * 0.8;
      m.position.set(ox, oy, oz);
      scene.add(m);
      orbs.push({ m, ox, oy, oz, speed: 0.3 + Math.random() * 0.7 });
    }

    const pos = geo.attributes.position as ThreeTypes.BufferAttribute;
    const origY = new Float32Array(pos.count);
    for (let i = 0; i < pos.count; i++) origY[i] = pos.getY(i);

    return {
      scene, camera,
      tick(t, mx, my) {
        // Displace vertices in a wave
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const z = pos.getZ(i);
          pos.setY(i, origY[i] + Math.sin(x * 1.5 + t * 0.8) * 0.12 + Math.sin(z * 1.5 + t * 0.6) * 0.12);
        }
        pos.needsUpdate = true;
        geo.computeVertexNormals();

        // Orb float
        orbs.forEach(({ m, ox, oy, oz, speed }) => {
          m.position.x = ox + mx * 0.3;
          m.position.y = oy + Math.sin(t * speed + ox) * 0.15 + my * 0.2;
          m.position.z = oz + Math.cos(t * speed * 0.7 + oy) * 0.1;
        });

        camera.position.x = mx * 0.4;
        camera.position.y = my * 0.2;
        camera.lookAt(0, 0, 0);
      },
      dispose() { geo.dispose(); mat.dispose(); wireMat.dispose(); orbGeo.dispose(); },
    };
  },

  // ── E-commerce — holographic glass orbits ─────────────────────────────────
  "ecommerce": (THREE, isMobile) => {
    const scene = new THREE.Scene();
    const camera = makeCam(THREE, 4);

    scene.add(new THREE.AmbientLight(0x0a2a1a, 3));
    const p1 = new THREE.PointLight(0x00ffaa, 8, 6);
    p1.position.set(2, 2, 1);
    scene.add(p1);
    const p2 = new THREE.PointLight(0x00ccff, 5, 6);
    p2.position.set(-2, -1, 2);
    scene.add(p2);

    // Central glowing sphere
    const coreGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00ffaa,
      emissive: 0x00aa66,
      emissiveIntensity: 2,
      metalness: 1,
      roughness: 0,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Orbit rings
    const ringCount = 3;
    const rings: ThreeTypes.Mesh[] = [];
    const ringColors = [0x00ffcc, 0x00ddff, 0x44ffaa];
    for (let i = 0; i < ringCount; i++) {
      const rg = new THREE.TorusGeometry(0.8 + i * 0.5, 0.008, 8, 80);
      const rm = new THREE.MeshStandardMaterial({
        color: ringColors[i],
        emissive: ringColors[i],
        emissiveIntensity: 1.2,
        metalness: 0.9,
        roughness: 0.1,
      });
      const r = new THREE.Mesh(rg, rm);
      r.rotation.x = (i * Math.PI) / 3 + 0.3;
      r.rotation.z = i * 0.4;
      scene.add(r);
      rings.push(r);
    }

    // Orbiting boxes (glass look)
    const boxCount = isMobile ? 6 : 10;
    const boxes: { m: ThreeTypes.Mesh; angle: number; radius: number; speed: number; tiltX: number; tiltZ: number }[] = [];
    const boxGeo = new THREE.BoxGeometry(0.14, 0.14, 0.14);
    for (let i = 0; i < boxCount; i++) {
      const bm = new THREE.MeshStandardMaterial({
        color: 0x00ffaa,
        emissive: 0x00cc88,
        emissiveIntensity: 0.8,
        metalness: 1,
        roughness: 0,
        transparent: true,
        opacity: 0.75,
        wireframe: i % 3 === 0,
      });
      const m = new THREE.Mesh(boxGeo, bm);
      const radius = 0.8 + Math.floor(i / 3) * 0.5;
      const tiltX = ((i * Math.PI) / 3 + 0.3) * (Math.floor(i / 3) + 1) / ringCount;
      const tiltZ = Math.floor(i / 3) * 0.4;
      boxes.push({ m, angle: (i / boxCount) * Math.PI * 2, radius, speed: 0.3 + (i % 3) * 0.1, tiltX, tiltZ });
      scene.add(m);
    }

    return {
      scene, camera,
      tick(t, mx, my) {
        core.rotation.y = t * 0.5;
        core.rotation.x = t * 0.3;
        const pulse = 1 + 0.08 * Math.sin(t * 2);
        core.scale.setScalar(pulse);

        rings.forEach((r, i) => {
          r.rotation.z = t * (0.25 + i * 0.1);
          r.rotation.y = t * 0.15;
        });

        boxes.forEach((b) => {
          b.angle += 0.008 * b.speed;
          // Compute position on tilted ring
          const localX = Math.cos(b.angle) * b.radius;
          const localY = Math.sin(b.angle) * b.radius;
          const cx = Math.cos(b.tiltZ), sx = Math.sin(b.tiltX), cz = Math.cos(b.tiltX), sz = Math.sin(b.tiltZ);
          b.m.position.set(
            localX * cx - localY * sz * sx,
            localY * cz,
            localX * sx + localY * sz * cx,
          );
          b.m.rotation.x += 0.02;
          b.m.rotation.y += 0.015;
        });

        camera.position.x = mx * 0.5;
        camera.position.y = my * 0.3;
        camera.lookAt(0, 0, 0);
      },
      dispose() { coreGeo.dispose(); coreMat.dispose(); boxGeo.dispose(); },
    };
  },

  // ── Mobilne aplikacije — signal ripple rings ───────────────────────────────
  "mobile-app": (THREE, isMobile) => {
    const scene = new THREE.Scene();
    const camera = makeCam(THREE, 3.5);

    scene.add(new THREE.AmbientLight(0x050520, 4));
    const p = new THREE.PointLight(0x4488ff, 10, 5);
    p.position.set(0, 0, 2);
    scene.add(p);

    // Central device silhouette
    const deviceGeo = new THREE.BoxGeometry(0.28, 0.52, 0.04);
    const deviceMat = new THREE.MeshStandardMaterial({
      color: 0x4488ff,
      emissive: 0x2244cc,
      emissiveIntensity: 1,
      metalness: 0.9,
      roughness: 0.1,
    });
    const device = new THREE.Mesh(deviceGeo, deviceMat);
    scene.add(device);

    // Signal ripple rings - flat circles that expand outward
    const rippleCount = isMobile ? 5 : 8;
    const ripples: { mesh: ThreeTypes.Mesh; phase: number }[] = [];
    for (let i = 0; i < rippleCount; i++) {
      const rg = new THREE.RingGeometry(0, 1, 48);
      const rm = new THREE.MeshBasicMaterial({
        color: 0x4488ff,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });
      const r = new THREE.Mesh(rg, rm);
      scene.add(r);
      ripples.push({ mesh: r, phase: (i / rippleCount) * Math.PI * 2 });
    }

    // Particle cloud
    const ptCount = isMobile ? 40 : 80;
    const ptGeo = new THREE.BufferGeometry();
    const ptPos = new Float32Array(ptCount * 3);
    const ptPhase = new Float32Array(ptCount);
    for (let i = 0; i < ptCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 0.8 + Math.random() * 1.5;
      ptPos[i * 3] = Math.cos(a) * r;
      ptPos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      ptPos[i * 3 + 2] = Math.sin(a) * r * 0.3;
      ptPhase[i] = Math.random() * Math.PI * 2;
    }
    ptGeo.setAttribute("position", new THREE.BufferAttribute(ptPos, 3));
    const ptMat = new THREE.PointsMaterial({ color: 0x88aaff, size: 0.03, sizeAttenuation: true, transparent: true, opacity: 0.6 });
    scene.add(new THREE.Points(ptGeo, ptMat));

    return {
      scene, camera,
      tick(t, mx, my) {
        device.rotation.y = mx * 0.6 + Math.sin(t * 0.4) * 0.1;
        device.rotation.x = my * 0.4;

        ripples.forEach(({ mesh, phase }) => {
          const progress = ((t * 0.5 + phase / (Math.PI * 2)) % 1);
          const scale = progress * 2.2;
          mesh.scale.setScalar(scale);
          (mesh.material as ThreeTypes.MeshBasicMaterial).opacity = (1 - progress) * 0.5;
        });

        // Float particles
        const pos = ptGeo.attributes.position as ThreeTypes.BufferAttribute;
        for (let i = 0; i < ptCount; i++) {
          pos.setY(i, ptPos[i * 3 + 1] + Math.sin(t * 0.6 + ptPhase[i]) * 0.06);
        }
        pos.needsUpdate = true;

        camera.position.x = mx * 0.3;
        camera.position.y = my * 0.2;
        camera.lookAt(0, 0, 0);
      },
      dispose() { deviceGeo.dispose(); deviceMat.dispose(); ptGeo.dispose(); ptMat.dispose(); },
    };
  },

  // ── CMS — DNA double helix ─────────────────────────────────────────────────
  "cms": (THREE, isMobile) => {
    const scene = new THREE.Scene();
    const camera = makeCam(THREE, 4);
    camera.position.set(0, 0, 4);

    scene.add(new THREE.AmbientLight(0x001a0a, 3));
    const p1 = new THREE.PointLight(0x00ff99, 6, 6);
    p1.position.set(2, 2, 1);
    scene.add(p1);
    const p2 = new THREE.PointLight(0x00ccff, 4, 6);
    p2.position.set(-2, -2, 1);
    scene.add(p2);

    const strandCount = isMobile ? 28 : 48;
    const height = 3.5;

    // Two strands as InstancedMesh — O(1) draw calls
    const nodeGeo = new THREE.SphereGeometry(0.07, 8, 8);
    const nodeMat = new THREE.MeshStandardMaterial({ color: 0x00ff99, emissive: 0x00cc77, emissiveIntensity: 1.5, metalness: 0.7, roughness: 0.2 });
    const strand1 = new THREE.InstancedMesh(nodeGeo, nodeMat, strandCount);
    const strand2 = new THREE.InstancedMesh(nodeGeo, nodeMat.clone(), strandCount);
    (strand2.material as ThreeTypes.MeshStandardMaterial).color.set(0x00ccff);
    (strand2.material as ThreeTypes.MeshStandardMaterial).emissive.set(0x0088cc);
    scene.add(strand1, strand2);

    // Rungs connecting the two strands
    const rungGeo = new THREE.CylinderGeometry(0.012, 0.012, 1, 4);
    const rungMat = new THREE.MeshStandardMaterial({ color: 0x00ffaa, emissive: 0x00aa66, emissiveIntensity: 0.5, transparent: true, opacity: 0.5 });
    const rungs = new THREE.InstancedMesh(rungGeo, rungMat, strandCount);
    scene.add(rungs);

    const dummy = new THREE.Object3D();

    function updateHelix(t: number) {
      for (let i = 0; i < strandCount; i++) {
        const frac = i / strandCount;
        const angle = frac * Math.PI * 4 + t * 0.5;
        const y = (frac - 0.5) * height;
        const r = 0.6;

        // Strand 1
        dummy.position.set(Math.cos(angle) * r, y, Math.sin(angle) * r);
        dummy.updateMatrix();
        strand1.setMatrixAt(i, dummy.matrix);

        // Strand 2 (180° offset)
        dummy.position.set(Math.cos(angle + Math.PI) * r, y, Math.sin(angle + Math.PI) * r);
        dummy.updateMatrix();
        strand2.setMatrixAt(i, dummy.matrix);

        // Rung
        const x1 = Math.cos(angle) * r;
        const z1 = Math.sin(angle) * r;
        const x2 = Math.cos(angle + Math.PI) * r;
        const z2 = Math.sin(angle + Math.PI) * r;
        dummy.position.set((x1 + x2) / 2, y, (z1 + z2) / 2);
        dummy.rotation.set(0, -angle - Math.PI / 2, Math.PI / 2);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        rungs.setMatrixAt(i, dummy.matrix);
      }
      strand1.instanceMatrix.needsUpdate = true;
      strand2.instanceMatrix.needsUpdate = true;
      rungs.instanceMatrix.needsUpdate = true;
    }

    return {
      scene, camera,
      tick(t, mx, my) {
        updateHelix(t);
        scene.rotation.y = t * 0.15 + mx * 0.5;
        scene.rotation.x = my * 0.2;
      },
      dispose() { nodeGeo.dispose(); nodeMat.dispose(); rungGeo.dispose(); rungMat.dispose(); },
    };
  },

  // ── AI i automatizacija — particle data stream ─────────────────────────────
  "ai": (THREE, isMobile) => {
    const scene = new THREE.Scene();
    const camera = makeCam(THREE, 4);

    scene.add(new THREE.AmbientLight(0x0a0020, 4));
    const p1 = new THREE.PointLight(0xcc44ff, 8, 6);
    p1.position.set(0, 1, 2);
    scene.add(p1);
    const p2 = new THREE.PointLight(0x4422ff, 4, 5);
    p2.position.set(-2, -1, 1);
    scene.add(p2);

    // Neural network nodes — InstancedMesh
    const layers = isMobile ? [2, 4, 4, 2] : [3, 5, 5, 3];
    const totalNodes = layers.reduce((a, b) => a + b, 0);
    const nodeGeo = new THREE.SphereGeometry(0.1, 12, 12);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xcc44ff,
      emissive: 0x8822cc,
      emissiveIntensity: 2,
      metalness: 0.8,
      roughness: 0.1,
    });
    const nodes = new THREE.InstancedMesh(nodeGeo, nodeMat, totalNodes);
    scene.add(nodes);

    const nodePositions: ThreeTypes.Vector3[] = [];
    const dummy = new THREE.Object3D();
    let nodeIdx = 0;
    layers.forEach((count, li) => {
      for (let i = 0; i < count; i++) {
        const pos = new THREE.Vector3(
          (li - layers.length / 2 + 0.5) * 1.1,
          (i - count / 2 + 0.5) * 0.75,
          0,
        );
        nodePositions.push(pos);
        dummy.position.copy(pos);
        dummy.updateMatrix();
        nodes.setMatrixAt(nodeIdx++, dummy.matrix);
      }
    });
    nodes.instanceMatrix.needsUpdate = true;

    // Connections as LineSegments
    const connVerts: number[] = [];
    let layerStart = 0;
    for (let li = 0; li < layers.length - 1; li++) {
      const nextStart = layerStart + layers[li];
      for (let a = 0; a < layers[li]; a++) {
        for (let b = 0; b < layers[li + 1]; b++) {
          const pa = nodePositions[layerStart + a];
          const pb = nodePositions[nextStart + b];
          connVerts.push(pa.x, pa.y, pa.z, pb.x, pb.y, pb.z);
        }
      }
      layerStart += layers[li];
    }
    const connGeo = new THREE.BufferGeometry();
    connGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(connVerts), 3));
    const connMat = new THREE.LineBasicMaterial({ color: 0x8833cc, transparent: true, opacity: 0.2 });
    scene.add(new THREE.LineSegments(connGeo, connMat));

    // Flowing particles along connections
    const ptCount = isMobile ? 40 : 80;
    const ptGeo = new THREE.BufferGeometry();
    const ptPos = new Float32Array(ptCount * 3);
    const ptProgress = new Float32Array(ptCount);
    const ptConnIdx = new Uint16Array(ptCount);
    const totalConns = connVerts.length / 6;
    for (let i = 0; i < ptCount; i++) {
      ptProgress[i] = Math.random();
      ptConnIdx[i] = Math.floor(Math.random() * totalConns);
    }
    ptGeo.setAttribute("position", new THREE.BufferAttribute(ptPos, 3));
    const ptMat = new THREE.PointsMaterial({ color: 0xff88ff, size: 0.04, sizeAttenuation: true, transparent: true, opacity: 0.9 });
    scene.add(new THREE.Points(ptGeo, ptMat));

    return {
      scene, camera,
      tick(t, mx, my) {
        // Pulse node emissive via scale
        for (let i = 0; i < totalNodes; i++) {
          const phase = t * 1.5 + i * 0.6;
          const s = 0.8 + 0.35 * Math.abs(Math.sin(phase));
          dummy.position.copy(nodePositions[i]);
          dummy.scale.setScalar(s);
          dummy.updateMatrix();
          nodes.setMatrixAt(i, dummy.matrix);
        }
        nodes.instanceMatrix.needsUpdate = true;

        // Flow particles along connections
        const posAttr = ptGeo.attributes.position as ThreeTypes.BufferAttribute;
        for (let i = 0; i < ptCount; i++) {
          ptProgress[i] += 0.008;
          if (ptProgress[i] > 1) { ptProgress[i] = 0; ptConnIdx[i] = Math.floor(Math.random() * totalConns); }
          const ci = ptConnIdx[i] * 6;
          const p = ptProgress[i];
          posAttr.setXYZ(i,
            connVerts[ci] + (connVerts[ci + 3] - connVerts[ci]) * p,
            connVerts[ci + 1] + (connVerts[ci + 4] - connVerts[ci + 1]) * p,
            connVerts[ci + 2] + (connVerts[ci + 5] - connVerts[ci + 2]) * p,
          );
        }
        posAttr.needsUpdate = true;

        scene.rotation.y = mx * 0.4 + Math.sin(t * 0.2) * 0.1;
        scene.rotation.x = my * 0.25;
      },
      dispose() { nodeGeo.dispose(); nodeMat.dispose(); connGeo.dispose(); connMat.dispose(); ptGeo.dispose(); ptMat.dispose(); },
    };
  },

  // ── SEO i marketing — radar sweep + data orbs ─────────────────────────────
  "seo": (THREE, isMobile) => {
    const scene = new THREE.Scene();
    const camera = makeCam(THREE, 4);
    camera.position.set(0, 1.5, 4);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0x001a00, 3));
    const p1 = new THREE.PointLight(0x00ff66, 6, 6);
    p1.position.set(0, 3, 1);
    scene.add(p1);

    // Radar grid circles
    const circleCount = 4;
    for (let i = 1; i <= circleCount; i++) {
      const cg = new THREE.RingGeometry(i * 0.55 - 0.004, i * 0.55 + 0.004, 64);
      const cm = new THREE.MeshBasicMaterial({ color: 0x00aa44, transparent: true, opacity: 0.25 });
      const c = new THREE.Mesh(cg, cm);
      c.rotation.x = -Math.PI / 2;
      scene.add(c);
    }

    // Cross lines
    const crossGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-2.2, 0, 0), new THREE.Vector3(2.2, 0, 0),
      new THREE.Vector3(0, 0, -2.2), new THREE.Vector3(0, 0, 2.2),
    ]);
    scene.add(new THREE.LineSegments(crossGeo, new THREE.LineBasicMaterial({ color: 0x00aa44, transparent: true, opacity: 0.2 })));

    // Sweep plane
    const sweepGeo = new THREE.CircleGeometry(2.5, 64, 0, Math.PI / 5);
    const sweepMat = new THREE.MeshBasicMaterial({ color: 0x00ff66, transparent: true, opacity: 0.1, side: THREE.DoubleSide });
    const sweep = new THREE.Mesh(sweepGeo, sweepMat);
    sweep.rotation.x = -Math.PI / 2;
    scene.add(sweep);

    // Data point orbs — InstancedMesh
    const orbCount = isMobile ? 12 : 22;
    const orbGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const orbMat = new THREE.MeshStandardMaterial({ color: 0x44ff88, emissive: 0x00cc55, emissiveIntensity: 2, metalness: 0.5, roughness: 0.2 });
    const orbInst = new THREE.InstancedMesh(orbGeo, orbMat, orbCount);
    scene.add(orbInst);
    const dummy = new THREE.Object3D();
    const orbData: { angle: number; radius: number; height: number; blip: number }[] = [];
    for (let i = 0; i < orbCount; i++) {
      orbData.push({ angle: Math.random() * Math.PI * 2, radius: 0.3 + Math.random() * 1.9, height: Math.random() * 0.6, blip: 0 });
    }

    // Growing bar chart in background
    const barCount = isMobile ? 8 : 12;
    const bars: { mesh: ThreeTypes.Mesh; target: number; phase: number }[] = [];
    const barGeo = new THREE.BoxGeometry(0.12, 1, 0.12);
    for (let i = 0; i < barCount; i++) {
      const bm = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(0.33 + (i / barCount) * 0.1, 1, 0.5),
        emissive: new THREE.Color().setHSL(0.33 + (i / barCount) * 0.1, 1, 0.3),
        emissiveIntensity: 1,
        metalness: 0.4,
        roughness: 0.3,
      });
      const m = new THREE.Mesh(barGeo, bm);
      const x = (i - barCount / 2) * 0.28;
      m.position.set(x, 0, -1.8);
      scene.add(m);
      bars.push({ mesh: m, target: 0.3 + Math.random() * 1.4, phase: Math.random() * Math.PI * 2 });
    }

    let sweepAngle = 0;

    return {
      scene, camera,
      tick(t, mx, my) {
        sweepAngle += 0.025;
        sweep.rotation.y = sweepAngle;

        // Blip orbs that the sweep "hits"
        orbData.forEach((orb, i) => {
          const diff = ((sweepAngle % (Math.PI * 2)) - orb.angle + Math.PI * 4) % (Math.PI * 2);
          if (diff < 0.15) orb.blip = 1;
          orb.blip *= 0.96;
          dummy.position.set(
            Math.cos(orb.angle) * orb.radius,
            orb.height + Math.sin(t * 0.5 + i) * 0.05,
            Math.sin(orb.angle) * orb.radius,
          );
          const s = 0.7 + orb.blip * 1.2;
          dummy.scale.setScalar(s);
          dummy.updateMatrix();
          orbInst.setMatrixAt(i, dummy.matrix);
          (orbMat as ThreeTypes.MeshStandardMaterial).emissiveIntensity = 1 + orb.blip * 3;
        });
        orbInst.instanceMatrix.needsUpdate = true;

        bars.forEach(({ mesh, target, phase }) => {
          const h = target * (0.7 + 0.3 * Math.sin(t * 0.8 + phase));
          mesh.scale.y = h;
          mesh.position.y = h * 0.5 - 0.5;
        });

        scene.rotation.y = mx * 0.3;
        camera.position.x = mx * 0.4;
        camera.lookAt(0, 0, 0);
      },
      dispose() { sweepGeo.dispose(); sweepMat.dispose(); orbGeo.dispose(); orbMat.dispose(); barGeo.dispose(); crossGeo.dispose(); },
    };
  },

  // ── Cyber security — hex matrix shield ────────────────────────────────────
  "security": (THREE, isMobile) => {
    const scene = new THREE.Scene();
    const camera = makeCam(THREE, 4);

    scene.add(new THREE.AmbientLight(0x200010, 3));
    const p1 = new THREE.PointLight(0xff2244, 8, 6);
    p1.position.set(0, 2, 2);
    scene.add(p1);
    const p2 = new THREE.PointLight(0xff8800, 5, 5);
    p2.position.set(-2, -1, 1);
    scene.add(p2);

    // Layered shield geometry
    const shieldGeos: ThreeTypes.IcosahedronGeometry[] = [];
    const shieldMeshes: ThreeTypes.Mesh[] = [];
    const shieldColors = [0xff4444, 0xff6622, 0xff9900];
    const shieldSizes = [1.4, 1.0, 0.6];
    for (let i = 0; i < 3; i++) {
      const sg = new THREE.IcosahedronGeometry(shieldSizes[i], isMobile ? 1 : 2);
      const sm = new THREE.MeshStandardMaterial({
        color: shieldColors[i],
        emissive: shieldColors[i],
        emissiveIntensity: 0.4 + i * 0.2,
        metalness: 0.9,
        roughness: 0.1,
        wireframe: true,
        transparent: true,
        opacity: 0.35 - i * 0.08,
      });
      const mesh = new THREE.Mesh(sg, sm);
      scene.add(mesh);
      shieldGeos.push(sg);
      shieldMeshes.push(mesh);
    }

    // Solid core
    const coreGeo = new THREE.OctahedronGeometry(0.3, 0);
    const coreMat = new THREE.MeshStandardMaterial({ color: 0xff6600, emissive: 0xff3300, emissiveIntensity: 3, metalness: 1, roughness: 0 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Scan line ring
    const scanGeo = new THREE.TorusGeometry(1.6, 0.005, 4, 80);
    const scanMat = new THREE.MeshBasicMaterial({ color: 0xff4444, transparent: true, opacity: 0.7 });
    const scan = new THREE.Mesh(scanGeo, scanMat);
    scene.add(scan);

    // Warning particles
    const warnCount = isMobile ? 30 : 50;
    const warnGeo = new THREE.BufferGeometry();
    const warnPos = new Float32Array(warnCount * 3);
    for (let i = 0; i < warnCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.6 + Math.random() * 0.8;
      warnPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      warnPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      warnPos[i * 3 + 2] = r * Math.cos(phi);
    }
    warnGeo.setAttribute("position", new THREE.BufferAttribute(warnPos, 3));
    scene.add(new THREE.Points(warnGeo, new THREE.PointsMaterial({ color: 0xff6644, size: 0.025, transparent: true, opacity: 0.5 })));

    return {
      scene, camera,
      tick(t, mx, my) {
        shieldMeshes[0].rotation.y = t * 0.2;
        shieldMeshes[0].rotation.x = t * 0.1;
        shieldMeshes[1].rotation.y = -t * 0.35;
        shieldMeshes[1].rotation.z = t * 0.15;
        shieldMeshes[2].rotation.x = t * 0.5;
        shieldMeshes[2].rotation.y = -t * 0.3;

        core.rotation.x = t * 0.8;
        core.rotation.y = t * 0.6;
        const pulse = 1 + 0.15 * Math.sin(t * 3);
        core.scale.setScalar(pulse);

        // Scan ring oscillates vertically
        scan.position.y = Math.sin(t * 0.8) * 1.0;
        scan.rotation.z = t * 0.5;

        scene.rotation.y = mx * 0.5;
        scene.rotation.x = my * 0.3;
      },
      dispose() { shieldGeos.forEach(g => g.dispose()); coreGeo.dispose(); coreMat.dispose(); scanGeo.dispose(); scanMat.dispose(); warnGeo.dispose(); },
    };
  },

  // ── UI/UX dizajn — morphing geometry ──────────────────────────────────────
  "uiux": (THREE, isMobile) => {
    const scene = new THREE.Scene();
    const camera = makeCam(THREE, 4);

    scene.add(new THREE.AmbientLight(0x001a2a, 3));
    const p1 = new THREE.PointLight(0x00ccff, 8, 6);
    p1.position.set(2, 2, 2);
    scene.add(p1);
    const p2 = new THREE.PointLight(0x0044ff, 4, 5);
    p2.position.set(-2, -1, 1);
    scene.add(p2);

    const seg = isMobile ? 24 : 48;

    // Morphing mesh: sphere with animated noise displacement
    const morphGeo = new THREE.IcosahedronGeometry(1.0, isMobile ? 3 : 5);
    const morphMat = new THREE.MeshStandardMaterial({
      color: 0x0099ff,
      emissive: 0x003366,
      emissiveIntensity: 0.8,
      metalness: 0.7,
      roughness: 0.2,
    });
    const morphMesh = new THREE.Mesh(morphGeo, morphMat);
    scene.add(morphMesh);

    // Outer wireframe
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x44ccff, wireframe: true, transparent: true, opacity: 0.15 });
    const wireGeo = new THREE.IcosahedronGeometry(1.05, isMobile ? 2 : 4);
    scene.add(new THREE.Mesh(wireGeo, wireMat));

    // Save original vertex positions
    const pos = morphGeo.attributes.position as ThreeTypes.BufferAttribute;
    const origPos = new Float32Array(pos.array.length);
    for (let i = 0; i < origPos.length; i++) origPos[i] = pos.array[i];

    // Floating UI cards around the sphere
    const cardCount = isMobile ? 3 : 5;
    const cards: { m: ThreeTypes.Mesh; angle: number; speed: number; radius: number }[] = [];
    const cardGeo = new THREE.PlaneGeometry(0.4, 0.25);
    for (let i = 0; i < cardCount; i++) {
      const cm = new THREE.MeshStandardMaterial({
        color: 0x0066cc,
        emissive: 0x0033aa,
        emissiveIntensity: 0.8,
        metalness: 0.9,
        roughness: 0.05,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
      });
      const card = new THREE.Mesh(cardGeo, cm);
      cards.push({ m: card, angle: (i / cardCount) * Math.PI * 2, speed: 0.2 + i * 0.05, radius: 1.6 + (i % 2) * 0.3 });
      scene.add(card);
    }

    // Particle ring
    const ringCount = isMobile ? 60 : 120;
    const ringGeo = new THREE.BufferGeometry();
    const ringPos = new Float32Array(ringCount * 3);
    for (let i = 0; i < ringCount; i++) {
      const a = (i / ringCount) * Math.PI * 2;
      const r = 1.85;
      ringPos[i * 3] = Math.cos(a) * r;
      ringPos[i * 3 + 1] = (Math.random() - 0.5) * 0.15;
      ringPos[i * 3 + 2] = Math.sin(a) * r;
    }
    ringGeo.setAttribute("position", new THREE.BufferAttribute(ringPos, 3));
    scene.add(new THREE.Points(ringGeo, new THREE.PointsMaterial({ color: 0x44aaff, size: 0.025, transparent: true, opacity: 0.5 })));

    // Simple noise helper
    function noise(x: number, y: number, z: number, t: number): number {
      return Math.sin(x * 2.1 + t * 0.7) * Math.cos(y * 1.8 + t * 0.5) * Math.sin(z * 2.3 + t * 0.6);
    }

    return {
      scene, camera,
      tick(t, mx, my) {
        // Morph sphere vertices
        for (let i = 0; i < pos.count; i++) {
          const ox = origPos[i * 3];
          const oy = origPos[i * 3 + 1];
          const oz = origPos[i * 3 + 2];
          const n = noise(ox, oy, oz, t) * 0.18;
          const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
          pos.setXYZ(i, ox + (ox / len) * n, oy + (oy / len) * n, oz + (oz / len) * n);
        }
        pos.needsUpdate = true;
        morphGeo.computeVertexNormals();

        morphMesh.rotation.y = t * 0.2 + mx * 0.4;
        morphMesh.rotation.x = t * 0.1 + my * 0.25;

        // Orbit cards
        cards.forEach((c) => {
          c.angle += c.speed * 0.012;
          c.m.position.set(Math.cos(c.angle) * c.radius, Math.sin(c.angle * 0.5) * 0.4, Math.sin(c.angle) * c.radius);
          c.m.lookAt(0, 0, 0);
        });

        camera.position.x = mx * 0.4;
        camera.position.y = my * 0.25;
        camera.lookAt(0, 0, 0);
      },
      dispose() { morphGeo.dispose(); morphMat.dispose(); wireGeo.dispose(); wireMat.dispose(); cardGeo.dispose(); ringGeo.dispose(); },
    };
  },
};

// ─── Helper ───────────────────────────────────────────────────────────────────

function makeCam(THREE: typeof ThreeTypes, z = 3): ThreeTypes.PerspectiveCamera {
  const cam = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  cam.position.z = z;
  return cam;
}

// ─── Shared-renderer engine ───────────────────────────────────────────────────
//
// One hidden WebGLRenderer renders each scene at the canvas's native size,
// then blits the result into the card canvas via a 2D context drawImage call.
// This keeps the WebGL context count at exactly 1 regardless of card count,
// solves the browser 8-context limit, and avoids z-index stacking issues.

interface CanvasEntry {
  canvas: HTMLCanvasElement;
  ctx2d: CanvasRenderingContext2D | null;
  handle: SceneHandle;
  active: boolean;
  initialized: boolean;
  sceneKey: string;
}

export function ServicesR3F() {
  useEffect(() => {
    const isMobile = window.matchMedia("(hover: none)").matches;
    const dpr = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2);

    let THREE: typeof ThreeTypes | null = null;
    let renderer: ThreeTypes.WebGLRenderer | null = null;
    let rafId = 0;
    let t = 0;
    let mouseX = 0, mouseY = 0;
    let gyroX = 0, gyroY = 0;

    const entries: CanvasEntry[] = [];

    const io = new IntersectionObserver(
      (evts) => {
        evts.forEach((e) => {
          const entry = entries.find((en) => en.canvas === e.target);
          if (!entry) return;
          entry.active = e.isIntersecting;
          if (e.isIntersecting && !entry.initialized && THREE && renderer) {
            const factory = SCENES[entry.sceneKey];
            if (factory) {
              entry.handle = factory(THREE, isMobile);
              entry.initialized = true;
            }
          }
        });
      },
      { rootMargin: "250px" },
    );

    function onMouse(e: MouseEvent) {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    }
    function onGyro(e: DeviceOrientationEvent) {
      gyroX = ((e.gamma ?? 0) / 90);
      gyroY = -((e.beta ?? 45) - 45) / 90;
    }
    if (!isMobile) window.addEventListener("mousemove", onMouse);
    else window.addEventListener("deviceorientation", onGyro);

    async function init() {
      THREE = await import("three");

      const canvases = Array.from(
        document.querySelectorAll<HTMLCanvasElement>(".card-r3f-canvas"),
      );
      if (!canvases.length) return;

      // Single offscreen renderer — never attached to the DOM
      renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, preserveDrawingBuffer: false });
      renderer.setPixelRatio(dpr);
      renderer.setClearColor(0x000000, 0);

      // Register each canvas
      canvases.forEach((canvas) => {
        const ctx2d = canvas.getContext("2d");
        const sceneKey = canvas.dataset.scene ?? "";
        const entry: CanvasEntry = {
          canvas,
          ctx2d,
          handle: null as unknown as SceneHandle,
          active: false,
          initialized: false,
          sceneKey,
        };
        entries.push(entry);
        io.observe(canvas);
      });

      (function animate() {
        rafId = requestAnimationFrame(animate);
        if (!renderer || !THREE) return;

        t += 0.016;
        const mx = isMobile ? gyroX : mouseX;
        const my = isMobile ? gyroY : mouseY;

        entries.forEach((entry) => {
          if (!entry.active || !entry.initialized || !entry.ctx2d) return;

          const { canvas, ctx2d, handle } = entry;
          const w = canvas.clientWidth;
          const h = canvas.clientHeight;
          if (w <= 0 || h <= 0) return;

          const pw = Math.round(w * dpr);
          const ph = Math.round(h * dpr);

          // Resize renderer only when dimensions change
          const current = renderer!.getSize(new THREE!.Vector2());
          if (current.x !== pw || current.y !== ph) {
            renderer!.setSize(pw, ph, false);
            handle.camera.aspect = w / h;
            handle.camera.updateProjectionMatrix();
          }

          // Resize the 2D canvas backing store to match
          if (canvas.width !== pw || canvas.height !== ph) {
            canvas.width = pw;
            canvas.height = ph;
          }

          handle.tick(t, mx, my);
          renderer!.render(handle.scene, handle.camera);

          // Blit WebGL result into the 2D canvas
          ctx2d.clearRect(0, 0, pw, ph);
          ctx2d.drawImage(renderer!.domElement, 0, 0);
        });
      })();
    }

    init();

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      entries.forEach((e) => { if (e.initialized) e.handle.dispose(); });
      renderer?.dispose();
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("deviceorientation", onGyro);
    };
  }, []);

  return null;
}
