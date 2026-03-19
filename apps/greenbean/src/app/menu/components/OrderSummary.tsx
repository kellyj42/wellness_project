"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronRight, MessageCircle, Minus, Plus, Trash2 } from "lucide-react";
import {
  EGG_STYLE_OPTIONS,
  EXTRA_GRILLED_CHICKEN_PRICE,
  EXTRA_INGREDIENT_PRICE,
  JUICE_FLAVOR_OPTIONS,
  WRAP_COMBO_PRICE,
  WRAP_COMBO_SIDES,
} from "../constants";
import type { MenuItem, OrderSelection } from "../types";
import {
  formatUGX,
  getExtraToppingsCount,
  getItemUnitTotal,
  getLinkedExtrasTotal,
  isComboMealItem,
  isCrepeItem,
  isCustomBowlItem,
  isCustomJuiceItem,
  isToastItem,
  isWrapItem,
  toastNeedsEggStyle,
} from "../utils";

interface OrderSummaryProps {
  selectedItems: MenuItem[];
  orderSelections: Record<string, OrderSelection>;
  extraItems: MenuItem[];
  extraItemsById: Record<string, MenuItem>;
  grandTotal: number;
  whatsappHref: string;
  expandedExtraPickers: Record<string, boolean>;
  onToggleExtraPicker: (itemId: string) => void;
  onToggleLinkedExtra: (itemId: string, item: MenuItem, extraId: string) => void;
  onIncreaseQuantity: (itemId: string) => void;
  onDecreaseQuantity: (itemId: string) => void;
  onRemoveItem: (itemId: string, item: MenuItem) => void;
  onScrollToReviewSummary: () => void;
}

