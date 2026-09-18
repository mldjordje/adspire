import { describe, expect, it } from "vitest";
import { stageProgress, storyPose } from "./choreography";

describe("landing v2 scroll choreography", () => {
  it("measures the pinned chapter independently of content below it", () => {
    expect(stageProgress(100, 2500, 1000)).toBe(0);
    expect(stageProgress(-750, 2500, 1000)).toBe(.5);
    expect(stageProgress(-1500, 2500, 1000)).toBe(1);
    expect(stageProgress(-8000, 2500, 1000)).toBe(1);
    expect(stageProgress(0, 500, 1000)).toBe(0);
  });
  it("keeps valid geometry weights for fast and reverse scrolling", () => {
    for (let i = 110; i >= -10; i--) {
      const pose = storyPose(i / 100);
      expect(pose.opened + pose.screen).toBeLessThanOrEqual(1.000001);
      expect(pose.opened).toBeGreaterThanOrEqual(0);
      expect(pose.screen).toBeGreaterThanOrEqual(0);
      if (pose.reveal > .9) expect(pose.screen).toBe(1);
    }
  });
  it("holds the finished, interactive project before leaving the stage", () => {
    expect(storyPose(.9)).toMatchObject({ opened: 0, screen: 1, reveal: 1, chapter: 2 });
    expect(storyPose(0)).toMatchObject({ opened: 0, screen: 0, reveal: 0, chapter: 0 });
    expect(storyPose(.34)).toMatchObject({ opened: 1, screen: 0 });
  });
});
