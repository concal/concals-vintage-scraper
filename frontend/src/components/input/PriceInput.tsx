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
    <div className="flex flex-row items-center pl-1 text-stone-800 border-b-2 border-stone-300">
      <span
        className={value !== undefined ? 'text-stone-800' : 'text-stone-400'}
      >
        $
      </span>
      <input
        className="grow appearance-none focus:outline-none placeholder:text-stone-400"
        min="0"
        step="1"
        onChange={onChange}
        placeholder={placeholder}
        type="number"
        value={value ? `${value / 100}` : undefined}
      />
    </div>
  );
}
