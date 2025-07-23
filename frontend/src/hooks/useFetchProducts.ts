import { useCallback, useEffect, useState } from 'react';

import { Product, ProductFilters } from '../types';
import { asyncDebounce } from '../utils/debounce';
import { fetchProducts } from '../api/products';
import { defaultProductFilters } from '../constants/filters';

const debouncedFetchProducts = asyncDebounce(fetchProducts);

interface UseFetchProductsProps {
  initialFilters?: ProductFilters;
}

interface ProductResponse {
  count: number;
  products: Product[];
}

export function useFetchProducts({ initialFilters }: UseFetchProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [productCount, setProductCount] = useState(0);
  const [productFilters, setProductFilters] = useState<ProductFilters>(
    initialFilters || defaultProductFilters
  );
  const [hasChanges, setHasChanges] = useState(true);
  const [shouldDebounce, setShouldDebounce] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hasChanges) {
      if (shouldDebounce) {
        setLoading(true);
        debouncedFetchProducts({
          filters: productFilters,
          onSuccess: (data: ProductResponse) => {
            setProducts(data.products);
            setProductCount(data.count);
          },
        }).then(() => {
          setLoading(false);
        });
        setShouldDebounce(false);
      } else {
        setLoading(true);
        fetchProducts({
          filters: productFilters,
          onSuccess: (data: ProductResponse) => {
            setProducts(data.products);
            setProductCount(data.count);
          },
        }).then(() => {
          setLoading(false);
        });
      }
      setHasChanges(false);
    }
  }, [hasChanges, productFilters, shouldDebounce, setLoading]);

  const onUpdateProductFilters = useCallback(
    (updates: Partial<ProductFilters>) => {
      const formattedUpdates = { ...updates };
      // Reset page to 1 if filters other than page are updated
      if (!('page' in formattedUpdates)) {
        formattedUpdates.page = 1;
      }
      // Debounce if updates came from keyboard input
      if ('price_min' in formattedUpdates || 'price_max' in formattedUpdates) {
        setShouldDebounce(true);
      }
      setProductFilters({ ...productFilters, ...formattedUpdates });
      setHasChanges(true);
    },
    [productFilters]
  );

  return {
    loading,
    products,
    onUpdateProductFilters,
    productCount,
    productFilters,
  };
}
