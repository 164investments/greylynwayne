import type { Metadata } from "next";
import { EB_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ChatWidget from "@/components/ChatWidget";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import { GtagScripts } from "@/components/GtagScripts";
import { MetaPixel } from "@/components/MetaPixel";
import SiteTracker from "@/components/SiteTracker";

// Brand type (Brand Guidelines, Summer 2025): EB Garamond (display + body),
// Montserrat (uppercase labels/subheads). EB Garamond keeps the legacy
// `--font-playfair` variable name so the 165 existing heading references resolve.
const ebGaramond = EB_Garamond({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.greylynwayne.com"),
  title: {
    default:
      "Greylyn Wayne | Home Staging & Interior Design — Portland, Oregon",
    template: "%s | Greylyn Wayne — Portland, OR",
  },
  description:
    "Portland's award-winning home staging and interior design company. 4x Street of Dreams featured designer. Sell your home faster or transform your living space. Free consultation — (971) 930-0220.",
  keywords: [
    "home staging Portland",
    "home staging Portland Oregon",
    "interior design Portland",
    "interior designer Portland Oregon",
    "home stager Portland",
    "luxury home staging Oregon",
    "Street of Dreams designer Portland",
    "vacant home staging Portland",
    "occupied home staging",
    "model home staging Oregon",
    "home staging near me",
    "interior design near me Portland",
  ],
  openGraph: {
    title: "Greylyn Wayne | Home Staging & Interior Design — Portland, Oregon",
    description:
      "Portland's award-winning home staging & interior design company. 4x Street of Dreams featured designer. Free consultation — (971) 930-0220.",
    url: "https://www.greylynwayne.com",
    siteName: "Greylyn Wayne",
    images: [{ url: "/images/og-image.png", width: 2500, height: 1312 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Greylyn Wayne | Home Staging & Interior Design — Portland, OR",
    description:
      "Portland's award-winning home staging & interior design company. Free consultation — (971) 930-0220.",
    images: ["/images/og-image.png"],
  },
  alternates: {
    canonical: "https://www.greylynwayne.com",
  },
  // Google Search Console is verified via DNS (sc-domain property), so no
  // Google meta tag is needed. Meta/Facebook domain verification uses a meta tag.
  verification: {
    other: {
      "facebook-domain-verification": "zx10cw79ay7dcwb0tui2ehmgbmlh3t",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ebGaramond.variable} ${montserrat.variable}`}>
      <head>
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="llms.txt"
        />
      </head>
      <body>
        {/* GA4 + Google Ads (single Google tag) and Meta Pixel load in code.
            GTM was removed: its only tag was a duplicate GA4 config, which breaks
            GA4 session_engaged when GA4 is also configured here. */}
        <GtagScripts />
        <MetaPixel />
        <LocalBusinessJsonLd />
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyMobileCTA />
        <ChatWidget />
        <SiteTracker />
      </body>
    </html>
  );
}
