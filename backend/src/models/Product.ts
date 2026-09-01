import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  discountPrice?: number;
  category: mongoose.Types.ObjectId | string;
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
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0, default: undefined },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
    categoryName: { type: String, default: '' },
    images: [{ type: String, required: true }],
    stock: { type: Number, required: true, min: 0, default: 10 },
    sku: { type: String, required: true, unique: true, uppercase: true, trim: true },
    brand: { type: String, default: 'Butterfly Care' },
    ageGroup: { type: String, default: 'All Ages' },
    sizes: [{ type: String }],
    colors: [{ type: String }],
    materials: { type: String, default: '100% Organic Cotton / Hypoallergenic' },
    careInstructions: { type: String, default: 'Hand wash or gentle machine wash in cold water' },
    rating: { type: Number, default: 5.0, min: 1, max: 5 },
    reviewCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    bestSeller: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: false },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// Full text search indexing
ProductSchema.index({ name: 'text', description: 'text', brand: 'text', sku: 'text' });

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
