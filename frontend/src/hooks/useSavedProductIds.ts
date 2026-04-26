import { useCallback, useEffect, useState } from 'react';
import { fetchSavedProducts } from '../api/products';

export function useSavedProductIds(token: string | null) {
  const [savedProducts, setSavedProducts] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!token) {
      setSavedProducts(new Set());
      setIsLoaded(true);
      return;
    }
    fetchSavedProducts(token).then(ids => {
      setSavedProducts(new Set(ids));
      setIsLoaded(true);
    });
  }, [token]);

  const onUpdateSavedProduct = useCallback((productIndex: string) => {
    setSavedProducts(prev => {
      const next = new Set(prev);
      if (next.has(productIndex)) {
        next.delete(productIndex);
      } else {
        next.add(productIndex);
      }
      return next;
    });
  }, []);

  return { isLoaded, onUpdateSavedProduct, savedProducts };
}
