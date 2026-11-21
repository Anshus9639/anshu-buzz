"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectWalkthrough } from "@/data/projects";

export function HomepageWalkthrough({
  walkthrough,
}: {
  walkthrough: ProjectWalkthrough;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const manualPauseRef = useRef(false);
  const autoPauseAtRef = useRef(0);
  const [nearViewport, setNearViewport] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = frameRef.current;
    if (!element) return;

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          loadObserver.disconnect();
        }
      },
      { rootMargin: "320px 0px" },
    );

    const playObserver = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.45 },
    );

    loadObserver.observe(element);
    playObserver.observe(element);

    return () => {
      loadObserver.disconnect();
      playObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !nearViewport) return;

    if (!visible) {
      if (!video.paused) {
        autoPauseAtRef.current = Date.now();
        video.pause();
      }
      return;
    }

    if (manualPauseRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    video.muted = true;
    void video.play().catch(() => {
      // Autoplay can still be refused; native controls remain available.
    });
  }, [nearViewport, visible]);

  return (
    <div ref={frameRef} className="absolute inset-0 bg-raised">
      {nearViewport ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          controls
          muted
          loop
          playsInline
          preload="none"
          poster={walkthrough.poster}
          width={1916}
          height={1080}
          aria-label={`${walkthrough.label}: ${walkthrough.title}. Muted autoplay with native controls.`}
          onPlay={() => {
            manualPauseRef.current = false;
          }}
          onPause={() => {
            if (Date.now() - autoPauseAtRef.current > 500) {
              manualPauseRef.current = true;
            }
          }}
        >
          <source src={walkthrough.video} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0" />
      )}
    </div>
  );
}
