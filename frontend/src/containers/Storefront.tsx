import { ProductCardGrid } from '../components/ProductCardGrid';
import { ProductFilters } from '../components/ProductFilters';
import { ProductPaginator } from '../components/ProductPagniator';
import { useFetchProducts } from '../hooks/useFetchProducts';

export function Storefront() {
  // TODO: Parse initial filters from URL
  const { products, onUpdateProductFilters, productFilters } = useFetchProducts(
    {}
  );

  return (
    <div className="flex flex-col gap-5 py-5">
      <ProductFilters onUpdateFilters={onUpdateProductFilters} />
      <ProductCardGrid products={products} />
      <ProductPaginator
        onUpdateProductFilters={onUpdateProductFilters}
        productFilters={productFilters}
      />
    </div>
  );
}
