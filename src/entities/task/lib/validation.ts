import type { Task } from '../model/types';

const MIN = 1;

// 테스크가 전체 길이 유효성검사
export const validateTaskLength = (tasks: Task[]) =>
  tasks.length < MIN ? `${MIN}개 이상의 task를 등록해주세요` : '';

// 테스크 이름 유효성 검사
export const validateTaskName = (tasks: Task[]) => {
  const emptyTasks = tasks.filter((t) => t.name.trim() === '');

  return emptyTasks.length > 0 ? emptyTasks : undefined;
};
