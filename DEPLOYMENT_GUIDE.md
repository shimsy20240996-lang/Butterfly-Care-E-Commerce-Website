# 🚀 Deployment Guide: BUTTERFLY CARE E-Commerce Platform

This guide covers step-by-step production deployment for **BUTTERFLY CARE** (*"for every mom"*).

---

## 🏗️ Architecture Overview
The platform consists of two decoupled services:
1. **Frontend**: Next.js 14 App Router, React 18, Tailwind CSS, TypeScript.
2. **Backend**: Node.js, Express, TypeScript, Mongoose/MongoDB, JWT Auth.

---

## 🌟 Method 1: Vercel (Frontend) + Render / Railway (Backend) *(Recommended)*

### Step 1: Push Code to GitHub
1. Initialize git and commit:
```bash
git init
git add .
git commit -m "feat: complete Butterfly Care production release"
```
2. Create a new repository on GitHub (e.g. `butterfly-care-ecommerce`) and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/butterfly-care-ecommerce.git
git branch -M main
git push -u origin main
```

---

### Step 2: Deploy the Backend (on Render or Railway)

#### Using Render (Free & Fast)
1. Go to [dashboard.render.com](https://dashboard.render.com) and click **New + Web Service**.
2. Connect your GitHub repository: `butterfly-care-ecommerce`.
3. Configure the service settings:
   - **Name**: `butterfly-care-api`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
4. Add the **Environment Variables**:
   ```ini
   PORT=5000
   NODE_ENV=production
   CLIENT_URL=https://your-frontend-domain.vercel.app
   JWT_SECRET=your_super_secret_jwt_key_2026_butterfly
   MONGODB_URI=your_mongodb_atlas_connection_string
   ```
   *(Note: If `MONGODB_URI` is omitted, the API automatically uses the persistent in-memory database with all 8 categories and 27 seed products).*
5. Click **Deploy Web Service**. Render will assign a public URL (e.g. `https://butterfly-care-api.onrender.com`).

---

### Step 3: Deploy the Frontend (on Vercel)
1. Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repository.
2. Under **Root Directory**, click edit and select `frontend`.
3. Under **Environment Variables**, add:
   ```ini
   NEXT_PUBLIC_API_URL=https://butterfly-care-api.onrender.com/api
   ```
4. Click **Deploy**. Vercel will build and assign your production domain (e.g. `https://butterfly-care.vercel.app`).
5. Update your backend `CLIENT_URL` in Render to match your Vercel domain.

---

## 🐳 Method 2: Unified Docker Compose (VPS / AWS / DigitalOcean)

If deploying to a single Linux or Windows VPS:

1. Clone repository to your server:
```bash
git clone https://github.com/YOUR_USERNAME/butterfly-care-ecommerce.git
cd butterfly-care-ecommerce
```

2. Start the full-stack multi-container app:
```bash
docker-compose up -d --build
```

3. The services will automatically be active:
   - **Frontend**: `http://YOUR_SERVER_IP:3000`
   - **Backend API**: `http://YOUR_SERVER_IP:5000`

---

## 🔑 Production Environment Variables Reference

### Backend (`backend/.env`)
| Variable | Description | Example |
|---|---|---|
| `PORT` | API Server Port | `5000` |
| `NODE_ENV` | Runtime Environment | `production` |
| `CLIENT_URL` | Allowed CORS Frontend URL | `https://butterfly-care.vercel.app` |
| `JWT_SECRET` | Secret key for customer/admin JWTs | `a_secure_random_hash_key` |
| `MONGODB_URI` | MongoDB Atlas Connection String | `mongodb+srv://...` |

### Frontend (`frontend/.env.production` or Vercel Config)
| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Public backend API endpoint | `https://butterfly-care-api.onrender.com/api` |

---

## 🛠️ Verification Checklist After Deployment
1. Open the live storefront and verify the Hero Carousel and Category Grids load properly.
2. Test the **Search Modal** (`⌘K`) and filter products on `/shop`.
3. Add an item to cart and proceed through `/checkout` using Cash on Delivery.
4. Verify `/order-success` receipt and `/track-order` live tracking.
5. Log into `/admin` with `admin@butterflycare.com` / `Admin@123456` to access the Control Panel.
