"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Leaf, Bike } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effect for the image
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Counters animation
  const [mealsCount, setMealsCount] = useState(0);
  const [membersCount, setMembersCount] = useState(0);

  useEffect(() => {
    const mealsInterval = setInterval(() => {
      setMealsCount((prev) => (prev < 12500 ? prev + 125 : 12500));
    }, 15);
    const membersInterval = setInterval(() => {
      setMembersCount((prev) => (prev < 2800 ? prev + 28 : 2800));
    }, 20);
    return () => {
      clearInterval(mealsInterval);
      clearInterval(membersInterval);
    };
  }, []);

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.6, 0.05, 0.2, 0.99] },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center bg-[#5B544D] text-[#F5F3EE] overflow-hidden"
    >
      {/* ===== DYNAMIC BACKGROUND BLOBS ===== */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-[#A3AD5F]/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-[#A3AD5F]/15 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, 60, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A3AD5F]/10 rounded-full blur-[180px]"
        />
      </motion.div>

      {/* ===== MAIN GRID ===== */}
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* ===== LEFT CONTENT ===== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-block mb-6">
            <span className="bg-[#A3AD5F]/20 text-[#A3AD5F] px-4 py-2 rounded-full text-sm font-medium border border-[#A3AD5F]/30 backdrop-blur-sm">
              ✦ Kampala's trusted healthy kitchen ✦
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-light leading-tight tracking-tight"
          >
            <span className="block">Eat Healthy.</span>
            <span className="block text-[#A3AD5F] mt-2">Live Better.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg md:text-xl text-[#E8E5DF] max-w-xl leading-relaxed"
          >
            Green Bean is Kampala&apos;s healthy kitchen offering structured
            meal plans, weight loss programs, takeaways, and delivery via Glovo.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/meal-plans"
              className="group relative bg-[#A3AD5F] text-[#2E2A26] px-8 py-4 rounded-full text-sm font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              <span className="relative z-10">Explore Meal Plans</span>
              <motion.span
                className="absolute inset-0 bg-white/30"
                initial={{ scale: 0, x: "100%" }}
                whileHover={{ scale: 2, x: 0 }}
                transition={{ duration: 0.5, ease: [0.2, 1, 0.3, 1] }}
              />
            </Link>

            <Link
              href="/programs"
              className="border border-[#A3AD5F] px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-[#A3AD5F] hover:text-[#2E2A26] hover:shadow-lg"
            >
              Start a Weight Loss Plan
            </Link>

           

            <Link
              href="/menu"
              className="border border-[#A3AD5F] px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-[#A3AD5F] hover:text-[#2E2A26] hover:shadow-lg"
            >
              Explore Menu
            </Link>
          </motion.div>

          {/* Trust indicators with rotating dots */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center gap-6 text-sm text-[#CFCBC4]"
          >
            {[
              "Structured Macro Plans",
              "Weekly Delivery",
              "Nutrition Coaching",
            ].map((text, i) => (
              <span key={text} className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  className="text-[#A3AD5F] text-lg"
                >
                  ●
                </motion.span>
                {text}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ===== RIGHT COLUMN – IMAGE + STAT CARD ===== */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative hidden lg:block"
        >
          {/* Parallax image */}
          <motion.div
            style={{ y: imageY }}
            className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/hero-meal.jpg" // Replace with a more vibrant image if available
              alt="Healthy meal prepared by Green Bean"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#5B544D]/60 via-transparent to-transparent" />
          </motion.div>

          

          {/* Decorative rotating element */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -right-10 w-28 h-28 bg-[#A3AD5F]/20 rounded-full backdrop-blur-md flex items-center justify-center border border-[#A3AD5F]/30"
          >
            <Leaf className="w-12 h-12 text-[#A3AD5F]" />
          </motion.div>
        </motion.div>
      </div>

      {/* ===== SCROLL INDICATOR ===== */}
      
    </section>
  );
}
