import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-light text-[#2E2A26] mb-4">
          Privacy Policy
        </h1>
        <p className="text-[#5B544D] mb-12">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-[#2E2A26] mb-4">
              1. Introduction
            </h2>
            <p className="text-[#5B544D] leading-relaxed">
              Green Bean ("we," "our," or "us") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use, and
              safeguard your personal information when you use our meal delivery
              and nutrition coaching services in Kampala, Uganda.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2E2A26] mb-4">
              2. Information We Collect
            </h2>
            <p className="text-[#5B544D] leading-relaxed mb-3">
              We collect the following types of information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#5B544D] ml-4">
              <li>
                <strong>Contact Information:</strong> Name, phone number, email
                address, and delivery address
              </li>
              <li>
                <strong>Health Information:</strong> Dietary preferences,
                allergies, health goals, and nutrition-related information you
                voluntarily provide
              </li>
              <li>
                <strong>Order Information:</strong> Meal plan selections,
                delivery preferences, and payment details
              </li>
              <li>
                <strong>Communication:</strong> Messages sent via WhatsApp,
                email, or our contact forms
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2E2A26] mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-[#5B544D] leading-relaxed mb-3">
              We use your information to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#5B544D] ml-4">
              <li>Prepare and deliver your meals</li>
              <li>Provide personalized nutrition guidance and coaching</li>
              <li>Process payments and manage your account</li>
              <li>Communicate with you about orders, updates, and services</li>
              <li>Improve our meal plans and service quality</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2E2A26] mb-4">
              4. Information Sharing
            </h2>
            <p className="text-[#5B544D] leading-relaxed">
              We do not sell your personal information. We may share your
              information with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#5B544D] ml-4 mt-3">
              <li>
                <strong>Delivery Partners:</strong> To fulfill meal deliveries
              </li>
              <li>
                <strong>Payment Processors:</strong> To process transactions
                securely
              </li>
              <li>
                <strong>Legal Authorities:</strong> When required by law or to
                protect our rights
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2E2A26] mb-4">
              5. Data Security
            </h2>
            <p className="text-[#5B544D] leading-relaxed">
              We implement reasonable security measures to protect your personal
              information from unauthorized access, disclosure, or misuse.
              However, no method of transmission over the internet is 100%
              secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2E2A26] mb-4">
              6. Your Rights
            </h2>
            <p className="text-[#5B544D] leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#5B544D] ml-4">
              <li>Access the personal information we hold about you</li>
              <li>Request corrections to inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2E2A26] mb-4">
              7. Cookies and Tracking
            </h2>
            <p className="text-[#5B544D] leading-relaxed">
              Our website may use cookies and similar technologies to improve
              your browsing experience and analyze website traffic. You can
              control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2E2A26] mb-4">
              8. Children's Privacy
            </h2>
            <p className="text-[#5B544D] leading-relaxed">
              Our services are not intended for children under 18. We do not
              knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2E2A26] mb-4">
              9. Changes to This Policy
            </h2>
            <p className="text-[#5B544D] leading-relaxed">
              We may update this Privacy Policy from time to time. We will
              notify you of significant changes by posting the new policy on
              this page with an updated "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2E2A26] mb-4">
              10. Contact Us
            </h2>
            <p className="text-[#5B544D] leading-relaxed mb-3">
              If you have questions about this Privacy Policy or how we handle
              your information, please contact us:
            </p>
            <div className="bg-[#F5F3EE] p-6 rounded-lg">
              <p className="text-[#2E2A26] font-medium mb-2">Green Bean</p>
              <p className="text-[#5B544D] text-sm mb-1">
                Location: CrossFit Kampala, Naguru, Kampala, Uganda
              </p>
              <p className="text-[#5B544D] text-sm mb-1">
                WhatsApp:{" "}
                <a
                  href="https://wa.me/256781719687"
                  className="text-[#A3AD5F] hover:underline"
                >
                  +256 781 719687
                </a>
              </p>
              <p className="text-[#5B544D] text-sm">
                WhatsApp:{" "}
                <a
                  href="https://wa.me/256772774512"
                  className="text-[#A3AD5F] hover:underline"
                >
                  +256 772 774512
                </a>
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block bg-[#A3AD5F] text-[#2E2A26] px-8 py-3 rounded-full font-medium hover:bg-[#B8C474] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
