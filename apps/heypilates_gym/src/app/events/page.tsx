import type { Metadata } from "next";
import Image from "next/image";
import { CalendarDays, Clock3, MapPin, Sparkles, Users } from "lucide-react";
import { Button } from "../components/ui/Button";
import { defaultOgImage } from "../seo";
import { client } from "@/sanity/lib/client";
import { eventsQuery } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

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

type EventItem = {
  _id: string;
  title: string;
  slug?: string;
  summary?: string;
  description?: string;
  startDate: string;
  endDate?: string;
  location?: string;
  instructor?: string;
  price?: string;
  capacity?: number;
  tags?: string[];
  bookingUrl?: string;
  featured?: boolean;
  image?: {
    asset?: {
      url?: string;
    };
  };
};

const formatEventDate = (value: string) =>
  new Intl.DateTimeFormat("en-UG", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

const formatEventTime = (start: string, end?: string) => {
  const formatter = new Intl.DateTimeFormat("en-UG", {
    hour: "numeric",
    minute: "2-digit",
  });

  const startLabel = formatter.format(new Date(start));

  if (!end) {
    return startLabel;
  }

  return `${startLabel} - ${formatter.format(new Date(end))}`;
};

export default async function EventsPage() {
  const events = (await client.fetch(eventsQuery)) as EventItem[];
  const now = new Date();
  const upcomingEvents = events.filter(
    (event) => new Date(event.endDate || event.startDate) >= now,
  );
  const featuredEvent =
    upcomingEvents.find((event) => event.featured) ?? upcomingEvents[0];
  const otherEvents = upcomingEvents.filter(
    (event) => event._id !== featuredEvent?._id,
  );

  return (
    <div className="min-h-screen bg-brand-cream">
      <section className="relative overflow-hidden pt-28 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(169,183,154,0.35),rgba(244,246,241,0))]" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-sageLight/60 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-40 w-[70%] bg-[linear-gradient(90deg,rgba(169,183,154,0.2),rgba(244,246,241,0))]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark shadow-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Events & Workshops
            </span>
            <h1 className="mt-6 text-4xl font-semibold text-brand-charcoal sm:text-5xl">
              Studio experiences worth leaving the mat for.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-brand-muted sm:text-lg">
              Publish workshops, pop-ups, special classes, and community gatherings
              from Sanity and they will appear here automatically.
            </p>
          </div>

          {featuredEvent ? (
            <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <article className="overflow-hidden rounded-[36px] border border-white/60 bg-white shadow-lg">
                <div className="relative h-72 sm:h-96">
                  {featuredEvent.image?.asset?.url ? (
                    <Image
                      src={featuredEvent.image.asset.url}
                      alt={featuredEvent.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,#A9B79A,#F4F6F1)]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute left-6 top-6">
                    <span className="inline-flex items-center rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark shadow-sm">
                      Featured Event
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                    <h2 className="text-3xl font-semibold sm:text-4xl">
                      {featuredEvent.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                      {featuredEvent.summary || featuredEvent.description}
                    </p>
                  </div>
                </div>
              </article>

              <aside className="rounded-[36px] border border-white/60 bg-white/90 p-6 shadow-lg backdrop-blur-sm sm:p-8">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-2xl bg-brand-cream/70 p-4">
                    <div className="flex items-center gap-3 text-brand-sageDark">
                      <CalendarDays className="h-5 w-5" />
                      <span className="text-sm font-semibold uppercase tracking-[0.16em]">
                        Date
                      </span>
                    </div>
                    <p className="mt-3 text-lg font-semibold text-brand-charcoal">
                      {formatEventDate(featuredEvent.startDate)}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-brand-cream/70 p-4">
                    <div className="flex items-center gap-3 text-brand-sageDark">
                      <Clock3 className="h-5 w-5" />
                      <span className="text-sm font-semibold uppercase tracking-[0.16em]">
                        Time
                      </span>
                    </div>
                    <p className="mt-3 text-lg font-semibold text-brand-charcoal">
                      {formatEventTime(
                        featuredEvent.startDate,
                        featuredEvent.endDate,
                      )}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-brand-cream/70 p-4">
                    <div className="flex items-center gap-3 text-brand-sageDark">
                      <MapPin className="h-5 w-5" />
                      <span className="text-sm font-semibold uppercase tracking-[0.16em]">
                        Location
                      </span>
                    </div>
                    <p className="mt-3 text-lg font-semibold text-brand-charcoal">
                      {featuredEvent.location || "Hey Pilates Studio"}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-brand-cream/70 p-4">
                    <div className="flex items-center gap-3 text-brand-sageDark">
                      <Users className="h-5 w-5" />
                      <span className="text-sm font-semibold uppercase tracking-[0.16em]">
                        Access
                      </span>
                    </div>
                    <p className="mt-3 text-lg font-semibold text-brand-charcoal">
                      {featuredEvent.price || "Price on request"}
                    </p>
                    {featuredEvent.capacity ? (
                      <p className="mt-1 text-sm text-brand-muted">
                        Limited to {featuredEvent.capacity} guests
                      </p>
                    ) : null}
                  </div>
                </div>

                {featuredEvent.tags?.length ? (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {featuredEvent.tags.map((tag) => (
                      <span
                        key={`${featuredEvent._id}-${tag}`}
                        className="rounded-full border border-brand-sageLight bg-white px-3 py-1 text-xs font-medium text-brand-sageDark"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button
                    href={
                      featuredEvent.bookingUrl ||
                      "https://studiobookingonline.com/heypilatesstudiokla/classes.html"
                    }
                    className="bg-brand-sageDark text-white hover:bg-brand-sage"
                  >
                    Reserve your spot
                  </Button>
                  <Button
                    href="/contact"
                    variant="secondary"
                    className="text-brand-charcoal"
                  >
                    Ask about private events
                  </Button>
                </div>
              </aside>
            </div>
          ) : (
            <div className="mt-12 max-w-4xl">
              <div className="rounded-[36px] border border-white/60 bg-white/80 px-6 py-12 text-center shadow-lg sm:px-10">
                <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-brand-sageLight px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark">
                  Events Notice
                </span>
                <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-cream">
                  <CalendarDays className="h-8 w-8 text-brand-sageDark" />
                </div>
                <h2 className="mt-6 text-3xl font-semibold text-brand-charcoal sm:text-4xl">
                  No events are scheduled right now.
                </h2>
                <p className="mt-4 text-base text-brand-muted sm:text-lg">
                  Publish an event in Sanity and it will show up here automatically.
                  Until then, guests can still join your regular class schedule.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Button
                    href="/contact"
                    className="bg-brand-sageDark text-white hover:bg-brand-sage"
                  >
                    Contact us
                  </Button>
                  <Button
                    href="https://studiobookingonline.com/heypilatesstudiokla/classes.html"
                    variant="secondary"
                    className="text-brand-charcoal"
                  >
                    View classes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {otherEvents.length > 0 && (
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-sageDark">
                  Upcoming Calendar
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-brand-charcoal">
                  More coming up at the studio
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-brand-muted sm:text-base">
                Keep this section updated from Sanity whenever you launch a new workshop,
                pop-up, challenge, or community event.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {otherEvents.map((event) => (
                <article
                  key={event._id}
                  className="overflow-hidden rounded-[28px] border border-brand-sageLight/70 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-56">
                    {event.image?.asset?.url ? (
                      <Image
                        src={event.image.asset.url}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,#A9B79A,#F4F6F1)]" />
                    )}
                  </div>

                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-sageDark">
                      {formatEventDate(event.startDate)}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-brand-charcoal">
                      {event.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-brand-muted">
                      {event.summary || event.description}
                    </p>

                    <div className="mt-5 grid gap-3 text-sm text-brand-muted">
                      <div className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4 text-brand-sageDark" />
                        <span>{formatEventTime(event.startDate, event.endDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-brand-sageDark" />
                        <span>{event.location || "Hey Pilates Studio"}</span>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted">
                          Price
                        </p>
                        <p className="mt-1 text-lg font-semibold text-brand-charcoal">
                          {event.price || "Price on request"}
                        </p>
                      </div>
                      <Button
                        href={
                          event.bookingUrl ||
                          "https://studiobookingonline.com/heypilatesstudiokla/classes.html"
                        }
                        className="bg-brand-sageDark text-white hover:bg-brand-sage"
                      >
                        Book event
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
