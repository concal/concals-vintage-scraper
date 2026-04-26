import { Product } from '../types';
import { StorefrontGridLayout } from './layout/StorefrontGridLayout';
import { ProductCard } from './ProductCard';
import { ProductLoadingCard } from './ProductLoadingCardGrid';

interface ProductCardGridProps {
  onUpdateSavedProduct: (index: string) => void;
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
    <StorefrontGridLayout>
      {productsLoading
        ? Array.from({ length: 12 }, (_, i) => <ProductLoadingCard key={i} />)
        : products.map((product) => (
            <ProductCard
              key={product.index}
              onUpdateSavedProduct={onUpdateSavedProduct}
              product={product}
              saved={savedProducts.includes(product.index)}
            />
          ))}
    </StorefrontGridLayout>
  );
}
