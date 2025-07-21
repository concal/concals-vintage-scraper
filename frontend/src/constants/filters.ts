import { FilterSelectData, ProductFilters } from '../types';

export const defaultProductFilters: ProductFilters = {
  sort: 'PUBLISHED_AT:DESC',
  limit: 60,
  page: 1,
};

export const FILTER_SELECTS: FilterSelectData[] = [
  {
    key: 'available',
    label: 'Availability',
    options: [
      { label: 'All', value: 'false' },
      { label: 'In Stock', value: 'true' },
    ],
  },
  {
    key: 'sort',
    label: 'Sort',
    options: [
      { label: 'Newest', value: 'PUBLISHED_AT:DESC' },
      { label: 'Oldest', value: 'PUBLISHED_AT:ASC' },
      { label: 'Price: high to low', value: 'PRICE:DESC' },
      { label: 'Price: low to high', value: 'PRICE:ASC' },
    ],
  },
];
