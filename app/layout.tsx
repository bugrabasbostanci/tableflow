import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tablio - Tablo Dönüştürücü",
  description:
    "Kopyaladığınız tabloları Excel, CSV ve diğer formatlara dönüştürün",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${geistSans.className} antialiased dark`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
