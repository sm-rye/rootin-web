import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '@/shared/constants/navigation';

export default function FooterNav() {
  return (
    <footer className="bg-white border-t border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700">
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
      </nav>
    </footer>
  );
}
