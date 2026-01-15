import React from 'react';

interface InputProps {
  inputId: string;
  value: string | undefined;
  type?: string;
  inputName?: string;
  placeholder?: string;
  className?: string;

  readOnly?: boolean | undefined;

  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  inputId,
  value = '',
  type = 'text',
  inputName,
  placeholder,
  className = '',
  readOnly = false,

  onChange,
  onClick,
}: InputProps) {
  return (
    <div>
      {inputName && <label htmlFor={inputId}>{inputName}</label>}
      <input
        readOnly={readOnly}
        type={type}
        id={inputId}
        placeholder={placeholder || ''}
        className={`border border-red-300 ${className}`}
        onChange={(e) => onChange?.(e)}
        onClick={() => onClick?.()}
        value={value}
      />
    </div>
  );
}
