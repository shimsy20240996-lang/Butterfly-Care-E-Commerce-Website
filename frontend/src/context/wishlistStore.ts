import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  wishlistIds: string[];
  toggleWishlist: (productId: string) => boolean; // returns true if now in wishlist
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlistIds: [],

      toggleWishlist: (productId: string) => {
        const current = get().wishlistIds;
        const exists = current.includes(productId);
        if (exists) {
          set({ wishlistIds: current.filter((id) => id !== productId) });
          return false;
        } else {
          set({ wishlistIds: [...current, productId] });
          return true;
        }
      },

      isInWishlist: (productId: string) => {
        return get().wishlistIds.includes(productId);
      },

      clearWishlist: () => set({ wishlistIds: [] }),
    }),
    {
      name: 'butterfly_wishlist_storage',
    }
  )
);
