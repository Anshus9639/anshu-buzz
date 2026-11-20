import { ArrowUpRight, GitBranch } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProductWalkthrough({ project }: { project: Project }) {
  const walkthrough = project.walkthrough;
  if (!walkthrough) return null;

  return (
    <section
      id="walkthrough"
      aria-labelledby="walkthrough-title"
      className="scroll-mt-24"
    >
      <figure className="border border-hairline bg-card/40">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-hairline px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="status-dot" data-tone="live" aria-hidden="true" />
            <h2 id="walkthrough-title" className="mono-label text-chalk">
              {walkthrough.label}
            </h2>
          </div>
          <span className="mono-micro text-ash">
            Paper trading · {walkthrough.duration}
          </span>
        </div>

        <div className="bg-ink">
          <video
            className="aspect-video h-auto w-full bg-ink object-contain"
            controls
            playsInline
            preload="none"
            poster={walkthrough.poster}
            width={1916}
            height={1080}
            aria-label={`${walkthrough.label}: ${walkthrough.title}`}
          >
            <source src={walkthrough.video} type="video/mp4" />
            Your browser cannot play this video.{" "}
            <a href={walkthrough.video} className="underline">
              Download the walkthrough
            </a>
            .
          </video>
        </div>

        <figcaption className="grid gap-5 border-t border-hairline px-4 py-5 sm:px-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="font-display text-lg font-medium tracking-[-0.02em] text-chalk">
              {walkthrough.title}
            </p>
            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-ash">
              {walkthrough.note}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {project.links.live ? (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex min-h-8 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ash transition-colors hover:text-chalk"
              >
                {project.links.liveLabel ?? "Open live application"}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </a>
            ) : null}
            {project.links.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex min-h-8 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ash transition-colors hover:text-chalk"
              >
                <GitBranch
                  aria-hidden="true"
                  className="size-3"
                  strokeWidth={1.5}
                />
                {project.links.sourceLabel ?? "View source code"}
              </a>
            ) : null}
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
