import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "quiet";
  className?: string;
  external?: boolean;
  showIcon?: boolean;
};

const variants = {
  solid: "bg-chalk text-ink hover:bg-white",
  outline:
    "border border-hairline text-chalk hover:border-dust hover:bg-white/[0.03]",
  quiet: "text-ash hover:text-chalk px-0",
};

export function ButtonLink({
  href,
  children,
  variant = "outline",
  className,
  external = false,
  showIcon = true,
}: ButtonLinkProps) {
  const classes = cn(
    "group/button inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-300",
    variants[variant],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {showIcon ? (
        <ArrowUpRight
          aria-hidden="true"
          className="size-3.5 transition-transform duration-500 ease-editorial group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5"
          strokeWidth={1.5}
        />
      ) : null}
    </>
  );

  const isExternal =
    external || href.startsWith("http") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel={href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
