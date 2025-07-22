import { ReactNode } from 'react';

interface StorefrontGridLayoutProps {
  children: ReactNode;
  className?: string;
}

export function StorefrontGridLayout({
  children,
  className = '',
}: StorefrontGridLayoutProps) {
  return (
    <div
      className={`grid gap-4 grid-cols-2 lg:grid-cols-3 xl:!grid-cols-4 ${className}`}
    >
      {children}
    </div>
  );
}
