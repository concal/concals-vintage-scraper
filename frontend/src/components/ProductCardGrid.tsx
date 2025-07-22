import { Product } from '../types';
import { StorefrontGridLayout } from './layout/StorefrontGridLayout';
import { ProductCard } from './ProductCard';
import { ProductLoadingCardGrid } from './ProductLoadingCardGrid';

interface ProductCardGridProps {
  products: Product[];
  productsLoading?: boolean;
}

export function ProductCardGrid({
  products,
  productsLoading,
}: ProductCardGridProps) {
  return (
    <div className="flex justify-center">
      <div className="w-auto md:w-112 lg:w-auto justify-items-center">
        <div className={productsLoading ? 'block' : 'hidden'}>
          <ProductLoadingCardGrid />
        </div>
        <StorefrontGridLayout className={productsLoading ? 'hidden' : 'block'}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </StorefrontGridLayout>
      </div>
    </div>
  );
}
