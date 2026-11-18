import { profile } from "@/data/profile";

export function Ticker() {
  const items = profile.disciplines;

  return (
    <div className="marquee defer-strip relative overflow-hidden border-b border-hairline bg-ink py-4">
      <h2 className="sr-only">Areas of practice</h2>
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12"
          >
            {items.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="flex shrink-0 items-center gap-8 sm:gap-12"
              >
                <span className="mono-label text-ash">{item}</span>
                <span className="font-mono text-[10px] text-ash">+</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
