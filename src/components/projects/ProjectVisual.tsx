import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

function RagArt({ slug }: { slug: string }) {
  const dots = [];

  for (let row = 0; row < 10; row += 1) {
    for (let column = 0; column < 15; column += 1) {
      dots.push({ x: 80 + column * 46, y: 120 + row * 40, row, column });
    }
  }

  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className="project-art h-full w-full"
      role="presentation"
    >
      <defs>
        <linearGradient id={`${slug}-beam`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f4f4f4" stopOpacity="0" />
          <stop offset="0.5" stopColor="#f4f4f4" stopOpacity="0.65" />
          <stop offset="1" stopColor="#f4f4f4" stopOpacity="0.05" />
        </linearGradient>
        <radialGradient id={`${slug}-halo`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="800" height="600" fill="#101010" />
      <circle cx="540" cy="250" r="270" fill={`url(#${slug}-halo)`} />

      <g fill="#464646">
        {dots.map((dot) => (
          <circle
            key={`${dot.row}-${dot.column}`}
            cx={dot.x}
            cy={dot.y}
            r="1.4"
          />
        ))}
      </g>

      <g stroke="#333333" strokeWidth="1">
        <line x1="80" y1="74" x2="720" y2="74" />
        <line x1="80" y1="526" x2="720" y2="526" />
      </g>

      <g stroke="#7d7d7d" strokeWidth="1">
        <path d="M 250 230 L 430 306 L 566 206" />
        <path d="M 566 206 L 654 354" strokeDasharray="3 6" opacity="0.8" />
      </g>

      <g>
        <circle cx="250" cy="230" r="34" stroke="#5c5c5c" strokeWidth="1" />
        <circle cx="430" cy="306" r="58" stroke="#6f6f6f" strokeWidth="1" />
        <circle cx="430" cy="306" r="88" stroke="#3f3f3f" strokeWidth="1" />
        <circle cx="566" cy="206" r="18" stroke="#b5b5b5" strokeWidth="1" />
        <rect
          x="642"
          y="342"
          width="24"
          height="24"
          stroke="#8f8f8f"
          strokeWidth="1"
        />
        <circle cx="250" cy="230" r="3" fill="#f4f4f4" />
        <circle cx="430" cy="306" r="4" fill="#f4f4f4" />
      </g>

      <path
        d="M 196 430 L 604 430"
        stroke={`url(#${slug}-beam)`}
        strokeWidth="1"
      />
      <g fill="#7a7a7a" fontFamily="monospace" fontSize="9" letterSpacing="3">
        <text x="180" y="96">QUERY / CONTEXT / ANSWER</text>
        <text x="548" y="96">RETRIEVE</text>
        <text x="180" y="505">EMBEDDINGS + SEMANTIC SEARCH</text>
      </g>
    </svg>
  );
}

function TradingArt({ slug }: { slug: string }) {
  const candles = [
    { x: 120, open: 400, close: 360, high: 330, low: 420 },
    { x: 158, open: 360, close: 380, high: 335, low: 400 },
    { x: 196, open: 380, close: 320, high: 300, low: 398 },
    { x: 234, open: 320, close: 348, high: 306, low: 366 },
    { x: 272, open: 348, close: 292, high: 270, low: 360 },
    { x: 310, open: 292, close: 316, high: 280, low: 326 },
    { x: 348, open: 316, close: 268, high: 244, low: 330 },
    { x: 386, open: 268, close: 288, high: 258, low: 302 },
    { x: 424, open: 288, close: 236, high: 214, low: 300 },
    { x: 462, open: 236, close: 262, high: 226, low: 278 },
    { x: 500, open: 262, close: 214, high: 190, low: 274 },
    { x: 538, open: 214, close: 240, high: 204, low: 258 },
  ];
  const depth = [132, 94, 158, 72, 118, 168, 86, 140];

  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className="project-art h-full w-full"
      role="presentation"
    >
      <defs>
        <linearGradient id={`${slug}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4f4f4" stopOpacity="0.18" />
          <stop offset="1" stopColor="#f4f4f4" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="800" height="600" fill="#101010" />

      <g stroke="#2e2e2e" strokeWidth="1">
        <line x1="90" y1="140" x2="600" y2="140" />
        <line x1="90" y1="230" x2="600" y2="230" />
        <line x1="90" y1="320" x2="600" y2="320" />
        <line x1="90" y1="410" x2="600" y2="410" />
        <line x1="90" y1="500" x2="600" y2="500" />
      </g>

      <path
        d="M 96 470 L 158 438 L 196 452 L 272 372 L 348 330 L 424 300 L 500 264 L 560 288 L 600 274 L 600 500 L 96 500 Z"
        fill={`url(#${slug}-fade)`}
        opacity="0.5"
      />

      <g>
        {candles.map((candle) => {
          const top = Math.min(candle.open, candle.close);
          const height = Math.max(Math.abs(candle.close - candle.open), 6);
          const rising = candle.close < candle.open;

          return (
            <g key={candle.x}>
              <line
                x1={candle.x + 9}
                y1={candle.high}
                x2={candle.x + 9}
                y2={candle.low}
                stroke="#8a8a8a"
                strokeWidth="1"
              />
              <rect
                x={candle.x}
                y={top}
                width="18"
                height={height}
                fill={rising ? "#d8d8d8" : "#161616"}
                stroke={rising ? "#d8d8d8" : "#9a9a9a"}
                strokeWidth="1"
              />
            </g>
          );
        })}
      </g>

      <g stroke="#333333" strokeWidth="1">
        <line x1="600" y1="120" x2="600" y2="500" />
        <line x1="90" y1="120" x2="600" y2="120" />
      </g>

      <g>
        {depth.map((width, index) => (
          <rect
            key={width + index}
            x={720 - width}
            y={156 + index * 38}
            width={width}
            height="14"
            fill="#3f3f3f"
          />
        ))}
      </g>

      <g stroke="#565656" strokeWidth="1">
        <rect x="610" y="128" width="110" height="38" />
        <line x1="610" y1="147" x2="720" y2="147" />
      </g>

      <g fill="#7a7a7a" fontFamily="monospace" fontSize="9" letterSpacing="3">
        <text x="96" y="98">MARKET / PAPER</text>
        <text x="610" y="466">ORDER BOOK</text>
        <text x="96" y="540">SIMULATED EXECUTION · NO REAL ORDERS</text>
      </g>
    </svg>
  );
}

function JobFitArt({ slug }: { slug: string }) {
  const resumeLines = Array.from({ length: 9 }, (_, index) => ({
    y: 178 + index * 26,
    width: index % 3 === 0 ? 150 : 190,
  }));
  const roleLines = Array.from({ length: 9 }, (_, index) => ({
    y: 178 + index * 26,
    width: index % 4 === 0 ? 140 : 180,
  }));

  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className="project-art h-full w-full"
      role="presentation"
    >
      <defs>
        <linearGradient id={`${slug}-link`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f4f4f4" stopOpacity="0.12" />
          <stop offset="0.5" stopColor="#f4f4f4" stopOpacity="0.7" />
          <stop offset="1" stopColor="#f4f4f4" stopOpacity="0.12" />
        </linearGradient>
        <radialGradient id={`${slug}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="800" height="600" fill="#101010" />
      <circle cx="400" cy="290" r="220" fill={`url(#${slug}-glow)`} />

      <g stroke="#3d3d3d" strokeWidth="1">
        <rect x="92" y="122" width="220" height="340" />
        <rect x="488" y="122" width="220" height="340" />
      </g>

      <g stroke="#5c5c5c" strokeWidth="1">
        {resumeLines.map((line) => (
          <line
            key={line.y}
            x1="116"
            y1={line.y}
            x2={116 + line.width}
            y2={line.y}
          />
        ))}
        {roleLines.map((line) => (
          <line
            key={line.y}
            x1="512"
            y1={line.y}
            x2={512 + line.width}
            y2={line.y}
          />
        ))}
        <line x1="116" y1="152" x2="200" y2="152" stroke="#c4c4c4" />
        <line x1="512" y1="152" x2="596" y2="152" stroke="#c4c4c4" />
      </g>

      <g stroke={`url(#${slug}-link)`} strokeWidth="1">
        <path d="M 312 204 C 360 204 440 204 488 204" />
        <path d="M 312 256 C 372 256 428 282 488 282" />
        <path
          d="M 312 308 C 372 308 428 334 488 334"
          strokeDasharray="3 5"
        />
        <path d="M 312 386 C 372 386 428 386 488 386" />
      </g>

      <g>
        <circle cx="400" cy="300" r="54" stroke="#3f3f3f" strokeWidth="1" />
        <path
          d="M 400 246 A 54 54 0 0 1 451 327"
          stroke="#f4f4f4"
          strokeWidth="1.5"
          opacity="0.85"
        />
        <path
          d="M 451 327 A 54 54 0 0 1 363 339"
          stroke="#9a9a9a"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <path
          d="M 363 339 A 54 54 0 0 1 400 246"
          stroke="#5a5a5a"
          strokeWidth="1.5"
        />
        <circle cx="400" cy="300" r="3" fill="#f4f4f4" />
      </g>

      <g fill="#7a7a7a" fontFamily="monospace" fontSize="9" letterSpacing="3">
        <text x="116" y="100">RESUME</text>
        <text x="512" y="100">ROLE</text>
        <text x="378" y="382">MATCH</text>
        <text x="92" y="500">SEMANTIC + SKILLS + READINESS</text>
      </g>
    </svg>
  );
}

function MarginPilotArt({ slug }: { slug: string }) {
  const bars = [44, 86, 62, 128, 96, 150, 74, 116, 58];
  const points = bars
    .map((height, index) => `${188 + index * 54},${414 - height * 0.72}`)
    .join(" ");

  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className="project-art h-full w-full"
      role="presentation"
    >
      <defs>
        <linearGradient id={`${slug}-line`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f4f4f4" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#f4f4f4" stopOpacity="0.95" />
          <stop offset="1" stopColor="#f4f4f4" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id={`${slug}-bar`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4f4f4" stopOpacity="0.45" />
          <stop offset="1" stopColor="#f4f4f4" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      <rect width="800" height="600" fill="#101010" />

      <g stroke="#2f2f2f" strokeWidth="1">
        <line x1="80" y1="130" x2="720" y2="130" />
        <line x1="80" y1="220" x2="720" y2="220" />
        <line x1="80" y1="310" x2="720" y2="310" />
        <line x1="80" y1="400" x2="720" y2="400" />
        <line x1="80" y1="490" x2="720" y2="490" />
      </g>

      <g>
        {bars.map((height, index) => {
          const x = 168 + index * 54;
          return (
            <g key={x}>
              <rect
                x={x}
                y={490 - height}
                width="20"
                height={height}
                stroke="#4c4c4c"
                strokeWidth="1"
                fill={`url(#${slug}-bar)`}
              />
              <rect
                x={x + 26}
                y={490 - height * 0.62}
                width="6"
                height={height * 0.62}
                fill="#404040"
              />
            </g>
          );
        })}
      </g>

      <polyline
        points={points}
        stroke={`url(#${slug}-line)`}
        strokeWidth="1.5"
      />
      <line
        x1="80"
        y1="490"
        x2="720"
        y2="490"
        stroke="#6e6e6e"
        strokeWidth="1"
      />

      <g stroke="#6a6a6a" strokeWidth="1">
        <rect x="566" y="110" width="154" height="104" />
        <line x1="566" y1="158" x2="720" y2="158" />
        <circle cx="592" cy="135" r="5" stroke="#b8b8b8" />
        <line x1="606" y1="135" x2="688" y2="135" />
        <line x1="586" y1="182" x2="646" y2="182" />
        <line x1="586" y1="198" x2="700" y2="198" />
      </g>

      <line
        x1="122"
        y1="526"
        x2="720"
        y2="526"
        stroke="#333333"
        strokeWidth="1"
      />
      <g fill="#7a7a7a" fontFamily="monospace" fontSize="9" letterSpacing="3">
        <text x="180" y="100">LEDGER / RECONCILE</text>
        <text x="548" y="100">MARGIN</text>
        <text x="180" y="505">FINANCIAL INTELLIGENCE</text>
      </g>
    </svg>
  );
}

export function ProjectVisual({
  project,
  className,
  sizes = "card",
}: {
  project: Project;
  className?: string;
  sizes?: "card" | "detail";
}) {
  const art =
    project.slug === "rag-doc-qa" ? (
      <RagArt slug={project.slug} />
    ) : project.slug === "nexustrade-pro" ? (
      <TradingArt slug={project.slug} />
    ) : project.slug === "jobfit-ai" ? (
      <JobFitArt slug={project.slug} />
    ) : (
      <MarginPilotArt slug={project.slug} />
    );

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-[#101010]",
        className,
      )}
      aria-hidden="true"
    >
      {art}
      <div className="project-sheen" aria-hidden="true" />
      <span className="pointer-events-none absolute bottom-5 left-5 font-display text-[clamp(3.2rem,7vw,6.5rem)] font-medium leading-none tracking-[-0.06em] text-chalk/[0.22]">
        {project.index}
      </span>
      {sizes === "detail" ? (
        <span className="mono-micro pointer-events-none absolute right-5 top-5 text-ash">
          Case study / {project.index}
        </span>
      ) : null}
    </div>
  );
}
