import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card, DashBoardHeading } from '@/shared/Components';
import { useDashboardSummary } from '@/entities/dashboard';

const KR_DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];
// 한국식 표시: 월~일 순서
const KR_ORDER = [1, 2, 3, 4, 5, 6, 0];

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2 text-sm">
      <p className="text-gray-400">{label}요일</p>
      <p className="font-semibold text-primary">{payload[0].value}%</p>
    </div>
  );
}

export default function WeekdayChart() {
  const { data, isLoading } = useDashboardSummary();

  const chartData = KR_ORDER.map((dayIndex) => ({
    day: KR_DAY_LABELS[dayIndex],
    rate: Math.round(data?.weekday[dayIndex]?.rate ?? 0),
    isWeekend: dayIndex === 0 || dayIndex === 6,
  }));

  return (
    <Card className="p-5 flex flex-col gap-y-4">
      <DashBoardHeading mainText="요일별 달성률" subText="요일별 평균 완료율" />

      {isLoading ? (
        <div className="h-48 animate-pulse bg-gray-100 rounded-lg" />
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="rate" radius={[4, 4, 0, 0]} maxBarSize={36}>
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.isWeekend ? '#f9a8d4' : '#ea4c89'}
                  fillOpacity={entry.rate === 0 ? 0.3 : 1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
