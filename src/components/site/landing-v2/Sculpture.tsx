"use client";

import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
import { clamp, interval, stageProgress, storyPose } from "./choreography";
import styles from "./LandingV2.module.css";

type Pose = 0 | 1 | 2 | 3;
const SEGMENTS = 48;
const TAU = Math.PI * 2;

/** Same topology in all poses: a machined ribbon, exploded shell, screen, A.
 * Seams divide it into physical segments; morph targets keep the surfaces solid.
 * Only GPU weights change during scroll, never the geometry buffers. */
function centerAt(t: number, pose: Pose) {
  if (pose < 2) {
    const a = t * TAU;
    const opening = pose === 1 ? 1 : 0;
    const r = 1.8 + Math.sin(a * 3 + .3) * .16;
    return new THREE.Vector3(Math.cos(a) * r * (1 + opening * .22), Math.sin(a) * r * .79 * (1 + opening * .18), Math.sin(a * 2) * .56 + opening * Math.sin(a * 3) * .7);
  }
  if (pose === 2) {
    const side = Math.min(3, Math.floor(t * 4));
    const p = t * 4 - side;
    if (side === 0) return new THREE.Vector3(-2.3 + 4.6 * p, 1.35, 0);
    if (side === 1) return new THREE.Vector3(2.3, 1.35 - 2.7 * p, 0);
    if (side === 2) return new THREE.Vector3(2.3 - 4.6 * p, -1.35, 0);
    return new THREE.Vector3(-2.3, -1.35 + 2.7 * p, 0);
  }
  const bar = Math.min(2, Math.floor(t * 3));
  const p = t * 3 - bar;
  if (bar === 0) return new THREE.Vector3(-1.42 + 1.42 * p, -1.5 + 3.05 * p, .05);
  if (bar === 1) return new THREE.Vector3(1.42 * p, 1.55 - 3.05 * p, .05);
  return new THREE.Vector3(.88 - 1.76 * p, -.48, .13);
}

function vertex(t: number, u: number, v: number, pose: Pose, part: number) {
  const center = centerAt(t, pose);
  if (pose === 1) {
    const sector = (Math.floor(part / 16) + .5) * TAU / 3;
    center.add(new THREE.Vector3(Math.cos(sector)*.48,Math.sin(sector)*.48,Math.sin(sector)*.3));
  }
  // A single local tangent per straight bar avoids a kink at the joints.
  const start = pose === 3 ? Math.floor(part / 16) / 3 : pose === 2 ? Math.floor(part / 12) / 4 : 0;
  const end = pose === 3 ? start + 1 / 3 : pose === 2 ? start + .25 : 1;
  const before = Math.max(start + .00001, t - .001);
  const after = Math.min(end - .00001, t + .001);
  const tangent = centerAt(after, pose).sub(centerAt(before, pose)).normalize();
  const side = new THREE.Vector3(-tangent.y, tangent.x, 0).normalize();
  const twist = pose < 2 ? Math.sin(t * TAU + .5) * 1.25 + .24 : 0;
  side.applyAxisAngle(tangent, twist);
  const normal = new THREE.Vector3().crossVectors(tangent, side).normalize();
  const width = pose === 2 ? .115 : pose === 3 ? .43 : .7;
  const depth = pose === 2 ? .15 : .23;
  return center.addScaledVector(side, u * width).addScaledVector(normal, v * depth);
}

