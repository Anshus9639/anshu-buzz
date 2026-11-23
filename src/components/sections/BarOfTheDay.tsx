import { ArrowUpRight } from "lucide-react";
import { connection } from "next/server";
import { getBarOfTheDay } from "@/lib/bar-of-the-day";

export async function BarOfTheDay() {
  await connection();
  const bar = getBarOfTheDay();

  return (
    <aside
      aria-labelledby="bar-of-the-day-title"
      className="w-full max-w-[34rem] border-t border-hairline pt-6 lg:max-w-none"
    >
      <h2 id="bar-of-the-day-title" className="mono-micro text-ash">
        BAR OF THE DAY.
      </h2>
      <div
        className="hero-fade bar-of-the-day mt-5 min-h-[11.5rem] sm:min-h-[12rem] lg:min-h-[12.5rem]"
        style={{ animationDelay: "420ms" }}
      >
        <blockquote className="font-display text-[1.5rem] leading-[1.35] tracking-[-0.015em] text-chalk sm:text-[1.625rem] lg:text-[1.75rem]">
          {bar.excerpt}
        </blockquote>
        <p className="mono-micro mt-4 text-ash">{bar.artist}</p>
        <a
          href={bar.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Listen to ${bar.track} by ${bar.artist}`}
          className="link-underline mono-micro mt-5 inline-flex items-center gap-1 text-ash transition-colors hover:text-chalk focus-visible:text-chalk"
        >
          LISTEN
          <ArrowUpRight aria-hidden="true" className="size-3" strokeWidth={1.5} />
        </a>
      </div>
    </aside>
  );
}

export function BarOfTheDayFallback() {
  return (
    <aside
      aria-hidden="true"
      className="w-full max-w-[34rem] border-t border-hairline pt-6 lg:max-w-none"
    >
      <p className="mono-micro text-ash">BAR OF THE DAY.</p>
      <div className="mt-5 min-h-[11.5rem] sm:min-h-[12rem] lg:min-h-[12.5rem]" />
    </aside>
  );
}
