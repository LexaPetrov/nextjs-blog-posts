import React, {memo} from "react";

type InputProps = {
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<InputProps> = memo(({value, placeholder, onChange}) => {
  return (
    <input
    value={value}
    onChange={onChange}
    className="focus:outline-none block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
    placeholder={placeholder}
  />
  );
});
