"use client";

import { motion } from "framer-motion";

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryTabs({
  categories,
  activeCategory,
  onSelectCategory,
}: CategoryTabsProps) {
  return (
    <div className="mb-12  grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-12 ">
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`relative overflow-hidden rounded px-1 py-2 text-xs font-medium transition-all duration-300 ${
            activeCategory === category
              ? "text-white shadow-lg"
              : "text-[#6E7A3C] hover:text-[#4A5522]"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {activeCategory === category && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 rounded-full bg-[#6E7A3C]"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{category}</span>
        </motion.button>
      ))}
    </div>
  );
}
