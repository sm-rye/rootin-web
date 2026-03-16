import { MdLogout, MdPerson } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { authStore } from '@/entities/auth/model/store';
import { useConfirmStore } from '@/shared/model/useConfirmStore';
import { useProfileSheetStore } from '@/shared/model/useProfileSheetStore';

export default function ProfileBottomSheet() {
  const { isOpen, close } = useProfileSheetStore();
  const { user, logout } = authStore((state) => state);
  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (!isOpen || !user) return null;

  const initial = (user.nickname || user.email).charAt(0).toUpperCase();

  const handleLogout = () => {
    close();
    openConfirm(
      '로그아웃 하시겠어요?',
      () => {
        queryClient.clear();
        logout();
        navigate('/auth', { replace: true });
      },
      '로그아웃',
    );
  };

  const handleProfileClick = () => {
    close();
    navigate('/profile');
  };

  return (
    <div className="fixed inset-0 z-[9997] flex flex-col justify-end md:hidden">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
        onClick={close}
      />

      {/* sheet */}
      <div className="relative bg-white rounded-t-2xl shadow-2xl animate-[sheetIn_0.3s_ease-out]">
        {/* drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* 프로필 정보 */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold shrink-0">
            {initial}
          </div>
          <div className="min-w-0">
            <p className="text-base font-semibold text-gray-800 truncate">
              {user.nickname || user.email}
            </p>
            {user.nickname && (
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
            )}
          </div>
        </div>

        {/* 액션 */}
        <div className="flex flex-col px-4 py-2 pb-10">
          <button
            onClick={handleProfileClick}
            className="flex items-center gap-3 px-3 py-3.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <MdPerson size={20} className="text-gray-400" />
            프로필 보기
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-3.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <MdLogout size={20} />
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
