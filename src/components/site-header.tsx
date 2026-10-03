import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { TeslaGridLogo } from "@/components/tesla-grid-logo";
import { cn } from "@/lib/utils";

const navLinkClass =
  "font-mono text-xs tracking-widest text-muted-foreground transition-colors hover:text-foreground";

export const SiteHeader = () => {
  return (
    <header
      className="sticky top-0 z-50 border-b border-border/40 bg-background/75 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span
            className={cn(
              "rounded border border-border/50 bg-muted/20 p-1.5 transition-colors",
              "group-hover:border-border group-hover:bg-muted/40",
            )}
          >
            <TeslaGridLogo size="sm" className="text-sm tracking-[0.15em]" />
          </span>
          <span className="hidden font-mono text-sm tracking-tight text-foreground sm:inline">
            #7399
          </span>
        </Link>

        <nav
          className="flex flex-1 items-center justify-center gap-6 sm:gap-8"
          aria-label="Primary"
        >
          <Link href="/#hero" className={navLinkClass}>
            7399
          </Link>
          <Link href="/#contact" className={navLinkClass}>
            transmit
          </Link>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
};
