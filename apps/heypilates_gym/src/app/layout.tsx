// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "./components/layout/AppShell";
import { client } from "@/sanity/lib/client";
import { chatbotQuery, featuredEventPromoQuery } from "@/sanity/lib/queries";
import { defaultOgImage, siteConfig } from "./seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  applicationName: siteConfig.shortName,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "health and fitness",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.domain,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: defaultOgImage,
        width: 512,
        height: 512,
        alt: `${siteConfig.shortName} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/Hey PILATES logo (2).png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
    shortcut: [{ url: "/icon.png", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch chatbot data
  let chatbotData;
  let eventPromo;
  try {
    chatbotData = await client.fetch(chatbotQuery);
  } catch (error) {
    console.error("Error fetching chatbot data:", error);
  }

  try {
    eventPromo = await client.fetch(featuredEventPromoQuery);
  } catch (error) {
    console.error("Error fetching event promo:", error);
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppShell chatbotData={chatbotData} eventPromo={eventPromo}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
