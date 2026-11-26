import { ArrowUpRight, GitBranch } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectPreview } from "@/components/projects/ProjectPreview";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  aspectClass: string;
  className?: string;
};

export function ProjectCard({
  project,
  aspectClass,
  className,
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
            <span className="text-chalk">PROJECT {project.index}</span>
            {project.walkthrough ? (
              <span className="hidden sm:inline">
                {" "}
                / Video · {project.walkthrough.duration}
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
        <h3 className="project-title text-[clamp(1.75rem,2.8vw,2.75rem)] font-medium uppercase leading-none text-chalk">
          {project.title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ash">
          {project.shortDescription}
        </p>

        {hasLive || hasSource ? (
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-hairline pt-4">
            {hasLive ? (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} — ${project.links.liveLabel ?? "Open app"}`}
                className="group/demo inline-flex min-h-11 items-center gap-2 border border-hairline px-4 font-mono text-[9px] uppercase tracking-[0.14em] text-chalk transition-colors hover:border-dust"
              >
                {project.links.liveLabel ?? "Open app"}
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
                className="group/repo inline-flex min-h-11 items-center gap-2 px-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ash transition-colors hover:text-chalk"
              >
                <GitBranch
                  aria-hidden="true"
                  className="size-3"
                  strokeWidth={1.5}
                />
                View code
              </a>
            ) : null}
          </div>
        ) : null}

        {disclosure ? (
          <p className="mt-3 max-w-xl text-xs leading-relaxed text-ash">
            {disclosure}
          </p>
        ) : null}
      </div>
    </div>
  );
}
