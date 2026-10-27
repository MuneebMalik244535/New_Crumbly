export type CategoryType = 'cookies' | 'dough' | 'brownies' | 'combos';

export interface Product {
  id: string;
  name: string;
  category: CategoryType;
  pricePkr: number;
  priceUsd: number;
  weightGrams: number;
  tagline: string;
  description: string;
  image: string;
  badge?: string;
  subBadge?: string;
  cacaoPercentage?: number;
  sensoryProfile: {
    moltenFluidity: number; // percentage e.g. 98
    hazelnutDensity: number; // percentage e.g. 92
    edgeCrunch: number; // percentage e.g. 85
    richness: number; // percentage e.g. 95
  };
  tastingNotes: {
    aroma: string;
    texture: string;
    pairings: string[];
    originNote: string;
  };
  ingredients: string[];
  allergens: string[];
  bakingSpec: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWarmth?: 'freshly-warmed' | 'ambient';
  notes?: string;
}

export interface BoxSlot {
  slotIndex: number;
  product?: Product;
}
