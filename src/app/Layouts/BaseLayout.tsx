import React, { useEffect } from 'react';

import { Header } from '@/widgets/layout-header';
import { FooterNav } from '@/widgets/layout-footer';
import { Sidebar } from '@/widgets/layout-sidebar';

import { Outlet, useNavigate } from 'react-router-dom';

import { authStore, useGetMe } from '@/entities/auth';

export default function BaseLayout() {
  const navigate = useNavigate();
  const { setAuth, logout } = authStore();

  // 1. 토큰 존재 여부 확인
  const token = localStorage.getItem('token');

  // 2. React Query 훅 사용 (토큰이 있을 때만 실행되도록 enabled 처리)
  const { data, isSuccess, isError, isLoading } = useGetMe(!!token);

  useEffect(() => {
    if (!token) navigate('/auth', { replace: true });

    if (isSuccess && data) {
      setAuth(data.user);
    }

    if (isError) {
      // 토큰이 유효하지 않은 경우 정리
      localStorage.removeItem('token');
      logout();
      navigate('/auth', { replace: true });
    }
  }, [isSuccess, isError, data, setAuth, logout]);

  // 토큰은 있는데 아직 데이터를 가져오는 중이라면 '대기 상태'를 반환
  if (token && isLoading) {
    return <div>사용자 정보를 불러오는 중...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <div className="flex-1 flex">
        <aside className="hidden md:block w-64 border-r border-gray-200">
          <Sidebar />
        </aside>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <footer className="block lg:hidden sticky bottom-0 z-50">
        <FooterNav />
      </footer>
    </div>
  );
}
