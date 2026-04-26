import { ReactNode } from 'react';
import { cn } from '@/generated/lib/utils';

interface StorefrontGridLayoutProps {
  children: ReactNode;
  className?: string;
}

export function StorefrontGridLayout({ children, className }: StorefrontGridLayoutProps) {
  return (
    <div className={cn('grid grid-cols-[repeat(1,13.5rem)] md:grid-cols-[repeat(2,13.5rem)] lg:grid-cols-[repeat(3,13.5rem)] xl:grid-cols-[repeat(4,13.5rem)] gap-4 justify-center', className)}>
      {children}
    </div>
  );
}
