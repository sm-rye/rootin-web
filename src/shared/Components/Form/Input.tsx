import React from 'react';

import Label from './Label';
import FormElement from './FormElement';

import { IoIosInformationCircle } from 'react-icons/io';

import InfoText from '../Text/InfoText';
interface InputProps {
  inputId: string;
  value: string | number | undefined;
  type?: string;
  inputName?: string;
  placeHolder?: string;
  helperText?: string;
  className?: string;
  inputNextText?: string;
  readOnly?: boolean | undefined;

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
  inputNextText = '',
  className = '',
  readOnly = false,

  onChange,
  onClick,
}: InputProps) {
  return (
    <FormElement hasMargin={Boolean(inputName)}>
      <>
        {inputName && <Label inputId={inputId} inputName={inputName} />}
        <div className="flex items-center gap-2">
          <input
            readOnly={readOnly}
            type={type}
            id={inputId}
            placeholder={placeHolder || ''}
            className={`border border-gray-300 p-2 rounded-sm text-primary-black focus:border-gray-400 ${type === 'text' && 'flex-1 w-full'} ${className}`}
            onChange={(e) => onChange?.(e)}
            onClick={() => onClick?.()}
            value={value}
            autoComplete="false"
          />
          {inputNextText && <p> {inputNextText}</p>}
        </div>

        {helperText && <InfoText text={helperText} />}
      </>
    </FormElement>
  );
}
