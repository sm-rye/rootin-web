import { BsLayoutSidebar } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const navigate = useNavigate();

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
      <button
        onClick={() => navigate('/')}
        className="group relative text-gray-900 transition-colors duration-300 hover:text-transparent"
        style={{
          backgroundImage:
            'linear-gradient(90deg, #EA4C89 0%, #FF8833 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          backgroundSize: '200% 100%',
          backgroundPosition: '100% 0',
          transition: 'background-position 0.4s ease, color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundPosition = '0% 0';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundPosition = '100% 0';
        }}
      >
        Rootin
      </button>
      <div className="w-8" />
    </header>
  );
}
