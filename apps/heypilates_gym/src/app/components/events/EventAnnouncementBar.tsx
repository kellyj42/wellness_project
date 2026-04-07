"use client";

import Link from "next/link";
import { CalendarDays, ChevronRight } from "lucide-react";

type EventPromo = {
  title: string;
  startDate: string;
  price?: string;
  bookingUrl?: string;
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-UG", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));

export default function EventAnnouncementBar({
  event,
}: {
  event: EventPromo;
}) {
  return (
    <div className="fixed left-0 right-0 top-0 z-[60] border-b border-white/20 bg-brand-sageDark text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 flex-shrink-0" />
          <p className="leading-6 text-white/95">
            <span className="font-semibold">{event.title}</span>
            <span className="mx-2 text-white/60">|</span>
            <span>{formatDate(event.startDate)}</span>
            {event.price ? (
              <>
                <span className="mx-2 text-white/60">|</span>
                <span>{event.price}</span>
              </>
            ) : null}
          </p>
        </div>
        <Link
          href={event.bookingUrl || "/events"}
          className="inline-flex items-center gap-1 font-semibold text-brand-cream transition hover:text-white"
        >
          Reserve your spot
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
