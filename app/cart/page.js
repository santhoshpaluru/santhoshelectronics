'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { getProductById } from '@/lib/products';
import CartItemRow from '@/components/CartItemRow';
import Button from '@/components/Button';
import { formatINR } from '@/lib/utils';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  const lineItems = items
    .map((i) => ({ product: getProductById(i.id), quantity: i.quantity }))
    .filter((li) => li.product);

  const subtotal = lineItems.reduce((sum, li) => sum + li.product.price * li.quantity, 0);

  if (lineItems.length === 0) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink/5">
          <ShoppingBag size={24} className="text-ink-muted" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-medium text-ink">Your cart is empty</h1>
        <p className="mt-2 max-w-sm text-sm text-ink-muted">
          Browse the catalog and add a kit to get started.
        </p>
        <Link href="/#catalog" className="mt-6">
          <Button>
            Browse projects <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-2xl font-medium text-ink sm:text-3xl">Your cart</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          {lineItems.map((li) => (
            <CartItemRow key={li.product.id} product={li.product} quantity={li.quantity} />
          ))}
          <button
            type="button"
            onClick={clearCart}
            className="mt-4 font-mono text-xs uppercase tracking-wider text-ink-muted hover:text-alarm"
          >
            Clear cart
          </button>
        </div>

        <div className="h-fit rounded-md border border-line bg-paper-raised p-6">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
            Order summary
          </h2>
          <div className="mt-4 flex items-center justify-between text-sm text-ink">
            <span>Subtotal</span>
            <span className="font-mono">{formatINR(subtotal)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm text-ink-muted">
            <span>Shipping</span>
            <span className="font-mono">Calculated at checkout</span>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-base font-medium text-ink">
            <span>Total</span>
            <span className="font-mono text-copper">{formatINR(subtotal)}</span>
          </div>

          <Link href="/checkout" className="mt-6 block">
            <Button size="lg" className="w-full">
              Proceed to checkout <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
