import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { ContributionActivity } from "@/components/sections/ContributionActivity";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="section-pad border-t border-hairline"
    >
      <div className="container-edge">
        <SectionHeading title="About." titleId="about-title" />

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="max-w-3xl font-display text-[clamp(1.65rem,3.3vw,2.9rem)] font-normal leading-[1.15] tracking-[-0.03em] text-chalk">
                I’m Anshu, an IT graduate specializing in AI &amp; Robotics. I
                build practical AI systems and software products.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.1}>
              <div className="border border-hairline bg-raised/60 p-6">
                <dl className="space-y-5">
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
          </div>
        </div>

        <ContributionActivity />
      </div>
    </section>
  );
}
