"use client";

import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import Image from "next/image";
import {
  CUSTOM_BOWL_OPTIONS,
  EGG_STYLE_OPTIONS,
  EXTRA_GRILLED_CHICKEN_PRICE,
  EXTRA_INGREDIENT_PRICE,
  INCLUDED_COCKTAIL_JUICE_FLAVORS,
  INCLUDED_TOPPINGS,
  JUICE_FLAVOR_OPTIONS,
  WRAP_COMBO_PRICE,
  WRAP_COMBO_SIDES,
} from "../constants";
import type { MenuItem, MenuPreviewState, OrderSelection } from "../types";
import {
  createDefaultCustomBowl,
  formatUGX,
  getExtraToppingsCount,
  getItemUnitTotal,
  isComboMealItem,
  isCustomBowlItem,
  isCustomJuiceItem,
  isToastItem,
  isWrapItem,
  toastNeedsEggStyle,
} from "../utils";

interface MenuCardProps {
  item: MenuItem;
  index: number;
  imageUrl: string | null;
  selection: OrderSelection;
  menuItems: MenuItem[];
  selectedItemsCount: number;
  onPreviewImage: (preview: MenuPreviewState) => void;
  onToggleItemSelection: (item: MenuItem) => void;
  onToggleExtraChicken: (itemId: string, item: MenuItem) => void;
  onUpdateCustomBowlSelection: (
    itemId: string,
    item: MenuItem,
    updates: Partial<NonNullable<OrderSelection["customBowl"]>>,
  ) => void;
  onToggleCustomBowlTopping: (itemId: string, item: MenuItem, topping: string) => void;
  onToggleWrapCombo: (itemId: string, item: MenuItem) => void;
  onUpdateWrapComboSide: (itemId: string, item: MenuItem, side: string) => void;
  onUpdateToastHalfSelection: (itemId: string, item: MenuItem, halfToast: string) => void;
  onUpdateEggStyle: (itemId: string, item: MenuItem, eggStyle: string) => void;
  onUpdateJuiceType: (
    itemId: string,
    item: MenuItem,
    juiceType: NonNullable<OrderSelection["juiceType"]>,
  ) => void;
  onToggleJuiceFlavor: (itemId: string, item: MenuItem, flavor: string) => void;
  isSwapEditorOpen: boolean;
  onToggleSwapEditor: (itemId: string) => void;
  onUpdateIngredientSwap: (
    itemId: string,
    item: MenuItem,
    field: "remove" | "replaceWith",
    value: string,
  ) => void;
  onScrollToReviewSummary: () => void;
}

