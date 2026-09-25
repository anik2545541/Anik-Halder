import { Product, Category, WholesaleOrder } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: 'ph-laptop',
    count: 240,
    description: 'Consumer electronics, audio devices, displays & components',
    subcategories: ['Audio & Headphones', 'Power & Chargers', 'Displays & Monitors', 'Smart Gadgets', 'Cables & Adapters']
  },
  {
    id: 'accessories',
    name: 'Mobile Acc',
    icon: 'ph-device-mobile-camera',
    count: 310,
    description: 'Cases, screen protectors, mounts & fast charge cables',
    subcategories: ['Cases & Covers', 'Tempered Glass', 'Car Mounts', 'Wireless Chargers', 'Adapters']
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    icon: 'ph-armchair',
    count: 180,
    description: 'Modern workspace accessories, organizers, outdoor gear & travel',
    subcategories: ['Desk Essentials', 'Water Bottles & Flasks', 'Eyewear & Sunglasses', 'Travel Gear']
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: 'ph-t-shirt',
    count: 290,
    description: 'Wholesale apparel, activewear, footwear & bags',
    subcategories: ['Footwear & Sneakers', 'Backpacks & Luggage', 'Apparel & Uniforms', 'Hats & Headwear']
  },
  {
    id: 'packaging',
    name: 'Packaging',
    icon: 'ph-package',
    count: 145,
    description: 'Corrugated mailers, custom tape, storage bins & pallets',
    subcategories: ['Storage Boxes', 'Mailing Envelopes', 'Eco-friendly Wraps', 'Pallet Strapping']
  },
  {
    id: 'home',
    name: 'Home/Kit',
    icon: 'ph-coffee',
    count: 215,
    description: 'Kitchenware, drinkware, organizer sets & household supplies',
    subcategories: ['Drinkware', 'Kitchen Organizers', 'Cleaning Supplies', 'Storage Solutions']
  },
  {
    id: 'health',
    name: 'Health',
    icon: 'ph-sparkle',
    count: 95,
    description: 'Sanitary supplies, PPE, wellness accessories & fitness kits',
    subcategories: ['Sanitizing Tech', 'Fitness Gear', 'First Aid Supplies', 'Ergonomic Support']
  },
  {
    id: 'more',
    name: 'More',
    icon: 'ph-squares-four',
    count: 500,
    description: 'Industrial tools, warehouse equipment, bulk wholesale supplies',
    subcategories: ['Industrial Hardware', 'Office Stationery', 'Raw Materials', 'Safety Signage']
  }
];

