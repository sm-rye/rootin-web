import type { Status } from '@/entities/routine';
import { useToggleTask } from '@/features/task-toggle';
import { Empty } from '@/shared/Components';

export default function TaskStatusItem({
  task_id,
  isCompleted,
  date,
  name,
  disabled = false,
}: Status & { date: string; name: string | undefined; disabled?: boolean }) {
  if (!name) return <Empty />;
  const { mutate, isPending } = useToggleTask();

  const isDisabled = disabled || isPending;

  const handleToggle = () => {
    if (isDisabled) return;
    mutate({ id: task_id, date });
  };

  return (
    <div className="flex items-center gap-2.5 py-2" key={task_id}>
      <button
        type="button"
        role="checkbox"
        aria-checked={isCompleted}
        onClick={handleToggle}
        disabled={isDisabled}
        className={[
          'flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center',
          'transition-all duration-200',
          isDisabled ? 'cursor-default opacity-60' : '',
          isCompleted
            ? 'bg-primary border-primary'
            : isDisabled
              ? 'bg-gray-100 border-gray-300'
              : 'bg-white border-gray-300 hover:border-primary/50',
        ].join(' ')}
      >
        {isPending ? (
          <span className="w-2.5 h-2.5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        ) : (
          isCompleted && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )
        )}
      </button>
      <label
        htmlFor={task_id.toString()}
        onClick={handleToggle}
        className={[
          'text-sm transition-all duration-200',
          isDisabled ? 'cursor-default' : 'cursor-pointer',
          isCompleted ? 'line-through text-gray-400' : 'text-foreground',
        ].join(' ')}
      >
        {name}
      </label>
    </div>
  );
}
