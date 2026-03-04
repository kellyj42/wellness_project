"use client";

/*
PROGRAMS PAGE STRUCTURE

Goal:
This page introduces all Green Bean meal programs.

We have TWO main categories of programs:

1️⃣ Breakfast Programs
   - High Protein Breakfast Plan
   - High Protein Vegetarian Breakfast Plan
   - Low Carb Breakfast Plan

2️⃣ Lunch Programs
   - High Protein Lunch Plan
   - High Protein Vegetarian Lunch Plan
   - Low Carb Lunch Plan

Each category has an overview poster and individual plan cards that expand
to show the weekly menu when clicked.
*/

/*
IMAGE STRUCTURE (public/programmes)

LUNCH PLANS

/programmes/1.jpeg
Lunch overview poster (Choose your lunch plan)

/programmes/4.jpeg
High Protein Lunch Plan weekly menu

/programmes/2.jpeg
High Protein Vegetarian Lunch Plan weekly menu

/programmes/3.jpeg
Low Carb Lunch Plan weekly menu


BREAKFAST PLANS

/programmes/8.jpeg
Breakfast overview poster (Choose your breakfast plan)

/programmes/5.jpeg
High Protein Breakfast Plan weekly menu

/programmes/6.jpeg
High Protein Vegetarian Breakfast Plan weekly menu

/programmes/7.jpeg
Low Carb Breakfast Plan weekly menu
*/

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Coffee,
  UtensilsCrossed,
  Heart,
  Check,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";

