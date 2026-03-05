"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { Star, ChevronDown } from "lucide-react";
import Image from "next/image";

interface ClientTestimonial {
  id: string;
  name: string;
  image: string;
  feedback: string;
  result: string;
  rating: number;
}

export default function RealResults() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedClients, setExpandedClients] = useState<
    Record<string, boolean>
  >({});

  const clients: ClientTestimonial[] = [
    {
      id: "1",
      name: "Sarah",
      image: "/clientresults/sarah.jpeg",
      feedback: `Meet Sarah, who has achieved an amazing milestone on her journey with Green Bean! 

Over the past four weeks, Sarah has successfully lost 2 kg while following her personalized meal plan. But what’s truly inspiring is her focus on muscle toning rather than extreme weight loss. As someone who exercises regularly, Sarah  was looking for a way to complement her fitness routine and enhance her results. With our guidance and meals delivery, she prioritized higher protein intake, which has been key to her success!

Here’s what Sarah had to say about her experience:

"I wanted to see results that reflected my hard work at the gym, and the meal plan from Green Bean Plus has been a game changer. Focusing on protein helped me feel fuller and more energized for my workouts. The guidance I received made it easy to stay on track, and I’m so excited to see the muscle toning I’ve achieved in just a month!"

Sarah’s dedication to her health and fitness is truly admirable. By incorporating a balanced diet with a focus on protein, she has not only shed weight but also enhanced her overall strength and physique.

We couldn’t be prouder of Sarah and her accomplishments!`,
      result: "Lost 2kg & Achieved Muscle Tone",
      rating: 5,
    },
    {
      id: "2",
      name: " Klaudia",
      image: "/clientresults/klaudia.jpeg",
      feedback: `Meet Klaudia, who has successfully lost 7 kg with Green Bean in 3 months!

With our delicious meal plans and her dedication to exercising 3-4 times a week, Klaudia has achieved her weight loss goals without feeling deprived. Our healthy meals are designed to nourish your body and support sustainable weight loss—no more starving or sacrificing the foods you love!

Join Klaudia on her journey and discover how Green Bean can help you reach your goals too! Let's make healthy eating enjoyable together!`,
      result: "Lost 7kg in 3 Months",
      rating: 5,
    },
    {
      id: "3",
      name: "Laura",
      image: "/clientresults/laura.jpeg",
      feedback: `Customer Spotlight: Laura's Transformation! In just 5 months, Laura has lost an incredible 15 kg with consistent workouts, dedication, and the support of Green Bean meals!

Her journey is a true testament to the power of healthy, sustainable eating. With Green Bean meal plans, she never experienced cravings and has built lasting, healthy habits that will keep her on track for years to come!

Are you ready to start your own transformation? Our meal plans are designed to fuel your body, support your goals, and help you develop healthy routines that last.`,
      result: "Lost 15kg in 5 Months",
      rating: 5,
    },
    {
      id: "4",
      name: "Ritika",
      image: "/clientresults/ritika.jpeg",
      feedback: `From 72kg to 55kg — 17 kilos down, and a whole new chapter gained.

Ritika's journey is proof that with consistency, commitment, and self-belief, anything is possible. This isn't just a transformation of body—it's a transformation of confidence, strength, and mindset.

Ritika has been working on her fitness journey and has done Detox juice plans, dinner plans and nutrition coaching with us. We are so proud of how far you've come, Ritika!`,
      result: "Lost 17kg (72kg → 55kg)",
      rating: 5,
    },
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
              stay consistent over time.
            </p>
          </div>
        </motion.div>

        {/* Client Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid md:grid-cols-4 gap-8 mb-16"
        >
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg border border-[#A3AD5F]/10 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Client Image */}
              <div className="relative h-96 w-full bg-gradient-to-br from-[#A3AD5F]/20 to-[#5B544D]/20">
                <Image
                  src={client.image}
                  alt={client.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Client Info */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: client.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[#A3AD5F] text-[#A3AD5F]"
                      strokeWidth={0}
                    />
                  ))}
                </div>

                {/* Feedback */}
                <p className="text-[#5B544D] text-sm leading-relaxed mb-4 italic whitespace-pre-wrap">
                  {expandedClients[client.id]
                    ? client.feedback
                    : `${client.feedback.substring(0, 150)}...`}
                </p>

                {/* Read More/Less Button */}
                <button
                  onClick={() =>
                    setExpandedClients((prev) => ({
                      ...prev,
                      [client.id]: !prev[client.id],
                    }))
                  }
                  className="inline-flex items-center gap-2 text-[#A3AD5F] text-sm font-semibold hover:text-[#8B9650] transition-colors duration-200 mb-4"
                >
                  {expandedClients[client.id] ? "Read Less" : "Read More"}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      expandedClients[client.id] ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Result */}
                <div className="mb-4 pt-4 border-t border-[#A3AD5F]/20">
                  <p className="text-[#A3AD5F] font-semibold text-sm">
                    {client.result}
                  </p>
                </div>

                {/* Client Name */}
                <h4 className="text-[#2E2A26] font-semibold text-lg">
                  {client.name}
                </h4>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="text-center text-sm text-[#6B7D6D] mb-16">
          Results vary from person to person based on goals, consistency, and
          lifestyle.
        </p>

        {/* Reviews CTA Section */}

        {/* Testimonial Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 max-w-4xl mx-auto"
        ></motion.div>
      </div>
    </section>
  );
}