export function OrderSummary({
  selectedItems,
  orderSelections,
  extraItems,
  extraItemsById,
  grandTotal,
  whatsappHref,
  expandedExtraPickers,
  onToggleExtraPicker,
  onToggleLinkedExtra,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
  onScrollToReviewSummary,
}: OrderSummaryProps) {
  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
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
                const linkedExtras = (selection?.linkedExtraIds ?? [])
                  .map((extraId) => extraItemsById[extraId])
                  .filter((extraItem): extraItem is MenuItem => Boolean(extraItem));
                const addOnDetails = [
                  selection?.wrapCombo
                    ? `${isWrapItem(item) ? "Wrap" : "Sandwich"} Combo ${formatUGX(WRAP_COMBO_PRICE)} | ${selection.wrapComboSide ?? WRAP_COMBO_SIDES[0]}`
                    : null,
                  selection?.extraChicken
                    ? `Chicken + ${formatUGX(EXTRA_GRILLED_CHICKEN_PRICE)}`
                    : null,
                  selection?.glutenFree && isCrepeItem(item) ? "Gluten-free" : null,
                  selection?.ingredientSwap?.remove?.trim() &&
                  selection?.ingredientSwap?.replaceWith?.trim()
                    ? `Swap ${selection.ingredientSwap.remove.trim()} -> ${selection.ingredientSwap.replaceWith.trim()}`
                    : null,
                  extraToppingsCount > 0
                    ? `${extraToppingsCount} extra ingredient(s) + ${formatUGX(extraToppingsCount * EXTRA_INGREDIENT_PRICE)}`
                    : null,
                  linkedExtras.length > 0
                    ? `Extras + ${formatUGX(getLinkedExtrasTotal(selection, extraItemsById))}`
                    : null,
                ].filter(Boolean);
                const lineTotal =
                  getItemUnitTotal(item, selection, extraItemsById) * quantity;

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
                          {selection.customBowl.carb}, {selection.customBowl.protein},{" "}
                          {selection.customBowl.greens}, {selection.customBowl.dressing}
                        </p>
                      )}
                      {isComboMealItem(item) && selection?.wrapCombo && (
                        <p className="mt-1 text-xs leading-relaxed text-[#6C6257]">
                          {isWrapItem(item) ? "Wrap" : "Sandwich"} Combo | Side:{" "}
                          {selection.wrapComboSide ?? WRAP_COMBO_SIDES[0]}
                        </p>
                      )}
                      {isCustomJuiceItem(item) && selection?.juiceType && (
                        <p className="mt-1 text-xs leading-relaxed text-[#6C6257]">
                          {selection.juiceType} |{" "}
                          {selection.juiceFlavors?.join(", ") ?? JUICE_FLAVOR_OPTIONS[0]}
                        </p>
                      )}
                      {linkedExtras.length > 0 && (
                        <p className="mt-1 text-xs leading-relaxed text-[#6C6257]">
                          Extras: {linkedExtras.map((extraItem) => extraItem.name).join(", ")}
                        </p>
                      )}
                      {selection?.glutenFree && isCrepeItem(item) && (
                        <p className="mt-1 text-xs leading-relaxed text-[#6C6257]">
                          Gluten-free option selected
                        </p>
                      )}
                      {selection?.ingredientSwap?.remove?.trim() &&
                        selection?.ingredientSwap?.replaceWith?.trim() && (
                          <p className="mt-1 text-xs leading-relaxed text-[#6C6257]">
                            Swap: remove {selection.ingredientSwap.remove.trim()} and replace
                            with {selection.ingredientSwap.replaceWith.trim()}
                          </p>
                        )}
                      {isToastItem(item) &&
                        (selection?.halfToast || toastNeedsEggStyle(item, selection)) && (
                          <p className="mt-1 text-xs leading-relaxed text-[#6C6257]">
                            {selection?.halfToast
                              ? `Half & Half: ${item.name} + ${selection.halfToast}`
                              : "Full toast"}
                            {toastNeedsEggStyle(item, selection)
                              ? ` | Eggs: ${selection?.eggStyle ?? EGG_STYLE_OPTIONS[0]}`
                              : ""}
                          </p>
                      )}
                      {extraItems.length > 0 && (
                        <div className="mt-3 rounded-2xl bg-[#F8F5EE] p-3">
                          <button
                            type="button"
                            onClick={() => onToggleExtraPicker(item._id)}
                            className="flex w-full items-center justify-between gap-3 text-left"
                          >
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B7F74]">
                                Link extras to this meal
                              </p>
                              <p className="mt-1 text-xs text-[#6C6257]">
                                {(selection?.linkedExtraIds?.length ?? 0) > 0
                                  ? `${selection?.linkedExtraIds?.length ?? 0} extra(s) linked`
                                  : "Tap to choose extras"}
                              </p>
                            </div>
                            <ChevronRight
                              className={`h-4 w-4 text-[#6E7A3C] transition-transform ${
                                expandedExtraPickers[item._id] ? "rotate-90" : ""
                              }`}
                            />
                          </button>
                          {expandedExtraPickers[item._id] && (
                            <div className="mt-3 w-full">
                              <div className="flex w-full flex-wrap gap-2">
                                {extraItems.map((extraItem) => {
                                  const isSelected = (selection?.linkedExtraIds ?? []).includes(
                                    extraItem._id,
                                  );

                                  return (
                                    <button
                                      key={`${item._id}-${extraItem._id}`}
                                      type="button"
                                      onClick={() =>
                                        onToggleLinkedExtra(item._id, item, extraItem._id)
                                      }
                                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs transition-all ${
                                        isSelected
                                          ? "border-[#6E7A3C] bg-[#6E7A3C] text-white shadow-sm"
                                          : "border-[#DCD4C7] bg-white text-[#5B544D] hover:border-[#A3AD5F] hover:text-[#2E2A26]"
                                      }`}
                                    >
                                      {isSelected && <Check className="h-3.5 w-3.5" />}
                                      {extraItem.name} +{" "}
                                      {formatUGX(extraItem.price || EXTRA_INGREDIENT_PRICE)}
                                    </button>
                                  );
                                })}
                              </div>
                              <p className="mt-2 text-[11px] text-[#8B7F74]">
                                Tap an extra name to link or unlink it from this meal.
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-[#5B544D]">
                      {formatUGX(selection?.wrapCombo ? WRAP_COMBO_PRICE : item.price)}
                    </p>
                    <p className="text-sm text-[#5B544D]">
                      {addOnDetails.length > 0 ? addOnDetails.join(" | ") : "No add-ons"}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onDecreaseQuantity(item._id)}
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
                        onClick={() => onIncreaseQuantity(item._id)}
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
                        onClick={() => onRemoveItem(item._id, item)}
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
                Use the quantity controls to adjust how many of each meal you want, or
                cancel any item before sending the order.
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#D7D1C6] bg-white/95 px-4 py-3 shadow-2xl backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <button
            type="button"
            onClick={onScrollToReviewSummary}
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
    </>
  );
}
