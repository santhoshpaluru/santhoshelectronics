'use client';

import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({ value, onChange, min = 1, max = 10 }) {
  return (
    <div className="inline-flex items-center border border-ink/15 rounded-md">
      <button
        type="button"
        aria-label="Decrease quantity"
        className="p-2 text-ink/70 hover:text-ink disabled:opacity-30 disabled:pointer-events-none"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      >
        <Minus size={14} />
      </button>
      <span className="w-8 text-center font-mono text-sm tabular-nums">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        className="p-2 text-ink/70 hover:text-ink disabled:opacity-30 disabled:pointer-events-none"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
