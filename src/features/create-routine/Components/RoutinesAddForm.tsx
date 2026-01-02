import React from 'react';

import TasksList from './TasksList';
import useCreateRoutines from '../model/useCreateRoutines';
import useCreateTasks from '../model/useCreateTasks';

export default function RoutinesAddForm() {
  const { routineInfo, changeRoutineInput } = useCreateRoutines();

  const { tasks, addTask, deleteTask, changeTaskName } = useCreateTasks();

  const submitRoutine = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (tasks.length < 1) {
      window.alert('하나 이상의 task를 등록해주세요');
      return;
    }
    const emptyTasks = tasks.filter((t) => t.name.trim() === '');

    if (emptyTasks.length > 0) {
      window.alert('작성되지 않은 task를 확인해주세요');
      return;
    }

    const routine = { tasks, ...routineInfo };
    console.log(routine);
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
              <TasksList
                key={t.sort_order}
                task={t}
                changeTaskName={changeTaskName}
                deleteTask={deleteTask}
              />
            ))}
        </div>
      </div>

      <button type="submit">루틴 등록</button>
    </form>
  );
}
