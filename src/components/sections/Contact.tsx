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
  const contactPaths = [
    {
      audience: "Hiring teams",
      title: "Discuss an opportunity",
      detail:
        "Entry-level applied AI, generative AI and Python development roles.",
      subject: "Opportunity — Anshu Saini",
    },
    {
      audience: "Founders",
      title: "Build something together",
      detail:
        "Collaborate on applied AI, Python backends or an early product build.",
      subject: "Founder collaboration — Anshu Saini",
    },
  ];

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

        <div className="mt-12 grid gap-10 border-t border-hairline pt-8 sm:mt-14 lg:grid-cols-12 lg:gap-8 lg:pt-10">
          <div className="lg:col-span-6">
            <p className="max-w-sm text-sm leading-relaxed text-ash">
              I’m looking for entry-level applied AI, generative AI and Python
              development opportunities, and I’m open to focused founder
              collaborations.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {contactPaths.map((path) => (
                <a
                  key={path.audience}
                  href={`mailto:${profile.email}?subject=${encodeURIComponent(path.subject)}`}
                  className="group min-h-24 border border-hairline p-4 transition-colors hover:border-dust hover:bg-white/[0.02] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-chalk"
                >
                  <span className="mono-micro text-ash">{path.audience}</span>
                  <span className="mt-2 flex min-h-11 items-center justify-between gap-3">
                    <span className="font-display text-lg font-medium leading-tight text-chalk">
                      {path.title}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-ash transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-chalk"
                      strokeWidth={1.5}
                    />
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-ash">
                    {path.detail}
                  </span>
                </a>
              ))}
            </div>

            <a
              href={profile.links.resume.href}
              download
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-chalk px-6 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-white"
            >
              <Download aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
              Download resume
            </a>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
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
