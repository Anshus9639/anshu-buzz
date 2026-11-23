import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navItems } from "@/lib/navigation";
import { profile } from "@/data/profile";
import { Availability } from "@/components/ui/Availability";

export function Footer() {
  const year = 2026;

  return (
    <footer className="site-footer border-t border-hairline">
      <div className="container-edge">
        <div className="grid gap-10 py-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Availability />
          </div>

          <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
            <h2 className="mono-micro text-ash">Index</h2>
            <ul className="mt-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline inline-flex min-h-8 items-center font-mono text-[10px] uppercase tracking-[0.14em] text-ash transition-colors hover:text-chalk"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="mono-micro text-ash">Elsewhere</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={profile.links.github.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex min-h-8 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ash transition-colors hover:text-chalk"
                >
                  GitHub
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.5}
                  />
                </a>
              </li>
              <li>
                <a
                  href={profile.links.linkedin.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex min-h-8 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ash transition-colors hover:text-chalk"
                >
                  LinkedIn
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.5}
                  />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="link-underline inline-flex min-h-8 items-center font-mono text-[10px] uppercase tracking-[0.14em] text-ash transition-colors hover:text-chalk"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href={profile.links.resume.href}
                  download
                  className="inline-flex min-h-8 items-center font-mono text-[10px] uppercase tracking-[0.14em] text-ash transition-colors hover:text-chalk"
                >
                  Resume / PDF
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="overflow-hidden border-t border-hairline pt-7">
          <p
            aria-hidden="true"
            className="select-none whitespace-nowrap font-display text-[clamp(4.75rem,19.4vw,19rem)] font-medium leading-[0.72] tracking-[-0.065em] text-chalk"
          >
            {profile.brand}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-hairline py-6">
          <p className="mono-micro text-ash">
            © {year} {profile.brand}. All rights reserved.
          </p>
          <a
            href="#top"
            className="mono-micro inline-flex min-h-8 items-center text-ash transition-colors hover:text-chalk"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
