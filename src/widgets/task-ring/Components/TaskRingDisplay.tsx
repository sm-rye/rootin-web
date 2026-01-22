import type { DailyStatus } from '@/entities/routine';
import { Empty } from '@/shared/Components';
import React from 'react';

interface TaskRingDisplayProps {
  taskDailyStatus: DailyStatus[] | undefined;
  selectedDayTaskStaus: DailyStatus | undefined;
  setSelectedDayTaskStaus: React.Dispatch<
    React.SetStateAction<DailyStatus | undefined>
  >;
}

export default function TaskRingDisplay({
  taskDailyStatus,
  selectedDayTaskStaus,
  setSelectedDayTaskStaus,
}: TaskRingDisplayProps) {
  if (!taskDailyStatus) return <Empty />;

  const getRingStyle = (idx: number, isCompleted: boolean) => {
    const num = idx + 1;
    return `w-${6 + 4 * idx} h-${6 + 4 * idx} bg-red-${100 * num} z-${50 - idx * 10} ${!isCompleted && 'bg-gray-300'}`;
  };

  const handleDayBoxClick = (dayStatus: DailyStatus) =>
    setSelectedDayTaskStaus(dayStatus);

  return (
    <div>
      <h2>목표 달성 링</h2>
      <div className="flex flex-wrap gap-2">
        {taskDailyStatus.map((d) => (
          <div
            className={`cursor-pointer ${d.date === selectedDayTaskStaus?.date && 'border border-primary'}`}
            onClick={() => handleDayBoxClick(d)}
          >
            <div>{d.day}</div>
            <div>
              {d.status.map((t, idx) => (
                <div className={getRingStyle(idx, t.isCompleted)} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
