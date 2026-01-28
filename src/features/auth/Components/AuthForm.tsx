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
  const { mutate, onError } = useAuth();

  const handleAuthSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({
      mode,
      formData: authFormData,
    });
  };

  return (
    <form onSubmit={handleAuthSubmit}>
      <Input
        inputName="Email"
        inputId="email"
        onChange={onChangeAuthInput}
        value={authFormData.email}
        type="email"
      />
      <Input
        inputName="Password"
        inputId="password"
        onChange={onChangeAuthInput}
        value={authFormData.password}
        type="password"
      />

      {isSignup && (
        <Input
          inputName="닉네임"
          inputId="nickname"
          onChange={onChangeAuthInput}
          value={authFormData.nickname}
        />
      )}

      <div>
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
          checked={isSignup}
        />
        <label htmlFor="authModeCheckbox">회원가입</label>
      </div>

      <div>
        <Button>{isSignup ? '회원가입' : '로그인'}</Button>
      </div>
    </form>
  );
}