export default function ProgramsPage() {
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const [menuPreview, setMenuPreview] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  useEffect(() => {
    if (!menuPreview) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuPreview(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuPreview]);

  // Breakfast Plans Data
  const breakfastPlans = [
    {
      title: "High Protein Breakfast Plan",
      price: "115K / week",
      image: "/programmes/5.jpeg",
      features: [
        "35-40g protein per meal",
        "Supports muscle recovery",
        "Keeps you full longer",
        "Perfect for active lifestyles",
      ],
    },
    {
      title: "High Protein Vegetarian Breakfast Plan",
      price: "115K / week",
      image: "/programmes/6.jpeg",
      features: [
        "Plant-based protein sources",
        "30-35g protein per meal",
        "No meat, eggs included",
        "Nutritionally balanced",
      ],
    },
    {
      title: "Low Carb Breakfast Plan",
      price: "130K / week",
      image: "/programmes/7.jpeg",
      features: [
        "Reduced carbohydrate intake",
        "High protein & healthy fats",
        "Great for fat loss",
        "Sustained energy levels",
      ],
    },
  ];

  // Lunch Plans Data
  const lunchPlans = [
    {
      title: "High Protein Lunch Plan",
      price: "135K / week",
      image: "/programmes/4.jpeg",
      features: [
        "40-45g protein per meal",
        "Balanced macros for performance",
        "Supports muscle building",
        "Satisfying portions",
      ],
    },
    {
      title: "High Protein Vegetarian Lunch Plan",
      price: "125K / week",
      image: "/programmes/2.jpeg",
      features: [
        "Plant-based protein",
        "35-40g protein per meal",
        "No meat, eggs included",
        "Delicious vegetarian options",
      ],
    },
    {
      title: "Low Carb Lunch Plan",
      price: "145K / week",
      image: "/programmes/3.jpeg",
      features: [
        "Minimal carbs, max nutrition",
        "High protein & vegetables",
        "Perfect for weight loss",
        "Energy without the crash",
      ],
    },
  ];

  // Category Overview Images
  const categoryImages = {
    breakfastOverview: "/programmes/8.jpeg",
    lunchOverview: "/programmes/1.jpeg",
  };

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      {/* ------------------------------------- */}
      {/* HERO SECTION */}
      {/* ------------------------------------- */}
      <section className="relative py-24 bg-gradient-to-br from-[#5B544D] to-[#2E2A26] text-[#F5F3EE] overflow-hidden">
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
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#A3AD5F]/10 rounded-full blur-[150px]"
        />

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6">
              <span className="bg-[#A3AD5F]/20 text-[#A3AD5F] px-4 py-2 rounded-full text-sm font-medium border border-[#A3AD5F]/30">
                STRUCTURED MEAL PROGRAMS
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-light mb-6">
              Choose Your <span className="text-[#A3AD5F]">Meal Program</span>
            </h1>
            <p className="text-xl text-[#CFCBC4] max-w-3xl mx-auto mb-8 leading-relaxed">
              Breakfast or Lunch plans designed for healthy lifestyles. High
              protein, vegetarian, or low carb — pick what works for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#breakfast"
                className="inline-flex items-center gap-2 bg-[#A3AD5F] text-[#2E2A26] px-8 py-4 rounded-full font-semibold hover:bg-[#B8C474] hover:shadow-2xl transition-all duration-300"
              >
                <Coffee className="w-5 h-5" />
                Explore Breakfast Plans
              </Link>
              <Link
                href="#lunch"
                className="inline-flex items-center gap-2 border-2 border-[#A3AD5F] text-[#A3AD5F] px-8 py-4 rounded-full font-semibold hover:bg-[#A3AD5F] hover:text-[#2E2A26] transition-all duration-300"
              >
                <UtensilsCrossed className="w-5 h-5" />
                Explore Lunch Plans
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------- */}
      {/* BREAKFAST PROGRAMS SECTION */}
      {/* ------------------------------------- */}
      <section id="breakfast" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Coffee className="w-16 h-16 text-[#A3AD5F] mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-light text-[#2E2A26] mb-4">
              Breakfast <span className="text-[#A3AD5F]">Programs</span>
            </h2>
            <p className="text-lg text-[#5B544D] max-w-2xl mx-auto mb-8">
              Start your day right with our structured breakfast plans
            </p>
          </motion.div>

          {/* Breakfast Overview Poster */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 max-w-4xl mx-auto"
          >
            <div className="relative aspect-[4/5] rounded-3xl  overflow-hidden shadow-2xl border-2 border-[#A3AD5F]/20">
              <Image
                src={categoryImages.breakfastOverview}
                alt="Choose Your Breakfast Plan"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Breakfast Plan Cards - Expandable */}
          <div className="grid md:grid-cols-3 gap-6">
            {breakfastPlans.map((plan, index) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg border border-[#A3AD5F]/10 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() =>
                  setActivePlan(activePlan === plan.title ? null : plan.title)
                }
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#2E2A26] mb-2">
                    {plan.title}
                  </h3>
                  <p className="text-2xl text-[#A3AD5F] font-bold mb-4">
                    {plan.price}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-[#5B544D]"
                      >
                        <Check
                          className="w-5 h-5 text-[#A3AD5F] flex-shrink-0"
                          strokeWidth={2}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="w-full inline-flex items-center justify-center gap-2 text-[#A3AD5F] font-semibold hover:text-[#8B9650] transition-colors">
                    {activePlan === plan.title
                      ? "Hide Weekly Menu"
                      : "View Weekly Menu"}
                    {activePlan === plan.title ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Expanded Menu Image */}
                {activePlan === plan.title && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-[#A3AD5F]/20"
                  >
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setMenuPreview({
                          src: plan.image,
                          alt: `${plan.title} Weekly Menu`,
                        });
                      }}
                      className="relative block w-full aspect-square cursor-zoom-in"
                      aria-label={`Preview ${plan.title} weekly menu`}
                    >
                      <Image
                        src={plan.image}
                        alt={`${plan.title} Weekly Menu`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Breakfast CTA */}
          <div className="text-center mt-10">
            <Link
              href={`https://wa.me/256781719687?text=${encodeURIComponent(
                "Hi Green Bean! I clicked 'Order Breakfast Plan via WhatsApp' on the Programs page. I'm interested in a breakfast plan and want help choosing between High Protein, High Protein Vegetarian, and Low Carb options. Please share weekly menu details, pricing, and subscription options.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#A3AD5F] text-[#2E2A26] px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#B8C474] hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Order Breakfast Plan via WhatsApp
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------- */}
      {/* LUNCH PROGRAMS SECTION */}
      {/* ------------------------------------- */}
      <section id="lunch" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <UtensilsCrossed className="w-16 h-16 text-[#A3AD5F] mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-light text-[#2E2A26] mb-4">
              Lunch <span className="text-[#A3AD5F]">Programs</span>
            </h2>
            <p className="text-lg text-[#5B544D] max-w-2xl mx-auto mb-8">
              Fuel your day with nutritious, satisfying lunch meals
            </p>
          </motion.div>

          {/* Lunch Overview Poster */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 max-w-4xl mx-auto"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#A3AD5F]/20">
              <Image
                src={categoryImages.lunchOverview}
                alt="Choose Your Lunch Plan"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Lunch Plan Cards - Expandable */}
          <div className="grid md:grid-cols-3 gap-6">
            {lunchPlans.map((plan, index) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg border border-[#A3AD5F]/10 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() =>
                  setActivePlan(activePlan === plan.title ? null : plan.title)
                }
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#2E2A26] mb-2">
                    {plan.title}
                  </h3>
                  <p className="text-2xl text-[#A3AD5F] font-bold mb-4">
                    {plan.price}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-[#5B544D]"
                      >
                        <Check
                          className="w-5 h-5 text-[#A3AD5F] flex-shrink-0"
                          strokeWidth={2}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="w-full inline-flex items-center justify-center gap-2 text-[#A3AD5F] font-semibold hover:text-[#8B9650] transition-colors">
                    {activePlan === plan.title
                      ? "Hide Weekly Menu"
                      : "View Weekly Menu"}
                    {activePlan === plan.title ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Expanded Menu Image */}
                {activePlan === plan.title && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-[#A3AD5F]/20"
                  >
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setMenuPreview({
                          src: plan.image,
                          alt: `${plan.title} Weekly Menu`,
                        });
                      }}
                      className="relative block w-full aspect-square cursor-zoom-in"
                      aria-label={`Preview ${plan.title} weekly menu`}
                    >
                      <Image
                        src={plan.image}
                        alt={`${plan.title} Weekly Menu`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Lunch CTA */}
          <div className="text-center mt-10">
            <Link
              href={`https://wa.me/256781719687?text=${encodeURIComponent(
                "Hi Green Bean! I clicked 'Order Lunch Plan via WhatsApp' on the Programs page. I'm interested in a lunch plan and want help choosing between High Protein, High Protein Vegetarian, and Low Carb options. Please share weekly menu details, pricing, and subscription options.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#A3AD5F] text-[#2E2A26] px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#B8C474] hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Order Lunch Plan via WhatsApp
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------- */}
      {/* WHY GREEN BEAN PROGRAMS */}
      {/* ------------------------------------- */}
      <section className="py-20 bg-[#F5F3EE]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-light text-[#2E2A26] mb-4">
              Why Choose <span className="text-[#A3AD5F]">Green Bean?</span>
            </h2>
            <p className="text-lg text-[#5B544D] max-w-2xl mx-auto">
              Professionally structured programs designed for real results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Professionally Structured",
                description:
                  "Evidence-based meal plans designed by nutrition experts",
              },
              {
                title: "High Protein Nutrition",
                description:
                  "Optimized protein content to support your fitness goals",
              },
              {
                title: "Vegetarian Options Available",
                description:
                  "Plant-based plans that deliver complete nutrition",
              },
              {
                title: "Fresh Meals Prepared Daily",
                description:
                  "No frozen meals. Everything made fresh in our kitchen",
              },
              {
                title: "Designed for Ugandan Lifestyles",
                description:
                  "Plans that fit your schedule and local preferences",
              },
              {
                title: "Convenient WhatsApp Ordering",
                description:
                  "Simple ordering process via WhatsApp for delivery",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                className="bg-white p-6 rounded-2xl border border-[#A3AD5F]/20 hover:border-[#A3AD5F]/50 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <Check
                    className="w-6 h-6 text-[#A3AD5F] flex-shrink-0 mt-1"
                    strokeWidth={2}
                  />
                  <div>
                    <h3 className="font-semibold text-[#2E2A26] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#5B544D]">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------- */}
      {/* HOW THE PROGRAM WORKS */}
      {/* ------------------------------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-[#2E2A26] mb-4">
              How It <span className="text-[#A3AD5F]">Works</span>
            </h2>
            <p className="text-lg text-[#5B544D] max-w-2xl mx-auto">
              Four simple steps to start your healthy eating journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Choose Your Program",
                description: "Select between Breakfast or Lunch programs",
              },
              {
                step: "2",
                title: "Select Your Plan",
                description: "High Protein, Vegetarian, or Low Carb",
              },
              {
                step: "3",
                title: "Subscribe",
                description: "Choose weekly or monthly subscription",
              },
              {
                step: "4",
                title: "Receive Meals",
                description: "Fresh meals delivered daily to you",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-[#A3AD5F] text-[#2E2A26] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-[#2E2A26] mb-2">
                  {item.title}
                </h3>
                <p className="text-[#5B544D]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------- */}
      {/* CLIENT RESULTS SECTION */}
      {/* ------------------------------------- */}
      <section className="py-20 bg-gradient-to-br from-[#A3AD5F] to-[#8A9450] text-[#2E2A26]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Heart className="w-14 h-14 mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Real Results from Real Clients
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Our clients don't just lose weight — they gain confidence, energy,
              and control over their health. Whether your goal is fat loss,
              muscle tone, or building healthier habits, Green Bean provides the
              structure and support to help you succeed.
            </p>
            <Link
              href="/reviews"
              className="inline-block bg-[#2E2A26] text-[#F5F3EE] px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#1A1714] hover:shadow-2xl transition-all duration-300"
            >
              Read Client Reviews
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------- */}
      {/* FINAL CALL TO ACTION */}
      {/* ------------------------------------- */}
      <section className="py-20 bg-[#2E2A26] text-[#F5F3EE]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Ready to Start Your Program?
          </h2>
          <p className="text-xl text-[#CFCBC4] mb-10 max-w-2xl mx-auto leading-relaxed">
            Choose your ideal meal plan and start your journey to healthier
            eating today. Fresh meals, structured nutrition, real results.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="#breakfast"
              className="inline-flex items-center gap-2 bg-[#A3AD5F] text-[#2E2A26] px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#B8C474] hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Coffee className="w-5 h-5" />
              Explore Breakfast Plans
            </Link>
            <Link
              href="#lunch"
              className="inline-flex items-center gap-2 bg-[#A3AD5F] text-[#2E2A26] px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#B8C474] hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <UtensilsCrossed className="w-5 h-5" />
              Explore Lunch Plans
            </Link>
            <Link
              href={`https://wa.me/256781719687?text=${encodeURIComponent(
                "Hi Green Bean! I clicked 'Order via WhatsApp' in the final CTA on the Programs page. I'm ready to start but need help selecting the best program for my goals and understanding pricing and next steps.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-[#A3AD5F] text-[#A3AD5F] px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#A3AD5F] hover:text-[#2E2A26] transition-all duration-300"
            >
              Order via WhatsApp
            </Link>
          </div>
        </div>
      </section>

      {menuPreview && (
        <div
          className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-sm p-4 md:p-8"
          onClick={() => setMenuPreview(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-5xl w-full h-full mx-auto flex items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setMenuPreview(null)}
              className="absolute top-2 right-2 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full h-[85vh]">
              <Image
                src={menuPreview.src}
                alt={menuPreview.alt}
                fill
                className="object-contain rounded-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
