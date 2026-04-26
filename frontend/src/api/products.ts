import { Product, ProductFilters } from '../types';
import { productFiltersToJson } from '../utils/productFiltersToJson';

const URL_BASE = 'https://reluctant-lura-concal-e5f49e86.koyeb.app/products';

interface ProductSearchResponse {
  products: Product[];
  count: number;
}

interface SaveProductProps {
  productIndex: string;
}

export async function fetchProducts({
  filters,
  signal,
}: {
  filters: ProductFilters;
  signal?: AbortSignal;
}): Promise<ProductSearchResponse> {
  const response = await fetch(`${URL_BASE}/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: productFiltersToJson(filters),
    signal,
  });
  return response.json();
}

export function saveProduct({ productIndex }: SaveProductProps): Promise<Response> {
  return fetch(`${URL_BASE}/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productIndex }),
  });
}

export function unsaveProduct({ productIndex }: SaveProductProps): Promise<Response> {
  return fetch(`${URL_BASE}/unsave`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productIndex }),
  });
}

export async function fetchSavedProducts(): Promise<string[]> {
  const response = await fetch(`${URL_BASE}/saved-products`);
  return response.json();
}