export const PRODUCTS: Product[] = [
  // Floating Showcase items
  {
    id: 'prod-wh-1',
    name: 'Wireless Headphone',
    category: 'electronics',
    categoryLabel: 'Electronics',
    price: 12.50,
    rating: 4.8,
    reviewCount: 342,
    moq: 10,
    stock: 2450,
    icon: 'ph-headphones',
    badge: 'HOT',
    sku: 'WH-HD-992',
    description: 'High-definition wireless over-ear headphones with active noise cancellation and 40h battery life. Designed for retail re-sale and corporate gifting.',
    tiers: [
      { minQty: 10, maxQty: 49, price: 12.50 },
      { minQty: 50, maxQty: 199, price: 11.20 },
      { minQty: 200, price: 9.80 }
    ],
    specs: {
      packaging: '50 units / Master Carton',
      weight: '310g per unit',
      leadTime: '1-2 Days Dispatch',
      origin: 'Shenzhen Tech Facility'
    },
    inStock: true
  },
  {
    id: 'prod-sw-1',
    name: 'Smart Watch',
    category: 'electronics',
    categoryLabel: 'Electronics',
    price: 25.00,
    rating: 4.7,
    reviewCount: 289,
    moq: 5,
    stock: 1280,
    icon: 'ph-watch',
    badge: 'TOP',
    sku: 'SW-PRO-80',
    description: 'IP68 waterproof AMOLED smartwatch with heart-rate monitoring, SpO2 sensor, and customizable watch faces. Full multi-language OS.',
    tiers: [
      { minQty: 5, maxQty: 24, price: 25.00 },
      { minQty: 25, maxQty: 99, price: 22.50 },
      { minQty: 100, price: 19.90 }
    ],
    specs: {
      packaging: '40 units / Master Carton',
      weight: '145g per unit',
      leadTime: 'Same Day Dispatch',
      origin: 'Guangdong Precision Works'
    },
    inStock: true
  },
  {
    id: 'prod-ss-1',
    name: 'Sports Shoes',
    category: 'fashion',
    categoryLabel: 'Fashion',
    price: 18.00,
    rating: 4.7,
    reviewCount: 194,
    moq: 12,
    stock: 3100,
    icon: 'ph-sneaker',
    badge: 'NEW',
    sku: 'SH-RUN-402',
    description: 'Ultralight breathable mesh running and sports athletic footwear. High rebound EVA cushioning with non-slip rubber outsole. Assorted sizes per carton.',
    tiers: [
      { minQty: 12, maxQty: 48, price: 18.00 },
      { minQty: 49, maxQty: 144, price: 15.50 },
      { minQty: 145, price: 13.90 }
    ],
    specs: {
      packaging: '24 pairs / Assorted Sizes Pack',
      weight: '650g per pair with box',
      leadTime: '2 Days Dispatch',
      origin: 'Fujian Footwear Hub'
    },
    inStock: true
  },
  {
    id: 'prod-vb-1',
    name: 'Vacuum Bottle',
    category: 'lifestyle',
    categoryLabel: 'Lifestyle',
    price: 6.90,
    rating: 4.8,
    reviewCount: 420,
    moq: 20,
    stock: 5400,
    icon: 'ph-flask',
    badge: 'SALE',
    sku: 'VB-SS-750',
    description: 'Double-wall vacuum insulated 304 food-grade stainless steel bottle. Keeps drinks cold for 24 hours, piping hot for 12 hours. Powder-coat finish.',
    tiers: [
      { minQty: 20, maxQty: 99, price: 6.90 },
      { minQty: 100, maxQty: 499, price: 5.80 },
      { minQty: 500, price: 4.90 }
    ],
    specs: {
      packaging: '50 units / Master Carton',
      weight: '340g per unit',
      leadTime: 'Ready to Ship',
      origin: 'Zhejiang Steel Works'
    },
    inStock: true
  },

  // New Arrivals Items
  {
    id: 'prod-na-1',
    name: 'Bluetooth Speaker',
    category: 'electronics',
    categoryLabel: 'Electronics',
    price: 14.00,
    rating: 4.8,
    reviewCount: 188,
    moq: 10,
    stock: 1980,
    icon: 'ph-speaker-simple-high',
    badge: 'NEW',
    sku: 'SPK-BT-101',
    description: 'Rugged waterproof IPX7 wireless Bluetooth speaker with 360-degree stereo sound and rich bass. 12-hour continuous playback.',
    tiers: [
      { minQty: 10, maxQty: 49, price: 14.00 },
      { minQty: 50, maxQty: 199, price: 12.20 },
      { minQty: 200, price: 10.50 }
    ],
    specs: {
      packaging: '30 units / Master Carton',
      weight: '450g per unit',
      leadTime: 'Same Day Dispatch',
      origin: 'Shenzhen Audio Lab'
    },
    inStock: true
  },
  {
    id: 'prod-na-2',
    name: 'USB-C Fast Charger',
    category: 'accessories',
    categoryLabel: 'Mobile Acc',
    price: 6.50,
    rating: 4.6,
    reviewCount: 521,
    moq: 25,
    stock: 8900,
    icon: 'ph-plug',
    sku: 'CHG-GAN-30W',
    description: 'Compact 30W GaN fast wall charger with Power Delivery (PD 3.0). Compatible with iPhone, iPad, Galaxy and Android devices. UL/CE certified.',
    tiers: [
      { minQty: 25, maxQty: 99, price: 6.50 },
      { minQty: 100, maxQty: 499, price: 5.20 },
      { minQty: 500, price: 4.30 }
    ],
    specs: {
      packaging: '100 units / Carton',
      weight: '75g per unit',
      leadTime: 'Ready to Ship',
      origin: 'Dongguan Power Plant'
    },
    inStock: true
  },
  {
    id: 'prod-na-3',
    name: 'Smart Watch OLED',
    category: 'electronics',
    categoryLabel: 'Electronics',
    price: 22.00,
    rating: 4.7,
    reviewCount: 145,
    moq: 10,
    stock: 940,
    icon: 'ph-watch',
    sku: 'SW-OLED-500',
    description: 'Slim bezel OLED smart wristband with metallic casing, Bluetooth calling, and continuous sleep tracking.',
    tiers: [
      { minQty: 10, maxQty: 49, price: 22.00 },
      { minQty: 50, maxQty: 199, price: 19.50 },
      { minQty: 200, price: 17.00 }
    ],
    specs: {
      packaging: '50 units / Carton',
      weight: '110g per unit',
      leadTime: '1-2 Days Dispatch',
      origin: 'Shenzhen Electronics'
    },
    inStock: true
  },
  {
    id: 'prod-na-4',
    name: 'Office Backpack',
    category: 'fashion',
    categoryLabel: 'Fashion',
    price: 16.00,
    rating: 4.8,
    reviewCount: 312,
    moq: 15,
    stock: 1600,
    icon: 'ph-backpack',
    badge: 'NEW',
    sku: 'BP-OFF-15',
    description: 'Water-resistant anti-theft business laptop backpack with USB charging port and padded 15.6" compartment. Durable Oxford fabric.',
    tiers: [
      { minQty: 15, maxQty: 59, price: 16.00 },
      { minQty: 60, maxQty: 199, price: 14.10 },
      { minQty: 200, price: 12.40 }
    ],
    specs: {
      packaging: '25 units / Compressed Bale',
      weight: '720g per unit',
      leadTime: 'Ready to Ship',
      origin: 'Guangzhou Luggage District'
    },
    inStock: true
  },
  {
    id: 'prod-na-5',
    name: 'LED Monitor 24"',
    category: 'electronics',
    categoryLabel: 'Electronics',
    price: 95.00,
    rating: 4.9,
    reviewCount: 88,
    moq: 4,
    stock: 450,
    icon: 'ph-desktop',
    sku: 'MON-FHD-24',
    description: 'Full HD 1080p 75Hz ultra-thin bezel business display with HDMI and VGA ports. Low blue light certification.',
    tiers: [
      { minQty: 4, maxQty: 19, price: 95.00 },
      { minQty: 20, maxQty: 49, price: 87.00 },
      { minQty: 50, price: 79.00 }
    ],
    specs: {
      packaging: '5 units / Secure Palletized Box',
      weight: '3.6kg per unit',
      leadTime: '2 Days Dispatch',
      origin: 'Wuhan Display Works'
    },
    inStock: true
  },

  // Best Sellers Items
  {
    id: 'prod-bs-1',
    name: 'Wireless Earbuds Pro',
    category: 'electronics',
    categoryLabel: 'Electronics',
    price: 16.00,
    rating: 4.8,
    reviewCount: 890,
    moq: 15,
    stock: 6200,
    icon: 'ph-headphones',
    sku: 'EB-PRO-TWS',
    description: 'TWS true wireless in-ear earbuds with environmental noise cancelling microphones, wireless charging case, and low latency gaming mode.',
    tiers: [
      { minQty: 15, maxQty: 49, price: 16.00 },
      { minQty: 50, maxQty: 199, price: 13.90 },
      { minQty: 200, price: 11.80 }
    ],
    specs: {
      packaging: '60 units / Master Box',
      weight: '115g per unit',
      leadTime: 'Same Day Dispatch',
      origin: 'Shenzhen Acoustics'
    },
    inStock: true
  },
  {
    id: 'prod-bs-2',
    name: "Men's Sneakers",
    category: 'fashion',
    categoryLabel: 'Fashion',
    price: 28.00,
    rating: 4.7,
    reviewCount: 540,
    moq: 10,
    stock: 2100,
    icon: 'ph-sneaker',
    sku: 'SNK-MN-90',
    description: 'Premium casual walking and lifestyle sneakers with shock-absorbing honeycomb soles and memory foam insoles.',
    tiers: [
      { minQty: 10, maxQty: 39, price: 28.00 },
      { minQty: 40, maxQty: 119, price: 24.50 },
      { minQty: 120, price: 21.00 }
    ],
    specs: {
      packaging: '20 pairs / Master Box',
      weight: '820g per pair',
      leadTime: 'Ready to Ship',
      origin: 'Jinjiang Footwear Zone'
    },
    inStock: true
  },
  {
    id: 'prod-bs-3',
    name: 'Stainless Bottle 1L',
    category: 'lifestyle',
    categoryLabel: 'Lifestyle',
    price: 8.00,
    rating: 4.8,
    reviewCount: 780,
    moq: 25,
    stock: 4900,
    icon: 'ph-flask',
    sku: 'BOT-1000ML',
    description: 'Heavy duty 1000ml sports gym and travel stainless steel bottle with leakproof straw lid and powder coating.',
    tiers: [
      { minQty: 25, maxQty: 99, price: 8.00 },
      { minQty: 100, maxQty: 299, price: 6.90 },
      { minQty: 300, price: 5.80 }
    ],
    specs: {
      packaging: '40 units / Carton',
      weight: '410g per unit',
      leadTime: 'Ready to Ship',
      origin: 'Yongkang Hardware Hub'
    },
    inStock: true
  },
  {
    id: 'prod-bs-4',
    name: 'Sunglasses UV400',
    category: 'lifestyle',
    categoryLabel: 'Lifestyle',
    price: 10.00,
    rating: 4.7,
    reviewCount: 390,
    moq: 20,
    stock: 3300,
    icon: 'ph-sunglasses',
    sku: 'SUN-UV-CLASSIC',
    description: 'Polarized UV400 protective sunglasses with reinforced metal hinges and scratch-resistant TAC lenses. Retail packaging with microfiber pouch included.',
    tiers: [
      { minQty: 20, maxQty: 99, price: 10.00 },
      { minQty: 100, maxQty: 299, price: 8.40 },
      { minQty: 300, price: 6.90 }
    ],
    specs: {
      packaging: '100 units / Master Box',
      weight: '60g per unit',
      leadTime: 'Same Day Dispatch',
      origin: 'Taizhou Optical Center'
    },
    inStock: true
  },
  {
    id: 'prod-bs-5',
    name: 'Storage Box Set',
    category: 'packaging',
    categoryLabel: 'Packaging',
    price: 15.00,
    rating: 4.8,
    reviewCount: 260,
    moq: 10,
    stock: 1800,
    icon: 'ph-archive-box',
    sku: 'BOX-ST-3PK',
    description: 'Set of 3 stackable heavy-duty polypropylene storage boxes with locking handles and transparent visibility windows.',
    tiers: [
      { minQty: 10, maxQty: 49, price: 15.00 },
      { minQty: 50, maxQty: 199, price: 12.80 },
      { minQty: 200, price: 10.90 }
    ],
    specs: {
      packaging: '10 sets / Nested Carton',
      weight: '1.4kg per set',
      leadTime: '2 Days Dispatch',
      origin: 'Ningbo Plastics Works'
    },
    inStock: true
  },
  {
    id: 'prod-bs-6',
    name: 'Desk Organizer Hub',
    category: 'lifestyle',
    categoryLabel: 'Lifestyle',
    price: 9.50,
    rating: 4.6,
    reviewCount: 310,
    moq: 15,
    stock: 2400,
    icon: 'ph-tray',
    sku: 'ORG-DSK-HUB',
    description: 'Modular desktop organizer tray with cable management clips, pen holders, phone stand, and non-slip silicone base feet.',
    tiers: [
      { minQty: 15, maxQty: 49, price: 9.50 },
      { minQty: 50, maxQty: 149, price: 8.10 },
      { minQty: 150, price: 6.95 }
    ],
    specs: {
      packaging: '30 units / Master Box',
      weight: '290g per unit',
      leadTime: 'Ready to Ship',
      origin: 'Suzhou Craft Factory'
    },
    inStock: true
  }
];

export const MOCK_ORDERS: WholesaleOrder[] = [
  {
    id: 'ORD-2026-8812',
    poNumber: 'PO-99420',
    date: '2026-09-21',
    itemsCount: 150,
    total: 1830.00,
    status: 'In Transit',
    trackingNumber: 'FX-8841-9201-US',
    carrier: 'FedEx Freight'
  },
  {
    id: 'ORD-2026-8790',
    poNumber: 'PO-99388',
    date: '2026-09-12',
    itemsCount: 300,
    total: 2070.00,
    status: 'Delivered',
    trackingNumber: 'UPS-7729-1099-US',
    carrier: 'UPS Supply Chain'
  },
  {
    id: 'ORD-2026-8650',
    poNumber: 'PO-99215',
    date: '2026-08-28',
    itemsCount: 80,
    total: 1200.00,
    status: 'Delivered',
    trackingNumber: 'DHL-4402-9912-US',
    carrier: 'DHL Global'
  }
];

export const CURRENCY_RATES: Record<string, { symbol: string; rate: number }> = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  CAD: { symbol: 'CA$', rate: 1.35 }
};
