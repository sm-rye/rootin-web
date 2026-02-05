import React from 'react';
import type { AuthMode } from '@/entities/auth';
import { Button, Input } from '@/shared/Components';
import useAuthForm from '../model/useAuthForm';
import useAuth from '../model/useAuth';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import {
  validatePassword,
  validateEmail,
  validateNickname,
} from '../lib/validation';

export default function AuthForm({
  mode,
  handleAuthMode,
}: {
  mode: AuthMode;
  handleAuthMode: () => void;
}) {
  const isSignup = mode === 'signup';

  const {
    authFormData,
    error,

    onChangeAuthInput,
    removeNickname,
    setAuthFormData,
    setError,
  } = useAuthForm();

  const { mutate, isPending, isError, error: responseErr } = useAuth();

  const handleAuthSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password, nickname } = authFormData;

    // 1. 이메일과 비밀번호의 유효성 검사를 진행한다. (+ 회원가입일 경우 닉네임의 유효성검사를 진행한다)
    const validatedEmail = validateEmail(email);
    const validatedPassword = validatePassword(password);
    const validatedNickname = isSignup ? validateNickname(nickname) : '';

    // 2. 유효성 검사 결과를 에러 상태값에 셋팅한다
    // - 에러가 있을 경우 메시지 셋팅
    // - 에러가 없을 경우 빈 스트링
    setError({
      email: validatedEmail,
      password: validatedPassword,
      nickname: validatedNickname,
    });

    // 3. 유효성 검사 실패 ? 함수리턴 : 뮤테이션 함수 실행
    if (validatedEmail || validatedPassword || (isSignup && validatedNickname))
      return;
    mutate({
      mode,
      formData: authFormData,
    });
  };

  return (
    <form
      onSubmit={handleAuthSubmit}
      className="flex flex-col w-full max-w-[320px] mx-auto items-center relative"
    >
      {/* 에러가 발생했을 때만 메시지 노출 */}
      {isError && (
        <p className="text-red-500 text-sm absolute -top-7">
          {responseErr.response?.data?.message ||
            '알 수 없는 오류가 발생했습니다.'}
        </p>
      )}
      <fieldset
        disabled={isPending}
        className={`w-full flex flex-col items-center transition-all duration-300  ${isPending ? 'pointer-events-none opacity-90 blur-[0.5px]' : ''}`}
      >
        <Input
          inputName="Email"
          inputId="email"
          onChange={onChangeAuthInput}
          value={authFormData.email}
          type="email"
          className="w-80"
          placeHolder="이메일을 입력해주세요"
          helperText={error.email}
        />
        <Input
          inputName="Password"
          inputId="password"
          onChange={onChangeAuthInput}
          value={authFormData.password}
          maxLength={20}
          type="password"
          className="w-80"
          placeHolder="비밀번호를 입력해주세요"
          helperText={error.password}
        />

        {isSignup && (
          <Input
            inputName="닉네임"
            inputId="nickname"
            onChange={onChangeAuthInput}
            value={authFormData.nickname}
            className="w-80!"
            placeHolder="닉네임을 입력해주세요"
            helperText={error.nickname}
          />
        )}
        <div className="flex items-center gap-2  w-80">
          <input
            id="authModeCheckbox"
            type="checkbox"
            onChange={() => {
              if (authFormData.nickname) {
                const isConfirmed = window.confirm(
                  '회원가입을 취소할 경우 닉네임 데이터를 사라집니다.',
                );
                if (isConfirmed) {
                  removeNickname();
                  handleAuthMode();
                }
              } else {
                if (!isSignup) {
                  setAuthFormData((prev) => ({ ...prev, nickname: '' }));
                }
                handleAuthMode();
              }
            }}
            className="w-4 h-4"
            checked={isSignup}
          />
          <label htmlFor="authModeCheckbox">회원가입</label>
        </div>

        <div className="mt-10">
          <Button className="flex justify-between items-center px-8 gap-x-3">
            <p>{isSignup ? '회원가입' : '로그인'}</p>
            {isPending && (
              <AiOutlineLoading3Quarters className="animate-spin " />
            )}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
