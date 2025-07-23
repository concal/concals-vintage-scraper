import { defaultProductFilters } from '../constants/filters';
import { ProductFilters } from '../types';

const FILTER_KEYS = ['page', 'available', 'price_max', 'price_min', 'sort'];

export function getFiltersFromSearchParams(searchParams: URLSearchParams) {
  const filters = structuredClone(defaultProductFilters);
  FILTER_KEYS.forEach((filterKey) => {
    if (searchParams.get(filterKey)) {
      filters[filterKey] = searchParams.get(filterKey);
    }
  });
  return filters;
}

export function getSearchParamsFromFilters(filters: ProductFilters) {
  const searchParams: { [index: string]: any } = {};
  FILTER_KEYS.forEach((filterKey) => {
    if (filters[filterKey]) {
      searchParams[filterKey] = filters[filterKey];
    }
  });
  return searchParams;
}
