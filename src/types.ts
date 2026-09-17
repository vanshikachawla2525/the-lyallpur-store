export type CategoryType = 
  | 'all'
  | 'sweets'
  | 'namkeen'
  | 'gachak'
  | 'mathi'
  | 'cookies'
  | 'bakery'
  | 'rusk'
  | 'summer_drinks'
  | 'gifting';

export interface ProductWeight {
  weight: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  punjabiName?: string;
  category: CategoryType;
  subcategory?: string;
  description: string;
  storySnippet?: string;
  price: number; // base price (usually 500g or 1 pack)
  weights: ProductWeight[];
  defaultWeight: string;
  image: string;
  badge?: string;
  isPureDesiGhee: boolean;
  isSignature?: boolean;
  rating: number;
  reviewsCount: number;
  ingredients: string[];
  shelfLife: string;
  storage: string;
}

export interface CartItem {
  product: Product;
  selectedWeight: string;
  unitPrice: number;
  quantity: number;
}

export interface StoreLocation {
  id: string;
  name: string;
  isFlagship?: boolean;
  address: string;
  area: string;
  city: string;
  pincode: string;
  timings?: string;
  timing?: string;
  phone: string;
  specialty?: string;
  ambiance?: string;
  mapQuery: string;
  image: string;
}

export interface StoryChapter {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
}

export interface GiftingItem {
  id: string;
  title: string;
  category: 'Festive Gifting' | 'Corporate Gifting' | 'Wedding Gifting' | 'Custom Hampers';
  price: number;
  description: string;
  includes: string[];
  image: string;
  packaging: string;
}
