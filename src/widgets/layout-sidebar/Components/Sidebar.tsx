import { NavLink, useNavigate } from 'react-router-dom';
import { MdLogout, MdPerson } from 'react-icons/md';

import { authStore } from '@/entities/auth/model/store';
import { NAV_ITEMS } from '@/shared/constants/navigation';
import SidebarProgress from './SidebarProgress';

export default function Sidebar() {
  const { user, logout } = authStore((state) => state);
  const navigate = useNavigate();

  if (!user) return null;

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
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <MdPerson size={20} />
          프로필
        </NavLink>
      </nav>

      {/* 하단: 프로필 + 로그아웃 */}
      <div className="mt-auto border-t border-gray-200 pt-4 flex flex-col ">
        <div className="mb-1">
          <p className="text-sm font-semibold text-gray-800">
            {user.nickname || user.email}
          </p>
          {user.nickname && (
            <p className="text-xs text-gray-500">{user.email}</p>
          )}
        </div>
        <div className="flex items-center justify-end  text-sm">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <MdLogout size={15} />
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
