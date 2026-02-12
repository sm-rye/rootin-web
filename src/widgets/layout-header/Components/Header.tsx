import { useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { toggleTheme, isDarkTheme } from '@/shared/lib/theme';

export default function Header() {
  const [dark, setDark] = useState(isDarkTheme);

  const handleToggleTheme = () => {
    const isDark = toggleTheme();
    setDark(isDark);
  };

  return (
    <header className="border-b border-pink-50 flex items-center justify-between px-4 text-xl py-2.5 font-semibold">
      <div className="w-8 md:hidden" />
      <span>Rootin</span>
      <button
        onClick={handleToggleTheme}
        className="md:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
      >
        {dark ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
      </button>
      <div className="hidden md:block w-8" />
    </header>
  );
}