function ribbonGeometry(edge = false) {
  const contours = edge
    ? [[.49, .28], [.49, .44], [.44, .5], [.39, .5]]
    : [[-.4, -.5], [.4, -.5], [.5, -.3], [.5, .3], [.4, .5], [-.4, .5], [-.5, .3], [-.5, -.3]];
  const poses: Float32Array[] = [];
  for (let pose = 0; pose < 4; pose++) {
    const positions: number[] = [];
    for (let part = 0; part < SEGMENTS; part++) {
      // Twelve broad plates, not forty-eight beads: uninterrupted reflections
      // describe the ribbon, and only structural joints interrupt its surface.
      const a = (part + (part % 4 === 0 ? .035 : 0)) / SEGMENTS;
      const b = (part + (part % 4 === 3 ? .965 : 1)) / SEGMENTS;
      const add = (t: number, uv: number[]) => { const p = vertex(t, uv[0], uv[1], pose as Pose, part); positions.push(p.x, p.y, p.z); };
      for (let step = 0; step < 3; step++) {
        const t0 = THREE.MathUtils.lerp(a, b, step / 3);
        const t1 = THREE.MathUtils.lerp(a, b, (step + 1) / 3);
        for (let k = 0; k < contours.length - (edge ? 1 : 0); k++) {
          const c = contours[k]; const d = contours[(k + 1) % contours.length];
          add(t0,c); add(t1,c); add(t1,d); add(t0,c); add(t1,d); add(t0,d);
        }
      }
      if (!edge) for (let k = 0; k < contours.length; k++) {
        const c = contours[k]; const d = contours[(k+1) % contours.length];
        if (part % 4 === 0) { add(a,[0,0]); add(a,c); add(a,d); }
        if (part % 4 === 3) { add(b,[0,0]); add(b,d); add(b,c); }
      }
    }
    poses.push(new Float32Array(positions));
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position",new THREE.BufferAttribute(poses[0],3));
  const normalsFor = (p: Float32Array) => {
    const raw = new THREE.BufferGeometry(); raw.setAttribute("position",new THREE.BufferAttribute(p,3));
    const welded = mergeVertices(raw); welded.computeVertexNormals();
    const expanded = welded.toNonIndexed(); const normals = expanded.getAttribute("normal").clone();
    raw.dispose(); welded.dispose(); expanded.dispose(); return normals;
  };
  geometry.setAttribute("normal", normalsFor(poses[0]));
  geometry.morphAttributes.position = poses.slice(1).map(p => new THREE.BufferAttribute(p,3));
  geometry.morphAttributes.normal = poses.slice(1).map(normalsFor);
  geometry.computeBoundingSphere();
  return geometry;
}

export default function Sculpture({ rootRef, paused }: { rootRef: RefObject<HTMLDivElement | null>; paused: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  const requestRef = useRef<(() => void) | null>(null);
  useEffect(() => { pausedRef.current = paused; requestRef.current?.(); }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;
    const hero = root.querySelector<HTMLElement>('[data-sculpture-slot="hero"]')!;
    const story = root.querySelector<HTMLElement>("[data-story]")!;
    const storySlot = root.querySelector<HTMLElement>('[data-sculpture-slot="story"]')!;
    const finale = root.querySelector<HTMLElement>('[data-sculpture-slot="finale"]')!;
    const screen = root.querySelector<HTMLElement>("[data-story-screen]")!;
    const steps = root.querySelectorAll<HTMLElement>("[data-story-step]");
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "default" }); }
    catch { root.dataset.sceneReady = "false"; return; }
    renderer.setClearColor(0x05070c,0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1,1,1,-1,.1,3000);
    camera.position.z = 1000;
    const rig = new THREE.Group(); scene.add(rig);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const env = pmrem.fromScene(room,.035);
    scene.environment = env.texture;
    room.dispose(); pmrem.dispose();
    const material = new THREE.MeshPhysicalMaterial({ color: 0x263759, metalness: .96, roughness: .2, clearcoat: 1, clearcoatRoughness: .16, envMapIntensity: 1.8, side: THREE.DoubleSide });
    const bodyGeo = ribbonGeometry();
    const edgeGeo = ribbonGeometry(true);
    const body = new THREE.Mesh(bodyGeo,material);
    const edgeMat = new THREE.MeshBasicMaterial({ color: 0x688fff, transparent: true, opacity: .9, side: THREE.DoubleSide });
    const edge = new THREE.Mesh(edgeGeo,edgeMat);
    body.frustumCulled = false; edge.frustumCulled = false;
    rig.add(body,edge);

    const coreGeo = new THREE.SphereGeometry(.36,32,24);
    const coreMat = new THREE.MeshPhysicalMaterial({ color: 0x102968, metalness: .65, roughness: .12, emissive: 0x245bff, emissiveIntensity: .55, clearcoat: 1 });
    const core = new THREE.Mesh(coreGeo,coreMat); rig.add(core);
    const ringGeo = new THREE.TorusGeometry(.53,.012,8,80);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xa6c8ff, transparent: true, opacity: .8 });
    const ring = new THREE.Mesh(ringGeo,ringMat); ring.rotation.x = .65; rig.add(ring);
    const key = new THREE.DirectionalLight(0xe3ecff,4.5); key.position.set(-300,400,500); scene.add(key);
    const rim = new THREE.DirectionalLight(0x517cff,5); rim.position.set(400,-150,200); scene.add(rim);
    const fill = new THREE.DirectionalLight(0xffffff,2); fill.position.set(100,100,-200); scene.add(fill);

    // A restrained halo is rendered as a real light sprite; no postprocessing
    // pass is required, and text never goes through a blur/bloom pipeline.
    const glowCanvas = document.createElement("canvas"); glowCanvas.width = glowCanvas.height = 128;
    const ctx = glowCanvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(64,64,0,64,64,64);
    gradient.addColorStop(0,"rgba(82,122,255,.28)"); gradient.addColorStop(.35,"rgba(42,78,220,.1)"); gradient.addColorStop(1,"rgba(10,20,80,0)");
    ctx.fillStyle = gradient; ctx.fillRect(0,0,128,128);
    const glowTexture = new THREE.CanvasTexture(glowCanvas);
    const glowMat = new THREE.SpriteMaterial({ map: glowTexture, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    const glow = new THREE.Sprite(glowMat); glow.scale.set(7,7,1); glow.position.z = -1; rig.add(glow);

    const count = 700;
    const particlesGeo = new THREE.BufferGeometry();
    const p0 = new Float32Array(count*3); const p1 = new Float32Array(count*3); const p2 = new Float32Array(count*3); const p3 = new Float32Array(count*3); const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const t = (i + .5) / count;
      seeds[i] = (Math.sin(i*127.1)*43758.5453)%1;
      for (const [pose,arr] of [[0,p0],[1,p1],[2,p2],[3,p3]] as const) { const p = vertex(t,0,0,pose,Math.floor(t*SEGMENTS)); p.toArray(arr,i*3); }
    }
    particlesGeo.setAttribute("position",new THREE.BufferAttribute(p0,3));
    particlesGeo.setAttribute("aOpen",new THREE.BufferAttribute(p1,3)); particlesGeo.setAttribute("aScreen",new THREE.BufferAttribute(p2,3)); particlesGeo.setAttribute("aBrand",new THREE.BufferAttribute(p3,3)); particlesGeo.setAttribute("aSeed",new THREE.BufferAttribute(seeds,1));
    const particleMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uWeights:{value:new THREE.Vector3()}, uTime:{value:0}, uEnergy:{value:0}, uDpr:{value:1} },
      vertexShader: `attribute vec3 aOpen; attribute vec3 aScreen; attribute vec3 aBrand; attribute float aSeed;
        uniform vec3 uWeights; uniform float uTime; uniform float uEnergy; uniform float uDpr; varying float vAlpha;
        void main(){ vec3 p=position*(1.-uWeights.x-uWeights.y-uWeights.z)+aOpen*uWeights.x+aScreen*uWeights.y+aBrand*uWeights.z;
        float s=abs(aSeed); p+=vec3(sin(s*80.+uTime*.6),cos(s*65.+uTime*.4),sin(s*45.+uTime*.3))*(.035+uEnergy*(.25+s*.9));
        gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.); gl_PointSize=(1.+s*1.6)*uDpr; vAlpha=.12+uEnergy*.65; }`,
      fragmentShader: `varying float vAlpha; void main(){float d=length(gl_PointCoord-.5);float a=smoothstep(.5,.1,d);gl_FragColor=vec4(.45,.66,1.,a*vAlpha);}`,
    });
    const particles = new THREE.Points(particlesGeo,particleMat); particles.frustumCulled = false; rig.add(particles);

    let width = 0, height = 0, mobile = false, dpr = 1, lowQuality = false;
    let raf = 0, disposed = false, lost = false;
    let lastTime = 0, elapsed = 0, slowFrames = 0;
    let targetX = 0, targetY = 0, pointerX = 0, pointerY = 0;
    const resize = () => {
      width = innerWidth; height = innerHeight; mobile = width < 768;
      dpr = Math.min(devicePixelRatio,lowQuality ? 1 : mobile ? 1.5 : 1.75);
      renderer.setPixelRatio(dpr); renderer.setSize(width,height,false);
      camera.left = -width/2; camera.right = width/2; camera.top = height/2; camera.bottom = -height/2; camera.updateProjectionMatrix();
      particleMat.uniforms.uDpr.value = dpr;
      particlesGeo.setDrawRange(0,mobile || lowQuality ? 380 : count);
    };
    resize();
    const setWeights = (open: number, frame: number, brand: number) => {
      for (const mesh of [body,edge]) { mesh.morphTargetInfluences![0] = open; mesh.morphTargetInfluences![1] = frame; mesh.morphTargetInfluences![2] = brand; }
      particleMat.uniforms.uWeights.value.set(open,frame,brand);
    };
    const render = (now: number) => {
      raf = 0;
      if (disposed || lost || document.hidden) return;
      const still = pausedRef.current;
      const dt = lastTime ? Math.min((now-lastTime)/1000,.1) : 1/60; lastTime = now;
      if (!still) elapsed += dt;
      const hr = hero.getBoundingClientRect(); const sr = story.getBoundingClientRect(); const fr = finale.getBoundingClientRect();
      const storyVisible = sr.top < height && sr.bottom > 0;
      const heroVisible = hr.bottom > 0 && hr.top < height;
      const finaleVisible = fr.top < height && fr.bottom > 0;
      rig.visible = heroVisible || storyVisible || finaleVisible;
      let active = false;
      if (rig.visible) {
        active = true;
        let rect: DOMRect; let open = 0, frame = 0, brand = 0, energy = 0;
        let rx = -.18, ry = -.28, rz = -.28;
        if (finaleVisible) {
          rect = fr;
          brand = still ? 1 : interval((height-fr.top)/Math.min(height,fr.height+height*.25),.15,.82);
          open = 1-brand;
          energy = Math.sin(brand*Math.PI)*.6;
          rx = -.08*(1-brand); ry = -.5*(1-brand); rz = -.2*(1-brand);
        } else if (storyVisible && sr.top < height*.9) {
          const destination = storySlot.getBoundingClientRect();
          const travel = interval(height-sr.top,height*.1,height*.85);
          rect = new DOMRect(THREE.MathUtils.lerp(hr.left,destination.left,travel),THREE.MathUtils.lerp(hr.top,destination.top,travel),THREE.MathUtils.lerp(hr.width,destination.width,travel),THREE.MathUtils.lerp(hr.height,destination.height,travel));
          const progress = still ? 1 : stageProgress(sr.top,sr.height,height);
          const pose = storyPose(progress);
          open = pose.opened; frame = pose.screen; energy = pose.particles;
          root.style.setProperty("--screen-reveal",String(pose.reveal));
          root.style.setProperty("--screen-visibility",pose.reveal > .05 ? "visible" : "hidden");
          screen.inert = pose.reveal < .95;
          steps.forEach((step,i) => { step.dataset.active = String(i === pose.chapter); });
          rx = -.18*(1-frame); ry = (-.28 + open*.35)*(1-frame); rz = -.28*(1-frame);
        } else {
          rect = hr;
          open = still ? .22 : .12 + .035*Math.sin(elapsed*.45);
          root.style.setProperty("--screen-reveal","0");
          root.style.setProperty("--screen-visibility","hidden");
          screen.inert = true;
        }
        setWeights(open,frame,brand);
        pointerX += (targetX-pointerX)*(1-Math.exp(-dt*4)); pointerY += (targetY-pointerY)*(1-Math.exp(-dt*4));
        const motion = still ? 0 : 1-frame-brand;
        rig.rotation.set(rx + pointerY*.1*motion,ry + pointerX*.18*motion,rz + Math.sin(elapsed*.23)*.04*motion);
        const scale = Math.min(rect.width/5.15,rect.height/4.35);
        const frameWidth = rect.width*(mobile ? .86 : .75);
        rig.scale.set(THREE.MathUtils.lerp(scale,frameWidth/4.6,frame),THREE.MathUtils.lerp(scale,rect.height*.75/2.7,frame),scale);
        rig.position.set(rect.left+rect.width/2-width/2,height/2-rect.top-rect.height/2,0);
        core.visible = ring.visible = frame+brand < .97;
        core.scale.setScalar((1-frame-brand)*(.7+open*.35)); ring.scale.setScalar((1-frame-brand)*(1+open*.5));
        ring.rotation.z = still ? .3 : elapsed*.1;
        coreMat.emissiveIntensity = .5+open*.7;
        glowMat.opacity = .75-frame*.45;
        edgeMat.opacity = .65+energy*.35;
        particleMat.uniforms.uTime.value = elapsed; particleMat.uniforms.uEnergy.value = energy;
        // Slowly moving key light reveals the metal without rotating readable poses.
        key.position.x = -300 + (still ? 0 : Math.sin(elapsed*.22)*130);
      }
      renderer.render(scene,camera);
      if (active && !still) {
        if (dt>.028) slowFrames++; else slowFrames = Math.max(0,slowFrames-1);
        if (slowFrames>100 && !lowQuality) { lowQuality = true; resize(); }
        raf = requestAnimationFrame(render);
      }
    };
    const request = () => { if (!disposed && !lost && !raf) { lastTime = 0; raf = requestAnimationFrame(render); } };
    requestRef.current = request;
    const onResize = () => { resize(); request(); };
    const onVisibility = () => { if (document.hidden) { cancelAnimationFrame(raf); raf = 0; } else request(); };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = hero.getBoundingClientRect();
      targetX = clamp((e.clientX-r.left)/r.width)*2-1;
      targetY = clamp((e.clientY-r.top)/r.height)*2-1;
    };
    const onLeave = () => { targetX = targetY = 0; };
    // Horizontal gestures are scoped to the sculpture; vertical scrolling is native.
    let touchX = 0, touchY = 0;
    const touchStart = (e: TouchEvent) => { touchX = e.touches[0].clientX; touchY = e.touches[0].clientY; };
    const touchMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX-touchX, dy = e.touches[0].clientY-touchY;
      if (Math.abs(dx)>Math.abs(dy)*1.5) targetX = Math.max(-1,Math.min(1,dx/80));
    };
    const onLost = (e: Event) => { e.preventDefault(); lost = true; cancelAnimationFrame(raf); raf = 0; root.dataset.sceneReady = "false"; screen.inert = false; };
    const onRestored = () => { lost = false; root.dataset.sceneReady = "true"; request(); };
    window.addEventListener("scroll",request,{passive:true}); window.addEventListener("resize",onResize);
    document.addEventListener("visibilitychange",onVisibility);
    hero.addEventListener("pointermove",onMove); hero.addEventListener("pointerleave",onLeave);
    hero.addEventListener("touchstart",touchStart,{passive:true}); hero.addEventListener("touchmove",touchMove,{passive:true}); hero.addEventListener("touchend",onLeave);
    canvas.addEventListener("webglcontextlost",onLost); canvas.addEventListener("webglcontextrestored",onRestored);
    const observer = new ResizeObserver(request); observer.observe(root);
    root.dataset.sceneReady = "true";
    request();
    return () => {
      disposed = true; cancelAnimationFrame(raf); requestRef.current = null; observer.disconnect();
      window.removeEventListener("scroll",request); window.removeEventListener("resize",onResize); document.removeEventListener("visibilitychange",onVisibility);
      hero.removeEventListener("pointermove",onMove); hero.removeEventListener("pointerleave",onLeave); hero.removeEventListener("touchstart",touchStart); hero.removeEventListener("touchmove",touchMove); hero.removeEventListener("touchend",onLeave);
      canvas.removeEventListener("webglcontextlost",onLost); canvas.removeEventListener("webglcontextrestored",onRestored);
      bodyGeo.dispose(); edgeGeo.dispose(); coreGeo.dispose(); ringGeo.dispose(); particlesGeo.dispose(); material.dispose(); edgeMat.dispose(); coreMat.dispose(); ringMat.dispose(); particleMat.dispose(); glowMat.dispose(); glowTexture.dispose(); env.dispose(); renderer.dispose();
      delete root.dataset.sceneReady; screen.inert = false;
    };
  }, [rootRef]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
