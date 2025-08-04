export interface StyleableComponentProps {
  className?: string;
}

export interface Product {
  index: string;
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
  | 'CREATED_AT:ASC'
  | 'CREATED_AT:DESC'
  | 'PRICE:ASC'
  | 'PRICE:DESC';

export interface ProductFilters {
  [index: string]: any;
  sort: SortField;
  available?: boolean;
  price_min?: number;
  price_max?: number;
  product_indeces?: string[];
  limit: number;
  page: number;
}
