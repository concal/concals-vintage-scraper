import { ProductFilters } from '../types';

export function productFiltersToJson(filters: ProductFilters) {
  const formattedFilters: any = { ...filters };
  if (formattedFilters.sort) {
    const [field, direction] = formattedFilters.sort.split(':');
    formattedFilters.sort = field;
    formattedFilters.sort_direction = direction;
  }
  return JSON.stringify(formattedFilters);
}
