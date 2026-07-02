'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Truck } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { getProductById } from '@/lib/products';
import Button from '@/components/Button';
import { formatINR } from '@/lib/utils';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry',
  'Chandigarh', 'Andaman and Nicobar Islands', 'Dadra and Nagar Haveli and Daman and Diu',
  'Lakshadweep',
];

const initialForm = {
  name: '',
  phone: '',
  email: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  pincode: '',
  paymentMethod: 'cod',
};

const inputClass =
  'w-full rounded-md border border-ink/15 bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-signal';

function Field({ label, required, className = '', children }) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="mb-1.5 block text-xs text-ink-muted">
        {label}
        {required && <span className="text-alarm"> *</span>}
      </span>
      {children}
    </label>
  );
}

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  const lineItems = items
    .map((i) => ({ product: getProductById(i.id), quantity: i.quantity }))
    .filter((li) => li.product);
  const subtotal = lineItems.reduce((sum, li) => sum + li.product.price * li.quantity, 0);

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: form,
          items: lineItems.map((li) => ({
            id: li.product.id,
            name: li.product.name,
            quantity: li.quantity,
            price: li.product.price,
          })),
          subtotal,
        }),
      });
      if (!res.ok) throw new Error('Order submission failed');
      const data = await res.json();
      setOrder(data);
      clearCart();
    } catch (err) {
      setError("We couldn't place your order — please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  if (order) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center sm:px-6">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-pcb/10">
          <CheckCircle2 size={26} className="text-pcb" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-medium text-ink">Order placed</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Order <span className="font-mono text-ink">{order.orderId}</span> has been recorded.
          We&rsquo;ll call or message you on the number you provided to confirm{' '}
          {form.paymentMethod === 'cod' ? 'cash-on-delivery' : 'payment'} details and dispatch.
        </p>
        <Link href="/" className="mt-6">
          <Button variant="outline">Back to catalog</Button>
        </Link>
      </div>
    );
  }

  if (lineItems.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
        <p className="text-sm text-ink-muted">Your cart is empty.</p>
        <Link href="/#catalog" className="mt-4 inline-block">
          <Button>Browse projects</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-2xl font-medium text-ink sm:text-3xl">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <fieldset>
            <legend className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
              Contact &amp; shipping
            </legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" required>
                <input
                  required
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Phone number" required>
                <input
                  required
                  type="tel"
                  pattern="[0-9]{10}"
                  title="10-digit mobile number"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Email" required className="sm:col-span-2">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Address line 1" required className="sm:col-span-2">
                <input
                  required
                  value={form.address1}
                  onChange={(e) => updateField('address1', e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Address line 2" className="sm:col-span-2">
                <input
                  value={form.address2}
                  onChange={(e) => updateField('address2', e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="City" required>
                <input
                  required
                  value={form.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="PIN code" required>
                <input
                  required
                  pattern="[0-9]{6}"
                  title="6-digit PIN code"
                  value={form.pincode}
                  onChange={(e) => updateField('pincode', e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="State" required className="sm:col-span-2">
                <select
                  required
                  value={form.state}
                  onChange={(e) => updateField('state', e.target.value)}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select state
                  </option>
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
              Payment method
            </legend>
            <div className="mt-4 space-y-3">
              <label className="flex cursor-pointer items-start gap-3 rounded-md border border-line p-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={form.paymentMethod === 'cod'}
                  onChange={() => updateField('paymentMethod', 'cod')}
                  className="mt-1"
                />
                <span>
                  <span className="block text-sm font-medium text-ink">Cash on delivery</span>
                  <span className="block text-xs text-ink-muted">
                    Pay in cash when your kit arrives.
                  </span>
                </span>
              </label>
              <label className="flex cursor-not-allowed items-start gap-3 rounded-md border border-line p-4 opacity-50">
                <input type="radio" name="paymentMethod" value="online" disabled className="mt-1" />
                <span>
                  <span className="block text-sm font-medium text-ink">UPI / Card (coming soon)</span>
                  <span className="block text-xs text-ink-muted">
                    Online payment isn&rsquo;t enabled on this store yet.
                  </span>
                </span>
              </label>
            </div>
          </fieldset>

          {error && <p className="text-sm text-alarm">{error}</p>}
        </div>

        <div className="h-fit space-y-4 rounded-md border border-line bg-paper-raised p-6">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
            Order summary
          </h2>
          <ul className="space-y-2 border-b border-line pb-4">
            {lineItems.map((li) => (
              <li key={li.product.id} className="flex justify-between text-sm text-ink">
                <span className="truncate pr-2 text-ink-muted">
                  {li.product.name} × {li.quantity}
                </span>
                <span className="shrink-0 font-mono">{formatINR(li.product.price * li.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between text-base font-medium text-ink">
            <span>Total</span>
            <span className="font-mono text-copper">{formatINR(subtotal)}</span>
          </div>
          <p className="flex items-start gap-1.5 text-xs text-ink-muted">
            <Truck size={14} className="mt-0.5 shrink-0" />
            Ships from Andhra Pradesh, typically within 3–5 business days.
          </p>
          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? 'Placing order…' : 'Place order'}
            {!submitting && <ArrowRight size={16} />}
          </Button>
        </div>
      </form>
    </div>
  );
}
