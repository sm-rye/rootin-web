import { authStore } from '@/entities/auth';

export default function GuestBanner() {
  const user = authStore((state) => state.user);

  if (!user?.is_guest) return null;

  return (
    <div className="w-full bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-sm text-amber-800">
      📣 포트폴리오 데모용 게스트 계정입니다. &nbsp;
      <span className="font-medium">로그아웃 후 데이터는 초기화 됩니다.</span>
    </div>
  );
}
