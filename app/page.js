import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import { PRODUCTS } from '@/lib/products';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductGrid products={PRODUCTS} />
    </>
  );
}
