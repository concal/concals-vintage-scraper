import { StyleableComponentProps } from '../types';

interface MerchantTagProps extends StyleableComponentProps {
  name: string;
}

export function MerchantBadge({ className, name }: MerchantTagProps) {
  const classNames = `
    w-fit text-xs text-stone-800 bg-stone-100  px-2 py-1 rounded-full mr-2 ${className}
    `;

  return <span className={classNames}>{name}</span>;
}
