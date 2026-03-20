import { client } from "@/sanity/lib/client";
import { contactQuery } from "@/sanity/lib/queries";
import ContactForm from "../components/section/ContactForm";
import type { Metadata } from "next";
import { defaultOgImage } from "../seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Hey Pilates Studio",
  description:
    "Contact Hey Pilates Studio in Kampala for class bookings, private training, studio information, and partnership inquiries.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Hey Pilates Studio",
    description:
      "Get in touch with Hey Pilates Studio in Kampala for classes, private training, and studio inquiries.",
    url: "/contact",
    images: [defaultOgImage],
  },
};

export default async function ContactPage() {
  const contactInfo = await client.fetch(contactQuery);

  return (
    <main>
      <ContactForm contactInfo={contactInfo} />
    </main>
  );
}
