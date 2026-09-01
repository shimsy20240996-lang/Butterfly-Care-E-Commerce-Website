import { create } from 'zustand';
import { StoreSettings } from '@/types';
import { api } from '@/lib/api';

interface SettingsState {
  settings: StoreSettings;
  isLoading: boolean;
  fetchSettings: () => Promise<void>;
  updateLocalSettings: (newSettings: Partial<StoreSettings>) => void;
}

const defaultSettings: StoreSettings = {
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
  districtDeliveryFees: [
    { district: 'Colombo', fee: 350 },
    { district: 'Gampaha', fee: 400 },
    { district: 'Kalutara', fee: 450 },
    { district: 'Kandy', fee: 500 },
    { district: 'Galle', fee: 500 },
    { district: 'Matara', fee: 550 },
    { district: 'Kurunegala', fee: 500 }
  ],
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

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: defaultSettings,
  isLoading: false,

  fetchSettings: async () => {
    try {
      set({ isLoading: true });
      const data = await api.get<{ success: boolean; settings: StoreSettings }>('/settings');
      if (data && data.settings) {
        set({ settings: data.settings });
      }
    } catch (error) {
      console.warn('[Settings] Using fallback default settings');
    } finally {
      set({ isLoading: false });
    }
  },

  updateLocalSettings: (newSettings) => {
    set((state) => ({
      settings: { ...state.settings, ...newSettings }
    }));
  }
}));
