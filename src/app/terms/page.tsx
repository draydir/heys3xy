import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { TERMS_DOC } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Terms",
  description: TERMS_DOC.description,
  alternates: {
    canonical: "/terms",
    types: { "text/markdown": "/terms.md" },
  },
};

export default function TermsPage() {
  return <LegalPage doc={TERMS_DOC} />;
}
