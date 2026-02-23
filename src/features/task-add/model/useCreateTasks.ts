import { useState } from 'react';
import type { Task } from '@/entities/task';
import { useToastStore } from '@/shared/model/useToastStore';

export default function useCreateTasks() {
  const MAX_TASK = 5;

  const [tasks, setTasks] = useState<Task[]>([{ name: '', sort_order: 1 }]);
  const [emptyTasks, setEmptyTasks] = useState<Task[] | undefined>(undefined);

  const addToast = useToastStore((state) => state.addToast);

  const addTask = () => {
    if (tasks.length >= MAX_TASK) {
      addToast(`태스크는 최대 ${MAX_TASK}개까지 등록 가능합니다.`, 'error');
      return;
    }

    const newTask = { name: '', sort_order: tasks ? tasks.length + 1 : 1 };

    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id: number) => {
    if (tasks.length <= 1) {
      addToast('태스크는 최소 1개 이상 등록되어야 합니다.', 'error');
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
    if (emptyTasks) {
      setEmptyTasks((prev) => prev?.filter((t) => t.sort_order !== currTask));
    }
    setTasks((prev) =>
      prev.map((t) =>
        t.sort_order === currTask ? { ...t, name: e.target.value } : t,
      ),
    );
  };

  return {
    tasks,
    emptyTasks,
    addTask,
    deleteTask,
    changeTaskName,
    setTasks,
    setEmptyTasks,
  };
}

// 해야할 것

// 1. 기존 테스크의 길이를 기준으로 sort_oreder를 생성해야힘
// 2. 기존 테스크의 길이 + 새 테스크 길이가 max를 넘어서는 안됨

// 필요한 값

// 1. 기존 테스크의 길이
