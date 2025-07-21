import { StyleableComponentProps } from '../types';

interface PriceProps extends StyleableComponentProps {
  price: number;
}

export function Price({ className, price }: PriceProps) {
  const priceDollars = price / 100;

  const classNames = `
  text-lg font-semibold text-gray-900
  ${className}
  `;

  return <span className={classNames}>${priceDollars.toFixed(2)}</span>;
}
