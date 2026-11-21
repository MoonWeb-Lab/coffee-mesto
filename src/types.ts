export interface KBJU {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface MenuItem {
  id: string;
  name: string;
  weight: string;
  price: number;
  category: string;
  description: string;
  ingredients?: string;
  kbju: KBJU;
  recommendation?: string;
  image: string;
  fullImage: string;
  badge?: string;
  isPopular?: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  comment?: string;
}

export type OrderType = 'takeaway' | 'table';

export interface OrderForm {
  name: string;
  phone: string;
  time: string;
  orderType: OrderType;
  guestsCount?: number;
  comment?: string;
}
