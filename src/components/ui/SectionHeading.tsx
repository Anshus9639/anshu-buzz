import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: ReactNode;
  description?: string;
  className?: string;
  titleId?: string;
};

export function SectionHeading({
  title,
  description,
  className,
  titleId,
}: SectionHeadingProps) {
  return (
    <header className={cn("border-t border-hairline pt-6", className)}>
      <h2 id={titleId} className="section-title">
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
