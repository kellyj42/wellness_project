import { CtaSection } from "./components/CtaSection";
import { HeroSection } from "./components/HeroSection";
import { IntroSection } from "./components/IntroSection";
import { PhilosophySection } from "./components/PhilosophySection";
import type { Metadata } from "next";

import { TrainingSection } from "./components/TrainingSection";
import type { PrivateTrainingData } from "./components/types";
import { client } from "@/sanity/lib/client";
import { privateTrainingQuery } from "@/sanity/lib/queries";
import { defaultOgImage } from "../seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Private Pilates Training in Kampala",
  description:
    "Book private Pilates and personalized training at Hey Pilates Studio in Kampala. Explore one-on-one coaching, reformer sessions, and tailored movement plans.",
  alternates: {
    canonical: "/private-training",
  },
  openGraph: {
    title: "Private Training | Hey Pilates Studio",
    description:
      "Explore personalized Pilates and private training sessions designed around your goals, schedule, and movement needs.",
    url: "/private-training",
    images: [defaultOgImage],
  },
};

export default async function PrivateTrainingSection() {
  const data: PrivateTrainingData | undefined =
    (await client.fetch(privateTrainingQuery)) ?? undefined;

  return (
    <section className="relative overflow-hidden bg-brand-cream ">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-sageLight/20 rounded-full -translate-y-32 translate-x-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-sageLight/10 rounded-full -translate-x-48 translate-y-48" />

      {/* HERO */}
      <HeroSection data={data} />

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 py-24 space-y-32">
        {/* INTRO SECTION */}
        <IntroSection introText={data?.introText} />

        {/* TRAINING BLOCKS */}
        <TrainingSection data={data} />

        {/* PHILOSOPHY */}
        <PhilosophySection philosophy={data?.philosophy} />

       

        {/* CTA */}
        <CtaSection ctaText={data?.ctaText} />
      </div>
    </section>
  );
}
