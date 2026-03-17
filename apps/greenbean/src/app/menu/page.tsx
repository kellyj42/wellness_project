"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronRight,
  MessageCircle,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const EXTRA_GRILLED_CHICKEN_PRICE = 5000;
const EXTRA_INGREDIENT_PRICE = 3000;
const INCLUDED_TOPPINGS = 4;
const WHATSAPP_NUMBER = "256781719687";
const CUSTOM_BOWL_SLUG = "make-your-own-bowl";
const TOAST_CATEGORY = "Toast";
const EGG_AVO_TOAST_NAME = "Egg Avo Toast";
const EGG_STYLE_OPTIONS = ["Scrambled", "Poached", "Sunny side", "Omelette", "Fried"];
const WRAP_CATEGORY = "Wraps";
const WRAP_COMBO_PRICE = 28000;
const WRAP_COMBO_SIDES = ["Sweet potato fries", "Air-fried plantain & avocado dip"];
const JUICE_CATEGORY = "Juices";
const CUSTOM_JUICE_NAME = "Plain or Cocktail Juice";
const JUICE_FLAVOR_OPTIONS = [
  "Pineapple",
  "Orange",
  "Watermelon",
  "Apple",
  "Mango",
  "Carrot",
  "Ginger",
  "Passion fruit",
];
const MAX_COCKTAIL_JUICE_FLAVORS = 3;

const CUSTOM_BOWL_OPTIONS = {
  carbs: ["Brown rice", "Quinoa", "Cous-cous"],
  proteins: [
    "Eggs",
    "Grilled chicken breast",
    "Beans",
    "Chickpeas",
    "Lentils",
    "Tofu",
    "Falafel",
    "Nuts",
  ],
  greens: ["Lettuce", "Kale", "Spinach"],
  toppings: [
    "Cucumber",
    "Tomato",
    "Avocado",
    "Red bell pepper",
    "Rocket",
    "Sweet corn",
    "Red cabbage",
    "Olives",
    "Feta cheese",
    "Carrots",
    "Raisins",
    "Spring onions",
    "Cilantro",
    "Sun-dried tomatoes",
  ],
  dressings: [
    "Honey mustard",
    "Peanut butter honey",
    "Tahini",
    "Lemon vinaigrette (vegan)",
    "Cashew dressing (vegan)",
  ],
};

interface MenuItem {
  _id: string;
  name: string;
  slug: { current: string };
  category: string;
  price: number;
  description: string;
  tag?: string;
  image?: any;
  featured?: boolean;
  available?: boolean;
  allowExtraGrilledChicken?: boolean;
  enableCustomBowlBuilder?: boolean;
}

interface CustomBowlSelection {
  carb: string;
  protein: string;
  greens: string;
  toppings: string[];
  dressing: string;
}

interface OrderSelection {
  selected: boolean;
  extraChicken: boolean;
  quantity: number;
  customBowl?: CustomBowlSelection;
  halfToast?: string;
  eggStyle?: string;
  wrapCombo?: boolean;
  wrapComboSide?: string;
  juiceType?: "Plain" | "Cocktail";
  juiceFlavors?: string[];
}

function isCustomBowlItem(item: MenuItem) {
  return (
    item.category === "Salad Bowls" &&
    (item.enableCustomBowlBuilder || item.slug?.current === CUSTOM_BOWL_SLUG)
  );
}

function isToastItem(item: MenuItem) {
  return item.category === TOAST_CATEGORY;
}

function isWrapItem(item: MenuItem) {
  return item.category === WRAP_CATEGORY;
}

function isCustomJuiceItem(item: MenuItem) {
  return (
    item.category === JUICE_CATEGORY &&
    (item.name === CUSTOM_JUICE_NAME || item.slug?.current === "plain-or-cocktail-juice")
  );
}

function isEggAvoToastName(name?: string) {
  return name === EGG_AVO_TOAST_NAME;
}

function toastNeedsEggStyle(item: MenuItem, selection?: OrderSelection) {
  return isEggAvoToastName(item.name) || isEggAvoToastName(selection?.halfToast);
}

function formatUGX(amount: number) {
  return `UGX ${amount.toLocaleString()}`;
}

function createDefaultCustomBowl(): CustomBowlSelection {
  return {
    carb: CUSTOM_BOWL_OPTIONS.carbs[0],
    protein: CUSTOM_BOWL_OPTIONS.proteins[0],
    greens: CUSTOM_BOWL_OPTIONS.greens[0],
    toppings: [],
    dressing: CUSTOM_BOWL_OPTIONS.dressings[0],
  };
}

