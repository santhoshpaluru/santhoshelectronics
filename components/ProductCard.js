import Link from 'next/link';
import { Bot, Sun, Radar, CloudSun, Fingerprint, CircuitBoard } from 'lucide-react';
import CropMarks from './CropMarks';
import DifficultyBadge from './DifficultyBadge';
import { formatINR, hexToRgba } from '@/lib/utils';

const ICONS = {
  'circuit-board': CircuitBoard,
  robot: Bot,
  'solar-panel': Sun,
  'handheld-detector': Radar,
  'weather-station': CloudSun,
  'security-lock': Fingerprint,
};

export default function ProductCard({ product }) {
  const Icon = ICONS[product.model] ?? CircuitBoard;

  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-md border border-line bg-paper-raised transition-all duration-150 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-md"
    >
      <CropMarks color="var(--color-ink)" size={10} inset={4} />

      <div
        className="flex h-40 items-center justify-center border-b border-line"
        style={{ backgroundColor: hexToRgba(product.accent, 0.08) }}
      >
        <span
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: hexToRgba(product.accent, 0.15) }}
        >
          <Icon size={28} strokeWidth={1.6} color={product.accent} />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
            {product.partNumber}
          </span>
          <DifficultyBadge level={product.level} />
        </div>

        <h3 className="font-display text-base font-medium leading-snug text-ink">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-ink-muted">
          {product.tagline}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-mono text-lg font-medium text-copper">
            {formatINR(product.price)}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted transition-colors group-hover:text-pcb-dark">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
