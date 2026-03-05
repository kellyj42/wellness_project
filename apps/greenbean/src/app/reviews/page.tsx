"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  Star,
  ArrowLeft,
  Heart,
  ThumbsUp,
  MessageSquare,
  Camera,
  ExternalLink,
} from "lucide-react";

interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  text: string;
  avatar?: string;
}

interface ReviewsData {
  rating: number;
  totalReviews: number;
  reviews: Review[];
}

type FilterType = "all" | "latest" | "week" | "month";

export default function ReviewsPage() {
  const ref = useRef(null);

  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");

        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data = await response.json();
        setReviewsData(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Unable to load reviews at this time");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Function to parse Google's relative time strings
  const parseRelativeTime = (dateStr: string): number => {
    const str = dateStr.toLowerCase();

    // Extract number from string
    const match = str.match(/(\d+)/);
    const num = match ? parseInt(match[1]) : 0;

    // Calculate days ago
    if (str.includes("day")) return num;
    if (str.includes("week")) return num * 7;
    if (str.includes("month")) return num * 30;
    if (str.includes("year")) return num * 365;
    if (
      str.includes("hour") ||
      str.includes("minute") ||
      str.includes("just now") ||
      str.includes("recently")
    )
      return 0;

    return 999; // Default to very old
  };

  // Filter reviews based on active filter
  const getFilteredReviews = () => {
    if (!reviewsData?.reviews) return [];

    const allReviews = [...reviewsData.reviews];

    switch (activeFilter) {
      case "latest":
        // Sort by most recent
        return allReviews.sort(
          (a, b) => parseRelativeTime(a.date) - parseRelativeTime(b.date),
        );

      case "week":
        // Reviews from the last 7 days
        return allReviews.filter(
          (review) => parseRelativeTime(review.date) <= 7,
        );

      case "month":
        // Reviews from the last 30 days
        return allReviews.filter(
          (review) => parseRelativeTime(review.date) <= 30,
        );

      case "all":
      default:
        return allReviews;
    }
  };

  const reviews = getFilteredReviews();
  const rating = reviewsData?.rating || 4.9;
  const totalReviews = reviewsData?.totalReviews || 0;

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${
              index < rating
                ? "fill-[#FFC244] text-[#FFC244]"
                : "fill-none text-[#CFCBC4]"
            }`}
          />
        ))}
      </div>
    );
  };

  const filters: { label: string; value: FilterType }[] = [
    { label: "All Reviews", value: "all" },
    { label: "Latest", value: "latest" },
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#5B544D] to-[#2E2A26] text-[#F5F3EE] overflow-hidden">
        {/* Decorative elements */}
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

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Rating Badge */}
            <div className="inline-flex items-center gap-3 bg-[#A3AD5F]/20 px-8 py-4 rounded-full mb-8 border border-[#A3AD5F]/30 backdrop-blur-sm">
              <Star className="w-12 h-12 text-[#FFC244] fill-[#FFC244]" />
              <div className="text-left">
                <div className="text-4xl font-bold text-[#F5F3EE]">
                  {loading ? "..." : rating.toFixed(1)}
                </div>
                <div className="text-sm text-[#CFCBC4]">
                  {totalReviews > 0
                    ? `${totalReviews}+ Reviews`
                    : "Google Rating"}
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
              Your Feedback{" "}
              <span className="text-[#A3AD5F] font-normal">Matters</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#CFCBC4] max-w-3xl mx-auto mb-12 leading-relaxed">
              Help us serve Kampala better. Share your Green Bean experience and
              help others discover healthy eating.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link
                href="https://www.google.com/search?q=Green+Bean+Cafe+Reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-[#A3AD5F] text-[#2E2A26] px-10 py-5 rounded-full text-lg font-semibold overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Star className="w-6 h-6" />
                  Leave a Google Review
                  <ExternalLink className="w-5 h-5" />
                </span>
                <motion.span
                  className="absolute inset-0 bg-[#B8C474]"
                  initial={{ scale: 0, x: "-100%" }}
                  whileHover={{ scale: 2, x: 0 }}
                  transition={{ duration: 0.5, ease: [0.2, 1, 0.3, 1] }}
                />
              </Link>
            </div>

            {/* Why Reviews Matter */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: Heart,
                  title: "Support Local",
                  description: "Help us grow and serve more healthy meals",
                },
                {
                  icon: ThumbsUp,
                  title: "Guide Others",
                  description: "Share your journey to inspire healthy living",
                },
                {
                  icon: MessageSquare,
                  title: "Improve Service",
                  description: "Your feedback helps us serve you better",
                },
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                    className="bg-[#3A3530]/50 backdrop-blur-sm p-6 rounded-2xl border border-[#A3AD5F]/20"
                  >
                    <IconComponent
                      className="w-10 h-10 text-[#A3AD5F] mx-auto mb-3"
                      strokeWidth={1.5}
                    />
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-[#CFCBC4]">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How to Leave a Review */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-light text-[#2E2A26] mb-4">
              How to <span className="text-[#A3AD5F]">Leave a Review</span>
            </h2>
            <p className="text-lg text-[#5B544D]">
              It only takes 2 minutes to make a big difference
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Click the Button",
                description:
                  "Click 'Leave a Google Review' above to open Google",
              },
              {
                step: "2",
                title: "Rate Your Experience",
                description:
                  "Select 1-5 stars based on your Green Bean experience",
              },
              {
                step: "3",
                title: "Share Your Story",
                description:
                  "Write a few words about your favorite meals or results",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative"
              >
                <div className="bg-[#F5F3EE] p-8 rounded-2xl border-2 border-[#A3AD5F]/20 hover:border-[#A3AD5F]/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-[#A3AD5F] rounded-full flex items-center justify-center text-[#2E2A26] text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-[#2E2A26] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#5B544D]">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#A3AD5F]/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Reviews */}
      <section id="client-reviews" ref={ref} className="py-20 bg-[#F5F3EE]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-light text-[#2E2A26] mb-4">
              What Our <span className="text-[#A3AD5F]">Clients Say</span>
            </h2>
            <p className="text-lg text-[#5B544D]">
              Real feedback from real clients
            </p>
          </motion.div>

          {/* Filter Buttons */}
          {!loading && !error && reviewsData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeFilter === filter.value
                      ? "bg-[#A3AD5F] text-[#F5F3EE] shadow-lg shadow-[#A3AD5F]/20"
                      : "bg-white text-[#2E2A26] hover:bg-[#A3AD5F]/10 hover:text-[#2E2A26] border border-[#2E2A26]/10"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </motion.div>
          )}

          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#A3AD5F]"></div>
              <p className="text-[#5B544D] mt-4">Loading reviews...</p>
            </div>
          )}

          {!loading && reviews.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#A3AD5F]/20 flex items-center justify-center text-[#A3AD5F] font-bold text-lg border border-[#A3AD5F]/30">
                      {review.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-[#2E2A26]">
                        {review.name}
                      </div>
                      <div className="text-xs text-[#5B544D]">
                        {review.date}
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-4">{renderStars(review.rating)}</div>

                  {/* Review Text */}
                  <p className="text-[#5B544D] leading-relaxed text-sm">
                    "{review.text}"
                  </p>

                  {/* Google Logo */}
                  <div className="mt-4 pt-4 border-t border-[#A3AD5F]/10 flex items-center gap-2 text-xs text-[#5B544D]">
                    <span className="text-lg font-bold text-[#4285F4]">G</span>
                    <span>Google Review</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-[#A3AD5F] to-[#8A9450] text-[#2E2A26]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Camera
              className="w-16 h-16 mx-auto mb-6 text-[#2E2A26]"
              strokeWidth={1.5}
            />
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Had a Great Experience?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Share your transformation story and inspire others on their
              healthy living journey
            </p>
            <Link
              href="https://www.google.com/search?q=Green+Bean+Cafe+Reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#2E2A26] text-[#F5F3EE] px-10 py-5 rounded-full text-lg font-semibold hover:bg-[#1A1714] hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Star className="w-6 h-6 fill-[#FFC244] text-[#FFC244]" />
              Write Your Review Now
              <ExternalLink className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
