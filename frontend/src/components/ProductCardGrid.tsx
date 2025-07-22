import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ProductCardLoadingGrid } from './ProductCardGridLoading';

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
          <ProductCardLoadingGrid />
        </div>
        <div
          className={`grid gap-4 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            ${productsLoading ? 'hidden' : 'block'}`}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
