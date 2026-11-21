import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { education } from "@/data/education";
import { experience } from "@/data/experience";

const professionalExperience = experience.filter(
  (entry) => entry.type === "Internship",
);

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="section-pad border-t border-hairline"
    >
      <div className="container-edge">
        <SectionHeading title="Experience." titleId="experience-title" />

        <ol className="mt-14 border-t border-hairline">
            {professionalExperience.map((entry, index) => (
              <li
                key={`${entry.organisation}-${entry.role}`}
                className="grid gap-4 border-b border-hairline py-9 md:grid-cols-[7.5rem_1fr] md:gap-8"
              >
                <div>
                  <p className="mono-label text-ash">{entry.period}</p>
                  <p className="mono-micro mt-2 text-ash">{entry.type}</p>
                </div>

                <Reveal delay={index * 0.04}>
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <h3 className="font-display text-[clamp(1.35rem,2.2vw,1.9rem)] font-medium leading-tight tracking-[-0.025em] text-chalk">
                        {entry.role}
                      </h3>
                      <span className="mono-micro text-ash">
                        {entry.organisation}
                      </span>
                    </div>

                    <ul className="mt-4 grid max-w-3xl gap-2 sm:grid-cols-2">
                      {entry.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 text-xs leading-relaxed text-ash"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-px w-3 shrink-0 bg-dust"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>

                    {entry.link ? (
                      entry.link.href.startsWith("/") ? (
                        <Link
                          href={entry.link.href}
                          className="group mt-5 inline-flex min-h-10 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ash transition-colors hover:text-chalk"
                        >
                          {entry.link.label}
                          <span
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover:translate-x-0.5"
                          >
                            →
                          </span>
                        </Link>
                      ) : (
                        <a
                          href={entry.link.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="group mt-5 inline-flex min-h-10 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ash transition-colors hover:text-chalk"
                        >
                          {entry.link.label}
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            strokeWidth={1.5}
                          />
                        </a>
                      )
                    ) : null}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

        {education.length > 0 ? (
          <div className="mt-10 grid gap-6 border-t border-hairline pt-8 lg:grid-cols-12">
            <h3 className="mono-label text-ash lg:col-span-3">Education</h3>
            <ul className="space-y-4 lg:col-span-9">
              {education.map((item) => (
                <li
                  key={`${item.institution}-${item.period}`}
                  className="grid gap-2 border-t border-hairline pt-4 first:border-t-0 first:pt-0 sm:grid-cols-[1fr_auto] sm:gap-6"
                >
                  <div>
                    <p className="text-sm text-chalk">
                      {item.degree} · {item.specialization}
                    </p>
                    <p className="mt-1 text-xs text-ash">
                      {item.institution} · {item.location}
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <p className="mono-micro text-ash">{item.period}</p>
                    <p className="mono-micro mt-1.5 text-ash">
                      {item.status}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
