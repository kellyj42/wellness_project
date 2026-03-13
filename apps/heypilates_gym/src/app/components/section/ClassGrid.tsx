"use client";

import Image from "next/image";
import {
  Users,
  Clock3,
  Target,
  ChevronRight,
  Dumbbell,
  Sparkles,
  ArrowUpRight,
  BadgeCheck,
} from "lucide-react";
import { Button } from "../ui/Button";

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

const toClassSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

export default function ClassGrid({ classes }: ClassGridProps) {
  return (
    <div className="space-y-8 px-2 sm:space-y-12 sm:px-0">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {classes.map((classItem) => {
          const category = getCategoryMeta(classItem.category);
          const benefits = classItem.benefits ?? [];
          const equipment = classItem.equipment ?? [];
          const displayedBenefits = benefits.slice(0, 2);
          const displayedEquipment = equipment.slice(0, 3);
          const accentColor = classItem.color || "#7C8F69";

          return (
            <article
              key={classItem._id}
              className="group overflow-hidden rounded-[28px] border border-brand-sageLight/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                {classItem.image?.asset?.url ? (
                  <Image
                    src={classItem.image.asset.url}
                    alt={classItem.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white/18 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur-sm">
                      {category.label}
                    </span>
                    <span className="rounded-full bg-white/18 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                      {getLevelLabel(classItem.level)}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight">
                    {classItem.name}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-3 gap-3 rounded-2xl bg-brand-cream/60 p-4 text-center">
                  <div>
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-sageDark shadow-sm">
                      <Clock3 className="h-4 w-4" />
                    </div>
                    <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-brand-muted">
                      Duration
                    </p>
                    <p className="mt-1 text-sm font-semibold text-brand-charcoal">
                      {classItem.duration || "TBA"}
                    </p>
                  </div>
                  <div>
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-sageDark shadow-sm">
                      <Users className="h-4 w-4" />
                    </div>
                    <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-brand-muted">
                      Capacity
                    </p>
                    <p className="mt-1 text-sm font-semibold text-brand-charcoal">
                      {classItem.maxParticipants ? `${classItem.maxParticipants} max` : "Small group"}
                    </p>
                  </div>
                  <div>
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-sageDark shadow-sm">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-brand-muted">
                      Price
                    </p>
                    <p className="mt-1 text-sm font-semibold text-brand-charcoal">
                      {getPriceLabel(classItem.singlePrice)}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-brand-muted line-clamp-3 sm:text-base">
                  {classItem.description || "A focused movement class designed to build strength, control, and confidence."}
                </p>

                {displayedBenefits.length > 0 && (
                  <div className="mt-5">
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
                  <div className="mt-5 rounded-2xl border border-brand-sageLight/70 bg-white p-4">
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

                {(classItem.packagePrice || classItem.packageValidity) && (
                  <div
                    className="mt-6 rounded-2xl p-4 text-sm"
                    style={{ backgroundColor: `${accentColor}12` }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-brand-charcoal">
                          Package option
                        </p>
                        <p className="mt-1 text-brand-muted">
                          {getPriceLabel(classItem.packagePrice)}
                          {classItem.packageValidity ? ` for ${classItem.packageValidity}` : ""}
                        </p>
                      </div>
                      <BadgeCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-sageDark" />
                    </div>
                  </div>
                )}

                <div className="mt-6 flex gap-3">
                  <Button
                    href="/classes#weekly-schedule"
                    className="flex-1 bg-brand-sageDark text-white hover:bg-brand-sage"
                  >
                    View Schedule
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                  <Button
                    href={`/booking?class=${toClassSlug(classItem.name)}`}
                    variant="outline"
                    className="border-brand-sageDark text-brand-sageDark hover:bg-brand-sageLight"
                  >
                    Book
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
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
