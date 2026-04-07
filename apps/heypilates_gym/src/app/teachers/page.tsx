"use client";

// ...existing code...
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Award,
  CalendarCheck2,
  Star,
  ArrowRight,
  CircleDot,
} from "lucide-react";
import { client } from "@/sanity/lib/client";
import { teachersQuery } from "@/sanity/lib/queries";

type Teacher = {
  _id: string;
  name: string;
  title?: string;
  bio?: string;
  specialties?: string[];
  rating?: number;
  sessions?: number;
  isFeatured?: boolean;
  image?: {
    asset?: {
      url?: string;
    };
  };
};

const highlights = [
  {
    title: "Certified Expertise",
    description: "Balanced classical and modern Pilates training.",
    icon: Award,
  },
  {
    title: "Personalized Paths",
    description: "Private and semi-private plans built for you.",
    icon: CalendarCheck2,
  },
  {
    title: "Premium Experience",
    description: "Boutique studio care with best-in-class coaching.",
    icon: Sparkles,
  },
];

const formatSessions = (sessions?: number) => {
  if (!sessions || sessions <= 0) return "";
  return sessions >= 1000
    ? `${(sessions / 1000).toFixed(1)}k+`
    : `${sessions}+`;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100 },
  },
};

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    let isMounted = true;

    client
      .fetch(teachersQuery)
      .then((data) => {
        if (isMounted) {
          setTeachers((data as Teacher[]) ?? []);
        }
      })
      .catch(() => {
        if (isMounted) {
          setTeachers([]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-sageLight via-white to-white">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-sageLight/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-sageLight/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 text-sm text-brand-sageDark border border-brand-sageLight shadow-sm">
                <Sparkles className="w-4 h-4" />
                Premium Teachers
              </div>
              <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-brand-charcoal leading-tight">
                Meet the instructors who elevate every session.
              </h1>
              <p className="mt-4 text-brand-muted text-lg max-w-xl">
                Our teachers blend classical Pilates foundations with modern
                movement science for results you can feel.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/classes"
                  className="group px-6 py-3 rounded-full bg-brand-sageDark text-white hover:bg-brand-sage transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  View Classes
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/private-training"
                  className="px-6 py-3 rounded-full border border-brand-sageDark text-brand-sageDark hover:bg-brand-sageLight transition-all duration-300"
                >
                  Book Private Session
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-brand-sageLight">
                <Image
                  src="/teacher.jpeg"
                  alt="Pilates instructors in studio"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-sageDark/20 to-transparent" />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4 border border-brand-sageLight hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-sageLight rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-brand-sageDark" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-charcoal">
                      4.9/5 Rating
                    </p>
                    <p className="text-xs text-brand-muted">
                      From 500+ reviews
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8"
        >
          {highlights.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="group p-8 rounded-3xl border border-brand-sageLight bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-brand-sageLight/50 rounded-2xl flex items-center justify-center group-hover:bg-brand-sageDark/10 transition-colors">
                <item.icon className="w-6 h-6 text-brand-sageDark" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-brand-charcoal">
                {item.title}
              </h3>
              <p className="mt-2 text-brand-muted leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Teachers */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-charcoal">
              Our Teachers
            </h2>
            <p className="text-brand-muted mt-2 text-lg">
              Handpicked instructors for a boutique, premium experience.
            </p>
          </div>
          <Link
            href="/about"
            className="group text-brand-sageDark hover:text-brand-sage transition text-sm font-medium flex items-center gap-1"
          >
            Learn about our training standards
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {teachers.map((t, index) => (
            <motion.div
              key={t._id}
              variants={itemVariants}
              custom={index}
              className="group rounded-3xl overflow-hidden border border-brand-sageLight bg-white shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-72 overflow-hidden">
                {t.image?.asset?.url ? (
                  <Image
                    src={t.image.asset.url}
                    alt={t.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-brand-sageLight to-brand-sageDark/20" />
                )}
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Featured badge */}
                {t.isFeatured && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-brand-sageDark border border-brand-sageLight shadow-sm">
                    ⭐ Featured
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-brand-charcoal">
                      {t.name}
                    </h3>
                    {t.title && (
                      <p className="text-sm text-brand-muted mt-0.5">
                        {t.title}
                      </p>
                    )}
                  </div>
                  {t.rating ? (
                    <div className="flex items-center gap-1 bg-brand-sageLight/30 px-2 py-1 rounded-full">
                      <Star className="w-3.5 h-3.5 fill-current text-brand-sageDark" />
                      <span className="text-xs font-medium text-brand-sageDark">
                        {t.rating}
                      </span>
                    </div>
                  ) : null}
                </div>

                {t.bio && (
                  <p className="mt-4 text-brand-muted text-sm leading-relaxed line-clamp-2">
                    {t.bio}
                  </p>
                )}

                {t.specialties?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {t.specialties.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="text-xs px-3 py-1.5 rounded-full bg-brand-sageLight/50 text-brand-sageDark border border-brand-sageLight/50"
                      >
                        {s}
                      </span>
                    ))}
                    {t.specialties.length > 3 && (
                      <span className="text-xs px-3 py-1.5 rounded-full bg-white text-brand-muted border border-brand-sageLight">
                        +{t.specialties.length - 3}
                      </span>
                    )}
                  </div>
                ) : null}

                <div className="mt-6 pt-4 border-t border-brand-sageLight flex items-center justify-between text-sm">
                  <span className="text-brand-muted flex items-center gap-1">
                    <CircleDot className="w-3 h-3 text-brand-sageDark" />
                    {formatSessions(t.sessions) || "New"} sessions
                  </span>
                  <Link
                    href="/private-training"
                    className="text-brand-sageDark hover:text-brand-sage transition font-medium flex items-center gap-1 group/link"
                  >
                    Book with {t.name.split(" ")[0]}
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-brand-sageLight/30 to-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-white border border-brand-sageLight p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold text-brand-charcoal">
                Ready for a premium Pilates experience?
              </h3>
              <p className="text-brand-muted mt-2 text-lg">
                Book a private session or join the next class.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/classes"
                className="px-8 py-4 rounded-full bg-brand-sageDark text-white hover:bg-brand-sage transition-all duration-300 shadow-md hover:shadow-lg text-center"
              >
                View Schedule
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 rounded-full border border-brand-sageDark text-brand-sageDark hover:bg-brand-sageLight transition-all duration-300 text-center"
              >
                Pricing & Packages
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
