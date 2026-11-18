import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-edge flex min-h-svh flex-col justify-center pb-20 pt-28">
      <p className="mono-label text-ash">Error / 404</p>
      <h1 className="section-title mt-8 max-w-4xl">Off the map.</h1>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-ash">
        The page you’re looking for doesn’t exist, or it has moved somewhere
        else on the site.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center gap-3 rounded-full bg-chalk px-6 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-white"
        >
          <ArrowLeft aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
          Home
        </Link>
        <Link
          href="/#work"
          className="inline-flex min-h-12 items-center gap-3 rounded-full border border-hairline px-6 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-chalk transition-colors hover:border-dust hover:bg-white/[0.03]"
        >
          Selected work
          <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
        </Link>
      </div>

      <div className="mt-20 flex items-center justify-between border-t border-hairline pt-5">
        <span className="mono-micro text-ash">ANSHU / 2026</span>
        <span className="mono-micro text-ash">anshu.buzz</span>
      </div>
    </div>
  );
}
