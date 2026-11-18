import { projectCategories, projects } from "@/data/projects";
import { additionalProjects } from "@/data/additional-projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { ArrowUpRight, GitBranch } from "lucide-react";

const filterId = (category: string) =>
  `work-filter-${category.toLowerCase().replace(/\s+/g, "-")}`;

const counts = new Map(
  projectCategories.map((category) => [
    category,
    category === "All"
      ? projects.length
      : projects.filter((project) => project.category === category).length,
  ]),
);

function layoutClasses(index: number) {
  if (index === 0) return "lg:col-span-7";
  if (index === 1) return "lg:col-span-5";
  if (index === 2) return "lg:col-span-5";
  return "lg:col-span-7";
}

function aspectClasses(index: number) {
  if (index === 0) return "aspect-[4/3]";
  if (index === 1) return "aspect-[4/3] lg:aspect-[4/5]";
  if (index === 2) return "aspect-[4/3] lg:aspect-[4/5]";
  return "aspect-[4/3]";
}

export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="section-pad defer-section"
    >
      <div className="container-edge work-shell">
        <SectionHeading
          index="01"
          label="Selected work"
          title="Selected work."
          titleId="work-title"
          description="Four systems built end to end — retrieval-grounded AI, a paper-trading platform, an NLP product and a financial product in development."
        />

        <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-b border-hairline pb-5">
          <fieldset className="min-w-0 border-0 p-0">
            <legend className="sr-only">Filter projects</legend>
            <div className="flex flex-wrap gap-2">
              {projectCategories.map((category, index) => {
                const id = filterId(category);
                return (
                  <div key={category}>
                    <input
                      type="radio"
                      name="work-filter"
                      id={id}
                      defaultChecked={index === 0}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor={id}
                      className="flex min-h-9 cursor-pointer items-center gap-2 rounded-full border border-hairline px-4 font-mono text-[9px] uppercase tracking-[0.14em] text-ash transition-colors duration-300 hover:border-dust hover:text-chalk peer-checked:border-chalk peer-checked:bg-chalk peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-chalk"
                    >
                      {category}
                      <span>{String(counts.get(category)).padStart(2, "0")}</span>
                    </label>
                  </div>
                );
              })}
            </div>
          </fieldset>
          <p className="mono-micro text-ash">Selected / 2026</p>
        </div>

        <div className="mt-12 grid gap-x-6 gap-y-14 lg:grid-cols-12">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              data-category={project.category}
              data-index={index}
              className={cn(
                "project-item project-enter",
                layoutClasses(index),
              )}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <ProjectCard
                project={project}
                aspectClass={aspectClasses(index)}
              />
            </article>
          ))}
        </div>

        <div className="mt-20 border-t border-hairline pt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="mono-label text-chalk">
              Additional work / experiments
            </h3>
            <p className="mono-micro text-ash">
              {String(additionalProjects.length).padStart(2, "0")} projects
            </p>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ash">
            Smaller builds that explore a specific idea — dataset-grounded
            conversation and domain-specific classification.
          </p>

          <div className="mt-8 grid gap-x-8 gap-y-8 md:grid-cols-2">
            {additionalProjects.map((project) => (
              <article
                key={project.id}
                className="flex flex-col border-t border-hairline pt-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                  <span className="mono-micro text-ash">{project.category}</span>
                  <span className="mono-micro text-ash">{project.timeline}</span>
                </div>
                <h4 className="mt-3 font-display text-lg font-medium tracking-[-0.02em] text-chalk">
                  {project.title}
                </h4>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-ash">
                  {project.summary}
                </p>
                <p className="mt-3 max-w-md text-xs leading-relaxed text-ash">
                  {project.detail}
                </p>

                <dl className="mt-5 grid grid-cols-2 gap-px border border-hairline bg-hairline sm:grid-cols-4 md:grid-cols-2">
                  {project.highlights.map((highlight) => (
                    <div key={highlight.label} className="bg-ink p-3">
                      <dt className="mono-micro text-ash">{highlight.label}</dt>
                      <dd className="mt-1.5 font-display text-base font-medium tracking-[-0.02em] text-chalk">
                        {highlight.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
                    {project.technologies.map((technology) => (
                      <li
                        key={technology}
                        className="font-mono text-[9px] uppercase tracking-[0.12em] text-ash"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                  {project.link ? (
                    <a
                      href={project.link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex min-h-8 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ash transition-colors hover:text-chalk"
                    >
                      <GitBranch
                        aria-hidden="true"
                        className="size-3"
                        strokeWidth={1.5}
                      />
                      {project.link.label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={1.5}
                      />
                    </a>
                  ) : (
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ash">
                      No public link
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        <p className="mono-micro mt-14 text-ash">
          More work lives on{" "}
          <a
            href={profile.links.github.href}
            target="_blank"
            rel="noreferrer noopener"
            className="link-underline text-ash transition-colors hover:text-chalk"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </section>
  );
}
