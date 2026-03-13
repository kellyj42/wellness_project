import type { Metadata } from "next";
import LegalPage from "@/app/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Hey Pilates",
  description: "Learn how Hey Pilates collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "Information We Collect",
    body: [
      "We may collect personal information that you choose to provide when you contact us, book a class, purchase a package, subscribe to updates, or complete a form on our website.",
      "This information may include your name, email address, phone number, payment-related details handled through secure third-party providers, emergency contact details, and any health or wellness information you voluntarily share for training or class participation.",
    ],
    bullets: [
      "Contact details such as your name, email address, and phone number.",
      "Booking and membership information such as class selections, attendance, and package usage.",
      "Messages or requests you send through our forms, email, WhatsApp, or social media.",
      "Basic technical data such as browser type, device information, and site usage analytics.",
    ],
  },
  {
    title: "How We Use Your Information",
    body: [
      "We use your information to operate our business, respond to your requests, manage bookings and memberships, deliver services safely, and improve the customer experience across our website and studio.",
      "We may also use your information to send service-related notices, policy updates, booking confirmations, and occasional marketing messages where permitted by law or where you have agreed to receive them.",
    ],
    bullets: [
      "To process class bookings, private sessions, purchases, and member support.",
      "To communicate with you about schedules, cancellations, updates, and inquiries.",
      "To maintain internal records, business reporting, and service quality improvements.",
      "To promote services, events, and special offers in line with your communication preferences.",
    ],
  },
  {
    title: "Sharing and Protecting Information",
    body: [
      "We do not sell your personal information. We may share limited information with trusted service providers that help us run our website, process payments, deliver emails, manage bookings, or provide analytics, but only as needed for legitimate business purposes.",
      "We take reasonable administrative, technical, and organizational steps to protect your information. However, no online system can guarantee absolute security, so you share information with us at your own risk.",
    ],
    bullets: [
      "Payment processors and booking systems that support studio operations.",
      "Email, analytics, and website service providers working on our behalf.",
      "Legal authorities or advisors when required to comply with applicable law or protect our rights.",
    ],
  },
  {
    title: "Your Choices and Rights",
    body: [
      "You may request access to, correction of, or deletion of your personal information, subject to applicable law and our legitimate recordkeeping needs. You may also opt out of marketing communications at any time by following the unsubscribe link or contacting us directly.",
      "If you believe your information has been used improperly or if you have privacy questions, please contact us so we can review and address the issue promptly.",
    ],
    bullets: [
      "Request a copy of the personal information we hold about you.",
      "Ask us to update inaccurate or incomplete information.",
      "Withdraw consent for marketing communications.",
      "Request deletion where retention is no longer necessary.",
    ],
  },
  {
    title: "Cookies and Third-Party Links",
    body: [
      "Our website may use cookies or similar technologies to improve performance, remember preferences, and measure website activity. You can manage cookie settings through your browser.",
      "Our website may also contain links to third-party sites or booking tools. We are not responsible for the privacy practices of websites or services we do not control.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy Policy"
      title="Your privacy matters to us."
      intro="This Privacy Policy explains how Hey Pilates may collect, use, store, and protect personal information when you visit our website, contact us, or use our services."
      lastUpdated="March 12, 2026"
      sections={sections}
    />
  );
}
