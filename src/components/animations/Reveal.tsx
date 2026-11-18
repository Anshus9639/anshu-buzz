import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  duration = 0.85,
}: RevealProps) {
  return (
    <div
      data-reveal
      className={cn("reveal", className)}
      style={
        {
          "--reveal-delay": `${delay}s`,
          "--reveal-y": `${y}px`,
          "--reveal-duration": `${duration}s`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
