import mongoose, { Document, Schema } from 'mongoose';

export interface IDistrictFee {
  district: string;
  fee: number;
}

export interface ISetting extends Document {
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
  districtDeliveryFees: IDistrictFee[];
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
  updatedAt: Date;
}

const SettingSchema = new Schema<ISetting>(
  {
    storeName: { type: String, default: 'BUTTERFLY' },
    tagline: { type: String, default: 'care for every mom' },
    announcementText: { 
      type: String, 
      default: 'Thoughtfully chosen for moms & little ones • Islandwide Delivery Available' 
    },
    whatsappNumber: { type: String, default: '+94 74 022 5855' },
    contactEmail: { type: String, default: 'care@butterflycare.lk' },
    contactPhone: { type: String, default: '+94 74 022 5855' },
    address: { type: String, default: 'No. 42, Lotus Avenue, Colombo 07, Sri Lanka' },
    currency: { type: String, default: 'LKR' },
    currencySymbol: { type: String, default: 'Rs.' },
    freeShippingThreshold: { type: Number, default: 7500 },
    defaultDeliveryFee: { type: Number, default: 450 },
    expressDeliveryFee: { type: Number, default: 850 },
    districtDeliveryFees: [
      {
        district: { type: String, required: true },
        fee: { type: Number, required: true }
      }
    ],
    bankDetails: {
      bankName: { type: String, default: 'Commercial Bank of Ceylon' },
      branch: { type: String, default: 'Colombo 07 Branch' },
      accountName: { type: String, default: 'Butterfly (Pvt) Ltd' },
      accountNumber: { type: String, default: '1000 4589 3210' },
      instructions: { 
        type: String, 
        default: 'Please deposit the order total to the account above and WhatsApp the receipt with your Order Number to +94 74 022 5855.' 
      }
    },
    socialLinks: {
      instagram: { type: String, default: 'https://instagram.com/butterflycare' },
      facebook: { type: String, default: 'https://facebook.com/butterflycare' },
      tiktok: { type: String, default: 'https://tiktok.com/@butterflycare' },
      whatsapp: { type: String, default: 'https://wa.me/94740225855' }
    },
    stats: {
      happyCustomers: { type: Number, default: 1250 },
      totalProducts: { type: Number, default: 500 },
      totalCategories: { type: Number, default: 25 },
      deliveryLocations: { type: String, default: 'Islandwide Delivery' }
    }
  },
  { timestamps: true }
);

export const Setting = mongoose.model<ISetting>('Setting', SettingSchema);
