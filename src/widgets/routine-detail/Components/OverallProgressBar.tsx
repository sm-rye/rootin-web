import type { DailyStatus } from '@/entities/routine';

interface OverallProgressBarProps {
  dailyStatus: DailyStatus[] | undefined;
}

export default function OverallProgressBar({
  dailyStatus,
}: OverallProgressBarProps) {
  const daily = dailyStatus ?? [];
  const total = daily.reduce((a, d) => a + d.status.length, 0);
  const done = daily.reduce(
    (a, d) => a + d.status.filter((s) => s.isCompleted).length,
    0,
  );
  const rate = total > 0 ? (done / total) * 100 : 0;

  return (
    <div className="shrink-0 my-4">
      <h2 className="text-xl font-bold text-foreground">전체 달성률</h2>
      <p className="mt-0.5 text-sm text-gray-400">
        루틴 기간 동안의 전체 달성 현황이에요
      </p>

      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
          <span>달성률</span>
          <span className="font-semibold text-foreground">
            {Math.round(rate)}%
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${rate}%`,
              background: 'linear-gradient(90deg, #EA4C89 0%, #FF8833 100%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
