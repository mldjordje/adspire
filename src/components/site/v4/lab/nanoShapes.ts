/**
 * Silhouettes for the micro-bot swarm, sampled into docking spots.
 *
 * Each spot carries a position, the surface normal (the bot's back faces out)
 * and a link direction pointing at a neighbouring spot, so a docked bot
 * reaches towards the next one and the shape reads as a woven lattice rather
 * than a pile.
 */

type Three = typeof import("three");
type Utils = typeof import("three/examples/jsm/utils/BufferGeometryUtils.js");
type Merge = Utils["mergeGeometries"];
type SamplerCtor = typeof import("three/examples/jsm/math/MeshSurfaceSampler.js").MeshSurfaceSampler;

export type ShapeSpots = {
  name: string;
  label: string;
  pos: Float32Array;
  nrm: Float32Array;
  dir: Float32Array;
  /**
   * Per spot, two offsets (right arm, left arm) to the neighbours whose balls
   * the arms reach for. Arms ending on neighbours is what closes the gaps:
   * bots become the nodes of a mesh and their arms its edges.
   */
  reach: Float32Array;
  /** indices of the two neighbours the arms reach for (-1 if none) */
  nbr: Int32Array;
  /** mean distance between neighbouring spots, drives bot size */
  spacing: number;
};

