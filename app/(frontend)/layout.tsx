import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next'
import LenisProvider from "@/components/LenisProvider";
import QueryProvider from "@/components/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Precision Signs | Gaming Signage & Display Solutions",
    template: "%s | Precision Signs",
  },
  description:
    "Australia's leading manufacturer of gaming signage solutions. Custom overbank signage, entry displays, screens, and jackpot history displays for casinos and gaming venues.",
  keywords: [
    "gaming signage",
    "casino displays",
    "overbank signage",
    "jackpot displays",
    "gaming screens",
    "venue signage",
    "Australia",
    "custom signage",
  ],
  authors: [{ name: "Precision Signs" }],
  creator: "Precision Signs",
  publisher: "Precision Signs",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://precisionsigns.com.au"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "/",
    siteName: "Precision Signs",
    title: "Precision Signs | Gaming Signage & Display Solutions",
    description:
      "Australia's leading manufacturer of gaming signage solutions. Custom overbank signage, entry displays, screens, and jackpot history displays for casinos and gaming venues.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Precision Signs - Gaming Signage Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Precision Signs | Gaming Signage & Display Solutions",
    description:
      "Australia's leading manufacturer of gaming signage solutions. Custom overbank signage, entry displays, screens, and jackpot history displays.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Precision Signs",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://precisionsigns.com.au",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://precisionsigns.com.au"}/images/logo-white.png`,
    description:
      "Australia's leading manufacturer of gaming signage solutions for casinos and gaming venues.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "AU",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: "English",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <Analytics />
        <QueryProvider>
          <LenisProvider>{children}</LenisProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
