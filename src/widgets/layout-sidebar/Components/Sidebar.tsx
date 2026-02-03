import { authStore } from '@/entities/auth/model/store';

import { Button } from '@/shared/Components';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const { user, logout } = authStore((state) => state);
  const navigate = useNavigate();

  // 데이터가 없을 때를 대비한 기본 처리
  if (!user) return <div className="p-4">로그인이 필요합니다.</div>;

  return (
    <div className="bg-secondary-white">
      <h1>Rootin</h1>
      <div>{user.email}</div>
      <div>
        <Button
          onClick={() => {
            logout();
            navigate('/auth', { replace: true });
          }}
          size="sm"
          variant="ghost"
        >
          로그아웃
        </Button>
      </div>
    </div>
  );
}
