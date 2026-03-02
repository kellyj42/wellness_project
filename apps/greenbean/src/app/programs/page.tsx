"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Scale,
  Flame,
  UtensilsCrossed,
  Heart,
  Check,
  ArrowRight,
} from "lucide-react";

export default function ProgramsPage() {
  const programs = [
    {
      icon: Scale,
      title: "Weight Loss Programs",
      description:
        "Structured, evidence-based programs designed for sustainable fat loss and body transformation.",
      features: [
        "Balanced Performance Plan (30/30/30 macros)",
        "Green Bean Lean Plan (reduced carbs, high protein)",
        "Calorie options for women & men",
        "Professional nutrition guidance",
      ],
      href: "/meal-plans",
      color: "bg-[#A3AD5F]",
      textColor: "text-[#2E2A26]",
    },
    {
      icon: Flame,
      title: "Lunch & Breakfast Plans",
      description:
        "Flexible meal solutions for busy lifestyles — choose healthy, high protein, or lean options.",
      features: [
        "Healthy balanced meals",
        "High protein options",
        "Lean low-carb choices",
        "Convenient daily delivery",
      ],
      href: "/meal-plans",
      color: "bg-[#2E2A26]",
      textColor: "text-[#F5F3EE]",
    },
    {
      icon: UtensilsCrossed,
      title: "Daily Takeaways & Delivery",
      description:
        "No commitment needed. Order fresh, healthy meals daily via pickup or Glovo delivery.",
      features: [
        "Daily fresh menu",
        "Glovo delivery available",
        "Vegetarian & non-vegetarian",
        "Real food, real portions",
      ],
      href: "/menu",
      color: "bg-[#5B544D]",
      textColor: "text-[#F5F3EE]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      {/* Hero Section */}
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
                GREEN BEAN
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-light mb-6">
              Your Partner in{" "}
              <span className="text-[#A3AD5F]">Healthy Living</span>
            </h1>
            <p className="text-xl text-[#CFCBC4] max-w-3xl mx-auto mb-8 leading-relaxed">
              Green Bean is not just a café. We're a healthy kitchen and
              wellness company offering structured meal plans, weight loss
              programs, and daily healthy meals to support your journey.
            </p>
            <p className="text-lg text-[#CFCBC4] max-w-3xl mx-auto leading-relaxed">
              Choose a program that matches your goals. Each option is crafted
              with clean ingredients, smart portions, and clear guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => {
              const IconComponent = program.icon;
              return (
                <motion.div
                  key={program.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`${program.color} ${program.textColor} p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 relative group`}
                >
                  <IconComponent className="w-14 h-14 mb-6" strokeWidth={1.5} />
                  <h3 className="text-2xl font-semibold mb-4">
                    {program.title}
                  </h3>
                  <p
                    className={`mb-6 ${program.textColor === "text-[#F5F3EE]" ? "text-[#CFCBC4]" : "text-[#5B544D]"}`}
                  >
                    {program.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {program.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={program.href}
                    className={`inline-flex items-center gap-2 font-semibold transition-all duration-300 group-hover:gap-3 ${
                      program.textColor === "text-[#F5F3EE]"
                        ? "text-[#A3AD5F]"
                        : "text-[#2E2A26]"
                    }`}
                  >
                    Explore Program
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Green Bean Section */}
      <section className="py-20 bg-white">
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
              We focus on real food. Real structure. Real results.
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
                title: "Real Portion Control",
                description:
                  "Balanced macros and calorie targets for sustainable results",
              },
              {
                title: "Freshly Prepared Daily",
                description:
                  "No frozen meals. Everything made fresh in our kitchen",
              },
              {
                title: "Variety & Choice",
                description: "Vegetarian and non-vegetarian options available",
              },
              {
                title: "Ugandan Lifestyle",
                description:
                  "Designed to fit real Ugandan lifestyles and preferences",
              },
              {
                title: "Convenient Delivery",
                description:
                  "Pickup at our kitchen or Glovo delivery to your door",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                className="bg-[#F5F3EE] p-6 rounded-2xl border border-[#A3AD5F]/20 hover:border-[#A3AD5F]/50 transition-all duration-300"
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

      {/* Real Results Section */}
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
              href="https://www.instagram.com/greenbean.ug"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#2E2A26] text-[#F5F3EE] px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#1A1714] hover:shadow-2xl transition-all duration-300"
            >
              View Transformations on Instagram
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#2E2A26] text-[#F5F3EE]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Ready to Start?
          </h2>
          <p className="text-xl text-[#CFCBC4] mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you're looking for a structured weight loss plan, balanced
            performance meals, or convenient healthy takeaways — Green Bean is
            ready to support your journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/meal-plans"
              className="inline-block bg-[#A3AD5F] text-[#2E2A26] px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#B8C474] hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Explore Meal Plans
            </Link>
            <Link
              href="https://glovoapp.com/en/ug/kampala/stores/green-bean-cafe-kpa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-[#A3AD5F] text-[#A3AD5F] px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#A3AD5F] hover:text-[#2E2A26] transition-all duration-300"
            >
              Order on Glovo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
