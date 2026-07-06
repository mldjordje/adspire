"use client";

import { useEffect, useRef } from "react";

/**
 * The original V4 "obsidian shard" (fresnel torus knot) — kept alive as an
 * ambient background for the contact page. Fixed, pointer-transparent,
 * screen-blended so it only adds glow over the dark template background.
 */

const RIM_VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPos;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    vPos = position;
    gl_Position = projectionMatrix * mv;
  }
`;

const RIM_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPos;
  void main() {
    float fres = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 2.2);
    float band = 0.5 + 0.5 * sin(vPos.y * 6.0 + uTime * 0.6);
    vec3 base = vec3(0.012, 0.012, 0.018);
    vec3 col = base + uColor * fres * (0.85 + band * 0.35);
    gl_FragColor = vec4(col, 1.0);
  }
`;

export function ObsidianShard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: !isMobile,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        42,
        window.innerWidth / window.innerHeight,
        0.1,
        60,
      );
      camera.position.z = 8;

      const uniforms = {
        uColor: { value: new THREE.Color(0.42, 0.88, 1.0) },
        uTime: { value: 0 },
      };
      const mat = new THREE.ShaderMaterial({
        vertexShader: RIM_VERT,
        fragmentShader: RIM_FRAG,
        uniforms,
      });
      const geo = new THREE.TorusKnotGeometry(
        1.35,
        0.42,
        isMobile ? 140 : 260,
        isMobile ? 18 : 32,
        2,
        3,
      );
      const shard = new THREE.Mesh(geo, mat);
      shard.position.x = isMobile ? 0 : 2.2;
      shard.scale.setScalar(isMobile ? 0.8 : 1.1);
      scene.add(shard);

      let mx = 0;
      let my = 0;
      let tx = 0;
      let ty = 0;
      const onMove = (e: PointerEvent) => {
        tx = (e.clientX / window.innerWidth - 0.5) * 2;
        ty = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      let raf = 0;
      let running = true;
      const start = performance.now();
      const onVisibility = () => {
        running = document.visibilityState === "visible";
        if (running) raf = requestAnimationFrame(tick);
        else cancelAnimationFrame(raf);
      };
      document.addEventListener("visibilitychange", onVisibility);

      const tick = () => {
        if (!running || disposed) return;
        const t = (performance.now() - start) / 1000;
        mx += (tx - mx) * 0.05;
        my += (ty - my) * 0.05;
        camera.position.x = mx * 0.4;
        camera.position.y = -my * 0.3;
        camera.lookAt(shard.position.x * 0.5, 0, 0);
        shard.rotation.x = t * 0.1;
        shard.rotation.y = t * 0.14;
        uniforms.uTime.value = t;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibility);
        geo.dispose();
        mat.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 2,
        pointerEvents: "none",
        mixBlendMode: "screen",
        opacity: 0.5,
      }}
    />
  );
}
