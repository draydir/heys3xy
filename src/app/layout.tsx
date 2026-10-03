import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const teslaLike = Montserrat({
  variable: "--font-tesla",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://heys3xy.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "#7399 — S3XY cipher",
    template: "%s · #7399",
  },
  description:
    "#7399: T9 keypad letters S-E-X-Y, Tesla model line S·3·X·Y, and the heys3xy signal. One page. One number. Transmit if you must.",
  keywords: [
    "7399",
    "#7399",
    "SEXY",
    "T9",
    "S3XY",
    "Tesla S 3 X Y",
    "heys3xy",
    "heys3xy.com",
  ],
  authors: [{ name: "heys3xy" }],
  creator: "heys3xy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "#7399",
    title: "#7399 — S3XY cipher",
    description:
      "Seven-three-nine-nine: keypad slang, model letters, domain whisper. Obscure on purpose.",
  },
  twitter: {
    card: "summary",
    title: "#7399",
    description: "S·E·X·Y on a phone. S·3·X·Y on a lot. heys3xy.com",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "#7399",
      alternateName: ["7399", "SEXY T9", "S3XY", "heys3xy"],
      description:
        "Minimal site for the #7399 cipher: telephone keypad SEXY and Tesla lineup letters S, 3, X, Y.",
      inLanguage: "en",
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "#7399",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: {
        "@type": "Thing",
        name: "7399 numeric cipher",
        description:
          "Maps to T9 SEXY and to Tesla model designations S, Model 3, Model X, Model Y.",
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${teslaLike.variable} dark h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM site summary" />
      </head>
      <body className="flex min-h-svh flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
