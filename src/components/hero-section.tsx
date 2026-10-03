import { TeslaGridLogo } from "@/components/tesla-grid-logo";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(72vh-3.5rem)] flex-col items-center justify-center px-4 py-16 scroll-mt-16"
      aria-labelledby="hero-heading"
    >
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="rounded-md border border-border/60 bg-muted/20 p-4">
          <TeslaGridLogo size="lg" />
        </div>

        <h1
          id="hero-heading"
          className="select-none bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text font-mono text-[clamp(4.5rem,22vw,14rem)] font-bold leading-none tracking-tighter text-transparent"
        >
          #7399
        </h1>
      </div>
    </section>
  );
};
