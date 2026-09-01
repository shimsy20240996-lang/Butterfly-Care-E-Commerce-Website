import bcrypt from 'bcryptjs';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_REVIEWS,
  INITIAL_COUPONS,
  INITIAL_USERS,
  SRI_LANKAN_DISTRICTS
} from '../seed/seedData';

export interface InMemoryUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: 'customer' | 'admin';
  phone?: string;
  addresses: Array<{
    _id?: string;
    fullName: string;
    phone: string;
    addressLine: string;
    city: string;
    district: string;
    postalCode?: string;
    isDefault?: boolean;
  }>;
  wishlist: string[];
  createdAt: string;
  updatedAt: string;
}

export interface InMemoryCategory {
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

export interface InMemoryProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  discountPrice?: number;
  category: string; // category id
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

export interface InMemoryOrder {
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
  items: Array<{
    product: string;
    name: string;
    slug: string;
    image: string;
    price: number;
    quantity: number;
    selectedSize?: string;
    selectedColor?: string;
    sku?: string;
  }>;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: 'cash_on_delivery' | 'bank_transfer' | 'online_gateway';
  paymentStatus: 'pending' | 'paid' | 'failed';
  deliveryType: 'standard' | 'express';
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  timeline: Array<{
    status: string;
    timestamp: string;
    note?: string;
  }>;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InMemoryReview {
  _id: string;
  product: string;
  user?: string;
  userName: string;
  userEmail?: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  status: 'approved' | 'pending' | 'rejected';
  createdAt: string;
}

export interface InMemoryCoupon {
  _id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  startDate?: string;
  expiryDate?: string;
  usageLimit?: number;
  usedCount: number;
  active: boolean;
  createdAt: string;
}

export interface InMemorySetting {
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

class StoreService {
  public users: InMemoryUser[] = [];
  public categories: InMemoryCategory[] = [];
  public products: InMemoryProduct[] = [];
  public orders: InMemoryOrder[] = [];
  public reviews: InMemoryReview[] = [];
  public coupons: InMemoryCoupon[] = [];
  public settings: InMemorySetting = {
    storeName: 'BUTTERFLY CARE',
    tagline: 'for every mom',
    announcementText: 'Thoughtfully chosen for moms & little ones • Islandwide Delivery Available',
    whatsappNumber: '+94 74 022 5855',
    contactEmail: 'care@butterflycare.lk',
    contactPhone: '+94 74 022 5855',
    address: 'No. 42, Lotus Avenue, Colombo 07, Sri Lanka',
    currency: 'LKR',
    currencySymbol: 'Rs.',
    freeShippingThreshold: 7500,
    defaultDeliveryFee: 450,
    expressDeliveryFee: 850,
    districtDeliveryFees: SRI_LANKAN_DISTRICTS,
    bankDetails: {
      bankName: 'Commercial Bank of Ceylon',
      branch: 'Colombo 07 Branch',
      accountName: 'Butterfly Care (Pvt) Ltd',
      accountNumber: '1000 4589 3210',
      instructions: 'Please deposit the order total to the account above and WhatsApp the deposit slip with your Order Number to +94 74 022 5855.'
    },
    socialLinks: {
      instagram: 'https://instagram.com/butterflycare',
      facebook: 'https://facebook.com/butterflycare',
      tiktok: 'https://tiktok.com/@butterflycare',
      whatsapp: 'https://wa.me/94740225855'
    },
    stats: {
      happyCustomers: 1250,
      totalProducts: 32,
      totalCategories: 8,
      deliveryLocations: 'Islandwide Delivery'
    }
  };

  private initialized = false;

  constructor() {
    this.initializeData();
  }

