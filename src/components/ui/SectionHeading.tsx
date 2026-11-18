import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: ReactNode;
  description?: string;
  className?: string;
  align?: "grid" | "stacked";
  titleId?: string;
};

export function SectionHeading({
  index,
  label,
  title,
  description,
  className,
  align = "grid",
  titleId,
}: SectionHeadingProps) {
  if (align === "stacked") {
    return (
      <header className={cn("border-t border-hairline pt-6", className)}>
        <div className="flex items-center gap-4 text-ash">
          <span className="mono-label">{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-hairline" />
          <span className="mono-label">{label}</span>
        </div>
        <h2 id={titleId} className="section-title mt-8 max-w-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-ash">
            {description}
          </p>
        ) : null}
      </header>
    );
  }

  return (
    <header
      className={cn(
        "grid gap-8 border-t border-hairline pt-6 lg:grid-cols-12 lg:gap-10",
        className,
      )}
    >
      <div className="flex items-center gap-4 text-ash lg:col-span-3">
        <span className="mono-label">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-hairline" />
        <span className="mono-label">{label}</span>
      </div>
      <div className="lg:col-span-9">
        <h2 id={titleId} className="section-title">
          {title}
        </h2>
        {description ? (
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-ash">
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}
