'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Cart only stores { id, quantity } pairs — full product details are looked
// up from lib/products.js at render time so the catalog stays the single
// source of truth for names, prices, and specs.
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === productId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === productId ? { ...i, quantity: i.quantity + quantity } : i
              ),
            };
          }
          return { items: [...state.items, { id: productId, quantity }] };
        }),

      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== productId) })),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((i) => i.id !== productId) };
          }
          return {
            items: state.items.map((i) => (i.id === productId ? { ...i, quantity } : i)),
          };
        }),

      clearCart: () => set({ items: [] }),

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: 'santhosh-electronics-cart',
      skipHydration: true, // hydrated manually in a client effect to avoid SSR mismatch
    }
  )
);
