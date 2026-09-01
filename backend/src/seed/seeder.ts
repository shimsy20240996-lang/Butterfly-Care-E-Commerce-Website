import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db';
import { User } from '../models/User';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { Order } from '../models/Order';
import { Review } from '../models/Review';
import { Coupon } from '../models/Coupon';
import { Setting } from '../models/Setting';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_REVIEWS,
  INITIAL_COUPONS,
  INITIAL_USERS,
  SRI_LANKAN_DISTRICTS
} from './seedData';
import slugify from 'slugify';

dotenv.config();

const seedDatabase = async () => {
  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      console.log('Skipping standalone MongoDB seed (MongoDB not reachable). In-memory seed is active.');
      process.exit(0);
    }

    console.log('🧹 Clearing existing collections...');
    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Product.deleteMany({}),
      Order.deleteMany({}),
      Review.deleteMany({}),
      Coupon.deleteMany({}),
      Setting.deleteMany({})
    ]);

    console.log('🌸 Seeding Categories...');
    const createdCategories = await Category.insertMany(
      INITIAL_CATEGORIES.map(c => ({
        ...c,
        slug: slugify(c.name, { lower: true, strict: true })
      }))
    );

    console.log('🌸 Seeding Products...');
    const productsToInsert = INITIAL_PRODUCTS.map(p => {
      const cat = createdCategories.find(c => c.slug === p.categorySlug) || createdCategories[0];
      return {
        ...p,
        category: cat._id,
        categoryName: cat.name
      };
    });
    const createdProducts = await Product.insertMany(productsToInsert);

    console.log('🌸 Seeding Users...');
    for (const u of INITIAL_USERS) {
      const hashedPassword = await bcrypt.hash(u.password, 10);
      await User.create({
        ...u,
        password: hashedPassword
      });
    }

    console.log('🌸 Seeding Coupons...');
    await Coupon.insertMany(INITIAL_COUPONS);

    console.log('🌸 Seeding Settings...');
    await Setting.create({
      storeName: 'BUTTERFLY CARE',
      tagline: 'for every mom',
      districtDeliveryFees: SRI_LANKAN_DISTRICTS
    });

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
