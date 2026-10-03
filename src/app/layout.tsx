import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";

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
    default: "#7399",
    template: "%s · #7399",
  },
  description: "#7399 · heys3xy.com",
  keywords: ["7399", "#7399", "heys3xy", "S3XY"],
  authors: [{ name: "heys3xy" }],
  creator: "heys3xy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "#7399",
    title: "#7399",
    description: "hey",
  },
  twitter: {
    card: "summary",
    title: "#7399",
    description: "7399",
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
      alternateName: ["7399", "S3XY", "heys3xy"],
      description: "#7399",
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
        name: "7399",
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${teslaLike.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM site summary" />
      </head>
      <body className="flex min-h-svh flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
