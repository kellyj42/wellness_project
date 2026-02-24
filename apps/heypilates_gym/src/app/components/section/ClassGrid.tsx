// app/classes/components/ClassGrid.tsx - Mobile responsive
"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Users,
  Clock,
  Target,
  ChevronRight,
  Heart,
  Dumbbell,
} from "lucide-react";
import { Button } from "../ui/Button";

interface ClassType {
  _id: string;
  name: string;
  description: string;
  maxParticipants: number;
  duration: string;
  level: string;
  category?: string;
  equipment: string[];
  benefits: string[];
  singlePrice: string;
  packagePrice: string;
  packageValidity: string;
  color: string;
  image?: {
    asset?: {
      url?: string;
    };
  };
}

interface ClassGridProps {
  classes: ClassType[];
}

export default function ClassGrid({ classes }: ClassGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const filteredClasses =
    selectedCategory === "all"
      ? classes
      : classes.filter((c) => c.category === selectedCategory);

  const categories = [
    { id: "all", name: "All Classes", icon: "🌟" },
    { id: "pilates", name: "Pilates", icon: "🧘" },
    { id: "strength", name: "Strength", icon: "💪" },
    { id: "cardio", name: "Cardio", icon: "⚡" },
    { id: "fusion", name: "Fusion", icon: "✨" },
  ];

  return (
    <div className="space-y-8 sm:space-y-12 px-2 sm:px-0">
      {/* Category Filter - Scrollable on mobile */}
      

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {filteredClasses.map((classItem) => (
          <div
            key={classItem._id}
            className={`group bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden border border-gray-200 sm:border-2 sm:border-transparent hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 ${
              selectedClass === classItem._id
                ? "border-brand-sage sm:border-brand-sage sm:scale-[1.02]"
                : "hover:border-brand-sageLight"
            }`}
            onClick={() => setSelectedClass(classItem._id)}
          >
            {/* Image Section */}
            <div className="relative h-48 sm:h-56 overflow-hidden">
              {classItem.image?.asset?.url ? (
                <Image
                  src={classItem.image.asset.url}
                  alt={classItem.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-brand-sageLight to-brand-sage flex items-center justify-center">
                  <div className="text-center text-white">
                    <span className="text-4xl sm:text-5xl mb-2 sm:mb-4 block">
                      {classItem.category === "pilates" ? "🧘‍♀️" : 
                       classItem.category === "strength" ? "💪" : 
                       classItem.category === "cardio" ? "⚡" : "✨"}
                    </span>
                    <p className="font-medium text-sm sm:text-base">{classItem.name}</p>
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Class Badge */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                {classItem.category && (
                  <div
                    className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold text-white ${
                      classItem.category === "pilates"
                        ? "bg-brand-sageDark"
                        : classItem.category === "strength"
                          ? "bg-amber-600"
                          : classItem.category === "cardio"
                            ? "bg-rose-600"
                            : "bg-purple-600"
                    }`}
                  >
                    {classItem.category.toUpperCase()}
                  </div>
                )}
              </div>

              {/* Favorite Button */}
              <button className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
            </div>

            {/* Content Section */}
            <div className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex-1 pr-2">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-brand-charcoal mb-1 sm:mb-2 line-clamp-1">
                    {classItem.name}
                  </h3>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-brand-muted">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      {classItem.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                      {classItem.maxParticipants} max
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-brand-sageDark">
                    {classItem.singlePrice.split(" ")[0]}
                  </div>
                  <div className="text-xs text-brand-muted">per class</div>
                </div>
              </div>

              <p className="text-brand-muted text-sm sm:text-base mb-4 sm:mb-6 line-clamp-2">
                {classItem.description}
              </p>

              {/* Benefits */}
              <div className="mb-4 sm:mb-6">
                <h4 className="font-semibold text-brand-charcoal mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <Target className="w-3 h-3 sm:w-4 sm:h-4 text-brand-sage" />
                  Key Benefits:
                </h4>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {classItem.benefits?.slice(0, 3).map((benefit, idx) => (
                    <span
                      key={idx}
                      className="px-2 sm:px-3 py-1 bg-brand-cream text-brand-sageDark rounded-full text-xs sm:text-sm"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              {classItem.equipment && classItem.equipment.length > 0 && (
                <div className="mb-4 sm:mb-6">
                  <h4 className="font-semibold text-brand-charcoal mb-1 sm:mb-2 text-xs sm:text-sm">
                    Equipment:
                  </h4>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {classItem.equipment.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 sm:gap-3">
                <Button
                  href={`/booking?class=${classItem.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex-1 bg-brand-sageDark hover:bg-brand-sage text-white text-sm sm:text-base py-2 sm:py-2.5"
                >
                  Book Now
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                </Button>
                <Button
                  href={`/classes/${classItem.name.toLowerCase().replace(/\s+/g, "-")}`}
                  variant="outline"
                  className="border-brand-sage text-brand-sageDark hover:bg-brand-sageLight text-sm sm:text-base py-2 sm:py-2.5 px-3 sm:px-4"
                >
                  Details
                </Button>
              </div>

              {/* Package Deal */}
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-brand-sageLight text-center">
                <p className="text-xs sm:text-sm text-brand-muted">
                  <span className="font-bold text-brand-sageDark">
                    {classItem.packagePrice}
                  </span>{" "}
                  for {classItem.packageValidity}
                  <span className="block text-xs text-brand-muted mt-0.5 sm:mt-1">
                    Save up to 20% with packages
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredClasses.length === 0 && (
        <div className="text-center py-12 sm:py-20">
          <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-brand-sageLight rounded-full flex items-center justify-center">
            <Dumbbell className="w-8 h-8 sm:w-12 sm:h-12 text-brand-sageDark" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-brand-charcoal mb-3 sm:mb-4">
            No classes in this category yet
          </h3>
          <p className="text-brand-muted mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
            We're constantly adding new classes. Check back soon or browse all
            our offerings.
          </p>
          <Button
            onClick={() => setSelectedCategory("all")}
            className="bg-brand-sageDark hover:bg-brand-sage text-white text-sm sm:text-base"
          >
            View All Classes
          </Button>
        </div>
      )}
    </div>
  );
}