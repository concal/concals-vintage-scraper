import { Product } from '../types';
import { MerchantBadge } from './MerchantBadge';
import { Price } from './Price';
import { SoldBadge } from './SoldBadge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <a
      className="max-w-54"
      href={product.product_url}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex flex-col relative">
        <div
          className={`flex flex-col ${
            product.available ? 'hover:underline' : 'line-through'
          }`}
        >
          <div className="h-72">
            <img
              className={`max-h-72 max-w-54 object-contain rounded-xl ${
                !product.available ? 'opacity-50' : ''
              }`}
              src={product.thumbnail_url}
              alt={product.name}
            />
          </div>
          <span>{product.name}</span>
          <Price className="me-2" price={product.price} />
        </div>
        <MerchantBadge className="no-underline" name={product.source} />
        {!product.available && <SoldBadge />}
      </div>
    </a>
  );
}
