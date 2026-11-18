import Link from "next/link";
import { ArrowUpRight, Download, Printer } from "lucide-react";
import { profile } from "@/data/profile";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Availability } from "@/components/ui/Availability";

type ContactRowProps = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  download?: boolean;
};

function ContactRow({
  label,
  value,
  href,
  external,
  download,
}: ContactRowProps) {
  const content = (
    <>
      <span className="flex min-w-0 flex-col gap-1">
        <span className="mono-label text-chalk">{label}</span>
        <span className="truncate text-xs text-ash">{value}</span>
      </span>
      <ArrowUpRight
        aria-hidden="true"
        className="size-4 shrink-0 text-ash transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-chalk"
        strokeWidth={1.5}
      />
    </>
  );

  const className =
    "group flex min-h-16 items-center justify-between gap-6 border-t border-hairline py-4 transition-colors duration-300 hover:bg-white/[0.02]";

  if (external || download) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
        download={download ? "" : undefined}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section-pad defer-section border-t border-hairline"
    >
      <div className="container-edge">
        <div className="flex items-center gap-4 text-ash">
          <span className="mono-label">05</span>
          <span aria-hidden="true" className="h-px w-8 bg-hairline" />
          <span className="mono-label">Contact</span>
        </div>

        <div className="mt-8 flex items-start justify-between gap-8">
          <h2 id="contact-title" className="contact-title max-w-6xl">
            Let’s build
            <br />
            something
            <br />
            meaningful.
          </h2>
          <span className="mono-micro mt-2 hidden shrink-0 text-ash md:block">
            05 / 05
          </span>
        </div>

        <div className="mt-16 grid gap-12 border-t border-hairline pt-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="max-w-sm text-sm leading-relaxed text-ash">
              I’m looking for entry-level applied AI, generative AI and Python
              development opportunities. If you’re building something
              ambitious, I’d like to hear about it.
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ash">
              No contact form. Direct is better.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={profile.links.resume.href}
                download
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-chalk px-6 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-white"
              >
                <Download aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
                Download resume
              </a>
              <Link
                href={profile.links.resumePage.href}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-hairline px-6 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-chalk transition-colors duration-300 hover:border-dust hover:bg-white/[0.03]"
              >
                <Printer aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
                Print view
              </Link>
            </div>

            <Availability className="mt-8" />
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <CopyEmail />

            <div className="mt-10">
              <ContactRow
                label="LinkedIn"
                value="Professional profile"
                href={profile.links.linkedin.href}
                external
              />
              <ContactRow
                label="GitHub"
                value={profile.links.github.handle ?? "Anshus9639"}
                href={profile.links.github.href}
                external
              />
              <ContactRow
                label="Website"
                value={profile.domain}
                href={profile.url}
                external
              />
              <ContactRow
                label="Resume"
                value="PDF download"
                href={profile.links.resume.href}
                download
              />
              <ContactRow
                label="Print view"
                value="Web version, print-friendly"
                href={profile.links.resumePage.href}
              />
              <div className="flex items-center justify-between gap-6 border-t border-hairline py-4">
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="mono-label text-chalk">Email</span>
                  <span className="truncate text-xs text-ash">
                    {profile.email}
                  </span>
                </div>
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex min-h-11 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ash transition-colors hover:text-chalk"
                >
                  Write
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.5}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
