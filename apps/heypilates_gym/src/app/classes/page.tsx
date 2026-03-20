import ClassFilter from "../components/section/ClassFilter";
import ClassGrid from "../components/section/ClassGrid";
import ClassHero from "../components/section/ClassHero";
import ScheduleTable from "../components/section/ClassSchedule";
import PricingSection from "../components/section/Pricing";
import { client } from "@/sanity/lib/client";
import { classTypesQuery, classScheduleQuery } from "@/sanity/lib/queries";
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
  const schedule = await client.fetch(classScheduleQuery);

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
        <div id="weekly-schedule" className="mt-12 scroll-mt-32 sm:mt-20">
          <h2 className="mb-6 px-4 text-center text-2xl font-bold text-brand-charcoal sm:mb-8 sm:text-3xl">
            Weekly Schedule
          </h2>
          <div className="px-2 sm:px-0">
            <ScheduleTable schedule={schedule} classTypes={classes || []} />
          </div>
        </div>
        <PricingSection />
      </div>
    </div>
  );
}
