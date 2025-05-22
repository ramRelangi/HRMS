import React from 'react';

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  id: string;
  label?: string;
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  helpText?: string;
  className?: string;
  selectClassName?: string;
  placeholder?: string;
};

const Select: React.FC<SelectProps> = ({
  id,
  label,
  options,
  value,
  onChange,
  disabled = false,
  required = false,
  error,
  helpText,
  className = '',
  selectClassName = '',
  placeholder
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={id}
        className={`
          w-full rounded-md border border-slate-300 px-3 py-2
          focus:border-blue-500 focus:ring-1 focus:ring-blue-500
          disabled:bg-slate-100 disabled:cursor-not-allowed
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
          ${selectClassName}
        `}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {helpText && !error && <p className="mt-1 text-sm text-slate-500">{helpText}</p>}
    </div>
  );
};

export default Select;