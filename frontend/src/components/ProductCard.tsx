import { useState } from 'react';

import { saveProduct, unsaveProduct } from '../api/products';
import { Product } from '../types';
import { MerchantBadge } from './MerchantBadge';
import { Price } from './Price';
import { SaveButton } from './SaveButton';

interface ProductCardProps {
  onUpdateSavedProduct: Function;
  product: Product;
  saved?: boolean;
}

export function ProductCard({
  onUpdateSavedProduct,
  product,
  saved,
}: ProductCardProps) {
  const [currentSaved, setCurrentSaved] = useState(saved);

  return (
    <a
      className="max-w-54"
      href={product.product_url}
      rel="noreferrer"
      target="_blank"
    >
      <div className="flex flex-col relative">
        <div
          className={`flex flex-col ${
            product.available ? 'hover:underline' : 'line-through'
          }`}
        >
          <div className="h-72 flex">
            <img
              alt={product.name}
              className={`max-h-72 max-w-54 object-contain rounded-xl ${
                !product.available ? '!opacity-50' : ''
              } fade-in-image`}
              src={product.thumbnail_url}
            />
          </div>
          <span>{product.name}</span>
          <Price className="me-2" price={product.price} />
        </div>
        <MerchantBadge className="no-underline" name={product.source} />
        <SaveButton
          onClick={() => {
            setCurrentSaved(!currentSaved);
            onUpdateSavedProduct(product.index);
            if (currentSaved) {
              unsaveProduct({ productIndex: product.index });
            } else {
              saveProduct({ productIndex: product.index });
            }
          }}
          saved={currentSaved}
        />
        {!product.available && (
          <span className="w-fit text-xs text-stone-800 bg-stone-100  px-2 py-1 rounded-full mr-2 absolute top-2 right-0 no-underline">
            Sold
          </span>
        )}
      </div>
    </a>
  );
}
