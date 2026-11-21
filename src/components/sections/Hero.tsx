import { ChromeStage } from "@/components/three/ChromeStage";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden border-b border-hairline"
    >
      <div
        aria-hidden="true"
        className="hero-grid pointer-events-none absolute inset-0 hidden lg:block"
      />

      <div className="container-edge relative flex min-h-svh flex-col pb-8 pt-24 sm:pt-28 lg:pt-32">
        <div className="grid flex-1 items-center gap-y-10 py-10 lg:grid-cols-12 lg:gap-x-8 lg:py-8">
          <div className="lg:col-span-8">
            <h1 id="hero-title" className="hero-title">
              <span className="hero-line">
                <span>ENGINEERING</span>
              </span>
              <span className="hero-line">
                <span style={{ animationDelay: "90ms" }}>WHAT’S</span>
              </span>
              <span className="hero-line">
                <span style={{ animationDelay: "180ms" }}>NEXT.</span>
              </span>
            </h1>

            <div className="mt-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
              <p
                className="hero-fade max-w-[36ch] text-base leading-relaxed text-ash md:text-lg"
                style={{ animationDelay: "560ms" }}
              >
                Applied AI. Software. Products.
              </p>

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

          <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:col-span-4 lg:max-w-none lg:border-l lg:border-hairline lg:pl-6 xl:pl-10">
            <ChromeStage />
          </div>
        </div>
      </div>
    </section>
  );
}
