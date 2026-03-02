"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function WhoWeAre() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.6, 0.05, 0.2, 0.99] as any },
    },
  };

  return (
    <section ref={ref} className="relative py-24 bg-[#F5F3EE] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#A3AD5F]/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#5B544D]/5 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Column - Image */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/who-we-are.jpg"
                alt="Green Bean healthy kitchen"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2E2A26]/40 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -bottom-6 -right-6 bg-[#A3AD5F] text-[#2E2A26] px-8 py-6 rounded-2xl shadow-2xl"
            >
              <div className="text-center">
                <div className="text-3xl font-bold">2017</div>
                <div className="text-sm font-medium mt-1">Serving Kampala</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div variants={containerVariants} className="space-y-6">
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-light text-[#2E2A26] leading-tight">
                One Healthy Kitchen.
                <br />
                <span className="text-[#A3AD5F]">Many Healthy Solutions.</span>
              </h2>
              <p className="text-lg text-[#5B544D] mt-4 font-medium">
                We evolved to serve you better.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="space-y-4 text-[#5B544D]"
            >
              <p className="text-base leading-relaxed">
                Green Bean started as a vegetarian café and has evolved into a
                full healthy kitchen serving Kampala with structured meal plans,
                weight loss programs, and daily healthy meals. We evolved to
                serve you better.
              </p>
              <p className="text-base leading-relaxed">
                We provide balanced, nutritious meals designed to support real
                goals — from fat loss and performance to long-term healthy
                living.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <h3 className="text-xl font-semibold text-[#2E2A26] mb-4">
                Our offerings include:
              </h3>
              <ul className="space-y-3">
                {[
                  "Structured balanced weight loss programs",
                  "Low-carb Lean plans",
                  "High protein meal plans",
                  "Detox programs",
                  "Corporate and weekly lunch plans",
                  "Healthy daily takeaways",
                  "Delivery via Glovo",
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    variants={itemVariants}
                    className="flex items-start gap-3 text-[#5B544D]"
                  >
                    <span className="text-[#A3AD5F] text-xl mt-0.5">●</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-6 space-y-2">
              <p className="text-lg font-semibold text-[#2E2A26]">
                We are not just a café.
              </p>
              <p className="text-xl font-bold text-[#A3AD5F]">
                We are your partner in healthy living.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
