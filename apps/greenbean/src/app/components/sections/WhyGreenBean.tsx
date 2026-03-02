"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  BarChart3,
  Scale,
  UtensilsCrossed,
  Sprout,
  MapPin,
  Truck,
  Check,
} from "lucide-react";

export default function WhyGreenBean() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reasons = [
    {
      icon: BarChart3,
      title: "Professionally structured meal plans",
      description: "Every meal is designed with precise macros and portions",
    },
    {
      icon: Scale,
      title: "Real portion control and macro balance",
      description: "Take the guesswork out of healthy eating",
    },
    {
      icon: UtensilsCrossed,
      title: "Freshly prepared meals daily",
      description: "Made fresh in our kitchen every day",
    },
    {
      icon: Sprout,
      title: "Vegetarian and non-vegetarian options",
      description: "Flexibility to match your preferences",
    },
    {
      icon: MapPin,
      title: "Designed to fit real Ugandan lifestyles",
      description: "Practical, sustainable nutrition for your daily life",
    },
    {
      icon: Truck,
      title: "Convenient pickup and Glovo delivery",
      description: "Get your meals wherever you are",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.6, 0.05, 0.2, 0.99] as any },
    },
  };

  return (
    <section
      ref={ref}
      className="relative py-24 bg-[#2E2A26] text-[#F5F3EE] overflow-hidden"
    >
      {/* Decorative background */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#A3AD5F]/10 rounded-full blur-[150px]"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-light mb-4">
            Why Choose <span className="text-[#A3AD5F]">Green Bean</span>?
          </h2>
          <p className="text-xl text-[#CFCBC4] max-w-2xl mx-auto">
            Real food. Real structure. Real results.
          </p>
        </motion.div>

        {/* Grid of reasons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-[#3A3530] p-8 rounded-2xl border border-[#A3AD5F]/20 hover:border-[#A3AD5F]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#A3AD5F]/10"
              >
                {/* Icon */}
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <IconComponent
                    className="w-12 h-12 text-[#A3AD5F]"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Checkmark */}
                <div className="flex items-start gap-3 mb-3">
                  <Check
                    className="w-6 h-6 text-[#A3AD5F] mt-1 flex-shrink-0"
                    strokeWidth={2.5}
                  />
                  <h3 className="text-lg font-semibold text-[#F5F3EE] leading-tight">
                    {reason.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-[#CFCBC4] leading-relaxed">
                  {reason.description}
                </p>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#A3AD5F]/0 to-[#A3AD5F]/0 group-hover:from-[#A3AD5F]/5 group-hover:to-[#A3AD5F]/10 transition-all duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-2xl md:text-3xl font-light text-[#F5F3EE]">
            We focus on{" "}
            <span className="font-semibold text-[#A3AD5F]">real food</span>.{" "}
            <span className="font-semibold text-[#A3AD5F]">Real structure</span>
            . <span className="font-semibold text-[#A3AD5F]">Real results</span>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
