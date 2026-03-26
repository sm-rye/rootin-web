import { useEffect, useState } from 'react';

import { Header } from '@/widgets/layout-header';
import { FooterNav, ProfileBottomSheet } from '@/widgets/layout-footer';
import { Sidebar } from '@/widgets/layout-sidebar';
import { GuestBanner } from '@/widgets/guest-banner';

import { Outlet, useNavigate } from 'react-router-dom';

import { authStore, useGetMe } from '@/entities/auth';
import { Toast, ConfirmModal } from '@/shared/Components';

export default function BaseLayout() {
  const navigate = useNavigate();
  const { setAuth, logout } = authStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const token = localStorage.getItem('token');

  const { data, isSuccess, isError, isLoading, isFetching } = useGetMe(!!token);

  useEffect(() => {
    if (!token) navigate('/auth', { replace: true });

    if (isSuccess && data) {
      setAuth(data.user);
    }

    if (isError && !isFetching) {
      localStorage.removeItem('token');
      logout();
      navigate('/auth', { replace: true });
    }
  }, [isSuccess, isError, isFetching, data, setAuth, logout]);

  if (token && isLoading) {
    return <div>사용자 정보를 불러오는 중...</div>;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <GuestBanner />
      <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
      <div className="flex-1 flex min-h-0">
        <aside
          className={`hidden md:block overflow-hidden transition-all duration-300 ease-in-out ${
            sidebarOpen ? 'w-64 border-r border-gray-200' : 'w-0'
          }`}
        >
          <Sidebar />
        </aside>
        <main className="flex-1 min-h-0">
          <Outlet />
        </main>
      </div>
      <footer className="block md:hidden sticky bottom-0 z-50">
        <FooterNav />
      </footer>
      <Toast />
      <ConfirmModal />
      <ProfileBottomSheet />
    </div>
  );
}
