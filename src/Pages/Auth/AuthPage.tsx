import React, { useState } from 'react';
import type { AuthMode } from '@/entities/auth';
import AuthForm from '@/features/auth/Components/AuthForm';

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login');

  const handleAuthMode = () => setMode(mode === 'signup' ? 'login' : 'signup');

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="blob blob1" />
      <div className="blob blob2" />
      <div className="blob blob3" />
      <div className="w-full max-w-112.5 px-4 lg:px-0 z-50 ">
        <div className="p-10 shadow-xl border border-gray-200 flex flex-col gap-y-8 bg-white rounded-2xl ">
          <header className="flex flex-col items-center gap-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Rootin
            </h1>
            <p className="text-sm text-gray-500">
              {mode === 'login'
                ? '환영합니다! 서비스를 이용하려면 로그인하세요.'
                : '새로운 계정을 생성하고 시작해보세요.'}
            </p>
          </header>

          <div className="w-full">
            <AuthForm mode={mode} handleAuthMode={handleAuthMode} />
          </div>
        </div>
      </div>
    </div>
  );
}
