import { NavLink, useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { useQueryClient } from '@tanstack/react-query';

import { authStore } from '@/entities/auth/model/store';
import { NAV_ITEMS } from '@/shared/constants/navigation';
import SidebarProgress from './SidebarProgress';

export default function Sidebar() {
  const { user, logout } = authStore((state) => state);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (!user) return null;

  const handleLogout = () => {
    queryClient.clear();
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
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* 하단: 프로필 + 로그아웃 */}
      <div className="mt-auto border-t border-gray-200 pt-4 flex justify-between">
        <div className="mb-1">
          <p className="text-sm font-semibold text-gray-800">
            {user.nickname || user.email}
          </p>
        </div>
        <div className="flex items-center justify-end">
          <div className="relative group">
            <button
              onClick={handleLogout}
              aria-label="로그아웃"
              className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <MdLogout size={18} />
            </button>
            <span className="absolute bottom-full right-0 mb-1.5 px-2 py-1 text-xs text-white bg-gray-700 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              로그아웃
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
