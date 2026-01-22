import React from 'react';

import type { Status } from '@/entities/routine';
import { useToggleTask } from '@/features/task-toggle';
import { Empty } from '@/shared/Components';

export default function TaskStatusItem({
  task_id,
  isCompleted,
  date,
  name,
}: Status & { date: string; name: string | undefined }) {
  if (!name) return <Empty />;
  const { mutate } = useToggleTask();

  const handleToggle = () => {
    mutate({ id: task_id, date });
  };

  return (
    <div className="flex gap-1.5 py-1" key={task_id}>
      <input
        type="checkbox"
        checked={isCompleted}
        id={task_id.toString()}
        onChange={handleToggle}
      />
      <label htmlFor={task_id.toString()}> {name}</label>
    </div>
  );
}
