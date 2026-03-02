"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Camera } from "lucide-react";

export default function RealResults() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { number: "500+", label: "Transformations" },
    { number: "15kg", label: "Average Weight Loss" },
    { number: "92%", label: "Goal Achievement Rate" },
  ];

  return (
    <section ref={ref} className="relative py-24 bg-[#F5F3EE] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#A3AD5F]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#5B544D]/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-light text-[#2E2A26] mb-6">
            Real Results from{" "}
            <span className="text-[#A3AD5F] font-normal">Real Clients</span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-lg text-[#5B544D]">
            <p className="text-xl leading-relaxed">
              Our clients don&apos;t just lose weight.
            </p>
            <p className="text-xl leading-relaxed">
              They gain{" "}
              <span className="font-semibold text-[#A3AD5F]">confidence</span>,
              <span className="font-semibold text-[#A3AD5F]"> energy</span>, and
              <span className="font-semibold text-[#A3AD5F]">
                {" "}
                control
              </span>{" "}
              over their health.
            </p>
            <p className="mt-6">
              Whether your goal is fat loss, muscle tone, or building healthier
              habits, Green Bean provides the structure and support to help you
              succeed.
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-[#A3AD5F]/10 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-5xl font-bold text-[#A3AD5F] mb-2">
                {stat.number}
              </div>
              <div className="text-[#5B544D] font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Transformation Placeholder Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-gradient-to-br from-[#A3AD5F]/10 to-[#5B544D]/10 rounded-3xl p-12 text-center border border-[#A3AD5F]/20"
        >
          <div className="max-w-2xl mx-auto">
            <Camera
              className="w-20 h-20 text-[#A3AD5F] mx-auto mb-6"
              strokeWidth={1.5}
            />
            <h3 className="text-3xl font-light text-[#2E2A26] mb-4">
              See Real Transformations
            </h3>
            <p className="text-[#5B544D] mb-8 leading-relaxed">
              We celebrate our clients&apos; success stories on Instagram. See
              their before & after journeys and the dedication that made it
              possible.
            </p>
            <Link
              href="https://instagram.com/greenbeankla"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#A3AD5F] text-[#2E2A26] px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              View Transformations on Instagram
            </Link>
          </div>
        </motion.div>

        {/* Testimonial Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-[#2E2A26] text-[#F5F3EE] p-10 rounded-3xl relative">
            <div className="text-[#A3AD5F] text-6xl mb-4 opacity-50">"</div>
            <p className="text-xl md:text-2xl font-light leading-relaxed mb-6 italic">
              Green Bean gave me the structure I needed. I lost 12kg in 3
              months, and for the first time, I feel in control of my eating.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#A3AD5F]/20 flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <div className="font-semibold text-[#F5F3EE]">Sarah M.</div>
                <div className="text-sm text-[#CFCBC4]">Lean Plan Client</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
