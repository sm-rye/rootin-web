import React, { useEffect, useMemo } from 'react';

import { validateRoutineTitle, validateDuration, type Routine } from '@/entities/routine';
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
import { useConfirmStore } from '@/shared/model/useConfirmStore';
import { IoWarningOutline } from 'react-icons/io5';

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
  const openConfirm = useConfirmStore((s) => s.openConfirm);

  // 기존 값과 비교하여 기록에 영향을 주는 변경 여부 감지
  const hasDurationChanged =
    routineInfo?.duration_days !== undefined &&
    routineInfo.duration_days !== routine.duration_days;

  const hasTasksChanged = useMemo(() => {
    const original = routine.tasks ?? [];
    if (tasks.length !== original.length) return true;
    return tasks.some((t, i) => t.name !== original[i]?.name);
  }, [tasks, routine.tasks]);

  const hasImpactingChanges = hasDurationChanged || hasTasksChanged;

  const executeUpdate = () => {
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

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. 루틴 타이틀 유효성 검사
    const validatedTitle = validateRoutineTitle(routineInfo?.title);
    const validatedDuration = validateDuration(routineInfo?.duration_days);
    setErrors({ title: validatedTitle, duration_days: validatedDuration });

    // 2. 태스크 유효성 검사
    if (tasks.length === 0) return;
    const emptyTasks = validateTaskName(tasks);
    if (emptyTasks) setEmptyTasks(emptyTasks);

    // 3. 유효성 검사 실패 시 중단
    if (validatedTitle || validatedDuration || emptyTasks) return;

    // 4. 기록에 영향을 주는 변경이 있으면 확인 모달 표시
    if (hasImpactingChanges) {
      openConfirm(
        '기간 또는 태스크 변경 시 기존 달성 기록에 영향을 줄 수 있습니다.\n계속 저장하시겠습니까?',
        executeUpdate,
        '저장',
      );
      return;
    }

    executeUpdate();
  };

  useEffect(() => {
    if (routine) {
      setRoutineInfo({ ...routine });
      if (routine.tasks) setTasks(routine.tasks);
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
          error={errors.title}
        />
        <Input
          inputId="description"
          inputName="설명"
          value={routineInfo?.description}
          onChange={handleRoutineInputChange}
        />
        <div className="relative">
          <Input
            inputId="duration_days"
            type="number"
            value={routineInfo?.duration_days}
            inputName={'기간'}
            inputNextText={'일 동안 반복'}
            onChange={handleRoutineInputChange}
            className="w-38"
            error={errors.duration_days}
            helperText="1~365일 사이의 숫자를 입력해주세요."
            numLength={{ min: 1, max: 365 }}
          />
          {hasDurationChanged && (
            <p className="flex items-center gap-1 text-xs text-amber-500 absolute top-30 ">
              <IoWarningOutline className="shrink-0" />
              기간 변경 시 기존 달성 기록에 영향을 줄 수 있습니다.
            </p>
          )}
        </div>

        <FormElement hasMargin>
          <>
            <Label inputName="실천 행동 수정" />
            <TaskCreateBtn addTask={addTask} />
            {hasTasksChanged ? (
              <p className="flex items-center gap-1 text-xs text-amber-500 mt-1">
                <IoWarningOutline className="shrink-0" />
                태스크 변경 시 기존 달성 기록에 영향을 줄 수 있습니다.
              </p>
            ) : (
              <InfoText text="실천 행동 수정 시 기존 기록에 영향을 줄 수 있습니다." />
            )}

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
