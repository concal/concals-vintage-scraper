import { useCallback } from 'react';
import { ProductFilters } from '../types';

interface ProductPaginatorProps {
  onUpdateProductFilters: (updates: Partial<ProductFilters>) => void;
  productFilters: ProductFilters;
}

export function ProductPaginator({
  onUpdateProductFilters,
  productFilters,
}: ProductPaginatorProps) {
  const currentPage = productFilters.page || 1;

  const handleUpdateProductFilters = useCallback(
    (updates: Partial<ProductFilters>) => {
      window.scrollTo(0, 0);
      onUpdateProductFilters(updates);
    },
    [onUpdateProductFilters]
  );

  return (
    <div className="flex justify-center gap-5">
      {currentPage > 1 && (
        <button
          onClick={() =>
            handleUpdateProductFilters({
              page: currentPage - 1,
            })
          }
        >
          Previous
        </button>
      )}
      <button
        onClick={() =>
          handleUpdateProductFilters({
            page: currentPage + 1,
          })
        }
      >
        Next
      </button>
    </div>
  );
}