export function buildShapes(
  THREE: Three,
  utils: Pick<Utils, "mergeGeometries">,
  Sampler: SamplerCtor,
  N: number,
): { shapes: ShapeSpots[]; sheet: ShapeSpots } {
  const { mergeGeometries } = utils;
  type G = InstanceType<Three["BufferGeometry"]>;
  type Shape = InstanceType<Three["Shape"]>;

  const rounded = (w: number, h: number, r: number) => {
    const s = new THREE.Shape();
    const x = -w / 2;
    const y = -h / 2;
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y);
    s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r);
    s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h);
    s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r);
    s.quadraticCurveTo(x, y, x + r, y);
    return s;
  };
  const slab = (shape: Shape, depth: number) => {
    const g = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 2,
      curveSegments: 10,
    });
    g.translate(0, 0, -depth / 2);
    return g;
  };
  const place = (g: G, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) => {
    g.rotateX(rx);
    g.rotateY(ry);
    g.rotateZ(rz);
    g.translate(x, y, z);
    return g;
  };

  const bulb = (): G[] => {
    const pts: InstanceType<Three["Vector2"]>[] = [];
    pts.push(new THREE.Vector2(0.001, -1.42), new THREE.Vector2(0.2, -1.36), new THREE.Vector2(0.3, -1.2));
    for (let i = 0; i <= 5; i++) pts.push(new THREE.Vector2(0.4 + (i % 2) * 0.05, -1.15 + i * 0.12));
    pts.push(new THREE.Vector2(0.44, -0.5), new THREE.Vector2(0.5, -0.3), new THREE.Vector2(0.64, -0.05));
    for (let i = 0; i <= 16; i++) {
      const a = -0.85 + (i / 16) * (Math.PI / 2 + 0.85);
      pts.push(new THREE.Vector2(Math.max(0.001, Math.cos(a)), 0.72 + Math.sin(a)));
    }
    return [new THREE.LatheGeometry(pts, 48)];
  };
  const devices = (): G[] => [
    place(slab(rounded(2.9, 1.85, 0.1), 0.07), 0, 0.72, -0.62, -0.22),
    place(slab(rounded(3.0, 1.9, 0.12), 0.07), 0, -0.3, 0.3, -Math.PI / 2 + 0.02),
    place(slab(rounded(0.8, 1.62, 0.14), 0.09), 1.95, 0.05, 0.95, 0, -0.35),
  ];
  const bag = (): G[] => {
    const s = new THREE.Shape();
    s.moveTo(-1.0, -1.2);
    s.lineTo(1.0, -1.2);
    s.lineTo(1.15, 1.0);
    s.lineTo(-1.15, 1.0);
    s.closePath();
    const handle = (z: number) => place(new THREE.TorusGeometry(0.52, 0.06, 10, 40, Math.PI), 0, 0.98, z);
    return [slab(s, 0.9), handle(0.28), handle(-0.28)];
  };
  const chip = (): G[] => {
    const out: G[] = [slab(rounded(2.2, 2.2, 0.16), 0.24), place(slab(rounded(1.05, 1.05, 0.1), 0.14), 0, 0, 0.18)];
    for (let side = 0; side < 4; side++) {
      for (let i = 0; i < 6; i++) {
        const o = -0.78 + i * 0.312;
        const pin = new THREE.BoxGeometry(0.13, 0.5, 0.07);
        if (side < 2) place(pin, o, side === 0 ? 1.32 : -1.32, 0);
        else place(pin, side === 2 ? 1.32 : -1.32, o, 0, 0, 0, Math.PI / 2);
        out.push(pin);
      }
    }
    return out;
  };
  const growth = (): G[] => {
    const out: G[] = [];
    [0.7, 1.15, 1.65, 2.3].forEach((h, i) =>
      out.push(place(new THREE.BoxGeometry(0.5, h, 0.5), -1.35 + i * 0.78, -1.2 + h / 2, 0)),
    );
    const a = new THREE.Shape();
    a.moveTo(-1.6, -0.08);
    a.lineTo(1.1, -0.08);
    a.lineTo(1.1, -0.3);
    a.lineTo(1.65, 0);
    a.lineTo(1.1, 0.3);
    a.lineTo(1.1, 0.08);
    a.lineTo(-1.6, 0.08);
    a.closePath();
    out.push(place(slab(a, 0.16), -0.05, 0.55, 0.45, 0, 0, 0.55));
    return out;
  };
  const monogram = (): G[] => {
    const s = new THREE.Shape();
    s.moveTo(-1.25, -1.45);
    s.lineTo(-0.6, -1.45);
    s.lineTo(-0.4, -0.85);
    s.lineTo(0.4, -0.85);
    s.lineTo(0.6, -1.45);
    s.lineTo(1.25, -1.45);
    s.lineTo(0.32, 1.45);
    s.lineTo(-0.32, 1.45);
    s.closePath();
    const hole = new THREE.Path();
    hole.moveTo(-0.2, -0.38);
    hole.lineTo(0.2, -0.38);
    hole.lineTo(0, 0.3);
    hole.closePath();
    s.holes.push(hole);
    return [slab(s, 0.5)];
  };

  const gear = (): G[] => {
    // twelve teeth with flanks, a bored hub: reads as a gear at any size
    const teeth = 12;
    const rOut = 1.5;
    const rRoot = 1.18;
    const s = new THREE.Shape();
    for (let i = 0; i < teeth; i++) {
      const a0 = (i / teeth) * Math.PI * 2;
      const step = (Math.PI * 2) / teeth;
      const pts: [number, number][] = [
        [rRoot, a0],
        [rOut, a0 + step * 0.18],
        [rOut, a0 + step * 0.42],
        [rRoot, a0 + step * 0.6],
      ];
      pts.forEach(([r, a], k) => {
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        if (i === 0 && k === 0) s.moveTo(x, y);
        else s.lineTo(x, y);
      });
    }
    s.closePath();
    const hole = new THREE.Path();
    hole.absarc(0, 0, 0.42, 0, Math.PI * 2, true);
    s.holes.push(hole);
    const g = new THREE.ExtrudeGeometry(s, {
      depth: 0.42,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 2,
      curveSegments: 24,
    });
    g.translate(0, 0, -0.21);
    return [g];
  };

  const defs: [string, string, () => G[]][] = [
    ["bulb", "Ideja", bulb],
    ["devices", "Sajt i app", devices],
    ["bag", "Web shop", bag],
    ["chip", "AI", chip],
    ["growth", "Rast", growth],
    ["gear", "Proces", gear],
    ["monogram", "Adspire", monogram],
  ];

  const tmpP = new THREE.Vector3();
  const tmpN = new THREE.Vector3();

  type Pt = { p: number[]; n: number[] };
  const cellKey = (x: number, y: number, z: number) => `${x},${y},${z}`;

  const link = (pts: Pt[], spacing: number) => {
    // same ordering on every shape: the base of one form flies to the base
    // of the next, which keeps paths short and lets neighbours fly as streams
    pts.sort((u, v) => u.p[1] - v.p[1] + (u.p[0] - v.p[0]) * 0.02);

    // two arms per bot, each reaching for a different neighbour's ball
    const g2 = new Map<string, number[]>();
    const c2 = spacing * 2.1;
    pts.forEach((q, i) => {
      const kk = cellKey(Math.floor(q.p[0] / c2), Math.floor(q.p[1] / c2), Math.floor(q.p[2] / c2));
      const bucket = g2.get(kk);
      if (bucket) bucket.push(i);
      else g2.set(kk, [i]);
    });
    const pos = new Float32Array(N * 3);
    const nrm = new Float32Array(N * 3);
    const dir = new Float32Array(N * 3);
    const reach = new Float32Array(N * 6);
    const nbr = new Int32Array(N * 2).fill(-1);
    const n = new THREE.Vector3();
    const t = new THREE.Vector3();
    const x0 = new THREE.Vector3();
    const b0 = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0);
    let s3 = 424242;
    const r3 = () => ((s3 = (s3 * 16807) % 2147483647) / 2147483647);
    type Cand = { j: number; d: number; ang: number; v: number[] };
    pts.forEach((q, i) => {
      pos.set(q.p, i * 3);
      n.set(q.n[0], q.n[1], q.n[2]).normalize();
      nrm.set([n.x, n.y, n.z], i * 3);
      // tangent basis to measure neighbour angles around the normal
      x0.crossVectors(Math.abs(n.y) < 0.95 ? up : new THREE.Vector3(1, 0, 0), n).normalize();
      b0.crossVectors(n, x0);
      const cx = Math.floor(q.p[0] / c2);
      const cy = Math.floor(q.p[1] / c2);
      const cz = Math.floor(q.p[2] / c2);
      const cands: Cand[] = [];
      for (let dx = -1; dx <= 1; dx++)
        for (let dy = -1; dy <= 1; dy++)
          for (let dz = -1; dz <= 1; dz++) {
            const bucket = g2.get(cellKey(cx + dx, cy + dy, cz + dz));
            if (!bucket) continue;
            for (const j of bucket) {
              if (j === i) continue;
              const o = pts[j].p;
              const v = [o[0] - q.p[0], o[1] - q.p[1], o[2] - q.p[2]];
              const d = Math.hypot(v[0], v[1], v[2]);
              if (d < spacing * 0.55 || d > spacing * 2.0) continue;
              t.set(v[0], v[1], v[2]);
              cands.push({ j, d, v, ang: Math.atan2(t.dot(b0), t.dot(x0)) });
            }
          }
      // right arm: a neighbour about a bot-length away, favouring the row
      let first: Cand | null = null;
      let fs = Infinity;
      for (const c of cands) {
        const sc = Math.abs(c.d - spacing * 1.15) + Math.abs(c.v[1]) * 0.5;
        if (sc < fs) {
          fs = sc;
          first = c;
        }
      }
      // left arm: another neighbour at a per-bot angle between 110° and 180°
      // from the first, so neighbouring bots fan out and cover the holes
      const want = ((110 + r3() * 70) * Math.PI) / 180;
      let second: Cand | null = null;
      let ss = Infinity;
      if (first) {
        for (const c of cands) {
          if (c.j === first.j) continue;
          let da = Math.abs(c.ang - first.ang);
          if (da > Math.PI) da = Math.PI * 2 - da;
          const sc = Math.abs(da - want) * 0.9 + Math.abs(c.d - spacing * 1.15) / spacing;
          if (sc < ss) {
            ss = sc;
            second = c;
          }
        }
      }
      if (first) t.set(first.v[0], first.v[1], first.v[2]);
      else t.crossVectors(up, n);
      t.addScaledVector(n, -t.dot(n));
      if (t.lengthSq() < 1e-8) t.set(1, 0, 0);
      t.normalize();
      dir.set([t.x, t.y, t.z], i * 3);
      const fallback = [t.x * spacing, t.y * spacing, t.z * spacing];
      reach.set(first ? first.v : fallback, i * 6);
      reach.set(second ? second.v : fallback.map((c) => -c), i * 6 + 3);
      nbr[i * 2] = first ? first.j : -1;
      nbr[i * 2 + 1] = second ? second.j : -1;
    });
    return { pos, nrm, dir, reach, nbr, spacing };
  };

  const sample = (parts: G[]) => {
    const flat = parts.map((g) => {
      const ng = g.index ? g.toNonIndexed() : g;
      for (const k of Object.keys(ng.attributes)) if (k !== "position" && k !== "normal") ng.deleteAttribute(k);
      return ng;
    });
    const merged = mergeGeometries(flat as Parameters<Merge>[0])!;
    merged.computeBoundingBox();
    const bb = merged.boundingBox!;
    const c = bb.getCenter(new THREE.Vector3());
    const size = bb.getSize(new THREE.Vector3());
    const k = 3.3 / Math.max(size.x, size.y, size.z);
    merged.translate(-c.x, -c.y, -c.z);
    merged.scale(k, k, k);
    merged.computeVertexNormals();

    const p = merged.attributes.position.array as Float32Array;
    let area = 0;
    const a = new THREE.Vector3();
    const b = new THREE.Vector3();
    const d = new THREE.Vector3();
    for (let i = 0; i < p.length; i += 9) {
      a.set(p[i], p[i + 1], p[i + 2]);
      b.set(p[i + 3], p[i + 4], p[i + 5]).sub(a);
      d.set(p[i + 6], p[i + 7], p[i + 8]).sub(a);
      area += b.cross(d).length() * 0.5;
    }
    const spacing = Math.sqrt(area / N);

    // blue-noise spots: even spacing reads as engineered, random clumps don't
    const sampler = new Sampler(new THREE.Mesh(merged)).build();
    const minD = spacing * 0.86;
    const cell = minD;
    const grid = new Map<string, number[]>();
    const pts: Pt[] = [];
    const spare: Pt[] = [];
    for (let tries = 0; tries < N * 10 && pts.length < N; tries++) {
      sampler.sample(tmpP, tmpN);
      const q = { p: [tmpP.x, tmpP.y, tmpP.z], n: [tmpN.x, tmpN.y, tmpN.z] };
      const cx = Math.floor(tmpP.x / cell);
      const cy = Math.floor(tmpP.y / cell);
      const cz = Math.floor(tmpP.z / cell);
      let ok = true;
      for (let dx = -1; dx <= 1 && ok; dx++)
        for (let dy = -1; dy <= 1 && ok; dy++)
          for (let dz = -1; dz <= 1 && ok; dz++) {
            const bucket = grid.get(cellKey(cx + dx, cy + dy, cz + dz));
            if (!bucket) continue;
            for (const j of bucket) {
              const o = pts[j].p;
              const ex = o[0] - tmpP.x;
              const ey = o[1] - tmpP.y;
              const ez = o[2] - tmpP.z;
              if (ex * ex + ey * ey + ez * ez < minD * minD) {
                ok = false;
                break;
              }
            }
          }
      if (!ok) {
        if (spare.length < N) spare.push(q);
        continue;
      }
      const kk = cellKey(cx, cy, cz);
      const bucket = grid.get(kk);
      if (bucket) bucket.push(pts.length);
      else grid.set(kk, [pts.length]);
      pts.push(q);
    }
    while (pts.length < N) pts.push(spare.pop() ?? pts[pts.length % Math.max(1, pts.length)]);

    return link(pts, spacing);
  };

  const shapes = defs.map(([name, label, f]) => ({ name, label, ...sample(f()) }));

  // Intro sheet: a wide, gently dished disc of bots facing the camera at the
  // brand mark's spacing, so the first macro shot and the A share one scale.
  const spacing = shapes[shapes.length - 1].spacing;
  const radius = spacing * Math.sqrt(N / Math.PI) * 1.02;
  const pts: Pt[] = [];
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  // sunflower spiral: even spacing without grid rows
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const r = radius * Math.sqrt((i + 0.5) / N);
    const th = i * golden;
    const x = Math.cos(th) * r + (rnd() - 0.5) * spacing * 0.15;
    const y = Math.sin(th) * r + (rnd() - 0.5) * spacing * 0.15;
    const z = -(x * x + y * y) * 0.06;
    // dish normal: gradient of z
    const nx = x * 0.12;
    const ny = y * 0.12;
    const nl = Math.hypot(nx, ny, 1);
    pts.push({ p: [x, y, z], n: [nx / nl, ny / nl, 1 / nl] });
  }
  const sheet: ShapeSpots = { name: "sheet", label: "Ploča", ...link(pts, spacing) };
  return { shapes, sheet };
}
