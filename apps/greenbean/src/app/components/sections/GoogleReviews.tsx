"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Star } from "lucide-react";

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

export default function GoogleReviews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Show only first 3 reviews on homepage
  const reviews = reviewsData?.reviews.slice(0, 3) || [];
  const rating = reviewsData?.rating || 4.9;
  const totalReviews = reviewsData?.totalReviews || 0;

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={index < rating ? "text-[#A3AD5F]" : "text-[#CFCBC4]"}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <section ref={ref} className="relative py-24 bg-[#2E2A26] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#A3AD5F]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A3AD5F]/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#A3AD5F]/10 px-6 py-3 rounded-full mb-6 border border-[#A3AD5F]/20">
            <Star className="w-10 h-10 text-[#A3AD5F] fill-[#A3AD5F]" />
            <div className="text-left">
              <div className="text-2xl font-bold text-[#F5F3EE]">
                {loading ? "..." : rating.toFixed(1)}
              </div>
              <div className="text-xs text-[#CFCBC4]">Google Rating</div>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-light text-[#F5F3EE] mb-6">
            Loved by <span className="text-[#A3AD5F] font-normal">Kampala</span>
          </h2>
          <p className="text-xl text-[#CFCBC4] max-w-3xl mx-auto">
            Don't just take our word for it. See what our clients are saying
            about their transformation journey with Green Bean.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#A3AD5F]"></div>
            <p className="text-[#CFCBC4] mt-4">Loading reviews...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-[#CFCBC4] text-lg">{error}</p>
          </div>
        )}

        {!loading && !error && reviews.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#CFCBC4] text-lg">
              No reviews available at this time.
            </p>
          </div>
        )}

        {!loading && !error && reviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                className="bg-[#3A3530] p-6 rounded-2xl border border-[#A3AD5F]/10 hover:border-[#A3AD5F]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#A3AD5F]/5"
              >
                {/* Header - Avatar, Name, Date */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#A3AD5F]/20 flex items-center justify-center text-[#A3AD5F] font-bold text-lg border border-[#A3AD5F]/30">
                    {review.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-[#F5F3EE]">
                      {review.name}
                    </div>
                    <div className="text-xs text-[#CFCBC4]">{review.date}</div>
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-4 text-xl">{renderStars(review.rating)}</div>

                {/* Review Text */}
                <p className="text-[#E8E5DF] leading-relaxed text-sm">
                  "{review.text}"
                </p>

                {/* Google Logo */}
                <div className="mt-4 pt-4 border-t border-[#A3AD5F]/10 flex items-center gap-2 text-xs text-[#CFCBC4]">
                  <span className="text-lg">G</span>
                  <span>Posted on Google</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA to Reviews Page */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-center"
          >
            <Link
              href="/reviews"
              className="inline-flex items-center gap-3 bg-[#F5F3EE] text-[#2E2A26] px-10 py-5 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Star className="w-6 h-6 fill-[#A3AD5F] text-[#A3AD5F]" />
              <span>View All Reviews</span>
            </Link>
            <p className="text-[#CFCBC4] mt-4 text-sm">
              Join {totalReviews > 0 ? `${totalReviews}+` : "500+"} satisfied
              clients who trust Green Bean
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
