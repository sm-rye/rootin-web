import { useEffect, useState } from 'react';
import { useToastStore } from '@/shared/model/useToastStore';

function ToastItem({
  id,
  message,
  type,
  createdAt,
  duration,
}: {
  id: number;
  message: string;
  type: 'success' | 'error';
  createdAt: number;
  duration: number;
}) {
  const removeToast = useToastStore((s) => s.removeToast);
  const [remaining, setRemaining] = useState(
    Math.ceil((duration - (Date.now() - createdAt)) / 1000),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const left = Math.ceil((duration - (Date.now() - createdAt)) / 1000);
      if (left <= 0) {
        clearInterval(interval);
      } else {
        setRemaining(left);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [createdAt, duration]);

  const isSuccess = type === 'success';

  return (
    <button
      className={`
        flex items-center gap-3 pl-4 pr-3 py-3 rounded-2xl shadow-xl
        text-sm font-medium backdrop-blur-sm
        animate-[toastIn_0.3s_ease-out]
        ${isSuccess ? 'bg-primary/80 text-white' : 'bg-red-500/55 text-white'}
      `}
      onClick={() => removeToast(id)}
    >
      <span className="text-base">{isSuccess ? '✓' : '✕'}</span>
      <span>{message}</span>
      <span
        className={`
          ml-1 text-xs tabular-nums min-w-5 h-5 flex items-center justify-center
          rounded-full
          ${isSuccess ? 'bg-white/20' : 'bg-white/20'}
        `}
      >
        {remaining}
      </span>
    </button>
  );
}

export default function Toast() {
  const toasts = useToastStore((s) => s.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </div>
  );
}
