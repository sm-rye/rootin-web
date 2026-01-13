import React from 'react';

import type { Status } from '@/entities/routine';
import { useToggleTask } from '@/features/task-toggle';

export default function TaskStatusItem({
  task_id,
  isCompleted,
  date,
}: Status & { date: string }) {
  const { mutate } = useToggleTask();

  const handleToggle = () => {
    mutate({ id: task_id, date });
  };

  return (
    <div className="flex" key={task_id}>
      <input
        type="checkbox"
        checked={isCompleted}
        id={task_id.toString()}
        onChange={handleToggle}
      />
      <label htmlFor={task_id.toString()}> {task_id}</label>
    </div>
  );
}
