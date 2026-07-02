'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/lib/store';

// The cart store uses skipHydration so server and first client render match
// exactly. This component fires the real rehydration from localStorage
// immediately after mount, once, from the root layout.
export default function HydrateCart() {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return null;
}
