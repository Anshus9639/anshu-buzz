"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MousePointer2, Pause } from "lucide-react";
import type { ProjectLivePreview } from "@/data/projects";
import { cn } from "@/lib/utils";

const VIEWPORT_WIDTH = 1024;
const CONTENT_HEIGHT = 1703;

export function LiveSitePreview({
  preview,
}: {
  preview: ProjectLivePreview;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const element = frameRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "480px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = frameRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.intersectionRatio >= 0.5),
      { threshold: [0, 0.5, 1] },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = frameRef.current;
    if (!element) return;

    const update = () => {
      const { width, height } = element.getBoundingClientRect();
      if (!width || !height) return;
      const scale = width / VIEWPORT_WIDTH;
      const pan = Math.max(
        0,
        Math.min(CONTENT_HEIGHT * scale - height, 260),
      );
      element.style.setProperty("--live-scale", String(scale));
      element.style.setProperty("--pan-y", `${pan}px`);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      className="absolute inset-0 overflow-hidden bg-raised"
    >
      <Image
        src={preview.poster}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 45vw"
        className={cn(
          "object-cover object-top transition-opacity duration-500",
          loaded ? "opacity-0" : "opacity-100",
        )}
      />

      {nearViewport ? (
        <div
          className="live-preview-track"
          data-pan={loaded && inView && !interactive ? "true" : "false"}
          data-interactive={interactive ? "true" : "false"}
          style={{ width: VIEWPORT_WIDTH, height: CONTENT_HEIGHT }}
        >
          <iframe
            src={preview.url}
            title="JobFit AI public homepage preview"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms"
            referrerPolicy="no-referrer"
            tabIndex={interactive ? 0 : -1}
            onLoad={() => setLoaded(true)}
            className={cn(
              "border-0 bg-ink transition-opacity duration-700",
              loaded ? "opacity-100" : "opacity-0",
              interactive ? "pointer-events-auto" : "pointer-events-none",
            )}
            style={{ width: VIEWPORT_WIDTH, height: CONTENT_HEIGHT }}
          />
        </div>
      ) : null}

      {!interactive ? (
        <button
          type="button"
          onClick={() => setInteractive(true)}
          aria-label="Interact with preview of the live JobFit AI homepage"
          className="absolute inset-0 z-20 flex items-end justify-start p-4 text-left sm:p-5"
        >
          <span className="inline-flex items-center gap-2 border border-hairline bg-ink/90 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-chalk transition-colors hover:border-chalk">
            <MousePointer2
              aria-hidden="true"
              className="size-3"
              strokeWidth={1.5}
            />
            Interact with preview
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setInteractive(false)}
          className="absolute bottom-4 right-4 z-20 inline-flex min-h-8 items-center gap-2 border border-hairline bg-ink/90 px-3 font-mono text-[9px] uppercase tracking-[0.14em] text-chalk transition-colors hover:border-chalk"
        >
          <Pause aria-hidden="true" className="size-3" strokeWidth={1.5} />
          Pause preview
        </button>
      )}

      {nearViewport && !loaded ? (
        <span className="absolute right-4 top-4 z-20 border border-hairline bg-ink/90 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ash">
          Loading live preview…
        </span>
      ) : null}
    </div>
  );
}
