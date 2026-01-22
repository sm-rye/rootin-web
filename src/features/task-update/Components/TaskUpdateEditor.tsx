import type { Task } from '@/entities/task';
import React from 'react';

import { Input } from '@/shared/Components';

interface TaskUpdateEditorProps {
  task: Task;
  editingTask: Task | undefined;
  handleTaskInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => void;
  handleTaskInputClick: (t: Task) => void;
  handleTaskEditingComplete: () => void;
}
export default function TaskUpdateEditor({
  task,
  editingTask,
  // handleTaskInputChange,
  // handleTaskInputClick,
  handleTaskEditingComplete,
}: TaskUpdateEditorProps) {
  const currEditingTask = editingTask?.id === task.id;

  return (
    <div className="flex">
      <Input
        value={currEditingTask ? editingTask?.name : task?.name}
        inputId="task"
        // onChange={(e) => handleTaskInputChange(e, task.id!)}
        // onClick={() => {
        //   handleTaskInputClick(task);
        // }}
        className={`border hover:bg-red-100'}`}
      />
      <button type="button">삭제</button>
    </div>
  );
}
