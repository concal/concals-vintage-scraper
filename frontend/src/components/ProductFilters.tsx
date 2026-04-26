import { ReactNode } from 'react';
import { cn } from '@/generated/lib/utils';
import { ProductFilters as ProductFiltersType, SortField } from '../types';
import { PriceInput } from './input/PriceInput';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/generated/components/ui/select';

function FilterWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row items-center gap-2">
      {children}
    </div>
  );
}

function FilterLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('shrink-0 text-sm text-muted-foreground', className)}>{children}</span>;
}

interface ProductFiltersProps {
  onUpdateFilters: (updates: Partial<ProductFiltersType>) => void;
  productFilters: ProductFiltersType;
}

export function ProductFilters({
  onUpdateFilters,
  productFilters,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-3 w-full mx-auto max-w-[13.5rem] md:max-w-[28rem] lg:max-w-[42.5rem] xl:max-w-[57rem]">
      <div className="flex flex-col md:flex-row gap-3">
        <FilterWrapper>
          <FilterLabel>Sort:</FilterLabel>
          <Select
            onValueChange={(value) => onUpdateFilters({ sort: value as SortField })}
            value={productFilters.sort}
          >
            <SelectTrigger className="flex-1 md:flex-none md:w-38">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CREATED_AT:DESC">Newest</SelectItem>
              <SelectItem value="CREATED_AT:ASC">Oldest</SelectItem>
              <SelectItem value="PRICE:DESC">Price: high to low</SelectItem>
              <SelectItem value="PRICE:ASC">Price: low to high</SelectItem>
            </SelectContent>
          </Select>
        </FilterWrapper>
        <FilterWrapper>
          <FilterLabel>Availability:</FilterLabel>
          <Select
            onValueChange={(value) =>
              onUpdateFilters({ available: value === 'true' ? true : undefined })
            }
            value={productFilters.available ? 'true' : 'false'}
          >
            <SelectTrigger className="flex-1 md:flex-none md:w-38">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="false">All</SelectItem>
              <SelectItem value="true">In stock</SelectItem>
            </SelectContent>
          </Select>
        </FilterWrapper>
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <FilterWrapper>
          <FilterLabel className="min-w-[2rem]">Min:</FilterLabel>
          <PriceInput
            placeholder="0"
            onChange={(e) =>
              onUpdateFilters({
                price_min: e.target.value
                  ? parseFloat(e.target.value) * 100
                  : undefined,
              })
            }
            value={productFilters.price_min}
          />
        </FilterWrapper>
        <FilterWrapper>
          <FilterLabel className="min-w-[2rem]">Max:</FilterLabel>
          <PriceInput
            placeholder="9999"
            onChange={(e) =>
              onUpdateFilters({
                price_max: e.target.value
                  ? parseFloat(e.target.value) * 100
                  : undefined,
              })
            }
            value={productFilters.price_max}
          />
        </FilterWrapper>
      </div>
    </div>
  );
}
