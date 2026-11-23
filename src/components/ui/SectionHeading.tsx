import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: ReactNode;
  description?: string;
  className?: string;
  titleId?: string;
  level?: 1 | 2;
};

export function SectionHeading({
  title,
  description,
  className,
  titleId,
  level = 2,
}: SectionHeadingProps) {
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <header className={cn("border-t border-hairline pt-5", className)}>
      <Heading id={titleId} className="section-title">
        {title}
      </Heading>
      {description ? (
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-ash sm:mt-6">
          {description}
        </p>
      ) : null}
    </header>
  );
}
