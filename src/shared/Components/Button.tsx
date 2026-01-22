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
  // 기본 스타일
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none';

  // variant별 스타일
  const variantStyles = {
    solid: {
      primary:
        'bg-primary text-white hover:opacity-90 focus:none dark:bg-primary-700 dark:hover:bg-primary-800',
      secondary:
        'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-800',
      danger:
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 dark:bg-red-700 dark:hover:bg-red-800',
      success:
        'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 dark:bg-green-700 dark:hover:bg-green-800',
    },
    outline: {
      primary:
        'border-2 border-primary text-primary hover:bg-primary-50 focus:ring-primary dark:border-primary-500 dark:text-primary-400 dark:hover:bg-primary-950',
      secondary:
        'border-2 border-gray-600 text-gray-600 hover:bg-gray-50 focus:ring-gray-500 dark:border-gray-500 dark:text-gray-400 dark:hover:bg-gray-950',
      danger:
        'border-2 border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500 dark:border-red-500 dark:text-red-400 dark:hover:bg-red-950',
      success:
        'border-2 border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-950',
    },
    dashed: {
      primary:
        'border-1 border-dashed border-primary text-primary hover:bg-primary-50 focus:ring-primary dark:border-primary-500 dark:text-primary-400 dark:hover:bg-primary-950',
      secondary:
        'border-2 border-gray-600 text-gray-600 hover:bg-gray-50 focus:ring-gray-500 dark:border-gray-500 dark:text-gray-400 dark:hover:bg-gray-950',
      danger:
        'border-2 border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500 dark:border-red-500 dark:text-red-400 dark:hover:bg-red-950',
      success:
        'border-2 border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-950',
    },
    ghost: {
      primary:
        'text-primary hover:bg-primary focus:ring-primary dark:text-primary  dark:hover:bg-primary hover:text-white',
      secondary:
        'text-gray-600 hover:bg-gray-50 focus:ring-gray-500 dark:text-gray-400 dark:hover:bg-gray-950',
      danger:
        'text-red-600 hover:bg-red-50 focus:ring-red-500 dark:text-red-400 dark:hover:bg-red-950',
      success:
        'text-green-600 hover:bg-green-50 focus:ring-green-500 dark:text-green-400 dark:hover:bg-green-950',
    },
    link: {
      primary:
        'text-primary underline-offset-4 hover:underline dark:text-primary-400',
      secondary: 'underline-offset-4 hover:underline ',
      danger:
        'text-red-600 underline-offset-4 hover:underline dark:text-red-400',
      success:
        'text-green-600 underline-offset-4 hover:underline dark:text-green-400',
    },
  };

  // size별 스타일
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
