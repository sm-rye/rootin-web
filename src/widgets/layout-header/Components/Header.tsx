import { MdMenu } from 'react-icons/md';

import { BsLayoutSidebar } from 'react-icons/bs';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="border-b border-pink-50 flex items-center justify-between px-4 text-xl py-2.5 font-semibold">
      <div className="w-8">
        <button
          onClick={onToggleSidebar}
          className="hidden md:flex p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <BsLayoutSidebar size={18} />
        </button>
      </div>
      <span>Rootin</span>
      <div className="w-8" />
    </header>
  );
}
