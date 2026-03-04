import { motion } from "framer-motion";
import { Briefcase, CheckCircle2 } from "lucide-react";

export default function CorporateWellness() {
  return (
    <section className="bg-[#2E2A26] text-[#F5F3EE] py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1F1B18]/40 via-transparent to-[#1F1B18]/60" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Briefcase className="w-10 h-10 text-[#A3AD5F] mx-auto mb-4" />
          <h2 className="text-4xl font-light mb-4">
            Corporate Well-being & Wellness Consulting
          </h2>
          <p className="text-xl text-[#E0DDD6] max-w-2xl mx-auto">
            Bringing wellness to workplaces, schools, and hospitality.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-7"
          >
            <p className="text-[#E0DDD6] leading-relaxed text-lg">
              Wellness extends beyond individuals — it thrives in workplaces,
              schools, and hospitality environments.
            </p>
            <ul className="space-y-4 text-[#E0DDD6]">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#A3AD5F] flex-shrink-0 mt-1" />
                <span>Nutrition Workshops & Talks</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#A3AD5F] flex-shrink-0 mt-1" />
                <span>Menu Audits & Redesign</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#A3AD5F] flex-shrink-0 mt-1" />
                <span>Staff Training & Implementation</span>
              </li>
            </ul>
            <div className="pt-6 border-t border-[#4A433C] text-sm text-[#B0A99F]">
              Available for schools, boutique hospitality, and wellness-focused
              brands.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-[#E0DDD6] text-lg">Past projects include:</p>
            <div className="bg-[#26221F] p-6 rounded-3xl border border-[#4A433C] shadow-[0_20px_50px_-30px_rgba(0,0,0,0.8)] space-y-6">
              <div className="flex flex-col md:flex-row items-start gap-5">
                <img
                  src="/projects/french.jpg"
                  alt="The French School of Kampala"
                  className="w-full md:w-52 h-48 rounded-2xl object-cover flex-shrink-0 ring-1 ring-[#4A433C]"
                />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#A3AD5F]">
                    Education
                  </p>
                  <p className="text-lg font-medium mt-2">
                    The French School of Kampala
                  </p>
                  <p className="text-sm text-[#B0A99F] mt-2">
                    I led a comprehensive 3-month wellness project that
                    transformed the school's approach to nutrition and health.
                  </p>
                   <ul className="mt-4 space-y-2 text-sm text-[#D4CFC7]">
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#A3AD5F]" />
                     Comprehensive review of school lunch menus for staff and children
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#A3AD5F]" />
                      Nutrition workshops for students across all age groups
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#A3AD5F]" />
                      Parent workshop focused on family nutrition and healthy habits
                    </li>
                  </ul>
                </div>
              </div>
              <div className="h-px bg-[#3C3630]" />
              <div className="flex flex-col md:flex-row items-start gap-5">
                <img
                  src="/projects/chameleon.jpg"
                  alt="Chameleon Hill Lodge"
                  className="w-full md:w-52 h-48 rounded-2xl object-cover flex-shrink-0 ring-1 ring-[#4A433C]"
                />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#A3AD5F]">
                    Hospitality
                  </p>
                  <p className="text-lg font-medium mt-2">
                    Chameleon Hill Lodge
                  </p>
                  <p className="text-sm text-[#B0A99F] mt-2">
                    I partnered with this eco-lodge on Lake Mutanda to enhance
                    their wellness retreat offerings.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-[#D4CFC7]">
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#A3AD5F]" />
                      Designed a new vegetarian menu for wellness retreats.
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#A3AD5F]" />
                      Facilitated week-long training with the kitchen team.
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#A3AD5F]" />
                      Introduced recipes and demonstrated preparation methods.
                    </li>
                  </ul>
                  <p className="mt-4 text-sm text-[#B0A99F]">
                    Staff gained confidence to deliver exceptional wellness
                    dining experiences to guests.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="https://wa.me/256777615775"
            className="inline-flex items-center gap-2 bg-[#A3AD5F] text-[#2E2A26] px-8 py-4 rounded-full font-medium hover:bg-[#B8C47A] transition shadow-lg hover:shadow-xl"
          >
            Inquire About Corporate Consulting
          </a>
        </motion.div>
      </div>
    </section>
  );
}
