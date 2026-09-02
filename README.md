<div align="center">

# 🦋 BUTTERFLY CARE — *for every mom*
### Beautiful, Simple & Intuitive Baby & Mother Care E-Commerce Platform

[![Live Demo](https://img.shields.io/badge/Live_Storefront-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://butterfly-care-e-commerce-website.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.19-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-+94_74_022_5855-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/94740225855)

<br />

> **"Everything you need for you and your little one."**  
> A simple, clean, and fast e-commerce platform designed for mothers and families across Sri Lanka.

---

</div>

## 📖 Table of Contents
- [✨ Core Highlights](#-core-highlights)
- [🎨 Brand Identity & Soft Blue-Pink Palette](#-brand-identity--soft-blue-pink-palette)
- [🛍️ Real Product Catalog (16 Items)](#️-real-product-catalog-16-items)
- [🏛️ System & Data Architecture](#️-system--data-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Directory Structure](#-project-directory-structure)
- [🚀 Local Development Quickstart](#-local-development-quickstart)
- [🔑 Demo Accounts & Promo Codes](#-demo-accounts--promo-codes)
- [📡 API Endpoints Reference](#-api-endpoints-reference)
- [🚢 Deployment Guide (Vercel & Render)](#-deployment-guide-vercel--render)
- [📞 Contact & Official Hotline](#-contact--official-hotline)

---

## ✨ Core Highlights

### 🛒 Fast, 5-Second Frictionless Shopping Experience
- **Minimal 4-Link Navigation**: `HOME` • `PRODUCTS` • `ORDERS` • `ABOUT` + `ACCOUNT` & `🛒 CART`.
- **6 Essential Category Cards**:
  - 💙 **BABY BOY** — Classic polo shirts, formal suspender sets, striped pajamas, and jogger pants.
  - 🩷 **BABY GIRL** — Heirloom smocked dresses, floral frocks, sun dress duos, and shimmer party wear.
  - 🤍 **MOM CARE** — Bamboo nursing loungewear, belly elasticity oils, and maternal self-care.
  - 🍼 **FEEDING** — Anti-colic borosilicate glass bottles, BPA-free accessories, and nursing aids.
  - 🛁 **BATH & CARE** — 4-piece hypoallergenic baby wash, lotion, oil, and diaper rash cream kits.
  - 🧸 **TOYS & GIFTS** — Newborn luxury gift hampers with hooded blankets, washcloths, and swaddles.
- **1-Click `[ ADD TO CART ]`**: Instantly increments header cart badge and displays `"Added to cart ✓"` toast notification without navigating away from the catalog.
- **Clean Slide-Out Cart Drawer**: Quantity steppers (`− 1 +`), item removal, live LKR subtotal, and direct **`CHECKOUT`** CTA.
- **1-Page Streamlined Checkout (`/checkout`)**:
  - Requires only essential fields: *Full Name, Phone Number, Delivery Address, City, District*.
  - Payment Options: **Cash on Delivery (COD)** & **Direct Bank Transfer** (Commercial Bank details).
- **Dedicated Orders Page (`/orders`)**: Accessible from the top navigation bar with clean order cards, product counts, totals in LKR, and status badges (`✓ Confirmed`, `In Transit`, `Delivered`).
- **100% Reliable Client-Side Fallback**: Built-in client data layer (`fallbackProducts.ts`) ensuring all 16 products load instantly on Vercel even if backend servers are cold-starting.

---

## 🎨 Brand Identity & Soft Blue-Pink Palette

Designed specifically for mother and infant care to inspire warmth, serenity, comfort, and gentle luxury:

| Token | Hex Code | Purpose |
|---|---|---|
| **Baby Boy Blue** | `#8EC5E8` | Primary accent for baby boy collections & badges |
| **Light Boy Blue** | `#E5F4FC` | Soft container backgrounds & active filter pills |
| **Dark Slate Blue** | `#4F7FA0` | Primary action buttons & contrast text |
| **Baby Girl Pink** | `#E8A6B8` | Primary accent for baby girl collections |
| **Light Girl Pink** | `#FCE8EE` | Soft feminine highlight cards & notification badges |
| **Dark Rose Pink** | `#B86F84` | Girl category text & accent borders |
| **Main Background** | `#FFFDFB` | Ultra-clean, warm porcelain background |
| **Pure White** | `#FFFFFF` | Product cards & elevated modal surfaces |
| **Primary Charcoal** | `#454545` | Headings, brand title, and high-readability body |
| **Subtext Grey** | `#7A7A7A` | Product descriptions, metadata & subtle labels |
| **Border Tone** | `#EFEAE6` | Delicate divider lines & card borders |

---

## 🛍️ Real Product Catalog (16 Items)

The store features 16 curated products with authentic photos, Sri Lankan Rupee pricing, and gender tags:

| # | Image | Product Name | Category | Tag / Gender | Price (LKR) |
|---|---|---|---|---|---|
| 1 | `img1.webp` | **Sweet Blossom Newborn Baby Hamper Gift Set** | Toys & Gifts | 🩷 Baby Girl | **Rs. 5,450** *(was 4,890)* |
| 2 | `img2.jpg` | **Gentle Baby Daily Skincare & Bath Care Kit (4-Piece Set)** | Bath & Care | 🤍 Unisex | **Rs. 4,800** *(was 4,250)* |
| 3 | `img3.webp` | **Pastel Blossom Floral Baby Girl Cotton Frock** | Clothing | 🩷 Baby Girl | **Rs. 2,650** *(was 2,290)* |
| 4 | `img4.webp` | **Hand-Smocked Vintage White Baby Dress with Bonnet** | Clothing | 🩷 Baby Girl | **Rs. 3,450** *(was 2,990)* |
| 5 | `img5.webp` | **Organic Cotton Short-Sleeve Bodysuit Multipack (5-Pack)** | Clothing | 🤍 Unisex | **Rs. 3,850** *(was 3,400)* |
| 6 | `img6.jpg` | **Baby Boy Seaside Striped Resort Pajama Set** | Clothing | 💙 Baby Boy | **Rs. 2,850** *(was 2,490)* |
| 7 | `img7.webp` | **Botanical Meadow Green Smocked Peter-Pan Frock** | Clothing | 🩷 Baby Girl | **Rs. 3,250** *(was 2,790)* |
| 8 | `img8.webp` | **Terracotta Muslin Little Driver Play Set** | Clothing | 💙 Baby Boy | **Rs. 2,950** *(was 2,490)* |
| 9 | `img9.webp` | **Cozy Cotton Cargo Jogger Pants (2-Pack Duo)** | Clothing | 💙 Baby Boy | **Rs. 2,750** *(was 2,350)* |
| 10 | `img10.jpg` | **Baby Boy Dinosaur Embroidered Classic Blue Polo** | Clothing | 💙 Baby Boy | **Rs. 2,350** *(was 1,990)* |
| 11 | `img11.jpg` | **Gentleman Baby Boy Suspender & Bowtie Formal Set** | Clothing | 💙 Baby Boy | **Rs. 3,650** *(was 3,190)* |
| 12 | `img12.jpg` | **Sky Blue Gingham Checkered Toddler Shirt** | Clothing | 💙 Baby Boy | **Rs. 2,250** *(was 1,890)* |
| 13 | `img13.jpg` | **Mint Blossom Smocked Floral Heirloom Baby Dress** | Clothing | 🩷 Baby Girl | **Rs. 3,550** *(was 3,100)* |
| 14 | `img14.webp` | **Pastel Smocked Cotton Sun Dress Duo with Bow Sandals** | Clothing | 🩷 Baby Girl | **Rs. 4,150** *(was 3,650)* |
| 15 | `img15.jpg` | **Shimmer Rose Gold Pleated Baby Girl Party Dress** | Clothing | 🩷 Baby Girl | **Rs. 3,850** *(was 3,350)* |
| 16 | `img16.avif` | **Comfort Bamboo Nursing & Maternal Care Loungewear** | Mom Care | 👩 Mom Care | **Rs. 4,950** *(was 4,250)* |

---

## 🏛️ System & Data Architecture

```
                                    ┌───────────────────────────────────┐
                                    │      Client Browser / Mobile      │
                                    └─────────────────┬─────────────────┘
                                                      │
                                           HTTPS / JSON / LocalStorage
                                                      │
                      ┌───────────────────────────────┴───────────────────────────────┐
                      ▼                                                               ▼
    ┌───────────────────────────────────┐                           ┌───────────────────────────────────┐
    │       Next.js 14 Storefront       │                           │         Express Node.js API       │
    │   (App Router + Tailwind CSS)     │                           │    (JWT Auth + REST Endpoints)    │
    └─────────────────┬─────────────────┘                           └─────────────────┬─────────────────┘
                      │                                                               │
      ┌───────────────┴───────────────┐                               ┌───────────────┴───────────────┐
      ▼                               ▼                               ▼                               ▼
┌───────────┐                   ┌───────────┐                   ┌───────────┐                   ┌───────────┐
│  Vercel   │                   │ Client    │                   │  MongoDB  │                   │ In-Memory │
│  Edge CDN │                   │ Fallback  │                   │   Atlas   │                   │ Dual Store│
└───────────┘                   └───────────┘                   └───────────┘                   └───────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & Client Boundaries)
- **Language**: TypeScript 5.4
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with tailored Blue + Pink color tokens
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with LocalStorage synchronization
- **Icons**: [Lucide React](https://lucide.dev/)
- **Image Optimization**: `next/image` with responsive blur & aspect ratios

### Backend
- **Runtime & Server**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/) (with automatic in-memory fallback store)
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) & [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Utilities**: [Slugify](https://github.com/simov/slugify), [Cors](https://github.com/expressjs/cors), [Dotenv](https://github.com/motdotla/dotenv)

---

## 📁 Project Directory Structure

```
Butterfly-Care-E-Commerce-Website/
├── backend/
│   ├── src/
│   │   ├── config/          # Database connection & dual-mode in-memory store
│   │   ├── controllers/     # Auth, Products, Orders, Categories, Analytics, Settings
│   │   ├── middleware/      # JWT auth guard, role checks, error handlers
│   │   ├── models/          # User, Product, Category, Order, Review, Coupon, Setting
│   │   ├── routes/          # Express REST API routes
│   │   ├── seed/            # Seed data & 16 user product definitions
│   │   ├── utils/           # Token generation and utilities
│   │   └── server.ts        # Express entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── public/              # Brand assets & 16 user product images
│   │   ├── products/        # img1.webp through img16.avif
│   │   ├── logo.jpeg        # Brand emblem (Butterfly + Mother & Baby)
│   │   └── Logo.jpeg
│   ├── src/
│   │   ├── app/             # Next.js 14 App Router
│   │   │   ├── account/     # Simple user profile & order history
│   │   │   ├── admin/       # Full admin dashboard & management
│   │   │   ├── auth/        # Login & Register with welcome modal
│   │   │   ├── cart/        # Dedicated cart view
│   │   │   ├── checkout/    # Fast 1-page checkout
│   │   │   ├── contact/     # Contact & boutique support
│   │   │   ├── order-success/# 🦋 Thank You confirmation screen
│   │   │   ├── orders/      # Dedicated simple orders list
│   │   │   ├── our-story/   # Brand journey & values
│   │   │   ├── product/     # Dynamic product detail [slug]
│   │   │   └── products/    # 4/3/2 column product catalog with filters
│   │   ├── components/      # UI, Header, Footer, Logo, ProductCard, CartDrawer
│   │   ├── context/         # Zustand stores (cart, auth, toast, wishlist)
│   │   ├── data/            # fallbackProducts.ts (100% resilient client store)
│   │   ├── lib/             # API client, LKR currency formatter, WhatsApp utilities
│   │   └── types/           # TypeScript data contracts
│   ├── next.config.mjs      # Image domains & /api proxy rewrites
│   ├── package.json
│   └── tailwind.config.ts   # Soft blue/pink design tokens
│
├── Logo.jpeg                # Original high-res brand logo asset
├── DEPLOYMENT_GUIDE.md      # Step-by-step production deployment manual
└── README.md
```

---

## 🚀 Local Development Quickstart

### Prerequisites
- **Node.js** v18 or higher
- **npm** (or yarn / pnpm)

### 1. Clone the Repository
```bash
git clone https://github.com/shimsy20240996-lang/Butterfly-Care-E-Commerce-Website.git
cd Butterfly-Care-E-Commerce-Website
```

### 2. Run Backend API Server
```bash
cd backend
npm install
npm run dev
```
- API Server: `http://localhost:5000`
- Health Check: `http://localhost:5000/api/health`

### 3. Run Frontend Storefront
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```
- Storefront URL: `http://localhost:3000`

---

## 🔑 Demo Accounts & Promo Codes

### 🛡️ Pre-seeded Demo Logins

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Administrator** | `admin@butterflycare.com` | `Admin@123456` | Full Admin Control Panel (`/admin`) |
| **Customer** | `dilani.p@gmail.com` | `Customer@123` | Customer Dashboard (`/account`) |
| **Customer** | `kavindi.j@yahoo.com` | `Customer@123` | Customer Dashboard (`/account`) |

### 🎟️ Sample Checkout Promo Codes

| Coupon Code | Discount | Conditions |
|---|---|---|
| `WELCOME10` | **10% OFF** | Orders above Rs. 3,000 |
| `MOMCARE500` | **Rs. 500 OFF** | Orders above Rs. 5,000 |
| `FREESHIP` | **Free Delivery** | Shipping fee waiver |

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/products` | Get products with search, category, gender & pagination |
| `GET` | `/api/products/slug/:slug` | Get single product details by URL slug |
| `POST` | `/api/auth/login` | Authenticate customer or administrator |
| `POST` | `/api/auth/register` | Create customer account |
| `GET` | `/api/categories` | Get active collections and counts |
| `POST` | `/api/orders` | Place new order with Sri Lanka district delivery calculation |
| `GET` | `/api/orders/my-orders` | Get order history for authenticated user |
| `GET` | `/api/settings` | Get store settings, district delivery fees & WhatsApp hotline |

---

## 🚢 Deployment Guide (Vercel & Render)

### 1. Frontend on Vercel
1. Import repository on [vercel.com](https://vercel.com/new).
2. Set **Root Directory** to `frontend`.
3. Build command: `next build`.
4. The frontend automatically serves all 16 products with fallback data and proxies `/api` to the backend.

### 2. Backend on Render
1. Create a **New Web Service** on [render.com](https://render.com).
2. Set **Root Directory** to `backend`.
3. Set **Build Command** to `npm install && npm run build`.
4. Set **Start Command** to `npm run start`.
5. Set environment variable: `PORT=5000`.

---

## 📞 Contact & Official Hotline

- **Brand**: **BUTTERFLY CARE (Pvt) Ltd**
- **Tagline**: *"for every mom"*
- **WhatsApp Support**: [`+94 74 022 5855`](https://wa.me/94740225855)
- **Hotline Direct**: `+94 74 022 5855`
- **Email**: `care@butterflycare.lk`
- **Boutique & HQ**: No. 42, Lotus Avenue, Colombo 07, Sri Lanka

---

<div align="center">

Made with care, love, and comfort for mothers and their little ones.  
**© 2026 BUTTERFLY CARE. All Rights Reserved.**

</div>
