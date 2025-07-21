import { SearchFilters } from '../types';

export const defaultSearchFilters: SearchFilters = {
  sort: 'PUBLISHED_AT',
  sort_direction: 'DESC',
  limit: 60,
  page: 1,
};
