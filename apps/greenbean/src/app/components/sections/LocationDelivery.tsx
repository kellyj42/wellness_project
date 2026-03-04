"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  Truck,
  Package,
  Store,
  MapPin,
  Clock,
  MessageCircle,
  Map,
} from "lucide-react";

export default function LocationDelivery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const deliveryOptions = [
    {
      icon: MessageCircle,
      title: "Whatsapp",
      description: `Order your healthy meal today
Reach out to us via What’s App to place an order 
      `,
      cta: "Contact us",
      link: `https://wa.me/256781719687?text=${encodeURIComponent(
        "Hi Green Bean! I clicked 'Contact us' in the Location & Delivery section. I want to order healthy meals for delivery. Please share today's menu .",
      )}`,
    },
    {
      icon: Package,
      title: "Meal Plan Delivery",
      description:
        "Check out the variety of our weekly, monthly and weight-loss meal plans ",
      cta: "View plans ",
      link: "/meal-plans",
    },
    {
      icon: Store,
      title: "Check out our coffee shop ",
      description: "Visit us at CrossFit KLA",
      cta: "Get Directions",
      link: "#map",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-24 bg-[#2E2A26] text-[#F5F3EE] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#A3AD5F] rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-[#A3AD5F] rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Delivery Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-light mb-6">
            Order <span className="text-[#A3AD5F]">Healthy Meals</span>{" "}
            Delivered to You
          </h2>
          <p className="text-xl text-[#CFCBC4] max-w-3xl mx-auto">
            Whether you want daily delivery, weekly meal plans, or quick pickup
            — we make healthy eating convenient for your lifestyle.
          </p>
        </motion.div>

        {/* Delivery Options Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {deliveryOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                className="bg-[#3A3530] p-8 rounded-2xl border border-[#A3AD5F]/20 hover:border-[#A3AD5F]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#A3AD5F]/10 group"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <IconComponent
                    className="w-16 h-16 text-[#A3AD5F]"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-[#F5F3EE]">
                  {option.title}
                </h3>
                <p className="text-[#CFCBC4] mb-6 leading-relaxed whitespace-pre-wrap">
                  {option.description}
                </p>
                <Link
                  href={option.link}
                  target={option.link.startsWith("http") ? "_blank" : undefined}
                  rel={
                    option.link.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="inline-block bg-[#A3AD5F] text-[#2E2A26] px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  {option.cta}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Location Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-gradient-to-br from-[#3A3530] to-[#2E2A26] rounded-3xl overflow-hidden border border-[#A3AD5F]/20"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left - Location Info */}
            <div className="p-12 flex flex-col justify-center">
              <h3 className="text-3xl md:text-4xl font-light mb-6">
                GET <span className="text-[#A3AD5F]"> IN TOUCH</span>
              </h3>
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-8 h-8 text-[#A3AD5F] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-lg mb-1">
                      Green Bean at CrossFit
                    </div>
                    <div className="text-[#CFCBC4]">
                      CrossFit KLA, Old Port Bell Road,
                      <br />
                      Plot 7A, Kampala
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-8 h-8 text-[#A3AD5F] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-lg mb-1">
                      Opening hours of our coffee bar at CrossFit
                    </div>
                    <div className="text-[#CFCBC4]">
                      Monday to Friday 7 am - 6 pm
                      <br />
                      Saturday 7 am - 2 pm
                      <br />
                      Sunday 8 am - 12 pm
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MessageCircle className="w-8 h-8 text-[#A3AD5F] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-lg mb-1">
                      Contact us for delivery or get guidance on a meal plan
                    </div>
                    <Link
                      href={`https://wa.me/256781719687?text=${encodeURIComponent(
                        "Hi Green Bean! I clicked the delivery and meal plan guidance WhatsApp link in the Location section. I need help choosing the right meal plan and understanding delivery options.",
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#A3AD5F] hover:underline"
                    >
                      Call or whats app <strong>+256 781 719 687 </strong>Our
                      customer service and food deliveries are available in the
                      hour below
                    </Link>
                    <ul className="ml-4">
                      <li>~ Monday to Friday 8 am - 5 pm </li>
                      <li>~ Saturday 7 am - 2 pm</li>
                      <li>~ Sunday - closed</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://maps.google.com/?q=CrossFit+Kampala+Naguru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#A3AD5F] text-[#2E2A26] px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Get Directions
                </Link>
                <Link
                  href={`https://wa.me/256781719687?text=${encodeURIComponent(
                    "Hi Green Bean! I clicked 'WhatsApp Order' in the Location section. I'd like to place an order and confirm delivery timing.",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#A3AD5F] text-[#F5F3EE] px-8 py-4 rounded-full font-semibold hover:bg-[#A3AD5F] hover:text-[#2E2A26] transition-all duration-300"
                >
                  WhatsApp Order
                </Link>
              </div>
            </div>

            {/* Right - Map Placeholder */}
            <div
              id="map"
              className="relative min-h-[400px] lg:min-h-full bg-[#5B544D]/20"
            >
              <iframe
                title="Green Bean Location"
                src="https://www.google.com/maps?q=CrossFit+Kampala&output=embed"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* You can replace this with an actual Google Maps iframe */}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
