import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";

import { buildShapes, type ShapeSpots } from "./nanoShapes";

// Sampling eleven forms and wiring their neighbour graphs is seconds of CPU
// on a phone; off the main thread it costs the page nothing.
self.onmessage = (e: MessageEvent<{ N: number }>) => {
  const { shapes, sheet } = buildShapes(THREE, { mergeGeometries }, MeshSurfaceSampler, e.data.N);
  const buffers = (s: ShapeSpots) => [s.pos.buffer, s.nrm.buffer, s.dir.buffer, s.reach.buffer, s.nbr.buffer];
  (self as unknown as Worker).postMessage({ shapes, sheet }, [...shapes.flatMap(buffers), ...buffers(sheet)]);
};
