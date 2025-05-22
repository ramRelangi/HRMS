import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button'
}) => {
  const variantClasses = {
    primary: 'bg-blue-700 hover:bg-blue-800 text-white focus:ring-blue-300',
    secondary: 'bg-slate-600 hover:bg-slate-700 text-white focus:ring-slate-300',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-300',
    outline: 'bg-transparent border border-blue-700 text-blue-700 hover:bg-blue-50 focus:ring-blue-300',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 focus:ring-slate-300'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg'
  };

  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed pointer-events-none' 
    : '';

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      className={`
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${widthClass}
        ${disabledClasses}
        rounded-md font-medium shadow-sm
        focus:outline-none focus:ring-2 focus:ring-offset-2
        transition-colors duration-200 ease-in-out
        inline-flex items-center justify-center
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className={`mr-2 ${size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-5 w-5' : 'h-6 w-6'}`} />
      )}
      {children}
      {Icon && iconPosition === 'right' && (
        <Icon className={`ml-2 ${size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-5 w-5' : 'h-6 w-6'}`} />
      )}
    </button>
  );
};

export default Button;