  public async initializeData() {
    if (this.initialized) return;

    // Initialize Categories
    this.categories = INITIAL_CATEGORIES.map((c, index) => ({
      _id: `cat-${index + 1}`,
      name: c.name,
      slug: c.slug,
      description: c.description,
      image: c.image,
      featured: c.featured,
      active: c.active,
      order: c.order,
      itemCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));

    // Initialize Products
    this.products = INITIAL_PRODUCTS.map((p, index) => {
      const cat = this.categories.find(c => c.slug === p.categorySlug);
      const catId = cat ? cat._id : 'cat-1';
      const catName = cat ? cat.name : 'Baby Care';
      return {
        _id: `prod-${index + 1}`,
        name: p.name,
        slug: p.slug,
        description: p.description,
        shortDescription: p.shortDescription,
        price: p.price,
        discountPrice: p.discountPrice,
        category: catId,
        categorySlug: p.categorySlug,
        categoryName: catName,
        images: p.images,
        stock: p.stock,
        sku: p.sku,
        brand: p.brand,
        ageGroup: p.ageGroup,
        sizes: p.sizes || [],
        colors: p.colors || [],
        materials: p.materials,
        careInstructions: p.careInstructions,
        rating: p.rating,
        reviewCount: p.reviewCount,
        featured: p.featured,
        bestSeller: p.bestSeller,
        newArrival: p.newArrival,
        active: p.active,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    });

    // Update item counts in categories
    this.categories.forEach(cat => {
      cat.itemCount = this.products.filter(p => p.category === cat._id).length;
    });

    // Initialize Users with hashed passwords
    for (let i = 0; i < INITIAL_USERS.length; i++) {
      const u = INITIAL_USERS[i];
      const hashedPassword = await bcrypt.hash(u.password, 10);
      this.users.push({
        _id: `user-${i + 1}`,
        name: u.name,
        email: u.email.toLowerCase(),
        password: hashedPassword,
        role: u.role as 'customer' | 'admin',
        phone: u.phone,
        addresses: u.addresses.map((a, idx) => ({ ...a, _id: `addr-${idx + 1}` })),
        wishlist: [`prod-1`, `prod-5`],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    // Initialize Reviews
    this.reviews = INITIAL_REVIEWS.map((r, index) => {
      const prod = this.products.find(p => p.sku === r.productSku) || this.products[0];
      return {
        _id: `rev-${index + 1}`,
        product: prod._id,
        userName: r.userName,
        userEmail: r.userEmail,
        rating: r.rating,
        title: r.title,
        comment: r.comment,
        verifiedPurchase: r.verifiedPurchase,
        status: r.status as 'approved',
        createdAt: new Date().toISOString()
      };
    });

    // Initialize Coupons
    this.coupons = INITIAL_COUPONS.map((c, index) => ({
      _id: `coup-${index + 1}`,
      code: c.code,
      discountType: c.discountType as 'percentage' | 'fixed',
      discountValue: c.discountValue,
      minOrderValue: c.minOrderValue,
      maxDiscount: c.maxDiscount,
      usageLimit: c.usageLimit,
      usedCount: c.usedCount,
      active: c.active,
      createdAt: new Date().toISOString()
    }));

    // Initialize Sample Orders
    this.orders = [
      {
        _id: 'ord-1001',
        orderNumber: 'BC-2026-00101',
        user: 'user-2',
        customerDetails: {
          fullName: 'Dilani Perera',
          email: 'dilani.p@gmail.com',
          phone: '+94712345678'
        },
        deliveryAddress: {
          addressLine: '15/3 Flower Road',
          city: 'Colombo 03',
          district: 'Colombo',
          postalCode: '00300'
        },
        items: [
          {
            product: 'prod-1',
            name: 'Organic Chamomile & Calendula Baby Wash',
            slug: 'organic-chamomile-calendula-baby-wash',
            image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop',
            price: 2850,
            quantity: 2,
            selectedSize: '250ml',
            selectedColor: 'Natural',
            sku: 'BC-BW-001'
          },
          {
            product: 'prod-9',
            name: '4-Layer Organic Muslin Dream Swaddle Blanket (Pack of 3)',
            slug: '4-layer-organic-muslin-dream-swaddle-blanket-pack',
            image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1000&auto=format&fit=crop',
            price: 4700,
            quantity: 1,
            selectedSize: '120cm x 120cm',
            selectedColor: 'Pastel Butterfly Trio',
            sku: 'BC-SW-301'
          }
        ],
        subtotal: 10400,
        deliveryFee: 0, // Free over threshold
        discount: 500,
        couponCode: 'MOMCARE500',
        total: 9900,
        paymentMethod: 'cash_on_delivery',
        paymentStatus: 'paid',
        deliveryType: 'standard',
        status: 'Delivered',
        timeline: [
          { status: 'Order Placed', timestamp: '2026-08-25T10:00:00.000Z', note: 'Order placed by customer' },
          { status: 'Confirmed', timestamp: '2026-08-25T10:30:00.000Z', note: 'Order verified by store manager' },
          { status: 'Processing', timestamp: '2026-08-25T14:00:00.000Z', note: 'Packed with Butterfly Care eco box' },
          { status: 'Shipped', timestamp: '2026-08-26T09:00:00.000Z', note: 'Handed over to islandwide courier' },
          { status: 'Delivered', timestamp: '2026-08-27T15:30:00.000Z', note: 'Delivered and cash collected' }
        ],
        notes: 'Please leave at the door with security if not available.',
        createdAt: '2026-08-25T10:00:00.000Z',
        updatedAt: '2026-08-27T15:30:00.000Z'
      },
      {
        _id: 'ord-1002',
        orderNumber: 'BC-2026-00102',
        user: 'user-3',
        customerDetails: {
          fullName: 'Kavindi Jayawardena',
          email: 'kavindi.j@yahoo.com',
          phone: '+94772345679'
        },
        deliveryAddress: {
          addressLine: '88 Negombo Road',
          city: 'Wattala',
          district: 'Gampaha',
          postalCode: '11300'
        },
        items: [
          {
            product: 'prod-5',
            name: 'Nourishing Motherhood Belly & Stretchmark Oil',
            slug: 'nourishing-motherhood-belly-stretchmark-oil',
            image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=1000&auto=format&fit=crop',
            price: 4250,
            quantity: 1,
            selectedSize: '100ml',
            selectedColor: 'Golden Rose',
            sku: 'BC-MO-101'
          }
        ],
        subtotal: 4250,
        deliveryFee: 400,
        discount: 0,
        total: 4650,
        paymentMethod: 'bank_transfer',
        paymentStatus: 'paid',
        deliveryType: 'standard',
        status: 'Processing',
        timeline: [
          { status: 'Order Placed', timestamp: '2026-08-30T11:00:00.000Z', note: 'Customer placed order via bank transfer' },
          { status: 'Confirmed', timestamp: '2026-08-30T12:00:00.000Z', note: 'Deposit slip verified on WhatsApp' },
          { status: 'Processing', timestamp: '2026-08-31T09:00:00.000Z', note: 'Being prepared for courier dispatch' }
        ],
        notes: 'Call before delivery.',
        createdAt: '2026-08-30T11:00:00.000Z',
        updatedAt: '2026-08-31T09:00:00.000Z'
      }
    ];

    this.initialized = true;
    console.log(`[Store] In-memory store initialized with ${this.categories.length} categories, ${this.products.length} products, ${this.users.length} users.`);
  }

  public generateOrderNumber(): string {
    const year = new Date().getFullYear();
    const count = this.orders.length + 1;
    const formattedCount = String(count).padStart(5, '0');
    return `BC-${year}-${formattedCount}`;
  }
}

export const store = new StoreService();
