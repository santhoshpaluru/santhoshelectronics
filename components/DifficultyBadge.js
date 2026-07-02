import { cx } from '@/lib/utils';

const LEVELS = {
  basic: {
    label: 'Basic',
    dotColor: 'bg-pcb',
    textColor: 'text-pcb-dark',
    borderColor: 'border-pcb/30',
    bars: 1,
  },
  intermediate: {
    label: 'Intermediate',
    dotColor: 'bg-copper',
    textColor: 'text-copper',
    borderColor: 'border-copper/30',
    bars: 2,
  },
};

export default function DifficultyBadge({ level, className }) {
  const config = LEVELS[level] ?? LEVELS.basic;

  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider',
        config.borderColor,
        config.textColor,
        className
      )}
    >
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {[0, 1].map((i) => (
          <span
            key={i}
            className={cx(
              'h-2 w-1 rounded-[1px]',
              i < config.bars ? config.dotColor : 'bg-ink/15'
            )}
          />
        ))}
      </span>
      {config.label}
    </span>
  );
}
