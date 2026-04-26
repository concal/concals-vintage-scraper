import { Card } from '@/generated/components/ui/card';
import { Skeleton } from '@/generated/components/ui/skeleton';

export function ProductLoadingCard() {
  return (
    <Card className="w-full gap-0 pt-0">
      <Skeleton className="h-72 w-full rounded-t-xl rounded-b-none" />
      <div className="flex flex-col gap-3 p-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-5 w-1/3 rounded-full" />
      </div>
    </Card>
  );
}