export function MenuCard({
  item,
  index,
  imageUrl,
  selection,
  menuItems,
  selectedItemsCount,
  onPreviewImage,
  onToggleItemSelection,
  onToggleExtraChicken,
  onUpdateCustomBowlSelection,
  onToggleCustomBowlTopping,
  onToggleWrapCombo,
  onUpdateWrapComboSide,
  onUpdateToastHalfSelection,
  onUpdateEggStyle,
  onUpdateJuiceType,
  onToggleJuiceFlavor,
  isSwapEditorOpen,
  onToggleSwapEditor,
  onUpdateIngredientSwap,
  onScrollToReviewSummary,
}: MenuCardProps) {
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
    getItemUnitTotal(item, selection) * (selection.selected ? selection.quantity : 1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-3xl border border-[#E2DDD2] bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-[#E8ECCF] to-[#D9D4CB]">
        {imageUrl ? (
          <button
            onClick={() => onPreviewImage({ src: imageUrl, alt: item.name })}
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
          <span className="absolute left-4 top-4 rounded-full bg-[#6E7A3C] px-3 py-1 text-xs font-semibold text-white shadow-md">
            Featured
          </span>
        )}
        {item.tag && (
          <span className="absolute right-4 top-4 rounded-full border border-[#A3AD5F]/30 bg-white/90 px-3 py-1 text-xs font-medium text-[#6E7A3C] backdrop-blur-sm">
            {item.tag}
          </span>
        )}
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold text-[#2E2A26] transition-colors group-hover:text-[#6E7A3C]">
            {item.name}
          </h3>
          <span className="text-lg font-bold text-[#6E7A3C]">{formatUGX(item.price)}</span>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-[#5B544D]">
          {item.description ?? ""}
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
                    onUpdateCustomBowlSelection(item._id, item, {
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
                    onUpdateCustomBowlSelection(item._id, item, {
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
                    onUpdateCustomBowlSelection(item._id, item, {
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
                    onUpdateCustomBowlSelection(item._id, item, {
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
                      onClick={() => onToggleCustomBowlTopping(item._id, item, topping)}
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
                  onClick={() => onUpdateJuiceType(item._id, item, option)}
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
                      onClick={() => onToggleJuiceFlavor(item._id, item, flavor)}
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
                  : `Cocktail juice includes up to ${INCLUDED_COCKTAIL_JUICE_FLAVORS} flavours. Every extra flavour adds ${formatUGX(EXTRA_INGREDIENT_PRICE)}.`}
              </p>
            </div>
          </div>
        )}

        {isComboMealItem(item) && (
          <div className="mb-5 rounded-3xl border border-[#E8E1D5] bg-[#F8F5EE] p-4">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6E7A3C]">
                  {isWrapItem(item) ? "Wrap combo" : "Sandwich combo"}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#6C6257]">
                  Any {isWrapItem(item) ? "wrap" : "sandwich"} can be upgraded to a combo for {formatUGX(WRAP_COMBO_PRICE)} with your choice of side.
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
                  {isWrapItem(item) ? "Make this a wrap combo" : "Make this a sandwich combo"}
                </p>
                <p className="text-xs text-[#6C6257]">
                  Served with sweet potato fries or air-fried plantain & avocado dip.
                </p>
              </div>
              <input
                type="checkbox"
                checked={selection.wrapCombo ?? false}
                onChange={() => onToggleWrapCombo(item._id, item)}
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
                    onUpdateWrapComboSide(item._id, item, event.target.value)
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
                  onUpdateToastHalfSelection(item._id, item, event.target.value)
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
                    onUpdateEggStyle(item._id, item, event.target.value)
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
          <div className="rounded-2xl border border-[#DCD4C7] bg-white">
            <button
              type="button"
              onClick={() => onToggleSwapEditor(item._id)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
            >
              <div className="pr-3">
                <p className="text-sm font-semibold text-[#2E2A26]">
                  Ingredient swap
                </p>
                <p className="text-xs text-[#6C6257]">
                  Optional and free.
                </p>
              </div>
              <ChevronRight
                className={`h-4 w-4 text-[#6E7A3C] transition-transform ${
                  isSwapEditorOpen ? "rotate-90" : ""
                }`}
              />
            </button>

            {isSwapEditorOpen && (
              <div className="grid gap-3 border-t border-[#EEE7DB] px-4 py-4 sm:grid-cols-2">
                <label className="block text-sm text-[#5B544D]">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-[#8B7F74]">
                    Remove
                  </span>
                  <input
                    type="text"
                    value={selection.ingredientSwap?.remove ?? ""}
                    onChange={(event) =>
                      onUpdateIngredientSwap(
                        item._id,
                        item,
                        "remove",
                        event.target.value,
                      )
                    }
                    placeholder="e.g. onions"
                    className="w-full rounded-2xl border border-[#DCD4C7] bg-[#FCFBF8] px-4 py-3 text-sm text-[#2E2A26] outline-none transition-colors focus:border-[#A3AD5F]"
                  />
                </label>

                <label className="block text-sm text-[#5B544D]">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-[#8B7F74]">
                    Replace with
                  </span>
                  <input
                    type="text"
                    value={selection.ingredientSwap?.replaceWith ?? ""}
                    onChange={(event) =>
                      onUpdateIngredientSwap(
                        item._id,
                        item,
                        "replaceWith",
                        event.target.value,
                      )
                    }
                    placeholder="e.g. avocado"
                    className="w-full rounded-2xl border border-[#DCD4C7] bg-[#FCFBF8] px-4 py-3 text-sm text-[#2E2A26] outline-none transition-colors focus:border-[#A3AD5F]"
                  />
                </label>
              </div>
            )}
          </div>

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
              onChange={() => onToggleItemSelection(item)}
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
                onChange={() => onToggleExtraChicken(item._id, item)}
                className="h-5 w-5 rounded border-[#B9B1A4] text-[#6E7A3C] focus:ring-[#A3AD5F]"
              />
            </label>
          )}

          {selectedItemsCount > 0 && (
            <button
              type="button"
              onClick={onScrollToReviewSummary}
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
}
