import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { Button } from "../components/ui/Button";
import { defaultOgImage } from "../seo";

export const metadata: Metadata = {
  title: "Pilates Events & Workshops",
  description:
    "Stay updated on upcoming Pilates events, workshops, and community sessions from Hey Pilates Studio in Kampala.",
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "Events & Workshops | Hey Pilates Studio",
    description:
      "Check upcoming Pilates workshops, events, and wellness sessions at Hey Pilates Studio in Kampala.",
    url: "/events",
    images: [defaultOgImage],
  },
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <section className="relative overflow-hidden pt-28 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(169,183,154,0.35),rgba(244,246,241,0))]" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-sageLight/60 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-40 w-[70%] bg-[linear-gradient(90deg,rgba(169,183,154,0.2),rgba(244,246,241,0))]" />

        <div className="relative mx-auto max-w-4xl px-6">
          <div className="rounded-[36px] border border-white/60 bg-white/80 px-6 py-12 text-center shadow-lg sm:px-10">
            <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-brand-sageLight px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark">
              Events Notice
            </span>
            <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-cream">
              <CalendarDays className="h-8 w-8 text-brand-sageDark" />
            </div>
            <h1 className="mt-6 text-3xl font-semibold text-brand-charcoal sm:text-4xl">
              No events are scheduled right now.
            </h1>
            <p className="mt-4 text-base text-brand-muted sm:text-lg">
              We are curating our next round of workshops and community sessions.
              Check back soon, or reach out to host a private event.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                href="/contact"
                className="bg-brand-sageDark text-white hover:bg-brand-sage"
              >
                Contact us
              </Button>
              <Button
                href="https://studiobookingonline.com/heypilates"
                variant="secondary"
                className="text-brand-charcoal"
              >
                View classes
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
