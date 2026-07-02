import React from 'react';

export default function DashBoardHeading({
  mainText,
  subText,
}: {
  mainText: string;
  subText: string;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground">{mainText}</h2>
      <p className="mt-0.5 text-sm  text-gray-400">{subText}</p>
    </div>
  );
}
