import React, { useState } from 'react';

import type { Task, RoutineInfo } from '../model/types';
import TaskAddForm from './TaskAddForm';

export default function RoutinesAddForm() {
  const MAX_TASK = 5;
  const DEFAULT_DURATION = 7;

  const [routineInfo, setRoutineInfo] = useState<RoutineInfo>({
    title: '',
    description: '',
    duration_days: DEFAULT_DURATION,
  });
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (tasks.length >= MAX_TASK) {
      window.alert(`${MAX_TASK}개 까지만 등록가능`);
      return;
    }

    const newTask = { name: '', sort_order: tasks ? tasks.length + 1 : 1 };

    if (!tasks) {
      setTasks([newTask]);
    } else {
      setTasks((prev) => {
        console.log(prev);
        return [...prev, newTask];
      });
    }
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

  const changeRoutineInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setRoutineInfo((prev) => ({ ...prev, [id]: value }));
  };

  const submitRoutine = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(tasks);
    console.log(routineInfo);
  };

  return (
    <form onSubmit={submitRoutine}>
      <div className="my-3">
        <div>
          <label htmlFor="title">루틴 이름</label>
          <input
            id="title"
            className="border"
            onChange={changeRoutineInput}
            value={routineInfo.title}
          />
        </div>

        <div>
          <label htmlFor="description">설명</label>
          <input
            id="description"
            className="border"
            onChange={changeRoutineInput}
            value={routineInfo.description}
          />
        </div>

        <div>
          <label htmlFor="duration_days">루틴 기간</label>
          <input
            id="duration_days"
            type="number"
            className="border"
            onChange={changeRoutineInput}
            value={routineInfo.duration_days}
          />
        </div>

        <div>
          <label htmlFor="task">테스크</label>
          <button type="button" onClick={addTask}>
            테스크 추가
          </button>
          {tasks &&
            tasks.map((t) => (
              <TaskAddForm
                key={t.sort_order}
                task={t}
                changeTaskName={changeTaskName}
              />
            ))}
        </div>
      </div>

      <button type="submit">루틴 등록</button>
    </form>
  );
}
