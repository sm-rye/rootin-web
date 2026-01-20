import React from 'react';

interface PageHeaderProps {
  mainText: string;
  subText?: string;
}

export default function PageHeader({ mainText, subText }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-y-2 py-2.5">
      <h1 className="text-4xl font-semibold text-primary-black ">{mainText}</h1>
      {subText && <h4 className="text-lg text-secondary-black">{subText}</h4>}
    </header>
  );
}
