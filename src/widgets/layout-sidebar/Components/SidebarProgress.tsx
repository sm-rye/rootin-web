import { useTodaySummary } from '@/entities/routine';

const RADIUS = 40;
const STROKE = 6;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SIZE = (RADIUS + STROKE) * 2;

function getMessage(rate: number): string {
  if (rate === 0) return '오늘도 한 걸음부터!';
  if (rate < 30) return '좋은 시작이에요!';
  if (rate < 50) return '잘 하고 있어요!';
  if (rate < 70) return '절반 넘었어요, 힘내요!';
  if (rate < 90) return '거의 다 왔어요!';
  if (rate < 100) return '마지막 한 발!';
  return '오늘 루틴 완료!';
}

export default function SidebarProgress() {
  const { data, isLoading } = useTodaySummary();

  if (isLoading || !data) return null;

  const { totalTasks, completedTasks } = data;

  if (totalTasks === 0) {
    return (
      <div className="mb-4 rounded-xl bg-pink-50 p-4 text-center dark:bg-gray-800">
        <p className="text-sm text-gray-500">진행 중인 루틴이 없어요</p>
      </div>
    );
  }

  const rate = Math.round((completedTasks / totalTasks) * 100);
  const offset = CIRCUMFERENCE - (rate / 100) * CIRCUMFERENCE;

  return (
    <div className="mb-4 rounded-xl bg-pink-50 p-4 dark:bg-gray-800">
      <div className="flex items-center gap-4">
        {/* SVG Ring */}
        <div className="relative shrink-0">
          <svg width={SIZE} height={SIZE} className="-rotate-90">
            {/* 배경 원 */}
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="#E5E7EB"
              strokeWidth={STROKE}
              className="dark:stroke-gray-600"
            />
            {/* 달성률 원 */}
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="#EA4C89"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary">
            {rate}%
          </span>
        </div>

        {/* 텍스트 영역 */}
        <div className="min-w-0">
          <p className="text-xs text-gray-400">오늘의 달성률</p>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-0.5">
            {completedTasks}/{totalTasks} 완료
          </p>
          <p className="text-xs text-primary font-medium mt-1">
            {getMessage(rate)}
          </p>
        </div>
      </div>
    </div>
  );
}
