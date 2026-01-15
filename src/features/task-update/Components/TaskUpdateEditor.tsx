import type { Task } from '@/entities/task';
import React from 'react';

import { Input } from '@/shared/Components';

interface TaskUpdateEditorProps {
  isEditing: boolean;
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
  isEditing,
  task,
  editingTask,
  handleTaskInputChange,
  handleTaskInputClick,
  handleTaskEditingComplete,
}: TaskUpdateEditorProps) {
  const currEditingTask = editingTask?.id === task.id;
  return (
    <div>
      <Input
        readOnly={!isEditing}
        value={currEditingTask ? editingTask?.name : task?.name}
        inputId="description"
        onChange={(e) => handleTaskInputChange(e, task.id!)}
        onClick={() => {
          if (isEditing) handleTaskInputClick(task);
        }}
        className={`border ${isEditing && 'hover:bg-red-100'}`}
      />

      {isEditing && currEditingTask && (
        <button type="button" onClick={handleTaskEditingComplete}>
          완료
        </button>
      )}
      <button type="button">삭제</button>
    </div>
  );
}
