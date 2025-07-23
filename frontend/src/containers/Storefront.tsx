import { ProductCardGrid } from '../components/ProductCardGrid';
import { ProductFilters } from '../components/ProductFilters';
import { ProductPaginator } from '../components/ProductPaginator';
import { useFetchProducts } from '../hooks/useFetchProducts';

export function Storefront() {
  // TODO: Parse initial filters from URL
  const {
    loading,
    products,
    onUpdateProductFilters,
    productFilters,
    productCount,
  } = useFetchProducts({});

  return (
    <div className="px-[5vw] lg:px-[10vw]">
      <div className="flex flex-col gap-5 py-5">
        <ProductFilters
          onUpdateFilters={onUpdateProductFilters}
          productFilters={productFilters}
        />
        <ProductCardGrid products={products} productsLoading={loading} />
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
