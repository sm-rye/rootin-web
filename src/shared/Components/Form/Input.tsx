import React from 'react';

import Label from './Label';
import FormElement from './FormElement';

import InfoText from '../Text/InfoText';
interface InputProps {
  inputId: string;
  value: string | number | undefined;
  type?: string;
  inputName?: string;
  placeHolder?: string;
  helperText?: string;
  error?: string;
  className?: string;
  inputNextText?: string;
  endAdornment?: React.ReactNode;
  readOnly?: boolean | undefined;
  maxLength?: number | undefined;
  numLength?: { min: number; max: number } | undefined;

  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  inputId,
  value = '',
  type = 'text',
  inputName,
  placeHolder,
  helperText = '',
  error = '',
  inputNextText = '',
  endAdornment,
  className = '',
  readOnly = false,
  maxLength,
  numLength = undefined,

  onChange,
  onClick,
}: InputProps) {
  return (
    <FormElement hasMargin={Boolean(inputName)}>
      <>
        {inputName && <Label inputId={inputId} inputName={inputName} />}
        <div className="relative flex items-center gap-2">
          <input
            readOnly={readOnly}
            type={type}
            id={inputId}
            placeholder={placeHolder || ''}
            className={`border p-2 rounded-sm text-primary-black focus:border-gray-400 ${error ? 'border-red-400' : 'border-gray-300'} ${type === 'text' && !endAdornment && 'flex-1 w-full'} ${endAdornment ? 'pr-9' : ''} ${className}`}
            onChange={(e) => onChange?.(e)}
            onClick={() => onClick?.()}
            onWheel={type === 'number' ? (e) => e.currentTarget.blur() : undefined}
            value={value}
            maxLength={maxLength}
            min={numLength?.min}
            max={numLength?.max}
          />
          {endAdornment && (
            <span className="absolute right-2 flex items-center">
              {endAdornment}
            </span>
          )}
          {inputNextText && <p>{inputNextText}</p>}
        </div>

        {error
          ? <p className="mt-1 text-xs text-red-500">{error}</p>
          : helperText && <InfoText text={helperText} />
        }
      </>
    </FormElement>
  );
}
