import { RxTarget } from 'react-icons/rx';
import { GoFlame } from 'react-icons/go';
import { Card } from '@/shared/Components';
import { useDashboardSummary } from '@/entities/dashboard';

export default function SummaryCards() {
  const { data, isLoading } = useDashboardSummary();
  const overallRate = data?.overallRate ?? 0;
  const currentStreak = data?.currentStreak ?? 0;

  return (
    <div className="flex gap-4 items-stretch">
      {/* 전체 달성률 - primary 그라데이션 배경 */}
      <Card className="p-5 ">
        {isLoading ? (
          <div className="h-16 animate-pulse rounded-lg bg-white/20" />
        ) : (
          <>
            <div className="flex items-center gap-2 mb-4">
              <RxTarget className="text-lg text-primary" />
              <p className="text-sm text-foreground">전체 달성률</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">{overallRate}%</span>
            </div>
          </>
        )}
      </Card>
      {/* 현재 연속 달성 - 미니멀 카드 */}
      <Card className=" p-5">
        {isLoading ? (
          <div className="h-16 animate-pulse bg-gray-100 rounded-lg" />
        ) : (
          <>
            <div className="flex items-center gap-2 mb-4">
              <GoFlame className="text-primary text-lg" />
              <p className="text-sm text-foreground">현재 연속 달성</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-foreground">
                {currentStreak}
              </span>
              <span className="text-xl text-gray-400">일</span>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
