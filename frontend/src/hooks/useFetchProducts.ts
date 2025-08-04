import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Product, ProductFilters } from '../types';
import { fetchProducts } from '../api/products';
import { asyncDebounce } from '../utils/debounce';
import {
  getFiltersFromSearchParams,
  getSearchParamsFromFilters,
} from '../utils/filters';

const debouncedFetchProducts = asyncDebounce(fetchProducts);

interface ProductResponse {
  count: number;
  products: Product[];
}

export function useFetchProducts({
  productIndeces,
  showSaved,
}: {
  productIndeces?: string[];
  showSaved?: boolean;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [productCount, setProductCount] = useState(0);
  const [productFilters, setProductFilters] = useState<ProductFilters>(
    getFiltersFromSearchParams(searchParams)
  );
  const [hasChanges, setHasChanges] = useState(!showSaved);
  const [shouldDebounce, setShouldDebounce] = useState(false);
  const [loading, setLoading] = useState(true);
  const [indecesSet, setIndecesSet] = useState(false);

  useEffect(() => {
    if (!indecesSet && productIndeces && productIndeces?.length > 0) {
      setProductFilters({ ...productFilters, product_indeces: productIndeces });
      setIndecesSet(true);
      setHasChanges(true);
    }
  }, [productIndeces, productFilters]);

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
      setSearchParams(
        getSearchParamsFromFilters({ ...productFilters, ...formattedUpdates })
      );
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
