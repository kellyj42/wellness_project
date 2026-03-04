// components/layout/Footer.tsx

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#2E2A26] text-[#F5F3EE] relative">
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#A3AD5F] via-[#6E7A3C] to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 grid md:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="md:col-span-1">
          <div className="">
            <Image
              src="/gblogo.png"
              alt="Green Bean"
              width={160}
              height={60}
              className=" "
            />
          </div>

          <p className="text-sm text-[#CFCBC4] leading-relaxed">
            Structured Nutrition.
            <br />
            Sustainable Results.
          </p>

          <p className="mt-4 text-xs text-[#A3AD5F] uppercase tracking-wider">
            Kampala, Uganda
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-6 text-sm uppercase tracking-widest text-[#A3AD5F]">
            Explore
          </h4>

          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/meal-plans"
                className="hover:text-[#A3AD5F] transition"
              >
                Meal Plans
              </Link>
            </li>
            <li>
              <Link
                href="/programs"
                className="hover:text-[#A3AD5F] transition"
              >
                Programs
              </Link>
            </li>
            <li>
              <Link
                href="/coaching"
                className="hover:text-[#A3AD5F] transition"
              >
                Nutrition Coaching
              </Link>
            </li>
            <li>
              <Link href="/menu" className="hover:text-[#A3AD5F] transition">
                Daily Menu
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="mb-6 text-sm uppercase tracking-widest text-[#A3AD5F]">
            Support
          </h4>

          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/contact" className="hover:text-[#A3AD5F] transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-[#A3AD5F] transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-[#A3AD5F] transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Call To Action */}
        <div>
          <h4 className="mb-6 text-sm uppercase tracking-widest text-[#A3AD5F]">
            Start Your Journey
          </h4>

          <p className="text-sm text-[#CFCBC4] mb-6 leading-relaxed">
            Ready to feel stronger, more energized, and in control of your
            health?
          </p>

          <a
            href={`https://wa.me/256772774512?text=${encodeURIComponent(
              "Hi Green Bean! I clicked 'Chat on WhatsApp' from the website. I'd like guidance on the best meal plan/coaching option for my goals and how to get started.",
            )}`}
            className="inline-block bg-[#A3AD5F] text-[#2E2A26] px-6 py-3 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-300"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#5B544D] py-6 text-center text-sm text-[#CFCBC4]">
        © {new Date().getFullYear()} Green Bean. All rights reserved.
      </div>
    </footer>
  );
}
