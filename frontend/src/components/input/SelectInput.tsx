export function SelectInput({
  onChange,
  options,
  value,
}: {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: { label: string; value: string }[];
  value?: string;
}) {
  return (
    <select
      className="grow pl-1 text-stone-800 border-b-2 border-stone-300 focus:outline-none"
      onChange={onChange}
      value={value}
    >
      {options.map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}
