import React, {memo} from "react";

type Option = {
  value: string | number;
  label: string;
};

type SelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export const Select: React.FC<SelectProps> = memo(
  ({options, value, onChange}) => {
    return (
      <select
        className="flex-shrink-0 inline-flex  py-2.5 px-4 text-sm font-medium z-10 h-[42px] text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt: Option) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  },
);
