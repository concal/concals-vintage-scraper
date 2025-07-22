import { ReactNode } from 'react';

interface StorefrontGridLayoutProps {
  children: ReactNode;
  className?: string;
  maxColumns?: number;
}

export function StorefrontGridLayout({
  children,
  className = '',
  maxColumns = 4,
}: StorefrontGridLayoutProps) {
  return (
    <div
      className={`grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:!grid-cols-4 2xl:!grid-cols-${maxColumns} ${className}`}
    >
      {children}
    </div>
  );
}
