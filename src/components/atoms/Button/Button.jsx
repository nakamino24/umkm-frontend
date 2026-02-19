// src/components/atoms/Button/Button.jsx
import React from 'react';
import { Loader2 } from 'lucide-react';
import { BUTTON_VARIANTS, BUTTON_SIZES } from './Button.types';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  fullWidth = false,
  type = 'button',
  onClick,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-indigo-400',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 disabled:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-400',
    outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500 disabled:opacity-50',
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500 disabled:opacity-50'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    icon: 'p-2'
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    (isLoading || isDisabled) && 'cursor-not-allowed opacity-70',
    className
  ].join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={isLoading || isDisabled}
      onClick={onClick}
      {...props}
    >
      {isLoading && <Loader2 className="animate-spin mr-2" size={size === 'sm' ? 16 : 20} />}
      {!isLoading && LeftIcon && <LeftIcon className="mr-2" size={size === 'sm' ? 16 : 20} />}
      {children}
      {!isLoading && RightIcon && <RightIcon className="ml-2" size={size === 'sm' ? 16 : 20} />}
    </button>
  );
};

export default Button;