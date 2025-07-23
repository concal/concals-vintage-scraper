import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { ProductFilters } from '../types';

interface ProductPaginatorProps {
  onUpdateProductFilters: (updates: Partial<ProductFilters>) => void;
  productCount: number;
  productFilters: ProductFilters;
}

const numberCount = 4;

export function ProductPaginator({
  onUpdateProductFilters,
  productCount,
  productFilters,
}: ProductPaginatorProps) {
  const currentPage = productFilters.page || 1;
  const lastPage = Math.ceil(productCount / productFilters.limit);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const numberCount = windowWidth < 640 ? 3 : 5;
  const numbersPerSide = Math.floor(numberCount / 2);
  const showArrows = windowWidth >= 1024;

  useEffect(() => {
    // Define the event handler function
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add the event listener when the component mounts
    window.addEventListener('resize', handleResize);

    // Clean up by removing the event listener when the component unmounts
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
    let minPageRange =
      productFilters.page > numbersPerSide
        ? productFilters.page - numbersPerSide
        : 1;
    let maxPageRange =
      productFilters.page < lastPage - numbersPerSide
        ? productFilters.page + numbersPerSide
        : lastPage;

    const result = [];
    for (let i = minPageRange; i <= maxPageRange; i++) {
      result.push(
        <PaginatorButton
          className={productFilters.page === i ? 'underline' : ''}
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
      {showArrows && productFilters.page > numbersPerSide + 1 && (
        <PaginatorButton className="cursor-pointer p-x-2" pageNumber={1}>
          {'<<<'}
        </PaginatorButton>
      )}
      {productFilters.page !== 1 && (
        <PaginatorButton pageNumber={currentPage - 1}>Previous</PaginatorButton>
      )}
      {renderedNumberButtons}
      {productFilters.page !== lastPage && (
        <PaginatorButton pageNumber={currentPage + 1}>Next</PaginatorButton>
      )}
      {showArrows && productFilters.page < lastPage - numbersPerSide && (
        <PaginatorButton className="cursor-pointer p-x-2" pageNumber={lastPage}>
          {'>>>'}
        </PaginatorButton>
      )}
    </div>
  );
}
