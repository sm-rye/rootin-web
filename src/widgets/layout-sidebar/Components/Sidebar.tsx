import { authStore } from '@/entities/auth/model/store';

export default function Sidebar() {
  const user = authStore((state) => state.user);

  // 데이터가 없을 때를 대비한 기본 처리
  if (!user) return <div className="p-4">로그인이 필요합니다.</div>;

  return (
    <div className="bg-secondary-white">
      <h1>Rootin</h1>
      <div>{user.email}</div>
    </div>
  );
}
