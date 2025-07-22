import { ProductFilters } from '../types';
import { productFiltersToJson } from '../utils/productFiltersToJson';

export async function fetchProducts({
  filters,
  onSuccess,
}: {
  filters: ProductFilters;
  onSuccess: (data: any) => void;
}) {
  // TODO: Deploy backend and update the URL
  const response = await fetch('http://0.0.0.0:8000/products/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: productFiltersToJson(filters),
  });
  const data = await response.json();
  onSuccess(data);
}
