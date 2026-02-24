import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";
import type { ReactNode } from "react";
import type { PackageItem } from "./types";

type Props = {
  title: string;
  description: string;
  imageUrl?: string;
  icon: ReactNode;
  color: "sage" | "charcoal";
  features: string[];
  prices: PackageItem[];
  highlight?: string;
};

export function TrainingCard({
  title,
  description,
  imageUrl,
  icon,
  color,
  features,
  prices,
  highlight,
}: Props) {
  const colorClasses = {
    sage: {
      bg: "bg-brand-sage",
      light: "bg-brand-sageLight",
      dark: "bg-brand-sageDark",
      text: "text-brand-sageDark",
      hover: "hover:shadow-2xl hover:shadow-brand-sage/20",
    },
    charcoal: {
      bg: "bg-brand-charcoal",
      light: "bg-gray-100",
      dark: "bg-gray-900",
      text: "text-brand-charcoal",
      hover: "hover:shadow-2xl hover:shadow-brand-charcoal/20",
    },
  };

  const currentColor = colorClasses[color];

  return (
    <div
      className={`group relative bg-white rounded-[2.5rem] overflow-hidden border-2 border-transparent hover:border-${
        color === "sage" ? "brand-sageLight" : "gray-200"
      } transition-all duration-500 ${currentColor.hover}`}
    >
      {highlight && (
        <div
          className={`absolute top-6 right-6 z-20 px-4 py-2 ${
            color === "sage" ? "bg-brand-sageDark" : "bg-brand-charcoal"
          } text-white text-sm font-bold rounded-full animate-pulse`}
        >
          {highlight}
        </div>
      )}

      <div className="relative h-72 w-full overflow-hidden">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </>
        ) : (
          <div
            className={`absolute inset-0 ${
              color === "sage"
                ? "bg-gradient-to-br from-brand-sageLight to-brand-sage"
                : "bg-gradient-to-br from-gray-100 to-gray-300"
            } flex items-center justify-center`}
          >
            <div className="text-center p-8">
              <div
                className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${
                  color === "sage" ? "bg-white/20" : "bg-white/30"
                } flex items-center justify-center backdrop-blur-sm`}
              >
                <div
                  className={
                    color === "sage"
                      ? "text-brand-sageDark"
                      : "text-brand-charcoal"
                  }
                >
                  {icon}
                </div>
              </div>
              <p
                className={`font-medium ${color === "sage" ? "text-brand-sageDark" : "text-brand-charcoal"}`}
              >
                Add {title.toLowerCase()} image in Sanity
              </p>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`p-3 ${
                color === "sage" ? "bg-brand-sage/80" : "bg-brand-charcoal/80"
              } rounded-xl backdrop-blur-sm`}
            >
              <div className="text-white">{icon}</div>
            </div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
          </div>
        </div>
      </div>

      <div className="p-8">
        <p className="text-brand-muted leading-relaxed mb-8">{description}</p>

        <div className="mb-8">
          <h4 className="font-semibold text-brand-charcoal mb-4 flex items-center gap-2">
            <CheckCircle
              className={`w-5 h-5 ${color === "sage" ? "text-brand-sageDark" : "text-brand-charcoal"}`}
            />
            What&apos;s Included:
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-brand-muted hover:text-brand-charcoal transition-colors"
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${color === "sage" ? "bg-brand-sage" : "bg-brand-charcoal"}`}
                />
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold text-lg text-brand-charcoal">
            Investment Options
          </h4>

          <div className="space-y-4">
            {prices.map((price, index) => (
              <div
                key={index}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                  index === 0
                    ? `${
                        color === "sage"
                          ? "border-brand-sage bg-brand-sageLight/30"
                          : "border-brand-charcoal bg-gray-50"
                      }`
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-bold text-brand-charcoal">
                        {price.label}
                      </p>
                     
                    </div>
                    {price.note && (
                      <p className="text-sm text-brand-muted">{price.note}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-2xl font-bold ${color === "sage" ? "text-brand-sageDark" : "text-brand-charcoal"}`}
                    >
                      {price.amount}
                    </p>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className={`w-full mt-8 py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 ${
            color === "sage"
              ? "bg-brand-sageDark text-white hover:bg-brand-sage"
              : "bg-brand-charcoal text-white hover:bg-gray-800"
          }`}
        >
          Start Training
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </div>
  );
}
