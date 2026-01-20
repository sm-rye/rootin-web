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

  return (
    <div className="grid grid-cols-5">
      {dailyTaskData.map((d) => {
        return (
          <TaskDailyBox key={d.day} date={d.date}>
            {today === d.date &&
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
              ))}
          </TaskDailyBox>
        );
      })}
    </div>
  );
}
