const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export function formatINR(amount) {
  return inrFormatter.format(amount);
}

// Small classnames combinator so we don't need an extra dependency.
export function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Converts a '#rrggbb' hex colour into an rgba() string at the given alpha,
// used for accent-tinted backgrounds behind per-product icons.
export function hexToRgba(hex, alpha = 1) {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
