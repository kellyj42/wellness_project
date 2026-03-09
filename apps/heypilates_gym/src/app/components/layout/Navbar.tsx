// app/components/layout/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, User } from "lucide-react";
import { Button } from "../ui/Button";
import Image from "next/image";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Classes", href: "/classes" },
  { name: "Private Training", href: "/private-training" },
  { name: "Teachers", href: "/teachers" },
  { name: "Green Bean", href: "https://wellness-project-ibgi.vercel.app/" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed  top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/75 backdrop-blur-md shadow-medium py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="HeyPilates"
              width={320}
              height={120}
              priority
              className="h-14 w-56 object-cover"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative font-medium transition-colors ${
                  pathname === item.href
                    ? "text-brand-sageDark"
                    : "text-brand-charcoal hover:text-brand-sageDark"
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-brand-sageDark rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href={`https://wa.me/2567?text=${encodeURIComponent(
                "Hi HeyPilates! I clicked 'Order via WhatsApp'  on the Programs page. I'm ready to start but need help selecting the best program for my meal plan goals and understanding pricing and next steps.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="text-brand-charcoal hover:bg-brand-sageLight">
                Book  Class
              </Button>
            </Link>
            <Button
              href="/events"
              variant="secondary"
              className="text-brand-charcoal hover:bg-brand-sageLight"
            >
              Events
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-brand-charcoal hover:bg-brand-sageLight transition"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white/80 mt-4 pb-4 border-t border-brand-sageLight pt-4 animate-slide-up">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-brand-sageLight text-brand-sageDark"
                      : "text-brand-charcoal hover:bg-brand-sageLight"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-brand-sageLight space-y-3">
                <Button
                  href="/booking"
                  className="w-full bg-brand-sageDark hover:bg-brand-sage text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Book a Class
                </Button>
                <Button
                  href="/events"
                  variant="outline"
                  className="w-full border-brand-sageDark text-brand-sageDark hover:bg-brand-sageLight"
                  onClick={() => setIsOpen(false)}
                >
                  Events
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
