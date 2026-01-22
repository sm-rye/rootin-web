import React, { useEffect } from 'react';

import type { Routine } from '@/entities/routine';
import { DeleteRoutineBtn } from '@/features/routine-delete';
import {
  Button,
  Input,
  Label,
  FormElement,
  InfoText,
} from '@/shared/Components';
import {
  useUpdateRoutine,
  useUpdateRoutineForm,
} from '@/features/routine-update';
import { TaskCreateBtn, TaskEditor, useCreateTasks } from '@/features/task-add';
import { useNavigate } from 'react-router-dom';

export default function UpdateRoutineForm({ routine }: { routine: Routine }) {
  const navigate = useNavigate();
  const { routineInfo, setRoutineInfo, handleRoutineInputChange } =
    useUpdateRoutineForm();
  const { tasks, changeTaskName, setTasks, deleteTask, addTask } =
    useCreateTasks();
  const { mutate, isSuccess, isPending } = useUpdateRoutine();

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (routine.id && routineInfo && routineInfo.id) {
      mutate({
        id: routine.id,
        routine: {
          ...routineInfo,
          tasks,
        },
      });
    }
    if (isSuccess) {
      window.alert('성공');
    }
  };

  useEffect(() => {
    if (routine) {
      setRoutineInfo({
        ...routine,
      });
      if (routine.tasks) {
        setTasks(routine.tasks);
      }
    }
  }, [routine]);

  return (
    <form
      onSubmit={handleUpdateSubmit}
      className="flex flex-col w-full h-full max-w-4xl px-5"
    >
      <div className="flex-1">
        <Input
          inputId="title"
          inputName="이름"
          value={routineInfo?.title}
          onChange={handleRoutineInputChange}
        />
        <Input
          inputId="description"
          inputName="설명"
          value={routineInfo?.description}
          onChange={handleRoutineInputChange}
        />
        <Input
          inputId="duration_days"
          type="number"
          value={routineInfo?.duration_days}
          inputName={'기간'}
          inputNextText={'일 동안 반복'}
          onChange={handleRoutineInputChange}
          placeHolder={'루틴에 대한 설명이나 목표를 적어보세요.'}
          className="w-38"
          helperText="1~100일 사이의 숫자를 입력해주세요."
        />
        <FormElement hasMargin>
          <>
            <Label inputName="실천 행동 수정" />
            <TaskCreateBtn addTask={addTask} />
            <InfoText text="실천 행동 수정 시 기존 기록에 영향을 줄 수 있습니다." />

            {tasks.map((t) => (
              <TaskEditor
                task={t}
                onChangeTaskInput={changeTaskName}
                deleteTask={deleteTask}
              />
            ))}
          </>
        </FormElement>
      </div>
      <footer className="flex justify-center items-center gap-x-3">
        <Button type="submit">{isPending ? '저장중' : '저장'}</Button>
        <DeleteRoutineBtn id={routine.id} />
      </footer>
    </form>
  );
}
