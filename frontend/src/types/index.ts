export interface Product {
  _id: string;
  available: boolean;
  name: string;
  price: number;
  product_url: string;
  published_at: string;
  sizes: string[];
  source: string;
  thumbnail_url: string;
}

export type SortField =
  | 'PUBLISHED_AT:ASC'
  | 'PUBLISHED_AT:DESC'
  | 'PRICE:ASC'
  | 'PRICE:DESC';

export interface ProductFilters {
  sort: SortField;
  available?: boolean;
  price_min?: number;
  price_max?: number;
  limit: number;
  page: number;
}

export interface FilterSelectData {
  key: string;
  label: string;
  options: { label: string; value: string }[];
}

export interface StyleableComponentProps {
  className?: string;
}
