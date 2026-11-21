import { ArrowUpRight } from "lucide-react";
import { projectCategories, projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const filterId = (category: string) =>
  `work-filter-${category.toLowerCase().replace(/\s+/g, "-")}`;

function layoutClasses(index: number) {
  if (index === 0) return "lg:col-span-7";
  if (index === 1) return "lg:col-span-5";
  if (index === 2) return "lg:col-span-5";
  return "lg:col-span-7";
}

function aspectClasses(index: number) {
  if (index === 0) return "aspect-video";
  if (index === 1) return "aspect-[4/3] lg:aspect-[4/5]";
  if (index === 2) return "aspect-[4/3] lg:aspect-[4/5]";
  return "aspect-[4/3]";
}

export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="section-pad bg-deep"
    >
      <div className="container-edge work-shell">
        <SectionHeading
          title="Selected work."
          titleId="work-title"
          description="Things I’ve built."
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
                      className="flex min-h-9 cursor-pointer items-center rounded-full border border-hairline px-4 font-mono text-[9px] uppercase tracking-[0.14em] text-ash transition-colors duration-300 hover:border-dust hover:text-chalk peer-checked:border-chalk peer-checked:bg-chalk peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-chalk"
                    >
                      {category}
                    </label>
                  </div>
                );
              })}
            </div>
          </fieldset>
        </div>

        <div className="mt-14 grid items-start gap-x-8 gap-y-16 lg:grid-cols-12 lg:gap-y-20">
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

        <p className="mono-micro mt-16 text-ash">
          More work on{" "}
          <a
            href={profile.links.github.href}
            target="_blank"
            rel="noreferrer noopener"
            className="link-underline inline-flex items-center gap-1 text-ash transition-colors hover:text-chalk"
          >
            GitHub
            <ArrowUpRight
              aria-hidden="true"
              className="size-3"
              strokeWidth={1.5}
            />
          </a>
          .
        </p>
      </div>
    </section>
  );
}
