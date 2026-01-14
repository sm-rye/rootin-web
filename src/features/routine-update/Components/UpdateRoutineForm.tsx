import React, { useEffect } from 'react';
import { useUpdateRoutineForm } from '@/features/routine-update';
import type { Routine } from '@/entities/routine';
import { useUpdateTasks, TaskUpdateEditor } from '@/features/task-update';
import { useCreateTasks, TaskAddEditor } from '@/features/task-add';

export default function UpdateRoutineForm({ routine }: { routine: Routine }) {
  const {
    isEditing,
    routineInfo,
    handleRoutineEditBtn,
    setRoutineInfo,
    handleRoutineInputChange,
  } = useUpdateRoutineForm();

  const {
    editingTask,
    tasks: upadtedTasks,
    setTasks,
    handleTaskInputChange,
    handleTaskInputClick,
    handleTaskEditingComplete,
  } = useUpdateTasks();

  const {
    tasks: newTasks,
    addTask,
    changeTaskName,
    deleteTask,
  } = useCreateTasks();

  useEffect(() => {
    if (routine) {
      setRoutineInfo({
        title: routine.title,
        description: routine.description,
        id: routine.id,
      });
      if (routine.tasks) {
        setTasks(routine.tasks);
      }
    }
  }, [routine]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(routineInfo);
    console.log([...upadtedTasks, ...newTasks]);
  };

  const getTasks = () => (isEditing ? upadtedTasks : routine.tasks || []);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button onClick={handleRoutineEditBtn} type="button">
          수정
        </button>
        {isEditing && <button type="submit">저장</button>}
      </div>
      <input
        readOnly={!isEditing}
        value={!isEditing ? routine.title : routineInfo?.title}
        onChange={handleRoutineInputChange}
        id="title"
        className="border"
      />
      <input
        readOnly={!isEditing}
        value={!isEditing ? routine.description : routineInfo?.description}
        onChange={handleRoutineInputChange}
        id="description"
        className="border"
      />
      <div>
        <p>테스크를 수정할 경우, 기존 기록에 영향을 줄 수 있읍니다 </p>
        {getTasks().map((t) => (
          <TaskUpdateEditor
            isEditing={isEditing}
            key={t.id || t.sort_order}
            task={t}
            editingTask={editingTask}
            handleTaskInputChange={handleTaskInputChange}
            handleTaskInputClick={handleTaskInputClick}
            handleTaskEditingComplete={handleTaskEditingComplete}
          />
        ))}
        {isEditing && (
          <div>
            <button type="button" onClick={() => addTask(upadtedTasks.length)}>
              테스크 추가
            </button>
          </div>
        )}
        {newTasks.map((t) => {
          return (
            <TaskAddEditor
              task={t}
              changeTaskName={changeTaskName}
              deleteTask={deleteTask}
            />
          );
        })}
      </div>
    </form>
  );
}
