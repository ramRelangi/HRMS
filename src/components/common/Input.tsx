import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

type InputProps = {
  id: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'time' | 'tel';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  icon?: LucideIcon;
  error?: string;
  helpText?: string;
  className?: string;
  inputClassName?: string;
  max?: string;
  min?: string;
};

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  icon: Icon,
  error,
  helpText,
  className = '',
  inputClassName = '',
  max,
  min
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon className="h-5 w-5 text-slate-400" />
          </div>
        )}
        <input
          id={id}
          type={type}
          className={`
            w-full rounded-md border border-slate-300 px-3 py-2 
            ${Icon ? 'pl-10' : ''}
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500
            disabled:bg-slate-100 disabled:cursor-not-allowed
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
            ${inputClassName}
          `}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          max={max}
          min={min}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {helpText && !error && <p className="mt-1 text-sm text-slate-500">{helpText}</p>}
    </div>
  );
};

export default Input;