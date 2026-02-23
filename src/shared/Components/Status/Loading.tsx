import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-40 gap-3 text-gray-400">
      <AiOutlineLoading3Quarters className="animate-spin text-3xl text-primary" />
      <p className="text-sm">불러오는 중...</p>
    </div>
  );
}
