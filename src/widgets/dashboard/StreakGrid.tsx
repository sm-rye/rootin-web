import { useState, useMemo } from 'react';
import { Card, DashBoardHeading } from '@/shared/Components';
import { useDashboardStreak } from '@/entities/dashboard';

const LEVEL_COLORS = {
  0: '#f3f4f6',
  1: '#fce7f3',
  2: '#f9a8d4',
  3: '#ea4c89',
} as const;

const WEEKS_OPTIONS = [
  { label: '12주', value: 12 },
  { label: '24주', value: 24 },
];

export default function StreakGrid() {
  const [weeks, setWeeks] = useState(12);
  const { data, isLoading } = useDashboardStreak(weeks);

  const cells = useMemo(() => {
    if (!data?.data?.length) return [];

    const firstDate = new Date(data.data[0].date);
    const firstDayOfWeek = firstDate.getUTCDay();

    const padded: ((typeof data.data)[0] | null)[] = [
      ...Array(firstDayOfWeek).fill(null),
      ...data.data,
    ];

    const remainder = padded.length % 7;
    if (remainder !== 0) {
      padded.push(...Array(7 - remainder).fill(null));
    }

    return padded;
  }, [data]);

  const totalWeekCols = Math.ceil(cells.length / 7);

  const grid: (typeof cells)[0][][] = Array.from(
    { length: totalWeekCols },
    (_, col) =>
      Array.from({ length: 7 }, (_, row) => cells[col * 7 + row] ?? null),
  );

  return (
    <div className="w-full">
      <Card className="p-5 flex flex-col gap-y-4">
        <div className="flex items-center gap-8 justify-between">
          <DashBoardHeading
            mainText="연속 달성 기록"
            subText={`최근 ${weeks * 7}일 달성 현황`}
          />
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1 shrink-0">
            {WEEKS_OPTIONS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setWeeks(value)}
                className={`px-3 py-1 text-xs rounded-md transition-all ${
                  weeks === value
                    ? 'bg-white text-primary shadow-sm font-semibold'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="h-20 w-64 animate-pulse bg-gray-100 rounded-lg" />
        ) : (
          <div>
            <div className="flex gap-1 justify-center">
              {/* 그리드: 열(week) × 행(day) */}
              {grid.map((col, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-1">
                  {col.map((cell, rowIndex) => {
                    const color =
                      cell === null ? 'transparent' : LEVEL_COLORS[cell.level];
                    return (
                      <div
                        key={rowIndex}
                        title={
                          cell
                            ? `${cell.date}: ${['활동 없음', '낮음', '보통', '높음'][cell.level]}`
                            : ''
                        }
                        className="w-5 h-5 rounded-sm transition-colors duration-200"
                        style={{ backgroundColor: color }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* 범례 */}
            <div className="flex items-center gap-1.5 mt-2 justify-end">
              <span className="text-xs text-gray-400 mr-0.5">낮음</span>
              {([0, 1, 2, 3] as const).map((level) => (
                <div
                  key={level}
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: LEVEL_COLORS[level] }}
                />
              ))}
              <span className="text-xs text-gray-400 ml-0.5">높음</span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
