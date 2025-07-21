import { useEffect, useState } from 'react';

import { Product, SearchFilters } from '../types';
import { fetchProducts } from '../api/products';
import { defaultSearchFilters } from '../constants/filters';
import { ProductCardGrid } from '../components/ProductCardGrid';

interface StorefrontProps {}

export function Storefront({}: StorefrontProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchFilters, setSearchFilters] =
    useState<SearchFilters>(defaultSearchFilters);

  useEffect(() => {
    fetchProducts({
      filters: searchFilters,
      onSuccess: (data: Product[]) => {
        setProducts(data);
      },
    });
  }, [searchFilters]);

  return (
    <div>
      Storefront
      <ProductCardGrid products={products} />
      <button
        onClick={() =>
          setSearchFilters({
            ...searchFilters,
            page: searchFilters.page + 1,
          })
        }
      >
        next page
      </button>
    </div>
  );
}
