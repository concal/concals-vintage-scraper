import { ProductCardGrid } from '../components/ProductCardGrid';
import { ProductFilters } from '../components/ProductFilters';
import { ProductPaginator } from '../components/ProductPagniator';
import { useFetchProducts } from '../hooks/useFetchProducts';

const debounce = (fn: Function, ms = 2000) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

interface StorefrontProps {}

export function Storefront({}: StorefrontProps) {
  // TODO: Parse initial filters from URL
  const { products, onUpdateProductFilters, productFilters } = useFetchProducts(
    {}
  );

  return (
    <div>
      <div className="my-5">
        <ProductFilters onUpdateFilters={onUpdateProductFilters} />
      </div>
      <ProductCardGrid products={products} />
      <div className="my-5">
        <ProductPaginator
          onUpdateProductFilters={onUpdateProductFilters}
          productFilters={productFilters}
        />
      </div>
    </div>
  );
}
