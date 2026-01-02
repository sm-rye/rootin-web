import React from 'react';
import type { Task } from '../model/types';

interface TaskAddFormProps {
  task?: Task | undefined;
  changeTaskName: (
    e: React.ChangeEvent<HTMLInputElement>,
    currTask: number,
  ) => void;
}

export default function TaskAddForm({
  task,
  changeTaskName,
}: TaskAddFormProps) {
  if (!task) return <></>;

  return (
    <div>
      <span>{task?.sort_order || 1}.</span>
      <input
        value={task?.name || ''}
        onChange={(e) => changeTaskName(e, task?.sort_order)}
      />
    </div>
  );
}
