import type { Metadata } from "next";
import type { Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "./components/layouts/ConditionalLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://greenbean.ug",
  ),
  title: {
    default: "Green Bean | Healthy Meal Plans & Nutrition Coaching Kampala",
    template: "%s | Green Bean",
  },
  description:
    "Green Bean helps you eat well with healthy meal plans, nutrition coaching, and wellness programs in Kampala.",
  keywords: [
    "Green Bean",
    "meal plans Kampala",
    "healthy meals Uganda",
    "nutrition coaching Kampala",
    "weight loss meal plan",
    "wellness programs",
    "healthy food delivery Kampala",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_UG",
    url: "/",
    siteName: "Green Bean",
    title: "Green Bean | Healthy Meal Plans & Nutrition Coaching Kampala",
    description:
      "Healthy meal plans, nutrition coaching, and wellness programs tailored for your goals.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Green Bean healthy meal plans and nutrition coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Green Bean | Healthy Meal Plans & Nutrition Coaching Kampala",
    description:
      "Healthy meal plans, nutrition coaching, and wellness programs tailored for your goals.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2E2A26",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
