import { Card, DashBoardHeading } from '@/shared/Components';
import { useDashboardSummary } from '@/entities/dashboard';

export default function HabitRateList() {
  const { data, isLoading } = useDashboardSummary();

  const habits = data?.habitRates ?? [];

  return (
    <Card className="p-5 flex flex-col gap-y-4">
      <DashBoardHeading
        mainText="습관별 달성률"
        subText="전체 루틴 기준 완료율"
      />

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-3 bg-gray-100 rounded w-3/4 mb-2" />
              <div className="h-2 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      ) : habits.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">
          등록된 루틴이 없어요
        </p>
      ) : (
        <ul className="flex flex-col gap-3 overflow-y-auto max-h-48 p-5">
          {habits.map((habit) => (
            <li key={habit.taskId}>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm text-foreground truncate max-w-[70%]">
                  {habit.taskName}
                </span>
                <span className="text-sm font-semibold text-primary ml-2 shrink-0">
                  {habit.rate}%
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${habit.rate}%`,
                    background:
                      'linear-gradient(90deg, #EA4C89 0%, #FF8833 100%)',
                  }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                {habit.routineTitle}
              </p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
