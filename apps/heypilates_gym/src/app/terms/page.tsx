import type { Metadata } from "next";
import LegalPage from "@/app/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | Hey Pilates",
  description: "Review the general terms and conditions for using the Hey Pilates website and services.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    body: [
      "By accessing our website, booking a class, purchasing a package, or participating in our services, you agree to be bound by these Terms of Service. If you do not agree, please do not use the website or services.",
      "These terms are intended to provide a general framework for website use, class participation, bookings, payments, and customer conduct.",
    ],
  },
  {
    title: "Services and Eligibility",
    body: [
      "We offer fitness, wellness, Pilates, private training, and related services that may change over time. Availability, schedules, instructors, pricing, and service details may be updated without prior notice.",
      "You are responsible for ensuring that you are physically able to participate in classes or training sessions. If you have a medical condition, injury, or pregnancy-related concern, you should seek medical advice before participating.",
    ],
    bullets: [
      "You must provide accurate booking and contact information.",
      "You should arrive on time and follow staff instructions during sessions.",
      "You are responsible for disclosing relevant health concerns where appropriate.",
    ],
  },
  {
    title: "Payments, Packages, and Pricing",
    body: [
      "All prices, memberships, class packs, and promotional offers are subject to change. Payments are due according to the terms shown at the time of booking or purchase.",
      "Packages and memberships may carry their own usage limits, activation periods, expiry dates, or studio rules. Unless stated otherwise, unused sessions or services are non-transferable and non-refundable.",
    ],
    bullets: [
      "Payment must be completed before access to certain services is confirmed.",
      "Discounts and promotions may be limited by time, availability, or eligibility.",
      "We reserve the right to correct pricing errors or cancel bookings affected by clear mistakes.",
    ],
  },
  {
    title: "Conduct, Safety, and Liability",
    body: [
      "We aim to maintain a safe, respectful, and welcoming environment. We may refuse service or remove any person whose behavior is unsafe, disruptive, abusive, discriminatory, or otherwise inconsistent with studio expectations.",
      "Participation in physical activity carries inherent risk. To the fullest extent permitted by law, you accept responsibility for your own participation and release us from liability for injuries, losses, or damages except where caused by our proven negligence or as otherwise required by law.",
    ],
    bullets: [
      "Follow instructor guidance and use equipment responsibly.",
      "Respect other clients, staff, studio property, and shared spaces.",
      "Stop participating and notify staff if you feel pain, dizziness, or discomfort.",
    ],
  },
  {
    title: "Website Use and Intellectual Property",
    body: [
      "All content on this website, including text, design, branding, images, graphics, and logos, is owned by or licensed to the business unless otherwise stated. You may not copy, reproduce, modify, or distribute website content without permission.",
      "You agree not to misuse the website, attempt unauthorized access, introduce harmful code, or use the site in a way that disrupts normal operations.",
    ],
  },
  {
    title: "Changes to Terms",
    body: [
      "We may update these terms from time to time. Updated terms become effective when posted on the website unless a different effective date is stated.",
      "Your continued use of the website or services after changes are posted means you accept the updated terms.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms of Service"
      title="General terms for using our website and services."
      intro="These Terms of Service outline the general conditions that apply when you browse our website, make a booking, purchase a package, or participate in our classes and training services."
      lastUpdated="March 12, 2026"
      sections={sections}
    />
  );
}
