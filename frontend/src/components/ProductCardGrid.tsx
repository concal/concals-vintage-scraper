import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCardGridProps {
  products: Product[];
}

export function ProductCardGrid({ products }: ProductCardGridProps) {
  return (
    <div className="flex justify-center">
      <div className="w-auto md:w-112 lg:w-auto justify-items-center">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
