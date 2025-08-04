import { useCallback, useEffect, useState } from 'react';
import { fetchSavedProducts } from '../api/products';

export function useSavedProductIds() {
  const [savedProducts, setSavedProducts] = useState<string[]>([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!fetched) {
      fetchSavedProducts().then((resp: any) => {
        setSavedProducts(resp);
        setFetched(true);
      });
    }
  }, [fetched, setFetched, setSavedProducts]);

  const onUpdateSavedProduct = useCallback(
    (productIndex: string) => {
      if (savedProducts.includes(productIndex)) {
        const newArr = savedProducts.filter(
          (product) => product !== productIndex
        );
        setSavedProducts(newArr);
      } else {
        const newArr = [...savedProducts];
        newArr.push(productIndex);
        setSavedProducts(newArr);
      }
    },
    [savedProducts]
  );

  return { onUpdateSavedProduct, savedProducts };
}
