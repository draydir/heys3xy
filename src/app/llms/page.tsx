import type { Metadata } from "next";
import Link from "next/link";

import { buildLlmsTxt } from "@/lib/llms";

export const metadata: Metadata = {
  title: "llms",
  description: "What the robots read.",
  alternates: {
    canonical: "/llms",
    types: { "text/plain": "/llms.txt" },
  },
};

const rawLinks = [
  { href: "/llms.txt", label: "llms.txt" },
  { href: "/llms-full.txt", label: "llms-full.txt" },
  { href: "/privacy.md", label: "privacy.md" },
  { href: "/terms.md", label: "terms.md" },
];

export default function LlmsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:py-20">
        <p className="mb-2 font-mono text-xs tracking-widest text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            ← 7399
          </Link>
        </p>
        <h1 className="font-tesla text-2xl tracking-[0.2em] sm:text-3xl">llms</h1>
        <nav
          aria-label="Raw files"
          className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.7rem] tracking-wide text-muted-foreground/80"
        >
          {rawLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-1 underline-offset-4 hover:text-foreground hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <pre className="mt-8 overflow-x-auto rounded-xl border border-border/60 bg-muted/30 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap break-words text-foreground sm:p-6 sm:text-[0.8rem]">
          {buildLlmsTxt()}
        </pre>
      </article>
    </main>
  );
}
