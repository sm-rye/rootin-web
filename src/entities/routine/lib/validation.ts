export const validateRoutineTitle = (title?: string) => {
  if (!title) return '루틴 이름을 입력해주세요.';
  return title.length >= 2 && title.length <= 30
    ? ''
    : '타이틀은 최소 2글자 이상 30글자 이하입니다.';
};
