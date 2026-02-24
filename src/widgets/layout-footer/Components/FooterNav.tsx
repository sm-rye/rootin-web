import { NavLink } from 'react-router-dom';
import { MdPerson } from 'react-icons/md';
import { NAV_ITEMS } from '@/shared/constants/navigation';

export default function FooterNav() {
  return (
    <footer className="bg-white border-t border-gray-200 shadow-sm">
      <nav className="flex justify-around">
        {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/routines'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-2 px-4 text-xs transition-colors ${
                isActive
                  ? 'text-primary'
                  : 'text-gray-400 hover:text-gray-600'
              }`
            }
          >
            <Icon size={22} />
            {label}
          </NavLink>
        ))}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 py-2 px-4 text-xs transition-colors ${
              isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
            }`
          }
        >
          <MdPerson size={22} />
          프로필
        </NavLink>
      </nav>
    </footer>
  );
}
