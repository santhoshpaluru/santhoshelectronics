'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { Bot, Sun, Radar, CloudSun, Fingerprint, CircuitBoard } from 'lucide-react';
import QuantitySelector from './QuantitySelector';
import { formatINR, hexToRgba } from '@/lib/utils';
import { useCartStore } from '@/lib/store';

const ICONS = {
  'circuit-board': CircuitBoard,
  robot: Bot,
  'solar-panel': Sun,
  'handheld-detector': Radar,
  'weather-station': CloudSun,
  'security-lock': Fingerprint,
};

export default function CartItemRow({ product, quantity }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const Icon = ICONS[product.model] ?? CircuitBoard;

  return (
    <div className="flex items-center gap-4 border-b border-line py-5">
      <Link
        href={`/product/${product.id}`}
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md"
        style={{ backgroundColor: hexToRgba(product.accent, 0.12) }}
      >
        <Icon size={24} strokeWidth={1.6} color={product.accent} />
      </Link>

      <div className="min-w-0 flex-1">
        <Link href={`/product/${product.id}`} className="block truncate font-medium text-ink hover:text-pcb-dark">
          {product.name}
        </Link>
        <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
          {product.partNumber}
        </span>
      </div>

      <QuantitySelector
        value={quantity}
        onChange={(q) => updateQuantity(product.id, q)}
      />

      <span className="w-24 shrink-0 text-right font-mono text-sm font-medium text-ink">
        {formatINR(product.price * quantity)}
      </span>

      <button
        type="button"
        aria-label={`Remove ${product.name} from cart`}
        onClick={() => removeItem(product.id)}
        className="shrink-0 p-2 text-ink-muted hover:text-alarm"
      >
        <X size={16} />
      </button>
    </div>
  );
}
