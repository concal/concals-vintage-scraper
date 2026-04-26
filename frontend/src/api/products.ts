import { Product, ProductFilters } from '../types';
import { productFiltersToJson } from '../utils/productFiltersToJson';

const URL_BASE = 'https://reluctant-lura-concal-e5f49e86.koyeb.app/products';

interface ProductSearchResponse {
  products: Product[];
  count: number;
}

interface SaveProductProps {
  productIndex: string;
  token: string;
}

function authHeaders(token: string) {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
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

export function saveProduct({ productIndex, token }: SaveProductProps): Promise<Response> {
  return fetch(`${URL_BASE}/save`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ productIndex }),
  });
}

export function unsaveProduct({ productIndex, token }: SaveProductProps): Promise<Response> {
  return fetch(`${URL_BASE}/unsave`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ productIndex }),
  });
}

export async function fetchSavedProducts(token: string): Promise<string[]> {
  const response = await fetch(`${URL_BASE}/saved-products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) return [];
  return response.json();
}

export async function validateToken(token: string): Promise<boolean> {
  const response = await fetch(`${URL_BASE}/auth`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.ok;
}
