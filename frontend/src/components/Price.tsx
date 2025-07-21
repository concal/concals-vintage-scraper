import { StyleableComponentProps } from '../types';

interface PriceProps extends StyleableComponentProps {
  price: number;
}

export function Price({ className, price }: PriceProps) {
  const priceDollars = (price / 100).toFixed(2);

  const classNames = `
  text-lg font-semibold text-gray-900
  ${className}
  `;

  return <span className={classNames}>${priceDollars}</span>;
}
