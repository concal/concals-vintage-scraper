import { useCallback, useEffect, useState } from 'react';

import { Product, ProductFilters } from '../types';
import { debounce } from '../utils/debounce';
import { fetchProducts } from '../api/products';
import { defaultProductFilters } from '../constants/filters';

const debouncedFetchProducts = debounce(fetchProducts);

interface UseFetchProductsProps {
  initialFilters?: ProductFilters;
}

export function useFetchProducts({ initialFilters }: UseFetchProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [productFilters, setProductFilters] = useState<ProductFilters>(
    initialFilters || defaultProductFilters
  );
  const [hasChanges, setHasChanges] = useState(true);
  const [shouldDebounce, setShouldDebounce] = useState(false);

  useEffect(() => {
    if (hasChanges) {
      if (shouldDebounce) {
        debouncedFetchProducts({
          filters: productFilters,
          onSuccess: (data: Product[]) => {
            setProducts(data);
          },
        });
        setShouldDebounce(false);
      } else {
        fetchProducts({
          filters: productFilters,
          onSuccess: (data: Product[]) => {
            setProducts(data);
          },
        });
      }
      setHasChanges(false);
    }
  }, [hasChanges, productFilters, shouldDebounce]);

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
    products,
    onUpdateProductFilters,
    productFilters,
  };
}
