import { CalendarDays, Clock3, MapPin, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";

type EventPromo = {
  title: string;
  summary?: string;
  startDate: string;
  endDate?: string;
  location?: string;
  price?: string;
  bookingUrl?: string;
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-UG", {
    weekday: "short",
    day: "numeric",
    month: "long",
  }).format(new Date(value));

const formatTime = (start: string, end?: string) => {
  const formatter = new Intl.DateTimeFormat("en-UG", {
    hour: "numeric",
    minute: "2-digit",
  });

  const startLabel = formatter.format(new Date(start));
  return end ? `${startLabel} - ${formatter.format(new Date(end))}` : startLabel;
};

export default function HomeEventHighlight({
  event,
}: {
  event: EventPromo;
}) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[36px] border border-brand-sageLight/70 bg-gradient-to-br from-brand-cream to-white p-6 shadow-sm lg:grid-cols-[0.75fr_1.25fr] lg:p-10">
        <div className="rounded-[28px] bg-brand-sageDark p-6 text-white lg:p-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-cream">
            <Sparkles className="h-4 w-4" />
            Upcoming Event
          </div>
          <h2 className="mt-6 text-3xl font-semibold leading-tight">
            {event.title}
          </h2>
          <p className="mt-4 leading-7 text-white/85">
            {event.summary ||
              "A special studio experience designed to bring movement, community, and ritual together."}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 text-brand-sageDark">
              <CalendarDays className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-[0.16em]">
                Date
              </span>
            </div>
            <p className="mt-3 text-xl font-semibold text-brand-charcoal">
              {formatDate(event.startDate)}
            </p>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 text-brand-sageDark">
              <Clock3 className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-[0.16em]">
                Time
              </span>
            </div>
            <p className="mt-3 text-xl font-semibold text-brand-charcoal">
              {formatTime(event.startDate, event.endDate)}
            </p>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 text-brand-sageDark">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-[0.16em]">
                Location
              </span>
            </div>
            <p className="mt-3 text-xl font-semibold text-brand-charcoal">
              {event.location || "Hey Pilates Studio"}
            </p>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 text-brand-sageDark">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-[0.16em]">
                Access
              </span>
            </div>
            <p className="mt-3 text-xl font-semibold text-brand-charcoal">
              {event.price || "Reserve to learn more"}
            </p>
          </div>

          <div className="sm:col-span-2 flex flex-wrap gap-4 pt-2">
            <Button
              href={event.bookingUrl || "/events"}
              className="bg-brand-sageDark text-white hover:bg-brand-sage"
            >
              Reserve Event Spot
            </Button>
            <Button href="/events" variant="secondary" className="text-brand-charcoal">
              View Event Details
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
