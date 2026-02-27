import { useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { useQueryClient } from '@tanstack/react-query';

import { authStore } from '@/entities/auth/model/store';
import { useConfirmStore } from '@/shared/model/useConfirmStore';
import { Button } from '@/shared/Components';

export default function ProfilePage() {
  const { user, logout } = authStore((state) => state);
  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (!user) return null;

  const initial = (user.nickname || user.email).charAt(0).toUpperCase();

  const handleLogout = () => {
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

  return (
    <div className="w-full h-full overflow-y-auto p-6 lg:px-36">
      <div className="max-w-xl mx-auto">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">프로필</h1>

        {/* 아바타 + 이름 */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-6">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold shrink-0">
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

        {/* 계정 정보 */}
        <div className="flex flex-col gap-1 mb-8">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm text-gray-500">닉네임</span>
            <span className="text-sm font-medium text-gray-800">
              {user.nickname || '—'}
            </span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm text-gray-500">이메일</span>
            <span className="text-sm font-medium text-gray-800">
              {user.email}
            </span>
          </div>
        </div>

        {/* 로그아웃 */}
        <Button
          colorScheme="primary"
          size="md"
          onClick={handleLogout}
          variant="link"
        >
          <MdLogout size={18} className="mr-1.5" />
          로그아웃
        </Button>
      </div>
    </div>
  );
}
