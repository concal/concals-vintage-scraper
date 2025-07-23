import { useCallback, useMemo } from 'react';
import { ProductFilters } from '../types';

interface ProductPaginatorProps {
  onUpdateProductFilters: (updates: Partial<ProductFilters>) => void;
  productCount: number;
  productFilters: ProductFilters;
}

export function ProductPaginator({
  onUpdateProductFilters,
  productCount,
  productFilters,
}: ProductPaginatorProps) {
  const currentPage = productFilters.page || 1;
  const hasNextPage = productCount > productFilters.page * productFilters.limit;
  const maxPages = Math.ceil(productCount / productFilters.limit);

  const handleUpdateProductFilters = useCallback(
    (updates: Partial<ProductFilters>) => {
      window.scrollTo(0, 0);
      onUpdateProductFilters(updates);
    },
    [onUpdateProductFilters]
  );

  const renderedNumberButtons = useMemo(() => {
    let minPageRange;
    let maxPageRange;

    if (productFilters.page === 1) {
      minPageRange = 1;
      maxPageRange = maxPages > 3 ? 3 : maxPages;
    } else if (productFilters.page === maxPages) {
      minPageRange = productFilters.page > 2 ? productFilters.page - 3 : 1;
      maxPageRange = maxPages;
    } else {
      minPageRange = productFilters.page - 1;
      maxPageRange = productFilters.page + 1;
    }

    const result = [];
    for (let i = minPageRange; i <= maxPageRange; i++) {
      result.push(
        <button
          className={productFilters.page === i ? 'underline' : ''}
          key={i}
        >
          {i}
        </button>
      );
    }
    return result;
  }, [maxPages, productCount, productFilters]);

  if (productCount < productFilters.limit) {
    return null;
  }

  return (
    <div className="flex justify-center gap-10">
      <button>{'<<<'}</button>
      <button
        className="cursor-pointer"
        disabled={currentPage === 1}
        onClick={() =>
          handleUpdateProductFilters({
            page: currentPage - 1,
          })
        }
      >
        Previous
      </button>
      {renderedNumberButtons}
      <button
        className="cursor-pointer"
        disabled={!hasNextPage}
        onClick={() =>
          handleUpdateProductFilters({
            page: currentPage + 1,
          })
        }
      >
        Next
      </button>
      <button>{'>>>'}</button>
    </div>
  );
}
