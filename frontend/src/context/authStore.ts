import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,

      login: (token: string, user: User) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('butterfly_token', token);
        }
        set({
          token,
          user,
          isAuthenticated: true,
          isAdmin: user.role === 'admin',
        });
      },

      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('butterfly_token');
        }
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          isAdmin: false,
        });
      },

      updateUser: (user: User) => {
        set({
          user,
          isAdmin: user.role === 'admin',
        });
      },
    }),
    {
      name: 'butterfly_auth_storage',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated, isAdmin: state.isAdmin }),
    }
  )
);
