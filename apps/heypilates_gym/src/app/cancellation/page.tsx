import type { Metadata } from "next";
import LegalPage from "@/app/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Cancellation Policy | Hey Pilates",
  description: "Read the general cancellation, rescheduling, and no-show policy for Hey Pilates bookings and services.",
};

const sections = [
  {
    title: "General Booking Policy",
    body: [
      "Class spots, private sessions, workshops, and other appointments may be limited, so bookings are reserved specifically for you once confirmed. Because availability is planned around those reservations, cancellations and changes may be subject to notice periods and fees.",
      "This policy is designed to be fair to clients, instructors, and the business while helping maintain a consistent schedule.",
    ],
  },
  {
    title: "Cancellations and Rescheduling",
    body: [
      "You may cancel or reschedule an eligible booking within the applicable notice window shown at the time of booking or communicated by the studio. Changes made after that period may be treated as late cancellations.",
      "Where no separate service-specific rule is stated, a reasonable general policy may apply, such as requiring advance notice for classes and private sessions to preserve credit or avoid a fee.",
    ],
    bullets: [
      "Bookings cancelled with sufficient notice may be rescheduled or credited, depending on the service purchased.",
      "Late cancellations may result in loss of session credit, forfeiture of payment, or a cancellation fee.",
      "Repeated late changes may affect future booking privileges.",
    ],
  },
  {
    title: "No-Shows",
    body: [
      "If you do not attend a booked class or session and do not provide the required notice, the booking may be treated as a no-show. No-shows typically result in loss of the booked session, credit, or fee paid for that reservation.",
      "We reserve the right to apply stricter measures to repeated no-shows where necessary to protect schedule availability for other clients.",
    ],
  },
  {
    title: "Studio-Initiated Changes",
    body: [
      "We may occasionally need to cancel, reschedule, substitute instructors, adjust class formats, or change service availability due to illness, demand, emergencies, maintenance, weather, or other operational needs.",
      "If we cancel a booking directly, we will generally offer a reschedule, credit, or refund as appropriate for the affected service.",
    ],
  },
  {
    title: "Refunds and Package Use",
    body: [
      "Unless required by law or stated otherwise in a specific offer, completed services, expired packages, missed sessions, and late cancellations are generally non-refundable. Any refund, credit, or transfer remains at the business's discretion unless otherwise promised in writing.",
      "Packages, memberships, and promotional purchases may be subject to separate terms regarding activation, expiry, suspension, or transferability.",
    ],
    bullets: [
      "Unused services may expire according to package or membership terms.",
      "Refund requests should be submitted promptly with any relevant booking details.",
      "Approved credits may need to be used within a stated time period.",
    ],
  },
  {
    title: "How to Cancel or Request Help",
    body: [
      "To avoid confusion, cancellations and rescheduling requests should be made through the official booking platform or the contact method provided by the business. Please keep confirmation messages or receipts for reference when needed.",
      "If you have an emergency or exceptional situation, contact us as soon as possible. While exceptions are not guaranteed, we may review requests in good faith on a case-by-case basis.",
    ],
  },
];

export default function CancellationPage() {
  return (
    <LegalPage
      eyebrow="Cancellation Policy"
      title="A clear guide to cancellations, no-shows, and booking changes."
      intro="This Cancellation Policy explains the general rules that may apply when you cancel, reschedule, miss, or request changes to classes, private sessions, workshops, memberships, or other fitness and wellness services."
      lastUpdated="March 12, 2026"
      sections={sections}
    />
  );
}
