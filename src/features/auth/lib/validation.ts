export const validatePassword = (password?: string) => {
  if (!password) return '패스워드를 입력해주세요.';
  return password.length >= 8
    ? password.length <= 20
      ? ''
      : '패스워드는 최대 20글자 이하입니다'
    : '패스워드는 최소 8글자 이상입니다.';
};

export const validateEmail = (email?: string) => {
  if (!email) return '이메일을 입력해주세요.';

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ? ''
    : '유효한 이메일을 입력해주세요';
};

export const validateNickname = (nickname?: string) => {
  if (!nickname) return '닉네임을 입력해주세요.';

  return nickname.length >= 2 ? '' : '닉네임은 최소2글자 이상입니다.';
};
