import { Suspense } from "react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  BarOfTheDay,
  BarOfTheDayFallback,
} from "@/components/sections/BarOfTheDay";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="hero-grid pointer-events-none absolute inset-0 hidden lg:block"
      />

      <div className="container-edge relative flex min-h-[60svh] flex-col pb-10 pt-24 sm:pt-28 lg:pb-12 lg:pt-32">
        <div className="flex flex-1 flex-col justify-center py-8 lg:py-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-end lg:gap-x-10">
            <div className="min-w-0">
              <h1 id="hero-title" className="hero-title">
                <span className="hero-line">
                  <span>UNRELEASED.</span>
                </span>
              </h1>

              <div className="mt-10 flex max-w-[52rem] flex-col gap-8 xl:flex-row xl:flex-wrap xl:items-center xl:gap-x-12">
                <div
                  className="hero-fade flex items-center gap-4 sm:gap-5"
                  style={{ animationDelay: "560ms" }}
                >
                  <Image
                    src="/images/anshu-avatar.webp"
                    alt={`Portrait of ${profile.name}`}
                    width={160}
                    height={160}
                    sizes="(min-width: 640px) 84px, 68px"
                    priority
                    className="size-[68px] shrink-0 rounded-full border border-white/15 object-cover sm:size-[84px]"
                  />
                  <div>
                    <p className="mono-micro text-ash">{profile.name}</p>
                    <p className="mt-1 max-w-[36ch] text-base leading-relaxed text-ash md:text-lg">
                      Applied AI. Software. Products.
                    </p>
                  </div>
                </div>

                <div
                  className="hero-fade flex flex-wrap gap-3"
                  style={{ animationDelay: "680ms" }}
                >
                  <ButtonLink href="/#work" variant="solid">
                    Explore work
                  </ButtonLink>
                  <ButtonLink href="/#contact" variant="outline">
                    Contact
                  </ButtonLink>
                </div>
              </div>
            </div>

            <Suspense fallback={<BarOfTheDayFallback />}>
              <BarOfTheDay />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}