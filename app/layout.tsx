import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "../components/ui/toaster";
import { Analytics } from "../components/analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cipta Mandiri Perkasa - Solusi Bisnis Terpercaya",
  description: "Cipta Mandiri Perkasa menyediakan layanan profesional untuk kebutuhan bisnis Anda. Hubungi kami untuk konsultasi gratis.",
  keywords: ["cipta mandiri perkasa", "jasa bisnis", "konsultan bisnis", "solusi bisnis"],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://ciptamandiriperkasa.id",
    title: "Cipta Mandiri Perkasa - Solusi Bisnis Terpercaya",
    description: "Cipta Mandiri Perkasa menyediakan layanan profesional untuk kebutuhan bisnis Anda. Hubungi kami untuk konsultasi gratis.",
    siteName: "Cipta Mandiri Perkasa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cipta Mandiri Perkasa - Solusi Bisnis Terpercaya",
    description: "Cipta Mandiri Perkasa menyediakan layanan profesional untuk kebutuhan bisnis Anda. Hubungi kami untuk konsultasi gratis.",
  },
  alternates: {
    canonical: "https://ciptamandiriperkasa.id",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
