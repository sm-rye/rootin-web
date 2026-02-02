import React from 'react';
import type { AuthMode } from '@/entities/auth';
import { Button, Input } from '@/shared/Components';
import useAuthForm from '../model/useAuthForm';
import useAuth from '../model/useAuth';

export default function AuthForm({
  mode,
  handleAuthMode,
}: {
  mode: AuthMode;
  handleAuthMode: () => void;
}) {
  const isSignup = mode === 'signup';

  const { authFormData, onChangeAuthInput, removeNickname, setAuthFormData } =
    useAuthForm();
  const { mutate } = useAuth();

  const handleAuthSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      <Input
        inputName="Email"
        inputId="email"
        onChange={onChangeAuthInput}
        value={authFormData.email}
        type="email"
        className="w-80"
        placeHolder="이메일을 입력해주세요"
      />
      <Input
        inputName="Password"
        inputId="password"
        onChange={onChangeAuthInput}
        value={authFormData.password}
        type="password"
        className="w-80"
        placeHolder="비밀번호를 입력해주세요"
      />

      {isSignup && (
        <Input
          inputName="닉네임"
          inputId="nickname"
          onChange={onChangeAuthInput}
          value={authFormData.nickname}
          className="w-80!"
          placeHolder="닉네임을 입력해주세요"
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
        <Button>{isSignup ? '회원가입' : '로그인'}</Button>
      </div>
    </form>
  );
}
