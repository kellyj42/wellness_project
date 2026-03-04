import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

export default function CoachingPackages() {
  return (
    <section className="bg-white py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F3EE] to-white opacity-30" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Sparkles className="w-10 h-10 text-[#6E7A3C] mx-auto mb-4" />
          <h2 className="text-4xl font-light mb-4">1:1 Nutrition Coaching</h2>
          <p className="text-xl text-[#5B544D] max-w-2xl mx-auto">
            Structured, personalized, and designed for real transformation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group bg-white p-10 rounded-3xl border border-[#D9D4CB] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-medium">Single Strategy Session</h3>
              <span className="bg-[#E8ECCf] text-[#6E7A3C] text-xs font-bold px-3 py-1 rounded-full">
                START HERE
              </span>
            </div>
            <p className="text-[#5B544D] mb-8">
              Perfect for a reset or starting point.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#6E7A3C] flex-shrink-0 mt-1" />
                <span className="text-[#5B544D]">
                  Comprehensive Body Analysis
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#6E7A3C] flex-shrink-0 mt-1" />
                <span className="text-[#5B544D]">Personalized Meal Plan</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#6E7A3C] flex-shrink-0 mt-1" />
                <span className="text-[#5B544D]">Goal Strategy Session</span>
              </li>
            </ul>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-[#6E7A3C]">
                150,000 UGX
              </span>
              <a
                href={`https://wa.me/256772774512?text=${encodeURIComponent(
                  "Hi Green Bean! I clicked 'Book via WhatsApp' for the Single Strategy Session (150,000 UGX) on the Coaching Packages section. I'd like to book this session and know the next available slots.",
                )}`}
                className="inline-flex items-center gap-2 bg-[#6E7A3C] text-white px-6 py-3 rounded-full font-medium hover:bg-[#5A6630] transition shadow-md hover:shadow-lg"
              >
                Book via WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group bg-[#F5F3EE] p-10 rounded-3xl border-2 border-[#A3AD5F] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative"
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#6E7A3C] text-white px-6 py-1 rounded-full text-sm font-medium">
              BEST VALUE
            </div>
            <h3 className="text-2xl font-medium mb-6">
              4-Session Transformation Package
            </h3>
            <p className="text-[#5B544D] mb-8">
              Best for long-term sustainable change.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#6E7A3C] flex-shrink-0 mt-1" />
                <span className="text-[#5B544D]">4 Coaching Sessions</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#6E7A3C] flex-shrink-0 mt-1" />
                <span className="text-[#5B544D]">
                  Customized Nutrition Plan
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#6E7A3C] flex-shrink-0 mt-1" />
                <span className="text-[#5B544D]">
                  Habit Tracking & Adjustments
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#6E7A3C] flex-shrink-0 mt-1" />
                <span className="text-[#5B544D]">Ongoing Support</span>
              </li>
            </ul>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-[#6E7A3C]">
                600,000 UGX
              </span>
              <a
                href={`https://wa.me/256777615775?text=${encodeURIComponent(
                  "Hi klaudia! I clicked 'Start Transformation' for the 4-Session Transformation Package (600,000 UGX) on the Coaching Packages section. I'd like to start this package and need details on scheduling and onboarding.",
                )}`}
                className="inline-flex items-center gap-2 bg-[#6E7A3C] text-white px-6 py-3 rounded-full font-medium hover:bg-[#5A6630] transition shadow-md hover:shadow-lg"
              >
                Start Transformation
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
