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
    onChangeAuthInput,
    removeNickname,
    setAuthFormData,
    error,
    setError,
  } = useAuthForm();

  const { mutate, isPending } = useAuth();

  const handleAuthSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, nickname } = authFormData;

    const validatedEmail = validateEmail(email);
    const validatedPassword = validatePassword(password);

    setError((prev) => ({
      ...prev,
      email: validatedEmail,
      password: validatedPassword,
    }));

    if (validatedEmail || validatedPassword) return;

    if (isSignup) {
      const validatedNickname = validateNickname(nickname);

      setError((prev) => ({
        ...prev,
        nickname: validatedNickname,
      }));
      if (validatedNickname) return;
    }

    mutate({
      mode,
      formData: authFormData,
    });
  };

  return (
    <form
      onSubmit={handleAuthSubmit}
      className="flex flex-col w-full max-w-[320px] mx-auto items-center"
    >
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
