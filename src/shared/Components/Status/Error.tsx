interface ErrorProps {
  message?: string;
  onRetry?: () => void;
}

export default function Error({
  message = '데이터를 불러오는데 실패했습니다.',
  onRetry,
}: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-40 gap-3 text-gray-400">
      <span className="text-4xl">⚠️</span>
      <p className="text-sm text-gray-500">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-1 px-4 py-1.5 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
