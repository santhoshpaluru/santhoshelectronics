'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, ShoppingCart } from 'lucide-react';
import QuantitySelector from './QuantitySelector';
import Button from './Button';
import { useCartStore } from '@/lib/store';

export default function AddToCartPanel({ productId }) {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  function handleAdd() {
    addItem(productId, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <QuantitySelector value={quantity} onChange={setQuantity} />
      <Button onClick={handleAdd} size="lg" className="flex-1 sm:flex-none">
        {justAdded ? (
          <>
            <Check size={16} /> Added to cart
          </>
        ) : (
          <>
            <ShoppingCart size={16} /> Add to cart
          </>
        )}
      </Button>
      {justAdded && (
        <Link
          href="/cart"
          className="font-mono text-xs uppercase tracking-wider text-signal underline underline-offset-2 hover:text-pcb-dark"
        >
          View cart →
        </Link>
      )}
    </div>
  );
}
