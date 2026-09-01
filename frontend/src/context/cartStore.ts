import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  appliedCoupon: {
    code: string;
    discount: number;
    discountType?: string;
  } | null;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, selectedSize?: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => void;
  clearCart: () => void;
  applyCoupon: (coupon: { code: string; discount: number; discountType?: string }) => void;
  removeCoupon: () => void;
  getSubtotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      appliedCoupon: null,

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      addItem: (newItem) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) =>
              i.product === newItem.product &&
              (i.selectedSize || '') === (newItem.selectedSize || '') &&
              (i.selectedColor || '') === (newItem.selectedColor || '')
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            const currentItem = updated[existingIndex];
            const newQty = Math.min(currentItem.quantity + newItem.quantity, newItem.maxStock || 99);
            updated[existingIndex] = { ...currentItem, quantity: newQty };
            return { items: updated, isDrawerOpen: true };
          }

          return { items: [...state.items, newItem], isDrawerOpen: true };
        });
      },

      removeItem: (productId, selectedSize = '', selectedColor = '') => {
        set((state) => ({
          items: state.items.filter(
            (i) =>
              !(
                i.product === productId &&
                (i.selectedSize || '') === selectedSize &&
                (i.selectedColor || '') === selectedColor
              )
          ),
        }));
      },

      updateQuantity: (productId, quantity, selectedSize = '', selectedColor = '') => {
        if (quantity <= 0) {
          get().removeItem(productId, selectedSize, selectedColor);
          return;
        }

        set((state) => ({
          items: state.items.map((item) => {
            if (
              item.product === productId &&
              (item.selectedSize || '') === selectedSize &&
              (item.selectedColor || '') === selectedColor
            ) {
              return { ...item, quantity: Math.min(quantity, item.maxStock || 99) };
            }
            return item;
          }),
        }));
      },

      clearCart: () => set({ items: [], appliedCoupon: null }),

      applyCoupon: (coupon) => set({ appliedCoupon: coupon }),
      removeCoupon: () => set({ appliedCoupon: null }),

      getSubtotal: () => {
        return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },

      getItemCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: 'butterfly_cart_storage',
      partialize: (state) => ({ items: state.items, appliedCoupon: state.appliedCoupon }),
    }
  )
);
