import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-light text-[#2E2A26] mb-4">
          Terms & Conditions
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
              1. Agreement to Terms
            </h2>
            <p className="text-[#5B544D] leading-relaxed">
              By accessing or using Green Bean's services, including meal
              delivery, meal plans, and nutrition coaching, you agree to be
              bound by these Terms & Conditions. If you do not agree with any
              part of these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2E2A26] mb-4">
              2. Services Offered
            </h2>
            <p className="text-[#5B544D] leading-relaxed mb-3">
              Green Bean provides:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#5B544D] ml-4">
              <li>
                Structured meal plans (weight loss, performance, lean plans)
              </li>
              <li>Daily takeaway meals</li>
              <li>Nutrition coaching services</li>
              <li>Meal pickup and delivery in Kampala, Uganda</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2E2A26] mb-4">
              3. Orders and Payment
            </h2>
            <div className="space-y-3 text-[#5B544D]">
              <p className="leading-relaxed">
                <strong>3.1 Placing Orders:</strong> Orders can be placed via
                WhatsApp or through our approved channels. All orders are
                subject to availability and acceptance.
              </p>
              <p className="leading-relaxed">
                <strong>3.2 Payment Terms:</strong> Payment is required at the
                time of order or as agreed upon for subscription meal plans.
                Accepted payment methods include mobile money and bank transfer.
              </p>
              <p className="leading-relaxed">
                <strong>3.3 Pricing:</strong> All prices are listed in Ugandan
                Shillings (UGX) and are subject to change without notice.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2E2A26] mb-4">
              4. Meal Plans and Subscriptions
            </h2>
            <div className="space-y-3 text-[#5B544D]">
              <p className="leading-relaxed">
                <strong>4.1 Commitment:</strong> Meal plans may be offered on a
                daily, weekly, or monthly basis. Subscription terms will be
                clearly communicated at the time of purchase.
              </p>
              <p className="leading-relaxed">
                <strong>4.2 Modifications:</strong> You may request changes to
                your meal plan based on availability. Please contact us at least
                24 hours in advance.
              </p>
              <p className="leading-relaxed">
                <strong>4.3 Cancellations:</strong> Cancellation policies vary
                by plan. Daily orders can be cancelled with 24 hours notice.
                Weekly/monthly plans require advance notice as specified in your
                agreement.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2E2A26] mb-4">
              5. Delivery and Pickup
            </h2>
            <div className="space-y-3 text-[#5B544D]">
              <p className="leading-relaxed">
                <strong>5.1 Delivery Areas:</strong> We deliver within Kampala,
                Uganda. Delivery fees may apply based on location.
              </p>
              <p className="leading-relaxed">
                <strong>5.2 Pickup:</strong> Meals can be picked up at our
                kitchen location (CrossFit Kampala, Naguru) during operating
                hours.
              </p>
              <p className="leading-relaxed">
                <strong>5.3 Delivery Times:</strong> We aim to deliver within
                the agreed timeframe. Delays may occur due to traffic or
                unforeseen circumstances.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2E2A26] mb-4">
              6. Food Safety and Allergies
            </h2>
            <div className="space-y-3 text-[#5B544D]">
              <p className="leading-relaxed">
                <strong>6.1 Allergen Information:</strong> It is your
                responsibility to inform us of any food allergies or dietary
                restrictions before placing an order.
              </p>
              <p className="leading-relaxed">
                <strong>6.2 Cross-Contamination:</strong> While we take care to
                prepare meals according to your specifications, our kitchen
                handles various ingredients and we cannot guarantee
                cross-contamination will not occur.
              </p>
              <p className="leading-relaxed">
                <strong>6.3 Freshness:</strong> Meals are prepared fresh daily.
                Please consume within recommended timeframes and follow storage
                instructions provided.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2E2A26] mb-4">
              7. Nutrition Coaching
            </h2>
            <div className="space-y-3 text-[#5B544D]">
              <p className="leading-relaxed">
                <strong>7.1 Professional Guidance:</strong> Our nutrition
                coaching services provide general guidance and are not a
                substitute for medical advice. Always consult a healthcare
                provider before starting any diet or wellness program.
              </p>
              <p className="leading-relaxed">
                <strong>7.2 Results:</strong> Individual results vary. We do not
                guarantee specific outcomes from following our meal plans or
                coaching programs.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2E2A26] mb-4">
              8. Refunds and Complaints
            </h2>
            <div className="space-y-3 text-[#5B544D]">
              <p className="leading-relaxed">
                <strong>8.1 Quality Issues:</strong> If you receive a meal that
                does not meet quality standards, please contact us immediately.
                We will assess the issue and provide a replacement or refund at
                our discretion.
              </p>
              <p className="leading-relaxed">
                <strong>8.2 Refund Policy:</strong> Refunds are evaluated on a
                case-by-case basis. Meal plans are generally non-refundable once
                prepared.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2E2A26] mb-4">
              9. Limitation of Liability
            </h2>
            <p className="text-[#5B544D] leading-relaxed">
              Green Bean shall not be liable for any indirect, incidental, or
              consequential damages arising from the use of our services. Our
              total liability shall not exceed the amount paid for the specific
              service in question.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2E2A26] mb-4">
              10. Intellectual Property
            </h2>
            <p className="text-[#5B544D] leading-relaxed">
              All content on our website, including text, images, logos, and
              meal plans, is the property of Green Bean and protected by
              copyright laws. You may not reproduce or distribute our content
              without permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2E2A26] mb-4">
              11. User Conduct
            </h2>
            <p className="text-[#5B544D] leading-relaxed mb-3">You agree to:</p>
            <ul className="list-disc list-inside space-y-2 text-[#5B544D] ml-4">
              <li>Provide accurate information when placing orders</li>
              <li>Not use our services for unlawful purposes</li>
              <li>Respect our staff and delivery personnel</li>
              <li>Pay for services rendered in a timely manner</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2E2A26] mb-4">
              12. Governing Law
            </h2>
            <p className="text-[#5B544D] leading-relaxed">
              These Terms & Conditions are governed by the laws of Uganda. Any
              disputes shall be resolved in the courts of Kampala, Uganda.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2E2A26] mb-4">
              13. Changes to Terms
            </h2>
            <p className="text-[#5B544D] leading-relaxed">
              We reserve the right to modify these terms at any time. Continued
              use of our services after changes constitutes acceptance of the
              updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2E2A26] mb-4">
              14. Contact Information
            </h2>
            <p className="text-[#5B544D] leading-relaxed mb-3">
              For questions about these Terms & Conditions or our services,
              please contact:
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

          <section className="border-t border-[#E2DDD2] pt-6">
            <p className="text-sm text-[#5B544D] italic">
              By using Green Bean's services, you acknowledge that you have
              read, understood, and agree to be bound by these Terms &
              Conditions.
            </p>
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
