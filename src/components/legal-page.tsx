import Link from "next/link";

import { RichText } from "@/components/rich-text";
import type { LegalDoc } from "@/lib/legal-content";

interface LegalPageProps {
  doc: LegalDoc;
}

export const LegalPage = ({ doc }: LegalPageProps) => {
  return (
    <main className="flex flex-1 flex-col">
      <article className="mx-auto w-full max-w-2xl px-4 py-16 sm:py-20">
        <p className="mb-2 font-mono text-xs tracking-widest text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            ← 7399
          </Link>
        </p>
        <h1 className="font-tesla text-2xl tracking-[0.2em] sm:text-3xl">{doc.title}</h1>
        <p className="mt-3 font-mono text-[0.7rem] tracking-wide text-muted-foreground/70">
          updated <time dateTime={doc.updated}>{doc.updated}</time> ·{" "}
          <a href={`/${doc.slug}.md`} className="underline-offset-4 hover:text-foreground hover:underline">
            .md
          </a>
        </p>

        <aside className="mt-8 rounded-xl border border-border/60 bg-muted/30 px-4 py-3 text-sm leading-relaxed">
          <p className="mb-1 font-mono text-[0.65rem] tracking-widest text-muted-foreground">TL;DR</p>
          <p className="text-foreground">{doc.summary}</p>
        </aside>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground [&_h2]:font-mono [&_h2]:text-xs [&_h2]:tracking-widest [&_h2]:text-foreground [&_h2]:uppercase [&_section>p+p]:mt-3 [&_strong]:text-foreground">
          <p>
            <RichText text={doc.intro} />
          </p>
          {doc.sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-2">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>
                  <RichText text={paragraph} />
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
};
