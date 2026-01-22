import React from 'react';
import type { Task } from '@/entities/task';

import { Input } from '@/shared/Components';

interface TaskEditorProps {
  task?: Task | undefined;
  onChangeTaskInput: (
    e: React.ChangeEvent<HTMLInputElement>,
    task_id: number,
  ) => void;
  deleteTask: (id: number) => void;
}

export default function TaskEditor({
  task,
  onChangeTaskInput,
  deleteTask,
}: TaskEditorProps) {
  if (!task) return <></>;

  const changeNumToKorean = (num: number) => {
    switch (num) {
      case 1:
        return `첫`;
      case 2:
        return '두';
      case 3:
        return '세';
      case 4:
        return '네';
      case 5:
        return '다섯';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div>{task.sort_order}</div>
      <div className="flex-1">
        <Input
          inputId="task"
          value={task.name}
          onChange={(e) => {
            onChangeTaskInput(e, task.sort_order);
          }}
          placeHolder={`${changeNumToKorean(task.sort_order)} 번째 실천 행동`}
        />
      </div>

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
