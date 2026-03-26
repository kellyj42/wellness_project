import ClassFilter from "../components/section/ClassFilter";
import ClassGrid from "../components/section/ClassGrid";
import ClassHero from "../components/section/ClassHero";
import PricingSection from "../components/section/Pricing";
import { client } from "@/sanity/lib/client";
import { classTypesQuery } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import { defaultOgImage } from "../seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pilates Classes in Kampala",
  description:
    "Browse Reformer Pilates, Mat Pilates, Barre, TRX, and Body Fit classes at Hey Pilates Studio in Kampala. View class details, schedules, and pricing.",
  alternates: {
    canonical: "/classes",
  },
  openGraph: {
    title: "Hey Pilates Studio Classes | Pilates, Barre, TRX & Body Fit",
    description:
      "Browse classes, compare formats, and explore the weekly schedule at Hey Pilates Studio in Kampala.",
    url: "/classes",
    images: [defaultOgImage],
  },
};

export default async function ClassesPage() {
  const classes = await client.fetch(classTypesQuery);

  const categories: string[] = [
    ...new Set(
      (classes as any[])
        .filter((c: any) => c.category)
        .map((c: any) => c.category as string),
    ),
  ];

  return (
    <div className="min-h-screen">
      <ClassHero />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <ClassFilter categories={categories} />
        <ClassGrid classes={classes} />
        <div
          id="live-booking"
          className="mt-12 scroll-mt-32 overflow-hidden rounded-[28px] border border-brand-sageLight/70 bg-white shadow-sm sm:mt-20"
        >
          <div className="border-b border-brand-sageLight/70 bg-brand-cream/50 px-5 py-5 sm:px-8">
            <h2 className="text-2xl font-bold text-brand-charcoal sm:text-3xl">
              Book Classes
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-brand-muted sm:text-base">
              Browse the live timetable, check availability, and book your session directly.
            </p>
          </div>
          <iframe
            title="Hey Pilates Studio Booking"
            src="https://studiobookingonline.com/heypilatesstudiokla/embed/"
            scrolling="no"
            className="w-full"
            style={{ minHeight: "1350px", height: "auto", border: 0 }}
            allowFullScreen
          />
        </div>
        <PricingSection />
      </div>
    </div>
  );
}
