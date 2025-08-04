import { ProductFilters } from '../types';
import { productFiltersToJson } from '../utils/productFiltersToJson';

const URL_BASE = 'http://127.0.0.1:8000/products';
// const URL_BASE = 'https://reluctant-lura-concal-e5f49e86.koyeb.app/products';

export async function fetchProducts({
  filters,
  onSuccess,
}: {
  filters: ProductFilters;
  onSuccess: (data: any) => void;
}) {
  // TODO: Store url base in environment variables
  const response = await fetch(`${URL_BASE}/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: productFiltersToJson(filters),
  });
  const data = await response.json();
  onSuccess(data);
}

export async function saveProduct({ productIndex }: { productIndex: string }) {
  return await fetch(`${URL_BASE}/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productIndex }),
  });
}

export async function unsaveProduct({
  productIndex,
}: {
  productIndex: string;
}) {
  return await fetch(`${URL_BASE}/unsave`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productIndex }),
  });
}

export async function fetchSavedProducts() {
  const response = await fetch(`${URL_BASE}/saved-products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}
