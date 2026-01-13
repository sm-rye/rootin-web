import React from 'react';

export default function TaskDailyBox({
  date,
  children,
}: {
  date: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-30 h-30 border">
      <p>{date}</p>
      <div>{children}</div>
    </div>
  );
}
