'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import { cx } from '@/lib/utils';

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'basic', label: 'Basic' },
  { key: 'intermediate', label: 'Intermediate' },
];

export default function ProductGrid({ products }) {
  const [tab, setTab] = useState('all');

  const filtered = tab === 'all' ? products : products.filter((p) => p.level === tab);

  return (
    <section id="catalog" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 scroll-mt-16">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-copper">
            Catalog
          </p>
          <h2 className="mt-1 font-display text-2xl font-medium text-ink">Project kits</h2>
        </div>

        <div className="flex gap-1 font-mono text-xs uppercase tracking-wider">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={cx(
                'rounded-md px-3 py-2 transition-colors',
                tab === t.key
                  ? 'bg-ink text-paper'
                  : 'text-ink-muted hover:text-ink'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-ink-muted">
          No kits in this category yet.
        </p>
      )}
    </section>
  );
}
