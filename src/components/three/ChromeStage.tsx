"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { StageBoundary } from "@/components/three/StageBoundary";
import { cn } from "@/lib/utils";

const ChromeScene = dynamic(() => import("@/components/three/ChromeScene"), {
  ssr: false,
  loading: () => null,
});

type ChromeStatus = "pending" | "loading" | "ready" | "fallback";

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number },
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function prefersDataSaver() {
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  return connection?.saveData === true;
}

function supportsScene() {
  return window.matchMedia(
    "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
  ).matches;
}

export function ChromeStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<ChromeStatus>("pending");
  const [enabled, setEnabled] = useState(false);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    function handleVisibility() {
      setPageVisible(document.visibilityState === "visible");
    }

    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) setInView(entries[0].isIntersecting);
      },
      { threshold: 0.05 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion() || prefersDataSaver() || !supportsScene()) {
      const timer = window.setTimeout(() => setStatus("fallback"), 0);
      return () => window.clearTimeout(timer);
    }

    const idleWindow = window as IdleWindow;
    let handle: number | undefined;
    let loaded = false;

    function load() {
      if (loaded) return;
      loaded = true;
      if (!supportsWebGL()) {
        setStatus("fallback");
        return;
      }
      setEnabled(true);
      setStatus("loading");
    }

    function cancel() {
      window.removeEventListener("pointermove", onInteract);
      window.removeEventListener("scroll", onInteract);
      window.removeEventListener("keydown", onInteract);
      if (handle === undefined) return;
      if (idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(handle);
      } else {
        window.clearTimeout(handle);
      }
    }

    function onInteract() {
      cancel();
      if (idleWindow.requestIdleCallback) {
        handle = idleWindow.requestIdleCallback(load, { timeout: 1200 });
      } else {
        handle = window.setTimeout(load, 300);
      }
    }

    window.addEventListener("pointermove", onInteract, {
      passive: true,
      once: true,
    });
    window.addEventListener("scroll", onInteract, {
      passive: true,
      once: true,
    });
    window.addEventListener("keydown", onInteract, { once: true });

    return cancel;
  }, []);

  const active = enabled && inView && pageVisible && status !== "fallback";

  return (
    <div
      ref={containerRef}
      data-chrome-stage
      data-chrome-status={status}
      className="relative aspect-square w-full select-none"
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-1000 ease-editorial",
          status === "ready" ? "opacity-0" : "opacity-100",
        )}
      >
        <div className="absolute inset-0 grid place-items-center">
          <div className="chrome-glow absolute inset-[4%] rounded-full" />
          <div className="chrome-orbit left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="chrome-orb" />
        </div>
      </div>

      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-1000 ease-editorial",
          status === "ready" ? "opacity-100" : "opacity-0",
        )}
      >
        {enabled ? (
          <StageBoundary onError={() => setStatus("fallback")}>
            <ChromeScene active={active} onReady={() => setStatus("ready")} />
          </StageBoundary>
        ) : null}
      </div>
    </div>
  );
}
