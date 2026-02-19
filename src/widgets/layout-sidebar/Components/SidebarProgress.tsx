import { useTodaySummary } from '@/entities/routine';

const RADIUS = 40;
const STROKE = 6;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SIZE = (RADIUS + STROKE) * 2;

function getMessage(rate: number): string {
  if (rate === 0) return '아직 달성한 루틴이 없어요';
  if (rate < 30) return '좋은 시작이에요!';
  if (rate < 50) return '잘 하고 있어요!';
  if (rate < 70) return '절반 넘었어요, 힘내요!';
  if (rate < 90) return '거의 다 왔어요!';
  if (rate < 100) return '마지막 한 발!';
  return '모든 루틴 완료!';
}

export default function SidebarProgress() {
  const { data, isLoading } = useTodaySummary();

  if (isLoading || !data) return null;

  const { totalRoutines, averageRate } = data;

  if (totalRoutines === 0) {
    return (
      <div className="mb-4 rounded-xl bg-pink-50 p-4 dark:bg-gray-800">
        <p className="mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          오늘의 달성 현황
        </p>
        <p className="text-sm text-gray-500 text-center">
          진행 중인 루틴이 없어요
        </p>
      </div>
    );
  }

  const rate = Math.round(averageRate);
  const offset = CIRCUMFERENCE - (rate / 100) * CIRCUMFERENCE;

  return (
    <div className="mb-4 rounded-xl bg-pink-50 p-4 dark:bg-gray-800">
      {/* 헤더 */}
      <div className="text-center">
        <p className="mb-3 text-sm font-semibold text-gray-800 uppercase tracking-wider text-center">
          {totalRoutines}개 루틴 진행 중
        </p>
      </div>

      {/* SVG Ring + 텍스트 세로 배열 */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative shrink-0">
          <svg width={SIZE} height={SIZE} className="-rotate-90">
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="#E5E7EB"
              strokeWidth={STROKE}
              className="dark:stroke-gray-600"
            />
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
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary opacity-80">
            {rate}%
          </span>
        </div>

        <p className="mt-0.5 text-xs font-medium text-gray-400">
          {getMessage(rate)}
        </p>
      </div>
    </div>
  );
}
