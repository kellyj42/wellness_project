import { CtaSection } from "./components/CtaSection";
import { HeroSection } from "./components/HeroSection";
import { IntroSection } from "./components/IntroSection";
import { PhilosophySection } from "./components/PhilosophySection";

import { TrainingSection } from "./components/TrainingSection";
import type { PrivateTrainingData } from "./components/types";
import { client } from "@/sanity/lib/client";
import { privateTrainingQuery } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

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
