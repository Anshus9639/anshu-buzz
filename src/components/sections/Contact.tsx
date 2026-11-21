import { ArrowUpRight, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { CopyEmail } from "@/components/ui/CopyEmail";

type ContactRowProps = {
  label: string;
  value: string;
  href: string;
};

function ContactRow({ label, value, href }: ContactRowProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex min-h-16 items-center justify-between gap-6 border-t border-hairline py-4 transition-colors duration-300 hover:bg-white/[0.02]"
    >
      <span className="flex min-w-0 flex-col gap-1">
        <span className="mono-label text-chalk">{label}</span>
        <span className="truncate text-xs text-ash">{value}</span>
      </span>
      <ArrowUpRight
        aria-hidden="true"
        className="size-4 shrink-0 text-ash transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-chalk"
        strokeWidth={1.5}
      />
    </a>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section-pad border-t border-hairline"
    >
      <div className="container-edge">
        <h2 id="contact-title" className="contact-title">
          Let’s talk.
        </h2>

        <div className="mt-16 grid gap-12 border-t border-hairline pt-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="max-w-sm text-sm leading-relaxed text-ash">
              I’m looking for entry-level applied AI, generative AI and Python
              development opportunities.
            </p>

            <a
              href={profile.links.resume.href}
              download
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-chalk px-6 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-white"
            >
              <Download aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
              Download resume
            </a>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <CopyEmail />

            <div className="mt-10">
              <ContactRow
                label="LinkedIn"
                value={profile.links.linkedin.handle ?? "anshu-saini"}
                href={profile.links.linkedin.href}
              />
              <ContactRow
                label="GitHub"
                value={profile.links.github.handle ?? "Anshus9639"}
                href={profile.links.github.href}
              />
              <div className="flex items-center justify-between gap-6 border-y border-hairline py-4">
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
