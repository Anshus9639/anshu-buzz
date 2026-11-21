import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Expertise() {
  return (
    <section
      id="expertise"
      aria-labelledby="expertise-title"
      className="section-pad border-t border-hairline"
    >
      <div className="container-edge">
        <SectionHeading title="Expertise." titleId="expertise-title" />

        <dl className="mt-14 border-t border-hairline">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="grid gap-4 border-b border-hairline py-7 md:grid-cols-12 md:gap-8"
            >
              <dt className="font-display text-[clamp(1.4rem,2.4vw,2rem)] font-medium uppercase leading-none tracking-[-0.035em] text-chalk md:col-span-5">
                {category.title}
              </dt>
              <dd className="font-mono text-[10px] leading-[2.1] tracking-[0.06em] text-ash md:col-span-7 md:pt-1">
                {category.skills.join("  ·  ")}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
