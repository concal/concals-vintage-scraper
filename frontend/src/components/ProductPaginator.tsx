import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { ProductFilters } from '../types';
import { Button } from '@/generated/components/ui/button';
import { cn } from '@/generated/lib/utils';

interface PaginatorButtonProps {
  children: ReactNode;
  className?: string;
  onGoToPage: (page: number) => void;
  pageNumber: number;
}

function PaginatorButton({ children, className, onGoToPage, pageNumber }: PaginatorButtonProps) {
  return (
    <Button
      variant="ghost"
      className={className}
      onClick={() => onGoToPage(pageNumber)}
    >
      {children}
    </Button>
  );
}

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
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToPage = useCallback(
    (page: number) => {
      window.scrollTo(0, 0);
      onUpdateProductFilters({ page });
    },
    [onUpdateProductFilters]
  );

  const renderedNumberButtons = useMemo(() => {
    const minPageRange = page > numbersPerSide ? page - numbersPerSide : 1;
    const maxPageRange =
      page < lastPage - numbersPerSide ? page + numbersPerSide : lastPage;

    const result = [];
    for (let i = minPageRange; i <= maxPageRange; i++) {
      result.push(
        <PaginatorButton
          className={cn(page === i && 'font-semibold underline underline-offset-4')}
          key={i}
          onGoToPage={goToPage}
          pageNumber={i}
        >
          {i}
        </PaginatorButton>
      );
    }
    return result;
  }, [page, numbersPerSide, lastPage, goToPage]);

  if (productCount < productFilters.limit) {
    return null;
  }

  return (
    <div className="flex justify-center gap-2">
      {showArrows && page > numbersPerSide && (
        <PaginatorButton onGoToPage={goToPage} pageNumber={1}>
          <ChevronsLeft className="size-4" />
        </PaginatorButton>
      )}
      {page !== 1 && (
        <PaginatorButton onGoToPage={goToPage} pageNumber={currentPage - 1}>
          Previous
        </PaginatorButton>
      )}
      {renderedNumberButtons}
      {page !== lastPage && (
        <PaginatorButton onGoToPage={goToPage} pageNumber={currentPage + 1}>
          Next
        </PaginatorButton>
      )}
      {showArrows && page < lastPage - numbersPerSide + 1 && (
        <PaginatorButton onGoToPage={goToPage} pageNumber={lastPage}>
          <ChevronsRight className="size-4" />
        </PaginatorButton>
      )}
    </div>
  );
}
