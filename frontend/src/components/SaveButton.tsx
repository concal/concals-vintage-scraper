import { MouseEventHandler } from 'react';
import { Bookmark } from 'lucide-react';
import { Button } from '@/generated/components/ui/button';
import { cn } from '@/generated/lib/utils';

interface SaveButtonProps {
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  saved?: boolean;
}

export function SaveButton({ className, onClick, saved }: SaveButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon-xs"
      className={cn('absolute top-2 left-2', className)}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick(e);
      }}
    >
      <Bookmark className={cn('size-4', saved && 'fill-current')} />
    </Button>
  );
}
