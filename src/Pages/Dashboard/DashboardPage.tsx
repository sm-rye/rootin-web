import {
  SummaryCards,
  TrendChart,
  WeekdayChart,
  HabitRateList,
  StreakGrid,
} from '@/widgets/dashboard';

export default function DashboardPage() {
  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="flex flex-col gap-4 p-6">
        <SummaryCards />
        <TrendChart />
        <WeekdayChart />
        <HabitRateList />
        <StreakGrid />
      </div>
    </div>
  );
}
