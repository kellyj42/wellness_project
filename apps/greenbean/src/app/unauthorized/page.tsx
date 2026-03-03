import { Lock, Home, Mail } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F4EF] to-[#E8E4DB] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Lock Icon */}
        <div className="mb-4 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-[#A3AD5F]/20 rounded-full blur-xl scale-150"></div>
            <div className="relative bg-white rounded-full p-4 shadow-lg">
              <Lock className="w-12 h-12 text-[#6B7D6D]" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-serif text-[#2E2A26] mb-3">
          Access Denied
        </h1>

        {/* Subheading */}
        <p className="text-[#5B544D] text-lg mb-2">This area is restricted</p>

        {/* Description */}
        <p className="text-[#6B7D6D] mb-8 leading-relaxed">
          The Sanity Studio requires authentication. If you're the developer,
          please provide the correct access token.
        </p>

        {/* Token Info Box */}
        <div className="bg-white border-2 border-[#A3AD5F]/30 rounded-2xl p-6 mb-4">
          <p className="text-sm text-[#6B7D6D] mb-3">
            To access the studio, use:
          </p>
          <code className="block bg-[#F6F4EF] text-[#6E7A3C] px-4 py-3 rounded-lg text-sm font-mono break-all">
            /sanity?token=YOUR_TOKEN
          </code>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full bg-[#A3AD5F] text-[#2E2A26] px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

        {/* Support Section */}
        <div className="pt-6 border-t border-[#A3AD5F]/20">
          <p className="text-sm text-[#6B7D6D] mb-3">
            Need help accessing the studio?
          </p>
          <a
            href="mailto:support@greenbean.local"
            className="inline-flex items-center justify-center gap-2 text-[#A3AD5F] hover:text-[#6B7D6D] font-medium transition-colors"
          >
            <Mail className="w-4 h-4" />
            Contact Support
          </a>
        </div>

        {/* Footer Message */}
        <p className="text-xs text-[#9B9186] mt-8">
          For security reasons, this page is protected.
        </p>
      </div>
    </div>
  );
}
