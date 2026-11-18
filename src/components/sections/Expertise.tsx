"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function Expertise() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <section
      id="expertise"
      aria-labelledby="expertise-title"
      className="section-pad defer-section border-t border-hairline"
    >
      <div className="container-edge">
        <SectionHeading
          index="03"
          label="Expertise"
          title="A working toolkit."
          titleId="expertise-title"
          description="Five disciplines that shape how I build — from model behaviour to the interface and the data underneath."
        />

        <div className="mt-14 border-t border-hairline">
          {skillCategories.map((category, index) => {
            const isOpen = openIndex === index;
            const panelId = `expertise-panel-${index}`;
            const buttonId = `expertise-heading-${index}`;

            return (
              <div
                key={category.title}
                className="expertise-row border-b border-hairline"
              >
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="group flex w-full items-start gap-4 py-7 text-left md:gap-8"
                >
                  <span className="mono-label mt-2 w-8 shrink-0 text-ash">
                    {category.index}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="font-display text-[clamp(1.6rem,3.1vw,2.7rem)] font-medium uppercase leading-none tracking-[-0.035em] text-chalk">
                        {category.title}
                      </span>
                      <span className="text-xs text-ash">{category.summary}</span>
                    </span>
                    <span className="mt-4 block font-mono text-[10px] leading-[1.9] tracking-[0.06em] text-ash">
                      {category.skills.join("  ·  ")}
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                      isOpen
                        ? "border-chalk text-chalk"
                        : "border-hairline text-ash group-hover:border-dust group-hover:text-chalk",
                    )}
                  >
                    <Plus
                      className={cn(
                        "size-3.5 transition-transform duration-300 ease-editorial",
                        isOpen && "rotate-45",
                      )}
                      strokeWidth={1.5}
                    />
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-500 ease-editorial",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-8 pl-0 text-sm leading-relaxed text-ash md:pl-16">
                      {category.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mono-micro mt-8 text-ash">
          Built through projects, not just tutorials.
        </p>
      </div>
    </section>
  );
}
