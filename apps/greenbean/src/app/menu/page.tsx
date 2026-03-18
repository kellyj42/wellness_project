"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  EGG_STYLE_OPTIONS,
  EXTRA_GRILLED_CHICKEN_PRICE,
  EXTRA_INGREDIENT_PRICE,
  JUICE_FLAVOR_OPTIONS,
  WHATSAPP_NUMBER,
  WRAP_COMBO_SIDES,
} from "./constants";
import { CategoryTabs } from "./components/CategoryTabs";
import { MenuCard } from "./components/MenuCard";
import { MenuPreviewModal } from "./components/MenuPreviewModal";
import { OrderSummary } from "./components/OrderSummary";
import { menuItemsQuery } from "./query";
import type {
  CustomBowlSelection,
  MenuItem,
  MenuPreviewState,
  OrderSelection,
} from "./types";
import {
  buildWhatsAppMessage,
  createDefaultCustomBowl,
  formatUGX,
  getDefaultSelection,
  getItemUnitTotal,
  isCustomBowlItem,
  isEggAvoToastName,
  isExtraItem,
} from "./utils";

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuPreview, setMenuPreview] = useState<MenuPreviewState | null>(null);
  const [orderSelections, setOrderSelections] = useState<Record<string, OrderSelection>>({});
  const [expandedExtraPickers, setExpandedExtraPickers] = useState<Record<string, boolean>>({});
  const [expandedSwapEditors, setExpandedSwapEditors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchMenuItems() {
      try {
        const data = await client.fetch<MenuItem[]>(menuItemsQuery);
        setMenuItems(data || []);

        const uniqueCategories = Array.from(
          new Set(
            (data || [])
              .filter((item) => !isExtraItem(item))
              .map((item) => item.category),
          ),
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
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
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

  const extraItems = useMemo(
    () => menuItems.filter((item) => isExtraItem(item)),
    [menuItems],
  );

  const extraItemsById = useMemo(
    () =>
      Object.fromEntries(extraItems.map((item) => [item._id, item] as const)) as Record<
        string,
        MenuItem
      >,
    [extraItems],
  );

  const displayItems = useMemo(
    () => menuItems.filter((item) => !isExtraItem(item)),
    [menuItems],
  );

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return displayItems;
    }

    return displayItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, displayItems]);

  const selectedItems = useMemo(
    () => displayItems.filter((item) => orderSelections[item._id]?.selected),
    [displayItems, orderSelections],
  );

  const grandTotal = useMemo(
    () =>
      selectedItems.reduce((total, item) => {
        const selection = orderSelections[item._id];
        const quantity = selection?.quantity ?? 1;
        return total + getItemUnitTotal(item, selection, extraItemsById) * quantity;
      }, 0),
    [extraItemsById, orderSelections, selectedItems],
  );

  const whatsappHref = useMemo(() => {
    const message = buildWhatsAppMessage(selectedItems, orderSelections, extraItemsById);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [extraItemsById, orderSelections, selectedItems]);

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
          linkedExtraIds: nextSelected ? current.linkedExtraIds ?? [] : [],
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
      const currentFlavors = current.juiceFlavors?.length
        ? current.juiceFlavors
        : [JUICE_FLAVOR_OPTIONS[0]];
      const nextFlavors = juiceType === "Plain" ? [currentFlavors[0]] : currentFlavors;

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
      const currentFlavors = current.juiceFlavors?.length
        ? current.juiceFlavors
        : [JUICE_FLAVOR_OPTIONS[0]];
      const nextFlavors =
        juiceType === "Plain"
          ? [flavor]
          : currentFlavors.includes(flavor)
            ? currentFlavors.filter((entry) => entry !== flavor)
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

  function toggleLinkedExtra(itemId: string, item: MenuItem, extraId: string) {
    setOrderSelections((prev) => {
      const current = prev[itemId] ?? getDefaultSelection(item);
      const linkedExtraIds = (current.linkedExtraIds ?? []).includes(extraId)
        ? (current.linkedExtraIds ?? []).filter((entry) => entry !== extraId)
        : [...(current.linkedExtraIds ?? []), extraId];

      return {
        ...prev,
        [itemId]: {
          ...current,
          selected: true,
          quantity: Math.max(current.quantity, 1),
          linkedExtraIds,
        },
      };
    });
  }

  function toggleExtraPicker(itemId: string) {
    setExpandedExtraPickers((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  }

  function toggleSwapEditor(itemId: string) {
    setExpandedSwapEditors((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  }

  function updateIngredientSwap(
    itemId: string,
    item: MenuItem,
    field: "remove" | "replaceWith",
    value: string,
  ) {
    setOrderSelections((prev) => {
      const current = prev[itemId] ?? getDefaultSelection(item);
      const currentSwap = current.ingredientSwap ?? { remove: "", replaceWith: "" };

      return {
        ...prev,
        [itemId]: {
          ...current,
          ingredientSwap: {
            ...currentSwap,
            [field]: value,
          },
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
      <section className="min-h-screen bg-gradient-to-b from-[#F5F3EE] to-white pb-20 pt-24 text-[#2E2A26]">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-[#5B544D]">Loading menu...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#F5F3EE] to-white pb-28 pt-24 text-[#2E2A26]">
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#A3AD5F] via-[#6E7A3C] to-[#4A5522]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block rounded-full bg-[#E8ECCF] px-4 py-1.5 text-xs font-semibold tracking-wider text-[#6E7A3C]">
              Fresh. Balanced. Delivered.
            </span>
            <h1 className="mb-6 text-5xl font-light tracking-tight md:text-6xl">
              Daily Healthy Menu
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-[#5B544D]">
              Thoughtfully crafted meals to nourish your body and delight your
              taste buds. Every dish is prepared with love and the finest
              ingredients.
            </p>
            <p className="mt-4 text-sm font-medium text-[#6E7A3C] md:text-base">
              Selected items can include extra grilled chicken where enabled for an
              additional {formatUGX(EXTRA_GRILLED_CHICKEN_PRICE)}. Custom bowl extra
              ingredients are {formatUGX(EXTRA_INGREDIENT_PRICE)} each after the first
              4 toppings. Ingredient swaps are available at no extra cost.
            </p>
          </motion.div>
        </div>

        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        <OrderSummary
          selectedItems={selectedItems}
          orderSelections={orderSelections}
          extraItems={extraItems}
          extraItemsById={extraItemsById}
          grandTotal={grandTotal}
          whatsappHref={whatsappHref}
          expandedExtraPickers={expandedExtraPickers}
          onToggleExtraPicker={toggleExtraPicker}
          onToggleLinkedExtra={toggleLinkedExtra}
          onIncreaseQuantity={increaseItemQuantity}
          onDecreaseQuantity={decreaseItemQuantity}
          onRemoveItem={removeSelectedItem}
          onScrollToReviewSummary={scrollToReviewSummary}
        />

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

              return (
                <MenuCard
                  key={item._id}
                  item={item}
                  index={index}
                  imageUrl={imageUrl}
                  selection={selection}
                  menuItems={menuItems}
                  selectedItemsCount={selectedItems.length}
                  onPreviewImage={setMenuPreview}
                  onToggleItemSelection={toggleItemSelection}
                  onToggleExtraChicken={toggleExtraChicken}
                  onUpdateCustomBowlSelection={updateCustomBowlSelection}
                  onToggleCustomBowlTopping={toggleCustomBowlTopping}
                  onToggleWrapCombo={toggleWrapCombo}
                  onUpdateWrapComboSide={updateWrapComboSide}
                  onUpdateToastHalfSelection={updateToastHalfSelection}
                  onUpdateEggStyle={updateEggStyle}
                  onUpdateJuiceType={updateJuiceType}
                  onToggleJuiceFlavor={toggleJuiceFlavor}
                  isSwapEditorOpen={
                    expandedSwapEditors[item._id] ||
                    Boolean(selection.ingredientSwap?.remove) ||
                    Boolean(selection.ingredientSwap?.replaceWith)
                  }
                  onToggleSwapEditor={toggleSwapEditor}
                  onUpdateIngredientSwap={updateIngredientSwap}
                  onScrollToReviewSummary={scrollToReviewSummary}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <MenuPreviewModal preview={menuPreview} onClose={() => setMenuPreview(null)} />
    </section>
  );
}
