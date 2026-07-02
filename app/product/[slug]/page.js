import { notFound } from 'next/navigation';
import { Clock, Wrench } from 'lucide-react';
import { PRODUCTS, getProductById, getRelatedProducts } from '@/lib/products';
import ProductViewer3D from '@/components/ProductViewer3D';
import CropMarks from '@/components/CropMarks';
import DifficultyBadge from '@/components/DifficultyBadge';
import AddToCartPanel from '@/components/AddToCartPanel';
import ProductCard from '@/components/ProductCard';
import { formatINR } from '@/lib/utils';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductById(slug);
  if (!product) return {};
  return {
    title: `${product.name} — P Santhosh Electronics`,
    description: product.tagline,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProductById(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="relative aspect-square rounded-md border border-line bg-paper-raised p-2 shadow-sm lg:sticky lg:top-24">
            <CropMarks color="var(--color-copper)" size={14} inset={-6} />
            <div className="h-full w-full overflow-hidden rounded-sm">
              <ProductViewer3D type={product.model} color={product.accent} />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-muted">
              {product.partNumber}
            </span>
            <DifficultyBadge level={product.level} />
          </div>

          <h1 className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-muted">
            {product.subtitle}
          </p>

          <p className="mt-5 text-[15px] leading-relaxed text-ink-muted">{product.description}</p>

          <div className="mt-6 flex items-center gap-6 border-y border-line py-4 font-mono text-xs uppercase tracking-wider text-ink-muted">
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {product.buildTime}
            </span>
            <span className="flex items-center gap-1.5">
              <Wrench size={14} /> {product.skills.length} skills covered
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-medium text-copper">
              {formatINR(product.price)}
            </span>
            <span className="text-xs text-ink-muted">inclusive of components</span>
          </div>

          <div className="mt-6">
            <AddToCartPanel productId={product.id} />
          </div>

          <div className="mt-10">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
              What&rsquo;s in the kit
            </h2>
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {product.kit.map((item, i) => (
                <li key={i} className="flex items-center gap-3 py-2.5 text-sm text-ink">
                  <span className="font-mono text-xs text-ink-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
              Skills you&rsquo;ll practice
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.skills.map((skill) => (
                <span key={skill} className="rounded-full border border-line px-3 py-1 text-xs text-ink-muted">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20 border-t border-line pt-10">
          <h2 className="font-display text-xl font-medium text-ink">More {product.level} kits</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
