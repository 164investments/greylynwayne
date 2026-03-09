import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/GoogleTagManager";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
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
    title:
      "Greylyn Wayne | Home Staging & Interior Design — Portland, Oregon",
    description:
      "Portland's award-winning home staging & interior design company. 4x Street of Dreams featured designer. Free consultation — (971) 930-0220.",
    url: "https://www.greylynwayne.com",
    siteName: "Greylyn Wayne",
    images: [{ url: "/images/og-image.png", width: 2500, height: 1330 }],
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
  verification: {
    google: "ADD_GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <GoogleTagManager />
        <GoogleTagManagerNoScript />
        <LocalBusinessJsonLd />
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
