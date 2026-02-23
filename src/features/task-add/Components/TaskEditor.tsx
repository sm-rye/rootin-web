import type { Task } from '@/entities/task';
import { Input } from '@/shared/Components';
import { LuTrash2 } from 'react-icons/lu';

interface TaskEditorProps {
  task?: Task | undefined;
  onChangeTaskInput: (
    e: React.ChangeEvent<HTMLInputElement>,
    task_id: number,
  ) => void;
  deleteTask: (id: number) => void;
  isEmpty?: undefined | Task;
}

const ordinal = ['첫', '두', '세', '네', '다섯'];

export default function TaskEditor({
  task,
  onChangeTaskInput,
  deleteTask,
  isEmpty,
}: TaskEditorProps) {
  if (!task) return <></>;

  const label = ordinal[task.sort_order - 1] ?? task.sort_order;

  return (
    <div className="flex items-center gap-2.5">
      {/* 순번 배지 */}
      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-400 text-xs font-semibold flex items-center justify-center select-none">
        {task.sort_order}
      </span>

      {/* 입력 */}
      <div className="flex-1">
        <Input
          inputId="task"
          value={task.name}
          onChange={(e) => onChangeTaskInput(e, task.sort_order)}
          className={isEmpty ? 'border border-primary' : ''}
          placeHolder={`${label} 번째 실천 행동${isEmpty ? '을 입력해주세요.' : ''}`}
        />
      </div>

      {/* 삭제 버튼 */}
      <button
        type="button"
        onClick={() => deleteTask(task.sort_order)}
        className="flex-shrink-0 p-1.5 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors"
        aria-label="태스크 삭제"
      >
        <LuTrash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
