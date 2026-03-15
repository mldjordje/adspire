"use client";

import React, { useEffect, useRef } from "react";

type VideoBlockProps = {
  src: string;
  className?: string;
  poster?: string;
};

export function VideoBlock({ src, className, poster }: VideoBlockProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) {
      return;
    }

    node.muted = true;
    node.defaultMuted = true;
    const playback = node.play();
    if (playback && typeof playback.catch === "function") {
      playback.catch(() => {});
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      controls={false}
      controlsList="nodownload noplaybackrate"
      disablePictureInPicture
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
