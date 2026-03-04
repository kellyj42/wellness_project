"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Scale,
  Flame,
  Leaf,
  Droplet,
  UtensilsCrossed,
  Check,
} from "lucide-react";

export default function MealPlanPage() {
  const weightLossPlans = [
    {
      icon: Scale,
      name: "Balanced Performance Plan",
      tagline: "30/30/30 Macro Balance",
      description:
        "Our balanced macro plan designed for energy, strength, and sustainable results.",
      features: [
        "Balanced carbs, protein and fats",
        "Higher calorie support",
        "Ideal for active lifestyles",
      ],
      options: [
        { label: "Women", calories: ["1500 kcal", "1800 kcal"] },
        { label: "Men", calories: ["2000 kcal", "2200 kcal"] },
      ],
      color: "bg-[#A3AD5F]",
      textColor: "text-[#2E2A26]",
    },
    {
      icon: Flame,
      name: "Green Bean Lean Plan",
      tagline: "Reduced Carbs. High Protein.",
      description:
        "Designed for those who want a more structured, reduced-carb approach to fat loss.",
      features: [
        "Higher protein",
        "Controlled carbs",
        "Appetite support",
        "Faster visible results",
      ],
      idealFor: "Fat loss, metabolic reset, plateau breakthroughs",
      color: "bg-[#2E2A26]",
      textColor: "text-[#F5F3EE]",
      popular: true,
    },
  ];

  const lunchPlans = [
    { name: "Healthy Lunch Plan", description: "Balanced daily lunch meals" },
    {
      name: "High Protein Lunch Plan",
      description: "Protein-focused lunch options",
    },
    { name: "Lean Lunch Plan", description: "Low-carb lunch solutions" },
  ];

  const breakfastPlans = [
    { name: "Healthy Breakfast Plan", description: "Nutritious morning meals" },
    {
      name: "High Protein Breakfast Plan",
      description: "Protein-packed starts",
    },
    { name: "Lean Breakfast Plan", description: "Low-carb mornings" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#5B544D] to-[#2E2A26] text-[#F5F3EE]">
        <div className="max-w-6xl mx-auto px-6 text-center">
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
              Choose the Plan That{" "}
              <span className="text-[#A3AD5F]">Fits Your Goal</span>
            </h1>
            <p className="text-xl text-[#CFCBC4] max-w-3xl mx-auto leading-relaxed">
              Structured nutrition programs designed to help you achieve your
              health goals with consistency and balance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Weight Loss Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light text-[#2E2A26] mb-4">
              Weight Loss <span className="text-[#A3AD5F]">Programs</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {weightLossPlans.map((plan, index) => {
              const IconComponent = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`${plan.color} ${plan.textColor} p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 relative`}
                >
                  {plan.popular && (
                    <span className="absolute top-6 right-6 bg-[#A3AD5F] text-[#2E2A26] text-xs px-3 py-1 rounded-full font-semibold">
                      Most Popular
                    </span>
                  )}
                  <IconComponent className="w-12 h-12 mb-4" strokeWidth={1.5} />
                  <h3 className="text-3xl font-semibold mb-2">{plan.name}</h3>
                  <p
                    className={`text-sm mb-4 ${plan.textColor === "text-[#F5F3EE]" ? "text-[#CFCBC4]" : "text-[#5B544D]"}`}
                  >
                    {plan.tagline}
                  </p>
                  <p
                    className={`mb-6 ${plan.textColor === "text-[#F5F3EE]" ? "text-[#CFCBC4]" : "text-[#5B544D]"}`}
                  >
                    {plan.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.options && (
                    <div className="mb-6 space-y-3">
                      {plan.options.map((option) => (
                        <div key={option.label}>
                          <p className="font-semibold mb-1">{option.label}:</p>
                          <div className="flex gap-2">
                            {option.calories.map((cal) => (
                              <span
                                key={cal}
                                className={`px-3 py-1 rounded-full text-sm border ${plan.textColor === "text-[#F5F3EE]" ? "border-[#F5F3EE]/30" : "border-[#2E2A26]/30"}`}
                              >
                                {cal}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {plan.idealFor && (
                    <p
                      className={`text-sm mb-6 italic ${plan.textColor === "text-[#F5F3EE]" ? "text-[#CFCBC4]" : "text-[#5B544D]"}`}
                    >
                      Ideal for: {plan.idealFor}
                    </p>
                  )}

                  <Link
                    href={`https://wa.me/256781719687?text=${encodeURIComponent(
                      `Hi Green Bean! I clicked 'Order via WhatsApp' for the ${plan.name} on the Meal Plans page. Please share full plan details, pricing options, and how to subscribe.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full text-center py-3 rounded-full font-semibold transition-all duration-300 ${
                      plan.textColor === "text-[#F5F3EE]"
                        ? "bg-[#F5F3EE] text-[#2E2A26] hover:bg-white"
                        : "bg-[#2E2A26] text-[#F5F3EE] hover:bg-[#1A1714]"
                    }`}
                  >
                    Order via WhatsApp
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lunch Plans */}
      <section className="py-20 bg-[#F5F3EE]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Flame
              className="w-12 h-12 mx-auto mb-4 text-[#A3AD5F]"
              strokeWidth={1.5}
            />
            <h2 className="text-4xl md:text-5xl font-light text-[#2E2A26] mb-4">
              Lunch <span className="text-[#A3AD5F]">Plans</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {lunchPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-[#2E2A26] mb-2">
                  {plan.name}
                </h3>
                <p className="text-[#5B544D] mb-4">{plan.description}</p>
                <Link
                  href={`https://wa.me/256781719687?text=${encodeURIComponent(
                    `Hi Green Bean! I clicked 'Order via WhatsApp' for the ${plan.name} in the Lunch Plans section on the Meal Plans page. I'd like to order this lunch plan and confirm pricing and start date.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#A3AD5F] font-semibold hover:text-[#8A9450] transition-colors"
                >
                  Order via WhatsApp →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Breakfast Plans */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Leaf
              className="w-12 h-12 mx-auto mb-4 text-[#A3AD5F]"
              strokeWidth={1.5}
            />
            <h2 className="text-4xl md:text-5xl font-light text-[#2E2A26] mb-4">
              Breakfast <span className="text-[#A3AD5F]">Plans</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {breakfastPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-[#F5F3EE] p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-[#2E2A26] mb-2">
                  {plan.name}
                </h3>
                <p className="text-[#5B544D] mb-4">{plan.description}</p>
                <Link
                  href={`https://wa.me/256781719687?text=${encodeURIComponent(
                    `Hi Green Bean! I clicked 'Order via WhatsApp' for the ${plan.name} in the Breakfast Plans section on the Meal Plans page. I'd like to order this breakfast plan and confirm pricing and start date.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#A3AD5F] font-semibold hover:text-[#8A9450] transition-colors"
                >
                  Order via WhatsApp →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detox & Takeaways */}
      <section className="py-20 bg-gradient-to-br from-[#A3AD5F] to-[#8A9450] text-[#2E2A26]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <Droplet className="w-12 h-12 mb-4" strokeWidth={1.5} />
              <h2 className="text-3xl md:text-4xl font-light mb-4">
                Detox Plans
              </h2>
              <ul className="space-y-2 mb-6 text-lg">
                <li>• 3-Day Detox Programs</li>
                <li>• 5-Day Detox Programs</li>
                <li>• Juice Cleanses</li>
                <li>• Reset Programs</li>
              </ul>
              <Link
                href={`https://wa.me/256781719687?text=${encodeURIComponent(
                  "Hi Green Bean! I clicked 'Order via WhatsApp' in the Detox Plans section on the Meal Plans page. I'm interested in your detox options and would like package details, pricing, and start dates.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#2E2A26] text-[#F5F3EE] px-8 py-3 rounded-full font-semibold hover:bg-[#1A1714] transition-all duration-300"
              >
                Order via WhatsApp
              </Link>
            </div>

            <div>
              <UtensilsCrossed className="w-12 h-12 mb-4" strokeWidth={1.5} />
              <h2 className="text-3xl md:text-4xl font-light mb-4">
                Daily Takeaways
              </h2>
              <p className="text-lg mb-6">
                Healthy daily menu available for pickup or delivery via
                WhatsApp. No commitment needed — just fresh, nutritious meals
                when you need them.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/menu"
                  className="inline-block bg-[#2E2A26] text-[#F5F3EE] px-8 py-3 rounded-full font-semibold hover:bg-[#1A1714] transition-all duration-300"
                >
                  View Menu
                </Link>
                <Link
                  href={`https://wa.me/256781719687?text=${encodeURIComponent(
                    "Hi Green Bean! I clicked 'Order via WhatsApp' in the Daily Takeaways section on the Meal Plans page. I'd like to order from your daily healthy takeaways and need today's options plus delivery/pickup details.",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border-2 border-[#2E2A26] text-[#2E2A26] px-8 py-3 rounded-full font-semibold hover:bg-[#2E2A26] hover:text-[#F5F3EE] transition-all duration-300"
                >
                  Order via WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#2E2A26] text-[#F5F3EE]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-[#CFCBC4] mb-8 max-w-2xl mx-auto">
            Each plan includes clear pricing, professional support, and a simple
            start process. Contact us to get started today.
          </p>
          <Link
            href={`https://wa.me/256781719687?text=${encodeURIComponent(
              "Hi Green Bean! I clicked the final 'Order via WhatsApp' CTA on the Meal Plans page. I'd like help choosing the best plan for my goals and understanding pricing and onboarding steps.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#A3AD5F] text-[#2E2A26] px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#B8C474] hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Order via WhatsApp
          </Link>
        </div>
      </section>
    </div>
  );
}
