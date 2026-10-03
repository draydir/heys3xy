import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms",
  description: "Bend the knee. Or don't. We're not the Crown.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use">
      <p>
        <strong>By the power vested in me</strong>—and by &ldquo;me&rdquo; I mean whoever pays the
        Vercel invoice—I, Lord of heys3xy.com, Warden of the Numeric Palindrome, and Protector of the
        S3XY Grid, grant you a revocable license to look at this site. So it is written. So it is
        mildly binding in spirit.
      </p>

      <section>
        <h2>I. THE OATH</h2>
        <p>
          You enter this realm of your own free will. You will not DDoS the Wall, scrape the Iron
          Throne of our HTML, or pretend to be the Three-Eyed Raven while filing spam through transmit.
          Harassment gets you banished beyond the Reach—with prejudice and without refund.
        </p>
      </section>

      <section>
        <h2>II. NO WARRANTIES</h2>
        <p>
          This site is provided <strong>&ldquo;as is,&rdquo;</strong> like a borrowed Valyrian steel
          sword with no return policy. Uptime, accuracy, and whether #7399 will make you rich are not
          guaranteed. The Red Wedding taught us nothing if not that surprises happen.
        </p>
      </section>

      <section>
        <h2>III. LIMITATION OF LIABILITY</h2>
        <p>
          To the fullest extent permitted by laws older than House Stark, we are not liable for lost
          profits, lost dragons, emotional damage from reading these terms, or your boss noticing you
          on heys3xy during a meeting. Our maximum liability is zero gold dragons and one sympathetic
          shrug.
        </p>
      </section>

      <section>
        <h2>IV. INTELLECTUAL PROPERTY</h2>
        <p>
          The logo grid, the number, and the audacity are ours. Tesla, HBO, George R.R. Martin, and
          the concept of telephones are theirs. This is fan-fiction for a domain joke. Do not sue us;
          send a raven (use transmit).
        </p>
      </section>

      <section>
        <h2>V. GOVERNING LAW</h2>
        <p>
          Disputes shall be settled in the court of public opinion, or wherever two consenting adults
          agree over ale. If you must pick a jurisdiction, pick one where hashtags are not persons under
          law. The North remembers; the Terms do too.
        </p>
      </section>

      <section>
        <h2>VI. SEVERABILITY</h2>
        <p>
          If any clause falls like a Lannister reputation, the rest stand. You may not transfer your
          rights without our say-so. We may change these terms when the plot demands it. Continued use
          means you bent the knee. Hail #7399.
        </p>
      </section>
    </LegalPage>
  );
}
