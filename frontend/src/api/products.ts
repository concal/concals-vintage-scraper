import { ProductFilters } from '../types';
import { productFiltersToJson } from '../utils/productFiltersToJson';

export async function fetchProducts({
  filters,
  onSuccess,
}: {
  filters: ProductFilters;
  onSuccess: (data: any) => void;
}) {
  // TODO: Store url base in environment variables
  const response = await fetch(
    // 'https://reluctant-lura-concal-e5f49e86.koyeb.app/products/search',
    'http://127.0.0.1:8000/products/search',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: productFiltersToJson(filters),
    }
  );
  const data = await response.json();
  onSuccess(data);
}
