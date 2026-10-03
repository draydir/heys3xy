import Link from "next/link";

import { TeslaGridLogo } from "@/components/tesla-grid-logo";

export const SiteFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/40 bg-muted/10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <TeslaGridLogo size="sm" className="text-sm opacity-80" />
          <p className="font-mono text-xs text-muted-foreground/90">
            7399 · hey · S3XY · shh
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 sm:items-end">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 font-mono text-xs tracking-wide text-muted-foreground sm:justify-end">
            <Link href="/#hero" className="transition-colors hover:text-foreground">
              up
            </Link>
            <Link href="/#contact" className="transition-colors hover:text-foreground">
              transmit
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              terms
            </Link>
            <Link
              href="/llms.txt"
              className="transition-colors hover:text-foreground"
              prefetch={false}
            >
              llms
            </Link>
          </div>
          <p className="font-mono text-[0.65rem] text-muted-foreground/60">
            heys3xy · {year}
          </p>
        </div>
      </div>
    </footer>
  );
};
