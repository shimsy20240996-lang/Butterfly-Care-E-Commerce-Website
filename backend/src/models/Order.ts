import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem {
  product: mongoose.Types.ObjectId | string;
  name: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  sku?: string;
}

export interface IOrderTimeline {
  status: string;
  timestamp: Date;
  note?: string;
}

export interface IOrder extends Document {
  orderNumber: string;
  user?: mongoose.Types.ObjectId | string;
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
  items: IOrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: 'cash_on_delivery' | 'bank_transfer' | 'online_gateway';
  paymentStatus: 'pending' | 'paid' | 'failed';
  deliveryType: 'standard' | 'express';
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  timeline: IOrderTimeline[];
  notes?: string;
  whatsappOpened?: boolean;
  whatsappMessage?: string;
  whatsappUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  selectedSize: { type: String, default: '' },
  selectedColor: { type: String, default: '' },
  sku: { type: String, default: '' }
});

const TimelineSchema = new Schema<IOrderTimeline>({
  status: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  note: { type: String, default: '' }
});

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    customerDetails: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true }
    },
    deliveryAddress: {
      addressLine: { type: String, required: true },
      city: { type: String, required: true },
      district: { type: String, required: true },
      postalCode: { type: String, default: '' }
    },
    items: [OrderItemSchema],
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true, default: 0 },
    discount: { type: Number, default: 0 },
    couponCode: { type: String, default: '' },
    total: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ['cash_on_delivery', 'bank_transfer', 'online_gateway'],
      default: 'cash_on_delivery'
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending'
    },
    deliveryType: {
      type: String,
      enum: ['standard', 'express'],
      default: 'standard'
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },
    timeline: [TimelineSchema],
    notes: { type: String, default: '' },
    whatsappOpened: { type: Boolean, default: false },
    whatsappMessage: { type: String, default: '' },
    whatsappUrl: { type: String, default: '' }
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
