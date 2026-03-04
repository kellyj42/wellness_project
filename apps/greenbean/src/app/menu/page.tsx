"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Coffee,
  Beef,
  Apple,
  Sun,
  Leaf,
  ChevronRight,
  LucideIcon,
} from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

// Map icon strings to Lucide components
const iconMap: Record<string, LucideIcon> = {
  Beef,
  Coffee,
  Apple,
  Sun,
  Leaf,
};

interface MenuItem {
  _id: string;
  name: string;
  slug: { current: string };
  category: string;
  price: number;
  description: string;
  tag?: string;
  icon?: string;
  image?: any;
  dietary?: string[];
  featured?: boolean;
  available?: boolean;
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuPreview, setMenuPreview] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  useEffect(() => {
    async function fetchMenuItems() {
      try {
        const query = `*[_type == "menuItem" && available == true] | order(name asc) {
          _id,
          name,
          slug,
          category,
          price,
          description,
          tag,
          icon,
          image,
          dietary,
          featured,
          available
        }`;

        const data = await client.fetch<MenuItem[]>(query);

        setMenuItems(data || []);

        // Derive unique categories from menu items
        const uniqueCategories = Array.from(
          new Set((data || []).map((item: MenuItem) => item.category)),
        ).sort() as string[];
        setCategories(["All", ...uniqueCategories]);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMenuItems();
  }, []);

  // Handle ESC key to close preview
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuPreview(null);
        document.body.style.overflow = "unset";
      }
    };
    if (menuPreview) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [menuPreview]);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return menuItems;
    }
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, menuItems]);

  if (isLoading) {
    return (
      <section className="bg-gradient-to-b from-[#F5F3EE] to-white text-[#2E2A26] min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <p className="text-[#5B544D] text-lg">Loading menu...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-[#F5F3EE] to-white text-[#2E2A26] min-h-screen pt-24 pb-20">
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A3AD5F] via-[#6E7A3C] to-[#4A5522]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-[#6E7A3C] bg-[#E8ECCf] rounded-full">
              Fresh. Balanced. Delivered.
            </span>
            <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
              Daily Healthy Menu
            </h1>
            <p className="text-xl text-[#5B544D] max-w-3xl mx-auto leading-relaxed">
              Thoughtfully crafted meals to nourish your body and delight your
              taste buds. Every dish is prepared with love and the finest
              ingredients.
            </p>
          </motion.div>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center gap-4 mb-16 flex-wrap">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 overflow-hidden ${
                activeCategory === cat
                  ? "text-white shadow-lg"
                  : "text-[#6E7A3C] hover:text-[#4A5522]"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-[#6E7A3C] rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </motion.button>
          ))}
        </div>

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((item, index) => {
              const Icon = item.icon ? iconMap[item.icon] || Coffee : Coffee;
              const imageUrl = item.image
                ? urlFor(item.image).width(400).height(300).url()
                : null;

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#E2DDD2]"
                >
                  {/* Card Header with Image or Icon */}
                  <div className="relative h-40 bg-gradient-to-br from-[#E8ECCf] to-[#D9D4CB] flex items-center justify-center overflow-hidden">
                    {imageUrl ? (
                      <button
                        onClick={() =>
                          setMenuPreview({ src: imageUrl, alt: item.name })
                        }
                        className="relative w-full h-full cursor-pointer hover:opacity-90 transition-opacity"
                        aria-label={`Expand image for ${item.name}`}
                      >
                        <Image
                          src={imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </button>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
                        <Icon className="w-20 h-20 text-[#6E7A3C] opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-300" />
                      </>
                    )}
                    {item.featured && (
                      <span className="absolute top-4 left-4 bg-[#6E7A3C] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                        Featured
                      </span>
                    )}
                    {item.tag && (
                      <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#6E7A3C] border border-[#A3AD5F]/30">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-[#2E2A26] group-hover:text-[#6E7A3C] transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-lg font-bold text-[#6E7A3C]">
                        UGX {item.price.toLocaleString()}
                      </span>
                    </div>

                    <p className="text-[#5B544D] text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Dietary Labels */}
                    {item.dietary && item.dietary.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.dietary.map((diet) => (
                          <span
                            key={diet}
                            className="text-xs px-2 py-1 bg-[#E8ECCf] text-[#6E7A3C] rounded-full"
                          >
                            {diet}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-[#8B7F74] bg-[#F0EDE7] px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                      <a
                        href={`https://wa.me/256781719687?text=${encodeURIComponent(
                          `Hi Green Bean! I clicked 'Order via WhatsApp' for ${item.name} on the Menu page. Category: ${item.category}. Price shown: UGX ${item.price.toLocaleString()}. I'd like to order this item. Please confirm availability and delivery.`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm font-medium text-[#6E7A3C] hover:text-[#4A5522] transition-colors group/btn"
                      >
                        Order Now
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Image Preview Modal */}
      {menuPreview && (
        <div
          onClick={() => {
            setMenuPreview(null);
            document.body.style.overflow = "unset";
          }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuPreview(null);
                document.body.style.overflow = "unset";
              }}
              className="absolute -top-12 right-0 text-white hover:text-[#A3AD5F] transition-colors z-50"
              aria-label="Close preview"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div
              className="relative w-full h-full min-h-[400px]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={menuPreview.src}
                alt={menuPreview.alt}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
