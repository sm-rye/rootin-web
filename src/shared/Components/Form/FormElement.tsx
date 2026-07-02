import React from 'react';

export default function FormElement({
  hasMargin = false,
  children,
}: {
  hasMargin?: boolean | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-y-3  ${hasMargin && 'mb-8'}`}>
      {children}
    </div>
  );
}
