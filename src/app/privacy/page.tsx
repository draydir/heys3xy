import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy",
  description: "We see nothing. The ravens are on break.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        <strong>Effective when you squint at #7399.</strong> This is not legal advice. It is a mood.
      </p>

      <section>
        <h2>I. THE SMALL PRINT</h2>
        <p>
          heys3xy.com is mostly air and a number. We do not sell your soul, your dragonglass, or your
          browsing history to the highest bidder in King&apos;s Landing. We barely sell anything. We
          barely browse.
        </p>
      </section>

      <section>
        <h2>II. WHAT WE COLLECT</h2>
        <p>
          If you use <strong>transmit</strong>, you volunteer a name, email, and message. That payload
          crosses the Narrow Sea to email and a private Telegram channel operated by humans who drink
          coffee, not wights. Do not send state secrets, wildfire recipes, or your mother&apos;s maiden
          name unless you are feeling theatrical.
        </p>
        <p>
          Otherwise we collect the usual invisible stuff: server logs, TLS handshakes, and the quiet
          judgment of analytics we forgot to install. The Night&apos;s Watch has better record-keeping;
          we have vibes.
        </p>
      </section>

      <section>
        <h2>III. COOKIES</h2>
        <p>
          We use cookies only if Next.js, Vercel, or your browser insists. They are not chocolate chip.
          You may refuse them in your browser settings and still gaze upon the cipher like a true northerner.
        </p>
      </section>

      <section>
        <h2>IV. RETENTION</h2>
        <p>
          Messages live until someone deletes them or the Long Night arrives—whichever is sooner and
          more inconvenient. Backup policies are &ldquo;probably fine.&rdquo;
        </p>
      </section>

      <section>
        <h2>V. YOUR RIGHTS</h2>
        <p>
          You may request access, correction, or deletion by transmitting politely. We will respond at
          the speed of a raven with a hangover. GDPR who? We are a hashtag with a domain.
        </p>
      </section>

      <section>
        <h2>VI. CHANGES</h2>
        <p>
          This policy may change when the winds shift. Continued staring at the homepage constitutes
          acceptance, or at least indifference. Winter is coming; update your expectations accordingly.
        </p>
      </section>
    </LegalPage>
  );
}
