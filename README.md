<div align="center">

# 🌸 BUTTERFLY CARE — *for every mom*
### Premium Full-Stack Baby & Mother Care E-Commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.19-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/API_on-Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://render.com/)

<br />

> **"Care for every little moment."**  
> A luxury, production-ready e-commerce platform crafted with gentle care, comfort, trust, and love for mothers and their little ones across Sri Lanka.

---

</div>

## 📖 Table of Contents
- [✨ Key Features](#-key-features)
- [🎨 Brand Design System & Color Palette](#-brand-design-system--color-palette)
- [🏛️ System Architecture](#️-system-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Folder Structure](#-project-folder-structure)
- [🚀 Quick Start & Local Setup](#-quick-start--local-setup)
- [🔑 Demo Accounts & Sample Coupons](#-demo-accounts--sample-coupons)
- [📡 API Endpoints Reference](#-api-endpoints-reference)
- [🚢 Production Deployment](#-production-deployment)
- [📞 Contact & Official Hotline](#-contact--official-hotline)

---

## ✨ Key Features

### 🛍️ Customer Experience
- **Editorial Brand Storytelling**: Soft, modern boutique aesthetic inspired by luxury maternal wellness brands.
- **Hero Lifestyle Carousel**: Smooth auto-play transitions with high-resolution photography and call-to-actions.
- **8 Curated Collection Grids**:
  - 🍼 *Baby Care* — Dermatologist-verified hygiene and gentle balms
  - 🌸 *Mom Care* — Postpartum recovery and restorative care
  - 🍼 *Feeding & Nursing* — BPA-free anti-colic essentials
  - 🌙 *Sleep & Snuggle* — GOTS-certified organic muslin swaddles
  - 🛁 *Bath & Care* — Hypoallergenic tear-free botanical care
  - 👶 *Clothing* — Pure organic cotton rompers and loungewear
  - 🎁 *Toys & Gifts* — Natural beechwood and heirloom newborn keepsakes
  - 🎒 *Baby Essentials* — Multi-compartment diaper bags and daily travel gear
- **Live Search Modal**: Real-time product search with instant autocomplete and `⌘K` keyboard shortcut.
- **Shop All with Multi-Faceted Filters**: Dynamic sidebar filtering by Category, Price Range, Age Group, Rating, and In-Stock status, plus sorting by Featured, Newest, Price, and Rating.
- **Product Details & Gallery**:
  - Interactive multi-angle image gallery with zoom preview
  - Variant selectors for sizes, colors, and quantity stepper
  - Live inventory stock indicators (*"Only 3 left in stock"*)
  - **"Ask About This Product on WhatsApp"** button pre-filling product details and SKU
  - Expandable accordions for description, organic materials, and care guides
  - Verified customer reviews with instant submission modal
- **Interactive Cart & Slide-Out Drawer**:
  - Live quantity adjustment and order recalculation
  - Free Islandwide Delivery progress bar (*"Add Rs. 2,500 more to qualify for FREE delivery"*)
  - Real-time coupon code validator (`WELCOME10`, `MOMCARE500`)
- **Sri Lanka Localized Checkout**:
  - Full dropdown for all **25 Sri Lankan Districts** (Colombo, Gampaha, Kandy, Galle, etc.)
  - Standard (2-4 days) and Priority Express delivery options
  - **Cash on Delivery (COD)** & **Direct Bank Deposit** (with Commercial Bank payment instructions)
- **Order Confirmation & Tracking**:
  - Unique order numbers (e.g., `BC-2026-00101`) with celebratory confetti
  - 5-step live visual tracker (`Pending` → `Confirmed` → `Processing` → `Shipped` → `Delivered`)
  - Shipment activity and courier dispatch logs
- **Customer Account Portal (`/account`)**:
  - Personal order history with live status timelines
  - Saved wishlist with 1-click Add to Cart
  - Address book management for multiple Sri Lankan delivery addresses
  - Profile details and security updater
- **Floating WhatsApp Widget**: Persistent maternal hotline widget with pulse animation.

---

### 🛡️ Admin Control Panel (`/admin`)
- **Executive Analytics Dashboard**:
  - KPI summary cards (Total Revenue in LKR, Orders count, Verified Customers, Low Stock alerts)
  - 6-Month interactive sales revenue chart
  - Real-time order fulfillment status breakdown
- **Product Management (`/admin/products`)**:
  - Full CRUD operations with multi-image URL uploads
  - SKU generator, price, discount pricing, and stock controls
  - Variant managers for sizes, color palettes, and age groups
  - Badges toggles: *Featured, Best Seller, New Arrival, Active*
- **Category Management (`/admin/categories`)**: Create, edit, and organize collections with custom banners.
- **Order Fulfillment Center (`/admin/orders`)**: Filter by status, inspect customer delivery addresses and items, and update shipment timeline notes.
- **Warehouse Inventory Monitor (`/admin/inventory`)**: Real-time low-stock alerts (threshold &le; 10 units) with inline single-click stock updates.
- **Discount & Coupon Manager (`/admin/coupons`)**: Create percentage or fixed LKR discount codes with usage counters and minimum spend caps.
- **Reviews Moderation (`/admin/reviews`)**: Review, approve, or remove customer feedback.
- **Store Settings (`/admin/settings`)**: Configure brand name, tagline, announcement bar, WhatsApp hotline, district delivery rates, and bank accounts.

---

## 🎨 Brand Design System & Color Palette

Designed specifically for mother and baby care to evoke calmness, warmth, purity, and trust:

| Token | Hex Code | Color Swatch | Purpose |
|---|---|---|---|
| **Primary Background** | `#F8F3EF` | <img src="https://via.placeholder.com/20/F8F3EF/F8F3EF.png" width="20" height="20" /> | Warm soft cream background |
| **Soft Section** | `#F1E2DC` | <img src="https://via.placeholder.com/20/F1E2DC/F1E2DC.png" width="20" height="20" /> | Soft powder blush container backgrounds |
| **Secondary** | `#E8D5CE` | <img src="https://via.placeholder.com/20/E8D5CE/E8D5CE.png" width="20" height="20" /> | Muted warm sand accents & borders |
| **Accent** | `#DDB9AE` | <img src="https://via.placeholder.com/20/DDB9AE/DDB9AE.png" width="20" height="20" /> | Rose dust badges & highlight pills |
| **Primary Button / CTA** | `#B98276` | <img src="https://via.placeholder.com/20/B98276/B98276.png" width="20" height="20" /> | Terracotta Rose primary action buttons |
| **Main Typography** | `#5A4945` | <img src="https://via.placeholder.com/20/5A4945/5A4945.png" width="20" height="20" /> | Warm deep espresso headlines & body |
| **Secondary Text** | `#8A7771` | <img src="https://via.placeholder.com/20/8A7771/8A7771.png" width="20" height="20" /> | Soft taupe subheadings & metadata |
| **Pure White** | `#FFFFFF` | <img src="https://via.placeholder.com/20/FFFFFF/FFFFFF.png" width="20" height="20" /> | Card backgrounds & contrast elements |

- **Typography**: `Playfair Display` (Display Serif) + `Plus Jakarta Sans` / `Inter` (Clean Modern Sans).

---

## 🏛️ System Architecture

```
                                  ┌───────────────────────────────┐
                                  │      Client (Browser/PWA)     │
                                  └───────────────┬───────────────┘
                                                  │
                             HTTPS (REST API / JSON / LocalStorage)
                                                  │
                   ┌──────────────────────────────┴──────────────────────────────┐
                   ▼                                                             ▼
  ┌─────────────────────────────────┐                           ┌─────────────────────────────────┐
  │      Next.js 14 Storefront      │                           │        Express Node API         │
  │  (App Router + Tailwind CSS)    │                           │  (JWT Auth + Business Logic)    │
  └────────────────┬────────────────┘                           └────────────────┬────────────────┘
                   │                                                             │
         Static CDN / Vercel                                          REST Controllers & Middleware
                                                                                 │
                                                    ┌────────────────────────────┴───────────────────────────┐
                                                    ▼                                                        ▼
                                      ┌───────────────────────────┐                            ┌───────────────────────────┐
                                      │   MongoDB Atlas Database  │                            │    In-Memory Seed Store   │
                                      │  (Mongoose Schema Models) │                            │   (Offline Fallback Data) │
                                      └───────────────────────────┘                            └───────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & Client Boundaries)
- **Language**: TypeScript 5.4
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design tokens
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with LocalStorage persistence
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Server**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) (with automatic in-memory fallback store)
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) & [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **File Uploads**: [Multer](https://github.com/expressjs/multer) & [Cloudinary](https://cloudinary.com/)
- **Utility**: [Slugify](https://github.com/simov/slugify), [Cors](https://github.com/expressjs/cors), [Dotenv](https://github.com/motdotla/dotenv)

---

## 📁 Project Folder Structure

```
Butterfly-Care-E-Commerce-Website/
├── backend/
│   ├── src/
│   │   ├── config/          # Database connection & in-memory store
│   │   ├── controllers/     # Auth, Products, Orders, Categories, Analytics, etc.
│   │   ├── middleware/      # JWT auth, role guard & error handling
│   │   ├── models/          # User, Product, Category, Order, Review, Coupon, Setting
│   │   ├── routes/          # Express REST API routes
│   │   ├── seed/            # Seed data & standalone seeder script
│   │   ├── utils/           # JWT token generation & helpers
│   │   └── server.ts        # Express entry point
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   │   ├── account/     # Customer dashboard
│   │   │   ├── admin/       # Complete Admin Control Panel
│   │   │   ├── auth/        # Login & Register
│   │   │   ├── cart/        # Shopping Cart
│   │   │   ├── checkout/    # Sri Lanka District Checkout
│   │   │   ├── contact/     # Contact & boutique details
│   │   │   ├── order-success/# Order confirmation with confetti
│   │   │   ├── our-story/   # Brand editorial
│   │   │   ├── product/     # Dynamic product detail page
│   │   │   ├── shop/        # Shop catalog with multi-filters
│   │   │   ├── track-order/ # Live order tracker
│   │   │   ├── layout.tsx   # Root layout & providers
│   │   │   └── page.tsx     # Homepage with 11 rich sections
│   │   ├── components/      # UI, layout, home, shop, cart, product & admin components
│   │   ├── context/         # Zustand stores (cart, wishlist, auth, settings, toast)
│   │   ├── lib/             # API client, LKR currency formatter & WhatsApp link generator
│   │   └── types/           # TypeScript interfaces & types
│   ├── public/              # Static assets
│   ├── Dockerfile
│   ├── next.config.mjs
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── docker-compose.yml       # Production multi-container orchestration
├── DEPLOYMENT_GUIDE.md      # Deployment manual
└── README.md
```

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- **Node.js** v18 or higher
- **npm** or **yarn** / **pnpm**
- *(Optional)* MongoDB Atlas connection URI or local MongoDB instance

---

### 1. Clone the Repository
```bash
git clone https://github.com/shimsy20240996-lang/Butterfly-Care-E-Commerce-Website.git
cd Butterfly-Care-E-Commerce-Website
```

---

### 2. Setup & Start Backend Server
```bash
cd backend
npm install
npm run dev
```
- API Server will run on: `http://localhost:5000`
- Health Check: `http://localhost:5000/api/health`

---

### 3. Setup & Start Frontend Storefront
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
- Storefront will run on: `http://localhost:3000`

---

## 🔑 Demo Accounts & Sample Coupons

### 🛡️ Pre-seeded Demo Accounts

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Administrator** | `admin@butterflycare.com` | `Admin@123456` | Full Admin Control Panel (`/admin`) |
| **Customer** | `dilani.p@gmail.com` | `Customer@123` | Storefront & Customer Dashboard (`/account`) |
| **Customer** | `kavindi.j@yahoo.com` | `Customer@123` | Storefront & Customer Dashboard (`/account`) |

### 🎟️ Sample Checkout Promo Codes

| Coupon Code | Discount | Conditions |
|---|---|---|
| `WELCOME10` | **10% OFF** | On orders above Rs. 3,000 |
| `MOMCARE500` | **Rs. 500 OFF** | On orders above Rs. 5,000 |
| `FREESHIP` | **Free Delivery** | Rs. 450 shipping fee waiver |

---

## 📡 API Endpoints Reference

### 🔐 Authentication (`/api/auth`)
- `POST /api/auth/register` — Register a new customer
- `POST /api/auth/login` — Sign in customer or administrator
- `GET /api/auth/me` — Get active session user
- `PUT /api/auth/profile` — Update name, phone, password, or address book

### 📦 Products (`/api/products`)
- `GET /api/products` — Filter products by category, price, age group, rating, sort, search
- `GET /api/products/slug/:slug` — Get single product by URL slug + related products + reviews
- `POST /api/products` — *(Admin)* Create product with variants & image URLs
- `PUT /api/products/:id` — *(Admin)* Update product details & stock
- `DELETE /api/products/:id` — *(Admin)* Delete product

### 🏷️ Categories (`/api/categories`)
- `GET /api/categories` — Get active categories with product item counts
- `POST /api/categories` — *(Admin)* Create category
- `PUT /api/categories/:id` — *(Admin)* Update category
- `DELETE /api/categories/:id` — *(Admin)* Delete category

### 🛒 Orders (`/api/orders`)
- `POST /api/orders` — Create order with Sri Lanka district delivery calculations
- `GET /api/orders/my-orders` — Get authenticated customer's order history
- `GET /api/orders/track/:orderNumber` — Public tracking lookup by order number
- `GET /api/orders/admin/all` — *(Admin)* Get all orders with filters
- `PUT /api/orders/:id/status` — *(Admin)* Update order status & add timeline note

### ⭐ Reviews & Coupons (`/api/reviews`, `/api/coupons`)
- `POST /api/reviews` — Submit product review
- `GET /api/reviews/admin/all` — *(Admin)* Moderate customer reviews
- `POST /api/coupons/validate` — Validate promo code during checkout
- `POST /api/coupons` — *(Admin)* Create new discount coupon

### ⚙️ Settings & Analytics (`/api/settings`, `/api/analytics`)
- `GET /api/settings` — Get public store settings, district fees & hotline
- `PUT /api/settings` — *(Admin)* Update store settings & delivery matrix
- `GET /api/analytics/dashboard` — *(Admin)* Overview KPIs & 6-month sales growth

---

## 🚢 Production Deployment

### Option A: Vercel (Frontend) + Render (Backend) *(Recommended)*
1. **Backend**: Deploy `backend/` on **Render** as a **Web Service** (`Node` runtime, Build: `npm install && npm run build`, Start: `npm run start`).
2. **Frontend**: Deploy `frontend/` on **Vercel** with environment variable:
   ```ini
   NEXT_PUBLIC_API_URL=https://your-backend-api.onrender.com/api
   ```

### Option B: Docker Compose (Self-Hosted VPS)
```bash
docker-compose up -d --build
```

---

## 📞 Contact & Official Hotline

- **Brand**: **BUTTERFLY CARE (Pvt) Ltd**
- **Tagline**: *"for every mom"*
- **WhatsApp Direct**: [`+94 74 022 5855`](https://wa.me/94740225855)
- **Hotline Phone**: `+94 74 022 5855`
- **Email**: `care@butterflycare.lk`
- **Boutique & HQ**: No. 42, Lotus Avenue, Colombo 07, Sri Lanka

---

<div align="center">

Made with care, love, and comfort for mothers and their little ones.  
**© 2026 BUTTERFLY CARE. All Rights Reserved.**

</div>
