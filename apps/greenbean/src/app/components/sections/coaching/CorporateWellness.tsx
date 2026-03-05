import { motion } from "framer-motion";
import { Briefcase, BriefcaseBusiness, CheckCircle2 } from "lucide-react";

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
          <Briefcase className="w-16 h-16 text-[#A3AD5F] mx-auto mb-4" />
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
         
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <p className="text-[#E0DDD6] text-lg mb-8">Past projects include:</p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* French School Project */}
            <div className="bg-[#26221F] p-6 rounded-3xl border border-[#4A433C] shadow-[0_20px_50px_-30px_rgba(0,0,0,0.8)] flex flex-col">
              <img
                src="/projects/french.jpg"
                alt="The French School of Kampala"
                className="w-full h-56 rounded-2xl object-cover ring-1 ring-[#4A433C] mb-5"
              />
              <p className="text-xs uppercase tracking-[0.2em] text-[#A3AD5F]">
                Education
              </p>
              <p className="text-lg font-medium mt-2 mb-3">
                The French School of Kampala
              </p>
              <p className="text-sm text-[#B0A99F] flex-grow">
                I led a comprehensive 3-month wellness project that transformed
                the school's approach to nutrition and health, including menu
                reviews, student workshops, and parent education sessions.
              </p>
            </div>

            {/* Chameleon Hill Lodge Project */}
            <div className="bg-[#26221F] p-6 rounded-3xl border border-[#4A433C] shadow-[0_20px_50px_-30px_rgba(0,0,0,0.8)] flex flex-col">
              <img
                src="/projects/chameleon.jpg"
                alt="Chameleon Hill Lodge"
                className="w-full h-56 rounded-2xl object-cover ring-1 ring-[#4A433C] mb-5"
              />
              <p className="text-xs uppercase tracking-[0.2em] text-[#A3AD5F]">
                Hospitality
              </p>
              <p className="text-lg font-medium mt-2 mb-3">
                Chameleon Hill Lodge
              </p>
              <p className="text-sm text-[#B0A99F] flex-grow">
                I partnered with this eco-lodge on Lake Mutanda to enhance their
                wellness retreat offerings through menu design, kitchen team
                training, and recipe development.
              </p>
            </div>

            {/* EO Uganda Project */}
            <div className="bg-[#26221F] p-6 rounded-3xl border border-[#4A433C] shadow-[0_20px_50px_-30px_rgba(0,0,0,0.8)] flex flex-col">
              <div className="grid grid-cols-2 gap-3 mb-5">
                <img
                  src="/projects/eo1.jpeg"
                  alt="EO Uganda wellness session - presentation"
                  className="w-full h-52  rounded-2xl object-cover ring-1 ring-[#4A433C]"
                />
                <img
                  src="/projects/eo2.jpeg"
                  alt="EO Uganda wellness session - attendees"
                  className="w-full h-52 rounded-2xl object-cover ring-1 ring-[#4A433C]"
                />
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#A3AD5F]">
                Corporate
              </p>
              <p className="text-lg font-medium mt-2 mb-3">EO Uganda</p>
              <p className="text-sm text-[#B0A99F] flex-grow">
                I hosted a wellness session for EO Uganda, sharing practical
                nutrition and lifestyle strategies for busy entrepreneurs,
                directors, and business owners to stay productive and healthy.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href={`https://wa.me/256777615775?text=${encodeURIComponent(
              "Hi Klaudia! I clicked 'Inquire About Corporate Consulting' on the Corporate Wellness section. I'm interested in a corporate/hospitality wellness consultation and would like to discuss scope, pricing, and availability.",
            )}`}
            className="inline-flex items-center gap-2 bg-[#A3AD5F] text-[#2E2A26] px-8 py-4 rounded-full font-medium hover:bg-[#B8C47A] transition shadow-lg hover:shadow-xl"
          >
            Inquire About Corporate Consulting
          </a>
        </motion.div>
      </div>
    </section>
  );
}
