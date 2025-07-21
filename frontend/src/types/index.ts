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

export type SortField = 'PUBLISHED_AT' | 'PRICE';
export type SortDirection = 'ASC' | 'DESC';

export interface SearchFilters {
  sort: SortField;
  sort_direction: SortDirection;
  available?: boolean;
  limit: number;
  page: number;
}

export interface StyleableComponentProps {
  className?: string;
}
