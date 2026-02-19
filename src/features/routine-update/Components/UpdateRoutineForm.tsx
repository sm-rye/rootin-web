import React, { useEffect } from 'react';

import { validateRoutineTitle, type Routine } from '@/entities/routine';
import { validateTaskName } from '@/entities/task';

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

export default function UpdateRoutineForm({ routine }: { routine: Routine }) {
  const {
    routineInfo,
    errors,
    setErrors,
    setRoutineInfo,
    handleRoutineInputChange,
  } = useUpdateRoutineForm();
  const {
    tasks,
    emptyTasks,

    setEmptyTasks,
    changeTaskName,
    setTasks,
    deleteTask,
    addTask,
  } = useCreateTasks();
  const { mutate, isPending } = useUpdateRoutine();

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1.루틴 타이틀 유효성 검사
    const validatedTitle = validateRoutineTitle(routineInfo?.title);
    setErrors({ title: validatedTitle });

    // 2. 테스크 유효성 검사 실행
    const emptyTasks = validateTaskName(tasks);
    if (emptyTasks) setEmptyTasks(emptyTasks);

    // 3. 유효성 검사의 실패했을 경우 함수에서 벗어난다.
    if (validatedTitle || emptyTasks) return;

    // 4. 루틴 수정 함수 실행
    if (routine.id && routineInfo && routineInfo.id) {
      mutate({
        id: routine.id,
        routine: {
          id: routineInfo.id,
          tasks,
          title: routineInfo.title,
          description: routineInfo.description,
          duration_days: routineInfo.duration_days,
        },
      });
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
          helperText={errors.title}
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
          className="w-38"
          helperText="1~100일 사이의 숫자를 입력해주세요."
          numLength={{ min: 1, max: 100 }}
        />
        <FormElement hasMargin>
          <>
            <Label inputName="실천 행동 수정" />
            <TaskCreateBtn addTask={addTask} />
            <InfoText text="실천 행동 수정 시 기존 기록에 영향을 줄 수 있습니다." />

            {tasks.map((t) => (
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
      <footer className="flex justify-center items-center gap-x-3">
        <Button type="submit">{isPending ? '저장중' : '저장'}</Button>
        <DeleteRoutineBtn id={routine.id} />
      </footer>
    </form>
  );
}
