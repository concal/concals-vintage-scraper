import { defaultProductFilters } from '../constants/filters';
import { ProductFilters } from '../types';

const FILTER_KEYS = ['page', 'available', 'price_max', 'price_min', 'sort'];

export function getFiltersFromSearchParams(searchParams: URLSearchParams) {
  const filters = structuredClone(defaultProductFilters);
  FILTER_KEYS.forEach((filterKey) => {
    if (searchParams.get(filterKey)) {
      if (filterKey === 'price_max' || filterKey === 'price_min') {
        filters[filterKey] = parseInt(searchParams.get(filterKey)!, 10) * 100;
      } else if (filterKey === 'page') {
        filters[filterKey] = parseInt(searchParams.get(filterKey)!, 10);
      } else if (filterKey === 'available') {
        filters[filterKey] = searchParams.get(filterKey) === 'true';
      } else {
        filters[filterKey] = searchParams.get(filterKey);
      }
    }
  });
  return filters;
}

export function getSearchParamsFromFilters(filters: ProductFilters) {
  const searchParams: { [index: string]: any } = {};
  FILTER_KEYS.forEach((filterKey) => {
    if (filters[filterKey]) {
      if (filterKey === 'price_max' || filterKey === 'price_min') {
        searchParams[filterKey] = `${filters[filterKey] / 100}`;
      } else {
        searchParams[filterKey] = `${filters[filterKey]}`;
      }
    }
  });
  return searchParams;
}
