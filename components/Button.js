import { cx } from '@/lib/utils';

const VARIANTS = {
  primary: 'bg-pcb text-paper hover:bg-pcb-dark active:bg-pcb-dark',
  copper: 'bg-copper text-paper hover:bg-[#a3661f] active:bg-[#a3661f]',
  outline: 'bg-transparent text-ink border border-ink/20 hover:border-ink/50',
  ghost: 'bg-transparent text-ink hover:bg-ink/5',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-base',
};

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-wide transition-colors duration-150 disabled:opacity-40 disabled:pointer-events-none',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
