import React from 'react';

import useCreateRoutines from '../model/useCreateRoutines';
import { addRoutine } from '../api';

import { useCreateTasks, TaskAddEditor } from '@/features/task-add';
import { Input, Button, Label, FormElement } from '@/shared/Components';

export default function RoutineCreateForm() {
  const { routineInfo, changeRoutineInput } = useCreateRoutines();

  const { tasks, addTask, deleteTask, changeTaskName } = useCreateTasks();

  const submitRoutine = async (e: React.FormEvent<HTMLFormElement>) => {
    // todo :  validation , api 통신
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

    const res = await addRoutine(routine);
  };

  return (
    <form
      onSubmit={submitRoutine}
      className="flex flex-col w-full h-full max-w-4xl"
    >
      <div className="flex-1">
        <Input
          inputId="title"
          value={routineInfo.title}
          inputName={'이름'}
          onChange={changeRoutineInput}
          placeHolder={'루틴 이름을 입력하세요.'}
        />

        <Input
          inputId="description"
          value={routineInfo.description}
          inputName={'설명'}
          onChange={changeRoutineInput}
          placeHolder={'루틴에 대한 설명이나 목표를 적어보세요.'}
        />

        <Input
          inputId="duration_days"
          type="number"
          value={routineInfo.duration_days}
          inputName={'기간'}
          inputNextText={'일 동안 반복'}
          onChange={changeRoutineInput}
          placeHolder={'루틴에 대한 설명이나 목표를 적어보세요.'}
          className="w-38"
          helperText="1~100일 사이의 숫자를 입력해주세요."
        />

        <FormElement hasMargin>
          <>
            <Label inputName="실천 행동 추가" />
            <p className="text-gray-400 text-sm">
              매일 완료할 작업이나 행동을 추가하세요.
            </p>
            <Button
              onClick={() => {
                addTask();
              }}
              type="button"
              variant="dashed"
              size="sm"
            >
              실천 행동 추가
            </Button>
            {tasks &&
              tasks.map((t) => (
                <TaskAddEditor
                  key={t.sort_order}
                  task={t}
                  changeTaskName={changeTaskName}
                  deleteTask={deleteTask}
                />
              ))}
          </>
        </FormElement>
      </div>

      <div className="w-full flex justify-center py-8 h-20">
        <Button type="submit" className=" w-full">
          루틴 등록하기
        </Button>
      </div>
    </form>
  );
}
