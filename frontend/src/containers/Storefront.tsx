import { ProductCardGrid } from '../components/ProductCardGrid';
import { ProductFilters } from '../components/ProductFilters';
import { ProductPaginator } from '../components/ProductPagniator';
import { useFetchProducts } from '../hooks/useFetchProducts';

export function Storefront() {
  // TODO: Parse initial filters from URL
  const { loading, products, onUpdateProductFilters, productFilters } =
    useFetchProducts({});

  return (
    <div className="px-[5vw] lg:px-[15vw]">
      <div className="flex flex-col gap-5 py-5">
        <ProductFilters onUpdateFilters={onUpdateProductFilters} />
        <ProductCardGrid products={products} productsLoading={loading} />
        <ProductPaginator
          onUpdateProductFilters={onUpdateProductFilters}
          productFilters={productFilters}
        />
      </div>
    </div>
  );
}
