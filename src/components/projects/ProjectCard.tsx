import Link from "next/link";
import { ArrowUpRight, GitBranch } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectPreview } from "@/components/projects/ProjectPreview";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  aspectClass: string;
  className?: string;
  projectIndex?: number;
};

export function ProjectCard({
  project,
  aspectClass,
  className,
  projectIndex = 0,
}: ProjectCardProps) {
  const hasLive = Boolean(project.links.live);
  const hasSource = Boolean(project.links.github);

  const disclosure =
    project.livePreview?.note ??
    project.preview?.note ??
    project.links.liveNote ??
    project.links.sourceNote;

  return (
    <div className={cn("project-card flex flex-col", className)}>
      <div
        className={cn(
          "preview-shell group relative border border-hairline",
          aspectClass,
        )}
      >
        <div className="preview-media absolute inset-0">
          <ProjectPreview project={project} />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-4 bg-gradient-to-b from-ink/95 via-ink/70 to-transparent p-4 pb-10 sm:p-5 sm:pb-12">
          <span className="mono-micro preview-caption block whitespace-nowrap text-ash">
            <span className="text-chalk">
              CASE {String(projectIndex + 1).padStart(2, "0")}
            </span>
            {project.walkthrough ? (
              <span className="hidden sm:inline">
                {" "}
                / Recorded walkthrough · {project.walkthrough.duration}
              </span>
            ) : null}
          </span>
          <span className="mono-micro preview-caption flex max-w-[60%] shrink-0 items-center gap-2 whitespace-nowrap text-right text-ash">
            <span
              className="status-dot shrink-0"
              data-tone={project.demo.tone}
              aria-hidden="true"
            />
            {project.demo.label}
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-1 flex-col">
        <h3 className="project-title text-[clamp(1.75rem,2.8vw,2.75rem)] font-medium uppercase leading-none">
          <Link
            href={`/projects/${project.slug}`}
            className="link-underline text-chalk transition-colors hover:text-ash"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ash">
          {project.shortDescription}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-hairline pt-4">
          <Link
            href={`/projects/${project.slug}`}
            className="group/view inline-flex min-h-10 items-center gap-2 bg-chalk px-4 font-mono text-[9px] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-white"
          >
            View project
            <ArrowUpRight
              aria-hidden="true"
              className="size-3 transition-transform duration-300 group-hover/view:-translate-y-0.5 group-hover/view:translate-x-0.5"
              strokeWidth={1.5}
            />
          </Link>

          {hasLive ? (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.title} — Open application`}
              className="group/demo inline-flex min-h-10 items-center gap-2 border border-hairline px-4 font-mono text-[9px] uppercase tracking-[0.14em] text-chalk transition-colors hover:border-dust"
            >
              Open application
              <ArrowUpRight
                aria-hidden="true"
                className="size-3 transition-transform duration-300 group-hover/demo:-translate-y-0.5 group-hover/demo:translate-x-0.5"
                strokeWidth={1.5}
              />
            </a>
          ) : null}

          {hasSource ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.title} source code on GitHub`}
              className="group/repo inline-flex min-h-10 items-center gap-2 px-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ash transition-colors hover:text-chalk"
            >
              <GitBranch
                aria-hidden="true"
                className="size-3"
                strokeWidth={1.5}
              />
              Source code
            </a>
          ) : null}
        </div>

        {disclosure ? (
          <p className="mt-3 max-w-xl text-xs leading-relaxed text-ash">
            {disclosure}
          </p>
        ) : null}
      </div>
    </div>
  );
}
