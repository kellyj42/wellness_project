// app/components/layout/Footer.tsx
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-white to-brand-sageLight mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div>
            <div className="">
              <Image
                src="/logo.png"
                alt="HeyPilates"
                width={320}
                height={120}
                priority
                className="h-14 w-60 object-cover"
              />
            </div>
            <p className="text-brand-muted mb-6">
              Transformative movement experiences in the heart of Kampala.
              Building strength, balance, and community.
            </p>
          
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-brand-charcoal mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/classes"
                  className="text-brand-muted hover:text-brand-sageDark transition"
                >
                  Class Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="/private-training"
                  className="text-brand-muted hover:text-brand-sageDark transition"
                >
                  Private Training
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-brand-muted hover:text-brand-sageDark transition"
                >
                  Pricing & Packages
                </Link>
              </li>

              <li>
                <Link
                  href="/testimonials"
                  className="text-brand-muted hover:text-brand-sageDark transition"
                >
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold text-brand-charcoal mb-6">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/events"
                  className="text-brand-muted hover:text-brand-sageDark transition"
                >
                  Events & Workshops
                </Link>
              </li>
             
              <li>
                <Link
                  href="/corporate"
                  className="text-brand-muted hover:text-brand-sageDark transition"
                >
                  Corporate Wellness
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-brand-charcoal mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-sageDark mt-1 flex-shrink-0" />
                <span className="text-brand-muted">
                  Kampala, Uganda
                  <br />
                  <span className="text-sm">
                   Plot 18 Bandali rise, bugolobi-kampala 
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-sageDark jj-shrink-0" />
                <p
                  className="text-brand-muted hover:text-brand-sageDark transition"
                >
                  +256 749103139
                </p>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-sageDark flex-shrink-0" />
                <a
                  href="mailto:hello@heypilates.com"
                  className="text-brand-muted hover:text-brand-sageDark transition"
                >
                  heypilatesstudio@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-brand-sageLight mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-brand-muted text-sm">
              © {currentYear} Hey Pilates. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-brand-muted">
              <Link
                href="/privacy"
                className="hover:text-brand-sageDark transition"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-brand-sageDark transition"
              >
                Terms of Service
              </Link>
              <Link
                href="/cancellation"
                className="hover:text-brand-sageDark transition"
              >
                Cancellation Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
