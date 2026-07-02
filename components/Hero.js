import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductViewer3D from './ProductViewer3D';
import CropMarks from './CropMarks';
import { PRODUCTS } from '@/lib/products';

function SchematicTraces() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 600"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
    >
      <g fill="none" stroke="var(--color-ink)" strokeWidth="1.5">
        <path d="M0 80 H180 V200 H360" />
        <path d="M0 320 H120 V420 H300 V520" />
        <path d="M800 60 H620 V160 H480" />
        <path d="M800 260 H680 V180" />
        <path d="M800 480 H600 V380 H420" />
      </g>
      <g fill="var(--color-ink)">
        <circle cx="180" cy="80" r="4" />
        <circle cx="360" cy="200" r="4" />
        <circle cx="120" cy="320" r="4" />
        <circle cx="300" cy="520" r="4" />
        <circle cx="620" cy="60" r="4" />
        <circle cx="480" cy="160" r="4" />
        <circle cx="680" cy="260" r="4" />
        <circle cx="600" cy="480" r="4" />
        <circle cx="420" cy="380" r="4" />
      </g>
    </svg>
  );
}

export default function Hero() {
  const basicCount = PRODUCTS.filter((p) => p.level === 'basic').length;
  const intermediateCount = PRODUCTS.filter((p) => p.level === 'intermediate').length;

  return (
    <section className="relative overflow-hidden border-b border-line">
      <SchematicTraces />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-24">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-copper">
            Hands-on electronics · Basic → Intermediate
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-5xl">
            Build something
            <br />
            that actually works.
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-muted">
            Solder-ready kits designed and tested by P. Santhosh — from your first blinking
            LED to a Bluetooth-controlled robot. Every kit ships with a build sheet and
            exactly the parts you need.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#catalog"
              className="inline-flex items-center gap-2 rounded-md bg-pcb px-6 py-3.5 text-sm font-medium tracking-wide text-paper transition-colors hover:bg-pcb-dark"
            >
              Browse the catalog
              <ArrowRight size={16} />
            </Link>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
                Kits listed
              </dt>
              <dd className="mt-1 font-display text-2xl text-ink">{PRODUCTS.length}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
                Basic
              </dt>
              <dd className="mt-1 font-display text-2xl text-ink">{basicCount}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
                Intermediate
              </dt>
              <dd className="mt-1 font-display text-2xl text-ink">{intermediateCount}</dd>
            </div>
          </dl>
        </div>

        <div>
          <div className="relative aspect-[4/3.4] rounded-md border border-line bg-paper-raised p-2 shadow-sm">
            <CropMarks color="var(--color-copper)" size={14} inset={-6} />
            <div className="h-full w-full overflow-hidden rounded-sm">
              <ProductViewer3D type="robot" color="#1b5e3a" />
            </div>
          </div>
          <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
            Fig. 01 — Line Follower Robot, live 3D preview
          </p>
        </div>
      </div>
    </section>
  );
}
