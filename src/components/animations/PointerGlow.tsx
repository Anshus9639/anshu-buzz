"use client";

import { useEffect } from "react";

export function PointerGlow() {
  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const card = target.closest<HTMLElement>("[data-spotlight]");
      if (!card) return;

      const bounds = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
      card.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
    }

    document.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    return () => document.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return null;
}
