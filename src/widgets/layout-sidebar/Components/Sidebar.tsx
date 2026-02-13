import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdLogout, MdDarkMode, MdLightMode } from 'react-icons/md';

import { authStore } from '@/entities/auth/model/store';
import { NAV_ITEMS } from '@/shared/constants/navigation';
import { toggleTheme, isDarkTheme } from '@/shared/lib/theme';
import SidebarProgress from './SidebarProgress';

export default function Sidebar() {
  const { user, logout } = authStore((state) => state);
  const navigate = useNavigate();
  const [dark, setDark] = useState(isDarkTheme);

  if (!user) return null;

  const handleToggleTheme = () => {
    const isDark = toggleTheme();
    setDark(isDark);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth', { replace: true });
  };

  return (
    <div className="h-full flex flex-col p-4">
      {/* 오늘의 달성률 */}
      <SidebarProgress />

      {/* 네비게이션 */}
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/routines'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* 하단: 프로필 + 테마 + 로그아웃 */}
      <div className="mt-auto border-t border-gray-200 pt-4">
        <div className="mb-3">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {user.nickname || user.email}
          </p>
          {user.nickname && (
            <p className="text-xs text-gray-500">{user.email}</p>
          )}
        </div>
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={handleToggleTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
          >
            {dark ? <MdLightMode size={18} /> : <MdDarkMode size={18} />}
            {dark ? '라이트' : '다크'}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
          >
            <MdLogout size={18} />
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
