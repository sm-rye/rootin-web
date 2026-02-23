import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link' | 'dashed';
type ButtonSize = 'sm' | 'md' | 'lg';
type ColorScheme = 'primary' | 'secondary' | 'danger' | 'success';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  colorScheme?: ColorScheme;
  isLoading?: boolean;
}

export default function Button({
  variant = 'solid',
  size = 'md',
  colorScheme = 'primary',
  isLoading = false,
  className = '',
  children,
  onClick,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none';

  const variantStyles = {
    solid: {
      primary: 'bg-primary text-white hover:opacity-90',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700',
      danger: 'bg-red-600 text-white hover:bg-red-700',
      success: 'bg-green-600 text-white hover:bg-green-700',
    },
    outline: {
      primary: 'border-2 border-primary text-primary hover:bg-primary-50',
      secondary: 'border-2 border-gray-600 text-gray-600 hover:bg-gray-50',
      danger: 'border-2 border-red-600 text-red-600 hover:bg-red-50',
      success: 'border-2 border-green-600 text-green-600 hover:bg-green-50',
    },
    dashed: {
      primary:
        'border-1 border-dashed border-primary text-primary hover:bg-primary-50',
      secondary: 'border-2 border-gray-600 text-gray-600 hover:bg-gray-50',
      danger: 'border-2 border-red-600 text-red-600 hover:bg-red-50',
      success: 'border-2 border-green-600 text-green-600 hover:bg-green-50',
    },
    ghost: {
      primary:
        'text-primary hover:bg-primary hover:text-white',
      secondary: 'text-gray-600 hover:bg-gray-50',
      danger: 'text-red-600 hover:bg-red-50',
      success: 'text-green-600 hover:bg-green-50',
    },
    link: {
      primary: 'text-primary underline-offset-4 hover:underline',
      secondary: 'underline-offset-4 hover:underline',
      danger: 'text-red-600 underline-offset-4 hover:underline',
      success: 'text-green-600 underline-offset-4 hover:underline',
    },
  };

  const sizeStyles = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-6 text-lg',
  };

  const classes = `
    ${baseStyles}
    ${variantStyles[variant][colorScheme]}
    ${sizeStyles[size]}
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ');

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
}
