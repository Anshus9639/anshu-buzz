"use client";

import { Check, Copy, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { copyToClipboard } from "@/lib/utils";

type CopyState = "idle" | "copied" | "error";

export function CopyEmail() {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  async function handleCopy() {
    if (timer.current) window.clearTimeout(timer.current);
    const copied = await copyToClipboard(profile.email);
    setState(copied ? "copied" : "error");
    timer.current = window.setTimeout(() => setState("idle"), 2600);
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleCopy}
        className="group inline-flex max-w-full items-center gap-4 border-b border-hairline pb-2 text-left transition-colors duration-300 hover:border-chalk"
        aria-label={`Copy email address ${profile.email}`}
      >
        <span className="font-display text-[clamp(1.3rem,3.5vw,2.9rem)] font-medium leading-tight tracking-[-0.04em] text-chalk lg:text-[clamp(1.3rem,2.8vw,2.9rem)]">
          {profile.email}
        </span>
        <span
          aria-hidden="true"
          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-hairline text-ash transition-colors duration-300 group-hover:border-chalk group-hover:text-chalk"
        >
          {state === "copied" ? (
            <Check className="size-3.5" strokeWidth={1.5} />
          ) : (
            <Copy className="size-3.5" strokeWidth={1.5} />
          )}
        </span>
      </button>

      <p className="mono-micro mt-3 min-h-4 text-ash" aria-live="polite">
        {state === "copied"
          ? "Copied to clipboard"
          : state === "error"
            ? "Clipboard unavailable — select the address above"
            : "Click to copy"}
      </p>

      <a
        href={`mailto:${profile.email}`}
        className="group mt-5 inline-flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ash transition-colors hover:text-chalk"
      >
        <Mail aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
        Or open your mail app
      </a>
    </div>
  );
}
