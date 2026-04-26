import { useCallback, useEffect, useState } from 'react';
import { fetchSavedProducts } from '../api/products';

export function useSavedProductIds() {
  const [savedProducts, setSavedProducts] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchSavedProducts().then(ids => {
      setSavedProducts(new Set(ids));
      setIsLoaded(true);
    });
  }, []);

  // Functional updater means this callback never needs to close over savedProducts,
  // so it is referentially stable for the lifetime of the component.
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
