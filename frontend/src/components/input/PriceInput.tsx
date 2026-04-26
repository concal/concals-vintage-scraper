import { Input } from '@/generated/components/ui/input';

export function PriceInput({
  onChange,
  placeholder,
  value,
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  value?: number;
}) {
  return (
    <div className="relative flex items-center flex-1 md:flex-none md:w-38">
      <span className="absolute left-2.5 text-muted-foreground pointer-events-none">$</span>
      <Input
        className="pl-6"
        min="0"
        step="1"
        onChange={onChange}
        placeholder={placeholder}
        type="number"
        value={value !== undefined ? `${value / 100}` : ''}
      />
    </div>
  );
}
