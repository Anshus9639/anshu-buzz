import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, GitBranch, Radio } from "lucide-react";
import type {
  Project,
  ProjectDiagram,
  ProjectEvaluation,
  ProjectMilestone,
} from "@/data/projects";
import { getNextProject } from "@/data/projects";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

type DetailSectionConfig = {
  id: string;
  label: string;
  index: string;
};

function DetailSection({
  id,
  index,
  label,
  children,
  className,
}: {
  id: string;
  index: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        "border-t border-hairline py-10 first:border-t-0 first:pt-0",
        className,
      )}
    >
      <div className="flex items-center gap-4 text-ash">
        <span className="mono-micro text-ash">{index}</span>
        <h2 id={`${id}-title`} className="mono-label">
          {label}
        </h2>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function ArchitectureDiagram({ diagram }: { diagram: ProjectDiagram }) {
  return (
    <figure className="mb-8 border border-hairline bg-card/50 p-4 sm:p-6">
      <figcaption className="mono-micro text-ash">{diagram.title}</figcaption>
      <div className="mt-6 space-y-5">
        {diagram.rows.map((row) => (
          <div
            key={row.label}
            className="grid gap-3 md:grid-cols-[6.5rem_1fr] md:gap-6"
          >
            <span className="mono-micro pt-1.5 text-ash">{row.label}</span>
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
              {row.steps.map((step, index) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="border border-hairline px-2.5 py-1.5 font-mono text-[9px] uppercase leading-tight tracking-[0.1em] text-chalk/85">
                    {step}
                  </span>
                  {index < row.steps.length - 1 ? (
                    <span aria-hidden="true" className="text-[10px] text-ash">
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <p className="mt-6 border-t border-hairline pt-4 text-xs leading-relaxed text-ash">
        {diagram.caption}
      </p>
    </figure>
  );
}

function EvaluationBlock({ evaluation }: { evaluation: ProjectEvaluation }) {
  return (
    <div>
      <p className="max-w-2xl text-sm leading-relaxed text-ash">
        {evaluation.intro}
      </p>
      <dl className="mt-6 grid grid-cols-2 gap-px border border-hairline bg-hairline sm:grid-cols-4">
        {evaluation.metrics.map((metric) => (
          <div key={metric.label} className="bg-ink p-4">
            <dt className="mono-micro text-ash">{metric.label}</dt>
            <dd className="mt-2 font-display text-xl font-medium tracking-[-0.03em] text-chalk">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>
      <ul className="mt-6 space-y-3">
        {evaluation.notes.map((note) => (
          <li
            key={note}
            className="flex gap-3 border-t border-hairline pt-3 text-sm leading-relaxed text-ash"
          >
            <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 bg-chalk" />
            {note}
          </li>
        ))}
      </ul>
      {evaluation.caveat ? (
        <p className="mt-6 border border-hairline p-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-ash">
          <span className="text-chalk">Caveat / </span>
          {evaluation.caveat}
        </p>
      ) : null}
    </div>
  );
}

const milestoneLabels: Record<ProjectMilestone["state"], string> = {
  implemented: "Implemented",
  "in-development": "In development",
  planned: "Planned",
};

function MilestonesBlock({ milestones }: { milestones: ProjectMilestone[] }) {
  return (
    <ol className="border-t border-hairline">
      {milestones.map((milestone) => (
        <li
          key={milestone.label}
          className="grid gap-3 border-b border-hairline py-5 md:grid-cols-[11rem_9rem_1fr] md:gap-6"
        >
          <span className="text-sm font-medium text-chalk">
            {milestone.label}
          </span>
          <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-ash">
            <span
              className={cn(
                "size-1.5 rounded-full border",
                milestone.state === "implemented"
                  ? "border-chalk bg-chalk"
                  : milestone.state === "in-development"
                    ? "border-ash"
                    : "border-ash/50",
              )}
              aria-hidden="true"
            />
            {milestoneLabels[milestone.state]}
          </span>
          <span className="max-w-xl text-sm leading-relaxed text-ash">
            {milestone.detail}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function ProjectDetail({ project }: { project: Project }) {
  const nextProject = getNextProject(project.slug);

  const rawSections: DetailSectionConfig[] = [
    { id: "overview", label: "Overview", index: "" },
    { id: "problem", label: "Problem", index: "" },
    { id: "architecture", label: "Architecture", index: "" },
    { id: "features", label: "Features", index: "" },
    ...(project.evaluation
      ? [
          {
            id: "evaluation",
            label: project.evaluation.title ?? "Evaluation",
            index: "",
          },
        ]
      : []),
    ...(project.milestones
      ? [{ id: "status", label: "Status matrix", index: "" }]
      : []),
    ...(project.deployment
      ? [{ id: "deployment", label: "Deployment plan", index: "" }]
      : []),
    { id: "challenges", label: "Technical challenges", index: "" },
    { id: "contribution", label: "My contribution", index: "" },
    ...(project.screenshots.length > 0
      ? [{ id: "screenshots", label: "Screenshots", index: "" }]
      : []),
  ];

  const sections = rawSections.map((section, index) => ({
    ...section,
    index: String(index + 1).padStart(2, "0"),
  }));

  const sectionIndex = (id: string) =>
    sections.find((section) => section.id === id)?.index ?? "00";

  const hasLinks = Boolean(
    project.links.github || project.links.live || project.links.demoPending,
  );

  return (
    <article>
      <header className="border-b border-hairline">
        <div className="container-edge pb-12 pt-28 sm:pt-32 lg:pb-16 lg:pt-40">
          <nav
            aria-label="Breadcrumb"
            className="mono-micro flex items-center gap-3 text-ash"
          >
            <Link
              href="/#work"
              className="inline-flex min-h-8 items-center gap-2 transition-colors hover:text-chalk"
            >
              <ArrowLeft aria-hidden="true" className="size-3" strokeWidth={1.5} />
              Work
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ash">
              {project.title}
            </span>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="mono-label text-ash">Case {project.index}</span>
                <span aria-hidden="true" className="h-px w-6 bg-hairline" />
                <span className="mono-label text-ash">{project.category}</span>
                <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ash">
                  <span
                    className="status-dot"
                    data-tone={project.demo.tone}
                    aria-hidden="true"
                  />
                  {project.demo.label}
                </span>
              </div>

              <h1 className="project-title mt-7 max-w-4xl text-[clamp(3.6rem,9vw,8.4rem)] font-medium uppercase leading-[0.84] tracking-[-0.055em]">
                {project.title}
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-relaxed text-ash md:text-lg">
                {project.shortDescription}
              </p>

              {hasLinks ? (
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {project.links.github ? (
                    <ButtonLink
                      href={project.links.github}
                      external
                      variant="solid"
                    >
                      Repository
                    </ButtonLink>
                  ) : null}
                  {project.links.live ? (
                    <ButtonLink
                      href={project.links.live}
                      external
                      variant="outline"
                    >
                      {project.links.liveLabel ?? "Live demo"}
                    </ButtonLink>
                  ) : null}
                  {project.links.demoPending ? (
                    <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline px-5 font-mono text-[10px] uppercase tracking-[0.16em] text-ash">
                      <Radio
                        aria-hidden="true"
                        className="size-3.5"
                        strokeWidth={1.5}
                      />
                      Demo pending
                    </span>
                  ) : null}
                </div>
              ) : null}

              {project.links.liveNote ? (
                <p className="mt-4 max-w-2xl font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-ash">
                  {project.links.liveNote}
                </p>
              ) : null}
            </div>

            <aside className="lg:col-span-4 lg:pl-8">
              <dl className="border-t border-hairline">
                <div className="grid grid-cols-[6rem_1fr] gap-4 border-b border-hairline py-4">
                  <dt className="mono-micro text-ash">Role</dt>
                  <dd className="text-xs leading-relaxed text-chalk">
                    {project.role}
                  </dd>
                </div>
                <div className="grid grid-cols-[6rem_1fr] gap-4 border-b border-hairline py-4">
                  <dt className="mono-micro text-ash">Completion</dt>
                  <dd>
                    <span className="text-xs text-chalk">
                      {project.completion.label}
                    </span>
                    <p className="mt-2 text-xs leading-relaxed text-ash">
                      {project.completion.detail}
                    </p>
                  </dd>
                </div>
                <div className="grid grid-cols-[6rem_1fr] gap-4 border-b border-hairline py-4">
                  <dt className="mono-micro text-ash">Demo</dt>
                  <dd>
                    <span className="flex items-center gap-2 text-xs text-chalk">
                      <span
                        className="status-dot"
                        data-tone={project.demo.tone}
                        aria-hidden="true"
                      />
                      {project.demo.label}
                    </span>
                    <p className="mt-2 text-xs leading-relaxed text-ash">
                      {project.demo.detail}
                    </p>
                  </dd>
                </div>
                <div className="grid grid-cols-[6rem_1fr] gap-4 border-b border-hairline py-4">
                  <dt className="mono-micro text-ash">Timeline</dt>
                  <dd className="text-xs text-chalk">{project.timeline}</dd>
                </div>
                <div className="grid grid-cols-[6rem_1fr] gap-4 border-b border-hairline py-4">
                  <dt className="mono-micro text-ash">Stack</dt>
                  <dd className="flex flex-wrap gap-x-2 gap-y-1">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="font-mono text-[9px] uppercase tracking-[0.1em] text-ash"
                      >
                        {technology}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="grid grid-cols-[6rem_1fr] gap-4 py-4">
                  <dt className="mono-micro text-ash">Links</dt>
                  <dd className="text-xs leading-relaxed text-ash">
                    {hasLinks || project.links.sourceNote ? (
                      <span className="flex flex-col gap-1.5">
                        {project.links.github ? (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-2 transition-colors hover:text-chalk"
                          >
                            <GitBranch
                              aria-hidden="true"
                              className="size-3"
                              strokeWidth={1.5}
                            />
                            GitHub
                          </a>
                        ) : null}
                        {project.links.live ? (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-2 transition-colors hover:text-chalk"
                          >
                            <ArrowUpRight
                              aria-hidden="true"
                              className="size-3"
                              strokeWidth={1.5}
                            />
                            {project.links.liveLabel ?? "Live demo"}
                          </a>
                        ) : null}
                        {project.links.demoPending ? (
                          <span>Public demo pending</span>
                        ) : null}
                        {project.links.sourceNote ? (
                          <span>{project.links.sourceNote}</span>
                        ) : null}
                      </span>
                    ) : (
                      "No public link published"
                    )}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </header>

      <div className="container-edge py-8 lg:py-12">
        <div className="aspect-[4/3] border border-hairline sm:aspect-[16/9]">
          <ProjectVisual project={project} sizes="detail" />
        </div>
        <p className="mono-micro mt-3 text-ash">
          {project.screenshots.length > 0
            ? "Interface / project imagery"
            : "Project study — visual direction"}
        </p>
      </div>

      <div className="container-edge">
        <div className="grid gap-12 border-t border-hairline py-12 lg:grid-cols-12 lg:gap-8 lg:py-16">
          <aside className="lg:col-span-3">
            <nav
              aria-label="Case study sections"
              className="lg:sticky lg:top-28"
            >
              <p className="mono-micro text-ash">On this page</p>
              <ol className="mt-4 space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="group inline-flex min-h-8 items-center gap-3 font-mono text-[9px] uppercase tracking-[0.14em] text-ash transition-colors hover:text-chalk"
                    >
                      <span className="text-ash">{section.index}</span>
                      <span className="link-underline">{section.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="lg:col-span-8 lg:col-start-5">
            <DetailSection
              id="overview"
              index={sectionIndex("overview")}
              label="Overview"
            >
              <Reveal>
                <p className="max-w-2xl text-lg leading-relaxed text-chalk md:text-xl">
                  {project.shortDescription}
                </p>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ash">
                  {project.fullDescription}
                </p>
                <ol className="mt-8 space-y-4 border-t border-hairline pt-6">
                  {project.approach.map((step, index) => (
                    <li
                      key={step}
                      className="grid grid-cols-[2rem_1fr] gap-4 text-sm leading-relaxed text-ash"
                    >
                      <span className="mono-micro text-ash">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </Reveal>
            </DetailSection>

            <DetailSection
              id="problem"
              index={sectionIndex("problem")}
              label="Problem"
            >
              <Reveal>
                <p className="max-w-2xl font-display text-[clamp(1.3rem,2.4vw,1.9rem)] leading-[1.35] tracking-[-0.02em] text-chalk">
                  {project.problem}
                </p>
              </Reveal>
            </DetailSection>

            <DetailSection
              id="architecture"
              index={sectionIndex("architecture")}
              label="Architecture"
            >
              {project.diagram ? (
                <Reveal>
                  <ArchitectureDiagram diagram={project.diagram} />
                </Reveal>
              ) : null}
              <ol className="border-t border-hairline">
                {project.architecture.map((layer, index) => (
                  <li
                    key={layer.title}
                    className="grid gap-3 border-b border-hairline py-6 md:grid-cols-[7rem_1fr] md:gap-8"
                  >
                    <span className="mono-micro text-ash">
                      Layer {String(index + 1).padStart(2, "0")}
                    </span>
                    <Reveal delay={index * 0.04}>
                      <div>
                        <h3 className="font-display text-lg font-medium tracking-[-0.02em] text-chalk">
                          {layer.title}
                        </h3>
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ash">
                          {layer.detail}
                        </p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </DetailSection>

            <DetailSection
              id="features"
              index={sectionIndex("features")}
              label="Features"
            >
              <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 border-t border-hairline pt-4 text-sm leading-relaxed text-ash"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1 shrink-0 bg-chalk"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </DetailSection>

            {project.evaluation ? (
              <DetailSection
                id="evaluation"
                index={sectionIndex("evaluation")}
                label={project.evaluation.title ?? "Evaluation"}
              >
                <EvaluationBlock evaluation={project.evaluation} />
              </DetailSection>
            ) : null}

            {project.milestones ? (
              <DetailSection
                id="status"
                index={sectionIndex("status")}
                label="Status matrix"
              >
                <MilestonesBlock milestones={project.milestones} />
              </DetailSection>
            ) : null}

            {project.deployment ? (
              <DetailSection
                id="deployment"
                index={sectionIndex("deployment")}
                label="Deployment plan"
              >
                <p className="max-w-2xl text-sm leading-relaxed text-ash">
                  {project.deployment.intro}
                </p>
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  {[
                    ["Requirements", project.deployment.requirements],
                    ["Limits", project.deployment.limits],
                    ["Security", project.deployment.security],
                    ["Plan", project.deployment.plan],
                  ].map(([label, items]) => (
                    <div key={label as string}>
                      <h3 className="mono-micro text-ash">{label as string}</h3>
                      <ul className="mt-3 space-y-2.5">
                        {(items as string[]).map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-sm leading-relaxed text-ash"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2.5 size-1 shrink-0 bg-chalk"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </DetailSection>
            ) : null}

            <DetailSection
              id="challenges"
              index={sectionIndex("challenges")}
              label="Technical challenges"
            >
              <div className="border-t border-hairline">
                {project.challenges.map((challenge, index) => (
                  <Reveal key={challenge.title} delay={index * 0.04}>
                    <div className="grid gap-3 border-b border-hairline py-6 md:grid-cols-[7rem_1fr] md:gap-8">
                      <span className="mono-micro text-ash">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-sm font-medium text-chalk">
                          {challenge.title}
                        </h3>
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ash">
                          {challenge.detail}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </DetailSection>

            <DetailSection
              id="contribution"
              index={sectionIndex("contribution")}
              label="My contribution"
            >
              <Reveal>
                <p className="max-w-2xl text-sm leading-relaxed text-ash md:text-base">
                  {project.contribution}
                </p>
                <div className="mt-8 border-t border-hairline pt-6">
                  <p className="mono-micro text-ash">Stack</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <li
                        key={technology}
                        className="border border-hairline px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ash"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </DetailSection>

            {project.screenshots.length > 0 ? (
              <DetailSection
                id="screenshots"
                index={sectionIndex("screenshots")}
                label="Screenshots"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  {project.screenshots.map((screenshot) => (
                    <div
                      key={screenshot.src}
                      className="relative aspect-[16/10] overflow-hidden border border-hairline bg-card"
                    >
                      <Image
                        src={screenshot.src}
                        alt={screenshot.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </DetailSection>
            ) : null}
          </div>
        </div>
      </div>

      <Link
        href={`/projects/${nextProject.slug}`}
        className="group block border-t border-hairline"
      >
        <div className="container-edge flex flex-col gap-6 py-12 sm:flex-row sm:items-end sm:justify-between lg:py-16">
          <div>
            <span className="mono-micro text-ash">
              Next case / {nextProject.index}
            </span>
            <p className="project-title mt-4 text-[clamp(2.4rem,6vw,5rem)] font-medium uppercase leading-none tracking-[-0.045em] text-chalk transition-colors duration-300 group-hover:text-ash">
              {nextProject.title}
            </p>
          </div>
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-hairline text-chalk transition-colors duration-300 group-hover:border-chalk group-hover:bg-chalk group-hover:text-ink">
            <ArrowUpRight
              aria-hidden="true"
              className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.5}
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
