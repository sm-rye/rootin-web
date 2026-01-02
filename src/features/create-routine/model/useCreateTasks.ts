import { useState } from 'react';
import type { Task } from '@/entities/routine';

export default function useCreateTasks() {
  const MAX_TASK = 5;

  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (tasks.length >= MAX_TASK) {
      window.alert(`${MAX_TASK}개 까지만 등록가능`);
      return;
    }

    const newTask = { name: '', sort_order: tasks ? tasks.length + 1 : 1 };
    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id: number) => {
    if (tasks.length <= 1) {
      window.alert('task는 최소 하나 이상 등록되어야함');
      return;
    }
    setTasks((prev) => {
      const filtered = prev.filter((t) => t.sort_order !== id);
      return filtered.map((t) =>
        t.sort_order > id ? { ...t, sort_order: t.sort_order - 1 } : t,
      );
    });
  };

  const changeTaskName = (
    e: React.ChangeEvent<HTMLInputElement>,
    currTask: number,
  ) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.sort_order === currTask ? { ...t, name: e.target.value } : t,
      ),
    );
  };

  return { tasks, addTask, deleteTask, changeTaskName };
}
