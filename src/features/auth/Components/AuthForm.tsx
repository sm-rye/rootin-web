import React, { useState } from 'react';
import type { AuthMode } from '@/entities/auth';
import { Button, Input } from '@/shared/Components';
import useAuthForm from '../model/useAuthForm';
import useAuth from '../model/useAuth';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { useConfirmStore } from '@/shared/model/useConfirmStore';

import { CiUser } from 'react-icons/ci';

import useGuestAuth from '@/features/auth/model/useGuestAuth';

export default function AuthForm({
  mode,
  handleAuthMode,
}: {
  mode: AuthMode;
  handleAuthMode: () => void;
}) {
  const isSignup = mode === 'signup';
  const [showPassword, setShowPassword] = useState(false);
  const openConfirm = useConfirmStore((s) => s.openConfirm);

  const { mutate: startGuest, isPending: isGuestPending } = useGuestAuth();

  const {
    authFormData,
    error,
    validatedForm,
    validateFormData,
    onChangeAuthInput,
    resetData,
  } = useAuthForm();

  const { mutate, isPending, isError, error: responseErr } = useAuth();

  const handleAuthSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isAllValid = validateFormData(isSignup);

    if (!isAllValid) return;

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
          {responseErr.response?.data?.message || '인증에 실패했습니다.'}
        </p>
      )}
      <fieldset
        disabled={isPending}
        className={`w-full flex flex-col  items-center transition-all duration-300  ${isPending ? 'pointer-events-none opacity-90 blur-[0.5px]' : ''}`}
      >
        <Input
          inputName="이메일"
          inputId="email"
          onChange={onChangeAuthInput}
          value={authFormData.email}
          type="email"
          className="w-80 text-stone-700"
          placeHolder="your@email.com"
          error={validatedForm ? error.email : ''}
        />
        <Input
          inputName="비밀번호"
          inputId="password"
          onChange={onChangeAuthInput}
          value={authFormData.password}
          maxLength={20}
          type={showPassword ? 'text' : 'password'}
          className="w-80"
          placeHolder="비밀번호를 입력해주세요"
          error={validatedForm ? error.password : ''}
          endAdornment={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPassword ? (
                <LuEyeOff className="w-4 h-4" />
              ) : (
                <LuEye className="w-4 h-4" />
              )}
            </button>
          }
        />

        {isSignup && (
          <Input
            inputName="닉네임"
            inputId="nickname"
            onChange={onChangeAuthInput}
            value={authFormData.nickname}
            className="w-80!"
            placeHolder="닉네임을 입력해주세요"
            error={validatedForm ? error.nickname : ''}
          />
        )}

        <div className="mt-1 w-full">
          <Button className="flex justify-between items-center px-8 gap-x-3 w-full text-sm">
            <p>{isSignup ? '회원가입' : '로그인'}</p>
            {isPending && (
              <AiOutlineLoading3Quarters className="animate-spin " />
            )}
          </Button>
        </div>

        <div className="flex items-center gap-3 my-5 w-full">
          <div className="h-px flex-1 bg-stone-200" />
          <span className="text-xs text-stone-400">또는</span>
          <div className="h-px flex-1 bg-stone-200" />
        </div>

        <div className="w-full ">
          <Button
            type="button"
            variant="outline"
            className=" border-stone-300 text-stone-500 text-sm hover:border-stone-400 w-full"
            onClick={() => startGuest()}
            isLoading={isGuestPending}
            disabled={isGuestPending}
          >
            <div className="flex w-full h-full justify-center items-center gap-2">
              <span className="text-xl">
                <CiUser />
              </span>
              <span>게스트로 체험하기</span>
            </div>
          </Button>
        </div>

        <div className="text-sm my-2.5">
          {isSignup ? (
            <p>
              <span>계정이 있으신가요? </span>
              <Button
                type="button"
                variant="link"
                size="sm"
                onClick={() => {
                  openConfirm(
                    '회원가입을 취소할 경우 입력된 데이터는 사라집니다.',
                    () => {
                      resetData();
                      handleAuthMode();
                    },
                    '확인',
                  );
                }}
              >
                로그인
              </Button>
            </p>
          ) : (
            <p>
              <span>계정이 없으신가요? </span>
              <Button
                type="button"
                variant="link"
                size="sm"
                onClick={() => {
                  resetData();
                  handleAuthMode();
                }}
              >
                회원가입
              </Button>
            </p>
          )}
        </div>
      </fieldset>
    </form>
  );
}