function getExtraToppingsCount(selection?: OrderSelection) {
  return Math.max((selection?.customBowl?.toppings.length ?? 0) - INCLUDED_TOPPINGS, 0);
}

function getItemUnitTotal(item: MenuItem, selection?: OrderSelection) {
  const basePrice =
    selection?.wrapCombo && isWrapItem(item) ? WRAP_COMBO_PRICE : item.price;
  const extraChickenPrice = selection?.extraChicken ? EXTRA_GRILLED_CHICKEN_PRICE : 0;
  const extraIngredientsPrice = isCustomBowlItem(item)
    ? getExtraToppingsCount(selection) * EXTRA_INGREDIENT_PRICE
    : 0;

  return basePrice + extraChickenPrice + extraIngredientsPrice;
}

function buildWhatsAppMessage(
  selectedItems: MenuItem[],
  selections: Record<string, OrderSelection>,
) {
  const lines = selectedItems.flatMap((item, index) => {
    const selection = selections[item._id];
    const quantity = selection?.quantity ?? 1;
    const unitTotal = getItemUnitTotal(item, selection);

    if (isCustomBowlItem(item) && selection?.customBowl) {
      const bowl = selection.customBowl;
      const extraToppingsCount = getExtraToppingsCount(selection);
      const extraToppingsLabel =
        extraToppingsCount > 0
          ? `   Extra ingredients: ${extraToppingsCount} x ${formatUGX(EXTRA_INGREDIENT_PRICE)}`
          : "   Extra ingredients: None";

      return [
        `${index + 1}. ${item.name}`,
        `   Category: ${item.category}`,
        `   Quantity: ${quantity}`,
        `   Base bowl: ${formatUGX(item.price)} each`,
        `   Carb: ${bowl.carb}`,
        `   Protein: ${bowl.protein}`,
        `   Greens: ${bowl.greens}`,
        `   Toppings (${bowl.toppings.length}): ${bowl.toppings.length > 0 ? bowl.toppings.join(", ") : "None"}`,
        `   Dressing: ${bowl.dressing}`,
        extraToppingsLabel,
        `   Add grilled chicken breast: ${selection.extraChicken ? formatUGX(EXTRA_GRILLED_CHICKEN_PRICE) + " each" : "No"}`,
        `   Line total: ${formatUGX(unitTotal * quantity)}`,
        "",
      ];
    }

    if (isToastItem(item)) {
      return [
        `${index + 1}. ${item.name}`,
        `   Category: ${item.category}`,
        `   Quantity: ${quantity}`,
        `   Base meal: ${formatUGX(item.price)} each`,
        `   Toast style: ${selection?.halfToast ? "Half & Half" : "Full toast"}`,
        ...(selection?.halfToast
          ? [`   Toast pairing: ${item.name} + ${selection.halfToast}`]
          : []),
        ...(toastNeedsEggStyle(item, selection)
          ? [`   Egg choice: ${selection?.eggStyle ?? EGG_STYLE_OPTIONS[0]}`]
          : []),
        ...(item.allowExtraGrilledChicken
          ? [`   Extra grilled chicken: ${selection?.extraChicken ? formatUGX(EXTRA_GRILLED_CHICKEN_PRICE) + " each" : "No"}`]
          : []),
        `   Line total: ${formatUGX(unitTotal * quantity)}`,
        "",
      ];
    }

    if (isWrapItem(item)) {
      return [
        `${index + 1}. ${item.name}`,
        `   Category: ${item.category}`,
        `   Quantity: ${quantity}`,
        `   Order type: ${selection?.wrapCombo ? "Wrap Combo" : "Wrap only"}`,
        `   Base price: ${formatUGX(selection?.wrapCombo ? WRAP_COMBO_PRICE : item.price)} each`,
        ...(selection?.wrapCombo
          ? [`   Side choice: ${selection.wrapComboSide ?? WRAP_COMBO_SIDES[0]}`]
          : []),
        ...(item.allowExtraGrilledChicken
          ? [`   Extra grilled chicken: ${selection?.extraChicken ? formatUGX(EXTRA_GRILLED_CHICKEN_PRICE) + " each" : "No"}`]
          : []),
        `   Line total: ${formatUGX(unitTotal * quantity)}`,
        "",
      ];
    }

    if (isCustomJuiceItem(item)) {
      return [
        `${index + 1}. ${item.name}`,
        `   Category: ${item.category}`,
        `   Quantity: ${quantity}`,
        `   Juice type: ${selection?.juiceType ?? "Plain"}`,
        `   Flavour choice: ${(selection?.juiceFlavors?.length ? selection.juiceFlavors.join(", ") : JUICE_FLAVOR_OPTIONS[0])}`,
        `   Base price: ${formatUGX(item.price)} each`,
        `   Line total: ${formatUGX(unitTotal * quantity)}`,
        "",
      ];
    }

    return [
      `${index + 1}. ${item.name}`,
      `   Category: ${item.category}`,
      `   Quantity: ${quantity}`,
      `   Base meal: ${formatUGX(item.price)} each`,
      `   Extra grilled chicken: ${selection?.extraChicken ? formatUGX(EXTRA_GRILLED_CHICKEN_PRICE) + " each" : "No"}`,
      `   Line total: ${formatUGX(unitTotal * quantity)}`,
      "",
    ];
  });

  const grandTotal = selectedItems.reduce((total, item) => {
    const selection = selections[item._id];
    const quantity = selection?.quantity ?? 1;
    return total + getItemUnitTotal(item, selection) * quantity;
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
          image,
          featured,
          available,
          allowExtraGrilledChicken,
          enableCustomBowlBuilder
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
        return total + getItemUnitTotal(item, selection) * quantity;
      }, 0),
    [orderSelections, selectedItems],
  );

  const whatsappHref = useMemo(() => {
    const message = buildWhatsAppMessage(selectedItems, orderSelections);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [orderSelections, selectedItems]);

  function getDefaultSelection(item: MenuItem): OrderSelection {
    return {
      selected: false,
      extraChicken: false,
      quantity: 1,
      customBowl: isCustomBowlItem(item) ? createDefaultCustomBowl() : undefined,
      halfToast: undefined,
      eggStyle: isEggAvoToastName(item.name) ? EGG_STYLE_OPTIONS[0] : undefined,
      wrapCombo: false,
      wrapComboSide: isWrapItem(item) ? WRAP_COMBO_SIDES[0] : undefined,
      juiceType: isCustomJuiceItem(item) ? "Plain" : undefined,
      juiceFlavors: isCustomJuiceItem(item) ? [JUICE_FLAVOR_OPTIONS[0]] : undefined,
    };
  }

  function toggleItemSelection(item: MenuItem) {
    setOrderSelections((prev) => {
      const current = prev[item._id] ?? getDefaultSelection(item);
      const nextSelected = !current.selected;

      return {
        ...prev,
        [item._id]: {
          ...current,
          selected: nextSelected,
          extraChicken: nextSelected ? current.extraChicken : false,
          quantity: nextSelected ? Math.max(current.quantity, 1) : 1,
          customBowl:
            isCustomBowlItem(item) && current.customBowl
              ? current.customBowl
              : isCustomBowlItem(item)
                ? createDefaultCustomBowl()
                : undefined,
        },
      };
    });
  }

  function toggleExtraChicken(itemId: string, item: MenuItem) {
    setOrderSelections((prev) => {
      const current = prev[itemId] ?? getDefaultSelection(item);

      return {
        ...prev,
        [itemId]: {
          ...current,
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

  function removeSelectedItem(itemId: string, item: MenuItem) {
    setOrderSelections((prev) => ({
      ...prev,
      [itemId]: getDefaultSelection(item),
    }));
  }

  function updateCustomBowlSelection(
    itemId: string,
    item: MenuItem,
    updates: Partial<CustomBowlSelection>,
  ) {
    setOrderSelections((prev) => {
      const current = prev[itemId] ?? getDefaultSelection(item);
      const currentBowl = current.customBowl ?? createDefaultCustomBowl();

      return {
        ...prev,
        [itemId]: {
          ...current,
          selected: true,
          quantity: Math.max(current.quantity, 1),
          customBowl: {
            ...currentBowl,
            ...updates,
          },
        },
      };
    });
  }

  function toggleCustomBowlTopping(itemId: string, item: MenuItem, topping: string) {
    setOrderSelections((prev) => {
      const current = prev[itemId] ?? getDefaultSelection(item);
      const currentBowl = current.customBowl ?? createDefaultCustomBowl();
      const toppings = currentBowl.toppings.includes(topping)
        ? currentBowl.toppings.filter((entry) => entry !== topping)
        : [...currentBowl.toppings, topping];

      return {
        ...prev,
        [itemId]: {
          ...current,
          selected: true,
          quantity: Math.max(current.quantity, 1),
          customBowl: {
            ...currentBowl,
            toppings,
          },
        },
      };
    });
  }

  function updateToastHalfSelection(itemId: string, item: MenuItem, halfToast: string) {
    setOrderSelections((prev) => {
      const current = prev[itemId] ?? getDefaultSelection(item);
      const nextHalfToast = halfToast || undefined;
      const needsEggStyle =
        isEggAvoToastName(item.name) || isEggAvoToastName(nextHalfToast);

      return {
        ...prev,
        [itemId]: {
          ...current,
          selected: true,
          quantity: Math.max(current.quantity, 1),
          halfToast: nextHalfToast,
          eggStyle: needsEggStyle
            ? current.eggStyle ?? EGG_STYLE_OPTIONS[0]
            : undefined,
        },
      };
    });
  }

  function updateEggStyle(itemId: string, item: MenuItem, eggStyle: string) {
    setOrderSelections((prev) => {
      const current = prev[itemId] ?? getDefaultSelection(item);

      return {
        ...prev,
        [itemId]: {
          ...current,
          selected: true,
          quantity: Math.max(current.quantity, 1),
          eggStyle,
        },
      };
    });
  }

  function updateJuiceType(itemId: string, item: MenuItem, juiceType: "Plain" | "Cocktail") {
    setOrderSelections((prev) => {
      const current = prev[itemId] ?? getDefaultSelection(item);
      const currentFlavors = current.juiceFlavors?.length ? current.juiceFlavors : [JUICE_FLAVOR_OPTIONS[0]];
      const nextFlavors =
        juiceType === "Plain" ? [currentFlavors[0]] : currentFlavors;

      return {
        ...prev,
        [itemId]: {
          ...current,
          selected: true,
          quantity: Math.max(current.quantity, 1),
          juiceType,
          juiceFlavors: nextFlavors,
        },
      };
    });
  }

  function toggleJuiceFlavor(itemId: string, item: MenuItem, flavor: string) {
    setOrderSelections((prev) => {
      const current = prev[itemId] ?? getDefaultSelection(item);
      const juiceType = current.juiceType ?? "Plain";
      const currentFlavors = current.juiceFlavors?.length ? current.juiceFlavors : [JUICE_FLAVOR_OPTIONS[0]];
      const nextFlavors =
        juiceType === "Plain"
          ? [flavor]
          : currentFlavors.includes(flavor)
            ? currentFlavors.filter((entry) => entry !== flavor)
            : currentFlavors.length >= MAX_COCKTAIL_JUICE_FLAVORS
              ? currentFlavors
              : [...currentFlavors, flavor];

      return {
        ...prev,
        [itemId]: {
          ...current,
          selected: true,
          quantity: Math.max(current.quantity, 1),
          juiceType,
          juiceFlavors: nextFlavors.length > 0 ? nextFlavors : [JUICE_FLAVOR_OPTIONS[0]],
        },
      };
    });
  }

  function toggleWrapCombo(itemId: string, item: MenuItem) {
    setOrderSelections((prev) => {
      const current = prev[itemId] ?? getDefaultSelection(item);
      const nextWrapCombo = !current.wrapCombo;

      return {
        ...prev,
        [itemId]: {
          ...current,
          selected: true,
          quantity: Math.max(current.quantity, 1),
          wrapCombo: nextWrapCombo,
          wrapComboSide: nextWrapCombo
            ? current.wrapComboSide ?? WRAP_COMBO_SIDES[0]
            : undefined,
        },
      };
    });
  }

  function updateWrapComboSide(itemId: string, item: MenuItem, side: string) {
    setOrderSelections((prev) => {
      const current = prev[itemId] ?? getDefaultSelection(item);

      return {
        ...prev,
        [itemId]: {
          ...current,
          selected: true,
          quantity: Math.max(current.quantity, 1),
          wrapCombo: true,
          wrapComboSide: side,
        },
      };
    });
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
              an additional {formatUGX(EXTRA_GRILLED_CHICKEN_PRICE)}. Custom bowl
              extra ingredients are {formatUGX(EXTRA_INGREDIENT_PRICE)} each after
              the first {INCLUDED_TOPPINGS} toppings.
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
                <div className="hidden grid-cols-[minmax(0,2fr)_140px_180px_150px_140px_110px] gap-4 border-b border-[#E7E1D7] pb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#8B7F74] md:grid">
                  <span>Meal</span>
                  <span>Base price</span>
                  <span>Add-ons</span>
                  <span>Quantity</span>
                  <span>Total</span>
                  <span className="text-right">Action</span>
                </div>

                <div className="divide-y divide-[#E7E1D7]">
                  {selectedItems.map((item) => {
                    const selection = orderSelections[item._id];
                    const quantity = selection?.quantity ?? 1;
                    const extraToppingsCount = getExtraToppingsCount(selection);
                    const addOnDetails = [
                      selection?.wrapCombo
                        ? `Wrap Combo ${formatUGX(WRAP_COMBO_PRICE)} | ${selection.wrapComboSide ?? WRAP_COMBO_SIDES[0]}`
                        : null,
                      selection?.extraChicken ? `Chicken + ${formatUGX(EXTRA_GRILLED_CHICKEN_PRICE)}` : null,
                      extraToppingsCount > 0
                        ? `${extraToppingsCount} extra ingredient(s) + ${formatUGX(extraToppingsCount * EXTRA_INGREDIENT_PRICE)}`
                        : null,
                    ].filter(Boolean);
                    const lineTotal = getItemUnitTotal(item, selection) * quantity;

                    return (
                      <div
                        key={`summary-${item._id}`}
                        className="grid gap-4 py-4 md:grid-cols-[minmax(0,2fr)_140px_180px_150px_140px_110px] md:items-center"
                      >
                        <div>
                          <p className="font-semibold text-[#2E2A26]">{item.name}</p>
                          <p className="text-sm text-[#8B7F74]">{item.category}</p>
                          {isCustomBowlItem(item) && selection?.customBowl && (
                            <p className="mt-1 text-xs leading-relaxed text-[#6C6257]">
                              {selection.customBowl.carb}, {selection.customBowl.protein}, {selection.customBowl.greens}, {selection.customBowl.dressing}
                            </p>
                          )}
                          {isWrapItem(item) && selection?.wrapCombo && (
                            <p className="mt-1 text-xs leading-relaxed text-[#6C6257]">
                              Wrap Combo | Side: {selection.wrapComboSide ?? WRAP_COMBO_SIDES[0]}
                            </p>
                          )}
                          {isCustomJuiceItem(item) && selection?.juiceType && (
                            <p className="mt-1 text-xs leading-relaxed text-[#6C6257]">
                              {selection.juiceType} | {selection.juiceFlavors?.join(", ") ?? JUICE_FLAVOR_OPTIONS[0]}
                            </p>
                          )}
                          {isToastItem(item) && (selection?.halfToast || toastNeedsEggStyle(item, selection)) && (
                            <p className="mt-1 text-xs leading-relaxed text-[#6C6257]">
                              {selection?.halfToast ? `Half & Half: ${item.name} + ${selection.halfToast}` : "Full toast"}
                              {toastNeedsEggStyle(item, selection)
                                ? ` | Eggs: ${selection?.eggStyle ?? EGG_STYLE_OPTIONS[0]}`
                                : ""}
                            </p>
                          )}
                        </div>
                        <p className="text-sm text-[#5B544D]">{formatUGX(selection?.wrapCombo ? WRAP_COMBO_PRICE : item.price)}</p>
                        <p className="text-sm text-[#5B544D]">
                          {addOnDetails.length > 0 ? addOnDetails.join(" | ") : "No add-ons"}
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
                        <p className="text-sm font-semibold text-[#6E7A3C]">{formatUGX(lineTotal)}</p>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => removeSelectedItem(item._id, item)}
                            className="inline-flex items-center gap-1 rounded-full border border-[#E2DDD2] px-3 py-1 text-xs font-medium text-[#8B7F74] transition-colors hover:border-[#D06A4E] hover:text-[#D06A4E]"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Cancel
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
                    Use the quantity controls to adjust how many of each meal you
                    want, or cancel any item before sending the order.
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
              const imageUrl = item.image
                ? urlFor(item.image).width(400).height(300).url()
                : null;
              const selection = orderSelections[item._id] ?? getDefaultSelection(item);
              const customBowl = selection.customBowl ?? createDefaultCustomBowl();
              const extraToppingsCount = getExtraToppingsCount(selection);
              const toastHalfChoices = menuItems.filter(
                (candidate) => isToastItem(candidate) && candidate._id !== item._id,
              );
              const needsEggStyle = toastNeedsEggStyle(item, selection);
              const juiceType = selection.juiceType ?? "Plain";
              const juiceFlavors = selection.juiceFlavors?.length
                ? selection.juiceFlavors
                : [JUICE_FLAVOR_OPTIONS[0]];
              const lineTotal =
                getItemUnitTotal(item, selection) *
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
                        onClick={() => setMenuPreview({ src: imageUrl, alt: item.name })}
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
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#EEF2DE] to-[#E4DED3] px-6 text-center text-lg font-medium text-[#6E7A3C]">
                        {item.name}
                      </div>
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
                    {isCustomBowlItem(item) && (
                      <div className="mb-5 rounded-3xl border border-[#E8E1D5] bg-[#F8F5EE] p-4">
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6E7A3C]">
                              Make your own bowl
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-[#6C6257]">
                              Pick your carb, protein, greens, dressing, and up to {INCLUDED_TOPPINGS} toppings included. Every extra topping is {formatUGX(EXTRA_INGREDIENT_PRICE)}.
                            </p>
                          </div>
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#6E7A3C] shadow-sm">
                            Salad Bowl
                          </span>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <label className="block text-sm text-[#5B544D]">
                            <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-[#8B7F74]">
                              Choose carbs
                            </span>
                            <select
                              value={customBowl.carb}
                              onChange={(event) =>
                                updateCustomBowlSelection(item._id, item, {
                                  carb: event.target.value,
                                })
                              }
                              className="w-full rounded-2xl border border-[#DCD4C7] bg-white px-4 py-3 text-sm text-[#2E2A26] outline-none transition-colors focus:border-[#A3AD5F]"
                            >
                              {CUSTOM_BOWL_OPTIONS.carbs.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </label>

                          <label className="block text-sm text-[#5B544D]">
                            <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-[#8B7F74]">
                              Choose protein
                            </span>
                            <select
                              value={customBowl.protein}
                              onChange={(event) =>
                                updateCustomBowlSelection(item._id, item, {
                                  protein: event.target.value,
                                })
                              }
                              className="w-full rounded-2xl border border-[#DCD4C7] bg-white px-4 py-3 text-sm text-[#2E2A26] outline-none transition-colors focus:border-[#A3AD5F]"
                            >
                              {CUSTOM_BOWL_OPTIONS.proteins.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </label>

                          <label className="block text-sm text-[#5B544D]">
                            <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-[#8B7F74]">
                              Choose greens
                            </span>
                            <select
                              value={customBowl.greens}
                              onChange={(event) =>
                                updateCustomBowlSelection(item._id, item, {
                                  greens: event.target.value,
                                })
                              }
                              className="w-full rounded-2xl border border-[#DCD4C7] bg-white px-4 py-3 text-sm text-[#2E2A26] outline-none transition-colors focus:border-[#A3AD5F]"
                            >
                              {CUSTOM_BOWL_OPTIONS.greens.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </label>

                          <label className="block text-sm text-[#5B544D]">
                            <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-[#8B7F74]">
                              Choose dressing
                            </span>
                            <select
                              value={customBowl.dressing}
                              onChange={(event) =>
                                updateCustomBowlSelection(item._id, item, {
                                  dressing: event.target.value,
                                })
                              }
                              className="w-full rounded-2xl border border-[#DCD4C7] bg-white px-4 py-3 text-sm text-[#2E2A26] outline-none transition-colors focus:border-[#A3AD5F]"
                            >
                              {CUSTOM_BOWL_OPTIONS.dressings.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>

                        <div className="mt-4">
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8B7F74]">
                              Choose toppings
                            </p>
                            <p className="text-xs text-[#6C6257]">
                              {customBowl.toppings.length} selected | {Math.max(INCLUDED_TOPPINGS - customBowl.toppings.length, 0)} included left
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {CUSTOM_BOWL_OPTIONS.toppings.map((topping) => {
                              const isSelected = customBowl.toppings.includes(topping);

                              return (
                                <button
                                  key={topping}
                                  type="button"
                                  onClick={() => toggleCustomBowlTopping(item._id, item, topping)}
                                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all ${
                                    isSelected
                                      ? "border-[#6E7A3C] bg-[#6E7A3C] text-white shadow-sm"
                                      : "border-[#DCD4C7] bg-white text-[#5B544D] hover:border-[#A3AD5F] hover:text-[#2E2A26]"
                                  }`}
                                >
                                  {isSelected && <Check className="h-3.5 w-3.5" />}
                                  {topping}
                                </button>
                              );
                            })}
                          </div>
                          <p className="mt-3 text-xs leading-relaxed text-[#6C6257]">
                            First {INCLUDED_TOPPINGS} toppings are included. Extra toppings: {extraToppingsCount} x {formatUGX(EXTRA_INGREDIENT_PRICE)}.
                          </p>
                        </div>
                      </div>
                    )}

                    {isCustomJuiceItem(item) && (
                      <div className="mb-5 rounded-3xl border border-[#E8E1D5] bg-[#F8F5EE] p-4">
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6E7A3C]">
                              Custom juice
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-[#6C6257]">
                              Choose a plain juice with one flavour, or build a cocktail from multiple flavours.
                            </p>
                          </div>
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#6E7A3C] shadow-sm">
                            Juice Builder
                          </span>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          {(["Plain", "Cocktail"] as const).map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => updateJuiceType(item._id, item, option)}
                              className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition-all ${
                                juiceType === option
                                  ? "border-[#6E7A3C] bg-[#F2F6E3] text-[#2E2A26]"
                                  : "border-[#DCD4C7] bg-white text-[#5B544D] hover:border-[#A3AD5F]"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>

                        <div className="mt-4">
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8B7F74]">
                            Choose flavours
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {JUICE_FLAVOR_OPTIONS.map((flavor) => {
                              const isSelected = juiceFlavors.includes(flavor);

                              return (
                                <button
                                  key={flavor}
                                  type="button"
                                  onClick={() => toggleJuiceFlavor(item._id, item, flavor)}
                                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all ${
                                    isSelected
                                      ? "border-[#6E7A3C] bg-[#6E7A3C] text-white shadow-sm"
                                      : "border-[#DCD4C7] bg-white text-[#5B544D] hover:border-[#A3AD5F] hover:text-[#2E2A26]"
                                  }`}
                                >
                                  {isSelected && <Check className="h-3.5 w-3.5" />}
                                  {flavor}
                                </button>
                              );
                            })}
                          </div>
                          <p className="mt-3 text-xs leading-relaxed text-[#6C6257]">
                            {juiceType === "Plain"
                              ? "Plain juice uses one flavour. Selecting another flavour replaces the current one."
                              : `Cocktail juice can combine up to ${MAX_COCKTAIL_JUICE_FLAVORS} flavours.`}
                          </p>
                        </div>
                      </div>
                    )}

                    {isWrapItem(item) && (
                      <div className="mb-5 rounded-3xl border border-[#E8E1D5] bg-[#F8F5EE] p-4">
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6E7A3C]">
                              Wrap combo
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-[#6C6257]">
                              Any wrap can be upgraded to a combo for {formatUGX(WRAP_COMBO_PRICE)} with your choice of side.
                            </p>
                          </div>
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#6E7A3C] shadow-sm">
                            Combo
                          </span>
                        </div>

                        <label className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 transition-all ${
                          selection.wrapCombo
                            ? "border-[#6E7A3C] bg-[#F2F6E3]"
                            : "border-[#DCD4C7] bg-white hover:border-[#A3AD5F]"
                        }`}>
                          <div className="pr-3">
                            <p className="text-sm font-semibold text-[#2E2A26]">
                              Make this a wrap combo
                            </p>
                            <p className="text-xs text-[#6C6257]">
                              Served with sweet potato fries or air-fried plantain & avocado dip.
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={selection.wrapCombo ?? false}
                            onChange={() => toggleWrapCombo(item._id, item)}
                            className="h-5 w-5 rounded border-[#B9B1A4] text-[#6E7A3C] focus:ring-[#A3AD5F]"
                          />
                        </label>

                        {selection.wrapCombo && (
                          <label className="mt-4 block text-sm text-[#5B544D]">
                            <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-[#8B7F74]">
                              Choose combo side
                            </span>
                            <select
                              value={selection.wrapComboSide ?? WRAP_COMBO_SIDES[0]}
                              onChange={(event) =>
                                updateWrapComboSide(item._id, item, event.target.value)
                              }
                              className="w-full rounded-2xl border border-[#DCD4C7] bg-white px-4 py-3 text-sm text-[#2E2A26] outline-none transition-colors focus:border-[#A3AD5F]"
                            >
                              {WRAP_COMBO_SIDES.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </label>
                        )}
                      </div>
                    )}

                    {isToastItem(item) && (
                      <div className="mb-5 rounded-3xl border border-[#E8E1D5] bg-[#F8F5EE] p-4">
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6E7A3C]">
                              Build your toast
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-[#6C6257]">
                              Choose one different toast for the second half if you want a half-and-half toast. The same toast cannot be paired with itself.
                            </p>
                          </div>
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#6E7A3C] shadow-sm">
                            Toast Builder
                          </span>
                        </div>

                        <label className="block text-sm text-[#5B544D]">
                          <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-[#8B7F74]">
                            Second half toast
                          </span>
                          <select
                            value={selection.halfToast ?? ""}
                            onChange={(event) =>
                              updateToastHalfSelection(item._id, item, event.target.value)
                            }
                            className="w-full rounded-2xl border border-[#DCD4C7] bg-white px-4 py-3 text-sm text-[#2E2A26] outline-none transition-colors focus:border-[#A3AD5F]"
                          >
                            <option value="">Keep this as a full toast</option>
                            {toastHalfChoices.map((option) => (
                              <option key={option._id} value={option.name}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </label>

                        {needsEggStyle && (
                          <label className="mt-4 block text-sm text-[#5B544D]">
                            <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-[#8B7F74]">
                              Choose eggs
                            </span>
                            <select
                              value={selection.eggStyle ?? EGG_STYLE_OPTIONS[0]}
                              onChange={(event) =>
                                updateEggStyle(item._id, item, event.target.value)
                              }
                              className="w-full rounded-2xl border border-[#DCD4C7] bg-white px-4 py-3 text-sm text-[#2E2A26] outline-none transition-colors focus:border-[#A3AD5F]"
                            >
                              {EGG_STYLE_OPTIONS.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </label>
                        )}
                      </div>
                    )}

                    <div className="mb-5 rounded-2xl bg-[#F3F0E8] px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-[#5B544D]">
                          Current total
                        </span>
                        <span className="text-lg font-bold text-[#6E7A3C]">
                          {formatUGX(lineTotal)}
                        </span>
                      </div>
                      {selection.selected && (
                        <p className="mt-2 text-xs text-[#6C6257]">
                          Quantity: {selection.quantity}. This total updates instantly as the order changes.
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 transition-all ${
                        selection.selected
                          ? "border-[#6E7A3C] bg-[#F2F6E3]"
                          : "border-[#DCD4C7] bg-white hover:border-[#A3AD5F]"
                      }`}>
                        <div className="pr-3">
                          <p className="text-sm font-semibold text-[#2E2A26]">
                            Add to order
                          </p>
                          <p className="text-xs text-[#6C6257]">
                            Include this meal in your WhatsApp order summary.
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={selection.selected}
                          onChange={() => toggleItemSelection(item)}
                          className="h-5 w-5 rounded border-[#B9B1A4] text-[#6E7A3C] focus:ring-[#A3AD5F]"
                        />
                      </label>

                      {(item.allowExtraGrilledChicken || isCustomBowlItem(item)) && (
                        <label className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 transition-all ${
                          selection.extraChicken
                            ? "border-[#6E7A3C] bg-[#F2F6E3]"
                            : "border-[#DCD4C7] bg-white hover:border-[#A3AD5F]"
                        }`}>
                          <div className="pr-3">
                            <p className="text-sm font-semibold text-[#2E2A26]">
                              Add grilled chicken breast
                            </p>
                            <p className="text-xs text-[#6C6257]">
                              Adds {formatUGX(EXTRA_GRILLED_CHICKEN_PRICE)} to this meal.
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={selection.extraChicken}
                            onChange={() => toggleExtraChicken(item._id, item)}
                            className="h-5 w-5 rounded border-[#B9B1A4] text-[#6E7A3C] focus:ring-[#A3AD5F]"
                          />
                        </label>
                      )}

                      {selectedItems.length > 0 && (
                        <button
                          type="button"
                          onClick={scrollToReviewSummary}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#D7D1C6] px-5 py-3 text-sm font-semibold text-[#2E2A26] transition-all hover:border-[#A3AD5F] hover:text-[#6E7A3C]"
                        >
                          Review summary
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {selectedItems.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#D7D1C6] bg-white/95 px-4 py-3 shadow-2xl backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <button
              type="button"
              onClick={scrollToReviewSummary}
              className="text-left"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#8B7F74]">
                Review summary
              </p>
              <p className="text-sm font-semibold text-[#2E2A26]">
                {selectedItems.length} item(s) | {formatUGX(grandTotal)}
              </p>
            </button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#6E7A3C] px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              <MessageCircle className="h-4 w-4" />
              Order Now
            </a>
          </div>
        </div>
      )}

      <AnimatePresence>
        {menuPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setMenuPreview(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative aspect-[4/3] w-full bg-[#F5F3EE]">
                <Image
                  src={menuPreview.src}
                  alt={menuPreview.alt}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-between border-t border-[#E7E1D7] px-5 py-4">
                <p className="text-sm font-medium text-[#2E2A26]">{menuPreview.alt}</p>
                <button
                  type="button"
                  onClick={() => setMenuPreview(null)}
                  className="rounded-full border border-[#D7D1C6] px-4 py-2 text-sm font-medium text-[#5B544D] transition-colors hover:border-[#A3AD5F] hover:text-[#2E2A26]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
