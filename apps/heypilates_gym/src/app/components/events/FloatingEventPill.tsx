"use client";

import Link from "next/link";
import { CalendarDays } from "lucide-react";

type EventPromo = {
  title: string;
  bookingUrl?: string;
};

export default function FloatingEventPill({
  event,
}: {
  event: EventPromo;
}) {
  return (
    <Link
      href={event.bookingUrl || "/events"}
      className="fixed bottom-6 right-4 z-40 inline-flex max-w-[220px] items-center gap-3 rounded-full border border-brand-sageLight bg-white/95 px-4 py-3 text-sm shadow-xl backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl sm:right-6"
    >
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-sageLight text-brand-sageDark">
        <CalendarDays className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-sageDark">
          Upcoming Event
        </span>
        <span className="block truncate font-medium text-brand-charcoal">
          {event.title}
        </span>
      </span>
    </Link>
  );
}
