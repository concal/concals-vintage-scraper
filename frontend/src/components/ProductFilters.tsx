import { ReactNode } from 'react';
import { ProductFilters as ProductFiltersType } from '../types';
import { PriceInput } from './input/PriceInput';
import { SelectInput } from './input/SelectInput';
import { StorefrontGridLayout } from './layout/StorefrontGridLayout';

function FilterWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="w-54 flex flex-row items-center overflow-hidden">
      {children}
    </div>
  );
}

function FilterLabel({ children }: { children: ReactNode }) {
  return <span className="me-2 shrink-0">{children}</span>;
}

interface ProductFiltersProps {
  onUpdateFilters: (updates: Partial<ProductFiltersType>) => void;
  productFilters: ProductFiltersType;
}

export function ProductFilters({
  onUpdateFilters,
  productFilters,
}: ProductFiltersProps) {
  const availabilityFilterSelect = (
    <FilterWrapper>
      <FilterLabel>Availability:</FilterLabel>
      <SelectInput
        onChange={(e) => {
          const value: boolean | undefined =
            e.target.value === 'true' ? true : undefined;
          if (onUpdateFilters) {
            onUpdateFilters({
              available: value,
            });
          }
        }}
        options={[
          {
            label: 'All',
            value: 'false',
          },
          {
            label: 'In stock',
            value: 'true',
          },
        ]}
        value={`${productFilters.available}`}
      />
    </FilterWrapper>
  );

  const sortSelect = (
    <FilterWrapper>
      <FilterLabel>Sort:</FilterLabel>
      <SelectInput
        onChange={(e) => {
          let value: any = e.target.value;
          if (onUpdateFilters) {
            onUpdateFilters({
              sort: value,
            });
          }
        }}
        options={[
          {
            label: 'Newest',
            value: 'PUBLISHED_AT:DESC',
          },
          {
            label: 'Oldest',
            value: 'PUBLISHED_AT:ASC',
          },
          {
            label: 'Price: high to low',
            value: 'PRICE:DESC',
          },
          {
            label: 'Price: low to high',
            value: 'PRICE:ASC',
          },
        ]}
        value={productFilters.sort}
      />
    </FilterWrapper>
  );

  const minPriceInput = (
    <FilterWrapper>
      <FilterLabel>Min Price:</FilterLabel>
      <PriceInput
        placeholder="10"
        onChange={(e) => {
          const value = e.target.value
            ? parseFloat(e.target.value) * 100
            : undefined;
          onUpdateFilters({
            price_min: value,
          });
        }}
        value={productFilters.price_min}
      />
    </FilterWrapper>
  );

  const maxPriceInput = (
    <FilterWrapper>
      <FilterLabel>Max Price:</FilterLabel>
      <PriceInput
        placeholder="100"
        onChange={(e) => {
          const value = e.target.value
            ? parseFloat(e.target.value) * 100
            : undefined;
          onUpdateFilters({
            price_max: value,
          });
        }}
        value={productFilters.price_max}
      />
    </FilterWrapper>
  );

  return (
    <div className="flex justify-center">
      <StorefrontGridLayout className="lg:!grid-cols-2">
        {sortSelect}
        {availabilityFilterSelect}
        {minPriceInput}
        {maxPriceInput}
      </StorefrontGridLayout>
    </div>
  );
}
