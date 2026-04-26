import { saveProduct, unsaveProduct } from '../api/products';
import { Product } from '../types';
import { SaveButton } from './SaveButton';
import { Badge } from '@/generated/components/ui/badge';
import { Card, CardContent } from '@/generated/components/ui/card';
import { cn } from '@/generated/lib/utils';
import { useAuthContext } from '@/context/AuthContext';

interface ProductCardProps {
  onUpdateSavedProduct: (index: string) => void;
  product: Product;
  saved?: boolean;
}

export function ProductCard({ onUpdateSavedProduct, product, saved }: ProductCardProps) {
  const { isAuthed, token } = useAuthContext();

  return (
    <a
      className="no-underline"
      href={product.product_url}
      rel="noreferrer"
      target="_blank"
    >
      <Card className={cn('relative h-full', !product.available && 'opacity-60')}>
        <img
          alt={product.name}
          className="max-h-72 w-full object-contain fade-in-image"
          src={product.thumbnail_url}
        />
        <CardContent className="flex flex-col gap-1 grow">
          <span
            className={cn(
              'line-clamp-2',
              product.available
                ? 'group-hover/card:underline underline-offset-2'
                : 'line-through'
            )}
          >
            {product.name}
          </span>
          <span className="text-lg font-semibold text-foreground mt-auto pt-1">
            ${(product.price / 100).toFixed(2)}
          </span>
          <Badge variant="secondary">{product.source}</Badge>
        </CardContent>
        {isAuthed && token && (
          <SaveButton
            onClick={() => {
              onUpdateSavedProduct(product.index);
              if (saved) {
                unsaveProduct({ productIndex: product.index, token });
              } else {
                saveProduct({ productIndex: product.index, token });
              }
            }}
            saved={saved}
          />
        )}
        {!product.available && (
          <Badge variant="secondary" className="absolute top-2 right-2">
            Sold
          </Badge>
        )}
      </Card>
    </a>
  );
}
