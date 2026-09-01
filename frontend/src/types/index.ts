export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  discountPrice?: number;
  category: string;
  categorySlug?: string;
  categoryName?: string;
  images: string[];
  stock: number;
  sku: string;
  brand: string;
  ageGroup: string;
  sizes: string[];
  colors: string[];
  materials: string;
  careInstructions: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  featured: boolean;
  active: boolean;
  itemCount?: number;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: string; // Product ID
  name: string;
  slug: string;
  image: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  sku?: string;
  maxStock: number;
}

export interface Review {
  _id: string;
  product: string;
  userName: string;
  userEmail?: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  status: 'approved' | 'pending' | 'rejected';
  createdAt: string;
  productName?: string;
  productImage?: string;
}

export interface Coupon {
  _id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  active: boolean;
}

export interface Address {
  _id?: string;
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  district: string;
  postalCode?: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  phone?: string;
  addresses: Address[];
  wishlist: string[];
  orderCount?: number;
  totalSpent?: number;
  createdAt?: string;
}

export interface OrderItem {
  product: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  sku?: string;
}

export interface OrderTimeline {
  status: string;
  timestamp: string;
  note?: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  user?: string;
  customerDetails: {
    fullName: string;
    email: string;
    phone: string;
  };
  deliveryAddress: {
    addressLine: string;
    city: string;
    district: string;
    postalCode?: string;
  };
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: 'cash_on_delivery' | 'bank_transfer' | 'online_gateway';
  paymentStatus: 'pending' | 'paid' | 'failed';
  deliveryType: 'standard' | 'express';
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  timeline: OrderTimeline[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  announcementText: string;
  whatsappNumber: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  currency: string;
  currencySymbol: string;
  freeShippingThreshold: number;
  defaultDeliveryFee: number;
  expressDeliveryFee: number;
  districtDeliveryFees: Array<{ district: string; fee: number }>;
  bankDetails: {
    bankName: string;
    branch: string;
    accountName: string;
    accountNumber: string;
    instructions: string;
  };
  socialLinks: {
    instagram: string;
    facebook: string;
    tiktok: string;
    whatsapp: string;
  };
  stats: {
    happyCustomers: number;
    totalProducts: number;
    totalCategories: number;
    deliveryLocations: string;
  };
}
