import React from 'react';

interface PageHeaderProps {
  mainText: string;
  subText?: string;
}

export default function PageHeader({ mainText, subText }: PageHeaderProps) {
  return (
    <header>
      <h1 className="text-2xl text-foreground">{mainText}</h1>
      {subText && <h4 className="text-sm text-muted mt-1.5">{subText}</h4>}
      <hr className="border border-primary my-4 opacity-70" />
    </header>
  );
}
