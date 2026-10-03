import Link from "next/link";
import type { ReactNode } from "react";

interface LegalPageProps {
  title: string;
  children: ReactNode;
}

export const LegalPage = ({ title, children }: LegalPageProps) => {
  return (
    <main className="flex flex-1 flex-col">
      <article className="mx-auto w-full max-w-2xl px-4 py-16 sm:py-20">
        <p className="mb-2 font-mono text-xs tracking-widest text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            ← 7399
          </Link>
        </p>
        <h1 className="font-tesla text-2xl tracking-[0.2em] sm:text-3xl">{title}</h1>
        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground [&_strong]:text-foreground [&_h2]:font-mono [&_h2]:text-xs [&_h2]:tracking-widest [&_h2]:text-foreground">
          {children}
        </div>
      </article>
    </main>
  );
};
