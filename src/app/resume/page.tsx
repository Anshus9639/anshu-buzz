import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { additionalProjects } from "@/data/additional-projects";
import { skillCategories } from "@/data/skills";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { ResumeActions } from "./ResumeActions";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume for Anshu Saini — entry-level applied AI and generative AI engineer, Python developer. RAG systems, LLM applications and backend engineering.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <div className="container-edge pb-24 pt-28 sm:pt-32 lg:pt-36">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 pb-8 no-print">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ash transition-colors hover:text-chalk"
        >
          <ArrowLeft aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
          Back to portfolio
        </Link>
        <ResumeActions />
      </div>

      <article className="resume-sheet mx-auto max-w-4xl border border-hairline bg-raised p-6 sm:p-10 lg:p-12">
        <header className="border-b border-hairline pb-8">
          <p className="mono-micro text-ash">Resume / 2026</p>
          <h1 className="mt-5 font-display text-[clamp(3.2rem,7vw,5.5rem)] font-medium uppercase leading-[0.86] tracking-[-0.055em] text-chalk">
            {profile.name}
          </h1>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ash">
            {profile.role}
          </p>
          <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ash">
            Applied AI Engineer / Python Developer / Software Builder
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ash">
            {profile.position}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ash">
            <a
              href={`mailto:${profile.email}`}
              className="transition-colors hover:text-chalk"
            >
              {profile.email}
            </a>
            <a
              href={profile.links.linkedin.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-chalk"
            >
              linkedin.com/in/anshu-saini
              <ArrowUpRight aria-hidden="true" className="size-3" strokeWidth={1.5} />
            </a>
            <a
              href={profile.links.github.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-chalk"
            >
              github.com/Anshus9639
              <ArrowUpRight aria-hidden="true" className="size-3" strokeWidth={1.5} />
            </a>
            <span>{profile.domain}</span>
            <span className="text-chalk">{profile.location}</span>
            <span className="text-chalk">{profile.availability.label}</span>
          </div>
        </header>

        <section className="border-b border-hairline py-8">
          <h2 className="mono-label text-ash">Profile</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ash">
            {profile.statement} Focused on retrieval-augmented generation, LLM
            integration, semantic search and the Python backend engineering
            that makes AI systems usable. Currently building MarginPilot and
            open to entry-level applied AI, generative AI and Python
            development roles in India or abroad.
          </p>
        </section>

        <section className="border-b border-hairline py-8">
          <h2 className="mono-label text-ash">Selected work</h2>
          <ul className="mt-5 space-y-6">
            {projects.map((project) => (
              <li key={project.slug}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-display text-lg font-medium tracking-[-0.02em] text-chalk">
                    {project.title}
                  </h3>
                  <span className="mono-micro text-ash">
                    {project.timeline} / {project.completion.label}
                  </span>
                </div>
                <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-ash">
                  {project.shortDescription}
                </p>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.1em] text-ash">
                  {project.technologies.join(" · ")}
                </p>
                {project.links.github || project.links.live ? (
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.1em] text-ash underline underline-offset-4">
                    {project.links.github ?? project.links.live}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section className="border-b border-hairline py-8">
          <h2 className="mono-label text-ash">Additional work</h2>
          <ul className="mt-5 space-y-4">
            {additionalProjects.map((project) => (
              <li key={project.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-sm font-medium text-chalk">
                    {project.title}
                  </h3>
                  <span className="mono-micro text-ash">{project.timeline}</span>
                </div>
                <p className="mt-1 max-w-3xl text-xs leading-relaxed text-ash">
                  {project.summary}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-b border-hairline py-8">
          <h2 className="mono-label text-ash">Capabilities</h2>
          <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {skillCategories.map((category) => (
              <div key={category.title}>
                <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-chalk">
                  {category.title}
                </dt>
                <dd className="mt-1.5 text-xs leading-relaxed text-ash">
                  {category.skills.join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="py-8">
          <h2 className="mono-label text-ash">Experience &amp; projects</h2>
          <ul className="mt-5 space-y-6">
            {experience.map((entry) => (
              <li key={`${entry.organisation}-${entry.role}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-display text-lg font-medium tracking-[-0.02em] text-chalk">
                    {entry.role} · {entry.organisation}
                  </h3>
                  <span className="mono-micro text-ash">
                    {entry.period} / {entry.type}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-ash">
                  {entry.summary}
                </p>
                <ul className="mt-2 space-y-1">
                  {entry.points.map((point) => (
                    <li
                      key={point}
                      className="text-xs leading-relaxed text-ash"
                    >
                      — {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          {education.length > 0 ? (
            <div className="mt-8 border-t border-hairline pt-5">
              <h3 className="mono-label text-ash">Education</h3>
              <ul className="mt-3 space-y-3">
                {education.map((item) => (
                  <li
                    key={`${item.institution}-${item.period}`}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
                  >
                    <div>
                      <p className="text-sm text-chalk">
                        {item.degree} · {item.specialization}
                      </p>
                      <p className="mt-0.5 text-xs text-ash">
                        {item.institution} · {item.location}
                      </p>
                    </div>
                    <p className="mono-micro text-ash">
                      {item.period} / {item.status}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        <footer className="border-t border-hairline pt-6">
          <p className="mono-micro text-ash">
            {profile.availability.label} — {profile.email} — {profile.domain}
          </p>
        </footer>
      </article>
    </div>
  );
}
