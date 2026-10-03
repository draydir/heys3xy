import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { PRIVACY_DOC } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Privacy",
  description: PRIVACY_DOC.description,
  alternates: {
    canonical: "/privacy",
    types: { "text/markdown": "/privacy.md" },
  },
};

export default function PrivacyPage() {
  return <LegalPage doc={PRIVACY_DOC} />;
}
