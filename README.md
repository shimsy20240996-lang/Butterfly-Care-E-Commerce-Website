# BUTTERFLY CARE — for every mom 🌸
### Premium Modern Mother & Baby Care E-Commerce Platform

A complete, professional, production-ready full-stack e-commerce website for **BUTTERFLY CARE** ("for every mom") built with Next.js, TypeScript, Tailwind CSS, Framer Motion, Node.js, Express, MongoDB/Mongoose, and JWT Authentication. Tailored for Sri Lankan e-commerce operations with LKR currency (`Rs. 2,490`), Sri Lankan district delivery rules, WhatsApp direct inquiries, and a comprehensive Admin Control Panel.

---

## 🎨 Brand Visual Identity & Color Palette

- **Primary Background**: `#F8F3EF` (Warm Cream)
- **Soft Section**: `#F1E2DC` (Soft Powder Blush)
- **Secondary**: `#E8D5CE` (Muted Warm Sand)
- **Accent**: `#DDB9AE` (Rose Dust)
- **Primary Button / CTA**: `#B98276` (Terracotta Rose)
- **Main Typography**: `#5A4945` (Warm Deep Espresso)
- **Secondary Typography**: `#8A7771` (Soft Taupe)
- **White**: `#FFFFFF`
- **Logo**: Sophisticated vector butterfly mark seamlessly uniting delicate wings with a gentle heart contour + "BUTTERFLY CARE" and "for every mom".

---

## 🚀 Key Features

### Storefront Experience
- **Sticky Header & Announcement Bar**: "Thoughtfully chosen for moms & little ones • Islandwide Delivery Available", live search modal with instant autocomplete, wishlist count, and cart count.
- **Hero Carousel**: High-resolution mother & baby lifestyle imagery, smooth slide transitions, elegant headlines, and action buttons.
- **8 Image-based Category Cards**: Baby Care, Mom Care, Feeding & Nursing, Sleep & Snuggle, Bath & Care, Clothing, Toys & Gifts, Baby Essentials.
- **Editorial Spotlight**: "Made with Care for Moms & Little Ones" split editorial showcase.
- **New Arrivals & Best Sellers**: 4-column responsive product cards, badges (NEW, BEST SELLER, SALE, LOW STOCK), Quick View modal, and Wishlist toggling.
- **Dedicated Mom Care Feature**: "Because Every Mom Deserves a Little Care Too" honoring maternal wellness.
- **Sri Lanka E-Commerce & Checkout**:
  - Sri Lankan Rupee formatting (`Rs. 2,490`)
  - All 25 Sri Lankan Districts supported (Colombo, Gampaha, Kandy, Galle, etc.)
  - Configurable delivery fees and free shipping progress meter (`Rs. 7,500` threshold)
  - Cash on Delivery (COD) & Direct Bank Transfer (showing Butterfly Care Commercial Bank details)
- **Order Confirmation & Tracking**: Unique order IDs (e.g. `BC-2026-00101`), live visual step tracker (`Pending` -> `Confirmed` -> `Processing` -> `Shipped` -> `Delivered`).
- **Floating WhatsApp**: Instant WhatsApp chat trigger with pre-filled message support.
- **Customer Account**: Orders list, saved wishlist, profile updater, and address book.
- **Brand Pages**: Editorial "Our Story", "Contact Us" with interactive form and boutique details.

### Admin Control Panel (`/admin`)
- **Overview & Analytics**: Total Sales (LKR), Total Orders, Verified Customers, Low Stock alerts, interactive 6-month sales growth charts, and order status breakdown.
- **Product Management**: Full CRUD, image URLs / Cloudinary, price, discount, inventory stock, age groups, variants (sizes, colors), and badge toggles.
- **Category Management**: Create, edit, delete, and manage category banners and descriptions.
- **Order Management**: Search, filter by status, update delivery timelines with custom tracking notes.
- **Inventory Monitor**: Real-time low-stock alerts (&le; 10 units) with single-click inline stock adjustor.
- **Coupons & Promotions**: Create promo codes with percentage or fixed discounts, min order requirements, and usage counters.
- **Reviews Moderation**: Approve, reject, or delete customer product reviews.
- **Store Settings**: Configure brand name, tagline, WhatsApp hotline, district delivery fees, free delivery threshold, and bank details.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, Zustand, Canvas Confetti.
- **Backend**: Node.js, Express.js, TypeScript, Mongoose, JWT, bcryptjs, Multer, Cloudinary, REST API.
- **Database**: MongoDB Atlas / local MongoDB with automatic in-memory persistence fallback.

---

## 📦 Quick Start & Running Locally

### 1. Start the Backend API
```bash
cd backend
npm install
npm run dev
```
Backend runs on `http://localhost:5000` (Health Check: `http://localhost:5000/api/health`).

### 2. Start the Frontend Storefront
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:3000`.

---

## 🔑 Demo Accounts

| Role | Email | Password |
|---|---|---|
| **Administrator** | `admin@butterflycare.com` | `Admin@123456` |
| **Customer** | `dilani.p@gmail.com` | `Customer@123` |
| **Customer** | `kavindi.j@yahoo.com` | `Customer@123` |

Sample Coupon Codes for Checkout:
- `WELCOME10` (10% OFF on orders over Rs. 3,000)
- `MOMCARE500` (Rs. 500 OFF on orders over Rs. 5,000)
- `FREESHIP` (Rs. 450 OFF delivery fee)
