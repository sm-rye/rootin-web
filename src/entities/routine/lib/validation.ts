export const validateRoutineTitle = (title?: string) => {
  if (!title) return '루틴 이름을 입력해주세요.';
  return title.length >= 2 && title.length <= 30
    ? ''
    : '타이틀은 최소 2글자 이상 30글자 이하입니다.';
};

export const validateDuration = (days: number | undefined): string => {
  if (!days || days < 1 || days > 365)
    return '기간은 1일 이상 365일 이하로 입력해주세요.';
  return '';
};
