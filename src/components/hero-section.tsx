import { TeslaGridLogo } from "@/components/tesla-grid-logo";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(70svh-3.5rem)] scroll-mt-16 flex-col items-center justify-center px-4 py-12 sm:py-16"
      aria-labelledby="hero-heading"
    >
      <div className="flex flex-col items-center gap-6 text-center sm:gap-8">
        <div className="rounded-lg bg-[#ff0000] p-3.5 shadow-sm sm:p-4">
          <TeslaGridLogo size="lg" className="h-24 text-white sm:h-28" />
        </div>

        <h1
          id="hero-heading"
          className="inline-block max-w-full px-2 pb-0.5 text-center font-mono text-[clamp(3.5rem,min(18vw,14rem),14rem)] font-bold leading-[1.05] tracking-tight text-foreground"
        >
          #7399
        </h1>
      </div>
    </section>
  );
};
