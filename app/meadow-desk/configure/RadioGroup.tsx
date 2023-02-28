import { RadioGroup } from "@headlessui/react";
import InputLabel from "./InputLabel";

interface RadioGroupOption {
  value: string | number | object;
  name: string;
  title?: string;
}

const ConfiguratorRadioGroup = <TOption extends RadioGroupOption>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Readonly<TOption[]>;
  value: TOption["value"] | undefined;
  onChange: (newValue: TOption["value"]) => void;
}) => {
  return (
    <RadioGroup value={value} onChange={onChange} className="space-y-2">
      <RadioGroup.Label as={InputLabel}>{label}</RadioGroup.Label>

      <div className="flex space-x-4">
        {options.map((option) => (
          <RadioGroup.Option
            key={option.name}
            value={option.value}
            title={option.title}
            className="cursor-pointer select-none rounded border-2 border-gray-900 px-4 py-2 text-lg hover:border-gray-700 ui-checked:border-gray-400"
          >
            {option.name}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default ConfiguratorRadioGroup;
