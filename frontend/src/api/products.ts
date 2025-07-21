import { SearchFilters } from '../types';

export async function fetchProducts({
  filters,
  onSuccess,
}: {
  filters: SearchFilters;
  onSuccess: (data: any) => void;
}) {
  // TODO: Deploy backend and update the URL
  const response = await fetch('http://localhost:8000/products/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters),
  });
  const data = await response.json();
  onSuccess(data);
}
