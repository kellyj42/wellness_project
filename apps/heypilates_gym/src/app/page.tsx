import { client } from "@/sanity/lib/client";
import {
  homeQuery,
  founderQuery,
  featuredEventPromoQuery,
} from "@/sanity/lib/queries";
import type { Metadata } from "next";

import HomeHero from "./components/section/HomeHero";
import UniqueSection from "./components/section/UniqueSection";
import FounderSection from "./components/section/FounderSection";
import PrivateTrainingPreview from "./components/section/PrivateTraining";
import { defaultOgImage, siteConfig } from "./seo";
import HomeEventHighlight from "./components/events/HomeEventHighlight";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pilates, Reformer, Barre & TRX in Kampala",
  description:
    "Move with strength and intention at Hey Pilates Studio in Kampala. Explore Reformer Pilates, Mat Pilates, Barre, TRX, Body Fit classes, and private training.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hey Pilates Studio | Pilates, Reformer, Barre & TRX in Kampala",
    description:
      "Explore classes, private training, and premium Pilates experiences at Hey Pilates Studio in Kampala.",
    url: siteConfig.domain,
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
    title: "Hey Pilates Studio | Pilates, Reformer, Barre & TRX in Kampala",
    description:
      "Explore classes, private training, and premium Pilates experiences at Hey Pilates Studio in Kampala.",
    images: [defaultOgImage],
  },
};

export default async function HomePage() {
  const home = await client.fetch(homeQuery);
  const founder = await client.fetch(founderQuery);
  const featuredEvent = await client.fetch(featuredEventPromoQuery);
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    url: siteConfig.domain,
    image: `${siteConfig.domain}${defaultOgImage}`,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressCountry: siteConfig.address.addressCountry,
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.domain,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, websiteSchema]),
        }}
      />
      <HomeHero data={home} />

      <UniqueSection
        points={home?.uniquePoints ?? []}
        gallery={home?.uniqueGallery ?? []}
      />

      <FounderSection
        name={founder?.name}
        title={founder?.title}
        bio={founder?.bio}
        points={founder?.credentials ?? []}
        vision={founder?.vision}
        imageUrl={founder?.image?.asset?.url}
      />

      {featuredEvent ? <HomeEventHighlight event={featuredEvent} /> : null}

      <PrivateTrainingPreview />
    </>
  );
}
