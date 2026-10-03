import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { TeslaGridLogo } from "@/components/tesla-grid-logo";
import { cn } from "@/lib/utils";

const navLinkClass =
  "py-2 font-mono text-xs tracking-widest text-muted-foreground transition-colors hover:text-foreground";

export const SiteHeader = () => {
  return (
    <header
      className="sticky top-0 z-50 border-b border-border/40 bg-background/75 pt-[env(safe-area-inset-top)] backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:gap-4">
        <Link
          href="/"
          className={cn(
            "group rounded-md border border-border/50 bg-muted/20 p-1.5 outline-none transition-colors",
            "focus-visible:ring-2 focus-visible:ring-ring",
            "group-hover:border-border group-hover:bg-muted/40",
          )}
        >
          <TeslaGridLogo size="sm" />
        </Link>

        <nav
          className="flex flex-1 items-center justify-center gap-5 sm:gap-8"
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
