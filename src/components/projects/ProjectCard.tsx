import Link from "next/link";
import { ArrowUpRight, GitBranch, Radio } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  aspectClass: string;
  className?: string;
};

const cardFacts = [
  ["Problem", "problem"],
  ["Approach", "approach"],
  ["Contribution", "contribution"],
] as const;

export function ProjectCard({
  project,
  aspectClass,
  className,
}: ProjectCardProps) {
  const hasLinks = Boolean(
    project.links.github ||
      project.links.live ||
      project.links.demoPending ||
      project.links.sourceNote,
  );

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <Link
        href={`/projects/${project.slug}`}
        data-spotlight
        className="group block"
      >
        <div
          className={cn(
            "relative overflow-hidden border border-hairline bg-card",
            aspectClass,
          )}
        >
          <ProjectVisual project={project} />
          <div
            aria-hidden="true"
            className="card-spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-5">
            <span className="mono-micro text-ash">
              Case / {project.index}
            </span>
            <span className="mono-micro flex items-center gap-2 text-right text-ash">
              <span
                className="status-dot"
                data-tone={project.demo.tone}
                aria-hidden="true"
              />
              {project.demo.label}
            </span>
          </div>
          <span
            aria-hidden="true"
            className="absolute bottom-5 right-5 flex size-11 items-center justify-center rounded-full border border-[#3a3a3a] bg-ink/50 text-chalk transition-all duration-500 ease-editorial group-hover:border-chalk group-hover:bg-chalk group-hover:text-ink"
          >
            <ArrowUpRight className="size-4" strokeWidth={1.5} />
          </span>
        </div>

        <div className="mt-5">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <span className="mono-micro text-ash">
              {project.index} / {project.category} · {project.completion.label}
            </span>
            <span className="mono-micro text-ash">{project.timeline}</span>
          </div>
          <h3 className="project-title mt-3 text-[clamp(1.75rem,2.8vw,2.75rem)] font-medium uppercase leading-none text-chalk">
            {project.title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ash">
            {project.shortDescription}
          </p>

          <dl className="mt-4 space-y-2 border-t border-hairline pt-4">
            {cardFacts.map(([label, key]) => (
              <div key={key} className="grid grid-cols-[5.5rem_1fr] gap-3">
                <dt className="mono-micro text-ash">{label}</dt>
                <dd className="text-xs leading-relaxed text-ash">
                  {project.card[key]}
                </dd>
              </div>
            ))}
          </dl>

          <ul
            aria-label={`${project.title} technologies`}
            className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5"
          >
            {project.technologies.slice(0, 6).map((technology) => (
              <li
                key={technology}
                className="font-mono text-[9px] uppercase tracking-[0.12em] text-ash"
              >
                {technology}
              </li>
            ))}
          </ul>
        </div>
      </Link>

      {hasLinks ? (
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-hairline pt-3">
          {project.links.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.title} repository on GitHub`}
              className="group/repo inline-flex min-h-8 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ash transition-colors hover:text-chalk"
            >
              <GitBranch aria-hidden="true" className="size-3" strokeWidth={1.5} />
              {project.links.sourceLabel ?? "Repository"}
              <ArrowUpRight
                aria-hidden="true"
                className="size-3 transition-transform duration-300 group-hover/repo:-translate-y-0.5 group-hover/repo:translate-x-0.5"
                strokeWidth={1.5}
              />
            </a>
          ) : null}
          {project.links.live ? (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.title} ${project.links.liveLabel ?? "live demo"}`}
              className="group/demo inline-flex min-h-8 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ash transition-colors hover:text-chalk"
            >
              {project.links.liveLabel ?? "Live demo"}
              <ArrowUpRight
                aria-hidden="true"
                className="size-3 transition-transform duration-300 group-hover/demo:-translate-y-0.5 group-hover/demo:translate-x-0.5"
                strokeWidth={1.5}
              />
            </a>
          ) : null}
          {project.links.demoPending ? (
            <span className="inline-flex min-h-8 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ash">
              <Radio aria-hidden="true" className="size-3" strokeWidth={1.5} />
              Demo pending
            </span>
          ) : null}
          {project.links.liveNote ? (
            <span className="w-full font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-ash">
              {project.links.liveNote}
            </span>
          ) : null}
          {project.links.sourceNote ? (
            <span className="w-full font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-ash">
              {project.links.sourceNote}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
