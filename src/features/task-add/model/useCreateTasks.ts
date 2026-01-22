import { useState } from 'react';
import type { Task } from '@/entities/task';

export default function useCreateTasks() {
  const MAX_TASK = 5;

  const [tasks, setTasks] = useState<Task[]>([{ name: '', sort_order: 1 }]);
  const [savedTasks, setSavedTasks] = useState(0);

  const addTask = () => {
    if (tasks.length >= MAX_TASK) {
      window.alert(`${MAX_TASK}개 까지만 등록가능`);
      return;
    }

    const newTask = { name: '', sort_order: tasks ? tasks.length + 1 : 1 };

    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id: number) => {
    if (!savedTasks && tasks.length <= 1) {
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

  return { tasks, addTask, deleteTask, changeTaskName, setTasks };
}

// 해야할 것

// 1. 기존 테스크의 길이를 기준으로 sort_oreder를 생성해야힘
// 2. 기존 테스크의 길이 + 새 테스크 길이가 max를 넘어서는 안됨

// 필요한 값

// 1. 기존 테스크의 길이
