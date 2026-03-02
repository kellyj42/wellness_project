import type { Metadata } from "next";
import Hero from "./components/sections/Hero";
import WhoWeAre from "./components/sections/WhoWeAre";
import WhyGreenBean from "./components/sections/WhyGreenBean";
import RealResults from "./components/sections/RealResults";
import GoogleReviews from "./components/sections/GoogleReviews";
import LocationDelivery from "./components/sections/LocationDelivery";
import FinalCTA from "./components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Healthy Meal Plans in Kampala",
  description:
    "Discover healthy meal plans, nutrition coaching, and wellness programs by Green Bean in Kampala.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: "Green Bean",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://greenbean.ug",
    image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://greenbean.ug"}/gb.png`,
    description:
      "Healthy meal plans, nutrition coaching, and wellness programs in Kampala.",
    telephone: "+256700000000",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kampala",
      addressCountry: "UG",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <Hero />
      <WhoWeAre />
      <WhyGreenBean />
      <RealResults />
      <GoogleReviews />
      <LocationDelivery />
      <FinalCTA />
    </>
  );
}
