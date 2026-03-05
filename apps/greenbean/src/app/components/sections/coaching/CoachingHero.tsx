import Image from "next/image";

import { motion } from "framer-motion";
import { Dumbbell, ArrowRight, Sparkles } from "lucide-react";

export default function CoachingHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#E8ECCf]/30 to-transparent" />
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-[#6E7A3C] bg-[#E8ECCf] rounded-full">
            FOUNDER & LEAD COACH
          </span>
          <h1 className="text-5xl md:text-6xl font-light leading-tight mb-6">
            Meet Klaudia Kaliisa
          </h1>
          <p className="text-xl text-[#5B544D] max-w-2xl mx-auto leading-relaxed">
            Founder of Green Bean | Certified Nutrition Coach | Wellness
            Strategist | Fitness Coach
          </p>
          <div className="mt-16 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative w-full max-w-3xl"
            >
              {/* Background accent shape */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#A3AD5F]/10 to-[#5B544D]/10 rounded-3xl blur-2xl" />

              {/* Image container with border */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#A3AD5F]/20 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                <div className="relative aspect-[4/5] md:aspect-[16/9] w-full overflow-hidden h-[550]">
                  <Image
                    src="/images/Klaudia.jpg"
                    alt="Klaudia Kaliisa - Founder & Lead Coach"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Studio Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-10 pt-10 relative"
          >
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#A3AD5F]/0 via-[#A3AD5F]/5 to-[#A3AD5F]/0 rounded-3xl blur-xl" />
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-[#A3AD5F]/10 rounded-full blur-3xl" />

            <div className="relative">
              {/* Sparkle decorations */}

              <h3 className="text-3xl md:text-4xl font-light text-[#2E2A26] mb-4">
                Transform Your Fitness Journey
              </h3>

              <p className="text-xl text-[#5B544D] max-w-2xl mx-auto leading-relaxed mb-10">
                Join Klaudia for personalized fitness training at her studio in
                Kampala
              </p>

              <motion.a
                href="https://wellness-project-rqg2.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(163, 173, 95, 0.4)",
                    "0 0 0 10px rgba(163, 173, 95, 0)",
                  ],
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity },
                  scale: { duration: 0.3 },
                }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#A3AD5F] to-[#B8BE6B] text-white px-12 py-5 rounded-full text-lg font-bold hover:from-[#92985A] hover:to-[#A3AD5F] transition-all duration-300 shadow-lg"
              >
                <span>HEY PILATES</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>

              <p className="text-slate-400 text-sm mt-6">
                Limited spots available • Book your session now
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
