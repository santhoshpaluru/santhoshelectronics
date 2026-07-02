'use client';

import Link from 'next/link';
import { Cpu, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/store';

export default function Navbar() {
  const count = useCartStore((s) => s.itemCount());

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-pcb text-paper">
            <Cpu size={17} strokeWidth={2.2} />
          </span>
          <span className="leading-tight">
            <span className="block font-mono text-[13px] font-medium tracking-[0.08em] text-ink">
              P.SANTHOSH
            </span>
            <span className="block font-mono text-[10px] tracking-[0.2em] text-ink-muted">
              ELECTRONICS
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/#catalog"
            className="hidden rounded-md px-3 py-2 font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors hover:text-ink sm:block"
          >
            Projects
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-md px-3 py-2 font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors hover:text-ink"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 sm:static sm:-top-auto sm:-right-auto flex h-4 min-w-4 items-center justify-center rounded-full bg-copper px-1 font-mono text-[10px] text-paper">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
