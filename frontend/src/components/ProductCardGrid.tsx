import { Product } from '../types';
import { StorefrontGridLayout } from './layout/StorefrontGridLayout';
import { ProductCard } from './ProductCard';
import { ProductLoadingCardGrid } from './ProductLoadingCardGrid';

interface ProductCardGridProps {
  onUpdateSavedProduct: Function;
  products: Product[];
  productsLoading?: boolean;
  savedProducts: string[];
}

export function ProductCardGrid({
  onUpdateSavedProduct,
  products,
  productsLoading,
  savedProducts,
}: ProductCardGridProps) {
  return (
    <div className="flex justify-center">
      <div className="w-auto md:w-112 lg:w-auto justify-items-center">
        <div className={productsLoading ? 'block' : 'hidden'}>
          <ProductLoadingCardGrid />
        </div>
        <StorefrontGridLayout
          className={productsLoading ? 'hidden' : 'block'}
          maxColumns={5}
        >
          {products.map((product) => (
            <ProductCard
              key={product.index}
              onUpdateSavedProduct={onUpdateSavedProduct}
              product={product}
              saved={savedProducts.includes(product.index)}
            />
          ))}
        </StorefrontGridLayout>
      </div>
    </div>
  );
}
