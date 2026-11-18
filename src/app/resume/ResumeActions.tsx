"use client";

import { Download, Printer } from "lucide-react";
import { profile } from "@/data/profile";

export function ResumeActions() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={profile.links.resume.href}
        download
        className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-chalk px-6 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-white"
      >
        <Download aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
        Download PDF
      </a>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-hairline px-6 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-chalk transition-colors duration-300 hover:border-dust hover:bg-white/[0.03]"
      >
        <Printer aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
        Print
      </button>
    </div>
  );
}
