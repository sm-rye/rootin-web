import React from 'react';

import type { DailyStatus } from '@/entities/routine';
import { TaskDailyBox } from '@/widgets/task-daily-list';
import { TaskStatusItem } from '@/features/task-toggle';

import dayjs from 'dayjs';

export default function TaskDailyList({
  dailyTaskData,
}: {
  dailyTaskData: DailyStatus[] | undefined;
}) {
  if (!dailyTaskData) return <div>No data</div>;

  const today = dayjs().format('YYYY-MM-DD');

  const getRingSize = (idx: number) => `w-${idx + 10 * 2} h-${idx + 10 * 2}`;

  const getColor = (idx: number) =>
    `bg-red-${idx + 1 * 100} z-${50 - idx + 1 * 10}`;

  // w-8 h-8 / bg-red-100 /  z-50
  // w-9 h-9 / bg-red-200 / z-40
  // w-10 h-10 /bg-red-300 / z-30
  // w-11 h-11 / bg-red-400 / z-20
  // w-12 h-12 / bg-red-500  /z-10

  const getRingStyle = (idx: number) => {
    switch (idx + 1) {
      case 1:
        return `w-6 h-6 bg-red-${100 * idx} z-50`;
      case 2:
        return `w-10 h-10 bg-red-${100 * idx} z-40`;
      case 3:
        return `w-14 h-14 bg-red-${100 * idx} z-30`;
    }
  };

  return (
    <div className="grid grid-cols-5 w-">
      {dailyTaskData.map((d) => {
        return (
          <TaskDailyBox key={d.day} date={d.date}>
            {/* {today === d.date &&
              d.status.map((t) => (
                <>
                  <div
                    className={`w-10 h-10 ${t.isCompleted ? 'bg-red-300' : 'bg-gray-100'} rounded-full`}
                  />
                  <TaskStatusItem
                    task_id={t.task_id}
                    isCompleted={t.isCompleted}
                    key={t.task_id}
                    date={d.date}
                  />
                </>
              ))} */}
            <div className="relative border w-full h-full flex items-center justify-center">
              {d.status.map((task, index) => (
                <div
                  className={`${getRingStyle(index)} absolute  rounded-full w- z- z-`}
                />
              ))}
            </div>
          </TaskDailyBox>
        );
      })}
    </div>
  );
}
