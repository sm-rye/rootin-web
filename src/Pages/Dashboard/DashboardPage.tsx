import React from 'react';
import { Card, DashBoardHeading } from '@/shared/Components';

export default function DashboardPage() {
  return (
    <div className="w-full h-full flex flex-col p-10">
      <div>
        <Card className="flex flex-col gap-y-4 p-2">
          <DashBoardHeading mainText="연속 달성 기록" subText="최근 14일" />
          <div>
            <div>DashboardPage</div>
          </div>
        </Card>

        <Card>2</Card>
      </div>
      <div>
        <Card>3</Card>
      </div>
      <div>
        <Card>4</Card>
      </div>

      <div>
        <Card>5</Card>
        <Card>6</Card>
      </div>
    </div>
  );
}
