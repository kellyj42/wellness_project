"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Users,
  Clock3,
  Target,
  ChevronDown,
  Dumbbell,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

interface ClassType {
  _id: string;
  name: string;
  description?: string;
  maxParticipants?: number;
  duration?: string;
  level?: string;
  category?: string;
  equipment?: string[];
  benefits?: string[];
  singlePrice?: string;
  packagePrice?: string;
  packageValidity?: string;
  color?: string;
  image?: {
    asset?: {
      url?: string;
    };
  };
}

interface ClassGridProps {
  classes: ClassType[];
}

const categoryMeta: Record<string, { label: string; emoji: string }> = {
  pilates: { label: "Pilates", emoji: "CP" },
  strength: { label: "Strength", emoji: "ST" },
  cardio: { label: "Cardio", emoji: "CA" },
  fusion: { label: "Fusion", emoji: "FX" },
};

const getCategoryMeta = (category?: string) => {
  if (!category) {
    return { label: "Class", emoji: "HP" };
  }

  return categoryMeta[category.toLowerCase()] ?? {
    label: category,
    emoji: category.slice(0, 2).toUpperCase(),
  };
};

const getLevelLabel = (level?: string) => {
  if (!level) {
    return "All Levels";
  }

  return level
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const getPriceLabel = (price?: string) => {
  if (!price) {
    return "Contact us";
  }

  return price.replace(/\s+/g, " ").trim();
};

const getPricingDetails = (classItem: ClassType) => {
  const normalizedName = classItem.name.trim().toLowerCase();

  if (normalizedName === "reformer pilates") {
    return {
      singlePrice: "60,000 UGX",
      packagePrice: "400,000 UGX",
      packageLabel: "8-class pass",
      packageValidity: "6 weeks",
    };
  }

  return {
    singlePrice: getPriceLabel(classItem.singlePrice),
    packagePrice: getPriceLabel(classItem.packagePrice),
    packageLabel: "Class pass",
    packageValidity: classItem.packageValidity,
  };
};

export default function ClassGrid({ classes }: ClassGridProps) {
  const [expandedDescriptionIds, setExpandedDescriptionIds] = useState<string[]>([]);
  const [expandedCardIds, setExpandedCardIds] = useState<string[]>([]);

  const toggleDescription = (classId: string) => {
    setExpandedDescriptionIds((prev) =>
      prev.includes(classId)
        ? prev.filter((id) => id !== classId)
        : [...prev, classId],
    );
  };

  const toggleCard = (classId: string) => {
    setExpandedCardIds((prev) =>
      prev.includes(classId)
        ? prev.filter((id) => id !== classId)
        : [...prev, classId],
    );
  };

  return (
    <div className="space-y-8 px-2 sm:space-y-12 sm:px-0">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4 xl:gap-6 2xl:gap-8">
        {classes.map((classItem) => {
          const isDescriptionExpanded = expandedDescriptionIds.includes(classItem._id);
          const isCardExpanded = expandedCardIds.includes(classItem._id);
          const category = getCategoryMeta(classItem.category);
          const benefits = classItem.benefits ?? [];
          const equipment = classItem.equipment ?? [];
          const displayedBenefits = benefits.slice(0, 2);
          const displayedEquipment = equipment.slice(0, 3);
          const accentColor = classItem.color || "#7C8F69";
          const pricing = getPricingDetails(classItem);

          return (
            <article
              key={classItem._id}
              className="overflow-hidden rounded-[24px] border border-brand-sageLight/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <button
                type="button"
                onClick={() => toggleCard(classItem._id)}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5 sm:py-5"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-brand-cream px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-sageDark">
                      {category.label}
                    </span>
                    <span className="rounded-full border border-brand-sageLight px-3 py-1 text-[11px] font-medium text-brand-muted">
                      {getLevelLabel(classItem.level)}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-tight text-brand-charcoal">
                    {classItem.name}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-brand-muted">
                    <span>{classItem.duration || "TBA"}</span>
                    <span>
                      {classItem.maxParticipants
                        ? `${classItem.maxParticipants} max`
                        : "Small group"}
                    </span>
                    <span>{pricing.singlePrice}</span>
                  </div>
                </div>
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-brand-sageLight bg-brand-cream/70 text-brand-sageDark transition-transform duration-300 ${
                    isCardExpanded ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>

              {isCardExpanded && (
                <div className="border-t border-brand-sageLight/70 px-4 py-4 sm:px-5 sm:py-5">
                  <div className="relative h-48 overflow-hidden rounded-2xl sm:h-56">
                    {classItem.image?.asset?.url ? (
                      <Image
                        src={classItem.image.asset.url}
                        alt={classItem.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${accentColor} 0%, #F4F6F1 100%)`,
                        }}
                      >
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-2xl font-semibold tracking-[0.2em] text-white backdrop-blur-sm">
                          {category.emoji}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-brand-cream/60 p-3 text-center sm:gap-3 sm:p-4">
                    <div>
                      <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-sageDark shadow-sm sm:h-10 sm:w-10">
                        <Clock3 className="h-4 w-4" />
                      </div>
                      <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.16em] text-brand-muted sm:text-xs">
                        Duration
                      </p>
                      <p className="mt-1 text-xs font-semibold text-brand-charcoal sm:text-sm">
                        {classItem.duration || "TBA"}
                      </p>
                    </div>
                    <div>
                      <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-sageDark shadow-sm sm:h-10 sm:w-10">
                        <Users className="h-4 w-4" />
                      </div>
                      <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.16em] text-brand-muted sm:text-xs">
                        Capacity
                      </p>
                      <p className="mt-1 text-xs font-semibold text-brand-charcoal sm:text-sm">
                        {classItem.maxParticipants ? `${classItem.maxParticipants} max` : "Small group"}
                      </p>
                    </div>
                    <div>
                      <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-sageDark shadow-sm sm:h-10 sm:w-10">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.16em] text-brand-muted sm:text-xs">
                        Price
                      </p>
                      <p className="mt-1 text-xs font-semibold text-brand-charcoal sm:text-sm">
                        {pricing.singlePrice}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p
                      className={`text-sm leading-7 text-brand-muted sm:text-base ${
                        isDescriptionExpanded ? "" : "line-clamp-4"
                      }`}
                    >
                      {classItem.description ||
                        "A focused movement class designed to build strength, control, and confidence."}
                    </p>
                    {classItem.description && classItem.description.length > 160 && (
                      <button
                        type="button"
                        onClick={() => toggleDescription(classItem._id)}
                        className="mt-2 text-sm font-semibold text-brand-sageDark transition hover:text-brand-sage"
                      >
                        {isDescriptionExpanded ? "Show less" : "Read more"}
                      </button>
                    )}
                  </div>

                  {benefits.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-brand-charcoal">
                        <Target className="h-4 w-4 text-brand-sageDark" />
                        Best For
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {displayedBenefits.map((benefit, index) => (
                          <span
                            key={`${classItem._id}-benefit-${index}-${benefit}`}
                            className="rounded-full border border-brand-sageLight bg-white px-3 py-1 text-sm text-brand-sageDark"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {displayedEquipment.length > 0 && (
                    <div className="mt-4 rounded-2xl border border-brand-sageLight/70 bg-white p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-brand-charcoal">
                        <Dumbbell className="h-4 w-4 text-brand-sageDark" />
                        Equipment
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {displayedEquipment.map((item, index) => (
                          <span
                            key={`${classItem._id}-equipment-${index}-${item}`}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                          >
                            {item}
                          </span>
                        ))}
                        {equipment.length > displayedEquipment.length && (
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                            +{equipment.length - displayedEquipment.length} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {(pricing.packagePrice !== "Contact us" || pricing.packageValidity) && (
                    <div
                      className="mt-4 rounded-2xl p-4 text-sm"
                      style={{ backgroundColor: `${accentColor}12` }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-brand-charcoal">Prices</p>
                          {pricing.singlePrice !== "Contact us" && (
                            <p className="mt-1 text-brand-muted">
                              Walk-in class: {pricing.singlePrice}
                            </p>
                          )}
                          <p className="mt-1 text-brand-muted">
                            {pricing.packageLabel}: {pricing.packagePrice}
                            {pricing.packageValidity
                              ? ` for ${pricing.packageValidity}`
                              : ""}
                          </p>
                        </div>
                        <BadgeCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-sageDark" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>

      {classes.length === 0 && (
        <div className="py-12 text-center sm:py-20">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-sageLight sm:mb-6 sm:h-24 sm:w-24">
            <Dumbbell className="h-8 w-8 text-brand-sageDark sm:h-12 sm:w-12" />
          </div>
          <h3 className="mb-3 text-xl font-bold text-brand-charcoal sm:mb-4 sm:text-2xl">
            No classes available yet
          </h3>
          <p className="mx-auto mb-6 max-w-md text-sm text-brand-muted sm:mb-8 sm:text-base">
            Add a few class entries in Sanity and they will appear here automatically.
          </p>
        </div>
      )}
    </div>
  );
}
