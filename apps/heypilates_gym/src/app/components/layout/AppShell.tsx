"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import KlaudiaChatWidget from "../chatbot/KlaudiaChatWidget";
import EventAnnouncementBar from "../events/EventAnnouncementBar";
import FloatingEventPill from "../events/FloatingEventPill";

type ChatbotData = {
  isActive?: boolean;
} & Record<string, unknown>;

type AppShellProps = {
  children: React.ReactNode;
  chatbotData?: ChatbotData;
  eventPromo?: {
    title: string;
    startDate: string;
    price?: string;
    bookingUrl?: string;
  };
};

export default function AppShell({
  children,
  chatbotData,
  eventPromo,
}: AppShellProps) {
  const pathname = usePathname();
  const hideChrome = pathname?.startsWith("/sanity");

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <div>
        {eventPromo ? <EventAnnouncementBar event={eventPromo} /> : null}
        <Navbar hasAnnouncement={Boolean(eventPromo)} />
      </div>
      {eventPromo ? <div className="h-[49px]" /> : null}
      {children}
      {eventPromo ? <FloatingEventPill event={eventPromo} /> : null}
      {chatbotData?.isActive ? <KlaudiaChatWidget data={chatbotData} /> : null}
      <Footer />
    </>
  );
}
