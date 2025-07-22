import { ReactNode } from 'react';
import { StorefrontGridLayout } from './layout/StorefrontGridLayout';

export function ProductLoadingCard() {
  return (
    <div className="flex flex-col relative">
      <div className="flex flex-col gap-4">
        <div className="max-h-72 max-w-54 h-72 w-54 object-contain rounded-xl bg-stone-400 opacity-20 animate-pulse" />
        <span className="max-w-52 w-52 bg-stone-400 opacity-20 h-4 ms-1 animate-pulse" />
        <span className="max-w-52 w-52 bg-stone-400 opacity-20 h-4 ms-1 animate-pulse" />
        <span className="max-w-52 w-52 bg-stone-400 opacity-20 h-4  ms-1 animate-pulse" />
      </div>
    </div>
  );
}

export function ProductLoadingCardGrid() {
  let cards: ReactNode[] = [];
  for (let i = 0; i < 12; i++) {
    cards.push(<ProductLoadingCard />);
  }

  return (
    <div className="flex justify-center">
      <div className="w-auto md:w-112 lg:w-auto justify-items-center">
        <StorefrontGridLayout>{cards.map((card) => card)}</StorefrontGridLayout>
      </div>
    </div>
  );
}
