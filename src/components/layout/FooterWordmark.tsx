"use client";

import { useRef, type PointerEvent } from "react";

export function FooterWordmark() {
  const wordmarkRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const element = wordmarkRef.current;
    if (!element) return;

    const bounds = element.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    element.style.setProperty("--wordmark-x", `${x * 14}px`);
    element.style.setProperty("--wordmark-y", `${y * 8}px`);
    element.style.setProperty("--wordmark-rx", `${x * 3}deg`);
    element.style.setProperty("--wordmark-ry", `${y * -3}deg`);
  }

  function resetPointer() {
    const element = wordmarkRef.current;
    if (!element) return;

    element.style.setProperty("--wordmark-x", "0px");
    element.style.setProperty("--wordmark-y", "0px");
    element.style.setProperty("--wordmark-rx", "0deg");
    element.style.setProperty("--wordmark-ry", "0deg");
  }

  return (
    <div
      ref={wordmarkRef}
      className="footer-wordmark"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <svg
        viewBox="0 0 1200 220"
        role="img"
        aria-labelledby="footer-wordmark-title"
        className="footer-wordmark-svg"
      >
        <title id="footer-wordmark-title">ANSHU</title>

        <g className="footer-wordmark-ghost" aria-hidden="true">
          <path d="M40 196 L112 24 L184 196 M70 124 L154 124" />
          <path d="M224 24 L224 196 M224 24 L356 196 M356 24 L356 196" />
          <path d="M604 24 H476 C440 24 420 44 420 72 C420 98 440 110 476 110 H548 C584 110 604 126 604 150 C604 178 584 196 548 196 H420" />
          <path d="M662 24 V196 M662 110 H824 M824 24 V196" />
          <path d="M884 24 V132 C884 176 920 196 994 196 C1068 196 1104 176 1104 132 V24" />
        </g>

        <g className="footer-wordmark-main" aria-hidden="true">
          <path d="M40 196 L112 24 L184 196 M70 124 L154 124" />
          <path d="M224 24 L224 196 M224 24 L356 196 M356 24 L356 196" />
          <path d="M604 24 H476 C440 24 420 44 420 72 C420 98 440 110 476 110 H548 C584 110 604 126 604 150 C604 178 584 196 548 196 H420" />
          <path d="M662 24 V196 M662 110 H824 M824 24 V196" />
          <path d="M884 24 V132 C884 176 920 196 994 196 C1068 196 1104 176 1104 132 V24" />
          <path d="M112 24 L112 196 M112 24 L184 196" className="footer-wordmark-detail" />
        </g>

        <g className="footer-wordmark-nodes" aria-hidden="true">
          {[
            [40, 196], [112, 24], [184, 196], [224, 24], [224, 196],
            [356, 24], [356, 196], [420, 24], [604, 24], [420, 196],
            [604, 196], [420, 110], [604, 110], [662, 24], [662, 196],
            [824, 24], [824, 196], [884, 24], [884, 132], [994, 196],
            [1104, 132], [1104, 24],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" />
          ))}
        </g>

        <path
          className="footer-wordmark-scan"
          d="M0 196 H1200"
          aria-hidden="true"
        />
      </svg>
    </div>
  );
}
