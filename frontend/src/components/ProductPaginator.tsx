import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const page = productFilters.page;
  const numberCount = windowWidth < 640 ? 3 : 5;
  const numbersPerSide = Math.floor(numberCount / 2);
  const showArrows = windowWidth >= 1024;
  const currentPage = page || 1;
  const lastPage = Math.ceil(productCount / productFilters.limit);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleUpdateProductFilters = useCallback(
    (updates: Partial<ProductFilters>) => {
      window.scrollTo(0, 0);
      onUpdateProductFilters(updates);
    },
    [onUpdateProductFilters]
  );

  const PaginatorButton = useCallback(
    ({
      pageNumber,
      className,
      children,
    }: {
      children: ReactNode;
      className?: string;
      pageNumber: number;
    }) => (
      <button
        className={`cursor-pointer p-x-2 ${className}`}
        onClick={() =>
          handleUpdateProductFilters({
            page: pageNumber,
          })
        }
      >
        {children}
      </button>
    ),
    [handleUpdateProductFilters]
  );

  const renderedNumberButtons = useMemo(() => {
    let minPageRange = page > numbersPerSide ? page - numbersPerSide : 1;
    let maxPageRange =
      page < lastPage - numbersPerSide ? page + numbersPerSide : lastPage;

    const result = [];
    for (let i = minPageRange; i <= maxPageRange; i++) {
      result.push(
        <PaginatorButton
          className={page === i ? 'underline' : ''}
          key={i}
          pageNumber={i}
        >
          {i}
        </PaginatorButton>
      );
    }
    return result;
  }, [lastPage, numbersPerSide, productCount, productFilters]);

  if (productCount < productFilters.limit) {
    return null;
  }

  return (
    <div className="flex justify-center gap-10">
      {showArrows && page > numbersPerSide && (
        <PaginatorButton pageNumber={1}>{'<<<'}</PaginatorButton>
      )}
      {page !== 1 && (
        <PaginatorButton pageNumber={currentPage - 1}>Previous</PaginatorButton>
      )}
      {renderedNumberButtons}
      {page !== lastPage && (
        <PaginatorButton pageNumber={currentPage + 1}>Next</PaginatorButton>
      )}
      {showArrows && page < lastPage - numbersPerSide + 1 && (
        <PaginatorButton pageNumber={lastPage}>{'>>>'}</PaginatorButton>
      )}
    </div>
  );
}
