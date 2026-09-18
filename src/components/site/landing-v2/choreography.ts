/** Scroll is measured against the actual stage, never total document height. */
export const clamp = (n: number) => Math.max(0, Math.min(1, n));
export const ease = (n: number) => { const t = clamp(n); return t * t * (3 - 2 * t); };
export const interval = (p: number, a: number, b: number) => ease((p - a) / (b - a));

export function stageProgress(top: number, height: number, viewport: number) {
  return clamp(-top / Math.max(1, height - viewport));
}

export function storyPose(progress: number) {
  // Holds at each end give the eye time to read the silhouette.
  const opened = interval(progress, 0.05, 0.32);
  const screen = interval(progress, 0.37, 0.76);
  return {
    opened: opened * (1 - screen),
    screen,
    reveal: interval(progress, 0.73, 0.88),
    particles: Math.sin(screen * Math.PI) * 0.8 + Math.sin(opened * Math.PI) * (1 - screen) * 0.25,
    chapter: progress < 0.35 ? 0 : progress < 0.78 ? 1 : 2,
  };
}
