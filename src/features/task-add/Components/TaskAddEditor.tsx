import React from 'react';
import type { Task } from '@/entities/task';

interface TaskAddEditorProps {
  task?: Task | undefined;
  changeTaskName: (
    e: React.ChangeEvent<HTMLInputElement>,
    currTask: number,
  ) => void;
  deleteTask: (id: number) => void;
}

export default function TaskAddEditor({
  task,
  changeTaskName,
  deleteTask,
}: TaskAddEditorProps) {
  if (!task) return <></>;

  return (
    <div>
      <span>{task.sort_order || 1}.</span>
      <input
        value={task.name || ''}
        onChange={(e) => changeTaskName(e, task?.sort_order)}
      />
      <button
        type="button"
        onClick={() => {
          deleteTask(task.sort_order);
        }}
      >
        삭제
      </button>
    </div>
  );
}
