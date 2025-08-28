import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { StructuredData } from "@/components/seo/StructuredData";
import { ClarityAnalytics } from "@/components/analytics/ClarityAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tableflow-3bm.pages.dev'),
  title: {
    default: "TableFlow - Free Online Table Converter | Excel, CSV, JSON Export",
    template: "%s | TableFlow - Table Converter"
  },
  description:
    "Convert copied table data to Excel, CSV, PDF, HTML, JSON, and XML formats instantly. Free online table converter with Google Sheets integration. No download required.",
  keywords: [
    "table converter",
    "excel converter", 
    "csv converter",
    "data converter",
    "table to excel",
    "table to csv", 
    "online table converter",
    "free table converter",
    "google sheets export",
    "data export tool",
    "table format converter"
  ],
  authors: [{ name: "TableFlow Team" }],
  creator: "TableFlow",
  publisher: "TableFlow",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tableflow-3bm.pages.dev",
    siteName: "TableFlow - Table Converter",
    title: "TableFlow - Free Online Table Converter | Excel, CSV, JSON Export",
    description: "Convert copied table data to Excel, CSV, JSON, and XML formats instantly. Free online table converter with Google Sheets integration.",
    images: [
      {
        url: "/logo-512x512.png",
        width: 1200,
        height: 630,
        alt: "TableFlow - Free Online Table Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TableFlow - Free Online Table Converter",
    description: "Convert copied table data to Excel, CSV, JSON formats instantly. Free online tool with Google Sheets integration.",
    images: ["/logo-512x512.png"],
    creator: "@tableflow_app",
  },
  alternates: {
    canonical: "https://tableflow-3bm.pages.dev",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <StructuredData />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://accounts.google.com" />
        <link rel="dns-prefetch" href="https://sheets.googleapis.com" />
        <link rel="preload" href="/tableflow-logo.svg" as="image" type="image/svg+xml" />
      </head>
      <body className={`${geistSans.className} antialiased dark`}>
        <ClarityAnalytics />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
