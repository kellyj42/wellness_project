export interface MenuItem {
  _id: string;
  name: string;
  slug: { current: string };
  category: string;
  price: number;
  description?: string;
  tag?: string;
  image?: any;
  featured?: boolean;
  available?: boolean;
  allowExtraGrilledChicken?: boolean;
  enableCustomBowlBuilder?: boolean;
}

export interface CustomBowlSelection {
  carb: string;
  protein: string;
  greens: string;
  toppings: string[];
  dressing: string;
}

export interface OrderSelection {
  selected: boolean;
  extraChicken: boolean;
  quantity: number;
  glutenFree?: boolean;
  ingredientSwap?: {
    remove: string;
    replaceWith: string;
  };
  customBowl?: CustomBowlSelection;
  halfToast?: string;
  eggStyle?: string;
  wrapCombo?: boolean;
  wrapComboSide?: string;
  juiceType?: "Plain" | "Cocktail";
  juiceFlavors?: string[];
  linkedExtraIds?: string[];
}

export interface MenuPreviewState {
  src: string;
  alt: string;
}

export interface OrderSubmissionItem {
  mealName: string;
  category?: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  notes?: string;
}
