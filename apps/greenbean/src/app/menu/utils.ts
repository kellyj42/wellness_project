import {
  CUSTOM_BOWL_OPTIONS,
  CUSTOM_BOWL_SLUG,
  CUSTOM_JUICE_NAME,
  EGG_AVO_TOAST_NAME,
  EGG_STYLE_OPTIONS,
  EXTRA_CATEGORY,
  EXTRA_GRILLED_CHICKEN_PRICE,
  EXTRA_INGREDIENT_PRICE,
  INCLUDED_COCKTAIL_JUICE_FLAVORS,
  INCLUDED_TOPPINGS,
  JUICE_CATEGORY,
  JUICE_FLAVOR_OPTIONS,
  SANDWICH_CATEGORY,
  TOAST_CATEGORY,
  WRAP_CATEGORY,
  WRAP_COMBO_PRICE,
  WRAP_COMBO_SIDES,
} from "./constants";
import type { CustomBowlSelection, MenuItem, OrderSelection } from "./types";

export function isCustomBowlItem(item: MenuItem) {
  return (
    item.category === "Salad Bowls" &&
    (item.enableCustomBowlBuilder || item.slug?.current === CUSTOM_BOWL_SLUG)
  );
}

export function isToastItem(item: MenuItem) {
  return item.category === TOAST_CATEGORY;
}

export function isWrapItem(item: MenuItem) {
  return item.category === WRAP_CATEGORY;
}

export function isSandwichItem(item: MenuItem) {
  return item.category === SANDWICH_CATEGORY;
}

export function isComboMealItem(item: MenuItem) {
  return isWrapItem(item) || isSandwichItem(item);
}

export function isCustomJuiceItem(item: MenuItem) {
  return (
    item.category === JUICE_CATEGORY &&
    (item.name === CUSTOM_JUICE_NAME || item.slug?.current === "plain-or-cocktail-juice")
  );
}

export function isExtraItem(item: MenuItem) {
  return item.category === EXTRA_CATEGORY;
}

export function isEggAvoToastName(name?: string) {
  return name === EGG_AVO_TOAST_NAME;
}

export function toastNeedsEggStyle(item: MenuItem, selection?: OrderSelection) {
  return isEggAvoToastName(item.name) || isEggAvoToastName(selection?.halfToast);
}

export function formatUGX(amount: number) {
  return `UGX ${amount.toLocaleString()}`;
}

export function createDefaultCustomBowl(): CustomBowlSelection {
  return {
    carb: CUSTOM_BOWL_OPTIONS.carbs[0],
    protein: CUSTOM_BOWL_OPTIONS.proteins[0],
    greens: CUSTOM_BOWL_OPTIONS.greens[0],
    toppings: [],
    dressing: CUSTOM_BOWL_OPTIONS.dressings[0],
  };
}

export function getExtraToppingsCount(selection?: OrderSelection) {
  return Math.max((selection?.customBowl?.toppings.length ?? 0) - INCLUDED_TOPPINGS, 0);
}

export function getExtraJuiceFlavorsCount(selection?: OrderSelection) {
  if (selection?.juiceType !== "Cocktail") {
    return 0;
  }

  return Math.max((selection.juiceFlavors?.length ?? 0) - INCLUDED_COCKTAIL_JUICE_FLAVORS, 0);
}

export function getLinkedExtrasTotal(
  selection: OrderSelection | undefined,
  extraItemsById: Record<string, MenuItem>,
) {
  return (selection?.linkedExtraIds ?? []).reduce((total, extraId) => {
    const extraItem = extraItemsById[extraId];
    return total + (extraItem?.price ?? EXTRA_INGREDIENT_PRICE);
  }, 0);
}

export function getItemUnitTotal(
  item: MenuItem,
  selection?: OrderSelection,
  extraItemsById: Record<string, MenuItem> = {},
) {
  const basePrice =
    selection?.wrapCombo && isComboMealItem(item) ? WRAP_COMBO_PRICE : item.price;
  const extraChickenPrice = selection?.extraChicken ? EXTRA_GRILLED_CHICKEN_PRICE : 0;
  const extraIngredientsPrice = isCustomBowlItem(item)
    ? getExtraToppingsCount(selection) * EXTRA_INGREDIENT_PRICE
    : 0;
  const extraJuiceFlavorsPrice = isCustomJuiceItem(item)
    ? getExtraJuiceFlavorsCount(selection) * EXTRA_INGREDIENT_PRICE
    : 0;
  const linkedExtrasPrice = getLinkedExtrasTotal(selection, extraItemsById);

  return (
    basePrice +
    extraChickenPrice +
    extraIngredientsPrice +
    extraJuiceFlavorsPrice +
    linkedExtrasPrice
  );
}

