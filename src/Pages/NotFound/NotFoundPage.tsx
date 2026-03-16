import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-y-4">
      <p className="text-6xl font-bold text-[--primary-color]">404</p>
      <p className="text-lg font-medium text-gray-700">
        페이지를 찾을 수 없습니다.
      </p>
      <p className="text-sm text-gray-400">
        존재하지 않거나 삭제된 페이지예요.
      </p>
      <button
        onClick={() => navigate('/', { replace: true })}
        className="mt-2 rounded-lg bg-primary px-5 py-2 text-sm text-white hover:opacity-90 transition-opacity"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}
