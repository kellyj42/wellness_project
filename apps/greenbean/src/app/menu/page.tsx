"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Apple,
  Beef,
  Check,
  ChevronRight,
  Coffee,
  Leaf,
  LucideIcon,
  MessageCircle,
  Minus,
  Plus,
  Sun,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const EXTRA_GRILLED_CHICKEN_PRICE = 5000;
const WHATSAPP_NUMBER = "256781719687";

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
  allowExtraGrilledChicken?: boolean;
}

interface OrderSelection {
  selected: boolean;
  extraChicken: boolean;
  quantity: number;
}

function formatUGX(amount: number) {
  return `UGX ${amount.toLocaleString()}`;
}

function buildWhatsAppMessage(
  selectedItems: MenuItem[],
  selections: Record<string, OrderSelection>,
) {
  const lines = selectedItems.flatMap((item, index) => {
    const selection = selections[item._id];
    const quantity = selection?.quantity ?? 1;
    const addOnPrice = selection?.extraChicken
      ? EXTRA_GRILLED_CHICKEN_PRICE
      : 0;
    const unitTotal = item.price + addOnPrice;
    const addOnLabel = selection?.extraChicken
      ? `   Extra grilled chicken: ${formatUGX(EXTRA_GRILLED_CHICKEN_PRICE)} each`
      : " ";

    return [
      `${index + 1}. ${item.name}`,
      `   Category: ${item.category}`,
      `   Quantity: ${quantity}`,
      `   Base meal: ${formatUGX(item.price)} each`,
      addOnLabel,
      `   Line total: ${formatUGX(unitTotal * quantity)}`,
      "",
    ];
  });

  const grandTotal = selectedItems.reduce((total, item) => {
    const selection = selections[item._id];
    const quantity = selection?.quantity ?? 1;
    return (
      total +
      (item.price +
        (selection?.extraChicken ? EXTRA_GRILLED_CHICKEN_PRICE : 0)) *
        quantity
    );
  }, 0);

  return [
    "Hi Green Bean! I would like to place this order from the Menu page.",
    "",
    "ORDER SUMMARY",
    "------------------------------",
    ...lines,
    `TOTAL: ${formatUGX(grandTotal)}`,
    "",
    "Please confirm availability, preparation time, and delivery options.",
  ].join("\n");
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
  const [orderSelections, setOrderSelections] = useState<
    Record<string, OrderSelection>
  >({});

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
          available,
          allowExtraGrilledChicken
        }`;

        const data = await client.fetch<MenuItem[]>(query);

        setMenuItems(data || []);

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

  const selectedItems = useMemo(
    () => menuItems.filter((item) => orderSelections[item._id]?.selected),
    [menuItems, orderSelections],
  );

  const grandTotal = useMemo(
    () =>
      selectedItems.reduce((total, item) => {
        const selection = orderSelections[item._id];
        const quantity = selection?.quantity ?? 1;
        return (
          total +
          (item.price +
            (selection?.extraChicken ? EXTRA_GRILLED_CHICKEN_PRICE : 0)) *
            quantity
        );
      }, 0),
    [orderSelections, selectedItems],
  );

  const whatsappHref = useMemo(() => {
    const message = buildWhatsAppMessage(selectedItems, orderSelections);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [orderSelections, selectedItems]);

  function toggleItemSelection(item: MenuItem) {
    setOrderSelections((prev) => {
      const current = prev[item._id] ?? {
        selected: false,
        extraChicken: false,
        quantity: 1,
      };
      const nextSelected = !current.selected;

      return {
        ...prev,
        [item._id]: {
          selected: nextSelected,
          extraChicken: nextSelected ? current.extraChicken : false,
          quantity: nextSelected ? Math.max(current.quantity, 1) : 1,
        },
      };
    });
  }

  function toggleExtraChicken(itemId: string) {
    setOrderSelections((prev) => {
      const current = prev[itemId] ?? {
        selected: false,
        extraChicken: false,
        quantity: 1,
      };

      return {
        ...prev,
        [itemId]: {
          selected: true,
          extraChicken: !current.extraChicken,
          quantity: Math.max(current.quantity, 1),
        },
      };
    });
  }

  function increaseItemQuantity(itemId: string) {
    setOrderSelections((prev) => {
      const current = prev[itemId];
      if (!current?.selected) {
        return prev;
      }

      return {
        ...prev,
        [itemId]: {
          ...current,
          quantity: current.quantity + 1,
        },
      };
    });
  }

  function decreaseItemQuantity(itemId: string) {
    setOrderSelections((prev) => {
      const current = prev[itemId];
      if (!current?.selected) {
        return prev;
      }

      return {
        ...prev,
        [itemId]: {
          ...current,
          quantity: Math.max(1, current.quantity - 1),
        },
      };
    });
  }

  function removeSelectedItem(itemId: string) {
    setOrderSelections((prev) => ({
      ...prev,
      [itemId]: {
        selected: false,
        extraChicken: false,
        quantity: 1,
      },
    }));
  }

  function scrollToReviewSummary() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

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
    <section className="relative bg-gradient-to-b from-[#F5F3EE] to-white text-[#2E2A26] min-h-screen pt-24 pb-28">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A3AD5F] via-[#6E7A3C] to-[#4A5522]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-[#6E7A3C] bg-[#E8ECCF] rounded-full">
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
            <p className="mt-4 text-sm md:text-base text-[#6E7A3C] font-medium">
              Selected items can include extra grilled chicken where enabled for
              an additional {formatUGX(EXTRA_GRILLED_CHICKEN_PRICE)}.
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
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

        <AnimatePresence>
          {selectedItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mb-12 overflow-hidden rounded-[2rem] border border-[#A3AD5F]/30 bg-[#FCFBF8] shadow-xl shadow-[#2E2A26]/5"
            >
              <div className="flex flex-col gap-3 bg-[#2E2A26] px-6 py-5 text-[#F5F3EE] lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#A3AD5F]">
                    WhatsApp Order
                  </p>
                  <h2 className="text-2xl font-light">Your selected meals</h2>
                </div>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#A3AD5F] px-6 py-3 text-sm font-semibold text-[#2E2A26] transition-all hover:scale-[1.02] hover:bg-[#B5BF70]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Order Now
                </a>
              </div>

              <div className="p-6">
                <div className="hidden grid-cols-[minmax(0,2fr)_140px_160px_150px_140px_110px] gap-4 border-b border-[#E7E1D7] pb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#8B7F74] md:grid">
                  <span>Meal</span>
                  <span>Base price</span>
                  <span>Add-on</span>
                  <span>Quantity</span>
                  <span>Total</span>
                  <span className="text-right">Action</span>
                </div>

                <div className="divide-y divide-[#E7E1D7]">
                  {selectedItems.map((item) => {
                    const selection = orderSelections[item._id];
                    const quantity = selection?.quantity ?? 1;
                    const addOnPrice = selection?.extraChicken
                      ? EXTRA_GRILLED_CHICKEN_PRICE
                      : 0;
                    const lineTotal = (item.price + addOnPrice) * quantity;

                    return (
                      <div
                        key={`summary-${item._id}`}
                        className="grid gap-4 py-4 md:grid-cols-[minmax(0,2fr)_140px_160px_150px_140px_110px] md:items-center"
                      >
                        <div>
                          <p className="font-semibold text-[#2E2A26]">
                            {item.name}
                          </p>
                          <p className="text-sm text-[#8B7F74]">
                            {item.category}
                          </p>
                        </div>
                        <p className="text-sm text-[#5B544D]">
                          {formatUGX(item.price)}
                        </p>
                        <p className="text-sm text-[#5B544D]">
                          {selection?.extraChicken
                            ? `Extra chicken + ${formatUGX(EXTRA_GRILLED_CHICKEN_PRICE)}`
                            : "No add-on"}
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => decreaseItemQuantity(item._id)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D5CEC2] text-[#5B544D] transition-colors hover:border-[#A3AD5F] hover:text-[#2E2A26]"
                            aria-label={`Decrease quantity for ${item.name}`}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-10 text-center text-sm font-semibold text-[#2E2A26]">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => increaseItemQuantity(item._id)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D5CEC2] text-[#5B544D] transition-colors hover:border-[#A3AD5F] hover:text-[#2E2A26]"
                            aria-label={`Increase quantity for ${item.name}`}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-[#6E7A3C]">
                          {formatUGX(lineTotal)}
                        </p>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => removeSelectedItem(item._id)}
                            className="inline-flex items-center gap-1 rounded-full border border-[#E2DDD2] px-3 py-1 text-xs font-medium text-[#8B7F74] transition-colors hover:border-[#D06A4E] hover:text-[#D06A4E]"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-[#F3F0E8] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#8B7F74]">
                      Grand total
                    </p>
                    <p className="text-2xl font-semibold text-[#2E2A26]">
                      {formatUGX(grandTotal)}
                    </p>
                  </div>
                  <p className="max-w-xl text-sm leading-relaxed text-[#5B544D]">
                    Use the quantity controls to adjust how many of each meal
                    you want, or cancel any item before sending the order.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredItems.map((item, index) => {
              const Icon = item.icon ? iconMap[item.icon] || Coffee : Coffee;
              const imageUrl = item.image
                ? urlFor(item.image).width(400).height(300).url()
                : null;
              const selection = orderSelections[item._id] ?? {
                selected: false,
                extraChicken: false,
                quantity: 1,
              };
              const lineTotal =
                (item.price +
                  (selection.extraChicken ? EXTRA_GRILLED_CHICKEN_PRICE : 0)) *
                (selection.selected ? selection.quantity : 1);

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -8 }}
                  className="group overflow-hidden rounded-3xl border border-[#E2DDD2] bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-[#E8ECCF] to-[#D9D4CB]">
                    {imageUrl ? (
                      <button
                        onClick={() =>
                          setMenuPreview({ src: imageUrl, alt: item.name })
                        }
                        className="relative h-full w-full cursor-pointer transition-opacity hover:opacity-90"
                        aria-label={`Expand image for ${item.name}`}
                      >
                        <Image
                          src={imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </button>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-black/5 transition-colors duration-300 group-hover:bg-black/0" />
                        <Icon className="h-20 w-20 text-[#6E7A3C] opacity-40 transition-all duration-300 group-hover:scale-110 group-hover:opacity-60" />
                      </>
                    )}
                    {item.featured && (
                      <span className="absolute top-4 left-4 rounded-full bg-[#6E7A3C] px-3 py-1 text-xs font-semibold text-white shadow-md">
                        Featured
                      </span>
                    )}
                    {item.tag && (
                      <span className="absolute top-4 right-4 rounded-full border border-[#A3AD5F]/30 bg-white/90 px-3 py-1 text-xs font-medium text-[#6E7A3C] backdrop-blur-sm">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <h3 className="text-xl font-semibold text-[#2E2A26] transition-colors group-hover:text-[#6E7A3C]">
                        {item.name}
                      </h3>
                      <span className="text-lg font-bold text-[#6E7A3C]">
                        {formatUGX(item.price)}
                      </span>
                    </div>

                    <p className="mb-4 text-sm leading-relaxed text-[#5B544D]">
                      {item.description}
                    </p>

                    {item.dietary && item.dietary.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {item.dietary.map((diet) => (
                          <span
                            key={diet}
                            className="rounded-full bg-[#E8ECCF] px-2 py-1 text-xs text-[#6E7A3C]"
                          >
                            {diet}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mb-5 flex items-center justify-between gap-3 rounded-2xl bg-[#F7F3EC] px-4 py-3">
                      <span className="rounded-full bg-[#F0EDE7] px-3 py-1 text-xs uppercase tracking-wider text-[#8B7F74]">
                        {item.category}
                      </span>
                      <p className="text-right text-sm">
                        <span className="block text-[#8B7F74]">
                          Current total
                        </span>
                        <span className="font-semibold text-[#2E2A26]">
                          {formatUGX(lineTotal)}
                        </span>
                      </p>
                    </div>

                    <div className="space-y-3">
                      <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#DCD4C6] px-4 py-3 transition-colors hover:border-[#A3AD5F] hover:bg-[#FBF9F4]">
                        <div>
                          <p className="text-sm font-semibold text-[#2E2A26]">
                            Add this meal to order
                          </p>
                          <p className="text-xs text-[#8B7F74]">
                            Select this item for your WhatsApp order summary
                          </p>
                        </div>
                        <span className="relative flex items-center">
                          <input
                            type="checkbox"
                            checked={selection.selected}
                            onChange={() => toggleItemSelection(item)}
                            className="peer sr-only"
                            aria-label={`Add ${item.name} to order`}
                          />
                          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-[#A3AD5F] bg-white text-transparent transition-all peer-checked:bg-[#6E7A3C] peer-checked:text-white">
                            <Check className="h-4 w-4" />
                          </span>
                        </span>
                      </label>

                      {item.allowExtraGrilledChicken && (
                        <label
                          className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition-colors ${
                            selection.selected
                              ? "border-[#A3AD5F]/50 bg-[#F7FAEE]"
                              : "border-[#E5DED1] bg-[#FAF8F3]"
                          }`}
                        >
                          <div>
                            <p className="text-sm font-semibold text-[#2E2A26]">
                              Extra grilled chicken
                            </p>
                            <p className="text-xs text-[#8B7F74]">
                              Add {formatUGX(EXTRA_GRILLED_CHICKEN_PRICE)} to
                              this meal
                            </p>
                          </div>
                          <span className="relative flex items-center">
                            <input
                              type="checkbox"
                              checked={selection.extraChicken}
                              onChange={() => toggleExtraChicken(item._id)}
                              className="peer sr-only"
                              aria-label={`Add extra grilled chicken to ${item.name}`}
                            />
                            <span className="inline-flex rounded-full border border-[#C8C0B4] bg-white p-1 transition-colors peer-checked:border-[#6E7A3C] peer-checked:bg-[#E8F0D0]">
                              <span
                                className={`flex h-6 w-12 items-center rounded-full px-1 transition-colors ${
                                  selection.extraChicken
                                    ? "justify-end bg-[#6E7A3C]"
                                    : "justify-start bg-[#D7D1C7]"
                                }`}
                              >
                                <span className="block h-4 w-4 rounded-full bg-white shadow-sm" />
                              </span>
                            </span>
                          </span>
                        </label>
                      )}
                    </div>

                    <div className="mt-5 flex items-center justify-between text-sm">
                      <span className="text-[#8B7F74]">
                        {selection.selected
                          ? `Included in your order summary${
                              selection.quantity > 1
                                ? ` • Qty ${selection.quantity}`
                                : ""
                            }`
                          : "Select to include in order"}
                      </span>
                      <button
                        type="button"
                        onClick={scrollToReviewSummary}
                        className="inline-flex items-center gap-1 font-medium text-[#6E7A3C] transition-colors hover:text-[#4A5522]"
                      >
                        Review summary
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {selectedItems.length > 0 && (
        <div className="fixed inset-x-0 bottom-4 z-40 px-4 sm:hidden">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-2xl bg-[#2E2A26] px-5 py-4 text-[#F5F3EE] shadow-2xl"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#A3AD5F]">
                Selected meals
              </p>
              <p className="text-sm font-semibold">
                {selectedItems.length} item(s) | {formatUGX(grandTotal)}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </span>
          </a>
        </div>
      )}

      {menuPreview && (
        <div
          onClick={() => {
            setMenuPreview(null);
            document.body.style.overflow = "unset";
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        >
          <div className="relative max-h-[90vh] w-full max-w-4xl">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuPreview(null);
                document.body.style.overflow = "unset";
              }}
              className="absolute -top-12 right-0 z-50 text-white transition-colors hover:text-[#A3AD5F]"
              aria-label="Close preview"
            >
              <svg
                className="h-8 w-8"
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
              className="relative h-full min-h-[400px] w-full"
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
