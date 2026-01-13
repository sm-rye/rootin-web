import React from 'react';

import type { DailyStatus } from '@/entities/routine';
import { TaskDailyBox } from '@/widgets/task-daily-list';
import { TaskStatusItem } from '@/features/task-toggle';

export default function TaskDailyList({
  dailyTaskData,
}: {
  dailyTaskData: DailyStatus[] | undefined;
}) {
  if (!dailyTaskData) return <div>No data</div>;

  return (
    <div className="grid grid-cols-5">
      {dailyTaskData.map((d) => {
        return (
          <TaskDailyBox key={d.day} date={d.date}>
            {d.status.map((t) => (
              <TaskStatusItem
                task_id={t.task_id}
                isCompleted={t.isCompleted}
                key={t.task_id}
                date={d.date}
              />
            ))}
          </TaskDailyBox>
        );
      })}
    </div>
  );
}
