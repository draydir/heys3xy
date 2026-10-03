/**
 * Single source for legal copy. Rendered as HTML on /privacy and /terms and as
 * Markdown on /privacy.md, /terms.md, and /llms-full.txt. Inline `**bold**` is
 * the only supported markup.
 */

export interface LegalSection {
  title: string;
  paragraphs: string[];
}

export interface LegalDoc {
  slug: "privacy" | "terms";
  title: string;
  description: string;
  summary: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export const PRIVACY_DOC: LegalDoc = {
  slug: "privacy",
  title: "Privacy Policy",
  description: "We see nothing. The ravens are on break.",
  summary:
    "No accounts, no analytics, no ad trackers, no database. Contact-form submissions (name, preferred channel, handle, message) are delivered by email (Postmark) and Telegram and are not published or sold.",
  updated: "2026-10-03",
  intro:
    "**Effective when you squint at #7399.** Parody in tone, accurate in substance. It is a mood, but an honest one.",
  sections: [
    {
      title: "I. The small print",
      paragraphs: [
        "heys3xy.com is mostly air and a number. We do not sell your soul, your dragonglass, or your data to the highest bidder in King's Landing. There are no accounts, no ads, no analytics, and no tracking pixels. The Night's Watch keeps better records than we do, on purpose.",
      ],
    },
    {
      title: "II. What we collect",
      paragraphs: [
        "If you use **transmit**, you volunteer a **name**, your **preferred channel** (email, WhatsApp, Telegram, Signal, and friends), the **handle** for that channel (an email, phone number, or username), and a **message**.",
        "That raven flies to exactly two places: an email inbox (via Postmark) and a private Telegram chat read by humans who drink coffee, not wights. Nothing is stored in a database on our side. Do not send state secrets, wildfire recipes, or passwords.",
        "To keep spammers beyond the Wall, your **IP address** and a one-way **hash of your message** are held briefly in server memory for rate limiting and duplicate detection (at most a day), then forgotten.",
      ],
    },
    {
      title: "III. Who else touches it",
      paragraphs: [
        "**Vercel** hosts the site and keeps standard request logs (IP, user agent, timestamps) for a short while. **Postmark** delivers the email. **Telegram** delivers the chat notification. Each has its own privacy policy, and each is a more serious institution than this one.",
      ],
    },
    {
      title: "IV. Cookies & storage",
      paragraphs: [
        "We set no cookies. Your light/dark/system choice lives in your own browser's local storage, and it never leaves your device. You may clear it and still gaze upon the number like a true northerner.",
      ],
    },
    {
      title: "V. Retention",
      paragraphs: [
        "Transmitted messages live in that inbox and chat until someone deletes them or the Long Night arrives, whichever comes first. Ask and we will delete yours sooner.",
      ],
    },
    {
      title: "VI. Your rights",
      paragraphs: [
        "You may ask to see, correct, or delete what you sent us. Just transmit politely and say so. We will answer at the speed of a raven with a hangover, but we will answer. Depending on where you live (EU/UK GDPR, California CCPA, and similar), you have these rights in law as well as in spirit.",
      ],
    },
    {
      title: "VII. Children",
      paragraphs: [
        "This site is not aimed at anyone under 16. Young wolves should ask their parents before sending ravens.",
      ],
    },
    {
      title: "VIII. Changes",
      paragraphs: [
        "This policy may change when the winds shift. The date at the top tells you when they last did. Winter is coming; update your expectations accordingly.",
      ],
    },
  ],
};

export const TERMS_DOC: LegalDoc = {
  slug: "terms",
  title: "Terms of Use",
  description: "Bend the knee. Or don't. We're not the Crown.",
  summary:
    "Personal fan site, provided as-is with no warranties. Be decent with the contact form; no spam, scraping abuse, or impersonation. Not affiliated with Tesla, HBO, or George R.R. Martin.",
  updated: "2026-10-03",
  intro:
    "**By the power vested in me** (and by \"me\" I mean whoever pays the Vercel invoice), I, Lord of heys3xy.com, Warden of the Numeric Palindrome, and Protector of the S3XY Grid, grant you a revocable license to look at this site. So it is written. So it is mildly binding in spirit.",
  sections: [
    {
      title: "I. The oath",
      paragraphs: [
        "You enter this realm of your own free will. You will not DDoS the Wall, hammer the Iron Throne with bots, or pretend to be the Three-Eyed Raven while filing spam through transmit. Harassment gets you banished beyond the Reach, with prejudice and without refund.",
      ],
    },
    {
      title: "II. Transmit etiquette",
      paragraphs: [
        "The contact form is for humans saying hello. It is rate-limited, and suspicious ravens are quietly dropped without notice. Automated agents should not submit it on anyone's behalf. Send your own messages, with your own real handle.",
      ],
    },
    {
      title: "III. Robots & LLMs",
      paragraphs: [
        "Crawlers and language models may read, index, and quote the public pages, credit to heys3xy.com appreciated. A machine-friendly summary lives at /llms.txt. Please do not invent a meaning for #7399; the mystery is the point.",
      ],
    },
    {
      title: "IV. No warranties",
      paragraphs: [
        "This site is provided **\"as is,\"** like a borrowed Valyrian steel sword with no return policy. Uptime, accuracy, and whether #7399 will make you rich are not guaranteed. The Red Wedding taught us that surprises happen.",
      ],
    },
    {
      title: "V. Limitation of liability",
      paragraphs: [
        "To the fullest extent permitted by laws older than House Stark, we are not liable for lost profits, lost dragons, emotional damage from reading these terms, or your boss noticing you on heys3xy during a meeting. Our maximum liability is zero gold dragons and one sympathetic shrug.",
      ],
    },
    {
      title: "VI. Intellectual property",
      paragraphs: [
        "The number, the page, and the audacity are ours. Tesla and S3XY-adjacent marks belong to Tesla; Game of Thrones belongs to HBO and George R.R. Martin; brand logos in the contact picker belong to their owners. This is an unaffiliated fan joke. Do not sue us; send a raven (use transmit).",
      ],
    },
    {
      title: "VII. Governing law",
      paragraphs: [
        "Disputes shall first be settled over ale between two consenting adults. Failing that, the law of wherever the site's owner lives applies, and the North remembers.",
      ],
    },
    {
      title: "VIII. Severability & changes",
      paragraphs: [
        "If any clause falls like a Lannister reputation, the rest stand. We may change these terms when the plot demands it; the date at the top shows the latest rewrite. Continued use means you bent the knee. Hail #7399.",
      ],
    },
  ],
};

export const LEGAL_DOCS = [PRIVACY_DOC, TERMS_DOC] as const;