export function getDefaultSelection(item: MenuItem): OrderSelection {
  return {
    selected: false,
    extraChicken: false,
    quantity: 1,
    ingredientSwap: {
      remove: "",
      replaceWith: "",
    },
    customBowl: isCustomBowlItem(item) ? createDefaultCustomBowl() : undefined,
    halfToast: undefined,
    eggStyle: isEggAvoToastName(item.name) ? EGG_STYLE_OPTIONS[0] : undefined,
    wrapCombo: false,
    wrapComboSide: isComboMealItem(item) ? WRAP_COMBO_SIDES[0] : undefined,
    juiceType: isCustomJuiceItem(item) ? "Plain" : undefined,
    juiceFlavors: isCustomJuiceItem(item) ? [JUICE_FLAVOR_OPTIONS[0]] : undefined,
    linkedExtraIds: [],
  };
}

export function buildWhatsAppMessage(
  selectedItems: MenuItem[],
  selections: Record<string, OrderSelection>,
  extraItemsById: Record<string, MenuItem>,
) {
  const lines = selectedItems.flatMap((item, index) => {
    const selection = selections[item._id];
    const quantity = selection?.quantity ?? 1;
    const unitTotal = getItemUnitTotal(item, selection, extraItemsById);
    const hasIngredientSwap =
      Boolean(selection?.ingredientSwap?.remove?.trim()) &&
      Boolean(selection?.ingredientSwap?.replaceWith?.trim());
    const ingredientSwapLabel = hasIngredientSwap
      ? `   Ingredient swap: Remove ${selection?.ingredientSwap?.remove?.trim()} | Replace with ${selection?.ingredientSwap?.replaceWith?.trim()}`
      : "   Ingredient swap: None";
    const linkedExtras = (selection?.linkedExtraIds ?? [])
      .map((extraId) => extraItemsById[extraId])
      .filter((extraItem): extraItem is MenuItem => Boolean(extraItem));
    const linkedExtrasLabel =
      linkedExtras.length > 0
        ? `   Extras: ${linkedExtras.map((extraItem) => extraItem.name).join(", ")} (${formatUGX(getLinkedExtrasTotal(selection, extraItemsById))})`
        : "   Extras: None";

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
        ingredientSwapLabel,
        linkedExtrasLabel,
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
        ...(selection?.halfToast ? [`   Toast pairing: ${item.name} + ${selection.halfToast}`] : []),
        ...(toastNeedsEggStyle(item, selection)
          ? [`   Egg choice: ${selection?.eggStyle ?? EGG_STYLE_OPTIONS[0]}`]
          : []),
        ...(item.allowExtraGrilledChicken
          ? [
              `   Extra grilled chicken: ${selection?.extraChicken ? formatUGX(EXTRA_GRILLED_CHICKEN_PRICE) + " each" : "No"}`,
            ]
          : []),
        ingredientSwapLabel,
        linkedExtrasLabel,
        `   Line total: ${formatUGX(unitTotal * quantity)}`,
        "",
      ];
    }

    if (isComboMealItem(item)) {
      return [
        `${index + 1}. ${item.name}`,
        `   Category: ${item.category}`,
        `   Quantity: ${quantity}`,
        `   Order type: ${selection?.wrapCombo ? `${isWrapItem(item) ? "Wrap" : "Sandwich"} Combo` : `${isWrapItem(item) ? "Wrap" : "Sandwich"} only`}`,
        `   Base price: ${formatUGX(selection?.wrapCombo ? WRAP_COMBO_PRICE : item.price)} each`,
        ...(selection?.wrapCombo
          ? [`   Side choice: ${selection.wrapComboSide ?? WRAP_COMBO_SIDES[0]}`]
          : []),
        ...(item.allowExtraGrilledChicken
          ? [
              `   Extra grilled chicken: ${selection?.extraChicken ? formatUGX(EXTRA_GRILLED_CHICKEN_PRICE) + " each" : "No"}`,
            ]
          : []),
        ingredientSwapLabel,
        linkedExtrasLabel,
        `   Line total: ${formatUGX(unitTotal * quantity)}`,
        "",
      ];
    }

    if (isCustomJuiceItem(item)) {
      const extraJuiceFlavorsCount = getExtraJuiceFlavorsCount(selection);

      return [
        `${index + 1}. ${item.name}`,
        `   Category: ${item.category}`,
        `   Quantity: ${quantity}`,
        `   Juice type: ${selection?.juiceType ?? "Plain"}`,
        `   Flavour choice: ${selection?.juiceFlavors?.length ? selection.juiceFlavors.join(", ") : JUICE_FLAVOR_OPTIONS[0]}`,
        `   Base price: ${formatUGX(item.price)} each`,
        `   Extra flavours: ${extraJuiceFlavorsCount > 0 ? `${extraJuiceFlavorsCount} x ${formatUGX(EXTRA_INGREDIENT_PRICE)}` : "None"}`,
        ingredientSwapLabel,
        linkedExtrasLabel,
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
      ingredientSwapLabel,
      linkedExtrasLabel,
      `   Line total: ${formatUGX(unitTotal * quantity)}`,
      "",
    ];
  });

  const grandTotal = selectedItems.reduce((total, item) => {
    const selection = selections[item._id];
    const quantity = selection?.quantity ?? 1;
    return total + getItemUnitTotal(item, selection, extraItemsById) * quantity;
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
