import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Product, ProductFilters } from '../types';
import { fetchProducts } from '../api/products';
import {
  getFiltersFromSearchParams,
  getSearchParamsFromFilters,
} from '../utils/filters';

const PRICE_DEBOUNCE_MS = 300;

interface UseFetchProductsProps {
  isSavedProductsLoaded: boolean;
  savedProducts: Set<string>;
  showSaved?: boolean;
}

export function useFetchProducts({
  isSavedProductsLoaded,
  savedProducts,
  showSaved,
}: UseFetchProductsProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [productFilters, setProductFilters] = useState<ProductFilters>(
    getFiltersFromSearchParams(searchParams)
  );

  // For price inputs: signal the fetch effect to debounce the next request.
  const shouldDebounceRef = useRef(false);

  // For the saved view: delay fetching until saved product IDs have been injected
  // into productFilters. On the standard storefront view this starts as true.
  const initializedRef = useRef(!showSaved);

  // ─── Main fetch effect ────────────────────────────────────────────────────
  // Declared first so it runs before the initialization effect on mount.
  // This ensures the saved-view guard (initializedRef = false) is respected on
  // the very first render before the initialization effect has had a chance to run.
  useEffect(() => {
    if (!initializedRef.current) return;

    const controller = new AbortController();
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const doFetch = () => {
      setLoading(true);
      fetchProducts({ filters: productFilters, signal: controller.signal })
        .then(({ products, count }) => {
          setProducts(products);
          setProductCount(count);
          setLoading(false);
        })
        .catch(err => {
          // AbortError is expected when a newer request supersedes this one.
          if (err.name !== 'AbortError') {
            setLoading(false);
          }
        });
    };

    if (shouldDebounceRef.current) {
      shouldDebounceRef.current = false;
      debounceTimer = setTimeout(doFetch, PRICE_DEBOUNCE_MS);
    } else {
      doFetch();
    }

    return () => {
      controller.abort();
      if (debounceTimer !== null) clearTimeout(debounceTimer);
    };
  }, [productFilters]);

  // ─── Saved-view initialization effect ────────────────────────────────────
  // Waits until the saved product IDs have loaded from the server, then injects
  // them into productFilters and unblocks the fetch effect.
  useEffect(() => {
    if (!showSaved || initializedRef.current || !isSavedProductsLoaded) return;

    initializedRef.current = true;

    if (savedProducts.size > 0) {
      // Updating productFilters triggers the fetch effect.
      setProductFilters(prev => ({ ...prev, products: [...savedProducts] }));
    } else {
      // Nothing to fetch; resolve the loading state immediately.
      setLoading(false);
    }
  }, [showSaved, isSavedProductsLoaded, savedProducts]);

  // ─── Filter update handler ────────────────────────────────────────────────
  // Functional updater removes productFilters from the closure, making this
  // callback referentially stable for the lifetime of the component.
  const onUpdateProductFilters = useCallback(
    (updates: Partial<ProductFilters>) => {
      if ('price_min' in updates || 'price_max' in updates) {
        shouldDebounceRef.current = true;
      }
      setProductFilters(prev => {
        const next: ProductFilters = {
          ...prev,
          ...updates,
          page: 'page' in updates ? (updates.page ?? 1) : 1,
        };
        setSearchParams(getSearchParamsFromFilters(next));
        return next;
      });
    },
    [setSearchParams]
  );

  return { loading, onUpdateProductFilters, productCount, productFilters, products };
}
