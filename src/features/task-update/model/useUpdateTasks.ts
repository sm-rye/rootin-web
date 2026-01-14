import type { Task } from '@/entities/task';
import { useState } from 'react';

export default function useUpdateTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const handleTaskInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number | undefined,
  ) => {
    const { value } = e.target;

    if (id) {
      setEditingTask((prev) => (prev ? { ...prev, name: value } : prev));
    }
  };

  const handleTaskInputClick = (task: Task) => {
    if (!editingTask) {
      setEditingTask(task);
    } else if (task.id === editingTask.id) {
      return;
    } else {
      const confirm = window.confirm(
        '아직 수정중입니다. 완료버튼을 누르지 않으면 저장되지 않습니다. 저장하지 않고 계속진행하시겠습니까?',
      );
      if (confirm) {
        setEditingTask(task);
      } else {
        return;
      }
    }
  };

  const handleTaskEditingComplete = () => {
    if (editingTask)
      setTasks((prev) =>
        prev.map((p) =>
          p.id === editingTask.id ? { ...p, name: editingTask.name } : p,
        ),
      );
    setEditingTask(undefined);
  };

  return {
    editingTask,
    tasks,
    setTasks,
    handleTaskInputClick,
    handleTaskInputChange,
    handleTaskEditingComplete,
  };
}
