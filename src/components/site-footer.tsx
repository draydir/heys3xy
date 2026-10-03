import Link from "next/link";

import { TeslaGridLogo } from "@/components/tesla-grid-logo";

const footerLinkClass = "py-1.5 transition-colors hover:text-foreground";

export const SiteFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/40 bg-muted/10">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 pt-10 pb-[calc(2.5rem+env(safe-area-inset-bottom))] sm:grid-cols-2 sm:items-center sm:gap-4">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <TeslaGridLogo size="sm" className="opacity-80" />
          <p className="font-mono text-xs text-muted-foreground/90">
            7399 · hey · S3XY · shh
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 sm:items-end sm:text-right">
          <nav
            className="flex flex-wrap justify-center gap-x-5 font-mono text-xs tracking-wide text-muted-foreground sm:justify-end sm:gap-x-4"
            aria-label="Footer"
          >
            <Link href="/#hero" className={footerLinkClass}>
              up
            </Link>
            <Link href="/#contact" className={footerLinkClass}>
              transmit
            </Link>
            <Link href="/privacy" className={footerLinkClass}>
              privacy
            </Link>
            <Link href="/terms" className={footerLinkClass}>
              terms
            </Link>
            <Link href="/llms" className={footerLinkClass}>
              llms
            </Link>
          </nav>
          <p className="font-mono text-[0.65rem] text-muted-foreground/60">
            heys3xy · {year}
          </p>
        </div>
      </div>
    </footer>
  );
};
