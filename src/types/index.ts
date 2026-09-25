export interface WholesaleTier {
  minQty: number;
  maxQty?: number;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'electronics' | 'lifestyle' | 'packaging' | 'accessories' | 'fashion' | 'home' | 'health';
  categoryLabel: string;
  price: number; // Base unit price
  rating: number;
  reviewCount: number;
  moq: number; // Minimum order quantity
  stock: number;
  icon: string; // Phosphor icon name, e.g. 'ph-headphones'
  badge?: 'HOT' | 'TOP' | 'NEW' | 'SALE';
  sku: string;
  description: string;
  tiers: WholesaleTier[];
  specs: {
    packaging: string;
    weight: string;
    leadTime: string;
    origin: string;
  };
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedTierPrice: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  description: string;
  subcategories: string[];
}

export interface QuoteRequest {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  productId?: string;
  productName: string;
  targetQuantity: number;
  targetPricePerUnit?: number;
  destinationZip: string;
  notes: string;
  date: string;
  status: 'Pending Review' | 'Quoted' | 'Processing';
}

export interface WholesaleOrder {
  id: string;
  poNumber: string;
  date: string;
  itemsCount: number;
  total: number;
  status: 'Delivered' | 'In Transit' | 'Processing' | 'Payment Pending';
  trackingNumber?: string;
  carrier?: string;
}

export type ActiveTab = 'home' | 'category' | 'deals' | 'saved' | 'account';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD';
