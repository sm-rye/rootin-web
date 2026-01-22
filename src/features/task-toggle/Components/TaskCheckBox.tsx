import React from 'react';

import type { DailyStatus } from '@/entities/routine';
import { Empty } from '@/shared/Components';
import TaskStatusItem from './TaskStatusItem';
import type { Task } from '@/entities/task';

interface TaskCheckBoxProps {
  selectedDayTaskStaus: DailyStatus | undefined;
  tasks: Task[] | undefined;
}

export default function TaskCheckBox({
  selectedDayTaskStaus,
  tasks,
}: TaskCheckBoxProps) {
  console.log(selectedDayTaskStaus);
  if (!selectedDayTaskStaus || !tasks) return <Empty />;

  return (
    <div>
      <header>{selectedDayTaskStaus.date}의 실천행동</header>
      <div>
        {selectedDayTaskStaus.status.map((t) => {
          const currTask = tasks.find((el) => el.id === t.task_id);
          return (
            <TaskStatusItem
              key={t.task_id}
              task_id={t.task_id}
              isCompleted={t.isCompleted}
              date={selectedDayTaskStaus.date}
              name={currTask?.name}
            />
          );
        })}
      </div>
    </div>
  );
}
