import { useCallback, useEffect, useMemo, useState } from 'react';

import { Product, ProductFilters } from '../types';
import { asyncDebounce, debounce } from '../utils/debounce';
import { fetchProducts } from '../api/products';
import { defaultProductFilters } from '../constants/filters';
import { useSearchParams } from 'react-router-dom';
import {
  getFiltersFromSearchParams,
  getSearchParamsFromFilters,
} from '../utils/filters';

const debouncedFetchProducts = asyncDebounce(fetchProducts);

interface ProductResponse {
  count: number;
  products: Product[];
}

export function useFetchProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [productCount, setProductCount] = useState(0);
  const [productFilters, setProductFilters] = useState<ProductFilters>(
    getFiltersFromSearchParams(searchParams)
  );
  const [hasChanges, setHasChanges] = useState(true);
  const [shouldDebounce, setShouldDebounce] = useState(false);
  const [loading, setLoading] = useState(true);

  // const productFilters = getFiltersFromSearchParams(searchParams);
  // console.log(productFilters);

  const debouncedSetProductFilters = useMemo(
    () =>
      debounce((filters: ProductFilters) => {
        setProductFilters(filters);
        console.log('resolve');
      }),
    [setProductFilters]
  );

  const debouncedSetSearchParams = useMemo(
    () =>
      debounce((params: any) => {
        setSearchParams(params);
        console.log('resolve');
      }),
    [setSearchParams]
  );

  useEffect(() => {
    if (hasChanges) {
      // if (shouldDebounce) {
      //   setLoading(true);
      //   debouncedFetchProducts({
      //     filters: productFilters,
      //     onSuccess: (data: ProductResponse) => {
      //       setProducts(data.products);
      //       setProductCount(data.count);
      //     },
      //   }).then(() => {
      //     setLoading(false);
      //   });
      //   setShouldDebounce(false);
      // } else {
      //   setLoading(true);
      //   fetchProducts({
      //     filters: productFilters,
      //     onSuccess: (data: ProductResponse) => {
      //       setProducts(data.products);
      //       setProductCount(data.count);
      //     },
      //   }).then(() => {
      //     setLoading(false);
      //   });
      // }
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
      setHasChanges(false);
    }
  }, [hasChanges, productFilters, shouldDebounce, setLoading]);

  useEffect(() => {
    debouncedSetProductFilters(getFiltersFromSearchParams(searchParams));
    setHasChanges(true);
  }, [searchParams, setHasChanges, setProductFilters]);

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
      // setProductFilters({ ...productFilters, ...formattedUpdates });
      debouncedSetSearchParams(
        getSearchParamsFromFilters({ ...productFilters, ...formattedUpdates })
      );
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
