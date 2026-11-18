import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { profile } from "@/data/profile";

const principles = [
  {
    index: "01",
    title: "Clarity over ornament",
    detail:
      "Interfaces and systems should explain themselves. Complexity is handled underneath, not passed to the user.",
  },
  {
    index: "02",
    title: "Systems over demos",
    detail:
      "A convincing prototype is the start. The interesting work is making it reliable, legible and maintainable.",
  },
  {
    index: "03",
    title: "Useful over impressive",
    detail:
      "The best technology decision is the one that serves the product, not the one that looks best in a diagram.",
  },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="section-pad defer-section border-t border-hairline"
    >
      <div className="container-edge">
        <SectionHeading
          index="02"
          label="About"
          title="Intelligence, engineered."
          titleId="about-title"
          description="Applied AI, Python engineering and product work — with the context behind the projects."
        />

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="max-w-3xl font-display text-[clamp(1.65rem,3.3vw,2.9rem)] font-normal leading-[1.15] tracking-[-0.03em] text-chalk">
                I’m Anshu Saini — an AI &amp; Robotics-specialised Information
                Technology graduate building reliable AI systems and practical
                software products.
              </p>
            </Reveal>

            <div className="mt-10 grid max-w-2xl gap-6 text-sm leading-relaxed text-ash sm:grid-cols-2">
              <Reveal delay={0.05}>
                <p>
                  My focus is applied AI and generative AI: retrieval systems,
                  grounded LLM applications and the evaluation work that keeps
                  them honest.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  I work across Python, FastAPI, RAG, FAISS, Ollama,
                  PostgreSQL and React. During a software development
                  internship at Codolog, I built Python and FastAPI services,
                  Flask and React workflows and structured-data processing.
                </p>
              </Reveal>
              <Reveal delay={0.15} className="sm:col-span-2">
                <p>
                  I’m currently building MarginPilot and looking for
                  entry-level applied AI, generative AI or Python development
                  opportunities — in India or open to relocation.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <a
                href={profile.links.github.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group mt-10 inline-flex min-h-11 items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ash transition-colors hover:text-chalk"
              >
                More on GitHub
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.1}>
              <div className="border border-hairline bg-raised/60 p-6">
                <p className="mono-micro text-ash">At a glance</p>
                <dl className="mt-6 space-y-5">
                  {profile.facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="border-t border-hairline pt-4 first:border-t-0 first:pt-0"
                    >
                      <dt className="mono-micro text-ash">{fact.label}</dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-chalk">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10">
                <p className="mono-micro text-ash">Principles</p>
                <ol className="mt-4 space-y-5">
                  {principles.map((principle) => (
                    <li
                      key={principle.index}
                      className="grid grid-cols-[2rem_1fr] gap-3 border-t border-hairline pt-4"
                    >
                      <span className="mono-micro text-ash">
                        {principle.index}
                      </span>
                      <div>
                        <h3 className="text-sm font-medium text-chalk">
                          {principle.title}
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-ash">
                          {principle.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
