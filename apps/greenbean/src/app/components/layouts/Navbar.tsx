// components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links configuration
  const navLinks = [
    { href: "/meal-plans", label: "Meal Plans" },
    {
      href: "/programs",
      label: "Programs",
      hasDropdown: true,
      dropdownItems: [
        { href: "/programs/weight-loss", label: "Weight Loss" },
        { href: "/programs/muscle-gain", label: "Muscle Gain" },
        { href: "/programs/wellness", label: "Wellness" },
      ],
    },
    { href: "/coaching", label: "Nutrition Coaching" },
    { href: "/menu", label: "Menu" },
    { href: "/contact-page", label: "Contact" },
  ];

  // Helper to check if a link (or its dropdown) is active
  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`w-full '] fixed top-0 z-50 transition-all duration-100
        ${
          isScrolled
            ? "bg-[#5B544D]/50 backdrop-blur-sm shadow-lg "
            : "bg-[#5B544D] py-1"
        }
        text-[#F5F3EE]
      `}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className=" font-light tracking-wide hover:opacity-80 transition-opacity"
        >
          <Image
            src="/gb.png"
            alt="Green Bean"
            width={140}
            height={36}
            className="h-20 w-52 object-cover"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm">
          {navLinks.map((link) => (
            <div key={link.href} className="relative group">
              <Link
                href={link.href}
                className={`px-2 py-1 inline-block transition-all duration-200
                  ${
                    isActive(link.href)
                      ? "text-[#F5F3EE] font-medium border-b-2 border-[#A3AD5F]"
                      : "text-[#F5F3EE]/80 hover:text-[#F5F3EE]"
                  }
                `}
              >
                {link.label}
              </Link>

              {/* Dropdown Menu */}
              {link.hasDropdown && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-50">
                  <div className="py-2">
                    {link.dropdownItems?.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#F5F3EE] hover:text-[#2E2A26] transition-colors duration-150"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  {/* Tiny caret */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div>
                </div>
              )}
            </div>
          ))}

          {/* Reviews Link */}
          <Link
            href="/reviews"
            className="flex items-center gap-1.5 px-2 py-1 text-[#F5F3EE]/80 hover:text-[#FFC244] transition-colors duration-200 group"
          >
            <Star className="w-4 h-4 fill-[#FFC244] text-[#FFC244] group-hover:scale-110 transition-transform" />
            <span className="text-sm">Reviews</span>
          </Link>
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/meal-plans"
          className="hidden md:inline-block bg-[#A3AD5F] text-[#2E2A26] px-5 py-2 rounded-full text-sm font-medium hover:bg-[#B8C474] hover:shadow-lg active:scale-95 transition-all duration-200"
        >
          Get Started
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-[#F5F3EE] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A3AD5F] transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <svg
            className="w-6 h-6 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#5B544D] border-t border-[#F5F3EE]/20 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 py-5 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                className={`
                  block py-2 text-sm transition-colors
                  ${
                    isActive(link.href)
                      ? "text-[#F5F3EE] font-medium"
                      : "text-[#F5F3EE]/80 hover:text-[#F5F3EE]"
                  }
                `}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
              {/* Mobile dropdown items (shown inline) */}
              {link.hasDropdown && isMobileMenuOpen && (
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-[#A3AD5F]/30">
                  {link.dropdownItems?.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block py-1.5 text-sm text-[#F5F3EE]/70 hover:text-[#F5F3EE]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
           <Link
            href="/reviews"
            className="flex items-center justify-center gap-2 py-2 text-[#F5F3EE]/80 hover:text-[#FFC244] transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Star className="w-4 h-4 fill-[#FFC244] text-[#FFC244]" />
            <span className="text-sm">Reviews</span>
          </Link>
          <Link
            href="/meal-plans"
            className="bg-[#A3AD5F] text-[#2E2A26] px-5 py-2.5 rounded-full text-sm font-medium text-center hover:bg-[#B8C474] transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get Started
          </Link>

          {/* Reviews Link - Mobile */}
         
        </div>
      </div>
    </header>
  );
}
