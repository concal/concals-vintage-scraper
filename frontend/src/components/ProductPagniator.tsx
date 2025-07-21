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

  return (
    <div className="flex justify-center gap-5">
      {currentPage > 1 && (
        <button
          onClick={() =>
            onUpdateProductFilters({
              page: currentPage - 1,
            })
          }
        >
          Previous
        </button>
      )}
      <button
        onClick={() =>
          onUpdateProductFilters({
            page: currentPage + 1,
          })
        }
      >
        Next
      </button>
    </div>
  );
}
