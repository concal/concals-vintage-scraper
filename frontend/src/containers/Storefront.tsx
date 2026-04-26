import { ProductCardGrid } from '../components/ProductCardGrid';
import { ProductFilters } from '../components/ProductFilters';
import { ProductPaginator } from '../components/ProductPaginator';
import { useFetchProducts } from '../hooks/useFetchProducts';

interface StorefrontProps {
  isSavedProductsLoaded: boolean;
  onUpdateSavedProduct: (index: string) => void;
  savedProducts: Set<string>;
  showSaved?: boolean;
}

export function Storefront({
  isSavedProductsLoaded,
  onUpdateSavedProduct,
  savedProducts,
  showSaved,
}: StorefrontProps) {
  const { loading, products, onUpdateProductFilters, productFilters, productCount } =
    useFetchProducts({ isSavedProductsLoaded, savedProducts: showSaved ? savedProducts : new Set(), showSaved });

  return (
    <div className="px-[5vw] lg:px-[10vw]">
      <div className="flex flex-col gap-5 py-5">
        <ProductFilters
          onUpdateFilters={onUpdateProductFilters}
          productFilters={productFilters}
        />
        <ProductCardGrid
          onUpdateSavedProduct={onUpdateSavedProduct}
          products={products}
          productsLoading={loading}
          savedProducts={savedProducts}
        />
        <div className="mt-10">
          <ProductPaginator
            onUpdateProductFilters={onUpdateProductFilters}
            productCount={productCount}
            productFilters={productFilters}
          />
        </div>
      </div>
    </div>
  );
}
