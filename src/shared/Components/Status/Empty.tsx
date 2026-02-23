import { Button } from '@/shared/Components';
import { LuClipboardPen } from 'react-icons/lu';

interface EmptyProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function Empty({
  title = '데이터가 없습니다.',
  description,
  actionLabel,
  onAction,
}: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20 text-center">
      <div className="bg-gray-100 p-6 rounded-full mb-6">
        <LuClipboardPen className="w-16 h-16 text-gray-400" strokeWidth={1.5} />
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 mb-8 max-w-md font-medium">{description}</p>

      {onAction && <Button onClick={onAction}>{actionLabel}</Button>}
    </div>
  );
}
