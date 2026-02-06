import React from 'react';

import useCreateRoutines from '../model/useCreateRoutines';

import { validateRoutineTitle } from '@/entities/routine';
import { validateTaskName } from '@/entities/task';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { useCreateTasks, TaskEditor } from '@/features/task-add';
import { Input, Button, Label, FormElement } from '@/shared/Components';
import { authStore } from '@/entities/auth';
import useCreateRoutineMutation from '../model/useCreateRoutineMutation';

export default function RoutineCreateForm() {
  const { routineInfo, errors, setErrors, changeRoutineInput } =
    useCreateRoutines();

  const { mutate, isError, isPending } = useCreateRoutineMutation();

  const {
    tasks,
    emptyTasks,

    setEmptyTasks,
    addTask,
    deleteTask,
    changeTaskName,
  } = useCreateTasks();

  const user = authStore((state) => state.user);

  const submitRoutine = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. 루틴 유효성 검사 실행
    const validatedTitle = validateRoutineTitle(routineInfo.title);
    setErrors({ title: validatedTitle });

    // 2. 테스크 유효성 검사 실행
    const emptyTasks = validateTaskName(tasks);
    if (emptyTasks) setEmptyTasks(emptyTasks);

    // 3. 유효성 검사의 실패했을 경우 함수에서 벗어난다.
    if (validatedTitle || emptyTasks) return;

    // 4. 루틴 등록 폼데이터 가공
    const routine = { tasks, ...routineInfo, user_id: user?.user_id };

    // 5. 루틴 등록 함수 실행
    mutate(routine);
  };

  return (
    <form
      onSubmit={submitRoutine}
      className="flex flex-col h-full  mt-5  mx-auto w-full lg:w-4/6"
    >
      <div className="flex-1">
        <Input
          inputId="title"
          helperText={errors.title}
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
          numLength={{ min: 1, max: 100 }}
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
                <TaskEditor
                  key={t.sort_order}
                  task={t}
                  onChangeTaskInput={changeTaskName}
                  deleteTask={deleteTask}
                  isEmpty={emptyTasks?.find(
                    (emptyTask) => emptyTask.sort_order === t.sort_order,
                  )}
                />
              ))}
          </>
        </FormElement>
      </div>

      <div className="w-full flex justify-center py-8 h-20">
        <Button type="submit" className="px-10">
          루틴 등록하기
          {isPending && <AiOutlineLoading3Quarters className="animate-spin" />}
        </Button>
      </div>
    </form>
  );
}
