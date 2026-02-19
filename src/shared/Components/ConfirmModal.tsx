import { useConfirmStore } from '@/shared/model/useConfirmStore';

export default function ConfirmModal() {
  const { isOpen, message, onConfirm, close } = useConfirmStore();

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm?.();
    close();
  };

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
        onClick={close}
      />

      {/* modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 mx-4 w-full max-w-sm animate-[toastIn_0.2s_ease-out]">
        <p className="text-base font-semibold text-gray-800 text-center leading-relaxed">
          {message}
        </p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={close}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 transition"
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-primary hover:bg-primary/85 transition"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
