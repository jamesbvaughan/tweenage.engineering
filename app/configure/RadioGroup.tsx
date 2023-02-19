import { RadioGroup } from "@headlessui/react";

interface RadioGroupOption {
  value: string | number;
  name: string;
}

const ConfiguratorRadioGroup = <TOption extends RadioGroupOption>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Readonly<TOption[]>;
  value: TOption["value"];
  onChange: (newValue: TOption["value"]) => void;
}) => {
  return (
    <RadioGroup value={value} onChange={onChange}>
      <RadioGroup.Label>{label}</RadioGroup.Label>

      <div className="flex space-x-4">
        {options.map((option) => (
          <RadioGroup.Option
            key={option.value}
            value={option.value}
            className="cursor-pointer select-none rounded border-2 border-transparent px-4 py-2 hover:border-gray-700 ui-checked:border-gray-400"
          >
            {option.name}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default ConfiguratorRadioGroup;
