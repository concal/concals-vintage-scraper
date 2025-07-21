import { ProductFilters as ProductFiltersType } from '../types';

interface ProductFiltersProps {
  onUpdateFilters: (updates: Partial<ProductFiltersType>) => void;
}

export function ProductFilters({ onUpdateFilters }: ProductFiltersProps) {
  return (
    <div className="flex justify-center flex-wrap gap-5">
      <span>
        <span className="me-2">Availability:</span>
        <select
          onChange={(e) => {
            const value: boolean | undefined =
              e.target.value === 'true' ? true : undefined;
            if (onUpdateFilters) {
              onUpdateFilters({
                available: value,
              });
            }
          }}
        >
          <option value="false">All</option>
          <option value="true">In stock</option>
        </select>
      </span>
      <span>
        <span className="me-2">Min Price:</span>
        <input
          className="w-20"
          type="number"
          placeholder="$10"
          onChange={(e) => {
            const value = e.target.value
              ? parseFloat(e.target.value) * 100
              : undefined;
            onUpdateFilters({
              price_min: value,
            });
          }}
        />
      </span>
      <span>
        <span className="me-2">Max Price:</span>
        <input
          className="w-20"
          type="number"
          placeholder="$100"
          onChange={(e) => {
            const value = e.target.value
              ? parseFloat(e.target.value) * 100
              : undefined;
            onUpdateFilters({
              price_max: value,
            });
          }}
        />
      </span>
      <span>
        <span className="me-2">Sort:</span>
        <select
          onChange={(e) => {
            let value: any = e.target.value;
            if (onUpdateFilters) {
              onUpdateFilters({
                sort: value,
              });
            }
          }}
        >
          <option value="PUBLISHED_AT:DESC">Newest</option>
          <option value="PUBLISHED_AT:ASC">Oldest</option>
          <option value="PRICE:DESC">Price: high to low</option>
          <option value="PRICE:ASC">Price: low to high</option>
        </select>
      </span>
    </div>
  );
}
