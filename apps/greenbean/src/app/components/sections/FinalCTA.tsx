"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-24 bg-gradient-to-br from-[#A3AD5F] to-[#8A9450] text-[#2E2A26] overflow-hidden"
    >
      {/* Decorative elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#F5F3EE]/10 rounded-full blur-[150px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#2E2A26]/10 rounded-full blur-[150px]"
      />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-light mb-8 leading-tight">
            Ready to Start?
          </h2>
          <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto leading-relaxed font-light">
            Whether you&apos;re looking for a structured weight loss plan,
            balanced performance meals, or convenient healthy takeaways —
          </p>
          <p className="text-2xl md:text-3xl font-semibold mb-12">
            Green Bean is ready to support your journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          <Link
            href="/meal-plans"
            className="group relative bg-[#2E2A26] text-[#F5F3EE] px-10 py-5 rounded-full text-lg font-semibold overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <span className="relative z-10">Get Started Today</span>
            <motion.span
              className="absolute inset-0 bg-[#5B544D]"
              initial={{ scale: 0, x: "-100%" }}
              whileHover={{ scale: 2, x: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 1, 0.3, 1] }}
            />
          </Link>

          <Link
            href="https://wa.me/256781719687"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-[#2E2A26] text-[#2E2A26] px-10 py-5 rounded-full text-lg font-semibold hover:bg-[#2E2A26] hover:text-[#F5F3EE] transition-all duration-300 hover:shadow-lg"
          >
            Order via WhatsApp
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-8 text-[#2E2A26]/80"
        >
          <div className="flex items-center gap-2">
            <Check className="w-6 h-6" strokeWidth={2.5} />
            <span className="font-medium">No long-term commitment</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-6 h-6" strokeWidth={2.5} />
            <span className="font-medium">Flexible plans</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-6 h-6" strokeWidth={2.5} />
            <span className="font-medium">Start anytime</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
